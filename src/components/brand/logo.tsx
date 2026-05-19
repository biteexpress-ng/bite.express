import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  /** "light" for use on light backgrounds, "dark" for use on dark backgrounds. */
  variant?: "light" | "dark";
  /** Render width in pixels (height scales by intrinsic ratio ≈ 2.76:1). */
  width?: number;
  /** Make the logo a link to "/". Defaults to true. */
  asLink?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "light",
  width = 140,
  asLink = true,
  className,
  priority = false,
}: LogoProps) {
  const src =
    variant === "dark" ? "/brand/logo-dark.png" : "/brand/logo.svg";
  const height = Math.round((width / 1255) * 455); // intrinsic 1255×455

  const img = (
    <Image
      src={src}
      alt={`${siteConfig.name} logo`}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
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
