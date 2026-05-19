"use server";

import {
  agentSchema,
  riderSchema,
  vendorSchema,
  type AgentFormValues,
  type RiderFormValues,
  type VendorFormValues,
} from "@/lib/forms/schemas";
import { sendMail } from "@/lib/mailgun";
import {
  agentApplicationEmail,
  riderApplicationEmail,
  vendorApplicationEmail,
} from "@/lib/email-templates/partner-application";
import { siteConfig } from "@/lib/site-config";

export type ActionResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Partner sign-up actions: validate, email the team, log.
 *
 * Email delivery is best-effort via Mailgun — if Mailgun isn't
 * configured (env vars missing) or the API rejects the call, the
 * action still returns ok: true to the user but logs the failure
 * server-side. This avoids losing applicants to transient infra
 * issues; the console.log line gives ops a paper trail.
 *
 * Phase 4+: also POST to the Laravel backend for system-of-record
 * persistence. Action signatures won't change.
 */

async function notify(opts: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  audience: string;
}) {
  const res = await sendMail({
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
  if (!res.ok) {
    console.warn(
      `[partner-signup:${opts.audience}] mailgun ${"skipped" in res ? "skipped" : "failed"}:`,
      res,
    );
  }
}

export async function submitVendorApplication(
  values: VendorFormValues,
): Promise<ActionResult> {
  const parsed = vendorSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }

  const to = process.env.NOTIFY_EMAIL_PARTNERS ?? siteConfig.email;
  const email = vendorApplicationEmail(parsed.data);
  console.log("[partner-signup] vendor:", parsed.data);
  await notify({ to, replyTo: parsed.data.email, audience: "vendor", ...email });

  return { ok: true };
}

export async function submitRiderApplication(
  values: RiderFormValues,
): Promise<ActionResult> {
  const parsed = riderSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }

  const to = process.env.NOTIFY_EMAIL_RIDERS ?? siteConfig.email;
  const email = riderApplicationEmail(parsed.data);
  console.log("[partner-signup] rider:", parsed.data);
  await notify({ to, replyTo: parsed.data.email, audience: "rider", ...email });

  return { ok: true };
}

export async function submitAgentApplication(
  values: AgentFormValues,
): Promise<ActionResult> {
  const parsed = agentSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }

  const to = process.env.NOTIFY_EMAIL_AGENTS ?? siteConfig.email;
  const email = agentApplicationEmail(parsed.data);
  console.log("[partner-signup] agent:", parsed.data);
  await notify({ to, replyTo: parsed.data.email, audience: "agent", ...email });

  return { ok: true };
}
