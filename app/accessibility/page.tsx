import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { EyebrowLabel } from "@/components/atoms";
import { Breadcrumbs } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Accessibility — Eneon ES",
  description:
    "Eneon ES is committed to WCAG 2.2 AA accessibility across our website and products.",
};

export default function AccessibilityPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <EyebrowLabel number={1}>Legal</EyebrowLabel>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Accessibility
            </h1>
            <p className="label-mono text-[var(--color-paper-500)]">
              Last updated: {"{TODO: date}"}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container width="narrow">
          <article className="flex flex-col gap-10 text-lg leading-relaxed text-[var(--color-navy-500)]">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Our commitment
              </h2>
              <p>
                Eneon ES is committed to meeting WCAG 2.2 Level AA across our
                public website. We build with semantic HTML, real form
                controls, visible focus states, and keyboard-first navigation.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Reporting a barrier
              </h2>
              <p>
                If you encounter an accessibility barrier on eneon-es.com, please
                let us know so we can fix it. Email{" "}
                <a
                  href="mailto:info@eneon-es.com"
                  className="underline hover:text-[var(--color-accent-700)]"
                >
                  info@eneon-es.com
                </a>
                {" "}with a description of the issue and the page URL.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Standards
              </h2>
              <p>
                This site targets WCAG 2.2 Level AA and is tested against
                current Chrome, Safari, Firefox, and Edge with keyboard and
                screen-reader navigation.
              </p>
            </section>
          </article>
        </Container>
      </Section>
    </PageShell>
  );
}
