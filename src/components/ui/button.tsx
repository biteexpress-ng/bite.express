import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "flame"
  | "obsidian"
  | "secondary"
  | "outline"
  | "ghost";
type Size = "sm" | "md" | "lg" | "xl";

const variantStyles: Record<Variant, string> = {
  // Brand CTA — glow shadow that intensifies on hover.
  primary:
    "bg-brand-red text-white shadow-glow-sm hover:bg-brand-red-600 hover:shadow-glow active:bg-brand-red-700",
  // Premium brand CTA — flame gradient with the strongest glow.
  flame:
    "bg-linear-to-b from-brand-red to-brand-red-600 text-white shadow-glow-sm hover:from-brand-red-400 hover:to-brand-red hover:shadow-glow active:from-brand-red-600 active:to-brand-red-700",
  // Dark CTA — obsidian fill with a micro-bevel highlight.
  obsidian:
    "bg-obsidian text-white shadow-[var(--shadow-bevel),var(--shadow-card)] hover:bg-obsidian-700 hover:shadow-[var(--shadow-bevel),var(--shadow-elevated)]",
  secondary:
    "bg-brand-black text-white shadow-[var(--shadow-bevel),var(--shadow-card)] hover:bg-ink-700 active:bg-ink-900",
  outline:
    "border border-ink-200 bg-surface text-ink-900 shadow-soft hover:border-brand-red/30 hover:bg-ink-50 active:bg-ink-100",
  ghost:
    "bg-transparent text-ink-900 hover:bg-ink-100 active:bg-ink-200",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-14 px-7 text-lg",
  xl: "h-[3.5rem] px-9 text-lg",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out-expo " +
  "hover:-translate-y-px active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorProps = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  children,
}: AnchorProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
