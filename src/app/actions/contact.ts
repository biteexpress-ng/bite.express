"use server";

import {
  MIN_FILL_SECONDS,
  contactSchema,
  type ContactFormValues,
} from "@/lib/forms/contact";
import { sendMail } from "@/lib/mailgun";
import { contactMessageEmail } from "@/lib/email-templates/contact";
import { siteConfig } from "@/lib/site-config";

export type ContactActionResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitContactMessage(
  values: ContactFormValues,
): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Some fields look off. Please review and try again." };
  }

  // Honeypot — present, non-empty value means a bot filled the hidden input.
  // Pretend success so the bot doesn't retry with a tweaked payload.
  if (parsed.data.website && parsed.data.website.length > 0) {
    console.warn("[contact] honeypot triggered, dropping silently");
    return { ok: true };
  }

  // Time-trap — same idea, silently swallow lightning-fast submissions.
  const elapsedMs = Date.now() - parsed.data.startedAt;
  if (elapsedMs < MIN_FILL_SECONDS * 1000) {
    console.warn(`[contact] submitted in ${elapsedMs}ms, dropping silently`);
    return { ok: true };
  }

  const to = process.env.NOTIFY_EMAIL_CONTACT ?? siteConfig.email;
  const email = contactMessageEmail(parsed.data);

  console.log("[contact]:", {
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    topic: parsed.data.topic,
  });
  const res = await sendMail({
    to,
    replyTo: parsed.data.email,
    ...email,
  });
  if (!res.ok) {
    console.warn(
      `[contact] mailgun ${"skipped" in res ? "skipped" : "failed"}:`,
      res,
    );
  }

  return { ok: true };
}
