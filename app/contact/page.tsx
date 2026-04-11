import type { Metadata } from "next";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { EyebrowLabel, Hairline } from "@/components/atoms";
import { Breadcrumbs } from "@/components/blocks";
import { ContactForm } from "@/components/forms";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Contact — Eneon ES",
  description:
    "Get in touch with the Eneon ES team. Reply within one business day.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 flex flex-col gap-10">
              <EyebrowLabel number={1}>Contact</EyebrowLabel>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
                Let&apos;s talk.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
                Project questions, press, partnerships, general inquiries —
                fill out the form and we&apos;ll route it to the right person.
              </p>
              <Hairline />
              <div className="flex flex-col gap-6">
                <div>
                  <p className="label-mono text-[var(--color-paper-500)]">
                    Email
                  </p>
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="text-xl font-medium text-[var(--color-navy-500)] hover:text-[var(--color-accent-700)]"
                  >
                    {company.contact.email}
                  </a>
                </div>
                <div>
                  <p className="label-mono text-[var(--color-paper-500)]">
                    Headquarters
                  </p>
                  <p className="text-xl font-medium text-[var(--color-navy-500)]">
                    {company.headquarters.line}
                  </p>
                </div>
                <div>
                  <p className="label-mono text-[var(--color-paper-500)]">
                    Reply time
                  </p>
                  <p className="text-xl font-medium text-[var(--color-navy-500)]">
                    Within 1 business day
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="border border-[var(--line-strong)] bg-[var(--color-surface-raised)] p-8 md:p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
