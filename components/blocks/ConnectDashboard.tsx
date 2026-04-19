"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  SITES                                                                     */
/* -------------------------------------------------------------------------- */

type Alarm = {
  id: string;
  severity: "critical" | "warn" | "info";
  site: string;
  code: string;
  message: string;
  when: string;
};

type Site = {
  id: string;
  name: string;
  location: string;
  capacity: number; // MWh
  power: number; // MW
  soc: number; // 0-100
  mode: "Charging" | "Discharging" | "Idle" | "Frequency";
  cycles: number;
  efficiency: number;
  alerts: Alarm[];
};

const SITES: Site[] = [
  {
    id: "lyon",
    name: "Lyon County AC Solar + Storage",
    location: "Lyon County, MN",
    capacity: 26.0,
    power: 6.0,
    soc: 68,
    mode: "Discharging",
    cycles: 412,
    efficiency: 89.2,
    alerts: [],
  },
  {
    id: "freetown",
    name: "Freetown Solar + Storage",
    location: "Freetown, MA",
    capacity: 21.45,
    power: 5.0,
    soc: 81,
    mode: "Charging",
    cycles: 603,
    efficiency: 88.7,
    alerts: [
      {
        id: "a1",
        severity: "warn",
        site: "Freetown",
        code: "THM-118",
        message: "Rack 04 inlet temperature trending high",
        when: "03m ago",
      },
    ],
  },
  {
    id: "beardstown",
    name: "Beardstown Solar + Storage",
    location: "Beardstown, IL",
    capacity: 11.9,
    power: 3.0,
    soc: 42,
    mode: "Frequency",
    cycles: 512,
    efficiency: 88.9,
    alerts: [
      {
        id: "b1",
        severity: "info",
        site: "Beardstown",
        code: "DSP-204",
        message: "Dispatched 1.8 MW for regulation event",
        when: "12m ago",
      },
    ],
  },
  {
    id: "waterton",
    name: "Community Grid Resiliency",
    location: "Waterton, AB",
    capacity: 5.2,
    power: 1.0,
    soc: 93,
    mode: "Idle",
    cycles: 188,
    efficiency: 89.8,
    alerts: [
      {
        id: "w1",
        severity: "critical",
        site: "Waterton",
        code: "COM-041",
        message: "Secondary comms link lost (primary OK)",
        when: "41m ago",
      },
    ],
  },
];

type TabId = "telemetry" | "dispatch" | "augmentation" | "analytics" | "alarms";

const TABS: { id: TabId; label: string; index: string }[] = [
  { id: "telemetry", label: "Telemetry", index: "01" },
  { id: "dispatch", label: "Dispatch", index: "02" },
  { id: "augmentation", label: "Augmentation", index: "03" },
  { id: "analytics", label: "Analytics", index: "04" },
  { id: "alarms", label: "Alarms", index: "05" },
];

/* -------------------------------------------------------------------------- */
/*  SHELL                                                                     */
/* -------------------------------------------------------------------------- */

export function ConnectDashboard() {
  const [siteId, setSiteId] = useState<string>(SITES[0].id);
  const [tab, setTab] = useState<TabId>("telemetry");
  const [clock, setClock] = useState<string>("");
  const site = SITES.find((s) => s.id === siteId)!;

  useEffect(() => {
    const tick = () => setClock(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-white/10 bg-[var(--color-navy-700)] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[var(--color-accent-500)] animate-ping opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-500)]" />
          </span>
          <span className="label-mono text-white/60">Eneon Connect / Live</span>
          <span className="label-mono text-white/30 hidden md:inline">
            UTC {clock || "--:--:--"}
          </span>
        </div>
        <select
          aria-label="Select site"
          value={siteId}
          onChange={(e) => setSiteId(e.target.value)}
          className="bg-transparent border border-white/20 label-mono text-white px-4 py-2 focus:outline-none focus:border-[var(--color-accent-500)]"
        >
          {SITES.map((s) => (
            <option key={s.id} value={s.id} className="text-[var(--color-navy-500)]">
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Site stat row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/10 border-b border-white/10">
        {[
          { k: "Capacity", v: site.capacity.toFixed(1), u: "MWh" },
          { k: "Power", v: site.power.toFixed(1), u: "MW" },
          { k: "SOC", v: site.soc.toString(), u: "%" },
          { k: "Mode", v: site.mode, u: "" },
          { k: "Cycles", v: site.cycles.toString(), u: "" },
        ].map((s) => (
          <div
            key={s.k}
            className="flex flex-col gap-1 bg-[var(--color-navy-700)] p-4"
          >
            <span className="label-mono text-white/40">{s.k}</span>
            <span className="stat-digit text-2xl">
              {s.v}
              {s.u && (
                <span className="text-xs ml-1 text-[var(--color-accent-400)]">
                  {s.u}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Dashboard section"
        className="flex flex-wrap gap-0 border-b border-white/10"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative flex items-center gap-3 px-5 py-4",
                "font-mono text-[11px] uppercase tracking-[0.12em]",
                "transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
                active
                  ? "text-white"
                  : "text-white/40 hover:text-white/70",
              )}
            >
              <span className="text-[var(--color-accent-500)]">{t.index}</span>
              <span>{t.label}</span>
              {t.id === "alarms" && site.alerts.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 bg-[var(--color-signal-warn)] text-[var(--color-navy-500)] text-[10px] font-medium">
                  {site.alerts.length}
                </span>
              )}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-px h-[2px]",
                  active
                    ? "bg-[var(--color-accent-500)]"
                    : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 min-h-[520px]">
        {tab === "telemetry" && <TelemetryTab site={site} />}
        {tab === "dispatch" && <DispatchTab site={site} />}
        {tab === "augmentation" && <AugmentationTab site={site} />}
        {tab === "analytics" && <AnalyticsTab site={site} />}
        {tab === "alarms" && <AlarmsTab />}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TELEMETRY TAB                                                             */
/* -------------------------------------------------------------------------- */

function TelemetryTab({ site }: { site: Site }) {
  // 192-cell heatmap seeded from site soc
  const cells = useMemo(() => {
    const arr: number[] = [];
    const seed = site.soc;
    for (let i = 0; i < 192; i++) {
      const v = seed + (Math.sin(i * 0.37) * 8 + Math.cos(i * 1.13) * 4);
      arr.push(Math.max(0, Math.min(100, v)));
    }
    return arr;
  }, [site.soc]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Cell heatmap */}
      <Panel title="Cell-Level SOC Distribution" index="01">
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: "repeat(24,minmax(0,1fr))" }}
        >
          {cells.map((v, i) => (
            <div
              key={i}
              aria-label={`Cell ${i + 1}: ${v.toFixed(0)}%`}
              className="aspect-square"
              style={{
                background: `rgba(0,212,255,${(v / 100) * 0.9 + 0.05})`,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 label-mono text-white/40">
          <span>Cell 001</span>
          <span>192 cells · Δ 12 mV</span>
          <span>Cell 192</span>
        </div>
      </Panel>

      {/* SOC curve */}
      <Panel title="48-Hour State of Charge" index="02">
        <SocCurve soc={site.soc} />
      </Panel>

      {/* Power curve */}
      <Panel title="Power Output (24h)" index="03">
        <PowerCurve powerMw={site.power} mode={site.mode} />
      </Panel>

      {/* String balancing */}
      <Panel title="String Balancing" index="04">
        <StringBalancing />
      </Panel>
    </div>
  );
}

function SocCurve({ soc }: { soc: number }) {
  const W = 600;
  const H = 200;
  const pts = useMemo(() => {
    const arr: [number, number][] = [];
    for (let i = 0; i < 96; i++) {
      const t = i / 95;
      const base =
        soc + Math.sin(t * Math.PI * 2.5) * 22 + Math.sin(t * 7) * 4;
      arr.push([t * W, H - (Math.max(5, Math.min(95, base)) / 100) * (H - 20) - 10]);
    }
    return arr;
  }, [soc]);

  const path = "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
  const area = path + ` L${W},${H} L0,${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {[25, 50, 75].map((y) => (
        <line
          key={y}
          x1={0}
          x2={W}
          y1={H - (y / 100) * (H - 20) - 10}
          y2={H - (y / 100) * (H - 20) - 10}
          stroke="rgba(255,255,255,0.06)"
        />
      ))}
      <path d={area} fill="var(--color-accent-500)" fillOpacity={0.12} />
      <path
        d={path}
        fill="none"
        stroke="var(--color-accent-500)"
        strokeWidth={1.75}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text
        x={8}
        y={16}
        fontSize="10"
        fontFamily="var(--font-mono)"
        fill="rgba(255,255,255,0.4)"
      >
        100%
      </text>
      <text
        x={8}
        y={H - 4}
        fontSize="10"
        fontFamily="var(--font-mono)"
        fill="rgba(255,255,255,0.4)"
      >
        0%
      </text>
    </svg>
  );
}

function PowerCurve({
  powerMw,
  mode,
}: {
  powerMw: number;
  mode: string;
}) {
  const W = 600;
  const H = 200;
  const mid = H / 2;
  const sign = mode === "Charging" ? -1 : 1;

  const pts = useMemo(() => {
    const arr: [number, number][] = [];
    for (let i = 0; i < 96; i++) {
      const t = i / 95;
      const cycle = Math.sin(t * Math.PI * 2) * 0.6 + Math.sin(t * 12) * 0.1;
      const value = cycle * powerMw * sign;
      const y = mid - (value / (powerMw * 1.2)) * (H / 2 - 10);
      arr.push([t * W, y]);
    }
    return arr;
  }, [powerMw, sign, mid, W, H]);

  const path = "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <line x1={0} x2={W} y1={mid} y2={mid} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
      <text
        x={8}
        y={16}
        fontSize="10"
        fontFamily="var(--font-mono)"
        fill="rgba(255,255,255,0.4)"
      >
        +{powerMw.toFixed(1)} MW
      </text>
      <text
        x={8}
        y={H - 4}
        fontSize="10"
        fontFamily="var(--font-mono)"
        fill="rgba(255,255,255,0.4)"
      >
        −{powerMw.toFixed(1)} MW
      </text>
    </svg>
  );
}

function StringBalancing() {
  const strings = [94, 88, 91, 90, 93, 89, 92, 90, 91, 87, 93, 90];
  const max = Math.max(...strings);
  return (
    <div className="flex items-end gap-2 h-[200px]">
      {strings.map((s, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full relative flex-1 flex items-end">
            <div
              className="w-full bg-gradient-to-t from-[var(--color-accent-500)] to-[var(--color-accent-400)]"
              style={{ height: `${(s / max) * 100}%` }}
            />
          </div>
          <span className="label-mono text-white/40 text-[10px]">
            S{String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  DISPATCH TAB                                                              */
/* -------------------------------------------------------------------------- */

function DispatchTab({ site }: { site: Site }) {
  const [schedule, setSchedule] = useState<number[]>(() => {
    // default: charge 0–6, discharge 16–22
    const arr = Array(24).fill(0);
    for (let i = 0; i < 6; i++) arr[i] = -1;
    for (let i = 16; i < 22; i++) arr[i] = 1;
    return arr;
  });
  const [mode, setMode] = useState<"Peak" | "Frequency" | "Arbitrage">("Peak");

  function toggle(i: number) {
    setSchedule((s) => {
      const next = [...s];
      next[i] = ((next[i] + 2) % 3) - 1;
      return next;
    });
  }

  const totalCharge = schedule.filter((v) => v < 0).length * site.power;
  const totalDischarge = schedule.filter((v) => v > 0).length * site.power;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-0 border border-white/15">
          {(["Peak", "Frequency", "Arbitrage"] as const).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "px-4 py-2 label-mono transition-colors",
                  active
                    ? "bg-[var(--color-accent-500)] text-[var(--color-navy-500)]"
                    : "text-white/60 hover:text-white",
                )}
              >
                {m}
              </button>
            );
          })}
        </div>
        <div className="flex gap-8 label-mono text-white/50">
          <span>
            Charge:{" "}
            <span className="text-white">{totalCharge.toFixed(1)} MWh</span>
          </span>
          <span>
            Discharge:{" "}
            <span className="text-[var(--color-accent-400)]">
              {totalDischarge.toFixed(1)} MWh
            </span>
          </span>
        </div>
      </div>

      <div>
        <div className="label-mono text-white/40 mb-3">
          24h · Click to cycle: idle → discharge → charge
        </div>
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: "repeat(24,minmax(0,1fr))" }}>
          {schedule.map((v, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              aria-label={`Hour ${i}:00`}
              className={cn(
                "h-16 md:h-20 border transition-colors",
                v === 1 &&
                  "bg-[var(--color-accent-500)] border-[var(--color-accent-500)]",
                v === -1 &&
                  "bg-[var(--color-navy-400)] border-[var(--color-navy-400)]",
                v === 0 &&
                  "bg-transparent border-white/10 hover:border-white/30",
              )}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 label-mono text-white/30">
          {[0, 6, 12, 18, 23].map((h) => (
            <span key={h}>{String(h).padStart(2, "0")}:00</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        <MiniStat label="Revenue (est.)" value="$3,420" />
        <MiniStat label="Arbitrage Spread" value="$48/MWh" />
        <MiniStat label="Regulation Credits" value="204 MW-min" />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--color-navy-700)] p-4 flex flex-col gap-2">
      <span className="label-mono text-white/40">{label}</span>
      <span className="stat-digit text-2xl text-white">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  AUGMENTATION TAB                                                          */
/* -------------------------------------------------------------------------- */

function AugmentationTab({ site }: { site: Site }) {
  const [year, setYear] = useState(7);

  const retention = useMemo(() => {
    const arr: number[] = [];
    for (let y = 0; y <= 20; y++) {
      // Without augmentation
      const v = 100 - y * 1.9 - Math.pow(y / 4, 1.5);
      arr.push(Math.max(60, v));
    }
    return arr;
  }, []);

  const augmented = useMemo(() => {
    const arr: number[] = [];
    for (let y = 0; y <= 20; y++) {
      const raw = 100 - y * 1.9 - Math.pow(y / 4, 1.5);
      // Augmentation step at year 7 and 14
      const boost = (y >= 7 ? 8 : 0) + (y >= 14 ? 8 : 0);
      arr.push(Math.min(100, Math.max(80, raw + boost)));
    }
    return arr;
  }, []);

  const W = 700;
  const H = 260;

  const toPath = (data: number[]) => {
    return (
      "M" +
      data
        .map((v, i) => {
          const x = (i / 20) * W;
          const y = H - ((v - 60) / 40) * (H - 30) - 15;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" L")
    );
  };

  const currentBaseline = retention[year].toFixed(1);
  const currentAug = augmented[year].toFixed(1);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <span className="label-mono text-white/40">Year {year} · Capacity Retention</span>
          <div className="flex items-baseline gap-8">
            <div>
              <span className="stat-digit text-5xl text-white">{currentAug}%</span>
              <span className="label-mono text-[var(--color-accent-400)] ml-2">
                AUGMENTED
              </span>
            </div>
            <div>
              <span className="stat-digit text-3xl text-white/40">
                {currentBaseline}%
              </span>
              <span className="label-mono text-white/30 ml-2">BASELINE</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[240px]">
          <div className="flex justify-between label-mono text-white/40">
            <span>Year 0</span>
            <span>Year {year}</span>
            <span>Year 20</span>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="w-full accent-[var(--color-accent-500)]"
          />
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto border border-white/10 bg-[var(--color-navy-800)]">
          {[60, 70, 80, 90, 100].map((val) => (
            <g key={val}>
              <line
                x1={0}
                x2={W}
                y1={H - ((val - 60) / 40) * (H - 30) - 15}
                y2={H - ((val - 60) / 40) * (H - 30) - 15}
                stroke="rgba(255,255,255,0.06)"
              />
              <text
                x={6}
                y={H - ((val - 60) / 40) * (H - 30) - 19}
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="rgba(255,255,255,0.3)"
              >
                {val}%
              </text>
            </g>
          ))}

          {/* baseline */}
          <path
            d={toPath(retention)}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />

          {/* augmented */}
          <path
            d={toPath(augmented)}
            fill="none"
            stroke="var(--color-accent-500)"
            strokeWidth={2}
          />

          {/* marker */}
          <line
            x1={(year / 20) * W}
            x2={(year / 20) * W}
            y1={0}
            y2={H}
            stroke="rgba(0,212,255,0.4)"
            strokeDasharray="2 2"
          />
          <circle
            cx={(year / 20) * W}
            cy={H - ((augmented[year] - 60) / 40) * (H - 30) - 15}
            r={5}
            fill="var(--color-accent-500)"
          />
        </svg>
      </div>

      <div className="flex items-center gap-8 label-mono text-white/50">
        <span className="flex items-center gap-2">
          <span className="w-4 h-[2px] bg-[var(--color-accent-500)]" />
          With augmentation (yr 7, 14)
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-[2px] bg-white/40" />
          Without augmentation
        </span>
        <span className="ml-auto">Rated: {site.capacity.toFixed(1)} MWh</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ANALYTICS TAB                                                             */
/* -------------------------------------------------------------------------- */

function AnalyticsTab({ site }: { site: Site }) {
  const cycleHistory = useMemo(() => {
    const arr: number[] = [];
    for (let m = 0; m < 12; m++) {
      arr.push(
        30 + Math.round(Math.sin(m * 0.7) * 8 + Math.cos(m * 1.9) * 4),
      );
    }
    return arr;
  }, []);
  const max = Math.max(...cycleHistory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Panel title="Cycle Count · 12 Months" index="01">
        <div className="flex items-end gap-2 h-[220px]">
          {cycleHistory.map((c, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-[var(--color-accent-500)]/40 to-[var(--color-accent-500)]"
                  style={{ height: `${(c / max) * 100}%` }}
                />
              </div>
              <span className="label-mono text-white/30 text-[10px]">
                M{String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 label-mono text-white/40">
          <span>Total: {cycleHistory.reduce((a, b) => a + b, 0)} cycles</span>
          <span>Lifetime: {site.cycles}</span>
        </div>
      </Panel>

      <Panel title="Round-Trip Efficiency" index="02">
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <span className="stat-digit text-6xl text-white">
              {site.efficiency.toFixed(1)}%
            </span>
            <span className="label-mono text-[var(--color-accent-400)]">
              +0.4% QoQ
            </span>
          </div>
          <div className="h-2 w-full bg-white/10 relative">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--color-accent-500)]"
              style={{ width: `${site.efficiency}%` }}
            />
          </div>
          <div className="flex justify-between label-mono text-white/30">
            <span>0%</span>
            <span>Rated: 88%</span>
            <span>100%</span>
          </div>
        </div>
      </Panel>

      <Panel title="Warranty Position" index="03" className="lg:col-span-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {["Metric", "Actual", "Warranty", "Margin"].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 label-mono text-white/40 font-normal"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="stat-digit">
            {[
              {
                m: "Capacity Retention",
                a: "91.2%",
                w: "≥ 70%",
                d: "+21.2%",
              },
              {
                m: "Efficiency",
                a: `${site.efficiency.toFixed(1)}%`,
                w: "≥ 88%",
                d: `+${(site.efficiency - 88).toFixed(1)}%`,
              },
              {
                m: "Availability",
                a: "99.4%",
                w: "≥ 97%",
                d: "+2.4%",
              },
              {
                m: "Thermal Events",
                a: "0",
                w: "≤ 2 / yr",
                d: "nominal",
              },
            ].map((row) => (
              <tr key={row.m} className="border-b border-white/5">
                <td className="py-3 text-white/80">{row.m}</td>
                <td className="py-3 text-white">{row.a}</td>
                <td className="py-3 text-white/50">{row.w}</td>
                <td className="py-3 text-[var(--color-accent-400)]">{row.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ALARMS TAB                                                                */
/* -------------------------------------------------------------------------- */

function AlarmsTab() {
  const [filter, setFilter] = useState<"all" | "critical" | "warn" | "info">(
    "all",
  );
  const all = SITES.flatMap((s) => s.alerts);
  const extras: Alarm[] = [
    {
      id: "x1",
      severity: "info",
      site: "Lyon",
      code: "SYS-001",
      message: "Scheduled maintenance window closed",
      when: "2h ago",
    },
    {
      id: "x2",
      severity: "info",
      site: "Lyon",
      code: "DSP-111",
      message: "Daily capacity test completed: 26.2 MWh",
      when: "8h ago",
    },
  ];
  const list = [...all, ...extras];
  const filtered =
    filter === "all" ? list : list.filter((a) => a.severity === filter);

  const chip = (s: Alarm["severity"]) => {
    if (s === "critical")
      return "bg-[var(--color-signal-error)]/15 text-[var(--color-signal-error)] border-[var(--color-signal-error)]/30";
    if (s === "warn")
      return "bg-[var(--color-signal-warn)]/15 text-[var(--color-signal-warn)] border-[var(--color-signal-warn)]/30";
    return "bg-white/5 text-white/60 border-white/10";
  };

  const counts = {
    critical: list.filter((a) => a.severity === "critical").length,
    warn: list.filter((a) => a.severity === "warn").length,
    info: list.filter((a) => a.severity === "info").length,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-0 border border-white/15 self-start">
        {(["all", "critical", "warn", "info"] as const).map((f) => {
          const active = filter === f;
          const count =
            f === "all"
              ? list.length
              : counts[f as "critical" | "warn" | "info"];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 label-mono transition-colors flex items-center gap-2",
                active
                  ? "bg-white text-[var(--color-navy-500)]"
                  : "text-white/60 hover:text-white",
              )}
            >
              <span>{f}</span>
              <span className="stat-digit text-xs opacity-60">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border border-white/10 divide-y divide-white/5">
        {filtered.length === 0 && (
          <div className="p-6 text-center label-mono text-white/40">
            No alarms for this filter.
          </div>
        )}
        {filtered.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors"
          >
            <span
              className={cn(
                "label-mono px-2 py-1 border",
                chip(a.severity),
              )}
            >
              {a.severity}
            </span>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <span className="text-white">{a.message}</span>
                <span className="label-mono text-white/40">{a.when}</span>
              </div>
              <div className="flex items-center gap-3 label-mono text-white/40">
                <span>{a.code}</span>
                <span aria-hidden className="opacity-40">/</span>
                <span>{a.site}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SHARED                                                                    */
/* -------------------------------------------------------------------------- */

function Panel({
  title,
  index,
  children,
  className,
}: {
  title: string;
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-white/10 bg-[var(--color-navy-800)] p-6 flex flex-col gap-5",
        className,
      )}
    >
      <div className="flex items-center justify-between label-mono text-white/50">
        <span>{title}</span>
        {index && <span className="text-white/30">{index}</span>}
      </div>
      {children}
    </div>
  );
}

