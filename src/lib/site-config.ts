/**
 * Single source of truth for site-wide identity, URLs, and navigation.
 * Read by metadata, sitemap, structured data, header, and footer.
 */

export const siteConfig = {
  name: "BiteExpress",
  legalName: "BiteExpress Limited",
  shortDescription:
    "Get food, groceries, pharmacy and more, delivered fast across Nigeria.",
  longDescription:
    "Order from your favourite restaurants, supermarkets, pharmacies and local stores. Fast delivery, live tracking, and exclusive offers, only on BiteExpress.",
  url: "https://bite.express",
  appUrl: "https://app.bite.express",
  /** BiteExpress agent PWA (agents.bite.express) — where certified agents sign
   *  in, sign customers up and track earnings. Surfaced on /agents. */
  agentAppUrl: "https://agents.bite.express",
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
  /**
   * WhatsApp ORDERING bot — the conversational commerce channel where
   * customers browse, order and pay entirely inside WhatsApp. This is a
   * DIFFERENT line from the general support `whatsappNumber` above.
   *
   * `link` is the single source of truth for every "Order on WhatsApp"
   * CTA across the site. Never hardcode the number inline — import this.
   * The `?text=hi` prefill drops the customer straight into the bot's
   * welcome flow.
   */
  whatsappOrder: {
    number: "2347042123000",
    display: "+234 704 212 3000",
    link: "https://wa.me/2347042123000?text=hi",
  },
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
    /**
     * Consolidated onto the ORDERING bot line (see whatsappOrder above): the
     * bot carries the Meta-verified "BiteExpress" business profile and handles
     * support too (Help + talk-to-agent -> customer-care callback), so every
     * WhatsApp entry point on the site lands in the same managed channel.
     * The old support line (2349123051662) remains reachable by phone/tel.
     */
    whatsapp: "https://wa.me/2347042123000?text=hi",
  },
  /** BiteExpress customer app — used on the deep-link landing pages. */
  appStore: {
    ios: "https://apps.apple.com/ng/app/biteexpress/id6466211766",
    android:
      "https://play.google.com/store/apps/details?id=com.biteexpress.biteexpress",
  },
  /** BiteExpress Driver (rider) app — surfaced on /riders. */
  driverAppStore: {
    ios: "https://apps.apple.com/ng/app/biteexpress-drivers/id6467380622",
    android:
      "https://play.google.com/store/apps/details?id=com.biteexpress.bitex_drivers",
  },
  /** BiteExpress Vendor app — surfaced on /vendors. */
  vendorAppStore: {
    ios: "https://apps.apple.com/ng/app/biteexpress-vendors/id6466212225",
    android:
      "https://play.google.com/store/apps/details?id=com.biteexpress.bitex_vendors",
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
    { label: "Agent Login", href: siteConfig.agentAppUrl, external: true },
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
