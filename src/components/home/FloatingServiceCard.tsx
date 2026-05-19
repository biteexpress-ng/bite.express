"use client";

import {
  Fuel,
  Package,
  Pill,
  ShoppingBasket,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const icons = {
  food: UtensilsCrossed,
  grocery: ShoppingBasket,
  pharmacy: Pill,
  parcel: Package,
  petrol: Fuel,
} satisfies Record<string, LucideIcon>;

type Props = {
  label: string;
  detail: string;
  icon: keyof typeof icons;
  className?: string;
  delay?: number;
};

export function FloatingServiceCard({
  label,
  detail,
  icon,
  className,
  delay = 0,
}: Props) {
  const Icon = icons[icon];
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute hidden sm:block", className)}
      initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{
          duration: 6 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass-card flex min-w-36 items-center gap-3 rounded-2xl px-4 py-3 text-white"
      >
        <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-brand-orange ring-1 ring-white/15">
          <Icon size={19} strokeWidth={1.8} />
        </span>
        <span className="min-w-0">
          <span className="block font-serif text-lg leading-none">{label}</span>
          <span className="mt-1 block text-[0.7rem] uppercase text-white/55">
            {detail}
          </span>
        </span>
      </motion.div>
    </motion.div>
  );
}
