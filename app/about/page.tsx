import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel, CertBadge } from "@/components/atoms";
import {
  CTABlock,
  CalloutBlock,
  Breadcrumbs,
  Timeline,
  LogoStrip,
  StatBlock,
} from "@/components/blocks";
import { company } from "@/content/company";
import { companyTimeline } from "@/content/timeline";
import { customerLogos } from "@/content/partners";
import { certifications } from "@/content/certifications";

export const metadata: Metadata = {
  title: "About — Eneon ES",
  description:
    "Eneon ES is a Calgary-based battery energy storage company engineering systems for microgrids, utilities, and commercial projects across North America.",
};

const aboutStats = [
  { value: "13", unit: "", label: "Projects Deployed" },
  { value: "250", unit: "MWh", label: "Capacity Online" },
  { value: "20", unit: "yr", label: "Service Life" },
  { value: "100", unit: "%", label: "Canadian-Engineered" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>About Eneon ES</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              {company.origin.label}.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              {company.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/team" trailingIcon>
                Meet the Team
              </Button>
              <Button variant="secondary" size="lg" href="/projects">
                See Our Projects
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <StatBlock stats={aboutStats} columns={4} size="xl" />
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <EyebrowLabel number={2}>Mission</EyebrowLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                {company.mission}
              </h2>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="History"
            eyebrowNumber={3}
            title="Built on a field record."
            description="Milestones from the founding of Eneon ES to today."
            align="start"
          />
          <div className="mt-16">
            <Timeline entries={companyTimeline} orientation="vertical" />
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Customers"
            eyebrowNumber={4}
            title="Communities and operators we serve."
            align="start"
          />
          <div className="mt-16">
            <LogoStrip
              logos={customerLogos}
              heading="Deployments across Canada"
            />
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="md" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <EyebrowLabel number={5}>Safety & Compliance</EyebrowLabel>
              <h3 className="mt-4 text-2xl md:text-3xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
                Certified where it counts.
              </h3>
            </div>
            <div className="lg:col-span-8 flex flex-wrap gap-3">
              {certifications.map((c) => (
                <CertBadge key={c.code} code={c.code} label={c.category} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <CalloutBlock
            tone="ink"
            eyebrow="Where we work"
            title={`Headquartered in ${company.headquarters.line}.`}
            body={company.origin.description}
            footer={
              <span className="label-mono text-white/60">
                {company.legalName} · {company.contact.email}
              </span>
            }
          />
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Get in touch"
            title="Let's engineer your storage project."
            description="Questions about our platform, team, or company? Reach out directly."
            primary={{ label: "Contact Us", href: "/contact" }}
            secondary={{ label: "Open Positions", href: "/careers" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
