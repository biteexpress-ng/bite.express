"use client";

import { useState } from "react";
import { Loader2, LocateFixed } from "lucide-react";
import { buildAppLocationUrl } from "@/lib/location-url";

type Status = "idle" | "locating" | "error";

type Props = {
  /** Customer-app base URL the browser is sent to on success. */
  appUrl: string;
  label: string;
  locatingLabel: string;
  errorMessage: string;
  className?: string;
  errorClassName?: string;
};

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 12000,
  maximumAge: 60000,
};

/**
 * "Use my current location" control shared by the hero form and the final
 * CTA form. On success it hands off to the customer app with the rounded
 * coordinates in the query string; on denial, timeout, or missing browser
 * support it shows an inline message instead of the typed-address form.
 */
export function UseMyLocationButton({
  appUrl,
  label,
  locatingLabel,
  errorMessage,
  className,
  errorClassName,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");

  function handleClick() {
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

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "locating"}
        aria-busy={status === "locating"}
        className={className}
      >
        {status === "locating" ? (
          <Loader2 size={14} className="animate-spin" aria-hidden />
        ) : (
          <LocateFixed size={14} aria-hidden />
        )}
        {status === "locating" ? locatingLabel : label}
      </button>
      {status === "error" ? (
        <p role="status" className={errorClassName}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
