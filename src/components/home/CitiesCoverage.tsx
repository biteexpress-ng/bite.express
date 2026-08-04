"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import type { City } from "@/lib/cities";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cities: readonly City[];
};

/* ───────────────────────────────────────────────────────────────────────────
 * City pin positions as percentages of the MAP IMAGE box (not the padded
 * card). Derived from each city's lat/lon mapped onto the outline's
 * bounding box in the 1536x1024 viewBox; border cities (Sokoto, Yola)
 * are nudged inward so pin + pulse stay inside the outline.
 * ─────────────────────────────────────────────────────────────────────────*/
const cityPins: Record<string, { left: string; top: string }> = {
  sokoto:     { left: "29.3%", top: "17.5%" },
  kano:       { left: "51.0%", top: "25.4%" },
  zaria:      { left: "45.6%", top: "33.9%" },
  kaduna:     { left: "43.9%", top: "39.1%" },
  jos:        { left: "53.5%", top: "44.8%" },
  yola:       { left: "74.5%", top: "51.2%" },
  makurdi:    { left: "51.0%", top: "64.7%" },
  ilorin:     { left: "24.8%", top: "57.6%" },
  offa:       { left: "25.9%", top: "60.9%" },
  "omu-aran": { left: "28.4%", top: "61.0%" },
};

const cityCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: i * 0.06,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

export function CitiesCoverage({ eyebrow, title, subtitle, cities }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <Container className="max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* 1. TEXT BLOCK (Left) */}
          <motion.div
            className="lg:col-span-4 xl:col-span-3"
            initial={reducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">
              {eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.1] tracking-normal text-[#1a1a1a] sm:text-[44px]">
              {title}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#666666]">
              {subtitle}
            </p>
            <div className="mt-8">
              <Link
                href="/cities"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#e5e5e5] px-6 text-[13px] font-semibold text-[#1a1a1a] transition-all hover:-translate-y-px hover:border-[#1a1a1a] hover:shadow-card"
              >
                See all cities
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* 2. MAP (Middle) — with animated pin drops and pulse rings */}
          <motion.div
            className="relative mx-auto w-full max-w-lg rounded-lg border border-ink-200 bg-canvas p-6 shadow-card lg:col-span-4 xl:col-span-4"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Inner wrapper so pin percentages measure the image box,
                not the padded card. */}
            <div className="relative">
              <Image
                src="/brand/nigeria_dotted_outline.svg"
                alt="Map of Nigeria"
                width={1536}
                height={1024}
                draggable={false}
                className="block w-full select-none"
                style={{ filter: "brightness(0) opacity(0.08)" }}
              />

              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-2 top-1/2 h-px bg-brand-red/20 blur-sm"
                animate={
                  reducedMotion
                    ? undefined
                    : { opacity: [0.35, 0.7, 0.35] }
                }
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {cities.map((c, i) => {
                const pin = cityPins[c.slug];
                if (!pin) return null;
                return (
                  <motion.div
                    key={c.slug}
                    className="absolute z-20 -translate-x-1/2 -translate-y-[100%]"
                    style={{ left: pin.left, top: pin.top }}
                    initial={reducedMotion ? false : { y: -40, opacity: 0, scale: 0.3 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08 + 0.3,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <Link
                      href={`/cities/${c.slug}`}
                      aria-label={`${c.name}, ${c.state} State`}
                      className="group/pin relative block focus-visible:outline-none"
                    >
                      {/* Hover / focus tooltip with the city + state name */}
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a1a1a] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-floating transition-opacity duration-200 group-hover/pin:opacity-100 group-focus-visible/pin:opacity-100"
                      >
                        {c.name}, {c.state} State
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]"
                        />
                      </span>

                      {/* Pulse ring */}
                      <span className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
                        <span
                          className="block h-3 w-3 rounded-full bg-brand-red/30"
                          style={{
                            animation: reducedMotion
                              ? "none"
                              : `pulse-ring 2.5s cubic-bezier(0.25,1,0.5,1) ${i * 0.3}s infinite`,
                          }}
                        />
                      </span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 24 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-md transition-transform duration-200 group-hover/pin:scale-110 group-focus-visible/pin:scale-110"
                      >
                        <path
                          d="M12 29.5C12 29.5 22 20.5 22 11.5C22 5.97715 17.5228 1.5 12 1.5C6.47715 1.5 2 5.97715 2 11.5C2 20.5 12 29.5 12 29.5Z"
                          fill="#DE1600"
                        />
                        <circle cx="12" cy="11.5" r="4" fill="white" />
                      </svg>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 3. CITY GRID (Right) — waterfall stagger entrance */}
          <div className="lg:col-span-4 xl:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cities.map((c, i) => (
                <motion.div
                  key={c.slug}
                  custom={i}
                  variants={cityCardVariants}
                  initial={reducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-5%" }}
                >
                  <Link
                    href={`/cities/${c.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-ink-200 bg-surface px-4 py-3.5 shadow-card transition-[transform,box-shadow,border-color] duration-[280ms] ease-out-expo hover:-translate-y-[3px] hover:border-brand-red/30 hover:shadow-floating"
                  >
                    <div className="flex-none text-brand-red">
                      <MapPin size={18} strokeWidth={2.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-serif text-[15px] font-semibold text-[#1a1a1a]">
                        {c.name}
                      </div>
                      <div className="truncate text-[10px] text-[#8e8e93]">
                        {c.state} State
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      className="flex-none text-[#cccccc] transition-colors group-hover:text-[#1a1a1a]"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
