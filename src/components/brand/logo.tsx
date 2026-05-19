import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  /** "light" for use on light backgrounds, "dark" for use on dark backgrounds. */
  variant?: "light" | "dark";
  /** Tailwind classes applied to the <img>. Default sizes the logo for the
   *  navbar (h-8 mobile, h-10 desktop) with width auto-scaling to preserve
   *  the intrinsic 1255×455 aspect ratio. */
  className?: string;
  asLink?: boolean;
  priority?: boolean;
};

const INTRINSIC_W = 1255;
const INTRINSIC_H = 455;

export function Logo({
  variant = "light",
  className,
  asLink = true,
  priority = false,
}: LogoProps) {
  const src =
    variant === "dark" ? "/brand/logo-dark.png" : "/brand/logo.svg";

  const img = (
    <Image
      src={src}
      alt={`${siteConfig.name} logo`}
      width={INTRINSIC_W}
      height={INTRINSIC_H}
      priority={priority}
      // h-* locks the rendered height; w-auto lets width follow the ratio.
      // Never use h-auto + w-auto together — that defeats the inline size
      // Next/Image sets from the width/height props.
      className={cn("h-8 w-auto md:h-10", className)}
    />
  );

  if (!asLink) return img;

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className="inline-flex items-center"
    >
      {img}
    </Link>
  );
}
