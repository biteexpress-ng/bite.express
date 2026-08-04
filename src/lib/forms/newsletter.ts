import { z } from "zod";
import { stealthAntiSpamShape } from "@/lib/forms/anti-spam";

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("That doesn't look like a valid email")
    .max(254, "Email is too long"),
  // Honeypot + time-trap only: a visible spam question on a one-field
  // footer form would cost more signups than it saves.
  ...stealthAntiSpamShape,
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
