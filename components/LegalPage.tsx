import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="legalMain">
        <div className="shell legalShell">
          <div className="legalHero">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
          <article className="legalCard">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}
