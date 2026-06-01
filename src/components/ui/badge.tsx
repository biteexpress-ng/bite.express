import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "dark";
type Size = "sm" | "md";

const toneStyles: Record<Tone, string> = {
  neutral: "border-ink-200 bg-surface text-ink-700",
  brand: "border-brand-red/20 bg-brand-red/8 text-brand-red",
  success: "border-success/20 bg-success-soft text-success",
  warning: "border-warning/25 bg-warning-soft text-[#9a6700]",
  error: "border-error/20 bg-error-soft text-error",
  info: "border-info/20 bg-info-soft text-info",
  dark: "border-white/15 bg-white/10 text-white",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-6 gap-1.5 px-2.5 text-[11px]",
  md: "h-7 gap-2 px-3 text-xs",
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  /** Show a pulsing live dot before the label. */
  live?: boolean;
  className?: string;
};

/**
 * Pill-shaped badge for tags, filters and status indicators. Pair `live`
 * with tone="brand" / "success" for "delivering" / "online" states.
 */
export function Badge({
  children,
  tone = "neutral",
  size = "md",
  live = false,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border font-semibold uppercase tracking-wider tabular-nums",
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
    >
      {live && (
        <span
          aria-hidden
          className={cn(
            "live-dot",
            tone === "success" && "live-dot--success",
          )}
        />
      )}
      {children}
    </span>
  );
}
