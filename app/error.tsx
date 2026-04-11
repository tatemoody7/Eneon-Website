"use client";

import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageShell>
      <Section tone="paper" padding="xl" blueprint>
        <Container>
          <div className="flex flex-col gap-10 max-w-3xl">
            <EyebrowLabel number={500}>Error</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Something went wrong.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              We hit an unexpected error. Try again, or head back to the home
              page. If this keeps happening, email info@eneon-es.com.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" onClick={() => reset()}>
                Try Again
              </Button>
              <Button variant="secondary" size="lg" href="/">
                Back to Home
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
