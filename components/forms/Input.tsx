import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

/**
 * Base text input. Squared edges, hairline border, focus ring via
 * focus-visible with accent outline.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, type = "text", ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        "w-full h-12 px-4",
        "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)]",
        "border border-[var(--line-strong)]",
        "text-base font-sans placeholder:text-[var(--color-paper-400)]",
        "transition-[border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-precision)]",
        "hover:border-[var(--color-navy-400)]",
        "focus:border-[var(--color-navy-500)] focus:bg-white",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        invalid && "border-[var(--color-signal-error)]",
        className,
      )}
      {...rest}
    />
  );
});
