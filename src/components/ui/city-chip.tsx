import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  state: string;
  href: string;
  className?: string;
};

export function CityChip({ name, state, href, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-surface p-5 shadow-card transition-[transform,box-shadow,border-color] duration-[280ms] ease-out-expo hover:-translate-y-[3px] hover:border-brand-red/30 hover:shadow-floating",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-brand-red/12 to-brand-orange/10 text-brand-red shadow-[var(--shadow-bevel)] transition-all duration-200 ease-out-expo group-hover:from-brand-red group-hover:to-brand-red-600 group-hover:text-white group-hover:shadow-glow-sm">
          <MapPin size={18} />
        </span>
        <div>
          <div className="font-serif text-lg leading-tight text-ink-900">
            {name}
          </div>
          <div className="text-xs uppercase tracking-wider text-ink-600">
            {state} State
          </div>
        </div>
      </div>
      <ArrowUpRight
        size={18}
        className="text-ink-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red"
      />
    </Link>
  );
}
