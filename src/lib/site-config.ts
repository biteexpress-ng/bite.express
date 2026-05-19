/**
 * Single source of truth for site-wide identity, URLs, and navigation.
 * Read by metadata, sitemap, structured data, header, and footer.
 */

export const siteConfig = {
  name: "BiteExpress",
  legalName: "BiteExpress Limited",
  shortDescription:
    "Get food, groceries, pharmacy and more — delivered fast across Nigeria.",
  longDescription:
    "Order from your favourite restaurants, supermarkets, pharmacies and local stores. Fast delivery, live tracking, and exclusive offers — only on BiteExpress.",
  url: "https://bite.express",
  appUrl: "https://app.bite.express",
  ogImage: "/brand/og-default.png",
  locale: "en_NG",
  twitter: "@biteexpress",
  email: "hello@bite.express",
  supportEmail: "support@bite.express",
  phone: "+234 800 BITE EXP",
  address: {
    streetAddress: "",
    addressLocality: "Kaduna",
    addressRegion: "Kaduna State",
    addressCountry: "NG",
  },
  social: {
    twitter: "https://twitter.com/biteexpress",
    instagram: "https://instagram.com/biteexpress",
    facebook: "https://facebook.com/biteexpress",
    linkedin: "https://linkedin.com/company/biteexpress",
    tiktok: "https://tiktok.com/@biteexpress",
  },
  appStore: {
    ios: "https://apps.apple.com/app/biteexpress/id000000000",
    android:
      "https://play.google.com/store/apps/details?id=com.biteexpress.user",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

/** Primary navigation (header) */
export const primaryNav: readonly NavItem[] = [
  { label: "Order Food", href: siteConfig.appUrl, external: true },
  { label: "For Vendors", href: "/vendors" },
  { label: "For Riders", href: "/riders" },
  { label: "For Agents", href: "/agents" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

/** Footer link groups */
export const footerNav: Record<string, readonly NavItem[]> = {
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Newsroom", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  partners: [
    { label: "Become a Vendor", href: "/vendors" },
    { label: "Become a Rider", href: "/riders" },
    { label: "Become an Agent", href: "/agents" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact", href: "/contact" },
    {
      label: "Track Order",
      href: `${siteConfig.appUrl}/track-order`,
      external: true,
    },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};
