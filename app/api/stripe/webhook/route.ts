import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { forwardStripeEvent } from "@/lib/callback";
import { stripeClient, stripeWebhookSecret } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new NextResponse("Missing Stripe signature", { status: 400 });

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(
      rawBody,
      signature,
      stripeWebhookSecret(),
    );
  } catch (error) {
    console.error(
      "[PrimeServers webhook] invalid Stripe signature:",
      error instanceof Error ? error.message : error,
    );
    return new NextResponse("Invalid Stripe signature", { status: 400 });
  }

  try {
    await forwardStripeEvent(event);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(
      "[PrimeServers webhook] callback failed:",
      error instanceof Error ? error.message : error,
    );
    return new NextResponse("Bridge callback failed", { status: 500 });
  }
}
