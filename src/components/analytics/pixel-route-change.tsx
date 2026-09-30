"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The pixel snippet in analytics.tsx sends one PageView when the page
 * loads. Client-side navigations never reload, so this sends one for
 * each route change after the first. Rendered only when the pixel is on.
 */
export function PixelRouteChange() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === null) {
      lastPath.current = pathname;
      return;
    }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (typeof window.fbq === "function") window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
