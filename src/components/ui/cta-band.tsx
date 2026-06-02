import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  cta: ReactNode;
  /** Optional secondary CTA (e.g. ghost-style "Learn more"). */
  secondaryCta?: ReactNode;
  variant?: "dark" | "brand" | "light";
  className?: string;
};

const variants = {
  dark: "bg-brand-black text-white",
  brand: "bg-gradient-to-br from-brand-red via-brand-red-600 to-[#a00b00] text-white",
  light: "bg-ink-50 text-ink-900",
} as const;

/**
 * Full-width call-to-action band. Used between content sections to
 * route partners (vendors / riders / agents) into sign-up flows.
 */
export function CTABand({
  eyebrow,
  title,
  subtitle,
  cta,
  secondaryCta,
  variant = "dark",
  className,
}: Props) {
  const invert = variant !== "light";
  return (
    <section
      className={cn("relative isolate overflow-hidden", variants[variant], className)}
    >
      {/* Atmosphere — neon orbs + faint grid over dark/brand bands. */}
      {invert && (
        <>
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-[130px]",
              variant === "brand" ? "bg-white/10" : "bg-brand-red/14",
            )}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-flame/10 blur-[140px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,1)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000,transparent_75%)]"
          />
        </>
      )}
      <Container className="relative z-10 py-20 sm:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-5">
            {eyebrow && (
              <div className={cn("text-xs font-semibold uppercase tracking-wider", invert ? "text-white/60" : "text-ink-600")}>
                {eyebrow}
              </div>
            )}
            <h2
              className={cn(
                "font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl",
                invert ? "text-white" : "text-ink-900",
              )}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={cn(
                  "max-w-2xl text-lg",
                  invert ? "text-white/75" : "text-ink-600",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            {cta}
            {secondaryCta}
          </div>
        </div>
      </Container>
    </section>
  );
}
