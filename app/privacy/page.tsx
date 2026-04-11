import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { EyebrowLabel } from "@/components/atoms";
import { Breadcrumbs } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Privacy Policy — Eneon ES",
  description: "How Eneon ES collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <EyebrowLabel number={1}>Legal</EyebrowLabel>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Privacy Policy
            </h1>
            <p className="label-mono text-[var(--color-paper-500)]">
              Last updated: April 2026
            </p>
            <p className="text-base text-[var(--color-paper-600)]">
              This policy is a working draft pending review by Eneon ES legal
              counsel. For authoritative guidance on how your information is
              handled, contact info@eneon-es.com.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container width="narrow">
          <article className="flex flex-col gap-10 text-lg leading-relaxed text-[var(--color-navy-500)]">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Information we collect
              </h2>
              <p>
                Eneon ES collects only the information you voluntarily provide
                when you request a quote, contact our team, or subscribe to
                updates — typically your name, company, email address, and a
                brief description of your project. We also collect basic
                server-side analytics (page views, browser type, approximate
                location) through a privacy-respecting analytics provider.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                How we use your information
              </h2>
              <p>
                We use the information you submit to respond to your inquiry,
                scope potential projects, and send follow-up communication you
                have explicitly requested. We do not sell your personal
                information to third parties and do not share it with any party
                outside Eneon ES and its parent company, US Clean Energy,
                except where required to deliver a contracted project.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Data retention
              </h2>
              <p>
                Contact-form submissions are retained as long as necessary to
                respond to your inquiry and for a reasonable follow-up period
                thereafter. Analytics data is retained in aggregated form for
                product and marketing review. You may request deletion of your
                personal data at any time by emailing info@eneon-es.com.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Your rights
              </h2>
              <p>
                Depending on your jurisdiction, you may have the right to
                access, correct, export, or delete the personal information we
                hold about you, and to withdraw consent for any ongoing
                processing. Contact info@eneon-es.com to exercise any of these
                rights.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Contact
              </h2>
              <p>
                Questions about this policy? Email us at{" "}
                <a
                  href="mailto:info@eneon-es.com"
                  className="underline hover:text-[var(--color-accent-700)]"
                >
                  info@eneon-es.com
                </a>
                .
              </p>
            </section>
          </article>
        </Container>
      </Section>
    </PageShell>
  );
}
