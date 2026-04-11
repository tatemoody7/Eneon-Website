import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  as?: ElementType;
  tone?: "paper" | "raised" | "ink" | "sunken";
  padding?: "sm" | "md" | "lg" | "xl";
  hairlineTop?: boolean;
  hairlineBottom?: boolean;
  blueprint?: boolean;
  id?: string;
  className?: string;
};

/**
 * Section wrapper — vertical rhythm, tonal backgrounds, optional hairlines.
 * Tones map directly to surface tokens from design_system.md.
 */
export function Section({
  children,
  as: Tag = "section",
  tone = "paper",
  padding = "lg",
  hairlineTop = false,
  hairlineBottom = false,
  blueprint = false,
  id,
  className,
}: SectionProps) {
  const toneClass = {
    paper: "bg-[var(--color-surface-base)] text-[var(--color-navy-500)]",
    raised: "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)]",
    sunken: "bg-[var(--color-surface-sunken)] text-[var(--color-navy-500)]",
    ink: "bg-[var(--color-navy-500)] text-white",
  }[tone];

  const padClass = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-20 md:py-32",
    xl: "py-28 md:py-44",
  }[padding];

  const hairlineClass = tone === "ink" ? "hairline-ink" : "hairline";
  const topClass = hairlineTop ? `${hairlineClass}-t` : "";
  const bottomClass = hairlineBottom ? `${hairlineClass}-b` : "";

  const blueprintClass = blueprint
    ? tone === "ink"
      ? "bg-blueprint-ink"
      : "bg-blueprint"
    : "";

  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        toneClass,
        padClass,
        topClass,
        bottomClass,
        blueprintClass,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
