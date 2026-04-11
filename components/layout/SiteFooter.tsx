import NextLink from "next/link";
import { MapPin, Mail } from "lucide-react";
import { Wordmark, Icon, CertBadge } from "@/components/atoms";
import { footerNav, legalNav, socialNav } from "@/lib/nav";
import { Container } from "./Container";

/**
 * Site-wide footer.
 * Structure: CTA block → columns (4) → legal strip
 * Tone: ink (navy 500) with blueprint grid + hairline grid.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--color-navy-500)] text-white bg-blueprint-ink hairline-ink-t">
      {/* Top CTA */}
      <Container width="wide" className="py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end">
          <div>
            <span className="label-mono text-white/60">Ready to build</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-medium tracking-[-0.03em] text-white">
              Let&rsquo;s engineer your storage project.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <NextLink
              href="/quote"
              className="inline-flex h-12 items-center justify-center border border-[var(--color-accent-500)] bg-[var(--color-accent-500)] text-[var(--color-navy-500)] label-mono hover:bg-[var(--color-accent-400)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
            >
              Request a Quote
            </NextLink>
            <NextLink
              href="/sizing-tool"
              className="inline-flex h-12 items-center justify-center border border-white/30 text-white label-mono hover:bg-white hover:text-[var(--color-navy-500)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
            >
              Size my System
            </NextLink>
          </div>
        </div>
      </Container>

      <div className="hairline-ink-t" />

      {/* Column grid */}
      <Container width="wide" className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          {/* Identity */}
          <div className="flex flex-col gap-6">
            <Wordmark tone="ink" size="lg" />
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">
              Battery energy storage systems engineered for microgrids,
              utilities, and commercial projects.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <Icon icon={MapPin} size="sm" className="mt-0.5 opacity-60" />
                <span>Calgary, Alberta, Canada</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon icon={Mail} size="sm" className="mt-0.5 opacity-60" />
                <a
                  href="mailto:info@eneon-es.com"
                  className="hover:text-[var(--color-accent-500)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                >
                  info@eneon-es.com
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerNav.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="label-mono text-white/60">{col.heading}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <NextLink
                      href={link.href}
                      className="text-sm text-white/85 hover:text-[var(--color-accent-500)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                    >
                      {link.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cert strip */}
        <div className="mt-16 flex flex-wrap items-center gap-3">
          <span className="label-mono text-white/50 mr-2">Certified</span>
          <CertBadge code="UL 9540" label="System" tone="ink" />
          <CertBadge code="UL 9540A" label="Fire Test" tone="ink" />
          <CertBadge code="IEC 62619" tone="ink" />
          <CertBadge code="NFPA 855" tone="ink" />
        </div>
      </Container>

      {/* Legal strip */}
      <div className="hairline-ink-t">
        <Container width="wide" className="py-6">
          <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
            <p className="label-mono text-white/50">
              © {year} Eneon ES Inc. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <NextLink
                    href={link.href}
                    className="label-mono text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
              {socialNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-mono text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
