import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://primeservers.com";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/checkout", "/api/"] }],
    sitemap: `${site}/sitemap.xml`,
  };
}
