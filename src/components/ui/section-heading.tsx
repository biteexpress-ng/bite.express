import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow variant={invert ? "dark" : "light"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={cn(
          "font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl",
          eyebrow ? "mt-5" : "",
          invert ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-lg sm:text-xl",
            invert ? "text-white/75" : "text-ink-600",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
