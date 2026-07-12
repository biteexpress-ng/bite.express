import { ArrowRight, Download, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export type DeepLinkType =
  | "store"
  | "product"
  | "category"
  | "campaign"
  | "refer"
  | "bitepass"
  | "order"
  | "track";

type Copy = { label: string; title: string; blurb: string };

const COPY: Record<DeepLinkType, Copy> = {
  store: {
    label: "Restaurants & stores",
    title: "Open this store in the BiteExpress app",
    blurb:
      "Browse the full menu, prices and reviews, then order in a couple of taps with live tracking to your door.",
  },
  product: {
    label: "Menu item",
    title: "View this item in the BiteExpress app",
    blurb:
      "See the full details, customise your order and add it straight to your cart.",
  },
  category: {
    label: "Category",
    title: "Browse this category in the BiteExpress app",
    blurb:
      "Discover everything available near you in this category, from local favourites to new arrivals.",
  },
  campaign: {
    label: "Offer",
    title: "Grab this offer in the BiteExpress app",
    blurb:
      "Limited-time deals and campaigns live in the app, open it to claim this one before it's gone.",
  },
  refer: {
    label: "Invitation",
    title: "Claim your invite in the BiteExpress app",
    blurb:
      "A friend sent you a BiteExpress reward. Install the app and your invite will be waiting for you.",
  },
  bitepass: {
    label: "BitePass",
    title: "Unlock BitePass in the BiteExpress app",
    blurb:
      "Free delivery and member perks across food, grocery and more. Manage your BitePass in the app.",
  },
  order: {
    label: "Your order",
    title: "See your order in the BiteExpress app",
    blurb:
      "View your order details, receipt and status, and reorder your favourites in a tap.",
  },
  track: {
    label: "Live tracking",
    title: "Track your delivery in the BiteExpress app",
    blurb:
      "Follow your rider live on the map with real-time ETAs from the kitchen to your door.",
  },
};

/** Shared metadata for every deep-link route — always noindex (thin, ID-based). */
export function deepLinkMetadata(type: DeepLinkType, path: string) {
  const copy = COPY[type];
  return buildMetadata({
    title: copy.title,
    description: copy.blurb,
    path,
    noIndex: true,
  });
}

/**
 * Fallback landing for the app's deep-link paths (e.g. /store/123).
 *
 * An installed app intercepts these via Universal Links / App Links and the
 * user never sees this page — it renders only for visitors WITHOUT the app
 * (or on desktop), so its job is to convert them to an install rather than
 * 404. The `biteexpress://` link is a best-effort open for the rare case
 * where the app is installed but the OS didn't intercept the original link.
 */
export function DeepLinkLanding({
  type,
  param,
}: {
  type: DeepLinkType;
  param?: string;
}) {
  const copy = COPY[type];
  // Mirror DeepLinkHelper's parsing in the app: the host segment is ignored,
  // so `open/<type>/<id>` yields pathSegments = [type, id] just like the
  // https Universal Link does.
  const appScheme = `biteexpress://open/${type}${param ? `/${param}` : ""}`;

  return (
    <section className="relative overflow-hidden aurora-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-brand-red/10 blur-3xl"
      />
      <Container size="narrow" className="relative">
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center py-20 text-center">
          <Eyebrow>{copy.label}</Eyebrow>
          <h1 className="mt-6 font-serif text-[2rem] leading-[1.1] tracking-tight text-ink-900 sm:text-[2.75rem]">
            {copy.title}
          </h1>
          <p className="mt-5 text-lg text-ink-600">{copy.blurb}</p>

          {/* Primary: get the app */}
          <div className="mt-10 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink
              href={siteConfig.appStore.ios}
              external
              variant="obsidian"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Download size={18} />
              App Store
            </ButtonLink>
            <ButtonLink
              href={siteConfig.appStore.android}
              external
              variant="obsidian"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Download size={18} />
              Google Play
            </ButtonLink>
          </div>

          {/* Secondary: already have the app installed */}
          <a
            href={appScheme}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 transition-colors hover:text-brand-red"
          >
            <Smartphone size={15} />
            Already have the app? Open it
          </a>

          {/* Tertiary: keep browsing on the web */}
          <a
            href={siteConfig.shopHref}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-800"
          >
            Browse on the web instead
            <ArrowRight size={14} />
          </a>
        </div>
      </Container>
    </section>
  );
}
