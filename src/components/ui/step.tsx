import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  number: number;
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

export function Step({ number, title, description, className }: Props) {
  return (
    <div className={cn("relative flex gap-5", className)}>
      <div className="flex-none">
        <div className="font-mono text-3xl font-medium leading-none tracking-tight text-brand-red tabular-nums sm:text-4xl">
          {String(number).padStart(2, "0")}
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <h3 className="font-serif text-xl text-ink-900 sm:text-2xl">{title}</h3>
        <p className="text-base text-ink-600">{description}</p>
      </div>
    </div>
  );
}
