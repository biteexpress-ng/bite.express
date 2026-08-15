"use client";

import { motion } from "framer-motion";

type HeroLine = {
  text: string;
  /** If true, this word/segment gets the gradient-shimmer treatment. */
  gradient?: boolean;
  /** If true, render remaining text after gradient word on the same line. */
  suffix?: string;
};

type Props = {
  lines: HeroLine[];
  className?: string;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

/**
 * Cinematic line-by-line hero text reveal. Each line is clipped
 * inside an overflow-hidden wrapper and slides up into view with
 * a stagger, creating the prestigious "curtain rise" effect.
 */
export function HeroTextReveal({ lines, className }: Props) {
  // No reduced-motion branch here. The two variants rendered the same text,
  // and MotionConfig now applies the line slide instantly for users who ask
  // for reduced motion, so one markup path serves both.
  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block" variants={lineVariants}>
            {line.gradient ? (
              <>
                <span className="hero-gradient-text italic">
                  {line.text}
                </span>
                {line.suffix && <span>{line.suffix}</span>}
              </>
            ) : (
              line.text
            )}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
