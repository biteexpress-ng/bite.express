"use client";

import { useEffect } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { TextField } from "./field";
import { cn } from "@/lib/cn";

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  /** Fixed per-form operands for the visible math check. */
  mathA: number;
  mathB: number;
  /** Validation message for the math answer, if any. */
  error?: string;
  className?: string;
};

/**
 * Drop-in anti-spam block for react-hook-form forms:
 * honeypot input, hidden math operands + startedAt timestamp, and the
 * visible "spam check" question. Pair with `antiSpamShape` +
 * `refineMathAnswer` in the form's schema and `spamReason()` in its
 * server action. Forms should default `website: ""`, `mathA`, `mathB`
 * and `startedAt: 1` so validation has values before mount.
 */
export function AntiSpamFields<T extends FieldValues>({
  register,
  setValue,
  mathA,
  mathB,
  error,
  className,
}: Props<T>) {
  // Stamp the real render time after mount; the server compares it
  // against submission time to catch instant bot submissions.
  useEffect(() => {
    setValue(
      "startedAt" as Path<T>,
      Date.now() as PathValue<T, Path<T>>,
    );
  }, [setValue]);

  return (
    <>
      {/* Honeypot: visually hidden, off-screen, no autofill. Bots fill it; humans never see it. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Leave this field empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website" as Path<T>)}
          />
        </label>
      </div>

      <input
        type="hidden"
        {...register("mathA" as Path<T>, { valueAsNumber: true })}
      />
      <input
        type="hidden"
        {...register("mathB" as Path<T>, { valueAsNumber: true })}
      />
      <input
        type="hidden"
        {...register("startedAt" as Path<T>, { valueAsNumber: true })}
      />

      <TextField
        label={`Spam check: what is ${mathA} + ${mathB}?`}
        type="number"
        inputMode="numeric"
        required
        placeholder="Your answer"
        error={error}
        className={cn("sm:col-span-2", className)}
        {...register("mathAnswer" as Path<T>, { valueAsNumber: true })}
      />
    </>
  );
}
