"use server";

import { contactSchema, type ContactFormValues } from "@/lib/forms/contact";

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
  console.log("[contact]:", parsed.data);
  // TODO(phase-3): forward to hello@bite.express via Mailgun + ticket system.
  return { ok: true };
}
