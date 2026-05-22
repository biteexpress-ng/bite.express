import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Package,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";

/**
 * Interim page reached from the marketing-site cart button, "Order now"
 * CTAs, and address-picker forms. Replaced by the actual customer app
 * deeplink (app.bite.express) when v0 ships.
 *
 * Intentionally noindex'd — we don't want this competing with real
 * marketing surfaces in search, and it'll be retired soon.
 */
export const metadata = buildMetadata({
  title: "The BiteExpress app is launching soon",
  description:
    "We're building a brand-new BiteExpress customer experience from the ground up. Get on the list to be first to know when it goes live.",
  path: "/coming-soon",
  noIndex: true,
});

type Feature = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

const features: Feature[] = [
  {
    icon: ShoppingBag,
    title: "Order from your favourite vendors",
    detail:
      "Restaurants, supermarkets, pharmacies — all the BiteExpress vendors near you, in one place.",
  },
  {
    icon: MapPin,
    title: "Live delivery tracking",
    detail:
      "Watch your order move on the map, from kitchen to your door, with a real ETA.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cart, scheduled orders & BitePass",
    detail:
      "Save favourites, schedule for later, and unlock free delivery with BitePass member pricing.",
  },
  {
    icon: Package,
    title: "Parcel & errands",
    detail:
      "Send packages across town. Get groceries restocked. All the verticals you already know.",
  },
];

export default function ComingSoonPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-coming-soon"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "App", path: "/coming-soon" },
        ])}
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#050505] pt-24 pb-24 text-white sm:pt-32 sm:pb-28">
        {/* Subtle dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,1)_1px,transparent_1px)] [background-size:34px_34px]"
        />
        {/* Warm red wash bottom-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-brand-red/15 blur-[120px]"
        />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow variant="dark">
              <Sparkles size={12} className="text-brand-orange" />
              Building something better
            </Eyebrow>

            <h1 className="mt-7 font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02] tracking-tight">
              The BiteExpress app is{" "}
              <span className="italic text-brand-red">launching soon.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              We&apos;re rebuilding the BiteExpress customer experience from
              the ground up — faster, more delightful, and tailored to
              every BiteExpress city. Get on the list and be first when it
              goes live.
            </p>

            {/* Newsletter signup — reuses the dark variant */}
            <div className="mx-auto mt-10 max-w-md">
              <NewsletterForm variant="dark" />
              <p className="mt-3 text-xs text-white/45">
                No spam — just one email when the app is ready.
              </p>
            </div>

            <Link
              href="/"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to bite.express
            </Link>
          </div>
        </Container>
      </section>

      {/* WHAT'S COMING */}
      <Section background="white" padding="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What&apos;s coming</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
              Everything you&apos;d expect — done properly.
            </h2>
            <p className="mt-5 text-base text-ink-600 sm:text-lg">
              We&apos;re focused on getting the basics right first: a fast,
              trustworthy way to order from every BiteExpress vendor in
              your city.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="rounded-2xl border border-ink-200 bg-white p-6 transition-shadow hover:shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-serif text-xl leading-tight text-ink-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">{detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HONEST TIMELINE */}
      <Section background="soft" padding="md">
        <Container size="narrow">
          <div className="rounded-3xl border border-ink-200 bg-white p-8 sm:p-10">
            <Eyebrow>While you wait</Eyebrow>
            <h2 className="mt-5 font-serif text-2xl leading-tight tracking-tight text-ink-900 sm:text-3xl">
              The rest of bite.express is live and worth a look.
            </h2>
            <ul className="mt-6 space-y-3 text-base text-ink-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 flex-none text-brand-red" />
                <span>
                  Browse the{" "}
                  <Link href="/cities" className="font-semibold text-brand-red underline-offset-4 hover:underline">
                    cities we serve
                  </Link>
                  {" "}— 10 and counting across Nigeria.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 flex-none text-brand-red" />
                <span>
                  See{" "}
                  <Link href="/cuisines" className="font-semibold text-brand-red underline-offset-4 hover:underline">
                    every cuisine
                  </Link>
                  {" "}we&apos;ll be carrying when the app launches.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 flex-none text-brand-red" />
                <span>
                  Run a restaurant or store?{" "}
                  <Link href="/vendors" className="font-semibold text-brand-red underline-offset-4 hover:underline">
                    Apply to be a vendor
                  </Link>
                  {" "}— we&apos;re onboarding now.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 flex-none text-brand-red" />
                <span>
                  Want to ride for us?{" "}
                  <Link href="/riders" className="font-semibold text-brand-red underline-offset-4 hover:underline">
                    Apply as a BiteExpress rider
                  </Link>
                  .
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
