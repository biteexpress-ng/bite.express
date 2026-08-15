import { Bike, HandHeart, Heart, MapPin, Sparkles, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureCard } from "@/components/ui/feature-card";
import { Stat } from "@/components/ui/stat";
import { CTABand } from "@/components/ui/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { TeamSection } from "@/components/about/team-section";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";
import { fetchTeam } from "@/lib/team-api";

export const metadata = buildMetadata({
  title: "About BiteExpress, delivery, reimagined for every neighbourhood",
  description:
    "BiteExpress is a Nigerian delivery platform connecting local vendors, riders and customers across 10+ cities. Learn about our mission, our story and what drives us.",
  path: "/about",
});

export default async function AboutPage() {
  const { members } = await fetchTeam();

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-about"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* HERO */}
      <section className="relative overflow-hidden aurora-bg pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-[24rem] rounded-full bg-brand-red/10 blur-3xl"
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow>About us</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] tracking-tight text-ink-900 sm:text-[3.75rem] md:text-[4.5rem]">
              Delivery, reimagined for every neighbourhood.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-600 sm:text-xl">
              BiteExpress is the on-demand delivery platform connecting local
              vendors, independent riders and Nigerian households. We&#39;re
              building the most-trusted way to move food, essentials and
              everyday things between the people who make them and the people
              who want them, fast, fairly, and at scale.
            </p>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <Section background="dark" padding="md">
        <Container>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Stat invert value="10+" label="Cities served" />
            <Stat invert value="500+" label="Active vendors" />
            <Stat invert value="1,200+" label="Riders on the road" />
            <Stat invert value="6" label="Delivery verticals" />
          </div>
        </Container>
      </Section>

      {/* MISSION */}
      <Section background="white" padding="lg">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Our mission"
              title="Make on-demand delivery work for Nigeria, not the other way around."
            />
            <div className="space-y-5 text-lg text-ink-600">
              <p>
                We started BiteExpress because we believed Nigerians deserved
                better than the international templates being copy-pasted onto
                our cities. Our streets are different. Our payments are
                different. Our customers, vendors and riders are different.
              </p>
              <p>
                So we built a delivery platform that takes those differences
                seriously: cash payments alongside cards, vendors verified in
                person, riders supported in their language, and pricing fair
                enough that everyone wins on every order.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* VALUES */}
      <Section background="soft" padding="lg">
        <Container>
          <SectionHeading
            eyebrow="What we stand for"
            title="The values that shape every order."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Move fast, on the ground"
              description="The shortest distance between problem and fix is a real person, in a real city, who actually cares. We build close to the customer."
            />
            <FeatureCard
              icon={HandHeart}
              title="Fair to everyone"
              description="Vendors, riders, customers, every BiteExpress decision is checked against whether all three sides win, not just one."
            />
            <FeatureCard
              icon={Heart}
              title="Local at the core"
              description="We hire from the cities we serve, we partner with neighbourhood vendors, and we listen to our riders. Local context isn't decoration, it's strategy."
            />
            <FeatureCard
              icon={Sparkles}
              title="Quality without apology"
              description="The order should be hot. The app should be quick. The rider should be friendly. We don't accept 'good enough' on the things customers feel."
            />
            <FeatureCard
              icon={MapPin}
              title="Show up everywhere"
              description="Not just the big cities. We grow into Zaria, Sokoto, Makurdi, Offa, Omu-Aran, every place that's been told they're too small to count."
            />
            <FeatureCard
              icon={Bike}
              title="Respect the work"
              description="The rider in your driveway is the entire BiteExpress brand. We pay fairly, support seriously, and never forget who powers the platform."
            />
          </div>
        </Container>
      </Section>

      {/* STORY */}
      <Section background="white" padding="lg">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Our story"
            title="From one city to ten, with thousands to go."
          />
          <div className="mt-10 space-y-5 text-lg text-ink-600">
            <p>
              BiteExpress launched in Kaduna with a small team, a handful of
              restaurants, and the conviction that there was a better way to run
              delivery in Nigeria than the playbooks being imported from abroad.
            </p>
            <p>
              The reception was immediate. Customers found a service that
              respected their time and wallet. Vendors found a partner who cared
              about their margins. Riders found a platform that treated them as
              the professionals they are.
            </p>
            <p>
              We&#39;ve since expanded to ten cities across Northern Nigeria and
              beyond, added groceries, pharmacies, parcel delivery and more ,
              all whilst keeping the basics excellent: hot food, fast delivery,
              and a phone you can actually pick up when something goes wrong.
            </p>
            <p>
              We&#39;re building toward a future where ordering anything you
              need is as simple as opening BiteExpress, no matter where in
              Nigeria you live.
            </p>
          </div>
        </Container>
      </Section>

      {/* TEAM. Sits between the story and the hiring CTA on purpose:
          meet the people, then get asked to join them. */}
      <TeamSection members={members} />

      {/* CTA */}
      <CTABand
        variant="dark"
        eyebrow="Join us"
        title="Build the future of delivery in Nigeria."
        subtitle="We&#39;re hiring across engineering, operations and partnerships in every city we serve."
        cta={
          <ButtonLink href="/careers" variant="primary" size="lg">
            See open roles
          </ButtonLink>
        }
        secondaryCta={
          <ButtonLink
            href={siteConfig.shopHref}
            variant="outline"
            size="lg"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            Or just order something
          </ButtonLink>
        }
      />
    </>
  );
}
