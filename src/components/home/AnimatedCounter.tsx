"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  motion,
  animate,
  useReducedMotion,
} from "framer-motion";

type Props = {
  /** The numeric target (e.g. 10, 500, 1200, 100). */
  value: number;
  /** Text appended after the number (e.g. "+", "K+"). */
  suffix?: string;
  /** Text prepended before the number (e.g. "₦"). */
  prefix?: string;
  /** Whether to format with commas (e.g. 1,200). */
  formatCommas?: boolean;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Animated counter that counts up from 0 to `value` when it enters
 * the viewport. Uses framer-motion spring physics for a satisfying
 * deceleration curve. Respects `prefers-reduced-motion`.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  formatCommas = true,
  duration = 2,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reducedMotion = useReducedMotion();

  const rounded = useTransform(motionValue, (v) => {
    const num = Math.round(v);
    if (formatCommas) {
      return num.toLocaleString("en-US");
    }
    return String(num);
  });

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      motionValue.set(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.25, 1, 0.5, 1],
    });

    return () => controls.stop();
  }, [isInView, value, duration, motionValue, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
