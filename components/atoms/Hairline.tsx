import { cn } from "@/lib/cn";

type HairlineProps = {
  orientation?: "horizontal" | "vertical";
  strength?: "default" | "strong" | "ink";
  className?: string;
};

/**
 * A 1px divider line — the signature visual element of the Eneon system.
 * Use sparingly between sections, stats, and content groups.
 */
export function Hairline({
  orientation = "horizontal",
  strength = "default",
  className,
}: HairlineProps) {
  const colorVar =
    strength === "strong"
      ? "var(--line-strong)"
      : strength === "ink"
        ? "rgba(255,255,255,0.14)"
        : "var(--line)";

  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "block h-px w-full" : "inline-block w-px h-full",
        className,
      )}
      style={{ backgroundColor: colorVar }}
    />
  );
}
