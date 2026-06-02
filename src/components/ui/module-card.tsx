import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  description: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  accentClassName?: string;
  className?: string;
};

/**
 * Vertical card for delivery modules (Food, Grocery, Pharmacy, etc.).
 * Designed to live in a 2-column / 3-column grid.
 */
export function ModuleCard({
  name,
  description,
  href,
  icon: Icon,
  accentClassName,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-ink-200 bg-surface p-7 shadow-card transition-[transform,box-shadow,border-color] duration-[280ms] ease-out-expo hover:-translate-y-[3px] hover:border-brand-red/30 hover:shadow-floating sm:p-8",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-[var(--shadow-bevel)] transition-all duration-200 ease-out-expo group-hover:text-white group-hover:shadow-glow-sm",
          accentClassName ?? "bg-linear-to-br from-brand-red/12 to-brand-orange/10 text-brand-red group-hover:from-brand-red group-hover:to-brand-red-600",
        )}
      >
        <Icon size={26} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-2xl leading-tight text-ink-900">
          {name}
        </h3>
        <p className="text-base text-ink-600">{description}</p>
      </div>
      <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-red transition-colors group-hover:text-brand-red-600">
        Explore
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}
