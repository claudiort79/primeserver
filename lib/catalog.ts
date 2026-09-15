export type PrimePackage = {
  slug: string;
  name: string;
  priceCents: number;
  eyebrow: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const PRIME_PACKAGES: PrimePackage[] = [
  {
    slug: "vip-starter",
    name: "VIP Starter",
    priceCents: 990,
    eyebrow: "ESSENTIAL",
    description: "A clean performance baseline with practical presets and setup guidance.",
    features: [
      "Optimized gaming profile",
      "Performance configuration pack",
      "Basic setup guide",
      "Digital delivery",
      "Email support"
    ]
  },
  {
    slug: "vip-pro",
    name: "VIP Pro",
    priceCents: 1990,
    eyebrow: "MOST POPULAR",
    description: "More advanced tuning for players who want a refined gaming setup.",
    features: [
      "Everything in Starter",
      "Advanced performance profile",
      "FPS optimization presets",
      "Network optimization guide",
      "Priority updates",
      "Priority support"
    ],
    featured: true
  },
  {
    slug: "vip-elite",
    name: "VIP Elite",
    priceCents: 2990,
    eyebrow: "PREMIUM",
    description: "The complete PrimeServers configuration bundle with premium support.",
    features: [
      "Everything in Pro",
      "Premium configuration bundle",
      "Multiple optimized profiles",
      "Advanced tuning guide",
      "Priority support",
      "Early access to new profiles"
    ]
  }
];

export const PACKAGE_BY_SLUG = new Map(PRIME_PACKAGES.map((item) => [item.slug, item] as const));

export function allowedProductSlugs() {
  const configured = (process.env.PRIMESERVERS_ALLOWED_PRODUCTS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return new Set(configured.length ? configured : PRIME_PACKAGES.map((item) => item.slug));
}

export function publicPackageForSlug(slug: string) {
  const normalized = slug.trim().toLowerCase();
  if (!allowedProductSlugs().has(normalized)) return null;
  return PACKAGE_BY_SLUG.get(normalized) || {
    slug: normalized,
    name: "PrimeServers Performance Package",
    priceCents: Number.MAX_SAFE_INTEGER,
    eyebrow: "PREMIUM",
    description: "Premium gaming performance configuration package.",
    features: []
  };
}
