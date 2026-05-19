"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Search, Truck } from "lucide-react";
import { cn } from "@/lib/cn";

type Step = {
  title: string;
  description: string;
};

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: Step[];
};

const icons = [MapPin, Search, Truck];

export function HowItWorksTimeline({ eyebrow, title, subtitle, steps }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-[#f8f3ee] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[80rem] px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            {eyebrow}
          </div>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-normal text-ink-900 sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-600">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-8 top-8 bottom-8 w-px bg-ink-200 lg:left-[8%] lg:right-[8%] lg:top-10 lg:bottom-auto lg:h-px lg:w-auto"
          />
          <motion.div
            aria-hidden
            className="absolute left-8 top-8 bottom-8 w-px origin-top bg-brand-red lg:left-[8%] lg:right-[8%] lg:top-10 lg:bottom-auto lg:h-px lg:w-auto lg:origin-left"
            initial={reducedMotion ? false : { scaleY: 0, scaleX: 0 }}
            whileInView={reducedMotion ? {} : { scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = icons[index] ?? Search;
              return (
                <motion.article
                  key={step.title}
                  className="relative rounded-[1.75rem] border border-ink-200 bg-white p-6 pl-20 shadow-soft lg:p-8"
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  <span
                    className={cn(
                      "absolute left-5 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-red/25 bg-white text-brand-red shadow-lg shadow-brand-red/10 lg:left-8 lg:top-4",
                    )}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-semibold uppercase text-brand-red">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl leading-tight tracking-normal text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-ink-600">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
