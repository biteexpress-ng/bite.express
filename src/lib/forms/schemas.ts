import { z } from "zod";
import { cities } from "@/lib/cities";

const citySlugs = cities.map((c) => c.slug) as [string, ...string[]];

/** Reusable building blocks. */
const phone = z
  .string()
  .min(7, "Phone number looks too short")
  .max(20, "Phone number looks too long")
  .regex(/^[0-9+\-()\s]+$/, "Only digits, spaces and + - ( ) allowed");

const fullName = z
  .string()
  .min(2, "Tell us your name")
  .max(120, "That's a very long name");

const email = z.string().email("That doesn't look like a valid email");

const city = z.enum(citySlugs, { message: "Pick a city we serve" });

const message = z
  .string()
  .max(2000, "Keep it under 2000 characters")
  .optional()
  .or(z.literal(""));

/* ------------------------------------------------------------------ Vendor */

export const vendorTypes = [
  { value: "restaurant", label: "Restaurant" },
  { value: "fast-food", label: "Fast food / quick service" },
  { value: "supermarket", label: "Supermarket / grocery" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "bakery", label: "Bakery / cafe" },
  { value: "other", label: "Other" },
] as const;

const vendorTypeSlugs = vendorTypes.map((t) => t.value) as [string, ...string[]];

export const vendorSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name is required")
    .max(160, "That's a very long name"),
  contactName: fullName,
  email,
  phone,
  city,
  vendorType: z.enum(vendorTypeSlugs, { message: "Pick a vendor type" }),
  numberOfLocations: z
    .string()
    .regex(/^[0-9]{1,3}$/, "Enter a whole number (max 999)"),
  message,
  consent: z.literal(true, { message: "We need your consent to follow up" }),
});

export type VendorFormValues = z.infer<typeof vendorSchema>;

/* -------------------------------------------------------------------- Rider */

export const vehicleTypes = [
  { value: "bicycle", label: "Bicycle" },
  { value: "motorbike", label: "Motorbike / scooter" },
  { value: "car", label: "Car" },
] as const;

const vehicleSlugs = vehicleTypes.map((v) => v.value) as [string, ...string[]];

export const availabilityOptions = [
  { value: "evenings", label: "Evenings & weekends (< 20 hrs/wk)" },
  { value: "part-time", label: "Part-time (20–35 hrs/wk)" },
  { value: "full-time", label: "Full-time (35+ hrs/wk)" },
] as const;

const availabilitySlugs = availabilityOptions.map((a) => a.value) as [
  string,
  ...string[],
];

export const riderSchema = z.object({
  fullName,
  email,
  phone,
  city,
  vehicleType: z.enum(vehicleSlugs, { message: "Pick what you ride" }),
  availability: z.enum(availabilitySlugs, {
    message: "Tell us your availability",
  }),
  hasSmartphone: z.literal(true, {
    message: "You'll need a smartphone for the rider app",
  }),
  consent: z.literal(true, { message: "We need your consent to follow up" }),
});

export type RiderFormValues = z.infer<typeof riderSchema>;

/* -------------------------------------------------------------------- Agent */

export const agentSchema = z.object({
  fullName,
  email,
  phone,
  city,
  network: z
    .string()
    .min(20, "Give us a bit more context — at least 20 characters")
    .max(2000, "Keep it under 2000 characters"),
  consent: z.literal(true, { message: "We need your consent to follow up" }),
});

export type AgentFormValues = z.infer<typeof agentSchema>;
