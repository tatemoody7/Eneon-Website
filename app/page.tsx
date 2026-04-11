export default function Home() {
  return (
    <main className="min-h-screen bg-blueprint flex items-center justify-center px-8">
      <div className="max-w-4xl w-full hairline bg-[var(--color-surface-raised)] p-12">
        <p className="label-mono text-[var(--color-navy-400)]">
          Eneon ES / Step 2 — Design Tokens
        </p>
        <div className="h-px bg-[var(--line)] my-6" />
        <h1 className="text-6xl md:text-7xl font-medium text-[var(--color-navy-500)]">
          Energy storage,
          <br />
          engineered.
        </h1>
        <p className="mt-8 text-lg text-[var(--color-paper-600)] max-w-xl leading-relaxed">
          Tokens, hairlines, blueprint grid, and display type are wired.
          Next: atomic components.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-px bg-[var(--line)] hairline">
          <div className="bg-[var(--color-surface-raised)] p-6">
            <p className="label-mono text-[var(--color-navy-400)]">Capacity</p>
            <p className="stat-digit text-5xl mt-2 text-[var(--color-navy-500)]">
              250<span className="text-xl ml-1">MWh</span>
            </p>
          </div>
          <div className="bg-[var(--color-surface-raised)] p-6">
            <p className="label-mono text-[var(--color-navy-400)]">Uptime</p>
            <p className="stat-digit text-5xl mt-2 text-[var(--color-navy-500)]">
              99.95<span className="text-xl ml-1">%</span>
            </p>
          </div>
          <div className="bg-[var(--color-surface-raised)] p-6">
            <p className="label-mono text-[var(--color-navy-400)]">Projects</p>
            <p className="stat-digit text-5xl mt-2 text-[var(--color-navy-500)]">
              13
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
