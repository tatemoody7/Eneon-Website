import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Top-level page wrapper sitting between RootLayout <body> and the page's
 * sections. Provides a flex column so the footer can sit flush and the main
 * content can stretch. Site navigation and footer are composed here in
 * Step 5; for now this is a thin wrapper so pages can start using it.
 */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("flex min-h-dvh flex-col", className)}>
      <main id="main" className="flex-1">
        {children}
      </main>
    </div>
  );
}
