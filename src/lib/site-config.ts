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
  /**
   * Where "Order now" / cart / "Open the app" CTAs route users.
   * Points at the live customer app on the app subdomain — keep
   * this in sync with appUrl above unless we ever re-host the
   * shopping flow inside this marketing app.
   */
  shopHref: "https://app.bite.express",
  ogImage: "/brand/og-default.png",
  locale: "en_NG",
  twitter: "@biteexpress",
  email: "hello@bite.express",
  supportEmail: "support@bite.express",
  phone: "+234 912 305 1662",
  phoneTel: "2349123051662",
  whatsappNumber: "2349123051662",
  address: {
    streetAddress: "DPlaza, Sokoto Road",
    addressLocality: "Zaria",
    addressRegion: "Kaduna State",
    addressCountry: "NG",
  },
  social: {
    facebook: "https://web.facebook.com/biteexpressapp",
    twitter: "https://twitter.com/biteexpress",
    instagram: "https://instagram.com/biteexpressng",
    linkedin: "https://www.linkedin.com/showcase/biteexpress/",
    youtube: "https://www.youtube.com/@BiteExpressApp",
    whatsapp: "https://wa.me/2349123051662",
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
  { label: "Order Food", href: siteConfig.shopHref },
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
    { label: "Track Order", href: siteConfig.shopHref },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};
