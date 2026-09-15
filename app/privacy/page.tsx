import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY"
      title="Privacy Policy"
      intro="PrimeServers collects only the information reasonably necessary to process orders, provide support and operate this website."
    >
      <h2>Information we process</h2>
      <p>
        Depending on how your order is initiated, we may process your email address,
        order reference, selected package, payment status and technical request logs.
      </p>
      <h2>Payment information</h2>
      <p>
        Card details are collected by Stripe through Stripe Checkout. PrimeServers
        receives payment status and transaction identifiers, not your full card number.
      </p>
      <h2>How information is used</h2>
      <p>
        Information is used for order processing, digital delivery, customer support,
        fraud prevention, security and service improvement.
      </p>
      <h2>Sharing</h2>
      <p>
        We may share the minimum necessary data with service providers that operate
        hosting, payment processing, communications or order infrastructure.
      </p>
      <h2>Retention and security</h2>
      <p>
        We retain operational data only as reasonably necessary for legitimate business,
        accounting, security and support purposes. Access to secrets and payment integrations
        is restricted to server-side systems.
      </p>
    </LegalPage>
  );
}
