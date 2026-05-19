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
        "group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-ink-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:p-8",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
          accentClassName ?? "bg-brand-red/10 text-brand-red",
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
