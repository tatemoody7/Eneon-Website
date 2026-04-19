import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";
import { Image } from "@/components/media";
import {
  CTABlock,
  Breadcrumbs,
} from "@/components/blocks";
import { ProjectFilterGrid } from "@/components/blocks/ProjectFilterGrid";
import { FadeIn, HeroReveal } from "@/components/motion";
import { projects, totalProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects — Eneon ES",
  description:
    "Operational battery energy storage projects across North America — from Massachusetts community solar to Ontario Global Adjustment peak shaving.",
};

export default function ProjectsIndexPage() {
  const featured = projects[1]; // Lyon County, 26 MWh — largest deployment
  const remaining = projects.filter((p) => p.slug !== featured.slug);

  const totalMwh = projects
    .reduce((sum, p) => sum + (p.capacityMwh ?? 0), 0)
    .toFixed(1);
  const years = projects.map((p) => p.year).filter(Boolean) as number[];
  const earliest = Math.min(...years);

  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
          />
        </Container>
      </Section>

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <HeroReveal className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Projects / Index</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Deployed where <br className="hidden md:block" />
              <span className="text-[var(--color-paper-600)]">
                reliability is non-negotiable.
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              {totalProjects} operational BESS installations across North
              America — utility-scale solar firming, Ontario Global Adjustment
              peak shaving, and community microgrids. Every one on the same
              containerized FlexBlock platform.
            </p>
          </HeroReveal>
        </Container>
      </Section>

      {/* ─── Stat strip (dark, cartographic) ─────────────────────── */}
      <Section tone="ink" padding="sm" hairlineBottom>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {[
              { k: "Projects", v: totalProjects.toString(), u: "" },
              { k: "Capacity", v: totalMwh, u: "MWh" },
              { k: "Since", v: earliest.toString(), u: "" },
              { k: "Service Life", v: "20", u: "yr" },
            ].map((s) => (
              <div
                key={s.k}
                className="flex flex-col gap-2 bg-[var(--color-navy-500)] p-6"
              >
                <span className="label-mono text-white/60">{s.k}</span>
                <span className="stat-digit text-4xl md:text-5xl text-white">
                  {s.v}
                  {s.u && (
                    <span className="ml-2 text-base md:text-lg text-[var(--color-accent-400)] opacity-90">
                      {s.u}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── Featured (grid-breaking, image right) ───────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-4 hairline-b pb-6">
              <div className="flex flex-col gap-2">
                <EyebrowLabel number={2}>Featured / Flagship</EyebrowLabel>
                <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em] text-[var(--color-navy-500)]">
                  Largest single-site deployment.
                </h2>
              </div>
              <span className="label-mono text-[var(--color-paper-500)]">
                {featured.commissioned}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col gap-8">
                <div className="flex items-center gap-3 label-mono text-[var(--color-paper-500)]">
                  <span>{featured.type}</span>
                  <span aria-hidden className="opacity-40">/</span>
                  <span>{featured.location}</span>
                  <span aria-hidden className="opacity-40">/</span>
                  <span className="text-[var(--color-signal-ok)]">
                    {featured.status}
                  </span>
                </div>
                <h3 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] text-[var(--color-navy-500)]">
                  {featured.title}
                </h3>
                <p className="text-lg leading-relaxed text-[var(--color-paper-600)] max-w-xl">
                  {featured.summary}
                </p>
                <dl className="grid grid-cols-3 gap-8 hairline-t pt-8">
                  {featured.capacityMwh != null && (
                    <div>
                      <dt className="label-mono text-[var(--color-paper-500)]">
                        Capacity
                      </dt>
                      <dd className="stat-digit text-4xl text-[var(--color-navy-500)] mt-2">
                        {featured.capacityMwh}
                        <span className="text-sm ml-1 opacity-60">MWh</span>
                      </dd>
                    </div>
                  )}
                  {featured.powerMw != null && (
                    <div>
                      <dt className="label-mono text-[var(--color-paper-500)]">
                        Power
                      </dt>
                      <dd className="stat-digit text-4xl text-[var(--color-navy-500)] mt-2">
                        {featured.powerMw}
                        <span className="text-sm ml-1 opacity-60">MW</span>
                      </dd>
                    </div>
                  )}
                  {featured.capacityMwh != null && featured.powerMw != null && (
                    <div>
                      <dt className="label-mono text-[var(--color-paper-500)]">
                        Duration
                      </dt>
                      <dd className="stat-digit text-4xl text-[var(--color-navy-500)] mt-2">
                        {(featured.capacityMwh / featured.powerMw).toFixed(1)}
                        <span className="text-sm ml-1 opacity-60">hr</span>
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    variant="primary"
                    href={`/projects/${featured.slug}`}
                    trailingIcon
                  >
                    View Case Study
                  </Button>
                  <Button variant="secondary" href="/quote">
                    Request similar project
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2 relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[var(--color-accent-500)] pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[var(--color-accent-500)] pointer-events-none" />
                <Image
                  alt={featured.image.alt}
                  src={featured.image.src}
                  ratio="3/2"
                  treatment="none"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Filter grid (client) ─────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div className="flex flex-col gap-2">
                <EyebrowLabel number={3}>Full Fleet</EyebrowLabel>
                <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em] text-[var(--color-navy-500)]">
                  Every site, operational.
                </h2>
              </div>
              <span className="label-mono text-[var(--color-paper-500)]">
                {remaining.length} more projects
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <ProjectFilterGrid projects={remaining} />
          </FadeIn>
        </Container>
      </Section>

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
