import type { Metadata } from "next";
import {
  Activity,
  BellRing,
  BarChart3,
  Radio,
  ShieldCheck,
  Cloud,
  Cpu,
  Gauge,
} from "lucide-react";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";
import { Image, Video, HeroMedia } from "@/components/media";
import {
  FeatureGrid,
  CalloutBlock,
  CTABlock,
  Breadcrumbs,
  StatBlock,
} from "@/components/blocks";
import { connect } from "@/content/product";

export const metadata: Metadata = {
  title: "Eneon Connect — The Software Platform",
  description:
    "The software layer that ships with every Eneon BESS. Cell-level telemetry, remote dispatch, analytics, and alerting.",
};

const moduleIcons = [Activity, Radio, BarChart3, BellRing];

const integrationFeatures = [
  {
    icon: Cloud,
    title: "Cloud or on-prem",
    description:
      "Deploy Eneon Connect as a managed cloud service or inside your own SCADA environment. Same interface, same telemetry, same APIs.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Role-based access, audit logging, encrypted transport, and SSO integration with your existing identity provider.",
  },
  {
    icon: Cpu,
    title: "EMS-ready",
    description:
      "Hand off control to your preferred EMS or run Eneon Connect as the primary controller. Modbus TCP, DNP3, and REST API.",
  },
  {
    icon: Gauge,
    title: "Cell-level visibility",
    description:
      "Every cell, every module, every rack — voltage, temperature, and state-of-charge streamed at full resolution.",
  },
];

const telemetryStats = [
  { value: "1", unit: "sec", label: "Telemetry Resolution" },
  { value: "100", unit: "%", label: "Cell-Level Coverage" },
  { value: "24/7", unit: "", label: "Monitored Operation" },
  { value: "∞", unit: "", label: "Historical Retention" },
];

export default function ConnectPage() {
  return (
    <PageShell>
      {/* ─── Breadcrumbs ─────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Product", href: "/product" },
              { label: "Eneon Connect" },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Hero (ink + video) ──────────────────────────────────────── */}
      <section className="hairline-b">
        <HeroMedia height="lg" gradient="bottom" grain>
          <div className="absolute inset-0">
            <Video
              alt="Abstract particle wave visualization"
              sources={[
                { src: "/videos/particle-wave.webm", type: "video/webm" },
                { src: "/videos/particle-wave.mp4", type: "video/mp4" },
              ]}
              poster="/videos/particle-wave-poster.jpg"
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
              <div className="flex flex-col gap-10 max-w-5xl py-24 md:py-32">
                <EyebrowLabel number={1} tone="ink">
                  The Software Platform
                </EyebrowLabel>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-white">
                  {connect.name}.<br />
                  {connect.tagline}
                </h1>
                <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-white/70">
                  {connect.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ink" size="lg" href="/quote" trailingIcon>
                    Request a Demo
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href="/product"
                    className="text-white border-white/30 hover:bg-white hover:text-[var(--color-navy-500)]"
                  >
                    Back to Product
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </HeroMedia>
      </section>

      {/* ─── Telemetry stats ─────────────────────────────────────────── */}
      <Section tone="ink" padding="sm" hairlineBottom>
        <Container>
          <StatBlock stats={telemetryStats} columns={4} size="xl" tone="ink" />
        </Container>
      </Section>

      {/* ─── 4 Modules ──────────────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="The four modules"
            eyebrowNumber={2}
            title="Monitor. Dispatch. Analyze. Alert."
            description="Four modules that work together as one operational surface. Observable from the cloud, exportable to your stack."
            align="start"
          />
          <div className="mt-16">
            <FeatureGrid
              features={connect.modules.map((m, i) => ({
                icon: moduleIcons[i],
                title: m.title,
                description: m.description,
              }))}
              columns={4}
            />
          </div>
        </Container>
      </Section>

      {/* ─── Interface screenshot placeholder ───────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <EyebrowLabel number={3}>The interface</EyebrowLabel>
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                Every cell. Every moment. One pane of glass.
              </h2>
              <p className="text-lg leading-relaxed text-[var(--color-paper-600)] max-w-xl">
                Eneon Connect streams telemetry from every cell in the system
                at one-second resolution. Dispatch commands, schedule
                charge/discharge windows, and hand off to an EMS — all from a
                single interface.
              </p>
              <Button
                variant="primary"
                href="/quote"
                trailingIcon
                className="self-start mt-2"
              >
                Request a Demo
              </Button>
            </div>
            <div className="lg:col-span-7">
              <Image
                alt="Eneon Connect intelligent controls interface"
                src="/images/product/intelligent-controls.webp"
                ratio="16/9"
                treatment="ink-wash"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Integration features ────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Integration"
            eyebrowNumber={4}
            title="Built to plug into your operations."
            description="Eneon Connect works with your existing stack — not against it."
            align="start"
          />
          <div className="mt-16">
            <FeatureGrid features={integrationFeatures} columns={4} />
          </div>
        </Container>
      </Section>

      {/* ─── Protocol callout ───────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <CalloutBlock
            tone="ink"
            eyebrow="Protocols & APIs"
            title="Modbus TCP. DNP3. REST. Webhooks. MQTT."
            body="Connect to your SCADA, your EMS, your ticketing system. Export historical data for warranty tracking, regulatory reporting, or your own analytics pipeline."
            footer={
              <span className="label-mono text-white/60">
                Eneon Connect — API documentation available on request
              </span>
            }
          />
        </Container>
      </Section>

      {/* ─── Final CTA ──────────────────────────────────────────────── */}
      <Section tone="raised" padding="lg">
        <Container>
          <CTABlock
            tone="default"
            eyebrow="See it live"
            title="Walk through Eneon Connect with an engineer."
            description="We'll show you a live deployment, pulled from a real operational system. One business day turnaround on demo requests."
            primary={{ label: "Request a Demo", href: "/quote" }}
            secondary={{ label: "Back to Product", href: "/product" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
