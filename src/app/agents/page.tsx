import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  HeartHandshake,
  Repeat,
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
import { AgentSignupForm } from "@/components/forms/agent-signup-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "BiteExpress Agent Programme — earn recurring commission",
  description:
    "Bring vendors, riders and customers onto BiteExpress and earn recurring commission on every order. Selective intake, real tools, dedicated support.",
  path: "/agents",
  keywords: [
    "BiteExpress agent",
    "earn commission Nigeria",
    "referral programme Nigeria",
    "side income agent",
    "community ambassador BiteExpress",
  ],
});

export default async function AgentsPage() {
  const t = await getTranslations("agents");

  const faqs = [
    { question: t("faq.items.q1.question"), answer: t("faq.items.q1.answer") },
    { question: t("faq.items.q2.question"), answer: t("faq.items.q2.answer") },
    { question: t("faq.items.q3.question"), answer: t("faq.items.q3.answer") },
    { question: t("faq.items.q4.question"), answer: t("faq.items.q4.answer") },
  ];

  return (
    <>
      <JsonLd id="ld-faq-agents" data={faqSchema(faqs)} />
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
          </div>
        </Container>
      </section>

      {/* STATS */}
      <Section background="dark" padding="md">
        <Container>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Stat invert value="Lifetime" label="Recurring commission" />
            <Stat invert value="Weekly" label="Agent payouts" />
            <Stat invert value="4" label="Reward tiers" />
            <Stat invert value="10+" label="Cities" />
          </div>
        </Container>
      </Section>

      {/* WHY AGENT */}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Repeat}
              title={t("benefits.recurring.title")}
              description={t("benefits.recurring.description")}
            />
            <FeatureCard
              icon={Briefcase}
              title={t("benefits.tools.title")}
              description={t("benefits.tools.description")}
            />
            <FeatureCard
              icon={HeartHandshake}
              title={t("benefits.support.title")}
              description={t("benefits.support.description")}
            />
            <FeatureCard
              icon={Award}
              title={t("benefits.tiers.title")}
              description={t("benefits.tiers.description")}
            />
          </div>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section background="soft" padding="lg" id="how">
        <Container>
          <SectionHeading
            eyebrow={t("how.eyebrow")}
            title={t("how.title")}
          />
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
                  <Calendar size={16} className="mt-0.5 text-brand-red" />
                  <span>Review within 5 business days.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Calendar size={16} className="mt-0.5 text-brand-red" />
                  <span>Selective intake — quality over quantity.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Calendar size={16} className="mt-0.5 text-brand-red" />
                  <span>Onboarding training scheduled per intake.</span>
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
    </>
  );
}
