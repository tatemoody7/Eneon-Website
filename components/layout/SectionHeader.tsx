import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EyebrowLabel } from "@/components/atoms";

type SectionHeaderProps = {
  eyebrow?: string;
  eyebrowNumber?: string | number;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Standardized section heading block.
 * EyebrowLabel → Display title → optional lead paragraph.
 */
export function SectionHeader({
  eyebrow,
  eyebrowNumber,
  title,
  description,
  align = "start",
  tone = "default",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleTone = tone === "ink" ? "text-white" : "text-[var(--color-navy-500)]";
  const bodyTone = tone === "ink" ? "text-white/70" : "text-[var(--color-paper-600)]";

  return (
    <header className={cn("flex flex-col gap-6 max-w-3xl", alignClass, className)}>
      {eyebrow && (
        <EyebrowLabel
          tone={tone === "ink" ? "ink" : "default"}
          number={eyebrowNumber}
        >
          {eyebrow}
        </EyebrowLabel>
      )}
      <h2 className={cn("text-4xl md:text-5xl lg:text-6xl font-medium", titleTone)}>
        {title}
      </h2>
      {description && (
        <p className={cn("text-lg md:text-xl leading-relaxed max-w-2xl", bodyTone)}>
          {description}
        </p>
      )}
    </header>
  );
}
