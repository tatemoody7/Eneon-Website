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
import { Image } from "@/components/media";
import {
  StatBlock,
  FeatureGrid,
  SpecTable,
  CTABlock,
  CalloutBlock,
  Breadcrumbs,
} from "@/components/blocks";
import { product, connect } from "@/content/product";
import { certifications } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Eneon BESS — The Platform",
  description:
    "A containerized, augmentation-ready battery energy storage platform engineered for harsh conditions and 20-year service life.",
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
              <Image
                alt="Eneon BESS containerized platform — placeholder"
                src={`https://placehold.co/1200x1500/0E2F5C/FAF8F4?text=${encodeURIComponent(
                  "Eneon BESS",
                )}`}
                ratio="3/2"
                treatment="ink-wash"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
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
            description="Every Eneon BESS deployment is built on the same engineering commitments — from the Yukon to Saskatchewan."
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

      {/* ─── Spec table ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <EyebrowLabel number={3}>Technical data</EyebrowLabel>
              <h2 className="mt-6 text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                The numbers behind the platform.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-paper-600)]">
                Complete specifications for the containerized Eneon BESS. Some
                fields are marked pending verification against the production
                data sheet.
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
              <EyebrowLabel number={4}>Safety & Compliance</EyebrowLabel>
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
              <EyebrowLabel number={5} tone="ink">
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

      {/* ─── Callout ────────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <CalloutBlock
            tone="default"
            eyebrow="Field proof"
            title="Built for −40°C. Proven from the Mackenzie Delta to the Arctic coast."
            body="The Eneon BESS is deployed across 13 operational projects in some of the harshest conditions in North America."
            footer={
              <Button variant="ghost" href="/projects" trailingIcon>
                See the projects
              </Button>
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
