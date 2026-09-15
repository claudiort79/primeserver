import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Brand } from "@/components/Brand";
import { createCheckoutFromHandoff } from "@/lib/checkout";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Secure Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ handoff?: string | string[] }>;
}) {
  const params = await searchParams;
  const handoff = typeof params.handoff === "string" ? params.handoff : "";

  if (handoff) {
    let checkoutUrl = "";
    try {
      checkoutUrl = await createCheckoutFromHandoff(handoff);
    } catch (error) {
      console.error(
        "[PrimeServers checkout] handoff rejected:",
        error instanceof Error ? error.message : error,
      );
    }

    if (checkoutUrl) redirect(checkoutUrl);
  }

  return (
    <main className="checkoutPage">
      <div className="checkoutError">
        <Brand />
        <div className="errorIcon">!</div>
        <h1>Unable to open checkout</h1>
        <p>This payment link is invalid, unavailable or has expired.</p>
        <Link className="primaryButton full" href="/">Return home</Link>
      </div>
    </main>
  );
}
