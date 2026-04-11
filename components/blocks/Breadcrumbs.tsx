import NextLink from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Breadcrumb trail for internal pages.
 * Outputs itemListElement microdata for SEO (BreadcrumbList schema).
 */
export function Breadcrumbs({ items, tone = "default", className }: BreadcrumbsProps) {
  const ink = tone === "ink";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 label-mono",
          ink ? "text-white/60" : "text-[var(--color-paper-500)]",
        )}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <NextLink
                  href={item.href}
                  className={cn(
                    "hover:text-[var(--color-accent-500)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
                    ink ? "text-white/80" : "text-[var(--color-navy-500)]",
                  )}
                >
                  {item.label}
                </NextLink>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    isLast && (ink ? "text-white" : "text-[var(--color-navy-500)]"),
                  )}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <Icon
                  icon={ChevronRight}
                  size="xs"
                  className={ink ? "text-white/30" : "text-[var(--color-paper-400)]"}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
