import Link from "next/link";
import { Brand } from "@/components/Brand";

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="shell footerGrid">
        <div>
          <Brand />
          <p className="footerCopy">
            Premium gaming configurations, performance profiles and VIP support.
          </p>
        </div>
        <div className="footerLinks">
          <Link href="/#vip">VIP Packages</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund">Refund Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      <div className="shell footerBottom">
        <span>© {new Date().getFullYear()} PrimeServers. All rights reserved.</span>
        <span>Digital performance configurations · Secure Stripe Checkout</span>
      </div>
    </footer>
  );
}
