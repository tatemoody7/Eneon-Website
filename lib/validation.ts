import { z } from "zod";

/**
 * Shared zod schemas for form validation.
 * Used by both client and server to keep a single source of truth.
 */

const nonEmpty = (field: string) =>
  z.string().trim().min(1, `${field} is required`);

export const contactSchema = z.object({
  name: nonEmpty("Name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  subject: nonEmpty("Subject").max(200),
  message: nonEmpty("Message").min(10, "Message must be at least 10 characters").max(4000),
  consent: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .refine((v) => v === true || v === "on" || v === "true", {
      message: "Please confirm you agree to be contacted",
    }),
  // Honeypot — must be empty
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  // Contact
  name: nonEmpty("Name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  company: nonEmpty("Company").max(160),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),

  // Project
  application: z.enum([
    "microgrid",
    "utility",
    "commercial",
    "solar-storage",
    "other",
  ]),
  capacityMwh: z.string().trim().max(40).optional().or(z.literal("")),
  powerMw: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  timeline: z.enum(["0-3", "3-6", "6-12", "12+", "exploring"]),

  // Details
  notes: z.string().trim().max(4000).optional().or(z.literal("")),

  consent: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .refine((v) => v === true || v === "on" || v === "true", {
      message: "Please confirm you agree to be contacted",
    }),

  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

/**
 * Flatten a zod error into a field → message map usable by the UI.
 */
export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
