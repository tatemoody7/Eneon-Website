import {
  PageShell,
  Section,
  Container,
} from "@/components/layout";
import { Button, EyebrowLabel } from "@/components/atoms";

export default function NotFound() {
  return (
    <PageShell>
      <Section tone="paper" padding="xl" blueprint>
        <Container>
          <div className="flex flex-col gap-10 max-w-3xl">
            <EyebrowLabel number={404}>Error</EyebrowLabel>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[0.98] text-[var(--color-navy-500)]">
              Page not found.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-paper-600)]">
              The page you&apos;re looking for doesn&apos;t exist, was moved,
              or was never built. Try one of the routes below.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/" trailingIcon>
                Back to Home
              </Button>
              <Button variant="secondary" size="lg" href="/projects">
                Projects
              </Button>
              <Button variant="ghost" size="lg" href="/contact">
                Contact
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
