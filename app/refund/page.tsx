import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="POLICY"
      title="Refund Policy"
      intro="We want package scope and delivery expectations to be clear before purchase."
    >
      <h2>Digital delivery</h2>
      <p>
        PrimeServers products are digital. Once a package has been delivered or accessed,
        refund eligibility may be limited where permitted by applicable law.
      </p>
      <h2>Before delivery</h2>
      <p>
        If you believe you purchased the wrong package and delivery has not started,
        contact support promptly with your order reference.
      </p>
      <h2>Technical issues</h2>
      <p>
        If a documented package cannot be delivered or is materially different from
        its stated scope, contact support so we can troubleshoot, replace the delivery,
        or evaluate an appropriate remedy.
      </p>
      <h2>Duplicate payments</h2>
      <p>
        Verified duplicate charges for the same order will be reviewed and corrected.
      </p>
      <h2>Local law</h2>
      <p>
        Nothing in this policy limits consumer rights that cannot legally be waived
        in your jurisdiction.
      </p>
    </LegalPage>
  );
}
