"use client";

import { motion, useInView } from "framer-motion";
import { MapPin, Search, Truck } from "lucide-react";
import { useRef } from "react";

type Step = { title: string; description: string };

type Props = {
  eyebrow: string;
  title: string;
  steps: Step[];
};

const ICONS = [MapPin, Search, Truck];

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 15,
      delay: i * 0.2 + 0.3,
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2 + 0.5,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

export function HowItWorksTimeline({ eyebrow, title, steps }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section ref={sectionRef} className="bg-canvas py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-20">

          {/* ── Left: eyebrow + heading ───────────────────────────────── */}
          <motion.div
            className="lg:w-[38%] lg:shrink-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">
              {eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-normal text-ink-900 sm:text-5xl">
              {title}
            </h2>
          </motion.div>

          {/* ── Right: 3 steps ───────────────────────────────────────── */}
          <div className="flex-1">
            <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">

              {/* Animated dashed connector — draws itself in */}
              <svg
                aria-hidden
                className="absolute top-7 left-[calc(100%/6)] right-[calc(100%/6)] hidden h-[2px] w-[calc(100%-100%/3)] overflow-visible sm:block"
                preserveAspectRatio="none"
              >
                <motion.line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 12"
                  className="text-ink-200"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                />
              </svg>

              {steps.map((step, index) => {
                const Icon = ICONS[index] ?? MapPin;
                return (
                  <div
                    key={step.title}
                    className="relative z-10 flex flex-col items-center"
                  >
                    {/* Circle icon — bouncy spring entrance */}
                    <div className="relative mb-7">
                      <motion.span
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-200 bg-surface shadow-card"
                        custom={index}
                        variants={circleVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-15%" }}
                      >
                        <Icon size={22} strokeWidth={1.5} className="text-ink-700" />
                      </motion.span>
                      {/* Step number badge */}
                      <motion.span
                        className="absolute -bottom-2.5 left-0 flex h-[22px] min-w-[2rem] items-center justify-center rounded-full bg-brand-red px-1.5 text-[10px] font-bold leading-none text-white"
                        custom={index}
                        variants={circleVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-15%" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.span>
                    </div>

                    {/* Text — staggered fade-up */}
                    <motion.div
                      custom={index}
                      variants={textVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-15%" }}
                    >
                      <h3 className="w-full text-left text-base font-semibold leading-snug text-ink-900">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 w-full text-left text-sm leading-6 text-ink-600">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
