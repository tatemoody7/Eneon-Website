import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Accessible form field wrapper.
 * Handles: label-id binding, aria-describedby for hint/error, required marker.
 */
export function FormField({
  id,
  label,
  hint,
  error,
  required,
  optional,
  children,
  className,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="label-mono text-[var(--color-navy-500)]">
          {label}
          {required && (
            <span aria-hidden className="ml-1 text-[var(--color-signal-error)]">
              *
            </span>
          )}
        </label>
        {optional && !required && (
          <span className="label-mono text-[var(--color-paper-500)]">Optional</span>
        )}
      </div>

      {/* Inject id + aria into child input */}
      <div data-field-id={id} data-described-by={describedBy}>
        {children}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-[var(--color-paper-500)]">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-[var(--color-signal-error)] label-mono"
        >
          {error}
        </p>
      )}
    </div>
  );
}
