import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { cuisinesAlphabetical } from "@/lib/cuisines";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Cuisines on BiteExpress, order what you crave, delivered fast",
  description:
    "Browse cuisines on BiteExpress, jollof, suya, swallow, pepper soup, pizza, shawarma, continental, Chinese and more. Delivered hot across 10+ cities in Nigeria.",
  path: "/cuisines",
  keywords: [
    "Nigerian cuisines BiteExpress",
    "food categories delivery Nigeria",
    "jollof delivery",
    "suya delivery",
    "shawarma delivery",
    "pizza delivery Nigeria",
  ],
});

export default function CuisinesPage() {
  const all = cuisinesAlphabetical();

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-cuisines"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cuisines", path: "/cuisines" },
        ])}
      />

      <section className="relative overflow-hidden aurora-bg pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-red/10 blur-3xl"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>What you can order</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              Every cuisine. One app.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
              From late-night suya to your Sunday rice and stew, from a quick
              shawarma to a full Continental breakfast, BiteExpress connects
              you to the kitchens making it best in your city.
            </p>
          </div>
        </Container>
      </section>

      <Section background="white" padding="lg">
        <Container>
          <SectionHeading
            eyebrow="Browse cuisines"
            title="Pick a category to see what's on."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {all.map((c) => (
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
                <ArrowUpRight
                  size={18}
                  className="text-ink-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red"
                />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        variant="dark"
        eyebrow="Don't see what you're craving?"
        title="Open the app and search."
        subtitle="The full catalogue updates constantly. Browse every vendor in your area on the BiteExpress app."
        cta={
          <ButtonLink href={siteConfig.shopHref} variant="primary" size="lg">
            Open the app
          </ButtonLink>
        }
      />
    </>
  );
}
