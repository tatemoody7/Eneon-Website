import NextLink from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms";

type CardProps = {
  children: ReactNode;
  href?: string;
  tone?: "paper" | "raised" | "sunken" | "ink";
  padding?: "sm" | "md" | "lg";
  hoverable?: boolean;
  arrow?: boolean;
  className?: string;
};

/**
 * Base card surface with hairline border, 0px radius, optional link wrap,
 * hover-state translate on the arrow, and navy-tinted shadow on hover.
 */
export function Card({
  children,
  href,
  tone = "raised",
  padding = "md",
  hoverable = true,
  arrow = false,
  className,
}: CardProps) {
  const toneClass = {
    paper: "bg-[var(--color-surface-base)] border-[var(--line)]",
    raised: "bg-[var(--color-surface-raised)] border-[var(--line)]",
    sunken: "bg-[var(--color-surface-sunken)] border-[var(--line)]",
    ink: "bg-[var(--color-navy-500)] text-white border-white/15",
  }[tone];

  const padClass = {
    sm: "p-5",
    md: "p-7",
    lg: "p-9",
  }[padding];

  const hoverClass = hoverable
    ? "transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-precision)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-[var(--color-navy-300)]"
    : "";

  const base = cn(
    "relative border group/card",
    toneClass,
    padClass,
    hoverClass,
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
    className,
  );

  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center border border-current/20 transition-transform duration-[var(--duration-base)] ease-[var(--ease-precision)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
        >
          <Icon icon={ArrowUpRight} size="sm" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <NextLink href={href} className={base}>
        {content}
      </NextLink>
    );
  }

  return <div className={base}>{content}</div>;
}
