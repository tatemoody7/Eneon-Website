import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";
import { Breadcrumbs, CTABlock } from "@/components/blocks";
import { ConnectDashboard } from "@/components/blocks/ConnectDashboard";
import { FadeIn, HeroReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Eneon Connect — Live BESS Telemetry & Dispatch",
  description:
    "Cell-level telemetry, 24-hour dispatch, augmentation modeling, and alarm triage — the operator console for every Eneon FlexBlock site.",
};

export default function ConnectPage() {
  return (
    <PageShell>
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

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <HeroReveal className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Connect / Operator Console</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Every cell. Every second.
              <br />
              <span className="text-[var(--color-paper-600)]">
                One console.
              </span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              Eneon Connect is the software that ships with every FlexBlock
              site — real-time telemetry, scheduled dispatch, capacity
              augmentation modeling, and warranty-grade analytics. This is the
              actual UI your operator sees.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/quote" variant="primary" trailingIcon>
                Request a Demo
              </Button>
              <Button href="/grid-response" variant="secondary">
                See Grid Response
              </Button>
            </div>
          </HeroReveal>
        </Container>
      </Section>

      {/* ─── Dashboard ────────────────────────────────────────────── */}
      <Section tone="ink" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-4 pb-6">
              <div className="flex flex-col gap-2">
                <EyebrowLabel number={2} tone="ink">
                  Live Environment
                </EyebrowLabel>
                <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em] text-white">
                  Interactive console demo.
                </h2>
              </div>
              <span className="label-mono text-white/50">
                Demo data · production parity
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ConnectDashboard />
          </FadeIn>
        </Container>
      </Section>

      {/* ─── Capability strip ─────────────────────────────────────── */}
      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <FadeIn>
            <div className="flex flex-col gap-2 max-w-2xl mb-10">
              <EyebrowLabel number={3}>Capabilities</EyebrowLabel>
              <h2 className="text-3xl md:text-4xl font-medium tracking-[-0.03em] text-[var(--color-navy-500)]">
                What ships with every site.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] hairline">
              {[
                {
                  n: "01",
                  t: "Cell-level telemetry",
                  d: "Voltage, temperature, and SOC per cell. 192 cells per rack, logged every second.",
                },
                {
                  n: "02",
                  t: "24-hour dispatch",
                  d: "Drag charge/discharge blocks or let Connect optimize for peak, frequency, or arbitrage.",
                },
                {
                  n: "03",
                  t: "Augmentation modeling",
                  d: "Project 20-year retention with and without mid-life augmentation — live from fleet data.",
                },
                {
                  n: "04",
                  t: "Round-trip analytics",
                  d: "Efficiency, cycle count, and warranty position benchmarked against spec.",
                },
                {
                  n: "05",
                  t: "Alarm triage",
                  d: "Critical/warn/info routing with code-level diagnostics and escalation history.",
                },
                {
                  n: "06",
                  t: "Multi-site rollup",
                  d: "One login, every operational site. Compare fleets, aggregate dispatch, export reports.",
                },
              ].map((c) => (
                <div
                  key={c.n}
                  className="bg-[var(--color-surface-raised)] p-6 md:p-8 flex flex-col gap-4"
                >
                  <span className="stat-digit text-4xl text-[var(--color-accent-600)]">
                    {c.n}
                  </span>
                  <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
                    {c.t}
                  </h3>
                  <p className="text-[var(--color-paper-600)] leading-relaxed">
                    {c.d}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <FadeIn>
            <CTABlock
              tone="ink"
              eyebrow="Operate"
              title="Put Connect on your operator's screen."
              description="Every FlexBlock ships with Connect. We size, deploy, and tune — your team dispatches."
              primary={{ label: "Request a Demo", href: "/quote" }}
              secondary={{ label: "See the Hardware", href: "/product" }}
            />
          </FadeIn>
        </Container>
      </Section>
    </PageShell>
  );
}
