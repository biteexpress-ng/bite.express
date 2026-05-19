"use server";

import {
  agentSchema,
  riderSchema,
  vendorSchema,
  type AgentFormValues,
  type RiderFormValues,
  type VendorFormValues,
} from "@/lib/forms/schemas";

export type ActionResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Phase 2 placeholder: validates server-side and logs. Phase 3 wires
 * these to the Laravel backend (/api/v1/vendor/register etc.) and
 * sends a confirmation email via Mailgun. Keep the contract stable —
 * callers shouldn't change when the backend lands.
 */

export async function submitVendorApplication(
  values: VendorFormValues,
): Promise<ActionResult> {
  const parsed = vendorSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }
  console.log("[partner-signup] vendor:", parsed.data);
  // TODO(phase-3): POST to Laravel /api/v1/vendor/register
  return { ok: true };
}

export async function submitRiderApplication(
  values: RiderFormValues,
): Promise<ActionResult> {
  const parsed = riderSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }
  console.log("[partner-signup] rider:", parsed.data);
  // TODO(phase-3): POST to Laravel /api/v1/delivery-man/register
  return { ok: true };
}

export async function submitAgentApplication(
  values: AgentFormValues,
): Promise<ActionResult> {
  const parsed = agentSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }
  console.log("[partner-signup] agent:", parsed.data);
  // TODO(phase-3): POST to Laravel /api/v1/agent/register (new endpoint)
  return { ok: true };
}
