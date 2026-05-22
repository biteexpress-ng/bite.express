import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityChip } from "@/components/ui/city-chip";
import { CTABand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { allLocalBusinessesSchema, breadcrumbSchema } from "@/lib/jsonld";
import { getServedCities } from "@/lib/zones-api";
import { siteConfig } from "@/lib/site-config";

/** Revalidate hourly so a backend zone addition surfaces without a deploy. */
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Cities we serve — BiteExpress delivery across Nigeria",
  description:
    "BiteExpress delivers food, groceries and more across Zaria, Kaduna, Sokoto, Kano, Makurdi, Jos, Yola, Ilorin, Offa and Omu-Aran — with new cities launching every quarter.",
  path: "/cities",
  keywords: [
    "BiteExpress cities",
    "food delivery cities Nigeria",
    "delivery zones BiteExpress",
    "where does BiteExpress deliver",
  ],
});

export default async function CitiesPage() {
  const served = await getServedCities();

  return (
    <>
      <JsonLd id="ld-localbusiness-cities" data={allLocalBusinessesSchema()} />
      <JsonLd
        id="ld-breadcrumb-cities"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cities", path: "/cities" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 to-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-red/10 blur-3xl"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>Now serving</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              {served.length} cities across Nigeria — and counting.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
              BiteExpress brings food, groceries, pharmacy and parcel delivery
              to neighbourhoods across Northern Nigeria and beyond. Pick your
              city to see what we deliver, how we operate locally, and what's
              popular this week.
            </p>
          </div>
        </Container>
      </section>

      {/* CITY GRID */}
      <Section background="white" padding="lg">
        <Container>
          <SectionHeading
            eyebrow="Pick your city"
            title="Where do you want to order from?"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {served.map((c) => (
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

      <CTABand
        variant="dark"
        eyebrow="Don't see your city?"
        title="Tell us where to launch next."
        subtitle="We're expanding every quarter — drop your city in our contact form and we'll let you know the moment BiteExpress goes live."
        cta={
          <ButtonLink href="/contact" variant="primary" size="lg">
            Suggest a city
          </ButtonLink>
        }
        secondaryCta={
          <ButtonLink href={siteConfig.shopHref} variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
            Open the app
          </ButtonLink>
        }
      />
    </>
  );
}
