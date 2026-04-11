import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  hint?: ReactNode;
  invalid?: boolean;
};

/**
 * Accessible checkbox with a styled visual layer on top of a native
 * <input type="checkbox" />. Keeps keyboard + SR semantics intact.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, hint, invalid, className, id, ...rest }, ref) {
    return (
      <label
        htmlFor={id}
        className={cn(
          "group/checkbox flex items-start gap-3 cursor-pointer",
          rest.disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            aria-invalid={invalid || undefined}
            className="peer absolute inset-0 h-full w-full appearance-none focus:outline-none"
            {...rest}
          />
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 border transition-[background-color,border-color] duration-[var(--duration-base)] ease-[var(--ease-precision)]",
              "border-[var(--line-strong)] bg-[var(--color-surface-raised)]",
              "group-hover/checkbox:border-[var(--color-navy-400)]",
              "peer-checked:bg-[var(--color-navy-500)] peer-checked:border-[var(--color-navy-500)]",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-accent-500)]",
              invalid && "border-[var(--color-signal-error)]",
            )}
          />
          <Icon
            icon={Check}
            size="xs"
            className="relative z-10 text-white opacity-0 peer-checked:opacity-100"
          />
        </span>

        <span className="flex flex-col gap-1">
          <span className="text-sm text-[var(--color-navy-500)] leading-tight">
            {label}
          </span>
          {hint && (
            <span className="text-xs text-[var(--color-paper-500)]">{hint}</span>
          )}
        </span>
      </label>
    );
  },
);
