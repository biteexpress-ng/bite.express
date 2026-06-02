import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type Background = "white" | "soft" | "dark" | "brand" | "aurora";
type Padding = "sm" | "md" | "lg" | "xl";

const backgrounds: Record<Background, string> = {
  // "white" now resolves to the warm editorial canvas so cards lift off it.
  white: "bg-canvas text-ink-900",
  soft: "bg-canvas-2 text-ink-900",
  dark: "bg-obsidian text-white",
  brand: "bg-brand-red text-white",
  // Subtle warm aurora wash from the top corners — for page intros.
  aurora: "aurora-bg text-ink-900",
};

const paddings: Record<Padding, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
  xl: "py-24 sm:py-32",
};

type SectionProps<T extends ElementType> = {
  as?: T;
  background?: Background;
  padding?: Padding;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "background" | "padding">;

export function Section<T extends ElementType = "section">({
  as,
  background = "white",
  padding = "lg",
  className,
  ...rest
}: SectionProps<T>) {
  const Tag = (as ?? "section") as ElementType;
  return (
    <Tag
      className={cn(
        "relative w-full overflow-hidden",
        backgrounds[background],
        paddings[padding],
        className,
      )}
      {...rest}
    />
  );
}
