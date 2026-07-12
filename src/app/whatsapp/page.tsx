import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Check,
  MessageCircle,
  MessagesSquare,
  PackageCheck,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import {
  SectionReveal,
  StaggerReveal,
  StaggerItem,
} from "@/components/ui/SectionReveal";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppIcon } from "@/components/brand/social-icons";

import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { WhatsAppQr } from "@/components/whatsapp/WhatsAppQr";
import {
  WhatsAppChatMockup,
  type ChatLine,
} from "@/components/whatsapp/WhatsAppChatMockup";

import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";
import { waLiveCities, waComingSoonCities } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("whatsapp");
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/whatsapp",
    keywords: [
      "order food on WhatsApp",
      "order food on WhatsApp Nigeria",
      "WhatsApp food delivery",
      "WhatsApp food delivery Nigeria",
      "food delivery on WhatsApp Kaduna",
      "order food Zaria WhatsApp",
      "chat to order food",
      "no app food delivery Nigeria",
      "BiteExpress WhatsApp",
    ],
  });
}

export default async function WhatsAppPage() {
  const t = await getTranslations("whatsapp");

  const chat: ChatLine[] = [
    { from: "user", text: t("mockup.b1") },
    { from: "bot", text: t("mockup.b2") },
    { from: "user", text: t("mockup.b3") },
    { from: "bot", text: t("mockup.b4") },
    { from: "user", text: t("mockup.b5") },
    { from: "bot", text: t("mockup.b6") },
    { from: "user", text: t("mockup.b7") },
    { from: "bot", text: t("mockup.b8") },
    { from: "user", text: t("mockup.b9") },
    { from: "bot", text: t("mockup.b10") },
  ];

  const steps = [
    { icon: MessageCircle, title: t("how.step1.title"), description: t("how.step1.description") },
    { icon: Search, title: t("how.step2.title"), description: t("how.step2.description") },
    { icon: Banknote, title: t("how.step3.title"), description: t("how.step3.description") },
    { icon: PackageCheck, title: t("how.step4.title"), description: t("how.step4.description") },
  ];

  const faqs = [
    { question: t("faq.items.q1.question"), answer: t("faq.items.q1.answer") },
    { question: t("faq.items.q2.question"), answer: t("faq.items.q2.answer") },
    { question: t("faq.items.q3.question"), answer: t("faq.items.q3.answer") },
    { question: t("faq.items.q4.question"), answer: t("faq.items.q4.answer") },
    { question: t("faq.items.q5.question"), answer: t("faq.items.q5.answer") },
    { question: t("faq.items.q6.question"), answer: t("faq.items.q6.answer") },
  ];

  const trustChips = [t("hero.trust1"), t("hero.trust2"), t("hero.trust3")];

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-whatsapp"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Order on WhatsApp", path: "/whatsapp" },
        ])}
      />
      <JsonLd
        id="ld-howto-whatsapp"
        data={howToSchema({
          name: t("meta.title"),
          description: t("meta.description"),
          totalTime: "PT2M",
          steps: steps.map((s) => ({ name: s.title, text: s.description })),
        })}
      />
      <JsonLd id="ld-faq-whatsapp" data={faqSchema(faqs)} />

      {/* ============================ HERO ============================ */}
      <section className="relative isolate overflow-hidden bg-obsidian pt-16 pb-20 text-white sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        {/* Faint grid + green accent glow (accent, never a fill) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-whatsapp/18 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[22rem] w-[22rem] rounded-full bg-brand-red/12 blur-[120px]"
        />

        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* Left — copy + CTAs */}
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                <WhatsAppIcon size={15} className="text-whatsapp" aria-hidden />
                {t("hero.badge")}
              </span>

              <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-[4.2rem] text-balance">
                {t("hero.title")}
                <span className="mt-1 block text-whatsapp">
                  {t("hero.titleAccent")}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                {t("hero.subtitle")}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <WhatsAppButton size="lg">
                  {t("hero.cta")}
                  <ArrowRight size={18} />
                </WhatsAppButton>
                <span className="text-sm text-white/55">{t("hero.ctaHint")}</span>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {trustChips.map((chip) => (
                  <li
                    key={chip}
                    className="inline-flex items-center gap-2 text-sm text-white/75"
                  >
                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-whatsapp/20 text-whatsapp">
                      <Check size={13} strokeWidth={3} aria-hidden />
                    </span>
                    {chip}
                  </li>
                ))}
              </ul>

              {/* QR — desktop only; mobile users are already on their phone */}
              <div className="mt-9 hidden max-w-sm lg:block">
                <WhatsAppQr label={t("hero.qrLabel")} hint={t("hero.qrHint")} />
              </div>
            </div>

            {/* Right — the chat mockup (the money shot) */}
            <SectionReveal variant="scale-in" duration={0.8} className="lg:pl-6">
              <WhatsAppChatMockup
                headerName={t("mockup.headerName")}
                headerStatus={t("mockup.headerStatus")}
                today={t("mockup.todayLabel")}
                chat={chat}
              />
            </SectionReveal>
          </div>
        </Container>
      </section>

      {/* ======================= HOW IT WORKS ======================= */}
      <Section background="white" padding="xl" className="border-b border-ink-200/70">
        <Container>
          <SectionHeading
            eyebrow={t("how.eyebrow")}
            title={t("how.title")}
            subtitle={t("how.subtitle")}
          />
          <StaggerReveal
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.09}
          >
            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="group card-luxe flex h-full flex-col gap-4 p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-whatsapp/12 text-whatsapp-ink transition-colors duration-200 ease-out-expo group-hover:bg-whatsapp-cta group-hover:text-white">
                      <step.icon size={22} aria-hidden />
                    </span>
                    <span className="font-mono text-2xl font-medium tabular-nums text-ink-400">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl leading-tight text-ink-900">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-600">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* ==================== WHY ORDER ON WHATSAPP ==================== */}
      <Section background="soft" padding="xl">
        <Container>
          <SectionHeading
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            subtitle={t("why.subtitle")}
          />
          <StaggerReveal
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
          >
            {[
              { icon: MessageCircle, key: "b1" },
              { icon: Smartphone, key: "b2" },
              { icon: Sparkles, key: "b3" },
              { icon: BadgeCheck, key: "b4" },
            ].map(({ icon, key }) => (
              <StaggerItem key={key} className="h-full">
                <FeatureCard
                  icon={icon}
                  title={t(`why.${key}.title`)}
                  description={t(`why.${key}.description`)}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* ====================== TRUST & SAFETY ====================== */}
      <Section background="white" padding="xl" className="border-y border-ink-200/70">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <SectionReveal>
              <SectionHeading
                eyebrow={t("trust.eyebrow")}
                title={t("trust.title")}
              />
              <p className="mt-5 max-w-xl text-base leading-8 text-ink-600">
                {t("trust.body")}
              </p>
              <div className="mt-8">
                <WhatsAppButton size="lg">{t("hero.cta")}</WhatsAppButton>
              </div>
            </SectionReveal>

            <StaggerReveal className="flex flex-col gap-4" stagger={0.1}>
              {[
                { icon: Banknote, key: "point1" },
                { icon: ShieldCheck, key: "point2" },
                { icon: MessagesSquare, key: "point3" },
              ].map(({ icon: Icon, key }) => (
                <StaggerItem key={key}>
                  <div className="flex items-start gap-4 rounded-2xl border border-ink-200 bg-surface p-5 shadow-soft sm:p-6">
                    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-whatsapp/12 text-whatsapp-ink">
                      <Icon size={22} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-ink-900">
                        {t(`trust.${key}.title`)}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">
                        {t(`trust.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </Container>
      </Section>

      {/* ======================== COVERAGE ======================== */}
      <Section background="soft" padding="xl">
        <Container>
          <SectionHeading
            eyebrow={t("coverage.eyebrow")}
            title={t("coverage.title")}
            subtitle={t("coverage.subtitle")}
            align="center"
          />

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="live-dot live-dot--success" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-whatsapp-ink">
                {t("coverage.liveLabel")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {waLiveCities.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-2 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-4 py-2 text-sm font-semibold text-ink-900"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-whatsapp-cta" />
                  {c.name}
                  {c.state && <span className="text-ink-500">· {c.state}</span>}
                </span>
              ))}
            </div>

            {waComingSoonCities.length > 0 && (
              <>
                <div className="mb-3 mt-8 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full border border-ink-400" />
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
                    {t("coverage.soonLabel")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {waComingSoonCities.map((c) => (
                    <span
                      key={c.name}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-surface px-4 py-2 text-sm font-medium text-ink-600"
                    >
                      {c.name}
                      {c.state && <span className="text-ink-400">· {c.state}</span>}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-10 flex justify-center">
              <WhatsAppButton size="lg">{t("coverage.cta")}</WhatsAppButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========================== FAQ ========================== */}
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

      {/* ======================= FINAL CTA ======================= */}
      <section className="relative isolate overflow-hidden bg-obsidian text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,1)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent_75%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-whatsapp/16 blur-[130px]"
        />
        <Container className="relative z-10 py-20 text-center sm:py-28">
          <SectionReveal className="mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              <WhatsAppIcon size={15} className="text-whatsapp" aria-hidden />
              {siteConfig.whatsappOrder.display}
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl text-balance">
              {t("finalCta.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              {t("finalCta.subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center gap-3">
              <WhatsAppButton size="xl">{t("finalCta.cta")}</WhatsAppButton>
              <span className="text-sm text-white/55">{t("finalCta.hint")}</span>
            </div>
          </SectionReveal>
        </Container>
      </section>
    </>
  );
}
