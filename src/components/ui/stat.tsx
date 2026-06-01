import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  value: ReactNode;
  label: ReactNode;
  invert?: boolean;
  className?: string;
};

export function Stat({ value, label, invert = false, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "font-serif text-4xl leading-none tracking-tight tabular-nums sm:text-5xl",
          invert ? "text-white" : "text-ink-900",
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          "text-sm uppercase tracking-wider",
          invert ? "text-white/60" : "text-ink-600",
        )}
      >
        {label}
      </div>
    </div>
  );
}
