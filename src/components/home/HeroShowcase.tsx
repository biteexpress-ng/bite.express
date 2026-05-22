import { MapPin, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { heroCards } from "@/lib/hero-cards";
import { FloatingServiceCard } from "./FloatingServiceCard";
import { MotionDeliveryRibbon } from "./MotionDeliveryRibbon";
import { PhoneOrderPreview } from "./PhoneOrderPreview";

type Props = {
  eyebrow: string;
  title: string;            // accessibility / SEO fallback only
  subtitle: string;
  addressPlaceholder: string;
  cta: string;
  chipTracking: string;
  chipEta: string;
  chipPayments: string;
};

/**
 * Premium dark hero matching the design reference:
 *   - Red uppercase eyebrow (no pill).
 *   - 3-line serif headline with the brand-red italic "Delivered" word.
 *   - Compact white-pill address picker with red CTA.
 *   - Dot-style trust chips row.
 *   - Phone mockup centred in the right column with 5 floating glass
 *     cards positioned around it (lg+ only).
 *   - Glowing diagonal delivery ribbon across the bottom.
 *
 * Server component — the only client islands are the framer-motion
 * pieces inside FloatingServiceCard and MotionDeliveryRibbon.
 */
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
  return (
    <section
      className="relative isolate overflow-hidden bg-[#050505] pt-24 pb-44 text-white sm:pt-28 sm:pb-48 lg:pt-32 lg:pb-56"
      aria-label={title}
    >
      {/* Subtle background texture — a barely-there dot grid + a very
          gentle red wash from the bottom-right. Toned down vs the
          radial-bg utility so the ribbon and phone do the heavy lifting. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,1)_1px,transparent_1px)] [background-size:34px_34px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-brand-red/15 blur-[120px]"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* LEFT — copy + form */}
          <div className="max-w-2xl">
            {/* Eyebrow — plain red uppercase, no pill */}
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-red">
              {eyebrow}
            </p>

            {/* Headline — 3 lines, "Delivered" in red italic.
                The h1 still contains the full sentence for screen
                readers and SEO; visual line breaks are done with
                explicit <br/> so they're not at the mercy of width. */}
            <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,5.75rem)] leading-[1.02] tracking-tight text-white">
              <span className="block">Everything</span>
              <span className="block">you crave.</span>
              <span className="block">
                <span className="italic text-brand-red">Delivered</span>{" "}
                <span>fast.</span>
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              {subtitle}
            </p>

            {/* Address picker — clean white pill, red CTA */}
            <form
              className="mt-9 flex w-full max-w-md flex-col gap-2 rounded-full bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:flex-row sm:items-center"
              action={siteConfig.shopHref}
              method="get"
            >
              <label className="relative flex min-w-0 flex-1 items-center">
                <MapPin
                  size={16}
                  className="pointer-events-none absolute left-4 text-ink-400"
                />
                <input
                  type="text"
                  name="q"
                  placeholder={addressPlaceholder}
                  aria-label={addressPlaceholder}
                  className="h-11 w-full rounded-full bg-transparent pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-red px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(222,22,0,0.4)] transition-colors hover:bg-brand-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Search size={15} />
                {cta}
              </button>
            </form>

            {/* Trust chips — small red dot + label, no pill */}
            <ul className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/70">
              {[chipTracking, chipEta, chipPayments].map((label) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-brand-red"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — phone + 5 floating cards */}
          <div className="relative mx-auto h-full w-full max-w-[26rem] lg:max-w-none lg:min-h-[40rem]">
            <PhoneOrderPreview />

            {heroCards.map((card) => (
              <FloatingServiceCard
                key={card.key}
                label={card.label}
                detail={card.detail}
                imagePath={card.imagePath}
                iconKey={card.iconKey}
                placeholderAccent={card.placeholderAccent}
                delay={card.delay}
                className={card.position}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Diagonal red ribbon at the bottom — visually anchors the hero
          and references the design without crowding the form. */}
      <MotionDeliveryRibbon />
    </section>
  );
}
