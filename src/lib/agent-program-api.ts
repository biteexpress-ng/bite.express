/**
 * Agent programme facts, read live from the backend so the marketing page
 * never hardcodes the welcome bonus.
 *
 *   GET /api/v1/agent/program-info
 *
 * The amount and the on/off switch are set by admins at
 * /admin/agent-program/settings on dashboard.bite.express.
 */

import { api } from "@/lib/api-client";

export interface OnboardingBonus {
  /** Naira amount, as configured by admin. Always > 0 when present. */
  amount: number;
  /** Days after certification the locked bonus is voided if never unlocked. */
  expiryDays: number;
}

interface ProgramInfoResponse {
  onboarding_bonus?: {
    active?: boolean;
    amount?: number | string;
    expiry_days?: number | string;
  };
}

/** Format a naira amount the way the rest of the site writes money: ₦3,000. */
export function formatNaira(amount: number): string {
  return `₦${new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

/**
 * Returns the welcome bonus to advertise, or null when there is nothing
 * honest to advertise: the admin switched it off, the amount is zero, or the
 * backend is unreachable. Callers omit the bonus entirely on null. We never
 * fall back to a hardcoded figure, since quoting a number we cannot confirm
 * is worse than staying quiet.
 */
export async function getOnboardingBonus(): Promise<OnboardingBonus | null> {
  const res = await api<ProgramInfoResponse>("/api/v1/agent/program-info", {
    // Tagged so the admin's "agents" revalidate ping expires this fetch
    // immediately. Without the tag, revalidatePath alone would re-render the
    // page against a still-fresh cached response and show the old amount.
    // The 1h revalidate is the fallback when the webhook is not configured.
    next: { revalidate: 3600, tags: ["agent-program"] },
  });
  if (!res.ok) return null;

  const bonus = res.data?.onboarding_bonus;
  if (!bonus?.active) return null;

  const amount = Number(bonus.amount ?? 0);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  const expiryDays = Number(bonus.expiry_days ?? 30);

  return {
    amount,
    expiryDays: Number.isFinite(expiryDays) && expiryDays > 0 ? expiryDays : 30,
  };
}
