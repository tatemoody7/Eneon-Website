import NextLink from "next/link";
import { Button, Wordmark } from "@/components/atoms";
import { primaryNav } from "@/lib/nav";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

/**
 * Top-of-page site header.
 * - Sticky, translucent background with hairline bottom
 * - Desktop: wordmark + inline primary nav + Request a Quote CTA
 * - Mobile: wordmark + hamburger trigger (MobileMenu owns the drawer)
 * - Skip-to-main link for keyboard users (hidden until focused)
 */
export function SiteHeader() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:h-11 focus:px-4 focus:inline-flex focus:items-center focus:bg-[var(--color-navy-500)] focus:text-white focus:label-mono focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-30 bg-[var(--color-surface-base)]/90 backdrop-blur-md hairline-b">
        <Container width="wide">
          <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
            <Wordmark size="md" />

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((group) => (
                  <li key={group.label} className="relative group">
                    <NextLink
                      href={group.href ?? "#"}
                      className="inline-flex h-10 items-center px-3 label-mono text-[var(--color-navy-500)] hover:text-[var(--color-accent-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                    >
                      {group.label}
                    </NextLink>

                    {group.children && (
                      <div
                        className="invisible absolute left-0 top-full min-w-[280px] translate-y-1 opacity-0 transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-precision)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      >
                        <div className="mt-2 bg-[var(--color-surface-raised)] hairline shadow-[var(--shadow-lg)]">
                          <ul className="flex flex-col py-2">
                            {group.children.map((child) => (
                              <li key={child.href}>
                                <NextLink
                                  href={child.href}
                                  className="flex flex-col gap-0.5 px-4 py-3 hover:bg-[var(--color-surface-sunken)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                                >
                                  <span className="text-sm font-medium text-[var(--color-navy-500)]">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="text-xs text-[var(--color-paper-600)]">
                                      {child.description}
                                    </span>
                                  )}
                                </NextLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="secondary" size="sm" href="/contact">
                Contact
              </Button>
              <Button variant="primary" size="sm" href="/quote" trailingIcon>
                Request a Quote
              </Button>
            </div>

            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </Container>
      </header>
    </>
  );
}
