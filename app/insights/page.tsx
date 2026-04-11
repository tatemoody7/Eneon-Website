import type { Metadata } from "next";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PageShell,
  Section,
  Container,
  SectionHeader,
} from "@/components/layout";
import { EyebrowLabel, Icon, Tag } from "@/components/atoms";
import { CTABlock, Breadcrumbs } from "@/components/blocks";
import { insights } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights — Eneon ES",
  description:
    "Engineering deep dives, whitepapers, and case studies from the Eneon ES team.",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InsightsIndexPage() {
  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Insights" }]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container>
          <div className="flex flex-col gap-10 max-w-5xl">
            <EyebrowLabel number={1}>Insights</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Knowledge Hub.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              Engineering deep dives, whitepapers, and case studies from the
              Eneon ES team. Ungated. Built for engineers, by engineers.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg">
        <Container>
          <SectionHeader
            eyebrow="All posts"
            eyebrowNumber={2}
            title="From the field and the bench."
            align="start"
          />
          <ul className="mt-16 flex flex-col">
            {insights.map((post, i) => (
              <li key={post.slug}>
                <NextLink
                  href={`/insights/${post.slug}`}
                  className="group/row block hairline-t last:hairline-b py-10 md:py-12 transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)] hover:bg-[var(--color-surface-raised)]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-1">
                      <EyebrowLabel number={i + 1}>Post</EyebrowLabel>
                    </div>
                    <div className="lg:col-span-2">
                      <Tag tone="default">{post.category}</Tag>
                    </div>
                    <div className="lg:col-span-6 flex flex-col gap-3">
                      <h2 className="text-2xl md:text-4xl font-medium tracking-[-0.025em] leading-[1.1] text-[var(--color-navy-500)] group-hover/row:text-[var(--color-accent-700)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)]">
                        {post.title}
                      </h2>
                      <p className="text-base md:text-lg leading-relaxed text-[var(--color-paper-600)] max-w-2xl">
                        {post.summary}
                      </p>
                    </div>
                    <div className="lg:col-span-3 flex flex-col lg:items-end gap-2 label-mono text-[var(--color-paper-500)]">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readingTime} min read</span>
                      <span className="inline-flex items-center gap-2 text-[var(--color-navy-500)]">
                        Read
                        <Icon icon={ArrowUpRight} size="sm" />
                      </span>
                    </div>
                  </div>
                </NextLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineTop>
        <Container>
          <CTABlock
            tone="ink"
            blueprint
            eyebrow="Stay in the loop"
            title="New articles, field notes, and whitepapers."
            description="Get in touch if you'd like to be notified when new engineering content is published."
            primary={{ label: "Contact Us", href: "/contact" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
