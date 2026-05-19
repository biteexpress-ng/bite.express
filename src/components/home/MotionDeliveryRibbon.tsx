"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const ribbonText =
  "FOOD • GROCERY • PHARMACY • PARCEL • PETROL • DELIVERED";

/**
 * Diagonal glowing red "delivery" ribbon that sweeps across the
 * bottom of the hero. Composed from:
 *   - Two thin glowing edge lines (top + bottom).
 *   - Two stacked text marquees moving in opposite directions for
 *     parallax depth.
 *   - A faint diagonal red wash behind everything.
 *
 * Purely decorative — aria-hidden, pointer-events-none, and the
 * marquee falls back to a static state under prefers-reduced-motion
 * (the .motion-ribbon-track CSS keyframe is suppressed globally).
 */
export function MotionDeliveryRibbon() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      role="presentation"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-72 overflow-hidden sm:h-80 lg:h-96"
    >
      {/* The rotating band — wider than viewport so the diagonal
          rotation doesn't expose its ends. */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 w-[180%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg]",
        )}
      >
        {/* Faint red wash behind the ribbon */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 -z-10 h-40 -translate-y-1/2 bg-gradient-to-b from-transparent via-brand-red/8 to-transparent blur-2xl"
        />

        {/* Top glowing edge */}
        <div className="h-px bg-brand-red shadow-[0_0_18px_3px_rgba(222,22,0,0.55),0_0_4px_1px_rgba(255,107,74,0.7)]" />
        <div className="mt-2 h-px bg-brand-red/30" />

        {/* Marquee row 1 — moves left */}
        <div className="motion-ribbon mt-3 bg-gradient-to-r from-transparent via-brand-red/10 to-transparent">
          <div className="motion-ribbon-track text-base font-bold tracking-[0.22em] text-brand-red/80 sm:text-lg">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={`a-${i}`} className="inline-flex items-center gap-3">
                <span>{ribbonText}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-brand-orange/80" />
              </span>
            ))}
          </div>
        </div>

        {/* Marquee row 2 — moves the opposite way for depth */}
        <div
          className={cn(
            "motion-ribbon mt-1 bg-gradient-to-r from-transparent via-brand-red/15 to-transparent",
          )}
        >
          <div
            className="motion-ribbon-track text-base font-bold tracking-[0.22em] text-brand-red/55 sm:text-lg"
            style={
              reduced
                ? undefined
                : { animationDirection: "reverse", animationDuration: "30s" }
            }
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={`b-${i}`} className="inline-flex items-center gap-3">
                <span>{ribbonText}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-brand-orange/60" />
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glowing edge */}
        <div className="mt-3 h-px bg-brand-red/30" />
        <div className="mt-2 h-px bg-brand-red shadow-[0_0_18px_3px_rgba(222,22,0,0.55),0_0_4px_1px_rgba(255,107,74,0.7)]" />
      </div>

      {/* Top fade so the ribbon dissolves into the hero, no hard edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050505] to-transparent"
      />
    </div>
  );
}
