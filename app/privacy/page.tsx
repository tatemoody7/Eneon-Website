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
              Last updated: {"{TODO: date}"}
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
                {"{TODO: describe information collected through forms, email, and website analytics}"}
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                How we use your information
              </h2>
              <p>{"{TODO: describe data use}"}</p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Data retention
              </h2>
              <p>{"{TODO: retention policy}"}</p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                Your rights
              </h2>
              <p>{"{TODO: data subject rights}"}</p>
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
