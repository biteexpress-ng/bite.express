import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("That doesn't look like a valid email")
    .max(254, "Email is too long"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
