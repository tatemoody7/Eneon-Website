import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { Button, EyebrowLabel, Hairline, Tag } from "@/components/atoms";
import { CTABlock, Breadcrumbs } from "@/components/blocks";
import { insights, getInsightBySlug } from "@/content/insights";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return { title: "Insight — Eneon ES" };
  return { title: `${post.title} — Eneon ES`, description: post.summary };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <Section tone="paper" padding="sm" hairlineBottom>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: post.title },
            ]}
          />
        </Container>
      </Section>

      <Section tone="paper" padding="xl" blueprint hairlineBottom>
        <Container width="narrow">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag tone="default">{post.category}</Tag>
              <span className="label-mono text-[var(--color-paper-500)]">
                {formatDate(post.date)}
              </span>
              <span className="label-mono text-[var(--color-paper-500)]">
                {post.readingTime} min read
              </span>
            </div>
            <EyebrowLabel number={1}>{post.kicker}</EyebrowLabel>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[1.02] text-[var(--color-navy-500)]">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              {post.summary}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="lg" hairlineBottom>
        <Container width="narrow">
          <article className="flex flex-col gap-6 text-lg leading-relaxed text-[var(--color-navy-500)]">
            {post.body ? (
              post.body
                .split(/\n\n+/)
                .map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))
            ) : (
              <p className="label-mono text-[var(--color-paper-500)]">
                Full article coming soon — contact info@eneon-es.com for the
                working draft.
              </p>
            )}
            <Hairline />
            {post.downloadUrl && (
              <Button variant="primary" href={post.downloadUrl} trailingIcon>
                Download PDF
              </Button>
            )}
          </article>
        </Container>
      </Section>

      <Section tone="raised" padding="lg">
        <Container>
          <CTABlock
            tone="default"
            eyebrow="More"
            title="Keep reading."
            description="Explore the rest of the Eneon ES Knowledge Hub."
            primary={{ label: "All Insights", href: "/insights" }}
            secondary={{ label: "Contact Us", href: "/contact" }}
          />
        </Container>
      </Section>
    </PageShell>
  );
}
