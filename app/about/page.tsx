import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { Button, EyebrowLabel, CertBadge } from "@/components/atoms";
import { Video, HeroMedia, Image } from "@/components/media";
import {
  CTABlock,
  CalloutBlock,
  Breadcrumbs,
  Timeline,
  LogoStrip,
  StatBlock,
} from "@/components/blocks";
import { company } from "@/content/company";
import { companyTimeline } from "@/content/timeline";
import { customerLogos, partnerLogos } from "@/content/partners";
import { certifications } from "@/content/certifications";

export const metadata: Metadata = {
  title: "About — Eneon ES",
  description:
    "Eneon ES is a Calgary-based battery energy storage company engineering systems for microgrids, utilities, and commercial projects across North America.",
};

const aboutStats = [
  { value: "13", unit: "", label: "Projects Deployed" },
  { value: "85", unit: "MWh", label: "Capacity Online" },
  { value: "20", unit: "yr", label: "Service Life" },
  { value: "100", unit: "%", label: "Canadian-Engineered" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
        </Container>
      </Section>

      <section className="hairline-b">
        <HeroMedia height="lg" gradient="bottom" grain>
          <div className="absolute inset-0">
            <Video
              alt="Eneon ES field operations and engineering"
              sources={[
                { src: "/videos/experience.webm", type: "video/webm" },
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
                <EyebrowLabel number={1} tone="ink">About Eneon ES</EyebrowLabel>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-white">
                  {company.origin.label}.
                </h1>
                <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-white/70">
                  {company.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/team"
                    trailingIcon
                  >
                    Meet the Team
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href="/projects"
                    className="text-white border-white/30 hover:bg-white hover:text-[var(--color-navy-500)]"
                  >
                    See Our Projects
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </HeroMedia>
      </section>

      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <StatBlock stats={aboutStats} columns={4} size="xl" />
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <EyebrowLabel number={2}>Mission</EyebrowLabel>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] leading-[1.05] text-[var(--color-navy-500)]">
                {company.mission}
              </h2>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Our culture"
            eyebrowNumber={3}
            title="Engineering energy, together."
            description="From our Calgary fabrication shop to industry events across North America — the people and places behind every deployment."
            align="start"
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="col-span-2 row-span-2">
              <Image
                src="/images/gallery/tradeshow-01.jpg"
                alt="Eneon ES team at an industry tradeshow"
                ratio="square"
                treatment="ink-wash"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <Image
              src="/images/gallery/office-01.webp"
              alt="Eneon ES office workspace"
              ratio="square"
              treatment="ink-wash"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <Image
              src="/images/gallery/office-02.webp"
              alt="Eneon engineering and design workspace"
              ratio="square"
              treatment="ink-wash"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <Image
              src="/images/gallery/office-03.jpeg"
              alt="Eneon ES team working on BESS systems"
              ratio="square"
              treatment="ink-wash"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <Image
              src="/images/misc/collaborative-approach.jpg"
              alt="Collaborative engineering approach at Eneon ES"
              ratio="square"
              treatment="ink-wash"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="History"
            eyebrowNumber={4}
            title="Built on a field record."
            description="Milestones from the founding of Eneon ES to today."
            align="start"
          />
          <div className="mt-16">
            <Timeline entries={companyTimeline} orientation="vertical" />
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <SectionHeader
            eyebrow="Customers"
            eyebrowNumber={5}
            title="Communities and operators we serve."
            align="start"
          />
          <div className="mt-16 flex flex-col gap-10">
            <LogoStrip
              logos={customerLogos}
              heading="Deployments across North America"
            />
            <LogoStrip
              logos={partnerLogos}
              heading="Corporate family"
            />
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="md" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <EyebrowLabel number={6}>Safety & Compliance</EyebrowLabel>
              <h3 className="mt-4 text-2xl md:text-3xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
                Certified where it counts.
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

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CalloutBlock
              tone="ink"
              eyebrow="Where we work"
              title={`Headquartered in ${company.headquarters.line}.`}
              body={company.origin.description}
              footer={
                <span className="label-mono text-white/60">
                  {company.legalName} · {company.contact.email}
                </span>
              }
            />
            <Image
              src="/images/misc/eneon-map.png"
              alt="Eneon ES project deployment map across North America"
              ratio="4/3"
              treatment="tinted"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Get in touch"
            title="Let's engineer your storage project."
            description="Questions about our platform, team, or company? Reach out directly."
            primary={{ label: "Contact Us", href: "/contact" }}
            secondary={{ label: "Open Positions", href: "/careers" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
