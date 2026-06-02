import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DeliveryModule } from "@/lib/modules";
import { cn } from "@/lib/cn";

type Props = {
  service: DeliveryModule;
};

export function HomeServiceCard({ service }: Props) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-surface shadow-card transition-[transform,box-shadow,border-color] duration-[280ms] ease-out-expo hover:-translate-y-[3px] hover:border-brand-red/30 hover:shadow-floating"
    >
      {/* ── Visual area — product image or icon on accent background ─── */}
      <div
        className={cn(
          "relative flex h-52 items-center justify-center overflow-hidden",
          service.accent,
        )}
      >
        {service.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={service.image}
            alt=""
            draggable={false}
            className="h-full w-full select-none object-contain p-8 transition duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <Icon
            size={64}
            strokeWidth={1.2}
            className="transition duration-300 group-hover:scale-110"
          />
        )}
      </div>

      {/* ── Text area ────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-base font-bold leading-snug text-ink-900">
          {service.name}
        </h3>
        <p className="mt-1.5 text-sm leading-[1.65] text-ink-500">
          {service.description}
        </p>
        <div className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-red">
          Explore
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
