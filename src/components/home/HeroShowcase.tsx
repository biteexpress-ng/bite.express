import { Clock, MapPin, Search, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { FloatingServiceCard } from "./FloatingServiceCard";
import { MotionDeliveryRibbon } from "./MotionDeliveryRibbon";
import { PhoneOrderPreview } from "./PhoneOrderPreview";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  addressPlaceholder: string;
  cta: string;
  chipTracking: string;
  chipEta: string;
  chipPayments: string;
};

function ExpressiveTitle({ title }: { title: string }) {
  const [before, after = ""] = title.split("Delivered");

  return (
    <>
      {before}
      <span className="font-serif italic text-transparent [background-image:linear-gradient(110deg,#ff6b4a,#de1600_48%,#ffb19e)] bg-clip-text">
        Delivered
      </span>
      {after}
    </>
  );
}

export function HeroShowcase({
  eyebrow,
  title,
  subtitle,
  addressPlaceholder,
  cta,
  chipTracking,
  chipEta,
  chipPayments,
}: Props) {
  const trustChips = [
    { label: chipTracking, Icon: ShieldCheck },
    { label: chipEta, Icon: Clock },
    { label: chipPayments, Icon: Wallet },
  ];
  return (
    <section className="hero-radial-bg relative isolate overflow-hidden bg-brand-black pt-24 pb-20 text-white sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-32">
      <MotionDeliveryRibbon />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <div className="section-eyebrow border-white/15 bg-white/10 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              {eyebrow}
            </div>

            <h1 className="mt-7 max-w-4xl font-serif text-[3.45rem] leading-[0.93] tracking-normal text-white sm:text-[4.7rem] md:text-[5.35rem] lg:text-[6.35rem]">
              <ExpressiveTitle title={title} />
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              {subtitle}
            </p>

            <form
              className="mt-10 flex w-full max-w-2xl flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.08] p-2 shadow-2xl backdrop-blur sm:flex-row sm:items-center"
              action={siteConfig.appUrl}
              method="get"
            >
              <label className="relative flex min-w-0 flex-1 items-center">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-5 text-white/45"
                />
                <input
                  type="text"
                  name="q"
                  placeholder={addressPlaceholder}
                  className="h-14 w-full rounded-full border border-white/10 bg-black/35 pl-12 pr-5 text-base text-white placeholder:text-white/40 transition focus:border-brand-orange focus:bg-black/55 focus:outline-none focus:ring-2 focus:ring-brand-red/35"
                  aria-label={addressPlaceholder}
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-red px-7 text-base font-semibold text-white shadow-lg shadow-brand-red/25 transition hover:bg-brand-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Search size={18} />
                {cta}
              </button>
            </form>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {trustChips.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-white/75 backdrop-blur"
                >
                  <Icon size={16} className="text-brand-orange" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[28rem] sm:min-h-[32rem] lg:min-h-[43rem]">
            <PhoneOrderPreview />
            <FloatingServiceCard
              label="Food"
              detail="Hot meals"
              icon="food"
              delay={0.05}
              className="left-0 top-10"
            />
            <FloatingServiceCard
              label="Grocery"
              detail="Daily essentials"
              icon="grocery"
              delay={0.14}
              className="right-0 top-16"
            />
            <FloatingServiceCard
              label="Pharmacy"
              detail="Care items"
              icon="pharmacy"
              delay={0.22}
              className="-left-4 bottom-36"
            />
            <FloatingServiceCard
              label="Parcel"
              detail="On-demand"
              icon="parcel"
              delay={0.3}
              className="right-3 bottom-48"
            />
            <FloatingServiceCard
              label="Petrol"
              detail="Fuel runs"
              icon="petrol"
              delay={0.38}
              className="left-1/2 bottom-7 -translate-x-1/2"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
