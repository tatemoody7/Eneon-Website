import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";
import { Image } from "@/components/media";
import { Breadcrumbs, CTABlock } from "@/components/blocks";
import { GridWaveform } from "@/components/blocks/GridWaveform";
import { BlockConfigurator } from "@/components/blocks/BlockConfigurator";
import { ProjectCard } from "@/components/blocks/ProjectCard";
import { FadeIn, HeroReveal } from "@/components/motion";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Grid Response Theater — Eneon ES",
  description:
    "Sub-38 ms dispatch, live on your grid. Watch the Eneon FlexBlock BESS respond to a frequency event, then size the system that keeps your load online.",
};

export default function GridResponsePage() {
  const featured = projects.slice(0, 3);

  const stats = [
    { k: "Fleet Capacity", v: "85", u: "MWh" },
    { k: "Operational Sites", v: "13", u: "+" },
    { k: "Service Life", v: "20", u: "yr" },
    { k: "Round-Trip Efficiency", v: "≥88", u: "%" },
  ];

  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Product", href: "/product" },
              { label: "Grid Response" },
            ]}
          />
        </Container>
      </Section>

      {/* ─── Hero: dark blueprint with live waveform ───────────────── */}
      <Section tone="ink" padding="xl" blueprint hairlineBottom>
        <Container>
          <HeroReveal className="flex flex-col gap-12">
            <div className="flex flex-col gap-8 max-w-4xl">
              <div className="flex items-center gap-3 label-mono text-white/60">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[var(--color-accent-500)] animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-500)]" />
                </span>
                <span>Theater / Live Telemetry Demo</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[88px] font-medium tracking-[-0.035em] leading-[0.98] text-white">
                Sub-38 ms dispatch.
                <br />
                <span className="text-[var(--color-accent-400)]">
                  Live on your grid.
                </span>
              </h1>
              <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-white/70">
                Click simulate. Watch an Eneon FlexBlock BESS detect a
                frequency event, ramp to full power, and stabilize the bus —
                faster than a relay can close. This is what arrives at your
                site.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="ink" href="/quote" trailingIcon>
                  Request Engagement
                </Button>
                <Button
                  variant="secondary"
                  href="/sizing-tool"
                  className="border-white text-white hover:bg-white hover:text-[var(--color-navy-500)]"
                >
                  Size My System
                </Button>
              </div>
            </div>

            <GridWaveform />
          </HeroReveal>
        </Container>
      </Section>

      {/* ─── Stat strip ────────────────────────────────────────────── */}
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)]">
            {stats.map((s) => (
              <div
                key={s.k}
                className="flex flex-col gap-2 bg-[var(--color-surface-base)] p-6 md:p-8"
              >
                <span className="label-mono text-[var(--color-paper-500)]">
                  {s.k}
                </span>
                <span className="stat-digit text-5xl md:text-6xl text-[var(--color-navy-500)]">
                  {s.v}
                  <span className="ml-2 text-base text-[var(--color-accent-600)]">
                    {s.u}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── Configurator ──────────────────────────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-6 hairline-b pb-6">
              <div className="flex flex-col gap-3 max-w-2xl">
                <EyebrowLabel number={2}>Configure / FlexBlock</EyebrowLabel>
                <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.02] text-[var(--color-navy-500)]">
                  One block. One megawatt-hour.
                  <br />
                  <span className="text-[var(--color-paper-600)]">
                    Stack until the math clears.
                  </span>
                </h2>
              </div>
              <span className="label-mono text-[var(--color-paper-500)]">
                2.0 MWh / block · 500 kW / block · 2 blocks / container
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12">
              <BlockConfigurator />
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Telemetry preview strip ───────────────────────────────── */}
      <Section tone="ink" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-6 pb-8 hairline-ink-b">
              <div className="flex flex-col gap-3 max-w-xl">
                <EyebrowLabel number={3} tone="ink">
                  Connect / Telemetry
                </EyebrowLabel>
                <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.02] text-white">
                  Every cell visible.
                  <br />
                  <span className="text-white/60">Every second logged.</span>
                </h2>
              </div>
              <Button
                href="/connect"
                variant="ink"
                trailingIcon
                className="self-end"
              >
                Open Connect
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
              <TelemetryTile
                label="State of Charge"
                value="72.4"
                unit="%"
                bars={[62, 68, 72, 74, 73, 72, 70, 69, 67, 71, 74, 76]}
              />
              <TelemetryTile
                label="Max Cell Delta"
                value="12"
                unit="mV"
                bars={[18, 16, 14, 13, 12, 12, 11, 12, 13, 12, 12, 10]}
                accent
              />
              <TelemetryTile
                label="Thermal Headroom"
                value="18.2"
                unit="°C"
                bars={[20, 19, 19, 18, 18, 17, 18, 19, 19, 18, 18, 18]}
              />
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Selected projects ─────────────────────────────────────── */}
      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-6 hairline-b pb-6">
              <div className="flex flex-col gap-3">
                <EyebrowLabel number={4}>Selected / Theater</EyebrowLabel>
                <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.03em] text-[var(--color-navy-500)]">
                  Already responding, at grid scale.
                </h2>
              </div>
              <Button href="/projects" variant="secondary" trailingIcon>
                All Projects
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((p) => (
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

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <Section tone="raised" padding="lg">
        <Container>
          <FadeIn>
            <CTABlock
              tone="accent"
              eyebrow="Engage"
              title="Bring the theater to your site."
              description="We size, deploy, and dispatch. You watch the meter settle."
              primary={{ label: "Request a Quote", href: "/quote" }}
              secondary={{ label: "Run the Sizing Tool", href: "/sizing-tool" }}
            />
          </FadeIn>
        </Container>
      </Section>
    </PageShell>
  );
}

function TelemetryTile({
  label,
  value,
  unit,
  bars,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  bars: number[];
  accent?: boolean;
}) {
  const max = Math.max(...bars);
  const min = Math.min(...bars);
  return (
    <div className="flex flex-col gap-5 bg-[var(--color-navy-700)] p-6 md:p-8">
      <div className="flex items-center justify-between">
        <span className="label-mono text-white/50">{label}</span>
        <span className="label-mono text-white/30">LIVE</span>
      </div>
      <span
        className={
          "stat-digit text-5xl " +
          (accent ? "text-[var(--color-accent-400)]" : "text-white")
        }
      >
        {value}
        <span className="text-sm ml-2 opacity-60">{unit}</span>
      </span>
      <div className="flex items-end gap-1 h-16">
        {bars.map((b, i) => {
          const h = ((b - min + 1) / (max - min + 1)) * 100;
          return (
            <div
              key={i}
              className={
                "flex-1 transition-all " +
                (accent
                  ? "bg-[var(--color-accent-500)]/80"
                  : "bg-white/70")
              }
              style={{ height: `${Math.max(10, h)}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
