"use client";

import {
  type ReactNode,
  useRef,
  useCallback,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Maximum pull distance in pixels. Default 4. */
  strength?: number;
  className?: string;
};

const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };

/**
 * Wraps a button/link to give it a subtle magnetic pull toward the
 * cursor. The element shifts 2–4px toward the pointer when hovered,
 * snapping back with spring physics when the cursor leaves.
 *
 * Falls back to no-op on touch devices and when reduced motion is
 * preferred.
 */
export function MagneticButton({
  children,
  strength = 4,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      x.set(dx * strength);
      y.set(dy * strength);
    },
    [x, y, strength, reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
