import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, rows = 5, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full px-4 py-3 resize-y",
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
  },
);
