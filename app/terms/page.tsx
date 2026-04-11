import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { EyebrowLabel } from "@/components/atoms";
import { Breadcrumbs } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Terms of Use — Eneon ES",
  description: "Terms governing use of the Eneon ES website.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <EyebrowLabel number={1}>Legal</EyebrowLabel>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Terms of Use
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
                Acceptance of terms
              </h2>
              <p>{"{TODO: acceptance language}"}</p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Intellectual property
              </h2>
              <p>{"{TODO: IP terms}"}</p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Disclaimers
              </h2>
              <p>{"{TODO: disclaimer language}"}</p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Limitation of liability
              </h2>
              <p>{"{TODO: liability limits}"}</p>
            </section>
          </article>
        </Container>
      </Section>
    </PageShell>
  );
}
