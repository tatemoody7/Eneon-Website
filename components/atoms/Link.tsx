import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type LinkProps = ComponentProps<typeof NextLink> & {
  external?: boolean;
  underline?: "always" | "hover" | "none";
};

/**
 * Unified Link atom. Internal links use next/link; external links get
 * target=_blank + rel automatically.
 */
export function Link({
  href,
  external,
  underline = "hover",
  className,
  children,
  ...rest
}: LinkProps) {
  const isExternal =
    external ??
    (typeof href === "string" && (href.startsWith("http") || href.startsWith("mailto:")));

  const underlineClass = {
    always: "underline underline-offset-4 decoration-[var(--line)] hover:decoration-[var(--color-navy-500)]",
    hover: "no-underline hover:underline underline-offset-4 decoration-[var(--color-navy-400)]",
    none: "no-underline",
  }[underline];

  const base = cn(
    "text-[var(--color-navy-500)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)]",
    "hover:text-[var(--color-accent-700)]",
    underlineClass,
    className,
  );

  if (isExternal) {
    return (
      <a
        href={typeof href === "string" ? href : String(href)}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={base} {...rest}>
      {children}
    </NextLink>
  );
}
