"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { primaryNav, legalNav } from "@/lib/nav";
import { Icon } from "@/components/atoms";
import { cn } from "@/lib/cn";

/**
 * Mobile navigation drawer.
 * - Trigger is ≥44×44px (WCAG 2.2 AA)
 * - Locks body scroll while open
 * - Closes on route change, Escape, or overlay click
 * - Returns focus to trigger on close
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastPathnameRef = useRef(pathname);

  // Close on route change (skip first render + only update when actually changed).
  // setState in effect is required here because pathname changes come from the
  // router, not a user interaction inside this component.
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [pathname]);

  // Scroll lock + Escape key
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    // Focus first link in panel
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center justify-center",
          "h-12 w-12 md:hidden",
          "border border-[var(--line)]",
          "text-[var(--color-navy-500)]",
          "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)]",
          "hover:bg-[var(--color-navy-500)] hover:text-white",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
        )}
      >
        <Icon icon={open ? X : Menu} size="md" />
      </button>

      {/* Overlay */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-[var(--color-navy-900)]/60 backdrop-blur-sm md:hidden",
          "transition-opacity duration-[var(--duration-base)] ease-[var(--ease-precision)]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />

      {/* Panel */}
      <div
        id="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm md:hidden",
          "bg-[var(--color-surface-raised)]",
          "border-l border-[var(--line)]",
          "flex flex-col",
          "transition-transform duration-[var(--duration-base)] ease-[var(--ease-precision)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 hairline-b">
          <span className="label-mono text-[var(--color-navy-400)]">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] hover:bg-[var(--color-navy-500)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
          >
            <Icon icon={X} size="md" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Primary">
          <ul className="flex flex-col">
            {primaryNav.map((group) => (
              <li key={group.label} className="hairline-b">
                <NextLink
                  href={group.href ?? "#"}
                  className="flex items-center justify-between py-4 text-2xl font-medium font-[var(--font-display)] text-[var(--color-navy-500)] hover:text-[var(--color-accent-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                >
                  {group.label}
                  <Icon icon={ArrowUpRight} size="sm" className="opacity-40" />
                </NextLink>
                {group.children && (
                  <ul className="pb-4 pl-1 flex flex-col gap-2">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <NextLink
                          href={child.href}
                          className="label-mono text-[var(--color-paper-600)] hover:text-[var(--color-navy-500)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                        >
                          {child.label}
                        </NextLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <NextLink
              href="/quote"
              className="flex h-12 items-center justify-center border border-[var(--color-navy-500)] bg-[var(--color-navy-500)] text-white label-mono hover:bg-[var(--color-navy-600)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
            >
              Request a Quote
            </NextLink>
            <NextLink
              href="/contact"
              className="flex h-12 items-center justify-center border border-[var(--color-navy-500)] text-[var(--color-navy-500)] label-mono hover:bg-[var(--color-navy-500)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
            >
              Contact
            </NextLink>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <NextLink
                  href={link.href}
                  className="label-mono text-[var(--color-paper-500)] hover:text-[var(--color-navy-500)]"
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
