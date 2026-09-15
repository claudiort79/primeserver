import type Stripe from "stripe";
import { signBridgeEvent } from "@/lib/bridge";

type SupportedEvent =
  | "checkout.session.completed"
  | "checkout.session.async_payment_succeeded"
  | "checkout.session.async_payment_failed"
  | "checkout.session.expired";

const SUPPORTED = new Set<SupportedEvent>([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
]);

export async function forwardStripeEvent(event: Stripe.Event) {
  if (!SUPPORTED.has(event.type as SupportedEvent)) return { forwarded: false, reason: "unsupported_event" };

  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata || {};
  const orderId = metadata.order_id || "";
  const reference = metadata.reference || "";
  const eventUrl = metadata.bridge_event_url || "";

  if (!orderId || !reference || !eventUrl || !session.id) throw new Error("Stripe session is missing bridge metadata.");

  if (
    (event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded") &&
    session.payment_status !== "paid"
  ) {
    return { forwarded: false, reason: "not_paid" };
  }

  const callback = {
    event_id: event.id,
    type: event.type,
    session_id: session.id,
    order_id: orderId,
    reference,
    payment_status: session.payment_status,
    amount_total: session.amount_total,
    currency: session.currency,
  };

  const rawBody = JSON.stringify(callback);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = signBridgeEvent(timestamp, rawBody);

  const response = await fetch(eventUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-cheatmarket-timestamp": timestamp,
      "x-cheatmarket-signature": signature,
    },
    body: rawBody,
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`CheatMarket bridge callback failed with HTTP ${response.status}${body ? `: ${body.slice(0, 300)}` : ""}`);
  }

  return { forwarded: true };
}
