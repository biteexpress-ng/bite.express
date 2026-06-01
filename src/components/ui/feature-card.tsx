import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  icon?: ComponentType<{ size?: number; className?: string }>;
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, className }: Props) {
  return (
    <div
      className={cn(
        "group card-luxe relative flex flex-col gap-4 p-6 sm:p-8",
        className,
      )}
    >
      {Icon && (
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-red/12 to-brand-orange/10 text-brand-red shadow-[var(--shadow-bevel)] transition-all duration-200 ease-out-expo group-hover:from-brand-red group-hover:to-brand-red-600 group-hover:text-white group-hover:shadow-glow-sm">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-serif text-xl leading-tight text-ink-900 sm:text-2xl">
        {title}
      </h3>
      <p className="text-base text-ink-600">{description}</p>
    </div>
  );
}
