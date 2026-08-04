"use server";

import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/forms/contact";
import { spamReason } from "@/lib/forms/anti-spam";
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

  // Pretend success on spam so the bot doesn't retry with a tweaked payload.
  const spam = spamReason(parsed.data);
  if (spam) {
    console.warn(`[contact] ${spam} triggered, dropping silently`);
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
