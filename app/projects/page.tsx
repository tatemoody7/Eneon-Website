import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";
import { Image } from "@/components/media";
import {
  ProjectCard,
  CTABlock,
  Breadcrumbs,
} from "@/components/blocks";
import { FadeIn, AnimatedStatBlock, HeroReveal } from "@/components/motion";
import { projects, totalProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects — Eneon ES",
  description:
    "Operational battery energy storage projects across North America — from Massachusetts community solar to Ontario Global Adjustment peak shaving.",
};

export default function ProjectsIndexPage() {
  const indexStats = [
    { value: totalProjects.toString(), unit: "", label: "Projects Deployed" },
    { value: "85", unit: "MWh", label: "Capacity Online" },
    { value: "20", unit: "yr", label: "Service Life" },
    { value: "2013", unit: "", label: "Operating Since" },
  ];

  // Featured project — the largest deployment
  const featured = projects[1]; // Lyon County, 26 MWh
  const remaining = projects.filter((p) => p.slug !== featured.slug);

  // Group remaining by type
  const utilityProjects = remaining.filter((p) => p.type === "Utility");
  const commercialProjects = remaining.filter((p) => p.type === "Commercial");
  const microgridProjects = remaining.filter((p) => p.type === "Microgrid");

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
          <HeroReveal className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Projects</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Deployed where it matters.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              From New England community solar to Ontario Global Adjustment
              peak shaving — every Eneon system operates where reliability and
              economics have to work together.
            </p>
          </HeroReveal>
        </Container>
      </Section>

      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <AnimatedStatBlock stats={indexStats} columns={4} size="xl" />
        </Container>
      </Section>

      {/* ─── Featured project (larger card, breaks the grid) ──────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow="Featured"
              title="Largest deployment"
              align="start"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <Image
                  alt={featured.image.alt}
                  src={featured.image.src}
                  ratio="16/9"
                  treatment="none"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6">
                <EyebrowLabel>{featured.type} · {featured.location}</EyebrowLabel>
                <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                  {featured.title}
                </h2>
                <p className="text-lg leading-relaxed text-[var(--color-paper-600)]">
                  {featured.summary}
                </p>
                <div className="flex items-end gap-10 hairline-t pt-6">
                  {featured.capacityMwh != null && (
                    <div>
                      <span className="label-mono text-[var(--color-paper-500)]">Capacity</span>
                      <span className="stat-digit text-4xl text-[var(--color-navy-500)] block mt-1">
                        {featured.capacityMwh}
                        <span className="text-sm ml-1 opacity-60">MWh</span>
                      </span>
                    </div>
                  )}
                  {featured.powerMw != null && (
                    <div>
                      <span className="label-mono text-[var(--color-paper-500)]">Power</span>
                      <span className="stat-digit text-4xl text-[var(--color-navy-500)] block mt-1">
                        {featured.powerMw}
                        <span className="text-sm ml-1 opacity-60">MW</span>
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  variant="primary"
                  href={`/projects/${featured.slug}`}
                  trailingIcon
                  className="self-start"
                >
                  View Case Study
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Utility-scale projects ──────────────────────────────────── */}
      {utilityProjects.length > 0 && (
        <Section tone="paper" padding="lg" hairlineBottom>
          <Container>
            <FadeIn>
              <SectionHeader
                eyebrow="Utility-Scale"
                eyebrowNumber={2}
                title="Grid-scale deployments."
                align="start"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {utilityProjects.map((p) => (
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
            </FadeIn>
          </Container>
        </Section>
      )}

      {/* ─── Commercial & Industrial projects ────────────────────────── */}
      {commercialProjects.length > 0 && (
        <Section tone="raised" padding="lg" hairlineBottom>
          <Container>
            <FadeIn>
              <SectionHeader
                eyebrow="Commercial & Industrial"
                eyebrowNumber={3}
                title="Behind-the-meter storage."
                align="start"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commercialProjects.map((p) => (
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
            </FadeIn>
          </Container>
        </Section>
      )}

      {/* ─── Microgrid projects ──────────────────────────────────────── */}
      {microgridProjects.length > 0 && (
        <Section tone="paper" padding="lg" hairlineBottom>
          <Container>
            <FadeIn>
              <SectionHeader
                eyebrow="Microgrid"
                eyebrowNumber={4}
                title="Off-grid and resiliency."
                align="start"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {microgridProjects.map((p) => (
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
            </FadeIn>
          </Container>
        </Section>
      )}

      {/* ─── CTA (default tone) ──────────────────────────────────────── */}
      <Section tone="raised" padding="lg">
        <Container>
          <FadeIn>
            <CTABlock
              tone="default"
              eyebrow="Your project"
              title="See how this applies to your site."
              description="Tell us about your application and location. An Eneon engineer will respond within one business day."
              primary={{ label: "Request a Quote", href: "/quote" }}
              secondary={{ label: "Size my System", href: "/sizing-tool" }}
            />
          </FadeIn>
        </Container>
      </Section>
    </PageShell>
  );
}
