"use client";

import { useActionState } from "react";
import { submitQuote, type FormState } from "@/app/actions/forms";
import { FormField } from "./FormField";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { Fieldset } from "./Fieldset";
import { FormMessage } from "./FormMessage";
import { SubmitButton } from "./SubmitButton";

const INITIAL: FormState = { ok: false };

export function QuoteForm() {
  const [state, action] = useActionState(submitQuote, INITIAL);
  const v = state.values ?? {};

  if (state.ok) {
    return (
      <FormMessage variant="success" title="Quote request received">
        {state.message}
      </FormMessage>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-10">
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

      <Fieldset
        legend="Contact"
        legendNumber={1}
        description="Who should we reach out to?"
      >
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

          <FormField id="company" label="Company" required error={state.errors?.company}>
            <Input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              required
              defaultValue={v.company}
              invalid={!!state.errors?.company}
            />
          </FormField>

          <FormField id="role" label="Role" optional error={state.errors?.role}>
            <Input
              id="role"
              name="role"
              type="text"
              autoComplete="organization-title"
              defaultValue={v.role}
            />
          </FormField>

          <FormField id="phone" label="Phone" optional error={state.errors?.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={v.phone}
            />
          </FormField>
        </div>
      </Fieldset>

      <Fieldset
        legend="Project"
        legendNumber={2}
        description="Tell us about the energy storage project you're sizing."
      >
        <FormField
          id="application"
          label="Application"
          required
          error={state.errors?.application}
        >
          <Select
            id="application"
            name="application"
            required
            defaultValue={v.application ?? ""}
            invalid={!!state.errors?.application}
          >
            <option value="" disabled>
              Select an application
            </option>
            <option value="microgrid">Microgrid</option>
            <option value="utility">Utility / Grid-Scale</option>
            <option value="commercial">Commercial & Industrial</option>
            <option value="solar-storage">Solar + Storage</option>
            <option value="other">Other</option>
          </Select>
        </FormField>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            id="capacityMwh"
            label="Target Capacity (MWh)"
            optional
            error={state.errors?.capacityMwh}
            hint="Energy the system should store, in megawatt-hours"
          >
            <Input
              id="capacityMwh"
              name="capacityMwh"
              type="text"
              inputMode="decimal"
              defaultValue={v.capacityMwh}
            />
          </FormField>

          <FormField
            id="powerMw"
            label="Target Power (MW)"
            optional
            error={state.errors?.powerMw}
            hint="Peak discharge rate, in megawatts"
          >
            <Input
              id="powerMw"
              name="powerMw"
              type="text"
              inputMode="decimal"
              defaultValue={v.powerMw}
            />
          </FormField>
        </div>

        <FormField id="location" label="Project Location" optional error={state.errors?.location}>
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="City, region, or coordinates"
            defaultValue={v.location}
          />
        </FormField>

        <FormField id="timeline" label="Timeline" required error={state.errors?.timeline}>
          <Select
            id="timeline"
            name="timeline"
            required
            defaultValue={v.timeline ?? ""}
            invalid={!!state.errors?.timeline}
          >
            <option value="" disabled>
              Select a timeline
            </option>
            <option value="0-3">0–3 months</option>
            <option value="3-6">3–6 months</option>
            <option value="6-12">6–12 months</option>
            <option value="12+">12+ months</option>
            <option value="exploring">Just exploring</option>
          </Select>
        </FormField>
      </Fieldset>

      <Fieldset
        legend="Details"
        legendNumber={3}
        description="Anything else we should know?"
      >
        <FormField id="notes" label="Notes" optional error={state.errors?.notes}>
          <Textarea
            id="notes"
            name="notes"
            rows={6}
            defaultValue={v.notes}
          />
        </FormField>
      </Fieldset>

      <Checkbox
        id="consent"
        name="consent"
        required
        label="I agree to be contacted by Eneon ES regarding this quote request."
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
        <SubmitButton>Request Quote</SubmitButton>
        <p className="label-mono text-[var(--color-paper-500)]">
          Engineer reply within 1 business day
        </p>
      </div>
    </form>
  );
}
