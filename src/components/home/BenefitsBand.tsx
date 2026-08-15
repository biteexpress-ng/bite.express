"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Headphones,
  MapPin,
  Timer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type Benefit = { title: string; description: string };

type Props = {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  benefits: Benefit[];
};

const ICONS: LucideIcon[] = [MapPin, Timer, CreditCard, Headphones];

const operations = [
  { label: "Average ETA", value: "32m" },
  { label: "Partner SLA", value: "98%" },
  { label: "Support response", value: "<2m" },
];

const benefitCardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.1 + 0.2,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

export function BenefitsBand({
  eyebrow,
  title,
  titleHighlight,
  benefits,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(222,22,0,0.18),transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.55))]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-orange">
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-lg font-serif text-4xl leading-[1.06] tracking-normal text-white sm:text-5xl">
            {title}
            {titleHighlight && (
              <>
                <br />
                <em className="hero-gradient-text not-italic">
                  {titleHighlight}
                </em>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-white/58">
            A calmer ordering flow, faster dispatch logic, and human support
            behind every handoff.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.88fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map(({ title: benefitTitle, description }, index) => {
              const Icon = ICONS[index] ?? MapPin;
              return (
                <motion.article
                  key={benefitTitle}
                  className="group rounded-lg border border-white/10 bg-white/[0.065] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-300 hover:bg-white/[0.10]"
                  custom={index}
                  variants={benefitCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10%" }}
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/20 text-brand-orange">
                    <Icon size={18} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold leading-snug text-white">
                    {benefitTitle}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-white/52">
                    {description}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <motion.aside
            className="rounded-lg border border-white/10 bg-white/[0.08] p-5 shadow-luxe backdrop-blur-xl"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/42">
                  Live ops layer
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Dispatch pulse
                </h3>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-red text-white">
                <TrendingUp size={18} />
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {operations.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-xs text-white/52">{item.label}</span>
                    <span className="font-serif text-2xl leading-none text-white">
                      {item.value}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-brand-red"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${74 + index * 8}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.45 + index * 0.12 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
