import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";
import {
  CTABlock,
  Breadcrumbs,
  FeatureGrid,
  CalloutBlock,
} from "@/components/blocks";

export const metadata: Metadata = {
  title: "Sizing Tool — Eneon ES",
  description:
    "An interactive BESS sizing tool for microgrids, utility, and commercial applications. Currently in development.",
};

const sizingFeatures = [
  {
    number: "01",
    title: "Application inputs",
    description:
      "Select your use case — microgrid, utility, commercial, or solar+storage — and the tool tunes the calculation.",
  },
  {
    number: "02",
    title: "Load profile",
    description:
      "Describe your load: peak demand, daily energy, and duty cycle. Upload a CSV or use typical profiles.",
  },
  {
    number: "03",
    title: "Real-time output",
    description:
      "Capacity, power, round-trip losses, and a recommended Eneon BESS configuration in seconds.",
  },
  {
    number: "04",
    title: "Handoff to engineer",
    description:
      "Export your scenario and send it to an Eneon engineer for a real quote — no re-typing.",
  },
];

export default function SizingToolPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Sizing Tool" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Sizing Tool</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Size your BESS in minutes.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              An interactive sizing tool for microgrid, utility, commercial,
              and solar+storage applications. Currently in development — until
              launch, request a scoping call and an engineer will size it with
              you directly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/quote" trailingIcon>
                Request a Scoping Call
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                Join the Beta
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <CalloutBlock
            tone="ink"
            eyebrow="Status"
            title="In development — coming soon."
            body="The Eneon Sizing Tool is being built now. In the meantime, our engineers will size your system with you in a 30-minute scoping call."
          />
        </Container>
      </Section>

      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="What it will do"
            eyebrowNumber={2}
            title="Four steps to a real number."
            align="start"
          />
          <div className="mt-16">
            <FeatureGrid features={sizingFeatures} columns={4} />
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="In the meantime"
            title="Let our engineers size it for you."
            description="Tell us about your project and we'll walk you through the numbers in a 30-minute call."
            primary={{ label: "Request a Quote", href: "/quote" }}
            secondary={{ label: "Contact Us", href: "/contact" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
