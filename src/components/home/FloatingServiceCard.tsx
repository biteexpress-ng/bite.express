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
  /**
   * Shape variant:
   *   - "square": image-on-top + text-below (used for the left flank).
   *   - "wide":   icon-left + text-right horizontal tile (right flank).
   */
  variant?: "square" | "wide";
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
  variant = "square",
  className,
  delay = 0,
}: Props) {
  const FallbackIcon = iconLookup[iconKey];
  const reducedMotion = useReducedMotion();
  // Start by assuming the asset is missing; flip to true on a clean
  // load. If <Image> errors, this state never changes -> placeholder
  // stays visible.
  const [imgLoaded, setImgLoaded] = useState(false);

  // Both variants share the same outer wrapper styling (animation +
  // golden glass surface). Width and inner layout differ.
  const widthClasses =
    variant === "wide"
      ? "w-48 xl:w-56"
      : "w-22 xl:w-26";

  return (
    <motion.div
      aria-hidden
      className={cn("hidden lg:block", widthClasses, className)}
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
          "relative overflow-hidden rounded-[1.15rem] border border-amber-200/15 bg-gradient-to-br from-amber-100/[0.10] via-amber-700/[0.04] to-black/[0.4] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,210,140,0.10)] backdrop-blur-xl",
        )}
      >
        {/* Warm amber corner glow — gives each card the glassy
            golden tint shown in the design reference. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full bg-amber-400/25 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-8 h-20 w-20 rounded-full bg-amber-600/15 blur-2xl"
        />

        {variant === "wide" ? (
          /* Wide horizontal layout: square icon tile on the left,
             label + detail stacked on the right. Used for right-side
             cards (Pharmacy, Parcel, Petrol). */
          <div className="relative flex items-center gap-3 p-2.5">
            <div
              className={cn(
                "relative h-12 w-12 flex-none overflow-hidden rounded-xl",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  placeholderAccent,
                  imgLoaded ? "opacity-0" : "opacity-100",
                )}
              >
                <FallbackIcon size={22} strokeWidth={1.5} />
              </div>
              <Image
                src={imagePath}
                alt=""
                fill
                sizes="56px"
                className={cn(
                  "object-cover transition-opacity duration-300",
                  imgLoaded ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(false)}
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-sans text-sm font-semibold leading-tight text-white">
                {label}
              </div>
              <div className="mt-1 text-[0.62rem] leading-tight tracking-wide text-amber-100/60">
                {detail}
              </div>
            </div>
          </div>
        ) : (
          /* Square (image-top + text-below) layout. Used for
             left-side cards (Food, Grocery). The outer flex column is
             fixed to aspect-square so the *whole tile* is a square —
             image takes the remaining space, text strip is shrink-0
             at the bottom. */
          <div className="relative flex aspect-square flex-col">
            <div className="relative w-full flex-1">
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  placeholderAccent,
                  imgLoaded ? "opacity-0" : "opacity-100",
                )}
              >
                <FallbackIcon size={26} strokeWidth={1.5} />
              </div>
              <Image
                src={imagePath}
                alt=""
                fill
                sizes="120px"
                className={cn(
                  "object-cover transition-opacity duration-300",
                  imgLoaded ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(false)}
                unoptimized
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/12 to-transparent"
              />
            </div>
            <div className="shrink-0 px-2 py-1.5">
              <div className="font-sans text-[0.72rem] font-semibold leading-tight text-white">
                {label}
              </div>
              <div className="mt-0.5 text-[0.55rem] leading-tight tracking-wide text-amber-100/55">
                {detail}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
