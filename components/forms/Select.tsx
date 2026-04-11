import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

/**
 * Native select. Keeps browser accessibility + mobile UX while visually
 * matching the other form elements. Custom caret via overlay.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full h-12 pl-4 pr-12 appearance-none",
          "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)]",
          "border border-[var(--line-strong)]",
          "text-base font-sans",
          "transition-[border-color,background-color] duration-[var(--duration-base)] ease-[var(--ease-precision)]",
          "hover:border-[var(--color-navy-400)]",
          "focus:border-[var(--color-navy-500)] focus:bg-white",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          invalid && "border-[var(--color-signal-error)]",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <Icon
        icon={ChevronDown}
        size="sm"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-navy-500)]"
      />
    </div>
  );
});
