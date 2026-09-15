import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PRIME_PACKAGES } from "@/lib/catalog";

const why = [
  {
    icon: "↗",
    title: "Performance",
    text: "Optimized configurations built around smooth, consistent gameplay.",
  },
  {
    icon: "⌁",
    title: "Low latency",
    text: "Practical profiles focused on responsive gaming setups and clean baselines.",
  },
  {
    icon: "✓",
    title: "Easy setup",
    text: "Clear documentation, sensible defaults and a setup process you can understand.",
  },
  {
    icon: "◇",
    title: "Premium support",
    text: "VIP tiers include priority help for configuration and setup questions.",
  },
];

const faqs = [
  [
    "What is PrimeServers?",
    "PrimeServers provides gaming performance configurations, optimization packages and premium support.",
  ],
  [
    "How do I receive my package?",
    "Digital products are delivered after payment confirmation through the storefront or partner where you started your order.",
  ],
  [
    "Which games are supported?",
    "Support varies by package and configuration profile. The package description shown before checkout is the authoritative scope.",
  ],
  [
    "Are payments secure?",
    "Eligible card payments are processed using Stripe Checkout. PrimeServers does not collect raw card details.",
  ],
  [
    "Can I request support?",
    "Yes. VIP plans include different support levels. Contact us with your order reference if you need help.",
  ],
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="heroGlow heroGlowOne" />
          <div className="heroGlow heroGlowTwo" />
          <div className="shell heroGrid">
            <div className="heroCopy">
              <div className="pill">
                <span className="dot" />
                Premium gaming performance
              </div>
              <h1>
                A cleaner setup.
                <span>A sharper gaming experience.</span>
              </h1>
              <p className="heroLead">
                Performance profiles, optimized configurations and VIP support
                designed for players who want a polished gaming setup without
                random tweaks.
              </p>
              <div className="heroActions">
                <Link className="primaryButton" href="/#vip">
                  View VIP packages <span>→</span>
                </Link>
                <Link className="secondaryButton" href="/#how">
                  How it works
                </Link>
              </div>
              <div className="trustRow">
                <span>✓ Secure Checkout</span>
                <span>✓ Digital Delivery</span>
                <span>✓ Premium Support</span>
              </div>
            </div>

            <div className="serverVisual" aria-label="PrimeServers performance dashboard illustration">
              <div className="visualTop">
                <div>
                  <p className="visualLabel">PRIMESERVERS PROFILE</p>
                  <strong>VIP Performance Node</strong>
                </div>
                <span className="liveBadge"><i />ONLINE</span>
              </div>

              <div className="rack">
                {[88, 64, 78, 51].map((value, index) => (
                  <div className="rackRow" key={value}>
                    <div className="rackLights">
                      <i />
                      <i />
                    </div>
                    <span>NODE-0{index + 1}</span>
                    <div className="meter"><b style={{ width: `${value}%` }} /></div>
                    <small>{value}%</small>
                  </div>
                ))}
              </div>

              <div className="visualStats">
                <div>
                  <span>PROFILE</span>
                  <strong>Optimized</strong>
                </div>
                <div>
                  <span>LATENCY</span>
                  <strong>Priority</strong>
                </div>
                <div>
                  <span>SUPPORT</span>
                  <strong>VIP</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="logoStrip">
          <div className="shell stripInner">
            <span>WINDOWS 10 / 11</span>
            <i />
            <span>NVIDIA</span>
            <i />
            <span>AMD</span>
            <i />
            <span>INTEL</span>
            <i />
            <span>PC GAMING</span>
          </div>
        </section>

        <section id="vip" className="section shell">
          <div className="sectionHeading centered">
            <p className="eyebrow">VIP PACKAGES</p>
            <h2>Choose your performance tier.</h2>
            <p>
              Straightforward digital packages with clear features and a premium
              configuration experience.
            </p>
          </div>

          <div className="pricingGrid">
            {PRIME_PACKAGES.map((pkg) => (
              <article className={`priceCard ${pkg.featured ? "featured" : ""}`} key={pkg.slug}>
                <div className="priceCardTop">
                  <span className="packageBadge">{pkg.eyebrow}</span>
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                </div>
                <div className="price">
                  <span>$</span>
                  <strong>{(pkg.priceCents / 100).toFixed(2)}</strong>
                  <small>USD</small>
                </div>
                <ul>
                  {pkg.features.map((feature) => (
                    <li key={feature}><span>✓</span>{feature}</li>
                  ))}
                </ul>
                <Link className={pkg.featured ? "primaryButton full" : "secondaryButton full"} href="/contact">
                  Get {pkg.name}
                </Link>
              </article>
            ))}
          </div>
          <p className="packageNote">
            Secure purchase links are opened from an approved PrimeServers storefront or partner product page.
          </p>
        </section>

        <section id="why" className="section sectionTint">
          <div className="shell">
            <div className="sectionHeading">
              <p className="eyebrow">WHY PRIMESERVERS</p>
              <h2>Focused tuning. No random “optimization” list.</h2>
              <p>
                PrimeServers packages are designed around clear configuration
                goals, practical documentation and repeatable setup.
              </p>
            </div>

            <div className="featureGrid">
              {why.map((item) => (
                <article className="featureCard" key={item.title}>
                  <span className="featureIcon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="section shell">
          <div className="processGrid">
            <div className="sectionHeading">
              <p className="eyebrow">SIMPLE PROCESS</p>
              <h2>From package to setup in three steps.</h2>
              <p>
                The payment flow is intentionally simple, and raw card details
                remain with Stripe Checkout.
              </p>
            </div>
            <div className="steps">
              {[
                ["01", "Choose your VIP package", "Select the package that matches the configuration and support level you need."],
                ["02", "Complete secure checkout", "Your eligible card payment opens in Stripe's hosted checkout."],
                ["03", "Receive your digital package", "After confirmed payment, delivery and support instructions are provided automatically."],
              ].map(([number, title, text]) => (
                <div className="step" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section sectionTint">
          <div className="shell faqWrap">
            <div className="sectionHeading centered">
              <p className="eyebrow">FAQ</p>
              <h2>Common questions.</h2>
            </div>
            <div className="faqGrid">
              {faqs.map(([question, answer]) => (
                <details className="faqItem" key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell">
          <div className="ctaPanel">
            <div>
              <p className="eyebrow">READY WHEN YOU ARE</p>
              <h2>Build a cleaner gaming baseline.</h2>
              <p>Choose the VIP tier that fits your setup and support needs.</p>
            </div>
            <Link className="lightButton" href="/#vip">Explore VIP Packages →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
