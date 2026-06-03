"use client";

import { ArrowRight, Clock3, MapPin, Search, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";
import { heroCards } from "@/lib/hero-cards";
import { FloatingServiceCard } from "./FloatingServiceCard";
import { HeroSpotlight } from "./HeroSpotlight";
import { MotionDeliveryRibbon } from "./MotionDeliveryRibbon";
import { PhoneOrderPreview } from "./PhoneOrderPreview";
import { HeroTextReveal } from "./HeroTextReveal";

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

const marketSignals = [
  { value: "10+", label: "cities" },
  { value: "500+", label: "partners" },
  { value: "100k+", label: "orders" },
];

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
  const reducedMotion = useReducedMotion();
  const chipLabels = [chipTracking, chipEta, chipPayments];

  return (
    <section
      className="relative isolate overflow-hidden bg-[#050505] pt-24 pb-36 text-white sm:pt-28 sm:pb-40 lg:pt-32 lg:pb-44"
      aria-label={title}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(222,22,0,0.24)_0%,rgba(222,22,0,0.05)_26%,transparent_56%),radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.08),transparent_48%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black via-black/85 to-transparent"
      />

      <HeroSpotlight />

      <Container className="relative z-10">
        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
          <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] sm:max-w-2xl">
            <motion.p
              className="inline-flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/78 backdrop-blur-xl"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="live-dot" />
              {eyebrow}
            </motion.p>

            <HeroTextReveal
              className="mt-6 font-serif text-5xl leading-[1.05] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
              lines={[
                { text: "Everything" },
                { text: "you crave." },
                { text: "Delivered", gradient: true, suffix: " fast." },
              ]}
            />

            <motion.p
              className="mt-7 max-w-xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.6,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {subtitle}
            </motion.p>

            <motion.form
              className="mt-9 flex w-full max-w-[calc(100vw-2.5rem)] flex-col gap-2 rounded-lg border border-white/12 bg-white p-1.5 shadow-[0_28px_70px_-26px_rgba(0,0,0,0.9)] sm:max-w-xl sm:flex-row sm:items-center"
              action={siteConfig.shopHref}
              method="get"
              initial={
                reducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.75,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <label className="relative flex min-w-0 flex-1 items-center rounded-md bg-ink-50">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-4 text-brand-red"
                />
                <input
                  type="text"
                  name="q"
                  placeholder={addressPlaceholder}
                  aria-label={addressPlaceholder}
                  className="h-13 w-full rounded-md bg-transparent pl-11 pr-4 text-[15px] font-medium text-ink-900 placeholder:text-ink-500 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-md bg-brand-red px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(222,22,0,0.34)] transition-all hover:-translate-y-px hover:bg-brand-red-600 hover:shadow-[0_14px_38px_rgba(222,22,0,0.44)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Search size={15} />
                {cta}
              </button>
            </motion.form>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-white/68">
              {chipLabels.map((label, index) => (
                <motion.li
                  key={label}
                  className="inline-flex items-center gap-2"
                  initial={reducedMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9 + index * 0.12,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                  {label}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-9 grid w-full max-w-[calc(100vw-2.5rem)] grid-cols-3 border-y border-white/10 py-5 sm:max-w-xl"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.05,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {marketSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="border-white/10 pr-4 text-left not-first:border-l not-first:pl-4"
                >
                  <div className="font-serif text-2xl leading-none text-white sm:text-3xl">
                    {signal.value}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/42">
                    {signal.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-104 lg:max-w-none">
            <motion.div
              aria-hidden
              className="absolute -inset-x-8 top-8 bottom-8 hidden rounded-lg border border-white/10 bg-white/[0.025] lg:block"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: [0.25, 1, 0.5, 1],
              }}
            />

            <div className="lg:hidden">
              <PhoneOrderPreview />
            </div>

            <div className="hidden lg:flex lg:items-start lg:justify-center lg:gap-2 xl:gap-4">
              <div className="flex flex-col gap-16 pt-10 xl:gap-20 xl:pt-14">
                {heroCards
                  .filter((card) => card.column === "left")
                  .map((card) => (
                    <FloatingServiceCard
                      key={card.key}
                      label={card.label}
                      detail={card.detail}
                      imagePath={card.imagePath}
                      iconKey={card.iconKey}
                      placeholderAccent={card.placeholderAccent}
                      variant="square"
                      delay={card.delay}
                    />
                  ))}
              </div>

              <div className="flex-none">
                <PhoneOrderPreview />
              </div>

              <div className="flex flex-col gap-10 pt-8 xl:gap-12 xl:pt-10">
                {heroCards
                  .filter((card) => card.column === "right")
                  .map((card) => (
                    <FloatingServiceCard
                      key={card.key}
                      label={card.label}
                      detail={card.detail}
                      imagePath={card.imagePath}
                      iconKey={card.iconKey}
                      placeholderAccent={card.placeholderAccent}
                      variant="wide"
                      delay={card.delay}
                    />
                  ))}
              </div>
            </div>

            <motion.div
              className="absolute bottom-4 left-1/2 hidden w-[86%] -translate-x-1/2 items-center justify-between rounded-lg border border-white/10 bg-black/55 px-4 py-3 text-white shadow-luxe backdrop-blur-xl lg:flex"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.95,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <span className="inline-flex items-center gap-2 text-xs text-white/70">
                <Clock3 size={14} className="text-brand-orange" />
                Smart dispatch active
              </span>
              <span className="inline-flex items-center gap-2 text-xs text-white/70">
                <ShieldCheck size={14} className="text-emerald-300" />
                Verified partners
              </span>
              <ArrowRight size={15} className="text-white/40" />
            </motion.div>
          </div>
        </div>
      </Container>

      <MotionDeliveryRibbon />
    </section>
  );
}
