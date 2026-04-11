import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button, EyebrowLabel } from "@/components/atoms";

type CTABlockProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "default" | "ink" | "accent";
  blueprint?: boolean;
  className?: string;
};

/**
 * Full-width CTA block. Variants:
 * - default: paper tone with navy ink text
 * - ink: navy surface with white text + accent primary
 * - accent: cyan surface (use sparingly, reserved for top-tier CTAs)
 */
export function CTABlock({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  tone = "ink",
  blueprint = false,
  className,
}: CTABlockProps) {
  const toneClass = {
    default: "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)] border-[var(--line-strong)]",
    ink: "bg-[var(--color-navy-500)] text-white border-white/15",
    accent: "bg-[var(--color-accent-500)] text-[var(--color-navy-500)] border-[var(--color-navy-500)]",
  }[tone];

  const bodyTone =
    tone === "ink"
      ? "text-white/70"
      : tone === "accent"
        ? "text-[var(--color-navy-500)]/80"
        : "text-[var(--color-paper-600)]";

  const ink = tone === "ink";

  return (
    <div
      className={cn(
        "relative overflow-hidden border p-10 md:p-16 lg:p-24",
        toneClass,
        blueprint && (ink ? "bg-blueprint-ink" : "bg-blueprint"),
        className,
      )}
    >
      <div className="relative flex flex-col gap-8 max-w-4xl">
        {eyebrow && (
          <EyebrowLabel tone={ink ? "ink" : tone === "accent" ? "default" : "default"}>
            {eyebrow}
          </EyebrowLabel>
        )}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[1.02]">
          {title}
        </h2>
        {description && (
          <p className={cn("text-lg md:text-xl leading-relaxed max-w-2xl", bodyTone)}>
            {description}
          </p>
        )}
        {(primary || secondary) && (
          <div className="mt-2 flex flex-wrap gap-3">
            {primary && (
              <Button
                variant={tone === "ink" ? "ink" : "primary"}
                size="lg"
                href={primary.href}
                trailingIcon
              >
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button
                variant={tone === "ink" ? "secondary" : "secondary"}
                size="lg"
                href={secondary.href}
                className={
                  tone === "ink"
                    ? "text-white border-white/30 hover:bg-white hover:text-[var(--color-navy-500)]"
                    : undefined
                }
              >
                {secondary.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
