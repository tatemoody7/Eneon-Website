import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { EyebrowLabel, Hairline } from "@/components/atoms";
import { Breadcrumbs } from "@/components/blocks";
import { QuoteForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Request a Quote — Eneon ES",
  description:
    "Tell us about your energy storage project. An Eneon engineer will respond within one business day.",
};

export default function QuotePage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
          />
        </Container>
      </Section>

      <Section tone="raised" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-28 self-start">
              <EyebrowLabel number={1}>Request a Quote</EyebrowLabel>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
                Tell us about your project.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
                Application, location, capacity, and timeline — we&apos;ll use
                what you share to route your request to the right engineer.
              </p>
              <Hairline />
              <div className="flex flex-col gap-4">
                <p className="label-mono text-[var(--color-paper-500)]">
                  How it works
                </p>
                <ol className="flex flex-col gap-3 label-mono text-[var(--color-navy-500)]">
                  <li className="flex gap-4">
                    <span className="text-[var(--color-accent-700)]">01</span>
                    <span className="text-base">Submit the form below</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[var(--color-accent-700)]">02</span>
                    <span className="text-base">Engineer reviews within 1 business day</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[var(--color-accent-700)]">03</span>
                    <span className="text-base">Scoping call scheduled</span>
                  </li>
                </ol>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="border border-[var(--line-strong)] bg-[var(--color-surface-raised)] p-8 md:p-12">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
