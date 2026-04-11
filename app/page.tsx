import {
  Button,
  CertBadge,
  EyebrowLabel,
  Hairline,
  StatDigit,
  Tag,
} from "@/components/atoms";

export default function Home() {
  return (
    <main className="min-h-screen bg-blueprint px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Atom preview wrapper */}
        <div className="hairline bg-[var(--color-surface-raised)] p-10 md:p-16">
          <EyebrowLabel number={3} tone="default">
            Atomic Components Preview
          </EyebrowLabel>

          <h1 className="mt-4 text-5xl md:text-7xl font-medium text-[var(--color-navy-500)]">
            Energy storage,
            <br />
            engineered.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-paper-600)]">
            Step 3 — atoms wired. Next: layout primitives.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="primary" trailingIcon href="/contact">
              Request a Quote
            </Button>
            <Button variant="secondary" href="/product">
              Explore Product
            </Button>
            <Button variant="ghost" href="/projects">
              View Projects
            </Button>
          </div>

          <Hairline className="my-12" />

          {/* Tags + Cert badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Tag tone="default">Microgrid</Tag>
            <Tag tone="accent">250 MWh</Tag>
            <Tag tone="ok">Deployed</Tag>
            <CertBadge code="UL 9540" label="System" />
            <CertBadge code="NFPA 855" />
          </div>

          <Hairline className="my-12" />

          {/* Stats grid */}
          <div className="grid grid-cols-1 gap-px bg-[var(--line)] hairline md:grid-cols-3">
            <div className="bg-[var(--color-surface-raised)] p-6">
              <StatDigit value="250" unit="MWh" label="Capacity" size="lg" />
            </div>
            <div className="bg-[var(--color-surface-raised)] p-6">
              <StatDigit value="99.95" unit="%" label="Uptime" size="lg" />
            </div>
            <div className="bg-[var(--color-surface-raised)] p-6">
              <StatDigit value="13" label="Projects Completed" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
