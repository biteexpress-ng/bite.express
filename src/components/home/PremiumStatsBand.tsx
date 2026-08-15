"use client";

import { Bike, MapPinned, PackageCheck, Store, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "./AnimatedCounter";

type StatItem = {
  numericValue: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

const stats: StatItem[] = [
  { numericValue: 10,   suffix: "+",  label: "Cities Served",      icon: MapPinned    },
  { numericValue: 500,  suffix: "+",  label: "Active Vendors",      icon: Store        },
  { numericValue: 1200, suffix: "+",  label: "Riders on the Road",  icon: Bike         },
  { numericValue: 100,  suffix: "K+", label: "Orders Delivered",    icon: PackageCheck },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

export function PremiumStatsBand() {
  return (
    <section className="bg-canvas px-5 py-10 sm:px-6 lg:px-8">
      <Container className="px-0">
        <motion.div
          className="relative overflow-hidden rounded-lg border border-white/10 bg-brand-black px-6 py-10 text-white shadow-2xl sm:px-10 lg:px-14"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Decorative background curves — draw in on scroll */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-[0.18]"
            viewBox="0 0 1200 320"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M-80 240C118 132 216 302 380 166C507 60 610 76 756 160C925 258 1011 80 1280 124"
              stroke="#de1600"
              strokeWidth="2"
              strokeDasharray="8 18"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            />
            <motion.path
              d="M-40 106C174 182 315 12 506 90C722 178 822 326 1046 190C1124 142 1193 128 1260 138"
              stroke="#ff6b4a"
              strokeWidth="1"
              strokeDasharray="2 18"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
            />
          </svg>

          <div className="relative grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-0">
            {stats.map(({ numericValue, suffix, label, icon: Icon }, index) => (
              <motion.div
                key={label}
                className="relative flex flex-col items-start text-left lg:px-10 first:lg:pl-0 last:lg:pr-0"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
              >
                {/* Vertical rule between columns (desktop) */}
                {index > 0 && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 hidden h-16 -translate-y-1/2 border-l border-white/10 lg:block"
                  />
                )}

                {/* Icon — with subtle pulse on hover */}
                <motion.span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-brand-red/30 bg-brand-red/10 text-brand-orange"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </motion.span>

                {/* Animated counter value */}
                <AnimatedCounter
                  value={numericValue}
                  suffix={suffix}
                  duration={2}
                  formatCommas={numericValue >= 1000}
                  className="mt-4 block font-serif text-4xl leading-none text-white sm:text-5xl"
                />

                {/* Label */}
                <span className="mt-2.5 block text-[11px] font-semibold uppercase tracking-widest text-white/45">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
