import Link from "next/link";
import { Brand } from "@/components/Brand";

export function Header() {
  return (
    <header className="siteHeader">
      <div className="shell navInner">
        <Brand />
        <nav className="navLinks" aria-label="Primary navigation">
          <Link href="/#vip">VIP Packages</Link>
          <Link href="/#why">Why PrimeServers</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/contact" className="navCta">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
