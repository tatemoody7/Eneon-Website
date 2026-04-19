"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  STATE                                                                     */
/* -------------------------------------------------------------------------- */

type Application =
  | "peak-shaving"
  | "solar-firming"
  | "microgrid"
  | "backup"
  | "arbitrage"
  | "frequency";

type GridType = "utility" | "behind-meter" | "off-grid";
type Climate = "cold" | "temperate" | "hot";
type Commissioning = "Q1-2026" | "Q2-2026" | "Q3-2026" | "Q4-2026";

type FormData = {
  application: Application | null;
  gridType: GridType | null;
  peakKw: number;
  dailyKwh: number;
  durationHrs: number;
  reductionPct: number;
  demandRate: number;
  energyRate: number;
  peakRate: number;
  offpeakRate: number;
  location: string;
  siteName: string;
  climate: Climate | null;
  commissioning: Commissioning | null;
};

const DEFAULT: FormData = {
  application: null,
  gridType: null,
  peakKw: 1000,
  dailyKwh: 6000,
  durationHrs: 4,
  reductionPct: 50,
  demandRate: 18,
  energyRate: 0.12,
  peakRate: 0.22,
  offpeakRate: 0.07,
  location: "",
  siteName: "",
  climate: null,
  commissioning: null,
};

const APPLICATIONS: { id: Application; title: string; desc: string }[] = [
  {
    id: "peak-shaving",
    title: "Peak Shaving",
    desc: "Reduce demand charges during utility peak hours",
  },
  {
    id: "solar-firming",
    title: "Solar + Storage",
    desc: "Firm PV output and extend into evening delivery",
  },
  {
    id: "microgrid",
    title: "Microgrid",
    desc: "Off-grid or islanded community / industrial load",
  },
  {
    id: "backup",
    title: "Backup Power",
    desc: "Critical load ride-through during outages",
  },
  {
    id: "arbitrage",
    title: "Energy Arbitrage",
    desc: "Charge off-peak, discharge into peak tariffs",
  },
  {
    id: "frequency",
    title: "Frequency Response",
    desc: "Grid-services revenue from regulation markets",
  },
];

const GRID_TYPES: { id: GridType; title: string; desc: string }[] = [
  {
    id: "utility",
    title: "Utility-scale",
    desc: "Front-of-the-meter interconnection",
  },
  {
    id: "behind-meter",
    title: "Behind-the-meter",
    desc: "On your side of the revenue meter",
  },
  {
    id: "off-grid",
    title: "Off-grid / Microgrid",
    desc: "Islanded or remote with optional grid tie",
  },
];

const CLIMATES: { id: Climate; title: string; desc: string }[] = [
  { id: "cold", title: "Cold", desc: "Below −20 °C winters" },
  { id: "temperate", title: "Temperate", desc: "−20 to +35 °C" },
  { id: "hot", title: "Hot", desc: "Above +35 °C summers" },
];

const COMMISSIONING: Commissioning[] = [
  "Q1-2026",
  "Q2-2026",
  "Q3-2026",
  "Q4-2026",
];

/* -------------------------------------------------------------------------- */
/*  ENGINE                                                                    */
/* -------------------------------------------------------------------------- */

const MWH_PER_BLOCK = 2.0;
const MW_PER_BLOCK = 0.5;
const MAX_BLOCKS = 13;
const COST_PER_KWH = 380;

function computeSizing(d: FormData) {
  const energyNeededKwh = d.peakKw * d.durationHrs;
  const powerNeededKw = d.peakKw * (d.reductionPct / 100);

  const blocksByEnergy = Math.ceil(energyNeededKwh / (MWH_PER_BLOCK * 1000));
  const blocksByPower = Math.ceil(powerNeededKw / (MW_PER_BLOCK * 1000));
  const blocks = Math.max(
    1,
    Math.min(MAX_BLOCKS, Math.max(blocksByEnergy, blocksByPower)),
  );

  const capMwh = blocks * MWH_PER_BLOCK;
  const powerMw = blocks * MW_PER_BLOCK;
  const containers = Math.ceil(blocks / 2);

  const systemCost = capMwh * 1000 * COST_PER_KWH;

  // Annual savings
  const demandSavings =
    (powerNeededKw * d.demandRate * 12) * (d.reductionPct / 100);
  const arbitrageSavings =
    (d.dailyKwh * (d.peakRate - d.offpeakRate) * 365) *
    Math.min(1, capMwh * 1000 / Math.max(1, d.dailyKwh));
  const annualSavings = demandSavings + arbitrageSavings;

  // 20-yr NPV at 5%
  const r = 0.05;
  let npv = -systemCost;
  for (let y = 1; y <= 20; y++) {
    npv += annualSavings / Math.pow(1 + r, y);
  }
  const paybackYrs = annualSavings > 0 ? systemCost / annualSavings : Infinity;

  return {
    blocks,
    capMwh,
    powerMw,
    containers,
    systemCost,
    annualSavings,
    demandSavings,
    arbitrageSavings,
    paybackYrs,
    npv,
    duration: capMwh / powerMw,
  };
}

/* -------------------------------------------------------------------------- */
/*  WIZARD                                                                    */
/* -------------------------------------------------------------------------- */

export function SizingWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<FormData>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  // localStorage persistence
  useEffect(() => {
    try {
      const s = localStorage.getItem("sz-step");
      const d = localStorage.getItem("sz-data");
      if (s) setStep(Math.max(1, Math.min(4, parseInt(s))) as 1 | 2 | 3 | 4);
      if (d) setData({ ...DEFAULT, ...JSON.parse(d) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("sz-step", String(step));
      localStorage.setItem("sz-data", JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [step, data, hydrated]);

  const canAdvance = {
    1: data.application !== null && data.gridType !== null,
    2: data.peakKw > 0 && data.dailyKwh > 0,
    3:
      data.location.trim().length > 0 &&
      data.siteName.trim().length > 0 &&
      data.climate !== null &&
      data.commissioning !== null,
    4: true,
  }[step];

  const result = useMemo(() => computeSizing(data), [data]);

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-0 border border-[var(--line)]">
        {[1, 2, 3, 4].map((s) => {
          const active = s === step;
          const done = s < step;
          const label = ["Application", "Load Profile", "Site", "Results"][
            s - 1
          ];
          return (
            <button
              key={s}
              onClick={() => {
                if (s <= step) setStep(s as 1 | 2 | 3 | 4);
              }}
              disabled={s > step}
              className={cn(
                "flex-1 relative text-left px-5 py-4 transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
                active && "bg-[var(--color-navy-500)] text-white",
                !active &&
                  done &&
                  "bg-[var(--color-paper-100)] text-[var(--color-navy-500)] hover:bg-[var(--color-paper-200)]",
                !active &&
                  !done &&
                  "bg-transparent text-[var(--color-paper-500)]",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="stat-digit text-xl">
                  {s.toString().padStart(2, "0")}
                </span>
                <span className="label-mono">{label}</span>
              </div>
              {s < 4 && (
                <span
                  aria-hidden
                  className="absolute right-0 top-0 bottom-0 w-px bg-[var(--line)]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Step content */}
      <div className="mt-10">
        {step === 1 && <Step1 data={data} setData={setData} />}
        {step === 2 && <Step2 data={data} setData={setData} />}
        {step === 3 && <Step3 data={data} setData={setData} />}
        {step === 4 && <Step4 data={data} result={result} />}
      </div>

      {/* Nav */}
      <div className="mt-12 flex items-center justify-between flex-wrap gap-4 hairline-t pt-8">
        <button
          onClick={() =>
            setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s))
          }
          disabled={step === 1}
          className="label-mono h-11 px-6 border border-[var(--color-navy-500)] text-[var(--color-navy-500)] disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--color-navy-500)] hover:text-white transition-colors"
        >
          ← Back
        </button>

        <span className="label-mono text-[var(--color-paper-500)]">
          Step {step} of 4
        </span>

        {step < 4 ? (
          <button
            onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3 | 4)}
            disabled={!canAdvance}
            className="label-mono h-11 px-6 bg-[var(--color-navy-500)] text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--color-navy-600)] transition-colors"
          >
            {step === 3 ? "Compute Sizing →" : "Continue →"}
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setData(DEFAULT);
                setStep(1);
              }}
              className="label-mono h-11 px-6 border border-[var(--color-navy-500)] text-[var(--color-navy-500)] hover:bg-[var(--color-navy-500)] hover:text-white transition-colors"
            >
              Start Over
            </button>
            <a
              href="/quote"
              className="label-mono h-11 px-6 bg-[var(--color-accent-500)] text-[var(--color-navy-500)] hover:bg-[var(--color-accent-400)] inline-flex items-center transition-colors"
            >
              Send to Engineering →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  STEPS                                                                     */
/* -------------------------------------------------------------------------- */

function Step1({
  data,
  setData,
}: {
  data: FormData;
  setData: (u: (d: FormData) => FormData) => void;
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
          What is the system for?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] hairline">
          {APPLICATIONS.map((a) => {
            const active = data.application === a.id;
            return (
              <button
                key={a.id}
                onClick={() =>
                  setData((d) => ({ ...d, application: a.id }))
                }
                aria-pressed={active}
                className={cn(
                  "text-left p-6 transition-colors flex flex-col gap-3",
                  active
                    ? "bg-[var(--color-navy-500)] text-white"
                    : "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)] hover:bg-[var(--color-paper-100)]",
                )}
              >
                <span className="label-mono opacity-60">
                  {String(APPLICATIONS.indexOf(a) + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium tracking-[-0.01em]">
                  {a.title}
                </span>
                <span
                  className={
                    "text-sm leading-relaxed " +
                    (active ? "text-white/70" : "text-[var(--color-paper-600)]")
                  }
                >
                  {a.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
          Grid topology
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] hairline">
          {GRID_TYPES.map((g) => {
            const active = data.gridType === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setData((d) => ({ ...d, gridType: g.id }))}
                aria-pressed={active}
                className={cn(
                  "text-left p-6 transition-colors flex flex-col gap-3",
                  active
                    ? "bg-[var(--color-navy-500)] text-white"
                    : "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)] hover:bg-[var(--color-paper-100)]",
                )}
              >
                <span className="text-lg font-medium tracking-[-0.01em]">
                  {g.title}
                </span>
                <span
                  className={
                    "text-sm leading-relaxed " +
                    (active ? "text-white/70" : "text-[var(--color-paper-600)]")
                  }
                >
                  {g.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step2({
  data,
  setData,
}: {
  data: FormData;
  setData: (u: (d: FormData) => FormData) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="flex flex-col gap-8">
        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
          Load profile
        </h3>

        <Field
          label="Peak demand"
          unit="kW"
          value={data.peakKw}
          onChange={(v) => setData((d) => ({ ...d, peakKw: v }))}
        />
        <Field
          label="Daily energy consumption"
          unit="kWh/day"
          value={data.dailyKwh}
          onChange={(v) => setData((d) => ({ ...d, dailyKwh: v }))}
        />

        <RangeField
          label="Target discharge duration"
          unit="hr"
          min={1}
          max={8}
          step={0.5}
          value={data.durationHrs}
          onChange={(v) => setData((d) => ({ ...d, durationHrs: v }))}
        />
        <RangeField
          label="Peak reduction target"
          unit="%"
          min={10}
          max={100}
          step={5}
          value={data.reductionPct}
          onChange={(v) => setData((d) => ({ ...d, reductionPct: v }))}
        />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
          Utility rates
        </h3>

        <Field
          label="Demand charge"
          unit="$/kW·mo"
          value={data.demandRate}
          onChange={(v) => setData((d) => ({ ...d, demandRate: v }))}
          step={0.5}
        />
        <Field
          label="Blended energy rate"
          unit="$/kWh"
          value={data.energyRate}
          onChange={(v) => setData((d) => ({ ...d, energyRate: v }))}
          step={0.01}
        />
        <Field
          label="Peak rate"
          unit="$/kWh"
          value={data.peakRate}
          onChange={(v) => setData((d) => ({ ...d, peakRate: v }))}
          step={0.01}
        />
        <Field
          label="Off-peak rate"
          unit="$/kWh"
          value={data.offpeakRate}
          onChange={(v) => setData((d) => ({ ...d, offpeakRate: v }))}
          step={0.01}
        />
      </div>
    </div>
  );
}

function Step3({
  data,
  setData,
}: {
  data: FormData;
  setData: (u: (d: FormData) => FormData) => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TextField
          label="Site name"
          value={data.siteName}
          placeholder="e.g. Mississauga Plant 2"
          onChange={(v) => setData((d) => ({ ...d, siteName: v }))}
        />
        <TextField
          label="Location"
          value={data.location}
          placeholder="City, State / Province"
          onChange={(v) => setData((d) => ({ ...d, location: v }))}
        />
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
          Climate profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] hairline">
          {CLIMATES.map((c) => {
            const active = data.climate === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setData((d) => ({ ...d, climate: c.id }))}
                aria-pressed={active}
                className={cn(
                  "text-left p-6 transition-colors flex flex-col gap-2",
                  active
                    ? "bg-[var(--color-navy-500)] text-white"
                    : "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)] hover:bg-[var(--color-paper-100)]",
                )}
              >
                <span className="text-lg font-medium">{c.title}</span>
                <span
                  className={
                    "label-mono " +
                    (active ? "text-white/60" : "text-[var(--color-paper-500)]")
                  }
                >
                  {c.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
          Target commissioning
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line)] hairline">
          {COMMISSIONING.map((q) => {
            const active = data.commissioning === q;
            return (
              <button
                key={q}
                onClick={() =>
                  setData((d) => ({ ...d, commissioning: q }))
                }
                aria-pressed={active}
                className={cn(
                  "p-6 transition-colors",
                  active
                    ? "bg-[var(--color-navy-500)] text-white"
                    : "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)] hover:bg-[var(--color-paper-100)]",
                )}
              >
                <span className="stat-digit text-2xl">{q}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step4({
  data,
  result,
}: {
  data: FormData;
  result: ReturnType<typeof computeSizing>;
}) {
  const money = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : n >= 1_000
        ? `$${(n / 1_000).toFixed(0)}K`
        : `$${n.toFixed(0)}`;

  const demandShare = result.annualSavings > 0
    ? (result.demandSavings / result.annualSavings) * 100
    : 0;
  const arbShare = 100 - demandShare;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main column */}
      <div className="lg:col-span-2 flex flex-col gap-12">
        {/* Block visualization */}
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between hairline-b pb-4">
            <div className="flex flex-col gap-2">
              <span className="label-mono text-[var(--color-paper-500)]">
                Sized configuration / {data.siteName || "Untitled site"}
              </span>
              <h3 className="text-3xl font-medium tracking-[-0.03em] text-[var(--color-navy-500)]">
                {result.blocks} FlexBlock{result.blocks > 1 ? "s" : ""} ·{" "}
                {result.containers} container
                {result.containers > 1 ? "s" : ""}
              </h3>
            </div>
            <span className="stat-digit text-6xl text-[var(--color-accent-600)]">
              {result.blocks.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-2">
            {Array.from({ length: MAX_BLOCKS }).map((_, i) => {
              const active = i < result.blocks;
              return (
                <div
                  key={i}
                  aria-hidden
                  className={cn(
                    "aspect-[3/5] border relative",
                    active
                      ? "bg-[var(--color-navy-500)] border-[var(--color-navy-500)]"
                      : "bg-transparent border-[var(--line)]",
                  )}
                >
                  {active && (
                    <span className="absolute top-1 left-1 right-1 h-[2px] bg-[var(--color-accent-500)]" />
                  )}
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-1 text-center font-mono text-[10px]",
                      active
                        ? "text-white/60"
                        : "text-[var(--color-paper-400)]",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between label-mono text-[var(--color-paper-500)]">
            <span>{result.blocks} blocks active</span>
            <span>{MAX_BLOCKS - result.blocks} augmentation slots</span>
          </div>
        </div>

        {/* Spec table */}
        <div className="hairline">
          <table className="w-full">
            <tbody className="divide-y divide-[var(--line)]">
              {[
                {
                  k: "Usable capacity",
                  v: `${result.capMwh.toFixed(1)} MWh`,
                },
                {
                  k: "Continuous power",
                  v: `${result.powerMw.toFixed(1)} MW`,
                },
                {
                  k: "Duration @ rated power",
                  v: `${result.duration.toFixed(1)} hr`,
                },
                {
                  k: "Containers (40 ft)",
                  v: `${result.containers} unit${result.containers > 1 ? "s" : ""}`,
                },
                {
                  k: "Augmentation headroom",
                  v: `${MAX_BLOCKS - result.blocks} blocks / ${((MAX_BLOCKS - result.blocks) * MWH_PER_BLOCK).toFixed(1)} MWh`,
                },
                {
                  k: "System cost (CAPEX)",
                  v: money(result.systemCost),
                },
              ].map((row) => (
                <tr key={row.k}>
                  <td className="py-4 px-5 label-mono text-[var(--color-paper-500)]">
                    {row.k}
                  </td>
                  <td className="py-4 px-5 stat-digit text-xl text-[var(--color-navy-500)] text-right">
                    {row.v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Savings breakdown */}
        <div className="flex flex-col gap-4">
          <h4 className="label-mono text-[var(--color-paper-500)]">
            Annual savings composition
          </h4>
          <div className="h-4 w-full flex border border-[var(--line)]">
            <div
              className="bg-[var(--color-navy-500)]"
              style={{ width: `${demandShare}%` }}
            />
            <div
              className="bg-[var(--color-accent-500)]"
              style={{ width: `${arbShare}%` }}
            />
          </div>
          <div className="flex justify-between label-mono text-[var(--color-paper-500)]">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[var(--color-navy-500)]" />
              Demand charge reduction {money(result.demandSavings)}/yr
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[var(--color-accent-500)]" />
              Energy arbitrage {money(result.arbitrageSavings)}/yr
            </span>
          </div>
        </div>
      </div>

      {/* ROI sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="border border-[var(--color-navy-500)] bg-[var(--color-navy-500)] text-white p-8 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <span className="label-mono text-white/60">Projected ROI</span>
            <span className="label-mono text-[var(--color-accent-400)]">
              20-YR NPV
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="stat-digit text-5xl md:text-6xl">
              {money(result.npv)}
            </span>
            <span className="label-mono text-white/50">
              at 5% discount rate
            </span>
          </div>

          <div className="hairline-ink-t pt-6 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="label-mono text-white/50">Payback</span>
              <span className="stat-digit text-3xl">
                {result.paybackYrs === Infinity
                  ? "—"
                  : `${result.paybackYrs.toFixed(1)} yr`}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="label-mono text-white/50">Savings / yr</span>
              <span className="stat-digit text-3xl">
                {money(result.annualSavings)}
              </span>
            </div>
          </div>

          <p className="text-sm text-white/70 leading-relaxed hairline-ink-t pt-6">
            Preliminary model. A full Eneon engagement tunes this against your
            interval data, tariff structure, and interconnection agreement.
          </p>
        </div>
      </aside>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FIELDS                                                                    */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  unit,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-mono text-[var(--color-paper-500)]">
        {label} <span className="text-[var(--color-paper-400)]">/ {unit}</span>
      </span>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="h-12 px-4 border border-[var(--line)] bg-[var(--color-surface-raised)] stat-digit text-2xl text-[var(--color-navy-500)] focus:outline-none focus:border-[var(--color-navy-500)]"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-mono text-[var(--color-paper-500)]">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 px-4 border border-[var(--line)] bg-[var(--color-surface-raised)] text-lg text-[var(--color-navy-500)] focus:outline-none focus:border-[var(--color-navy-500)]"
      />
    </label>
  );
}

function RangeField({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="label-mono text-[var(--color-paper-500)]">{label}</span>
        <span className="stat-digit text-2xl text-[var(--color-navy-500)]">
          {value}
          <span className="text-xs ml-1 opacity-60">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[var(--color-accent-500)]"
      />
      <div className="flex justify-between label-mono text-[var(--color-paper-400)]">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}
