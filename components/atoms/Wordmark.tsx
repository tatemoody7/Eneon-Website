import NextLink from "next/link";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  tone?: "default" | "ink";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  className?: string;
};

/**
 * Temporary text wordmark. Replace with the real SVG from brand_assets/logos/
 * once it lands. Structure: [ENEON] / [ES] with a thin divider.
 */
export function Wordmark({
  tone = "default",
  size = "md",
  asLink = true,
  className,
}: WordmarkProps) {
  const toneInk = tone === "ink";
  const colorMain = toneInk ? "text-white" : "text-[var(--color-navy-500)]";
  const colorDim = toneInk ? "text-white/60" : "text-[var(--color-navy-400)]";
  const divider = toneInk ? "bg-white/30" : "bg-[var(--line-strong)]";

  const sizeMain = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-medium tracking-[-0.02em]",
        "font-[var(--font-display)]",
        sizeMain,
        colorMain,
        className,
      )}
      aria-label="Eneon ES"
    >
      <span>Eneon</span>
      <span className={cn("h-4 w-px", divider)} aria-hidden />
      <span className={cn("label-mono", colorDim)}>ES</span>
    </span>
  );

  if (!asLink) return content;

  return (
    <NextLink
      href="/"
      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-500)]"
      aria-label="Eneon ES — home"
    >
      {content}
    </NextLink>
  );
}
