import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ChevronRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABand } from "@/components/ui/cta-band";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

import { HeroShowcase } from "@/components/home/HeroShowcase";
import { HomeServiceCard } from "@/components/home/HomeServiceCard";
import { PremiumStatsBand } from "@/components/home/PremiumStatsBand";
import { HowItWorksTimeline } from "@/components/home/HowItWorksTimeline";
import { BenefitsBand } from "@/components/home/BenefitsBand";
import { CitiesCoverage } from "@/components/home/CitiesCoverage";
import { PartnerTrustStrip } from "@/components/home/PartnerTrustStrip";
import { HomeFinalCTA } from "@/components/home/HomeFinalCTA";
import { AppShowcase } from "@/components/home/AppShowcase";
import { FooterRiderPath } from "@/components/home/FooterRiderPath";
import { WhatsAppAnnounce } from "@/components/home/WhatsAppAnnounce";

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
  title: `${siteConfig.name}, Order food, groceries & more, delivered fast in Nigeria`,
  description:
    "Order from thousands of restaurants, supermarkets, pharmacies and local shops across Nigeria. Live tracking, fair prices, fast delivery, only on BiteExpress.",
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
    "wine delivery Nigeria",
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
      {/* Premium grain texture overlay */}
      <GrainOverlay />

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

      {/* 1b. WHATSAPP ORDERING ANNOUNCEMENT */}
      <WhatsAppAnnounce
        badge={t("waAnnounce.badge")}
        title={t("waAnnounce.title")}
        body={t("waAnnounce.body")}
        cta={t("waAnnounce.cta")}
        secondary={t("waAnnounce.secondary")}
      />

      {/* 2. DELIVERY MODULES */}
      <Section background="white" padding="xl" className="border-b border-ink-200/70">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
                {t("modules.eyebrow")}
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] tracking-normal text-ink-900 sm:text-5xl lg:text-6xl">
                {t("modules.title")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-ink-600">
                {t("modules.subtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-5 lg:items-end">
              <div className="grid w-full grid-cols-3 overflow-hidden rounded-lg border border-ink-200 bg-white shadow-soft lg:max-w-md">
                {["Food", "Essentials", "Errands"].map((label) => (
                  <div
                    key={label}
                    className="border-r border-ink-200 px-4 py-3 last:border-r-0"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-500">
                      {label}
                    </div>
                    <div className="mt-1 h-1 rounded-full bg-brand-red/70" />
                  </div>
                ))}
              </div>
              <ButtonLink href="/cuisines" variant="outline" size="sm">
                View all services
                <ArrowRight size={14} />
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryModules.map((m, i) => (
              <HomeServiceCard
                key={m.slug}
                slug={m.slug}
                name={m.name}
                description={m.description}
                accent={m.accent}
                image={m.image}
                href={m.href}
                index={i}
              />
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
        title="Smart delivery. Thoughtful"
        titleHighlight="by design."
        benefits={[
          {
            title: "Live tracking",
            description: "Follow your order in real time.",
          },
          {
            title: "Fast & reliable",
            description: "Average delivery in 25–45 mins.",
          },
          {
            title: "Secure payments",
            description: "Pay your way, cash or digital.",
          },
          {
            title: "24/7 support",
            description: "We're here when you need us.",
          },
        ]}
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
      <AppShowcase
        eyebrow={t("appShowcase.eyebrow")}
        title={t("appShowcase.title")}
        subtitle={t("appShowcase.subtitle")}
        bullets={[
          t("appShowcase.bullet1"),
          t("appShowcase.bullet2"),
          t("appShowcase.bullet3"),
          t("appShowcase.bullet4"),
        ]}
      />

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

      {/* 11. CITIES COVERAGE */}
      <CitiesCoverage
        eyebrow={t("cities.eyebrow")}
        title={t("cities.title")}
        subtitle={t("cities.subtitle")}
        cities={cities}
      />

      {/* 12. PARTNER TRUST STRIP */}
      <PartnerTrustStrip />

      {/* 11. FINAL CTA */}
      <HomeFinalCTA
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        placeholder={t("hero.addressPlaceholder")}
        cta={t("finalCta.primary")}
      />

      {/* 12. RIDER PATH, in the white gap above the footer */}
      <FooterRiderPath />
    </>
  );
}
