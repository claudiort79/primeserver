import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@primeservers.com";

  return (
    <LegalPage
      eyebrow="SUPPORT"
      title="Contact PrimeServers"
      intro="Need help choosing a package or have a question about an existing order? Contact our support team."
    >
      <div className="contactCard">
        <span>EMAIL SUPPORT</span>
        <a href={`mailto:${email}`}>{email}</a>
        <p>
          For order support, include your order reference and the email used during checkout.
          Never send passwords, full card numbers or private Stripe credentials by email.
        </p>
      </div>
      <h2>What to include</h2>
      <p>
        Tell us which VIP package you are using, your operating system, basic hardware
        details and a concise description of the issue.
      </p>
      <h2>Payment questions</h2>
      <p>
        Include the order reference shown by the storefront where you started the purchase.
        PrimeServers support will never ask for your full card number.
      </p>
    </LegalPage>
  );
}
