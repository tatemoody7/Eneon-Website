import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { EyebrowLabel } from "@/components/atoms";
import { Breadcrumbs, CTABlock } from "@/components/blocks";
import { SizingWizard } from "@/components/blocks/SizingWizard";
import { FadeIn, HeroReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Sizing Tool — Eneon ES",
  description:
    "Preliminary BESS sizing in three steps. Load profile, site context, engineering-grade capacity and ROI output.",
};

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
          <HeroReveal className="flex flex-col gap-8 max-w-4xl">
            <EyebrowLabel number={1}>Tool / Preliminary Sizing</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Three inputs. <br />
              <span className="text-[var(--color-paper-600)]">
                One sized system.
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              The Eneon FlexBlock platform is continuous — 1 to 13 blocks, 2.0
              MWh per block. Tell the tool what your site needs; it returns a
              configuration, a CAPEX, and a 20-year ROI projection.
            </p>
          </HeroReveal>
        </Container>
      </Section>

      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <SizingWizard />
          </FadeIn>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <FadeIn>
            <CTABlock
              tone="default"
              eyebrow="Engineer review"
              title="Send the sizing to our team."
              description="We'll validate against your interval data, tariff structure, and interconnection — then reply within one business day."
              primary={{ label: "Request a Quote", href: "/quote" }}
              secondary={{ label: "See Grid Response", href: "/grid-response" }}
            />
          </FadeIn>
        </Container>
      </Section>
    </PageShell>
  );
}
