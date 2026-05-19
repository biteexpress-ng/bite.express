import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { AppBadges } from "@/components/ui/app-badges";
import { CTABand } from "@/components/ui/cta-band";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";

import { HeroShowcase } from "@/components/home/HeroShowcase";
import { HomeServiceCard } from "@/components/home/HomeServiceCard";
import { PremiumStatsBand } from "@/components/home/PremiumStatsBand";
import { HowItWorksTimeline } from "@/components/home/HowItWorksTimeline";
import { BenefitsBand } from "@/components/home/BenefitsBand";
import { CitiesCoverage } from "@/components/home/CitiesCoverage";
import { PartnerTrustStrip } from "@/components/home/PartnerTrustStrip";
import { HomeFinalCTA } from "@/components/home/HomeFinalCTA";

import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import {
  allLocalBusinessesSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/jsonld";
import { deliveryModules } from "@/lib/modules";
import { cities } from "@/lib/cities";

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
    "petrol delivery Nigeria",
    "restaurant delivery Zaria",
  ],
});

export default async function HomePage() {
  const t = await getTranslations("home");

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
      {/* Brand-level JSON-LD: every city as a LocalBusiness, breadcrumb, FAQ */}
      <JsonLd id="ld-localbusiness" data={allLocalBusinessesSchema()} />
      <JsonLd
        id="ld-breadcrumb"
        data={breadcrumbSchema([{ name: "Home", path: "/" }])}
      />
      <JsonLd id="ld-faq" data={faqSchema(faqs)} />

      {/* 1. HERO */}
      <HeroShowcase
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        addressPlaceholder={t("hero.addressPlaceholder")}
        cta={t("hero.cta")}
        chipTracking={t("hero.chipTracking")}
        chipEta={t("hero.chipEta")}
        chipPayments={t("hero.chipPayments")}
      />

      {/* 2. DELIVERY MODULES — One app. Every essential. */}
      <Section background="white" padding="xl">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={t("modules.eyebrow")}
              title={t("modules.title")}
              subtitle={t("modules.subtitle")}
            />
            <ButtonLink href="/cuisines" variant="outline" size="sm">
              View all services
              <ChevronRight size={14} />
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryModules.map((m, i) => (
              <HomeServiceCard key={m.slug} service={m} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. DARK STATS BAND */}
      <PremiumStatsBand />

      {/* 4. HOW IT WORKS */}
      <HowItWorksTimeline
        eyebrow={t("howItWorks.eyebrow")}
        title={t("howItWorks.title")}
        subtitle={t("howItWorks.subtitle")}
        steps={[
          {
            title: t("howItWorks.step1.title"),
            description: t("howItWorks.step1.description"),
          },
          {
            title: t("howItWorks.step2.title"),
            description: t("howItWorks.step2.description"),
          },
          {
            title: t("howItWorks.step3.title"),
            description: t("howItWorks.step3.description"),
          },
        ]}
      />

      {/* 5. PREMIUM BENEFITS BAND (dark) */}
      <BenefitsBand
        eyebrow="Why choose BiteExpress"
        title="Smart delivery. Thoughtful by design."
        subtitle="Every detail of BiteExpress is designed for speed, trust and the realities of Nigerian neighbourhoods."
        benefits={[
          {
            title: "Live tracking",
            description: "Follow your order from kitchen to door in real time.",
          },
          {
            title: "Fast & reliable",
            description: "Average delivery in 25–45 minutes across our cities.",
          },
          {
            title: "Secure payments",
            description: "Pay your way — card, transfer or cash on delivery.",
          },
          {
            title: "24/7 support",
            description: "Real humans when something needs a real human.",
          },
        ]}
      />

      {/* 6. CITIES COVERAGE */}
      <CitiesCoverage
        eyebrow={t("cities.eyebrow")}
        title={t("cities.title")}
        subtitle={t("cities.subtitle")}
        cities={cities}
      />

      {/* 7. VENDOR CTA */}
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

      {/* 8. APP SHOWCASE */}
      <Section background="white" padding="xl">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                {t("appShowcase.eyebrow")}
              </span>
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

            {/* Decorative phone-mockup placeholder for showcase */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[9/16] w-full rounded-[3rem] border-[10px] border-brand-black bg-brand-black premium-shadow">
                <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-ink-50 to-white">
                  <div className="mx-auto mt-3 h-5 w-24 rounded-full bg-brand-black" />
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
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-[4rem] bg-brand-red/10 blur-3xl"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. RIDER CTA BAND */}
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

      {/* 10. FAQ */}
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

      {/* PARTNER TRUST STRIP */}
      <PartnerTrustStrip
        title="Loved by customers. Powered by partners."
        items={[
          "Top Restaurants",
          "Supermarkets",
          "Pharmacies",
          "Local Bakeries",
          "Fuel Stations",
        ]}
      />

      {/* 11. FINAL CTA */}
      <HomeFinalCTA
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        placeholder={t("hero.addressPlaceholder")}
        cta={t("finalCta.primary")}
      />
    </>
  );
}
