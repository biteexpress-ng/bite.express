import { z } from "zod";
import { jobs } from "@/lib/jobs";

const jobSlugs = jobs.map((j) => j.slug) as [string, ...string[]];

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const jobApplicationSchema = z.object({
  jobSlug: z.enum(jobSlugs),
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
});

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>;

/** File validation runs on the server because Zod doesn't handle File natively
 *  across server-action serialization boundaries. */
export function validateCvFile(file: File | null | undefined):
  | { ok: true; file: File }
  | { ok: false; message: string } {
  if (!file || file.size === 0) {
    return { ok: false, message: "Please attach your CV (PDF or Word document)." };
  }
  if (file.size > MAX_CV_BYTES) {
    return { ok: false, message: "CV is over 5 MB — please compress and try again." };
  }
  if (!ACCEPTED_CV_TYPES.includes(file.type)) {
    return { ok: false, message: "CV must be a PDF or Word (.doc / .docx) file." };
  }
  return { ok: true, file };
}
