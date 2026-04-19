"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const MAX_BLOCKS = 13;
const MWH_PER_BLOCK = 2.0;
const MW_PER_BLOCK = 0.5;
const BLOCKS_PER_CONTAINER = 2;

export function BlockConfigurator() {
  const [blocks, setBlocks] = useState(6);

  const mwh = blocks * MWH_PER_BLOCK;
  const mw = blocks * MW_PER_BLOCK;
  const containers = Math.ceil(blocks / BLOCKS_PER_CONTAINER);
  const duration = mwh / mw;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4 hairline-b pb-5">
          <div className="flex items-baseline gap-4">
            <span className="stat-digit text-6xl text-[var(--color-navy-500)]">
              {blocks.toString().padStart(2, "0")}
            </span>
            <span className="label-mono text-[var(--color-paper-500)]">
              {blocks === 1 ? "Block" : "Blocks"} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBlocks((b) => Math.max(1, b - 1))}
              className="w-10 h-10 hairline-strong text-[var(--color-navy-500)] hover:bg-[var(--color-navy-500)] hover:text-white transition-colors"
              aria-label="Remove block"
            >
              −
            </button>
            <button
              onClick={() =>
                setBlocks((b) => Math.min(MAX_BLOCKS, b + 1))
              }
              className="w-10 h-10 hairline-strong text-[var(--color-navy-500)] hover:bg-[var(--color-navy-500)] hover:text-white transition-colors"
              aria-label="Add block"
            >
              +
            </button>
          </div>
        </div>

        {/* Grid of 13 slots */}
        <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-2">
          {Array.from({ length: MAX_BLOCKS }).map((_, i) => {
            const active = i < blocks;
            return (
              <button
                key={i}
                onClick={() => setBlocks(i + 1)}
                aria-label={`Set to ${i + 1} blocks`}
                className={cn(
                  "aspect-[3/5] border transition-all relative overflow-hidden",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
                  active
                    ? "bg-[var(--color-navy-500)] border-[var(--color-navy-500)]"
                    : "bg-transparent border-[var(--line)] hover:border-[var(--color-navy-300)]",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-1 text-center font-mono text-[10px]",
                    active ? "text-white/60" : "text-[var(--color-paper-500)]",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {active && (
                  <span className="absolute top-1 left-1 right-1 h-[2px] bg-[var(--color-accent-500)]" />
                )}
              </button>
            );
          })}
        </div>

        <input
          type="range"
          min={1}
          max={MAX_BLOCKS}
          value={blocks}
          onChange={(e) => setBlocks(parseInt(e.target.value))}
          className="w-full accent-[var(--color-accent-500)]"
          aria-label="Block count"
        />

        <div className="flex items-center justify-between label-mono text-[var(--color-paper-500)]">
          <span>01 MIN</span>
          <span>CONTINUOUS LINEAR SCALING</span>
          <span>13 MAX</span>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-px bg-[var(--line)] hairline">
        <Stat label="Capacity" value={mwh.toFixed(1)} unit="MWh" />
        <Stat label="Continuous Power" value={mw.toFixed(1)} unit="MW" />
        <Stat label="Duration" value={duration.toFixed(1)} unit="hr" />
        <Stat
          label="Containers"
          value={containers.toString()}
          unit={containers === 1 ? "unit" : "units"}
        />
        <Stat
          label="Augmentation Headroom"
          value={(MAX_BLOCKS - blocks).toString()}
          unit="blocks"
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 bg-[var(--color-surface-raised)] p-5">
      <span className="label-mono text-[var(--color-paper-500)]">{label}</span>
      <span className="stat-digit text-3xl text-[var(--color-navy-500)]">
        {value}
        <span className="ml-1 text-xs opacity-60">{unit}</span>
      </span>
    </div>
  );
}
