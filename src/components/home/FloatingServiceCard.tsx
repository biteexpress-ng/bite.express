"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Fuel,
  Package,
  Pill,
  ShoppingBasket,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { HeroCardIconKey } from "@/lib/hero-cards";

// Server -> Client boundary: server components can't forward function
// references (icon components) to client components, so we receive a
// string key and resolve to the lucide icon here.
const iconLookup: Record<HeroCardIconKey, LucideIcon> = {
  food: UtensilsCrossed,
  pharmacy: Pill,
  grocery: ShoppingBasket,
  parcel: Package,
  petrol: Fuel,
};

type Props = {
  label: string;
  detail: string;
  imagePath: string;
  iconKey: HeroCardIconKey;
  placeholderAccent: string;
  className?: string;
  delay?: number;
};

/**
 * Glass card with an image at the top and label/detail below — the
 * card style around the hero phone in the design reference.
 *
 * If the imagePath PNG hasn't been provided yet, we render a styled
 * placeholder tile (gradient + lucide icon) so the composition reads
 * as finished. The moment real PNGs land in /public/brand/hero/, the
 * <Image> swap happens automatically (we just hide the placeholder
 * once load succeeds).
 *
 * Purely decorative — aria-hidden on the wrapper, never tab-stopped.
 */
export function FloatingServiceCard({
  label,
  detail,
  imagePath,
  iconKey,
  placeholderAccent,
  className,
  delay = 0,
}: Props) {
  const FallbackIcon = iconLookup[iconKey];
  const reducedMotion = useReducedMotion();
  // Start by assuming the asset is missing; flip to true on a clean
  // load. If <Image> errors, this state never changes -> placeholder
  // stays visible.
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      aria-hidden
      className={cn("absolute hidden w-[11.25rem] lg:block", className)}
      initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{
          duration: 9 + delay,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
        className={cn(
          "overflow-hidden rounded-[1.4rem] border border-white/8 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.02] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl",
        )}
      >
        {/* Image / placeholder tile */}
        <div className="relative aspect-[5/4] w-full">
          {/* Placeholder always rendered; hidden once real image succeeds. */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              placeholderAccent,
              imgLoaded ? "opacity-0" : "opacity-100",
            )}
          >
            <FallbackIcon size={42} strokeWidth={1.5} />
          </div>

          {/* Real image — uses unoptimized so a missing file doesn't
              hard-fail the build; onLoad flips the placeholder out. */}
          <Image
            src={imagePath}
            alt=""
            fill
            sizes="180px"
            className={cn(
              "object-cover transition-opacity duration-300",
              imgLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(false)}
            unoptimized
          />

          {/* Soft top sheen for the glass effect */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/15 to-transparent"
          />
        </div>

        {/* Label area */}
        <div className="px-4 py-3.5">
          <div className="font-sans text-base font-semibold leading-tight text-white">
            {label}
          </div>
          <div className="mt-1 text-[0.7rem] leading-none tracking-wide text-white/55">
            {detail}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
