import { cn } from "@/lib/cn";

type EyebrowLabelProps = {
  children: React.ReactNode;
  as?: "span" | "p" | "div";
  tone?: "default" | "muted" | "accent" | "ink";
  number?: string | number;
  className?: string;
};

/**
 * Monospace uppercase label used above headings and section titles.
 * Format: [01 · LABEL TEXT] or just [LABEL TEXT].
 */
export function EyebrowLabel({
  children,
  as: Tag = "span",
  tone = "default",
  number,
  className,
}: EyebrowLabelProps) {
  const toneClass = {
    default: "text-[var(--color-navy-400)]",
    muted: "text-[var(--color-paper-500)]",
    accent: "text-[var(--color-accent-600)]",
    ink: "text-white/70",
  }[tone];

  return (
    <Tag className={cn("label-mono inline-flex items-center gap-2", toneClass, className)}>
      {number != null && (
        <>
          <span aria-hidden className="tabular-nums">
            {typeof number === "number" ? number.toString().padStart(2, "0") : number}
          </span>
          <span aria-hidden className="opacity-50">
            /
          </span>
        </>
      )}
      <span>{children}</span>
    </Tag>
  );
}
