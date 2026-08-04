import { z } from "zod";

/**
 * Shared anti-spam building blocks, used by every public form on the site
 * (contact, vendor / rider / agent sign-up, job application, newsletter).
 *
 * Three layers, mirrored client- and server-side:
 *   1. Honeypot: a visually hidden "website" input. Humans never see it,
 *      bots fill every field. Any value = drop.
 *   2. Time-trap: the form stamps `startedAt` on mount. Submissions
 *      faster than MIN_FILL_SECONDS are headless scripts.
 *   3. Math check: a visible "what is A + B?" question. Cheap friction
 *      that stops dumb form-fillers. (Skipped on the one-field
 *      newsletter form where it would cost more signups than it saves.)
 *
 * Spam is always dropped with a FAKE success response so bots don't
 * retry with tweaked payloads.
 */

/** Minimum seconds between page render and submission. */
export const MIN_FILL_SECONDS = 3;

/** Honeypot + time-trap only (newsletter). */
export const stealthAntiSpamShape = {
  // Real users never see this field; bots fill every input.
  website: z.string().max(0, "Bot detected"),
  startedAt: z.number().int().positive(),
};

/** Full suite: honeypot + time-trap + visible math check. */
export const antiSpamShape = {
  ...stealthAntiSpamShape,
  mathA: z.number().int().min(0).max(20),
  mathB: z.number().int().min(0).max(20),
  mathAnswer: z
    .number({ message: "Answer the spam check" })
    .int({ message: "Answer the spam check" }),
};

export type StealthAntiSpamValues = {
  website: string;
  startedAt: number;
};

export type AntiSpamValues = StealthAntiSpamValues & {
  mathA: number;
  mathB: number;
  mathAnswer: number;
};

/** Attach to schemas that include the full antiSpamShape. */
export function refineMathAnswer(
  v: { mathA: number; mathB: number; mathAnswer: number },
  ctx: z.RefinementCtx,
) {
  if (v.mathAnswer !== v.mathA + v.mathB) {
    ctx.addIssue({
      code: "custom",
      path: ["mathAnswer"],
      message: "That doesn't add up, try again",
    });
  }
}

/**
 * Server-side verdict. Returns the trap that fired, or null for humans.
 * Callers should log the reason and return a fake success.
 */
export function spamReason(
  v: StealthAntiSpamValues & Partial<AntiSpamValues>,
): string | null {
  if (v.website && v.website.length > 0) return "honeypot";
  if (Date.now() - v.startedAt < MIN_FILL_SECONDS * 1000) return "time-trap";
  if (
    typeof v.mathA === "number" &&
    typeof v.mathB === "number" &&
    v.mathAnswer !== v.mathA + v.mathB
  ) {
    return "math-check";
  }
  return null;
}
