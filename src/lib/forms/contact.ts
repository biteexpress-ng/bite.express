import { z } from "zod";

export const contactTopics = [
  { value: "general", label: "General enquiry" },
  { value: "support", label: "Help with an order" },
  { value: "partnerships", label: "Partnerships & press" },
  { value: "careers", label: "Careers & jobs" },
  { value: "other", label: "Something else" },
] as const;

const topicSlugs = contactTopics.map((t) => t.value) as [string, ...string[]];

/**
 * Minimum seconds between page render and form submission. Real humans
 * fill out a four-field contact form in well over this; headless bots
 * usually submit in under a second.
 */
export const MIN_FILL_SECONDS = 3;

export const contactSchema = z
  .object({
    fullName: z.string().min(2, "Tell us your name").max(120),
    email: z.string().email("That doesn't look like a valid email"),
    topic: z.enum(topicSlugs, { message: "Pick a topic" }),
    message: z
      .string()
      .min(10, "Add a bit more detail — at least 10 characters")
      .max(4000, "Keep it under 4000 characters"),
    // Honeypot: real users never see this field, bots fill every input.
    website: z.string().max(0, "Bot detected"),
    mathA: z.number().int().min(0).max(20),
    mathB: z.number().int().min(0).max(20),
    mathAnswer: z
      .number({ message: "Answer the question below" })
      .int({ message: "Answer the question below" }),
    startedAt: z.number().int().positive(),
  })
  .superRefine((v, ctx) => {
    if (v.mathAnswer !== v.mathA + v.mathB) {
      ctx.addIssue({
        code: "custom",
        path: ["mathAnswer"],
        message: "That doesn't add up — try again",
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactSchema>;
