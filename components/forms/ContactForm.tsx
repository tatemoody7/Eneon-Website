"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/app/actions/forms";
import { FormField } from "./FormField";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Checkbox } from "./Checkbox";
import { Fieldset } from "./Fieldset";
import { FormMessage } from "./FormMessage";
import { SubmitButton } from "./SubmitButton";

const INITIAL: FormState = { ok: false };

export function ContactForm() {
  const [state, action] = useActionState(submitContact, INITIAL);
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <FormMessage variant="success" title="Message received">
        {state.message}
      </FormMessage>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-8">
      {/* Honeypot — hidden from users, trapped as spam if filled */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Fieldset legend="Contact" legendNumber={1}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField id="name" label="Name" required error={state.errors?.name}>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              defaultValue={v.name}
              invalid={!!state.errors?.name}
            />
          </FormField>

          <FormField id="email" label="Email" required error={state.errors?.email}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={v.email}
              invalid={!!state.errors?.email}
            />
          </FormField>
        </div>

        <FormField id="company" label="Company" optional error={state.errors?.company}>
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={v.company}
          />
        </FormField>
      </Fieldset>

      <Fieldset legend="Message" legendNumber={2}>
        <FormField id="subject" label="Subject" required error={state.errors?.subject}>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            defaultValue={v.subject}
            invalid={!!state.errors?.subject}
          />
        </FormField>

        <FormField
          id="message"
          label="How can we help?"
          required
          hint="Tell us about your project, timeline, or question."
          error={state.errors?.message}
        >
          <Textarea
            id="message"
            name="message"
            rows={6}
            required
            minLength={10}
            defaultValue={v.message}
            invalid={!!state.errors?.message}
          />
        </FormField>
      </Fieldset>

      <Checkbox
        id="consent"
        name="consent"
        required
        label="I agree to be contacted by Eneon ES regarding this inquiry."
        hint="We'll never share your info. See our privacy policy."
        invalid={!!state.errors?.consent}
      />

      {state.errors?._form && (
        <FormMessage variant="error" title="Submission failed">
          {state.errors._form}
        </FormMessage>
      )}

      {!state.ok && state.message && Object.keys(state.errors ?? {}).length > 0 && (
        <FormMessage variant="error" title="Please review">
          {state.message}
        </FormMessage>
      )}

      <div className="flex items-center gap-4 pt-2">
        <SubmitButton>Send Message</SubmitButton>
        <p className="label-mono text-[var(--color-paper-500)]">
          Reply within 1 business day
        </p>
      </div>
    </form>
  );
}
