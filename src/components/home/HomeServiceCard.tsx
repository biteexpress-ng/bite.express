import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DeliveryModule } from "@/lib/modules";
import { cn } from "@/lib/cn";

type Props = {
  service: DeliveryModule;
  index: number;
};

export function HomeServiceCard({ service, index }: Props) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className={cn(
        "group relative min-h-[19rem] overflow-hidden rounded-[1.75rem] border border-ink-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-red/35 hover:shadow-elevated",
        index === 0 && "lg:col-span-2",
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-50 to-transparent"
      />
      <svg
        aria-hidden
        className="absolute right-0 top-0 h-40 w-52 text-brand-red/10 transition duration-300 group-hover:text-brand-red/20"
        viewBox="0 0 240 180"
        fill="none"
      >
        <path
          d="M18 146C65 92 91 164 136 108C166 71 187 57 222 42"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray="1 28"
        />
      </svg>

      <div className="relative z-10 flex h-full flex-col">
        <div
          className={cn(
            "inline-flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-black/5",
            service.accent,
          )}
        >
          <Icon size={31} />
        </div>

        <div className="mt-10 max-w-md">
          <p className="text-xs font-semibold uppercase text-ink-500">
            Essential {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-none tracking-normal text-ink-900">
            {service.name}
          </h3>
          <p className="mt-4 text-base leading-7 text-ink-600">
            {service.description}
          </p>
        </div>

        <div className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-brand-red">
          Explore
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
