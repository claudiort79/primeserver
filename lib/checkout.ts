import { publicPackageForSlug } from "@/lib/catalog";
import { verifyHandoff } from "@/lib/bridge";
import { stripeClient } from "@/lib/stripe";

export async function createCheckoutFromHandoff(token: string) {
  const handoff = verifyHandoff(token);
  const product = publicPackageForSlug(handoff.product.slug);
  if (!product) throw new Error("Product is unavailable.");

  const session = await stripeClient().checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: handoff.email,
    client_reference_id: handoff.reference,
    success_url: handoff.success_url,
    cancel_url: handoff.cancel_url,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: handoff.amount_total,
        product_data: { name: product.name, description: product.description },
      },
    }],
    metadata: {
      order_id: handoff.order_id,
      reference: handoff.reference,
      product_slug: product.slug,
      bridge_event_url: handoff.event_url,
      bridge_sandbox: handoff.sandbox ? "1" : "0",
    },
    payment_intent_data: {
      metadata: {
        order_id: handoff.order_id,
        reference: handoff.reference,
        product_slug: product.slug,
      },
    },
  });

  if (!session.url) throw new Error("Stripe did not return a Checkout URL.");
  return session.url;
}
