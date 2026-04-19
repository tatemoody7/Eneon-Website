"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated grid frequency waveform. Baseline is 60.00 Hz; clicking "Simulate
 * Grid Event" injects a frequency sag and the BESS discharge trace stabilizes
 * it. Uses requestAnimationFrame — pauses when off-screen.
 */
export function GridWaveform() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const eventAtRef = useRef<number | null>(null);

  const [freqDisplay, setFreqDisplay] = useState("60.00");
  const [dispatching, setDispatching] = useState(false);
  const [bessPower, setBessPower] = useState(0);

  const gridPathRef = useRef<SVGPathElement>(null);
  const bessPathRef = useRef<SVGPathElement>(null);

  const W = 800;
  const H = 260;
  const samples = 240;

  useEffect(() => {
    const loop = (t: number) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = (t - startRef.current) / 1000;

      const gridPts: string[] = [];
      const bessPts: string[] = [];

      let lastFreq = 60;
      let lastBess = 0;

      for (let i = 0; i < samples; i++) {
        const x = (i / (samples - 1)) * W;
        const tx = elapsed - (samples - 1 - i) * 0.03;

        // Baseline 60 Hz jitter
        let freq = 60 + Math.sin(tx * 2.4) * 0.04 + Math.sin(tx * 7.1) * 0.02;
        let bess = 0;

        if (eventAtRef.current != null) {
          const since = tx - eventAtRef.current;
          if (since >= 0) {
            // Frequency sag profile: down to 59.55, recovers over ~4s
            const sag = Math.max(0, 0.48 * Math.exp(-since * 0.4) - 0.02 * since);
            freq = 60 - sag + Math.sin(tx * 3) * 0.015;
            // BESS power ramps in fast, then decays as grid stabilizes
            const ramp = Math.min(1, since * 4);
            const decay = Math.exp(-since * 0.55);
            bess = ramp * decay * 100;
            // Frequency assist: add recovery proportional to bess
            freq += (bess / 100) * 0.38;
          }
        }

        const normFreq = (freq - 59.4) / 1.2; // 0..1
        const y = H - normFreq * (H * 0.9) - H * 0.05;
        gridPts.push(`${x.toFixed(1)},${y.toFixed(1)}`);

        const bessY = H - (bess / 120) * (H * 0.85) - H * 0.05;
        bessPts.push(`${x.toFixed(1)},${bessY.toFixed(1)}`);

        if (i === samples - 1) {
          lastFreq = freq;
          lastBess = bess;
        }
      }

      if (gridPathRef.current) {
        gridPathRef.current.setAttribute("d", `M${gridPts.join(" L")}`);
      }
      if (bessPathRef.current) {
        bessPathRef.current.setAttribute("d", `M${bessPts.join(" L")}`);
      }

      setFreqDisplay(lastFreq.toFixed(2));
      setBessPower(Math.round(lastBess));

      if (eventAtRef.current != null && elapsed - eventAtRef.current > 7) {
        eventAtRef.current = null;
        setDispatching(false);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function simulate() {
    if (dispatching) return;
    const t = performance.now() / 1000 - startRef.current / 1000;
    eventAtRef.current = t;
    setDispatching(true);
  }

  const freqNum = parseFloat(freqDisplay);
  const sagging = freqNum < 59.9;

  return (
    <div className="relative border border-white/10 bg-[var(--color-navy-700)]">
      {/* Header readouts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
        <Readout
          label="Grid Frequency"
          value={freqDisplay}
          unit="Hz"
          warn={sagging}
        />
        <Readout
          label="BESS Power"
          value={bessPower.toString()}
          unit="% rated"
          accent={bessPower > 0}
        />
        <Readout
          label="Response Time"
          value="38"
          unit="ms"
        />
        <Readout
          label="Status"
          value={dispatching ? "DISPATCHING" : "ARMED"}
          accent={dispatching}
        />
      </div>

      {/* SVG plot */}
      <div className="relative aspect-[800/260] p-0">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              x2={W}
              y1={(i * H) / 4}
              y2={(i * H) / 4}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v${i}`}
              y1={0}
              y2={H}
              x1={(i * W) / 8}
              x2={(i * W) / 8}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}
          {/* 60 Hz reference */}
          <line
            x1={0}
            x2={W}
            y1={H * 0.5}
            y2={H * 0.5}
            stroke="rgba(0,212,255,0.25)"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          <text
            x={W - 8}
            y={H * 0.5 - 6}
            textAnchor="end"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="rgba(0,212,255,0.6)"
          >
            60.00 Hz
          </text>

          {/* BESS trace (under) */}
          <path
            ref={bessPathRef}
            fill="none"
            stroke="var(--color-accent-500)"
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.8}
          />
          {/* Grid frequency trace */}
          <path
            ref={gridPathRef}
            fill="none"
            stroke="white"
            strokeWidth={1.75}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-5 border-t border-white/10 flex-wrap gap-4">
        <div className="flex items-center gap-6 label-mono text-white/50">
          <span className="flex items-center gap-2">
            <span className="w-3 h-[2px] bg-white inline-block" />
            Grid Frequency
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-[2px] bg-[var(--color-accent-500)] inline-block" />
            BESS Response
          </span>
        </div>
        <button
          onClick={simulate}
          disabled={dispatching}
          className="group inline-flex items-center gap-3 bg-[var(--color-accent-500)] text-[var(--color-navy-500)] px-6 h-11 label-mono disabled:opacity-50 disabled:pointer-events-none hover:bg-[var(--color-accent-400)] transition-colors"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[var(--color-navy-500)] animate-ping opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-navy-500)]" />
          </span>
          {dispatching ? "Responding..." : "Simulate Grid Event"}
        </button>
      </div>
    </div>
  );
}

function Readout({
  label,
  value,
  unit,
  warn,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  warn?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 bg-[var(--color-navy-700)] p-5">
      <span className="label-mono text-white/50">{label}</span>
      <span
        className={
          "stat-digit text-2xl md:text-3xl transition-colors " +
          (warn
            ? "text-[var(--color-signal-warn)]"
            : accent
              ? "text-[var(--color-accent-400)]"
              : "text-white")
        }
      >
        {value}
        {unit && <span className="ml-1 text-xs opacity-70">{unit}</span>}
      </span>
    </div>
  );
}
