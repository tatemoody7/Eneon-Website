import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import {
  Button,
  EyebrowLabel,
  Hairline,
  Tag,
  Icon,
  StatDigit,
} from "@/components/atoms";
import { Image } from "@/components/media";
import {
  CTABlock,
  CalloutBlock,
  Breadcrumbs,
  ProjectCard,
} from "@/components/blocks";
import { projects, getProjectBySlug } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project — Eneon ES" };
  return {
    title: `${project.title} — Eneon ES`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const statusTone =
    project.status === "Operational"
      ? "ok"
      : project.status === "Commissioning"
        ? "warn"
        : "default";

  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap items-center gap-3">
              <Tag tone="default">{project.type}</Tag>
              <Tag tone={statusTone as "ok" | "warn" | "default"}>
                {project.status}
              </Tag>
              <span className="inline-flex items-center gap-2 label-mono text-[var(--color-paper-500)]">
                <Icon icon={MapPin} size="xs" />
                {project.location}
                {project.year && (
                  <>
                    <span aria-hidden className="opacity-40">
                      /
                    </span>
                    {project.year}
                  </>
                )}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)] max-w-5xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              {project.summary}
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── Hero image ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Image
            alt={project.image.alt}
            src={project.image.src}
            ratio="16/9"
            treatment="ink-wash"
            fill
            sizes="100vw"
          />
        </Container>
      </Section>

      {/* ─── Stats (if present) ─────────────────────────────────────── */}
      {(project.capacityMwh || project.powerMw) && (
        <Section tone="paper" padding="md" hairlineBottom>
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)] hairline">
              {project.capacityMwh != null && (
                <div className="bg-[var(--color-surface-raised)] p-8">
                  <StatDigit
                    value={project.capacityMwh}
                    unit="MWh"
                    label="Capacity"
                    size="xl"
                  />
                </div>
              )}
              {project.powerMw != null && (
                <div className="bg-[var(--color-surface-raised)] p-8">
                  <StatDigit
                    value={project.powerMw}
                    unit="MW"
                    label="Power"
                    size="xl"
                  />
                </div>
              )}
              <div className="bg-[var(--color-surface-raised)] p-8">
                <StatDigit
                  value={project.status}
                  label="Status"
                  size="lg"
                />
              </div>
              {project.year && (
                <div className="bg-[var(--color-surface-raised)] p-8">
                  <StatDigit value={project.year} label="Commissioned" size="lg" />
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Highlights ─────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <EyebrowLabel number={1}>Highlights</EyebrowLabel>
              <h2 className="mt-6 text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                Project highlights.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="flex flex-col">
                {project.highlights.map((h, i) => (
                  <li
                    key={`${h}-${i}`}
                    className="grid grid-cols-[auto_1fr] gap-6 py-6 hairline-t first:hairline-t items-baseline"
                  >
                    <span className="label-mono text-[var(--color-accent-700)]">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-lg md:text-xl text-[var(--color-navy-500)]">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
              <Hairline className="mt-0" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Gallery + Map ──────────────────────────────────────────── */}
      {(project.gallery?.length || project.mapImage) && (
        <Section tone="raised" padding="lg" hairlineBottom>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <EyebrowLabel number={2}>Site imagery</EyebrowLabel>
                <h2 className="mt-6 text-2xl md:text-3xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
                  From the field.
                </h2>
              </div>
              <div className="lg:col-span-8 grid grid-cols-2 gap-4">
                {project.gallery?.map((img, i) => (
                  <Image
                    key={`gallery-${i}`}
                    src={img.src}
                    alt={img.alt}
                    ratio="4/3"
                    treatment="ink-wash"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ))}
                {project.mapImage && (
                  <Image
                    src={project.mapImage.src}
                    alt={project.mapImage.alt}
                    ratio="4/3"
                    treatment="tinted"
                    caption="Project location"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── Callout ────────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <CalloutBlock
            tone="default"
            eyebrow="Platform"
            title="Built on the Eneon BESS platform."
            body="Containerized, augmentation-ready, cold-weather rated, and monitored by Eneon Connect from day one."
            footer={
              <Button variant="ghost" href="/product" trailingIcon>
                Explore the Platform
              </Button>
            }
          />
        </Container>
      </Section>

      {/* ─── Related projects ───────────────────────────────────────── */}
      {related.length > 0 && (
        <Section tone="raised" padding="lg" hairlineBottom>
          <Container>
            <SectionHeader
              eyebrow="Related projects"
              eyebrowNumber={3}
              title="More Eneon deployments."
              align="start"
            />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
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
      )}

      {/* ─── Final CTA ──────────────────────────────────────────────── */}
      <Section tone="raised" padding="lg">
        <Container>
          <CTABlock
            tone="default"
            eyebrow="Your project"
            title="Have a similar site?"
            description="Tell us the location and load profile — an Eneon engineer will respond within one business day."
            primary={{ label: "Request a Quote", href: "/quote" }}
            secondary={{ label: "All Projects", href: "/projects" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
