"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Search, Truck } from "lucide-react";

type Step = { title: string; description: string };

type Props = {
  eyebrow: string;
  title: string;
  steps: Step[];
};

const ICONS = [MapPin, Search, Truck];

export function HowItWorksTimeline({ eyebrow, title, steps }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-20">

          {/* ── Left: eyebrow + heading ───────────────────────────────── */}
          <div className="lg:w-[38%] lg:shrink-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
              {eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-normal text-ink-900 sm:text-5xl">
              {title}
            </h2>
          </div>

          {/* ── Right: 3 steps ───────────────────────────────────────── */}
          <div className="flex-1">
            <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">

              {/* Dashed connector running through the circle centres (desktop).
                  left/right = 1/6 of grid width ≈ centre of first/last column. */}
              <div
                aria-hidden
                className="absolute top-7 left-[calc(100%/6)] right-[calc(100%/6)] hidden border-t-2 border-dashed border-ink-200 sm:block"
              />

              {steps.map((step, index) => {
                const Icon = ICONS[index] ?? MapPin;
                return (
                  <motion.div
                    key={step.title}
                    className="relative z-10 flex flex-col items-center"
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    {/* Circle icon — white bg breaks the dashed line behind it */}
                    <div className="relative mb-7">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-200 bg-white shadow-sm">
                        <Icon size={22} strokeWidth={1.5} className="text-ink-700" />
                      </span>
                      {/* Step number badge — bottom-left of circle */}
                      <span className="absolute -bottom-2.5 left-0 flex h-[22px] min-w-[2rem] items-center justify-center rounded-full bg-brand-red px-1.5 text-[10px] font-bold leading-none text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Text — full-width, left-aligned */}
                    <h3 className="w-full text-left text-base font-semibold leading-snug text-ink-900">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 w-full text-left text-sm leading-6 text-ink-600">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
