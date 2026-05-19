import { Apple, Smartphone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

type Props = {
  variant?: "dark" | "light";
  className?: string;
};

/**
 * App Store + Google Play download badges. We use neutral styling rather
 * than Apple/Google's official trademarked badges; swap when official
 * SVG assets are licensed for brand compliance.
 */
export function AppBadges({ variant = "dark", className }: Props) {
  const dark = variant === "dark";
  const base =
    "inline-flex items-center gap-3 rounded-2xl px-5 py-3 transition-colors";
  const styles = dark
    ? "bg-white text-ink-900 hover:bg-ink-100"
    : "bg-ink-900 text-white hover:bg-brand-black border border-white/10";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={siteConfig.appStore.ios}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, styles)}
        aria-label="Download on the App Store"
      >
        <Apple size={26} />
        <div className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wider opacity-70">
            Download on the
          </span>
          <span className="text-base font-semibold">App Store</span>
        </div>
      </a>

      <a
        href={siteConfig.appStore.android}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, styles)}
        aria-label="Get it on Google Play"
      >
        <Smartphone size={26} />
        <div className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wider opacity-70">
            Get it on
          </span>
          <span className="text-base font-semibold">Google Play</span>
        </div>
      </a>
    </div>
  );
}
