import { getTranslations } from "next-intl/server";
import { MapPin, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { allLocalBusinessesSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Order food, groceries & more, delivered fast in Nigeria`,
  description:
    "Order from thousands of restaurants, supermarkets, pharmacies and local shops across Nigeria. Live tracking, fair prices, fast delivery — only on BiteExpress.",
  path: "/",
  keywords: [
    "food delivery Nigeria",
    "grocery delivery",
    "BiteExpress",
    "order food online",
    "Kaduna food delivery",
    "Lagos food delivery",
    "Abuja food delivery",
    "Kano food delivery",
    "Jos food delivery",
    "pharmacy delivery",
    "supermarket delivery",
    "on-demand delivery Nigeria",
  ],
});

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      {/* Per-page structured data — every city we serve as a LocalBusiness
          + the breadcrumb. The brand-wide Organization/WebSite schemas
          are emitted by the root layout. */}
      <JsonLd id="ld-localbusiness" data={allLocalBusinessesSchema()} />
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbSchema([{ name: "Home", path: "/" }])}
      />

      {/* Hero — placeholder until Phase 2 ships the real composition */}
      <section className="relative overflow-hidden bg-ink-50 pt-12 pb-24 sm:pt-20 sm:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl"
        />

        <Container className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-ink-700 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            {t("hero.eyebrow")}
          </span>

          <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.25rem]">
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
            {t("hero.subtitle")}
          </p>

          {/* Address picker — visual stub; wired in Phase 2 */}
          <form
            className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
            action={siteConfig.appUrl}
            method="get"
          >
            <label className="relative flex flex-1 items-center">
              <MapPin
                size={18}
                className="pointer-events-none absolute left-4 text-ink-400"
              />
              <input
                type="text"
                name="q"
                placeholder={t("hero.addressPlaceholder")}
                className="h-14 w-full rounded-full border border-ink-200 bg-white pl-11 pr-5 text-base text-ink-900 placeholder:text-ink-400 shadow-sm transition-shadow focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                aria-label={t("hero.addressPlaceholder")}
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-red px-7 text-base font-medium text-white shadow-sm transition-colors hover:bg-brand-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Search size={18} />
              {t("hero.cta")}
            </button>
          </form>

          <p className="mt-4 text-sm text-ink-600">
            Or{" "}
            <a
              href={siteConfig.appUrl}
              className="font-medium text-brand-red underline-offset-4 hover:underline"
            >
              open the app
            </a>{" "}
            to keep browsing where you left off.
          </p>
        </Container>
      </section>

      {/* Phase-1 status panel — remove when Phase 2 lands */}
      <Container className="py-16">
        <div className="rounded-3xl border border-ink-200 bg-white p-8 sm:p-12">
          <span className="inline-flex items-center rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-red">
            Phase 1 — SEO infrastructure live
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-ink-900 sm:text-4xl">
            Metadata, sitemap, JSON-LD and OG images wired across the site.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-600">
            {t("comingSoon")} Every page now ships with canonical URLs,
            Organization + WebSite + LocalBusiness structured data, a
            dynamic sitemap, env-aware robots, branded OG images, and an
            analytics scaffold. Phase 2 brings the full marketing site:
            For Vendors, Riders, Agents, Careers, About and the city /
            cuisine landing matrix.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={siteConfig.appUrl} external variant="primary">
              Open the customer app
            </ButtonLink>
            <ButtonLink href="/about" variant="outline">
              About BiteExpress
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
