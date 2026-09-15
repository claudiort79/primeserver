import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://primeservers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PrimeServers | Premium Gaming Performance",
    template: "%s | PrimeServers",
  },
  description:
    "Premium gaming configuration packages, performance optimization profiles and VIP support.",
  applicationName: "PrimeServers",
  keywords: [
    "gaming performance",
    "gaming configuration",
    "fps optimization",
    "gaming profiles",
    "VIP support",
  ],
  openGraph: {
    type: "website",
    siteName: "PrimeServers",
    title: "PrimeServers | Premium Gaming Performance",
    description:
      "Premium gaming configuration packages, performance optimization profiles and VIP support.",
    url: "/",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
