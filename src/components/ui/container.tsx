import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: "page" | "prose" | "narrow";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size">;

const sizeMap = {
  page: "max-w-7xl",
  prose: "max-w-2xl",
  narrow: "max-w-4xl",
} as const;

export function Container<T extends ElementType = "div">({
  as,
  size = "page",
  className,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
      {...rest}
    />
  );
}
