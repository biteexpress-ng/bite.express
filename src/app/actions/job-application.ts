"use server";

import {
  jobApplicationSchema,
  validateCvFile,
} from "@/lib/forms/job-application";

export type JobActionResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Phase 3a placeholder: validates server-side and logs.
 * Phase 3b wires this to send an email via Mailgun (CV as attachment)
 * and, when the backend endpoint exists, POSTs to the Laravel jobs API.
 */
export async function submitJobApplication(
  formData: FormData,
): Promise<JobActionResult> {
  const cvFile = formData.get("cv");
  const cvCheck = validateCvFile(cvFile instanceof File ? cvFile : null);
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

  console.log("[job-application]:", {
    ...parsed.data,
    cv: { name: cvCheck.file.name, size: cvCheck.file.size, type: cvCheck.file.type },
  });
  // TODO(phase-3b): email the team via Mailgun with the CV attached.

  return { ok: true };
}
