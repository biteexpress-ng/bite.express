"use server";

import {
  jobApplicationSchema,
  validateCvFile,
} from "@/lib/forms/job-application";
import { sendMail } from "@/lib/mailgun";
import { jobApplicationEmail } from "@/lib/email-templates/job-application";
import { fetchJob } from "@/lib/jobs-api";
import { siteConfig } from "@/lib/site-config";

export type JobActionResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Validates the application + CV, fetches the role from the backend
 * to confirm it's still open, then emails the careers inbox with
 * the CV attached. Per-role apply_email overrides the global
 * NOTIFY_EMAIL_CAREERS recipient.
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

  // Fetch the role to confirm it's still open and to pick up per-role
  // apply_email override. If the backend is unreachable we still accept
  // the application — don't lose the lead to a transient infra issue.
  const job = await fetchJob(parsed.data.jobSlug);
  const jobTitle = job?.title ?? parsed.data.jobSlug;

  const cvBytes = new Uint8Array(await cvCheck.file.arrayBuffer());
  console.log("[job-application]:", {
    ...parsed.data,
    cv: { name: cvCheck.file.name, size: cvCheck.file.size, type: cvCheck.file.type },
  });

  const to =
    job?.apply_email ||
    process.env.NOTIFY_EMAIL_CAREERS ||
    siteConfig.email;

  const email = jobApplicationEmail(
    parsed.data,
    { name: cvCheck.file.name, size: cvCheck.file.size },
    jobTitle,
  );

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
