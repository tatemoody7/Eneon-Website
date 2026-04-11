import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
};

/**
 * Top-level page wrapper. Composes SiteHeader + <main> + SiteFooter so
 * every page gets consistent navigation and footer with a single component.
 */
export function PageShell({
  children,
  className,
  hideHeader = false,
  hideFooter = false,
}: PageShellProps) {
  return (
    <div className={cn("flex min-h-dvh flex-col", className)}>
      {!hideHeader && <SiteHeader />}
      <main id="main" className="flex-1">
        {children}
      </main>
      {!hideFooter && <SiteFooter />}
    </div>
  );
}
