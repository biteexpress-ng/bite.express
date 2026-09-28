"use client";

import { useState } from "react";
import { buildAppLocationUrl } from "@/lib/location-url";

export type LocateMeStatus = "idle" | "locating" | "error";

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 12000,
  maximumAge: 60000,
};

/**
 * Shared "use my current location" behaviour for the hero and final CTA
 * forms. Kept as a hook (rather than baked into one component) so the
 * trigger button and the error line can render in different places in the
 * form markup while sharing one status.
 *
 * On success it hands off to the customer app with the rounded coordinates
 * in the query string; on denial, timeout, or missing browser support it
 * flips to "error" so the caller can show an inline message instead of
 * submitting the typed-address form.
 */
export function useLocateMe(appUrl: string) {
  const [status, setStatus] = useState<LocateMeStatus>("idle");

  function locate() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      return;
    }

    setStatus("locating");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const url = buildAppLocationUrl(
          appUrl,
          position.coords.latitude,
          position.coords.longitude,
        );
        window.location.assign(url);
      },
      () => {
        setStatus("error");
      },
      GEOLOCATION_OPTIONS,
    );
  }

  return { status, locate };
}
