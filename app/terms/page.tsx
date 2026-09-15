import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Terms of Service"
      intro="These terms describe the use of PrimeServers and the purchase of our digital performance packages."
    >
      <h2>1. Digital products</h2>
      <p>
        PrimeServers provides digital configuration packages, performance profiles,
        setup documentation and support services as described on the applicable product page.
      </p>
      <h2>2. Orders and payment</h2>
      <p>
        Prices and package scope are shown before payment. Eligible card transactions
        are processed by Stripe. PrimeServers does not receive or store your full card number.
      </p>
      <h2>3. Delivery</h2>
      <p>
        Digital delivery begins after payment confirmation. Keep your order reference
        and use the same email address when requesting support.
      </p>
      <h2>4. Acceptable use</h2>
      <p>
        Products are intended for lawful personal configuration and optimization use.
        You are responsible for changes made to your computer and for maintaining backups
        of important files and settings.
      </p>
      <h2>5. Compatibility</h2>
      <p>
        Results vary by hardware, software, drivers, game updates and system condition.
        No specific FPS increase or latency reduction is guaranteed unless explicitly stated.
      </p>
      <h2>6. Support</h2>
      <p>
        Support level depends on the purchased VIP package. We may request system
        information reasonably necessary to troubleshoot a configuration issue.
      </p>
    </LegalPage>
  );
}
