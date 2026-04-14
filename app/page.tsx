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
import { Image, Video, HeroMedia } from "@/components/media";
import {
  FeatureGrid,
  ProjectCard,
  CTABlock,
  SplitFeature,
  TestimonialBlock,
} from "@/components/blocks";
import { FadeIn, AnimatedStatBlock, HeroReveal } from "@/components/motion";
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
      <section className="hairline-b">
        <HeroMedia height="xl" gradient="bottom" grain>
          {/* Extra overlay for text legibility on mobile poster */}
          <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: 'linear-gradient(to top, rgba(1,6,13,0.95) 0%, rgba(1,6,13,0.7) 40%, rgba(1,6,13,0.5) 70%, rgba(1,6,13,0.35) 100%)' }} />
          <div className="absolute inset-0">
            <Video
              alt="Eneon energy system diorama — containerized BESS with wind and solar generation"
              sources={[
                { src: "/videos/energy-diorama.mp4", type: "video/mp4" },
              ]}
              poster="/images/misc/marketing-01.webp"
              ratio="auto"
              autoPlay
              loop
              muted
              desktopOnlyAutoplay
              frameClassName="h-full w-full"
            />
          </div>
          <div className="relative z-10 h-full flex items-end">
            <Container>
              <HeroReveal className="flex flex-col gap-10 max-w-5xl py-24 md:py-32">
                <EyebrowLabel number={1} tone="ink">
                  {home.hero.eyebrow}
                </EyebrowLabel>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                  {home.hero.headline}
                </h1>

                <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-white/80">
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
                    className="text-white border-white/30 hover:bg-white hover:text-[var(--color-navy-500)]"
                  >
                    {home.hero.secondaryCta.label}
                  </Button>
                </div>
              </HeroReveal>
            </Container>
          </div>
        </HeroMedia>
      </section>

      {/* ─── Stats strip (animated counters) ─────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <AnimatedStatBlock stats={home.stats} columns={4} size="xl" />
        </Container>
      </Section>

      {/* ─── Intro / Who we are ──────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <FadeIn direction="left" delay={0}>
                <EyebrowLabel number={2}>{home.intro.eyebrow}</EyebrowLabel>
              </FadeIn>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-8">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                  {home.intro.title}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-lg leading-relaxed text-[var(--color-paper-600)] max-w-2xl">
                  {home.intro.description}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Hairline />
                <Button
                  variant="ghost"
                  href="/about"
                  trailingIcon
                  className="self-start mt-6"
                >
                  About Eneon
                </Button>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Solutions intro + vertical grid ─────────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <SectionHeader
              eyebrow={home.solutionsIntro.eyebrow}
              eyebrowNumber={3}
              title={home.solutionsIntro.title}
              description={home.solutionsIntro.description}
              align="start"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
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
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-10 flex">
              <Button variant="secondary" href="/solutions" trailingIcon>
                All Solutions
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Product intro (SplitFeature) ────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
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
                <div className="flex flex-col gap-4">
                  <Image
                    alt="Eneon BESS containerized platform"
                    src="/images/product/product-gtr-02.webp"
                    ratio="4/3"
                    treatment="none"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <Image
                    alt="FlexBlock BESS enclosure blueprint"
                    src="/images/product/blueprints/flexblock-blueprint.png"
                    ratio="2/1"
                    treatment="tinted"
                    caption="FlexBlock system architecture"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              }
            />
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Full-bleed project hero (breaks the grid) ───────────────── */}
      <section className="relative hairline-b">
        <FadeIn direction="none" duration={0.8}>
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <Image
              alt="Aerial view of an Eneon solar + storage deployment"
              src="/images/projects/project-drone-01.jpg"
              ratio="auto"
              treatment="none"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-900)]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <Container>
                <div className="py-12 md:py-16">
                  <EyebrowLabel tone="ink" number={5}>Field proof</EyebrowLabel>
                  <h2 className="mt-4 text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-white max-w-3xl">
                    {home.projectsIntro.title}
                  </h2>
                </div>
              </Container>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Connect intro (ink tone) ────────────────────────────────── */}
      <Section tone="ink" padding="lg" blueprint hairlineBottom>
        <Container>
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <EyebrowLabel number={6} tone="ink">
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
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Projects preview ────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <p className="text-lg leading-relaxed text-[var(--color-paper-600)] max-w-2xl">
              {home.projectsIntro.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 flex">
              <Button variant="secondary" href="/projects" trailingIcon>
                All Projects
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Testimonial ─────────────────────────────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <TestimonialBlock
              quote="Eneon delivered a system that performs exactly as specified — no surprises in year one, no surprises in year five. That's what we look for in a storage partner."
              author={{
                name: "Senior VP, Grid Services",
                title: "FortisAlberta",
              }}
              eyebrow="Client"
            />
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Certifications strip ────────────────────────────────────── */}
      <Section tone="paper" padding="md" hairlineBottom>
        <Container>
          <FadeIn>
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
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Final CTA (default tone — avoids double navy with footer) ─ */}
      <Section tone="raised" padding="lg">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <CTABlock
                  tone="default"
                  eyebrow="Engineered in Canada"
                  title="Containerized battery platforms, built by engineers who commission their own systems."
                  description="Every Eneon deployment is designed, fabricated, and supported by the same senior team — from system sizing through twenty years of operation."
                  primary={home.finalCta.primary}
                  secondary={home.finalCta.secondary}
                />
              </div>
              <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                <Image
                  src="/images/misc/marketing-01.webp"
                  alt="Eneon BESS system in the field"
                  ratio="square"
                  treatment="none"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <Image
                  src="/images/misc/marketing-02.webp"
                  alt="Eneon engineering and fabrication"
                  ratio="square"
                  treatment="ink-wash"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <Image
                  src="/images/misc/marketing-03.webp"
                  alt="Eneon battery storage deployment"
                  ratio="square"
                  treatment="none"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <Image
                  src="/images/product/build-quality.jpg"
                  alt="FlexBlock build quality — precision manufacturing"
                  ratio="square"
                  treatment="ink-wash"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </PageShell>
  );
}
