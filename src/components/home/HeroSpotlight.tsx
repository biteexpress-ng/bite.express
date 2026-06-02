"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-tracking flame spotlight for the hero. Renders a pointer-events-none
 * overlay that listens on its parent section and drives the `--mx` / `--my`
 * CSS variables consumed by the `.spotlight` utility. No-ops under
 * prefers-reduced-motion and on touch (no pointermove).
 */
export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    parent.addEventListener("pointermove", onMove);
    return () => parent.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="spotlight pointer-events-none absolute inset-0 z-0 hidden lg:block"
    />
  );
}
