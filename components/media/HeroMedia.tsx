import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeroMediaProps = {
  children: ReactNode;
  height?: "md" | "lg" | "xl" | "full";
  grain?: boolean;
  gradient?: "none" | "bottom" | "left" | "radial";
  className?: string;
};

/**
 * Hero media surface.
 * Accepts absolutely-positioned children (e.g. <Image fill />, <Video />)
 * and overlays a gradient grade + optional grain texture, ensuring legible
 * ink text on top regardless of photo content.
 *
 * Usage:
 *   <HeroMedia grain gradient="bottom">
 *     <Image alt="..." src="..." fill ratio="auto" />
 *     <div className="relative z-10">...hero copy...</div>
 *   </HeroMedia>
 */
export function HeroMedia({
  children,
  height = "lg",
  grain = true,
  gradient = "bottom",
  className,
}: HeroMediaProps) {
  const heightClass = {
    md: "min-h-[60vh]",
    lg: "min-h-[78vh]",
    xl: "min-h-[92vh]",
    full: "min-h-dvh",
  }[height];

  const gradientClass = {
    none: "",
    bottom:
      "before:absolute before:inset-0 before:z-[1] before:bg-gradient-to-t before:from-[var(--color-navy-900)]/85 before:via-[var(--color-navy-900)]/30 before:to-[var(--color-navy-900)]/10 before:pointer-events-none",
    left: "before:absolute before:inset-0 before:z-[1] before:bg-gradient-to-r before:from-[var(--color-navy-900)]/85 before:via-[var(--color-navy-900)]/40 before:to-transparent before:pointer-events-none",
    radial:
      "before:absolute before:inset-0 before:z-[1] before:[background-image:radial-gradient(ellipse_at_30%_60%,transparent,rgba(1,6,13,0.75))] before:pointer-events-none",
  }[gradient];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-navy-500)] text-white isolate",
        heightClass,
        gradientClass,
        grain && "grain",
        className,
      )}
    >
      {children}
    </div>
  );
}
