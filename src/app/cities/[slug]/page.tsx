import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stat } from "@/components/ui/stat";
import { Step } from "@/components/ui/step";
import { ModuleCard } from "@/components/ui/module-card";
import { CTABand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/jsonld";
import { cities, getCity } from "@/lib/cities";
import { getCuisine } from "@/lib/cuisines";
import { deliveryModules } from "@/lib/modules";
import { siteConfig } from "@/lib/site-config";

type RouteProps = { params: Promise<{ slug: string }> };

/** Pre-render every curated city; new backend zones get ISR'd on demand. */
export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

/** Allow new (backend) zones to render on demand. */
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return buildMetadata({
    title: `Food, grocery & pharmacy delivery in ${city.name}, ${city.state}`,
    description: `BiteExpress delivers from restaurants, supermarkets and pharmacies across ${city.name}. ${city.tagline}`,
    path: `/cities/${city.slug}`,
    keywords: [
      `food delivery ${city.name}`,
      `${city.name} food delivery`,
      `restaurants in ${city.name}`,
      `grocery delivery ${city.name}`,
      `pharmacy delivery ${city.name}`,
      `BiteExpress ${city.name}`,
      ...city.neighborhoods.map((n) => `${n} food delivery`),
    ],
  });
}

export default async function CityPage({ params }: RouteProps) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const popularCuisines = city.popularCuisineSlugs
    .map((s) => getCuisine(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const faqs = [
    {
      question: `Where in ${city.name} does BiteExpress deliver?`,
      answer:
        city.neighborhoods.length > 0
          ? `We deliver across ${city.neighborhoods.slice(0, -1).join(", ")} and ${city.neighborhoods[city.neighborhoods.length - 1]} — plus the surrounding areas in our ${city.state} zone. Type your address into the app to confirm coverage.`
          : `We deliver across the central districts of ${city.name} and the surrounding areas in our ${city.state} zone. Type your address into the app to confirm coverage.`,
    },
    {
      question: `How long does delivery take in ${city.name}?`,
      answer: `Most ${city.name} orders arrive within 25–45 minutes depending on your distance from the vendor. You'll see a live ETA at checkout and live tracking once your rider is on the way.`,
    },
    {
      question: `What payment methods can I use in ${city.name}?`,
      answer:
        "Card, bank transfer or cash on delivery — pick what works for you at checkout. Your card details are tokenised through our payment provider; we never store them.",
    },
    {
      question: `Can I order groceries and pharmacy items in ${city.name}?`,
      answer: `Yes — alongside restaurants, our ${city.name} network includes supermarkets and pharmacies. Use the module switcher in the app to browse each category.`,
    },
    {
      question: "What if my order is late or wrong?",
      answer: `Open in-app support and we'll resolve it — refunds, replacements or BitePoints credit, your choice. See our refund policy for the full details.`,
    },
  ];

  return (
    <>
      <JsonLd
        id="ld-localbusiness-city"
        data={localBusinessSchema({
          name: city.name,
          state: city.state,
          slug: city.slug,
          country: city.country,
        })}
      />
      <JsonLd id="ld-faq-city" data={faqSchema(faqs)} />
      <JsonLd
        id="ld-breadcrumb-city"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cities", path: "/cities" },
          { name: city.name, path: `/cities/${city.slug}` },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden aurora-bg pt-12 pb-20 sm:pt-20 sm:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-red/10 blur-3xl"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-600">
            <Link href="/cities" className="hover:text-brand-red">
              ← All cities
            </Link>
          </nav>

          <div className="mt-6 max-w-3xl">
            <Eyebrow>
              Delivery in {city.state} State
            </Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              {city.name} — your favourites, delivered.
            </h1>
            <p className="mt-6 text-lg text-ink-600 sm:text-xl">
              {city.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-600">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-red" />
                Live tracking
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} className="text-brand-red" />
                25–45 min avg.
              </span>
              <span className="inline-flex items-center gap-2">
                <Wallet size={16} className="text-brand-red" />
                Card · transfer · cash
              </span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={siteConfig.shopHref}
                variant="primary"
                size="lg"
              >
                Order in {city.name}
                <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="#how" variant="outline" size="lg">
                How it works
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* NEIGHBOURHOODS */}
      {city.neighborhoods.length > 0 && (
        <Section background="white" padding="md">
          <Container>
            <SectionHeading
              eyebrow="Where we deliver"
              title={`Now delivering across ${city.name}.`}
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {city.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-700"
                >
                  <MapPin size={14} className="text-brand-red" />
                  {n}
                </span>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* STATS */}
      <Section background="dark" padding="md">
        <Container>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Stat invert value="25–45m" label="Avg. delivery" />
            <Stat invert value="6" label="Delivery verticals" />
            <Stat invert value="Daily" label="Vendor refresh" />
            <Stat invert value="24/7" label="In-app support" />
          </div>
        </Container>
      </Section>

      {/* MODULES */}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading
            eyebrow="More than food"
            title={`What you can order in ${city.name}.`}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryModules.map((m) => (
              <ModuleCard
                key={m.slug}
                name={m.name}
                description={m.description}
                href={`${m.href}&city=${city.slug}`}
                icon={m.icon}
                accentClassName={m.accent}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* POPULAR CUISINES */}
      {popularCuisines.length > 0 && (
        <Section background="soft" padding="lg">
          <Container>
            <SectionHeading
              eyebrow="Popular in this city"
              title={`What ${city.name} is ordering most.`}
              subtitle="Tap a cuisine to see what's available right now in your area."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularCuisines.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cuisines/${c.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all hover:border-brand-red hover:shadow-soft"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl leading-none" aria-hidden>
                      {c.emoji}
                    </span>
                    <div>
                      <div className="font-serif text-lg text-ink-900">
                        {c.name}
                      </div>
                      <div className="text-xs text-ink-600">{c.tagline}</div>
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-ink-400 transition-all group-hover:translate-x-0.5 group-hover:text-brand-red"
                  />
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* HOW IT WORKS */}
      <Section background="white" padding="lg" id="how">
        <Container>
          <SectionHeading
            eyebrow={`Ordering in ${city.name}`}
            title="Three taps to your door."
            subtitle="No phone calls. No long forms. Just pick, pay and track."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <Step
              number={1}
              title={`Drop your ${city.name} address`}
              description="Open the app or visit bite.express and enter your delivery address. We'll show you what's available in your part of town right now."
            />
            <Step
              number={2}
              title="Pick what you crave"
              description={`Browse restaurants, supermarkets and pharmacies near you. Filter by cuisine, price or open-now to find your ${city.name} favourites fast.`}
            />
            <Step
              number={3}
              title="Track every step"
              description="Watch your order get prepared, picked up and brought to you live on the map. Chat your rider if you need to."
            />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="soft" padding="lg">
        <Container size="narrow">
          <SectionHeading
            eyebrow={`${city.name} FAQ`}
            title={`Common questions about delivery in ${city.name}.`}
            align="center"
          />
          <FaqAccordion items={faqs} className="mt-12" />
        </Container>
      </Section>

      {/* FINAL CTA */}
      <CTABand
        variant="brand"
        eyebrow={`Ready when you are`}
        title={`Order something good in ${city.name}.`}
        subtitle="Open the app or place your first order from your browser."
        cta={
          <ButtonLink
            href={siteConfig.shopHref}
            variant="secondary"
            size="lg"
          >
            Order now in {city.name}
            <ArrowRight size={18} />
          </ButtonLink>
        }
      />
    </>
  );
}
