import type { Metadata } from "next";
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
  CertBadge,
} from "@/components/atoms";
import { Image } from "@/components/media";
import {
  StatBlock,
  FeatureGrid,
  ProjectCard,
  CTABlock,
  SplitFeature,
  CalloutBlock,
} from "@/components/blocks";
import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { solutions } from "@/content/solutions";
import { product, connect } from "@/content/product";
import { certifications } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Eneon ES — Battery Energy Storage, Engineered",
  description:
    "Eneon ES designs, builds, and operates battery energy storage systems for microgrids, utilities, and commercial projects across North America.",
};

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <PageShell>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>{home.hero.eyebrow}</EyebrowLabel>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              {home.hero.headline}
            </h1>

            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              {home.hero.subhead}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                href={home.hero.primaryCta.href}
                trailingIcon
              >
                {home.hero.primaryCta.label}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={home.hero.secondaryCta.href}
              >
                {home.hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Stats strip ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <StatBlock stats={home.stats} columns={4} size="xl" />
        </Container>
      </Section>

      {/* ─── Intro / Who we are ──────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <EyebrowLabel number={2}>{home.intro.eyebrow}</EyebrowLabel>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-8">
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                {home.intro.title}
              </h2>
              <p className="text-lg leading-relaxed text-[var(--color-paper-600)] max-w-2xl">
                {home.intro.description}
              </p>
              <Hairline />
              <Button
                variant="ghost"
                href="/about"
                trailingIcon
                className="self-start"
              >
                About Eneon
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Solutions intro + vertical grid ─────────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow={home.solutionsIntro.eyebrow}
            eyebrowNumber={3}
            title={home.solutionsIntro.title}
            description={home.solutionsIntro.description}
            align="start"
          />
          <div className="mt-16">
            <FeatureGrid
              features={solutions.map((s) => ({
                icon: s.icon,
                title: s.label,
                description: s.tagline,
              }))}
              columns={4}
            />
          </div>
          <div className="mt-10 flex">
            <Button variant="secondary" href="/solutions" trailingIcon>
              All Solutions
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── Product intro (SplitFeature) ────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SplitFeature
            eyebrow={home.productIntro.eyebrow}
            eyebrowNumber={4}
            title={home.productIntro.title}
            description={home.productIntro.description}
            orientation="media-right"
            body={
              <div className="flex flex-col gap-6">
                <ul className="flex flex-col gap-3 hairline-t pt-6">
                  {product.pillars.map((p) => (
                    <li
                      key={p.number}
                      className="flex items-baseline gap-4"
                    >
                      <span className="label-mono text-[var(--color-accent-700)]">
                        {p.number}
                      </span>
                      <span className="text-base text-[var(--color-navy-500)]">
                        {p.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  href="/product"
                  trailingIcon
                  className="self-start"
                >
                  Explore the Platform
                </Button>
              </div>
            }
            media={
              <Image
                alt="Eneon BESS containerized platform"
                src="/images/product/product-gtr-02.webp"
                ratio="4/3"
                treatment="ink-wash"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            }
          />
        </Container>
      </Section>

      {/* ─── Connect intro (ink tone) ────────────────────────────────── */}
      <Section tone="ink" padding="lg" blueprint hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <EyebrowLabel number={5} tone="ink">
                {home.connectIntro.eyebrow}
              </EyebrowLabel>
              <h2 className="mt-6 text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-white">
                {home.connectIntro.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-md">
                {home.connectIntro.description}
              </p>
              <Button
                variant="secondary"
                href="/connect"
                trailingIcon
                className="mt-8 text-white border-white/30 hover:bg-white hover:text-[var(--color-navy-500)]"
              >
                Inside Eneon Connect
              </Button>
            </div>
            <div className="lg:col-span-7">
              <FeatureGrid
                features={connect.modules.map((m) => ({
                  number: m.number,
                  title: m.title,
                  description: m.description,
                }))}
                columns={2}
                tone="ink"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Projects preview ────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow={home.projectsIntro.eyebrow}
            eyebrowNumber={6}
            title={home.projectsIntro.title}
            description={home.projectsIntro.description}
            align="start"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
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

      {/* ─── Certifications strip ────────────────────────────────────── */}
      <Section tone="raised" padding="md" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <EyebrowLabel number={7}>Safety & Compliance</EyebrowLabel>
              <h3 className="mt-4 text-2xl md:text-3xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
                Built to the codes that matter.
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

      {/* ─── Pullquote / brand callout ───────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <CalloutBlock
            tone="default"
            eyebrow="Engineered in Canada"
            title="We build battery systems for the places and customers other storage companies find too hard."
            body="Remote communities, harsh climates, long timelines — every deployment comes with real engineering, real field support, and the software to prove it."
            footer={
              <span className="label-mono text-[var(--color-paper-500)]">
                Eneon ES — Calgary, AB
              </span>
            }
          />
        </Container>
      </Section>

      {/* ─── Final CTA (ink + blueprint) ─────────────────────────────── */}
      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow={home.finalCta.eyebrow}
            title={home.finalCta.title}
            description={home.finalCta.description}
            primary={home.finalCta.primary}
            secondary={home.finalCta.secondary}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
