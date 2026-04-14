import NextLink from "next/link";
import NextImage from "next/image";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  tone?: "default" | "ink";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  className?: string;
};

/**
 * Eneon ES brand lockup. Renders the real logo SVG alongside the ES label.
 */
export function Wordmark({
  tone = "default",
  size = "md",
  asLink = true,
  className,
}: WordmarkProps) {
  const toneInk = tone === "ink";
  const colorDim = toneInk ? "text-white/70" : "text-[var(--color-navy-400)]";
  const divider = toneInk ? "bg-white/30" : "bg-[var(--line-strong)]";

  const logoHeight = {
    sm: 20,
    md: 26,
    lg: 36,
  }[size];

  const logoWidth = Math.round(logoHeight * (658.24 / 487));

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        className,
      )}
      aria-label="Eneon ES"
    >
      <NextImage
        src="/brand/eneon-icon.svg"
        alt=""
        width={logoWidth}
        height={logoHeight}
        priority
        className={cn(toneInk && "brightness-0 invert")}
      />
      <span className={cn("h-4 w-px", divider)} aria-hidden />
      <span className={cn("label-mono", colorDim)}>Eneon ES</span>
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
