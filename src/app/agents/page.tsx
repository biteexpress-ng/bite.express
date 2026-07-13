import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Gift,
  GraduationCap,
  MessageCircle,
  Repeat,
  Trophy,
  UserPlus,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { Step } from "@/components/ui/step";
import { Stat } from "@/components/ui/stat";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ButtonLink } from "@/components/ui/button";
import { CTABand } from "@/components/ui/cta-band";
import { AgentSignupForm } from "@/components/forms/agent-signup-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Become a BiteExpress Agent, earn recurring commission in Nigeria",
  description:
    "Join the BiteExpress Agent Programme. Get free training and certification, sign customers up anywhere in Nigeria, and earn recurring commission plus weekly bonuses. Free to join.",
  path: "/agents",
  keywords: [
    "become a BiteExpress agent",
    "BiteExpress agent programme",
    "earn commission Nigeria",
    "referral agent Nigeria",
    "make money referring customers",
    "side income Nigeria",
    "delivery agent Nigeria",
  ],
});

export default async function AgentsPage() {
  const t = await getTranslations("agents");

  const faqs = [
    { question: t("faq.items.q1.question"), answer: t("faq.items.q1.answer") },
    { question: t("faq.items.q2.question"), answer: t("faq.items.q2.answer") },
    { question: t("faq.items.q3.question"), answer: t("faq.items.q3.answer") },
    { question: t("faq.items.q4.question"), answer: t("faq.items.q4.answer") },
    { question: t("faq.items.q5.question"), answer: t("faq.items.q5.answer") },
    { question: t("faq.items.q6.question"), answer: t("faq.items.q6.answer") },
    { question: t("faq.items.q7.question"), answer: t("faq.items.q7.answer") },
  ];

  return (
    <>
      <JsonLd id="ld-faq-agents" data={faqSchema(faqs)} />
      <JsonLd
        id="ld-service-agents"
        data={serviceSchema({
          name: "BiteExpress Agent Programme",
          serviceType: "Customer referral and acquisition programme",
          description:
            "A programme for certified agents to sign customers onto BiteExpress and earn recurring commission plus weekly bonuses, open across Nigeria.",
          path: "/agents",
          areaServedName: "Nigeria",
        })}
      />
      <JsonLd
        id="ld-breadcrumb-agents"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "For Agents", path: "/agents" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden aurora-bg pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-red/10 blur-3xl"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#apply" variant="primary" size="lg">
                {t("hero.cta")}
                <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="#how" variant="outline" size="lg">
                How the programme works
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-ink-500">
              Already an agent?{" "}
              <a
                href={siteConfig.agentAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-red underline-offset-4 hover:underline"
              >
                Open the agent app
              </a>
            </p>

            <div className="mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-brand-red/20 bg-[color-mix(in_srgb,var(--color-brand-red)_5%,#ffffff)] px-5 py-4">
              <Gift className="mt-0.5 size-5 shrink-0 text-brand-red" aria-hidden />
              <p className="text-sm text-ink-700">
                <span className="font-semibold text-ink-900">
                  ₦1,000 welcome bonus
                </span>{" "}
                after you get certified. It unlocks when you sign up your first
                customer who places an order.{" "}
                <a
                  href="/terms"
                  className="font-medium underline underline-offset-2 hover:text-ink-900"
                >
                  T&amp;Cs apply
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <Section background="dark" padding="md">
        <Container>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Stat invert value="Certified" label="Free training to start" />
            <Stat invert value="Recurring" label="Earn on every order" />
            <Stat invert value="Weekly" label="Bonuses paid Monday" />
            <Stat invert value="Nationwide" label="Open across Nigeria" />
          </div>
        </Container>
      </Section>

      {/* WHY AGENT */}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Repeat}
              title={t("benefits.recurring.title")}
              description={t("benefits.recurring.description")}
            />
            <FeatureCard
              icon={UserPlus}
              title={t("benefits.onboarding.title")}
              description={t("benefits.onboarding.description")}
            />
            <FeatureCard
              icon={Trophy}
              title={t("benefits.bonuses.title")}
              description={t("benefits.bonuses.description")}
            />
            <FeatureCard
              icon={GraduationCap}
              title={t("benefits.certification.title")}
              description={t("benefits.certification.description")}
            />
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section background="soft" padding="lg" id="how">
        <Container>
          <SectionHeading eyebrow={t("how.eyebrow")} title={t("how.title")} />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <Step number={1} title={t("how.step1.title")} description={t("how.step1.description")} />
            <Step number={2} title={t("how.step2.title")} description={t("how.step2.description")} />
            <Step number={3} title={t("how.step3.title")} description={t("how.step3.description")} />
            <Step number={4} title={t("how.step4.title")} description={t("how.step4.description")} />
          </div>
        </Container>
      </Section>

      {/* APPLICATION FORM */}
      <Section background="white" padding="lg" id="apply">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={t("form.eyebrow")}
                title={t("form.title")}
                subtitle={t("form.subtitle")}
              />
              <ul className="mt-8 space-y-3 text-sm text-ink-600">
                <li className="flex items-start gap-2.5">
                  <ClipboardCheck size={16} className="mt-0.5 text-brand-red" />
                  <span>We review every application.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <BadgeCheck size={16} className="mt-0.5 text-brand-red" />
                  <span>Free to join, no fees, ever.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MessageCircle size={16} className="mt-0.5 text-brand-red" />
                  <span>Support on WhatsApp after onboarding.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8">
              <AgentSignupForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="soft" padding="lg">
        <Container size="narrow">
          <SectionHeading
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
            align="center"
          />
          <FaqAccordion items={faqs} className="mt-12" />
        </Container>
      </Section>

      {/* CLOSING CTA */}
      <CTABand
        variant="dark"
        eyebrow="Ready when you are"
        title="Start earning with BiteExpress."
        subtitle="Apply in minutes, get certified, and grow your income one signup at a time."
        cta={
          <ButtonLink href="#apply" variant="primary" size="lg">
            {t("hero.cta")}
            <ArrowRight size={18} />
          </ButtonLink>
        }
        secondaryCta={
          <ButtonLink
            href={siteConfig.agentAppUrl}
            external
            variant="outline"
            size="lg"
          >
            Open the agent app
          </ButtonLink>
        }
      />
    </>
  );
}
