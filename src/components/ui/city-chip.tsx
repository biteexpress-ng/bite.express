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
        "group relative flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all hover:border-brand-red hover:shadow-soft",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
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
