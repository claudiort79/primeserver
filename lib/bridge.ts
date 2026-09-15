import crypto from "node:crypto";
import { publicPackageForSlug } from "@/lib/catalog";

export type BridgeHandoff = {
  v: number;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  jti: string;
  sandbox: boolean;
  order_id: string;
  reference: string;
  email: string;
  amount_total: number;
  currency: string;
  product: {
    slug: string;
    name?: string;
    game_slug?: string;
    plan_id?: string;
    plan_label?: string;
  };
  event_url: string;
  success_url: string;
  cancel_url: string;
};

function bridgeSecret() {
  const value = process.env.CHEATMARKET_BRIDGE_SECRET?.trim() || "";
  if (value.length < 32) throw new Error("CHEATMARKET_BRIDGE_SECRET is missing or too short.");
  return value;
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(normalized + padding, "base64").toString("utf8");
}

function hmacBuffer(secret: string, value: string) {
  return crypto.createHmac("sha256", secret).update(value).digest();
}

function timingSafeHexEqual(expected: Buffer, actualHex: string) {
  if (!/^[0-9a-f]{64}$/i.test(actualHex)) return false;
  const actual = Buffer.from(actualHex, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(expected, actual);
}

function hostSet(envName: string, fallback: string) {
  const raw = process.env[envName] || fallback;
  return new Set(raw.split(",").map((host) => host.trim().toLowerCase()).filter(Boolean));
}

function requireHttpsUrl(raw: string, allowedHosts: Set<string>, requiredPath: string, label: string) {
  let url: URL;
  try { url = new URL(raw); } catch { throw new Error(`${label} is invalid.`); }
  if (url.protocol !== "https:") throw new Error(`${label} must use HTTPS.`);
  if (!allowedHosts.has(url.hostname.toLowerCase())) throw new Error(`${label} host is not allowed.`);
  if (url.pathname !== requiredPath) throw new Error(`${label} path is not allowed.`);
  return url.toString();
}

function looksLikeUuid(value: unknown) {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function looksLikeEmail(value: unknown) {
  return typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

export function verifyHandoff(token: string): BridgeHandoff {
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") throw new Error("Invalid handoff format.");

  const encodedPayload = parts[1]!;
  const signature = parts[2]!;
  const expected = hmacBuffer(bridgeSecret(), encodedPayload);
  if (!timingSafeHexEqual(expected, signature)) throw new Error("Invalid handoff signature.");

  let payload: BridgeHandoff;
  try { payload = JSON.parse(decodeBase64Url(encodedPayload)) as BridgeHandoff; }
  catch { throw new Error("Invalid handoff payload."); }

  const now = Math.floor(Date.now() / 1000);
  if (payload.v !== 1) throw new Error("Unsupported handoff version.");
  if (payload.iss !== "cheatmarket") throw new Error("Invalid handoff issuer.");
  if (payload.aud !== "stripe-performance-bridge") throw new Error("Invalid handoff audience.");
  if (!Number.isInteger(payload.iat) || !Number.isInteger(payload.exp)) throw new Error("Invalid handoff timestamps.");
  if (payload.exp <= now) throw new Error("Handoff expired.");
  if (payload.iat > now + 60) throw new Error("Handoff timestamp is in the future.");
  if (payload.exp - payload.iat > 20 * 60) throw new Error("Handoff lifetime is too long.");
  if (!looksLikeUuid(payload.order_id)) throw new Error("Invalid order id.");
  if (typeof payload.reference !== "string" || payload.reference.length < 3 || payload.reference.length > 80) throw new Error("Invalid order reference.");
  if (!looksLikeEmail(payload.email)) throw new Error("Invalid customer email.");
  if (!Number.isInteger(payload.amount_total) || payload.amount_total < 50 || payload.amount_total > 500_000) throw new Error("Invalid amount.");
  if (payload.currency !== "usd") throw new Error("Unsupported currency.");
  if (!payload.product || typeof payload.product.slug !== "string") throw new Error("Invalid product.");

  const product = publicPackageForSlug(payload.product.slug);
  if (!product) throw new Error("Product is not enabled on PrimeServers.");
  if (product.priceCents !== Number.MAX_SAFE_INTEGER && payload.amount_total > product.priceCents) {
    throw new Error("Signed amount exceeds PrimeServers list price.");
  }

  const returnHosts = hostSet("PRIMESERVERS_ALLOWED_RETURN_HOSTS", "cheatmarket.cc");
  const eventHosts = hostSet("PRIMESERVERS_ALLOWED_EVENT_HOSTS", "cheatmarket.cc");
  payload.success_url = requireHttpsUrl(payload.success_url, returnHosts, "/api/public/stripe/bridge/return", "Success URL");
  payload.cancel_url = requireHttpsUrl(payload.cancel_url, returnHosts, "/api/public/stripe/bridge/cancel", "Cancel URL");
  payload.event_url = requireHttpsUrl(payload.event_url, eventHosts, "/api/public/stripe/bridge/event", "Event URL");

  return payload;
}

export function signBridgeEvent(timestamp: string, rawBody: string) {
  return crypto.createHmac("sha256", bridgeSecret()).update(`${timestamp}.${rawBody}`).digest("hex");
}
