"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Dual-layer hero spotlight:
 *   1. A primary cursor-tracking gradient (follows with a soft lerp).
 *   2. An autonomous ambient orb that drifts slowly, adding life even
 *      when the cursor isn't moving.
 *
 * Both layers are purely decorative (aria-hidden, pointer-events: none).
 * Hidden on mobile and when prefers-reduced-motion is set.
 */
export function HeroSpotlight() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(50);
  const my = useMotionValue(0);

  const springX = useSpring(mx, { damping: 40, stiffness: 150 });
  const springY = useSpring(my, { damping: 40, stiffness: 150 });
  const left = useTransform(springX, (value) => `${value}%`);
  const top = useTransform(springY, (value) => `${value}%`);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (reducedMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mx.set(x);
      my.set(y);
    },
    [mx, my, reducedMotion],
  );

  useEffect(() => {
    const el = containerRef.current?.parentElement;
    if (!el) return;
    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => el.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  if (reducedMotion) return null;

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      >
        <motion.div
          className="absolute h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,80,38,0.14),rgba(222,22,0,0.06)_36%,transparent_70%)] blur-sm"
          style={{
            left,
            top,
          }}
        />
      </div>

      {/* Secondary: autonomous ambient drift orb */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block opacity-70"
        animate={{
          background: [
            "linear-gradient(115deg, transparent 0%, rgba(222,22,0,0.08) 36%, transparent 62%)",
            "linear-gradient(125deg, transparent 0%, rgba(255,107,74,0.08) 43%, transparent 70%)",
            "linear-gradient(115deg, transparent 0%, rgba(222,22,0,0.08) 36%, transparent 62%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
