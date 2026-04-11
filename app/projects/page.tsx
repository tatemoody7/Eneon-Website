import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { EyebrowLabel } from "@/components/atoms";
import {
  ProjectCard,
  CTABlock,
  Breadcrumbs,
  StatBlock,
} from "@/components/blocks";
import { projects, totalProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects — Eneon ES",
  description:
    "Operational battery energy storage projects across Canada — from subarctic microgrids to grid-support utility deployments.",
};

export default function ProjectsIndexPage() {
  const indexStats = [
    { value: totalProjects.toString(), unit: "", label: "Projects Deployed" },
    { value: "250", unit: "MWh", label: "Capacity Online" },
    { value: "13", unit: "", label: "Communities Served" },
    { value: "−40", unit: "°C", label: "Coldest Operational" },
  ];

  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Projects</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Deployed where it matters.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              From the east arm of Great Slave Lake to the Arctic coast — every
              Eneon system operates in a place where downtime is not an option.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <StatBlock stats={indexStats} columns={4} size="xl" />
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="All Projects"
            eyebrowNumber={2}
            title="Every Eneon deployment."
            description="Each card links to a full case study with operational data, diesel displacement figures, and deployment logistics."
            align="start"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard
                key={p.slug}
                title={p.title}
                slug={p.slug}
                location={p.location}
                type={p.type}
                status={p.status}
                capacityMwh={p.capacityMwh}
                powerMw={p.powerMw}
                year={p.year}
                image={p.image}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Your project"
            title="Your site could be next."
            description="Tell us about your application and location. An Eneon engineer will respond within one business day."
            primary={{ label: "Request a Quote", href: "/quote" }}
            secondary={{ label: "Size my System", href: "/sizing-tool" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
