import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  width?: "narrow" | "default" | "wide" | "full";
  className?: string;
};

/**
 * Centered content container with responsive horizontal padding.
 * Width variants map to design_system.md content widths:
 *   narrow  — 640px  (prose, forms)
 *   default — 1200px (most content)
 *   wide    — 1440px (hero, grids)
 *   full    — 100%   (edge-to-edge media)
 */
export function Container({
  children,
  as: Tag = "div",
  width = "default",
  className,
}: ContainerProps) {
  const widthClass = {
    narrow: "max-w-[640px]",
    default: "max-w-[1200px]",
    wide: "max-w-[1440px]",
    full: "max-w-none",
  }[width];

  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-14",
        widthClass,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
