import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Step } from "@/components/ui/step";
import { Stat } from "@/components/ui/stat";
import { CityChip } from "@/components/ui/city-chip";
import { ModuleCard } from "@/components/ui/module-card";
import { AppBadges } from "@/components/ui/app-badges";
import { CTABand } from "@/components/ui/cta-band";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";

import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { allLocalBusinessesSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { cities } from "@/lib/cities";
import { deliveryModules } from "@/lib/modules";

export const metadata = buildMetadata({
  title: `${siteConfig.name} — Order food, groceries & more, delivered fast in Nigeria`,
  description:
    "Order from thousands of restaurants, supermarkets, pharmacies and local shops across Nigeria. Live tracking, fair prices, fast delivery — only on BiteExpress.",
  path: "/",
  keywords: [
    "food delivery Nigeria",
    "grocery delivery Nigeria",
    "BiteExpress",
    "order food online Nigeria",
    "Kaduna food delivery",
    "Lagos food delivery",
    "Abuja food delivery",
    "Kano food delivery",
    "Jos food delivery",
    "pharmacy delivery",
    "supermarket delivery",
    "on-demand delivery Nigeria",
    "restaurant delivery Zaria",
  ],
});

export default async function HomePage() {
  const t = await getTranslations("home");

  // FAQs sourced from i18n; surface here so the JSON-LD schema and the
  // visible accordion are guaranteed to match exactly.
  const faqs = [
    { question: t("faq.items.q1.question"), answer: t("faq.items.q1.answer") },
    { question: t("faq.items.q2.question"), answer: t("faq.items.q2.answer") },
    { question: t("faq.items.q3.question"), answer: t("faq.items.q3.answer") },
    { question: t("faq.items.q4.question"), answer: t("faq.items.q4.answer") },
    { question: t("faq.items.q5.question"), answer: t("faq.items.q5.answer") },
    { question: t("faq.items.q6.question"), answer: t("faq.items.q6.answer") },
  ];

  return (
    <>
      {/* Per-page JSON-LD: every served city + breadcrumb + FAQ */}
      <JsonLd id="ld-localbusiness" data={allLocalBusinessesSchema()} />
      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema([{ name: "Home", path: "/" }])} />
      <JsonLd id="ld-faq" data={faqSchema(faqs)} />

      {/* =====================================================================
       * HERO
       * ===================================================================*/}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white pt-12 pb-24 sm:pt-20 sm:pb-28">
        {/* Brand splash decorations */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-red/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-orange/15 blur-3xl"
        />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="max-w-2xl">
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>

              <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.02] tracking-tight text-ink-900 sm:text-[4rem] md:text-[4.75rem] lg:text-[5.5rem]">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-xl text-lg text-ink-600 sm:text-xl">
                {t("hero.subtitle")}
              </p>

              {/* Address picker — Phase 4 wires this to Google Places + the
                  customer-app handoff with cookies on .bite.express. For now
                  it submits straight to the customer app. */}
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

              {/* Trust signal */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-600">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={16} className="text-brand-red" />
                  Live order tracking
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={16} className="text-brand-red" />
                  25–45 min avg. delivery
                </span>
                <span className="inline-flex items-center gap-2">
                  <Wallet size={16} className="text-brand-red" />
                  Card · transfer · cash
                </span>
              </div>
            </div>

            {/* Decorative hero card — until product photography lands */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] w-full rounded-[2rem] bg-gradient-to-br from-brand-black via-[#1a0606] to-brand-red p-1 shadow-elevated">
                <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-brand-black">
                  {/* Bolt watermark */}
                  <div
                    aria-hidden
                    className="absolute -bottom-10 -right-10 text-[24rem] leading-none text-brand-red/15"
                  >
                    ⚡
                  </div>

                  {/* Floating "order in progress" card */}
                  <div className="absolute left-6 top-6 right-6 flex items-center gap-3 rounded-2xl bg-white/95 p-4 backdrop-blur">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-ink-600">
                        Order on the way
                      </div>
                      <div className="text-sm font-semibold text-ink-900">
                        Arriving in 18 min
                      </div>
                    </div>
                  </div>

                  {/* Big phrase */}
                  <div className="absolute inset-x-8 bottom-10 text-white">
                    <div className="font-serif text-3xl leading-[1.1] sm:text-4xl">
                      Hot, fresh and
                      <br />
                      on your terms.
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/70">
                      <MessageCircle size={14} />
                      Chat your rider live
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
       * MODULES GRID — what BiteExpress delivers
       * ===================================================================*/}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading
            eyebrow={t("modules.eyebrow")}
            title={t("modules.title")}
            subtitle={t("modules.subtitle")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryModules.map((m) => (
              <ModuleCard
                key={m.slug}
                name={m.name}
                description={m.description}
                href={m.href}
                icon={m.icon}
                accentClassName={m.accent}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================================
       * STATS BAND (dark)
       * Note: numbers are placeholders — replace with live ops data in Phase 3.
       * ===================================================================*/}
      <Section background="dark" padding="md">
        <Container>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Stat invert value="10+" label={t("stats.cities")} />
            <Stat invert value="500+" label={t("stats.vendors")} />
            <Stat invert value="1,200+" label={t("stats.riders")} />
            <Stat invert value="100k+" label={t("stats.orders")} />
          </div>
        </Container>
      </Section>

      {/* =====================================================================
       * HOW IT WORKS
       * ===================================================================*/}
      <Section background="soft" padding="lg">
        <Container>
          <SectionHeading
            eyebrow={t("howItWorks.eyebrow")}
            title={t("howItWorks.title")}
            subtitle={t("howItWorks.subtitle")}
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <Step
              number={1}
              title={t("howItWorks.step1.title")}
              description={t("howItWorks.step1.description")}
            />
            <Step
              number={2}
              title={t("howItWorks.step2.title")}
              description={t("howItWorks.step2.description")}
            />
            <Step
              number={3}
              title={t("howItWorks.step3.title")}
              description={t("howItWorks.step3.description")}
            />
          </div>
        </Container>
      </Section>

      {/* =====================================================================
       * CITIES
       * ===================================================================*/}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading
            eyebrow={t("cities.eyebrow")}
            title={t("cities.title")}
            subtitle={t("cities.subtitle")}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <CityChip
                key={c.slug}
                name={c.name}
                state={c.state}
                href={`/cities/${c.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================================
       * VENDOR CTA BAND
       * ===================================================================*/}
      <CTABand
        variant="dark"
        eyebrow={t("vendorBand.eyebrow")}
        title={t("vendorBand.title")}
        subtitle={t("vendorBand.subtitle")}
        cta={
          <ButtonLink href="/vendors" variant="primary" size="lg">
            {t("vendorBand.cta")}
            <ArrowRight size={18} />
          </ButtonLink>
        }
        secondaryCta={
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/85 hover:text-white"
          >
            Learn more
            <ChevronRight size={16} />
          </Link>
        }
      />

      {/* =====================================================================
       * APP SHOWCASE
       * ===================================================================*/}
      <Section background="white" padding="xl">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>{t("appShowcase.eyebrow")}</Eyebrow>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-ink-900 sm:text-5xl md:text-6xl">
                {t("appShowcase.title")}
              </h2>
              <p className="mt-6 max-w-xl text-lg text-ink-600">
                {t("appShowcase.subtitle")}
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  t("appShowcase.bullet1"),
                  t("appShowcase.bullet2"),
                  t("appShowcase.bullet3"),
                  t("appShowcase.bullet4"),
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-base text-ink-700"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 flex-none text-brand-red"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <AppBadges variant="dark" />
              </div>
            </div>

            {/* Decorative phone-mockup placeholder */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[9/16] w-full rounded-[3rem] border-[10px] border-brand-black bg-brand-black p-2 shadow-elevated">
                <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-ink-50 to-white">
                  {/* Notch */}
                  <div className="mx-auto mt-3 h-5 w-24 rounded-full bg-brand-black" />

                  {/* Pretend app content */}
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-ink-600">
                      Delivering to
                    </div>
                    <div className="font-serif text-xl text-ink-900">
                      Samaru, Zaria
                    </div>

                    <div className="mt-6 grid gap-3">
                      {[
                        { name: "Mama's Kitchen", meta: "Jollof · 25 min" },
                        { name: "Sahel Grills", meta: "Suya · 22 min" },
                        { name: "Greenfield Market", meta: "Grocery · 35 min" },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="rounded-2xl border border-ink-200 bg-white p-4"
                        >
                          <div className="font-semibold text-ink-900">
                            {item.name}
                          </div>
                          <div className="text-xs text-ink-600">{item.meta}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-2xl bg-brand-red p-4 text-white">
                      <div>
                        <div className="text-xs uppercase tracking-wider opacity-80">
                          Order on the way
                        </div>
                        <div className="font-semibold">Arriving 6:42pm</div>
                      </div>
                      <Sparkles size={22} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Soft glow */}
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-[4rem] bg-brand-red/10 blur-3xl"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================================
       * RIDER CTA BAND
       * ===================================================================*/}
      <CTABand
        variant="brand"
        eyebrow={t("riderBand.eyebrow")}
        title={t("riderBand.title")}
        subtitle={t("riderBand.subtitle")}
        cta={
          <ButtonLink href="/riders" variant="secondary" size="lg">
            {t("riderBand.cta")}
            <ArrowRight size={18} />
          </ButtonLink>
        }
      />

      {/* =====================================================================
       * FAQ
       * ===================================================================*/}
      <Section background="white" padding="xl">
        <Container size="narrow">
          <SectionHeading
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            subtitle={t("faq.subtitle")}
            align="center"
          />
          <FaqAccordion items={faqs} className="mt-12" />
        </Container>
      </Section>

      {/* =====================================================================
       * FINAL CTA
       * ===================================================================*/}
      <Section background="dark" padding="lg" className="text-center">
        <Container>
          <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={siteConfig.appUrl} external variant="primary" size="lg">
              {t("finalCta.primary")}
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href={siteConfig.appUrl} external variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
              {t("finalCta.secondary")}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
