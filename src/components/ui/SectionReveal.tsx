"use client";

import { type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "fade-up" | "slide-left" | "slide-right" | "scale-in" | "blur-in";

type Props = {
  children: ReactNode;
  variant?: Variant;
  /** Delay before animation starts (seconds). */
  delay?: number;
  /** Duration of the entrance (seconds). */
  duration?: number;
  /** IntersectionObserver margin — negative values trigger earlier. */
  viewportMargin?: string;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "li";
};

const variants: Record<
  Variant,
  { hidden: TargetAndTransition; visible: TargetAndTransition }
> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

/**
 * Wrap any element to give it a polished scroll-triggered entrance.
 * Respects `prefers-reduced-motion`.
 */
export function SectionReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  viewportMargin = "-12%",
  className,
  style,
  as = "div",
}: Props) {
  const reducedMotion = useReducedMotion();
  const v = variants[variant];
  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      style={style}
      initial={reducedMotion ? false : v.hidden}
      whileInView={reducedMotion ? {} : v.visible}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Container whose direct children stagger in sequentially.
 * Each child gets the same reveal treatment, offset by `stagger` seconds.
 */
export function StaggerReveal({
  children,
  stagger = 0.1,
  viewportMargin = "-10%",
  className,
  as = "div",
}: {
  children: ReactNode;
  stagger?: number;
  variant?: Variant;
  duration?: number;
  viewportMargin?: string;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const reducedMotion = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        staggerChildren: reducedMotion ? 0 : stagger,
      }}
    >
      {children}
    </Tag>
  );
}

/** Use as a direct child of <StaggerReveal>. */
export function StaggerItem({
  children,
  variant = "fade-up",
  duration = 0.6,
  className,
  as = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const v = variants[variant];
  const Tag = motion[as];

  return (
    <Tag
      className={cn(className)}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration, ease: [0.25, 1, 0.5, 1] as const },
        },
      }}
    >
      {children}
    </Tag>
  );
}
