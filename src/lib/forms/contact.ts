import { z } from "zod";
import { antiSpamShape, refineMathAnswer } from "@/lib/forms/anti-spam";

export const contactTopics = [
  { value: "general", label: "General enquiry" },
  { value: "support", label: "Help with an order" },
  { value: "partnerships", label: "Partnerships & press" },
  { value: "careers", label: "Careers & jobs" },
  { value: "other", label: "Something else" },
] as const;

const topicSlugs = contactTopics.map((t) => t.value) as [string, ...string[]];

export const contactSchema = z
  .object({
    fullName: z.string().min(2, "Tell us your name").max(120),
    email: z.string().email("That doesn't look like a valid email"),
    topic: z.enum(topicSlugs, { message: "Pick a topic" }),
    message: z
      .string()
      .min(10, "Add a bit more detail, at least 10 characters")
      .max(4000, "Keep it under 4000 characters"),
    ...antiSpamShape,
  })
  .superRefine(refineMathAnswer);

export type ContactFormValues = z.infer<typeof contactSchema>;
