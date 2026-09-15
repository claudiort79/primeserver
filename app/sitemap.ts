import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://primeservers.com").replace(/\/$/, "");
  return ["", "/terms", "/privacy", "/refund", "/contact"].map((path) => ({
    url: `${site}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.5 : 1,
  }));
}
