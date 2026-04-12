import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { EyebrowLabel } from "@/components/atoms";
import {
  TeamCard,
  CTABlock,
  Breadcrumbs,
} from "@/components/blocks";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Team — Eneon ES",
  description:
    "The senior engineers and field specialists building Eneon ES from Calgary, Alberta.",
};

export default function TeamPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Team" },
            ]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Team</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              A senior team. Calgary-based.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              Eneon ES is built by engineers, operators, and field specialists
              with decades of combined experience in power electronics,
              controls, and remote deployment.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Leadership"
            eyebrowNumber={2}
            title="The people leading Eneon ES."
            align="start"
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <TeamCard
                key={m.slug}
                name={m.name}
                title={m.title}
                department={m.department}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Join us"
            title="Engineer for the 20-year view, not the quarterly demo."
            description="We build systems for sites where a truck roll costs a week. That discipline shows up in every decision we make — from cell chemistry to cable routing. If you care about doing storage right — not fast — we'd love to hear from you."
            primary={{ label: "Open Positions", href: "/careers" }}
            secondary={{ label: "Contact Us", href: "/contact" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
