"use client";

import Image from "next/image";
import { useState, useCallback, useRef } from "react";
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
 * Glass card with cursor-aware lighting, organic float animation, and
 * blur-to-sharp entrance. Decorative — aria-hidden, never tab-stopped.
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
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor-aware glow — update CSS custom properties on pointermove
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--card-glow-x", `${x}%`);
      el.style.setProperty("--card-glow-y", `${y}%`);
    },
    [reducedMotion],
  );

  const widthClasses =
    variant === "wide"
      ? "w-48 xl:w-56"
      : "w-22 xl:w-26";

  return (
    <motion.div
      aria-hidden
      className={cn("hidden lg:block", widthClasses, className)}
      initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.92, filter: "blur(8px)" }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        animate={reducedMotion ? undefined : {
          y: [0, -8, 4, 0],
          rotate: [0, 0.5, -0.3, 0],
        }}
        transition={{
          duration: 9 + delay,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
        className="relative overflow-hidden rounded-lg border border-amber-200/15 bg-gradient-to-br from-amber-100/[0.10] via-amber-700/[0.04] to-black/[0.4] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,210,140,0.10)] backdrop-blur-xl"
      >
        {/* Cursor-aware glow overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
              "radial-gradient(200px circle at var(--card-glow-x, 50%) var(--card-glow-y, 50%), rgba(255, 210, 140, 0.12), transparent 60%)",
          }}
        />

        {/* Warm amber corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full bg-amber-400/25 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-8 h-20 w-20 rounded-full bg-amber-600/15 blur-2xl"
        />

        {variant === "wide" ? (
          <div className="relative flex items-center gap-3 p-2.5">
            <div
              className={cn(
                "relative h-12 w-12 flex-none overflow-hidden rounded-md",
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
