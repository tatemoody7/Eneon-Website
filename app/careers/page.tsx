import type { Metadata } from "next";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel, Icon, Tag } from "@/components/atoms";
import {
  CTABlock,
  Breadcrumbs,
  FeatureGrid,
} from "@/components/blocks";
import { openPositions, careersIntro } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers — Eneon ES",
  description:
    "Build the backbone of the grid transition. Join a senior team of engineers and field specialists in Calgary, Alberta.",
};

export default function CareersPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Careers" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Careers</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              {careersIntro.heading}
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              {careersIntro.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="What we believe"
            eyebrowNumber={2}
            title="How we work."
            align="start"
          />
          <div className="mt-16">
            <FeatureGrid
              features={careersIntro.values.map((v, i) => ({
                number: (i + 1).toString().padStart(2, "0"),
                title: v,
                description: "",
              }))}
              columns={3}
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Open positions"
            eyebrowNumber={3}
            title="Current openings."
            description="Every role is Calgary-based. If you don't see a fit but think we should know you, send us a note."
            align="start"
          />
          <ul className="mt-16 flex flex-col">
            {openPositions.map((job, i) => (
              <li key={job.slug}>
                <NextLink
                  href={job.applyUrl ?? "/contact"}
                  className="group/row block hairline-t last:hairline-b py-10 md:py-12 transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)] hover:bg-[var(--color-surface-raised)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-1">
                      <EyebrowLabel number={i + 1}>Role</EyebrowLabel>
                    </div>
                    <div className="lg:col-span-6 flex flex-col gap-3">
                      <h2 className="text-2xl md:text-4xl font-medium tracking-[-0.025em] leading-[1.1] text-[var(--color-navy-500)] group-hover/row:text-[var(--color-accent-700)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)]">
                        {job.title}
                      </h2>
                      <p className="text-base md:text-lg leading-relaxed text-[var(--color-paper-600)] max-w-2xl">
                        {job.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Tag tone="default">{job.department}</Tag>
                        <Tag tone="default">{job.type}</Tag>
                        <Tag tone="default">{job.remote}</Tag>
                      </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col lg:items-end gap-2 label-mono text-[var(--color-paper-500)]">
                      <span>{job.location}</span>
                      <span className="inline-flex items-center gap-2 text-[var(--color-navy-500)]">
                        Apply
                        <Icon icon={ArrowUpRight} size="sm" />
                      </span>
                    </div>
                  </div>
                </NextLink>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button variant="secondary" href="/contact" trailingIcon>
              Send us a Note
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="lg">
        <Container>
          <CTABlock
            tone="default"
            eyebrow="Not sure?"
            title="Think you'd fit but don't see a role?"
            description="Send us an intro and a CV. We read every message."
            primary={{ label: "Contact Us", href: "/contact" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
