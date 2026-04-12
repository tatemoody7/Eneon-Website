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
  CertBadge,
} from "@/components/atoms";
import { Video } from "@/components/media";
import {
  StatBlock,
  FeatureGrid,
  SpecTable,
  CTABlock,
  CalloutBlock,
  Breadcrumbs,
  ProductAnatomyTabs,
} from "@/components/blocks";
import { product, connect } from "@/content/product";
import { certifications } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Eneon BESS — The Platform",
  description:
    "A containerized, augmentation-ready battery energy storage platform engineered for 20-year service life and deployed across North America.",
};

export default function ProductPage() {
  return (
    <PageShell>
      {/* ─── Breadcrumbs ─────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Product" },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 flex flex-col gap-10">
              <EyebrowLabel number={1}>The Platform</EyebrowLabel>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
                {product.name}.<br />
                {product.tagline}
              </h1>
              <p className="max-w-xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="lg" href="/quote" trailingIcon>
                  Request a Quote
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/sizing-tool"
                >
                  Size my System
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Video
                alt="Eneon BESS FlexBlock modular battery architecture animation"
                sources={[
                  { src: "/videos/flexblock.webm", type: "video/webm" },
                  { src: "/videos/flexblock.mp4", type: "video/mp4" },
                ]}
                poster="/videos/flexblock-poster.jpg"
                ratio="3/2"
                autoPlay
                loop
                muted
                desktopOnlyAutoplay
                treatment="ink-wash"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Hero stats ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <StatBlock stats={product.heroStats} columns={4} size="xl" />
        </Container>
      </Section>

      {/* ─── 4 Pillars ──────────────────────────────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Engineering pillars"
            eyebrowNumber={2}
            title="Four principles, one platform."
            description="Every Eneon BESS deployment is built on the same engineering commitments — from Massachusetts community solar to Ontario Global Adjustment."
            align="start"
          />
          <div className="mt-16">
            <FeatureGrid
              features={product.pillars.map((p) => ({
                number: p.number,
                title: p.title,
                description: p.description,
              }))}
              columns={4}
            />
          </div>
        </Container>
      </Section>

      {/* ─── Anatomy walkthrough ─────────────────────────────────────── */}
      <Section tone="ink" padding="xl" blueprint hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Inside the platform"
            eyebrowNumber={3}
            title="Every subsystem, engineered in-house."
            description="Eight subsystems, one integrated platform. Each cabinet that ships from an Eneon line is commissioned by the same team that designed it."
            align="start"
            tone="ink"
          />
          <div className="mt-16">
            <ProductAnatomyTabs tabs={product.anatomy} />
          </div>
        </Container>
      </Section>

      {/* ─── Spec table ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <EyebrowLabel number={4}>Technical data</EyebrowLabel>
              <h2 className="mt-6 text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                The numbers behind the platform.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-paper-600)]">
                Complete specifications for the containerized Eneon BESS platform. Contact engineering for a full data sheet tailored to your site conditions.
              </p>
              <Button
                variant="ghost"
                href="/quote"
                trailingIcon
                className="mt-8 self-start"
              >
                Download Data Sheet
              </Button>
            </div>
            <div className="lg:col-span-8">
              <SpecTable groups={product.specs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Certifications ─────────────────────────────────────────── */}
      <Section tone="raised" padding="md" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <EyebrowLabel number={5}>Safety & Compliance</EyebrowLabel>
              <h3 className="mt-4 text-2xl md:text-3xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
                Every deployment, code-ready.
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

      {/* ─── Connect teaser ──────────────────────────────────────────── */}
      <Section tone="ink" padding="lg" blueprint hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <EyebrowLabel number={6} tone="ink">
                Ships with the system
              </EyebrowLabel>
              <h2 className="mt-6 text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-white">
                {connect.name}. {connect.tagline}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-md">
                {connect.description}
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

      {/* ─── Callout + experience video ─────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <CalloutBlock
                tone="default"
                eyebrow="Field proof"
                title="Thirteen operational deployments across North America."
                body="The Eneon BESS is deployed across 13 operational projects — from 21.45 MWh community solar + storage in Massachusetts to 26 MWh AC-coupled storage in Minnesota and commercial peak-shaving batteries across Ontario."
                footer={
                  <Button variant="ghost" href="/projects" trailingIcon>
                    See the projects
                  </Button>
                }
              />
            </div>
            <div className="lg:col-span-6">
              <Video
                alt="Eneon BESS in the field"
                sources={[
                  { src: "/videos/experience.webm", type: "video/webm" },
                ]}
                poster="/videos/flexblock-poster.jpg"
                ratio="16/9"
                autoPlay
                loop
                muted
                desktopOnlyAutoplay
                treatment="grade"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Final CTA ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Next step"
            title="Let's spec your project."
            description="Send us your application, location, and load profile. An Eneon engineer will respond within one business day."
            primary={{ label: "Request a Quote", href: "/quote" }}
            secondary={{ label: "Size my System", href: "/sizing-tool" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
