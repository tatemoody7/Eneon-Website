import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EyebrowLabel } from "@/components/atoms";

type FieldsetProps = {
  legend: string;
  legendNumber?: string | number;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Semantic <fieldset> grouping for multi-part forms.
 * Legend styled as mono eyebrow label, optional step number, description,
 * and a hairline separator.
 */
export function Fieldset({
  legend,
  legendNumber,
  description,
  children,
  className,
}: FieldsetProps) {
  return (
    <fieldset className={cn("flex flex-col gap-6 border-0 p-0", className)}>
      <legend className="contents">
        <div className="flex flex-col gap-3 pb-4 hairline-b">
          <EyebrowLabel number={legendNumber}>{legend}</EyebrowLabel>
          {description && (
            <p className="text-base text-[var(--color-paper-600)]">
              {description}
            </p>
          )}
        </div>
      </legend>
      <div className="flex flex-col gap-6">{children}</div>
    </fieldset>
  );
}
