import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { EyebrowLabel } from "@/components/atoms";
import { Breadcrumbs } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Terms of Use — Eneon ES",
  description: "Terms governing use of the Eneon ES website.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <EyebrowLabel number={1}>Legal</EyebrowLabel>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Terms of Use
            </h1>
            <p className="label-mono text-[var(--color-paper-500)]">
              Last updated: April 2026
            </p>
            <p className="text-base text-[var(--color-paper-600)]">
              These terms are a working draft pending review by Eneon ES legal
              counsel. For authoritative guidance, contact info@eneon-es.com.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="raised" padding="lg">
        <Container width="narrow">
          <article className="flex flex-col gap-10 text-lg leading-relaxed text-[var(--color-navy-500)]">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Acceptance of terms
              </h2>
              <p>
                By accessing or using eneon-es.com you agree to these Terms of
                Use and to the site&rsquo;s Privacy Policy. If you do not agree
                with any part of these terms you should not use the site.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Intellectual property
              </h2>
              <p>
                All content on this site — including copy, imagery, product
                specifications, diagrams, and the Eneon and Eneon Connect
                trademarks — is the property of Eneon ES Inc. or its licensors
                and is protected under Canadian, US, and international
                intellectual property law. You may not reproduce, redistribute,
                or use the content for commercial purposes without prior
                written consent.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Disclaimers
              </h2>
              <p>
                Information on this site is provided for general engineering
                and commercial reference only. Product specifications are
                subject to change without notice and may not reflect
                site-specific engineering. Any data sheet, quotation, or
                performance figure issued directly by Eneon ES takes precedence
                over the content shown here.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, Eneon ES Inc. and its
                parent company, US Clean Energy, will not be liable for any
                indirect, incidental, consequential, or special damages arising
                out of your use of, or inability to use, this website.
              </p>
            </section>
          </article>
        </Container>
      </Section>
    </PageShell>
  );
}
