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
        "group relative flex flex-col gap-4 rounded-2xl border border-ink-200 bg-white p-6 transition-shadow hover:shadow-soft sm:p-8",
        className,
      )}
    >
      {Icon && (
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
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
