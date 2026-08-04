"use server";

import {
  agentSchema,
  riderSchema,
  vendorSchema,
  type AgentFormValues,
  type RiderFormValues,
  type VendorFormValues,
} from "@/lib/forms/schemas";
import { spamReason } from "@/lib/forms/anti-spam";
import { sendMail } from "@/lib/mailgun";
import {
  agentApplicationEmail,
  riderApplicationEmail,
  vendorApplicationEmail,
} from "@/lib/email-templates/partner-application";
import {
  submitAgentLead,
  submitRiderLead,
  submitVendorLead,
} from "@/lib/partner-leads-api";
import { siteConfig } from "@/lib/site-config";

export type ActionResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Partner sign-up actions: validate, persist to backend, email the team.
 *
 * Phase 3c rewires these to dual-track:
 *   1. Validate with Zod (unchanged).
 *   2. In parallel: POST to the backend partner_leads endpoint AND
 *      send a Mailgun notification. We don't block on either —
 *      the lead lands as long as ONE channel succeeds.
 *   3. Log failures from either side so ops can reconcile.
 *
 * This guarantees no lead is lost to a backend outage (Mailgun
 * still fires) and no lead is lost to a Mailgun outage (DB still
 * has it). The user always sees a thank-you as long as we have
 * *somewhere* to deliver the lead — which is virtually always.
 *
 * The only case we return ok:false is a client-side schema failure
 * (invalid email, missing required field) — actionable feedback
 * the user can fix.
 */

type ChannelOutcome = "ok" | "skipped" | "failed";

async function trackBackend(
  audience: "vendor" | "rider" | "agent",
  call: Promise<{ ok: boolean } | { ok: false; skipped: true; reason: string } | { ok: false; status: number; message: string }>,
): Promise<ChannelOutcome> {
  try {
    const res = await call;
    if (res.ok) return "ok";
    if ("skipped" in res && res.skipped) {
      console.info(`[partner-signup:${audience}] backend skipped: ${res.reason}`);
      return "skipped";
    }
    console.warn(`[partner-signup:${audience}] backend non-2xx:`, res);
    return "failed";
  } catch (err) {
    console.warn(`[partner-signup:${audience}] backend threw:`, err);
    return "failed";
  }
}

async function trackMail(
  audience: "vendor" | "rider" | "agent",
  call: Promise<{ ok: true } | { ok: false; skipped: true; reason: string } | { ok: false; status: number; message: string }>,
): Promise<ChannelOutcome> {
  try {
    const res = await call;
    if (res.ok) return "ok";
    if ("skipped" in res && res.skipped) {
      console.info(`[partner-signup:${audience}] mailgun skipped: ${res.reason}`);
      return "skipped";
    }
    console.warn(`[partner-signup:${audience}] mailgun failed:`, res);
    return "failed";
  } catch (err) {
    console.warn(`[partner-signup:${audience}] mailgun threw:`, err);
    return "failed";
  }
}

/** Both channels are best-effort. We only flag a user-facing error if
 *  BOTH backend and Mailgun came back as hard failures (not skipped). */
function summariseOutcome(
  audience: string,
  backend: ChannelOutcome,
  mail: ChannelOutcome,
): ActionResult {
  if (backend === "failed" && mail === "failed") {
    console.error(`[partner-signup:${audience}] both channels failed, lead may be lost`);
    return {
      ok: false,
      message:
        "We couldn't record your application right now. Please try again in a moment.",
    };
  }
  return { ok: true };
}

export async function submitVendorApplication(
  values: VendorFormValues,
): Promise<ActionResult> {
  const parsed = vendorSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }

  // Fake success on spam so bots don't retry with a tweaked payload.
  const spam = spamReason(parsed.data);
  if (spam) {
    console.warn(`[partner-signup:vendor] ${spam} triggered, dropping silently`);
    return { ok: true };
  }

  const to = process.env.NOTIFY_EMAIL_PARTNERS ?? siteConfig.email;
  const email = vendorApplicationEmail(parsed.data);

  console.log("[partner-signup] vendor:", parsed.data);

  const [backend, mail] = await Promise.all([
    trackBackend("vendor", submitVendorLead(parsed.data)),
    trackMail(
      "vendor",
      sendMail({ to, replyTo: parsed.data.email, ...email }),
    ),
  ]);

  return summariseOutcome("vendor", backend, mail);
}

export async function submitRiderApplication(
  values: RiderFormValues,
): Promise<ActionResult> {
  const parsed = riderSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }

  const spam = spamReason(parsed.data);
  if (spam) {
    console.warn(`[partner-signup:rider] ${spam} triggered, dropping silently`);
    return { ok: true };
  }

  const to = process.env.NOTIFY_EMAIL_RIDERS ?? siteConfig.email;
  const email = riderApplicationEmail(parsed.data);

  console.log("[partner-signup] rider:", parsed.data);

  const [backend, mail] = await Promise.all([
    trackBackend("rider", submitRiderLead(parsed.data)),
    trackMail(
      "rider",
      sendMail({ to, replyTo: parsed.data.email, ...email }),
    ),
  ]);

  return summariseOutcome("rider", backend, mail);
}

export async function submitAgentApplication(
  values: AgentFormValues,
): Promise<ActionResult> {
  const parsed = agentSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }

  const spam = spamReason(parsed.data);
  if (spam) {
    console.warn(`[partner-signup:agent] ${spam} triggered, dropping silently`);
    return { ok: true };
  }

  const to = process.env.NOTIFY_EMAIL_AGENTS ?? siteConfig.email;
  const email = agentApplicationEmail(parsed.data);

  console.log("[partner-signup] agent:", parsed.data);

  const [backend, mail] = await Promise.all([
    trackBackend("agent", submitAgentLead(parsed.data)),
    trackMail(
      "agent",
      sendMail({ to, replyTo: parsed.data.email, ...email }),
    ),
  ]);

  return summariseOutcome("agent", backend, mail);
}
