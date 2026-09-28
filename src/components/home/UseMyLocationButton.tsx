"use client";

import { Loader2, LocateFixed } from "lucide-react";
import type { LocateMeStatus } from "./use-locate-me";

type ButtonProps = {
  status: LocateMeStatus;
  onLocate: () => void;
  label: string;
  locatingLabel: string;
  /** Shows the label text next to the icon. Icon-only (with aria-label) when false. */
  showLabel?: boolean;
  className?: string;
};

/**
 * Trigger for the "use my current location" flow. Presentational only: the
 * status and click handler come from `useLocateMe`, so the same state can
 * drive a full-label button on narrow screens and a compact icon-only one
 * docked beside the input at wider widths.
 */
export function LocateMeButton({
  status,
  onLocate,
  label,
  locatingLabel,
  showLabel = false,
  className,
}: ButtonProps) {
  const locating = status === "locating";
  const text = locating ? locatingLabel : label;

  return (
    <button
      type="button"
      onClick={onLocate}
      disabled={locating}
      aria-busy={locating}
      aria-label={text}
      title={text}
      className={className}
    >
      {locating ? (
        <Loader2 size={16} className="animate-spin" aria-hidden />
      ) : (
        <LocateFixed size={16} aria-hidden />
      )}
      {showLabel ? <span>{text}</span> : null}
    </button>
  );
}

type ErrorProps = {
  status: LocateMeStatus;
  message: string;
  className?: string;
};

/** Inline error line shown under the form when geolocation is denied, times out, or isn't supported. */
export function LocateMeError({ status, message, className }: ErrorProps) {
  if (status !== "error") {
    return null;
  }

  return (
    <p role="alert" className={className}>
      {message}
    </p>
  );
}
