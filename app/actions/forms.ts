"use server";

import { contactSchema, quoteSchema, flattenErrors } from "@/lib/validation";

/**
 * Form submission state shape.
 * Shared by useActionState on the client.
 */
export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

const INITIAL: FormState = { ok: false };

/**
 * Extract string values from a FormData instance so we can safely
 * round-trip the user's input when validation fails.
 */
function formDataToRecord(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

export async function submitContact(
  _prevState: FormState = INITIAL,
  formData: FormData,
): Promise<FormState> {
  const raw = formDataToRecord(formData);
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      errors: flattenErrors(parsed.error),
      values: raw,
      message: "Please fix the errors below and try again.",
    };
  }

  // TODO(forms): wire to Resend/email provider in Step 25
  // For now, log to server and return success.
  console.log("[contact] submission", parsed.data);

  return {
    ok: true,
    message:
      "Thanks — your message has been received. We'll reply within one business day.",
  };
}

export async function submitQuote(
  _prevState: FormState = INITIAL,
  formData: FormData,
): Promise<FormState> {
  const raw = formDataToRecord(formData);
  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      errors: flattenErrors(parsed.error),
      values: raw,
      message: "Please fix the errors below and try again.",
    };
  }

  // TODO(forms): wire to Resend/email provider in Step 25
  console.log("[quote] submission", parsed.data);

  return {
    ok: true,
    message:
      "Thanks — your quote request has been received. An engineer will be in touch within one business day.",
  };
}
