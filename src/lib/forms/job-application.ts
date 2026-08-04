import { z } from "zod";
import { antiSpamShape, refineMathAnswer } from "@/lib/forms/anti-spam";

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * Job slugs are dynamic (driven by the backend CMS), so we validate
 * the slug as a free-form string. The server action looks the role
 * up via the API and refuses applications for slugs that don't
 * resolve to an active, published role.
 */
export const jobApplicationSchema = z.object({
  jobSlug: z.string().min(1, "Job slug missing"),
  fullName: z.string().min(2, "Tell us your name").max(120),
  email: z.string().email("That doesn't look like a valid email"),
  phone: z
    .string()
    .min(7, "Phone looks too short")
    .max(20, "Phone looks too long")
    .regex(/^[0-9+\-()\s]+$/, "Only digits, spaces and + - ( ) allowed"),
  linkedInUrl: z
    .string()
    .url("Must be a full URL (https://…)")
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .url("Must be a full URL (https://…)")
    .optional()
    .or(z.literal("")),
  coverNote: z
    .string()
    .max(4000, "Keep it under 4000 characters")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, { message: "We need your consent to follow up" }),
  ...antiSpamShape,
}).superRefine(refineMathAnswer);

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>;

export function validateCvFile(file: File | null | undefined):
  | { ok: true; file: File }
  | { ok: false; message: string } {
  if (!file || file.size === 0) {
    return { ok: false, message: "Please attach your CV (PDF or Word document)." };
  }
  if (file.size > MAX_CV_BYTES) {
    return { ok: false, message: "CV is over 5 MB, please compress and try again." };
  }
  if (!ACCEPTED_CV_TYPES.includes(file.type)) {
    return { ok: false, message: "CV must be a PDF or Word (.doc / .docx) file." };
  }
  return { ok: true, file };
}
