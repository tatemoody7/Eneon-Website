import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EyebrowLabel } from "@/components/atoms";

type CalloutBlockProps = {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  tone?: "default" | "accent" | "ink";
  align?: "start" | "center";
  className?: string;
};

/**
 * Pullquote-style callout block for emphasizing a single statement,
 * stat story, or short narrative. Bordered, no rounded corners.
 */
export function CalloutBlock({
  eyebrow,
  title,
  body,
  footer,
  tone = "default",
  align = "start",
  className,
}: CalloutBlockProps) {
  const toneClass = {
    default:
      "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)] border-[var(--line-strong)]",
    accent:
      "bg-[var(--color-accent-50)] text-[var(--color-navy-500)] border-[var(--color-accent-500)]",
    ink: "bg-[var(--color-navy-500)] text-white border-white/20",
  }[tone];

  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const bodyTone =
    tone === "ink" ? "text-white/70" : "text-[var(--color-paper-600)]";

  return (
    <aside
      className={cn(
        "border p-10 md:p-14 flex flex-col gap-6",
        toneClass,
        alignClass,
        className,
      )}
    >
      {eyebrow && (
        <EyebrowLabel tone={tone === "ink" ? "ink" : "default"}>{eyebrow}</EyebrowLabel>
      )}
      <p className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.1] font-[var(--font-display)]">
        {title}
      </p>
      {body && <div className={cn("text-lg leading-relaxed max-w-2xl", bodyTone)}>{body}</div>}
      {footer && <div className="pt-4 hairline-t w-full">{footer}</div>}
    </aside>
  );
}
