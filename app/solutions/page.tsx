import type { Metadata } from "next";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel, Icon } from "@/components/atoms";
import { CTABlock, Breadcrumbs } from "@/components/blocks";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions — Eneon ES",
  description:
    "Battery energy storage solutions for microgrids, utilities, commercial & industrial, and solar+storage projects.",
};

export default function SolutionsIndexPage() {
  return (
    <PageShell>
      {/* ─── Breadcrumbs ─────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
          />
        </Container>
      </Section>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Solutions</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Storage for every grid configuration.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              From off-grid subarctic microgrids to utility-scale frequency
              regulation — the same modular Eneon BESS platform, configured to
              the application.
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── Vertical list ───────────────────────────────────────────── */}
      <Section tone="paper" padding="lg">
        <Container>
          <ul className="flex flex-col">
            {solutions.map((s, i) => {
              const SolutionIcon = s.icon;
              return (
                <li key={s.slug}>
                  <NextLink
                    href={`/solutions/${s.slug}`}
                    className="group/row block hairline-t last:hairline-b py-12 md:py-16 transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)] hover:bg-[var(--color-surface-raised)]"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-1 flex items-start justify-between">
                        <EyebrowLabel number={i + 1}>Vertical</EyebrowLabel>
                      </div>
                      <div className="lg:col-span-2">
                        <Icon icon={SolutionIcon} size="lg" />
                      </div>
                      <div className="lg:col-span-6 flex flex-col gap-4">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)] group-hover/row:text-[var(--color-accent-700)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)]">
                          {s.label}
                        </h2>
                        <p className="text-lg leading-relaxed text-[var(--color-paper-600)]">
                          {s.tagline}
                        </p>
                        <span className="label-mono text-[var(--color-paper-500)]">
                          {s.audience}
                        </span>
                      </div>
                      <div className="lg:col-span-3 flex lg:justify-end lg:items-start">
                        <span className="inline-flex items-center gap-2 label-mono text-[var(--color-navy-500)]">
                          Learn more
                          <Icon icon={ArrowUpRight} size="sm" />
                        </span>
                      </div>
                    </div>
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* ─── Final CTA ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineTop>
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Need help scoping?"
            title="Not sure which solution fits?"
            description="Tell us your application and we'll route you to the right engineer — usually within one business day."
            primary={{ label: "Request a Quote", href: "/quote" }}
            secondary={{ label: "Size my System", href: "/sizing-tool" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
