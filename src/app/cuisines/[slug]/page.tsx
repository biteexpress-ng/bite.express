import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Step } from "@/components/ui/step";
import { CityChip } from "@/components/ui/city-chip";
import { CTABand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  cuisineServiceSchema,
  faqSchema,
} from "@/lib/jsonld";
import { cuisines, getCuisine } from "@/lib/cuisines";
import { cities } from "@/lib/cities";
import { siteConfig } from "@/lib/site-config";

type RouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cuisines.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  const cuisine = getCuisine(slug);
  if (!cuisine) return {};

  return buildMetadata({
    title: `${cuisine.name} delivery in Nigeria — order on BiteExpress`,
    description: `${cuisine.tagline} Order ${cuisine.name.toLowerCase()} from BiteExpress and get it delivered fast across Zaria, Kaduna, Lagos and more.`,
    path: `/cuisines/${cuisine.slug}`,
    keywords: [
      `${cuisine.name} delivery`,
      `${cuisine.name.toLowerCase()} delivery Nigeria`,
      `order ${cuisine.name.toLowerCase()} online`,
      `${cuisine.name} near me`,
      "BiteExpress cuisine",
      ...cuisine.popularItems.map((d) => `${d.toLowerCase()} delivery`),
    ],
  });
}

export default async function CuisinePage({ params }: RouteProps) {
  const { slug } = await params;
  const cuisine = getCuisine(slug);
  if (!cuisine) notFound();

  const citiesAvailable = cities.filter((c) =>
    c.popularCuisineSlugs.includes(cuisine.slug),
  );

  const faqs = [
    {
      question: `Where can I order ${cuisine.name.toLowerCase()} on BiteExpress?`,
      answer:
        citiesAvailable.length > 0
          ? `${cuisine.name} is available in ${citiesAvailable
              .slice(0, -1)
              .map((c) => c.name)
              .join(", ")}${citiesAvailable.length > 1 ? " and " : ""}${citiesAvailable[citiesAvailable.length - 1].name}. We're adding more cities every quarter.`
          : `${cuisine.name} is available across BiteExpress's serviced cities. Open the app or visit bite.express to find vendors near you.`,
    },
    {
      question: `How long does ${cuisine.name.toLowerCase()} delivery take?`,
      answer: `Most ${cuisine.name.toLowerCase()} orders arrive within 25–45 minutes. You'll see a live ETA before you confirm and a live map tracker once your rider is on the way.`,
    },
    {
      question: `Can I pay cash on delivery?`,
      answer:
        "Yes — pay by card, bank transfer or cash on delivery, whichever works for you at checkout. Card details are tokenised; we never store them.",
    },
    {
      question: `What if I want to customise my ${cuisine.name.toLowerCase()} order?`,
      answer:
        "Use the order notes field at checkout for any special requests — the vendor sees them before they start preparing. For more complex changes, you can also chat the vendor directly through the app.",
    },
  ];

  return (
    <>
      <JsonLd
        id="ld-service-cuisine"
        data={cuisineServiceSchema({
          cuisineName: cuisine.name,
          cuisineSlug: cuisine.slug,
          description: cuisine.description,
          cityNames: citiesAvailable.map((c) => c.name),
        })}
      />
      <JsonLd id="ld-faq-cuisine" data={faqSchema(faqs)} />
      <JsonLd
        id="ld-breadcrumb-cuisine"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cuisines", path: "/cuisines" },
          { name: cuisine.name, path: `/cuisines/${cuisine.slug}` },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white pt-12 pb-20 sm:pt-20 sm:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-red/10 blur-3xl"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-600">
            <Link href="/cuisines" className="hover:text-brand-red">
              ← All cuisines
            </Link>
          </nav>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow>BiteExpress cuisine</Eyebrow>
              <h1 className="mt-6 flex items-baseline gap-4 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
                <span aria-hidden className="text-5xl sm:text-6xl">
                  {cuisine.emoji}
                </span>
                <span>{cuisine.name}</span>
              </h1>
              <p className="mt-6 text-lg text-ink-600 sm:text-xl">
                {cuisine.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href={siteConfig.shopHref}
                  variant="primary"
                  size="lg"
                >
                  Order on the app
                  <ArrowRight size={18} />
                </ButtonLink>
                <ButtonLink href="#cities" variant="outline" size="lg">
                  See cities
                </ButtonLink>
              </div>
            </div>

            {/* POPULAR ITEMS */}
            <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-600">
                Popular items
              </h2>
              <ul className="mt-5 space-y-3">
                {cuisine.popularItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base text-ink-900"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 flex-none text-brand-red"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CITIES AVAILABLE */}
      {citiesAvailable.length > 0 && (
        <Section background="white" padding="lg" id="cities">
          <Container>
            <SectionHeading
              eyebrow="Available in"
              title={`Where you can order ${cuisine.name.toLowerCase()} on BiteExpress.`}
              subtitle="Tap a city to see what's available right now in your area."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {citiesAvailable.map((c) => (
                <CityChip
                  key={c.slug}
                  name={c.name}
                  state={c.state}
                  href={`/cities/${c.slug}`}
                />
              ))}
            </div>
            <p className="mt-8 text-sm text-ink-600">
              Don&apos;t see your city?{" "}
              <Link href="/contact" className="font-medium text-brand-red underline-offset-4 hover:underline">
                Tell us where to launch next
              </Link>
              .
            </p>
          </Container>
        </Section>
      )}

      {/* HOW IT WORKS */}
      <Section background="soft" padding="lg">
        <Container>
          <SectionHeading
            eyebrow={`Ordering ${cuisine.name.toLowerCase()}`}
            title="Three taps and it's on the way."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <Step
              number={1}
              title="Drop your delivery address"
              description="Open the BiteExpress app or visit bite.express and enter where you want it delivered."
            />
            <Step
              number={2}
              title={`Pick a ${cuisine.name.toLowerCase()} spot`}
              description={`Filter by ${cuisine.name.toLowerCase()}, scan ratings and prices, choose your vendor.`}
            />
            <Step
              number={3}
              title="Track every step"
              description="Watch your order get prepared, picked up and brought to you live on the map."
            />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="white" padding="lg">
        <Container size="narrow">
          <SectionHeading
            eyebrow={`${cuisine.name} FAQ`}
            title="Common questions."
            align="center"
          />
          <FaqAccordion items={faqs} className="mt-12" />
        </Container>
      </Section>

      {/* CTA */}
      <CTABand
        variant="brand"
        eyebrow="Ready to order?"
        title={`Get ${cuisine.name.toLowerCase()} delivered now.`}
        cta={
          <ButtonLink
            href={siteConfig.shopHref}
            variant="secondary"
            size="lg"
          >
            Order on the app
            <ArrowRight size={18} />
          </ButtonLink>
        }
        secondaryCta={
          <Link
            href="/cities"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/85 hover:text-white"
          >
            Browse cities
            <MapPin size={16} />
          </Link>
        }
      />
    </>
  );
}
