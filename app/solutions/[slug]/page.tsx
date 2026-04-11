import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel, Icon, Tag } from "@/components/atoms";
import { Image } from "@/components/media";
import {
  FeatureGrid,
  CTABlock,
  CalloutBlock,
  Breadcrumbs,
  ProjectCard,
} from "@/components/blocks";
import { solutions } from "@/content/solutions";
import { projects } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return { title: "Solution — Eneon ES" };
  return {
    title: `${solution.label} — Eneon ES`,
    description: solution.description,
  };
}

// Best-effort project type mapping for "Related projects"
const slugTypeMap: Record<string, string> = {
  microgrids: "Microgrid",
  utility: "Utility",
  commercial: "Commercial",
  "solar-storage": "Solar+Storage",
};

export default async function SolutionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const SolutionIcon = solution.icon;
  const wantedType = slugTypeMap[solution.slug];
  const relatedProjects = projects
    .filter((p) => p.type === wantedType)
    .slice(0, 3);

  return (
    <PageShell>
      {/* ─── Breadcrumbs ─────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Solutions", href: "/solutions" },
              { label: solution.label },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <div className="flex items-center gap-4">
              <Icon icon={SolutionIcon} size="lg" />
              <EyebrowLabel number={1}>Solution</EyebrowLabel>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              {solution.label}.<br />
              {solution.tagline}
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              {solution.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/quote" trailingIcon>
                Request a Quote
              </Button>
              <Button variant="secondary" size="lg" href="/product">
                See the Platform
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Audience strip ──────────────────────────────────────────── */}
      <Section tone="raised" padding="sm" hairlineBottom>
        <Container>
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <EyebrowLabel number={2}>Who it&apos;s for</EyebrowLabel>
            <p className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
              {solution.audience}
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── Capabilities ───────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            eyebrowNumber={3}
            title="What the platform delivers."
            description={`Core capabilities of the Eneon BESS configured for ${solution.label.toLowerCase()} applications.`}
            align="start"
          />
          <div className="mt-16">
            <FeatureGrid
              features={solution.features.map((f, i) => ({
                number: (i + 1).toString().padStart(2, "0"),
                title: f,
                description: "",
              }))}
              columns={3}
            />
          </div>
        </Container>
      </Section>

      {/* ─── Platform split ──────────────────────────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <EyebrowLabel number={4}>One platform, every application</EyebrowLabel>
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                Eneon BESS — configured for {solution.label.toLowerCase()}.
              </h2>
              <p className="text-lg leading-relaxed text-[var(--color-paper-600)] max-w-xl">
                Every Eneon deployment uses the same modular, augmentation-ready
                platform. The difference is in how it&apos;s configured — power
                electronics, thermal management, and controls tuned to your
                application.
              </p>
              <Button
                variant="primary"
                href="/product"
                trailingIcon
                className="self-start mt-2"
              >
                Explore the Platform
              </Button>
            </div>
            <div className="lg:col-span-7">
              <Image
                alt={`${solution.label} deployment`}
                src={
                  {
                    microgrids: "/images/projects/project-drone-01.jpg",
                    utility: "/images/projects/project-p5.jpg",
                    commercial: "/images/product/build-quality.jpg",
                    "solar-storage": "/images/projects/project-m-01.webp",
                  }[solution.slug] ?? "/images/projects/project-drone-01.jpg"
                }
                ratio="16/9"
                treatment="ink-wash"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Related projects ───────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <Section tone="paper" padding="lg" hairlineBottom>
          <Container>
            <SectionHeader
              eyebrow="Field proof"
              eyebrowNumber={5}
              title={`${solution.label} — deployed.`}
              description="Operational Eneon projects in this vertical."
              align="start"
            />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
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
            <div className="mt-10 flex">
              <Button variant="secondary" href="/projects" trailingIcon>
                All Projects
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Callout ────────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <CalloutBlock
            tone="default"
            eyebrow={solution.label}
            title={solution.tagline}
            body={solution.description}
            footer={
              <span className="label-mono text-[var(--color-paper-500)]">
                {solution.audience}
              </span>
            }
          />
        </Container>
      </Section>

      {/* ─── Final CTA ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Next step"
            title={`Tell us about your ${solution.label.toLowerCase()} project.`}
            description="An Eneon engineer will respond within one business day."
            primary={{ label: "Request a Quote", href: "/quote" }}
            secondary={{ label: "Size my System", href: "/sizing-tool" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
