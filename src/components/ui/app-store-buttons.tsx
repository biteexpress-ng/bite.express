import { Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";

/**
 * Two store-download buttons (App Store + Google Play) for a given app.
 * `ios` / `android` are full store URLs — see siteConfig.{appStore,
 * driverAppStore, vendorAppStore}.
 */
export function AppStoreButtons({
  ios,
  android,
  size = "md",
  className,
}: {
  ios: string;
  android: string;
  size?: Size;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <ButtonLink
        href={ios}
        external
        variant="obsidian"
        size={size}
        className="w-full sm:w-auto"
      >
        <Download size={16} />
        App Store
      </ButtonLink>
      <ButtonLink
        href={android}
        external
        variant="obsidian"
        size={size}
        className="w-full sm:w-auto"
      >
        <Download size={16} />
        Google Play
      </ButtonLink>
    </div>
  );
}
