import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
};

export function Eyebrow({ children, variant = "light", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
        variant === "light"
          ? "border border-ink-200 bg-white/80 text-ink-700 backdrop-blur"
          : "border border-white/20 bg-white/10 text-white/90 backdrop-blur",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
      {children}
    </span>
  );
}
