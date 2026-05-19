"use server";

import {
  jobApplicationSchema,
  validateCvFile,
} from "@/lib/forms/job-application";
import { sendMail } from "@/lib/mailgun";
import { jobApplicationEmail } from "@/lib/email-templates/job-application";
import { siteConfig } from "@/lib/site-config";

export type JobActionResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Validates the application + CV, then emails the careers inbox with
 * the CV attached. Phase 4+ will also POST to a Laravel jobs endpoint
 * for ATS-style tracking; action signature stays stable.
 */
export async function submitJobApplication(
  formData: FormData,
): Promise<JobActionResult> {
  const cvField = formData.get("cv");
  const cvCheck = validateCvFile(cvField instanceof File ? cvField : null);
  if (!cvCheck.ok) return { ok: false, message: cvCheck.message };

  const fields = {
    jobSlug: String(formData.get("jobSlug") ?? ""),
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    linkedInUrl: String(formData.get("linkedInUrl") ?? ""),
    portfolioUrl: String(formData.get("portfolioUrl") ?? ""),
    coverNote: String(formData.get("coverNote") ?? ""),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
  };

  const parsed = jobApplicationSchema.safeParse(fields);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Some fields look off. Please review the form and try again.",
    };
  }

  const cvBytes = new Uint8Array(await cvCheck.file.arrayBuffer());
  console.log("[job-application]:", {
    ...parsed.data,
    cv: { name: cvCheck.file.name, size: cvCheck.file.size, type: cvCheck.file.type },
  });

  const to = process.env.NOTIFY_EMAIL_CAREERS ?? siteConfig.email;
  const email = jobApplicationEmail(parsed.data, {
    name: cvCheck.file.name,
    size: cvCheck.file.size,
  });

  const res = await sendMail({
    to,
    replyTo: parsed.data.email,
    ...email,
    attachments: [
      {
        filename: cvCheck.file.name,
        content: cvBytes,
        contentType: cvCheck.file.type,
      },
    ],
  });
  if (!res.ok) {
    console.warn(
      `[job-application] mailgun ${"skipped" in res ? "skipped" : "failed"}:`,
      res,
    );
  }

  return { ok: true };
}
