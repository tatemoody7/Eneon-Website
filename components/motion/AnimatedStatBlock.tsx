"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/cn";
import { AnimatedStat } from "./AnimatedStat";
import type { Stat } from "@/components/blocks";

type AnimatedStatBlockProps = {
  stats: Stat[];
  columns?: 2 | 3 | 4;
  tone?: "default" | "ink";
  size?: "md" | "lg" | "xl";
  className?: string;
};

export function AnimatedStatBlock({
  stats,
  columns = 4,
  tone = "default",
  size = "xl",
  className,
}: AnimatedStatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const ink = tone === "ink";

  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }[columns];

  const sizeMap = {
    md: "md" as const,
    lg: "lg" as const,
    xl: "xl" as const,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-px",
        colClass,
        ink ? "bg-white/10 hairline-ink" : "bg-[var(--line)] hairline",
        className,
      )}
    >
      {stats.map((s, i) => {
        const numericValue = typeof s.value === "string" ? parseFloat(s.value) : s.value;
        const isNumeric = !isNaN(numericValue);

        return (
          <div
            key={`${s.label}-${i}`}
            className={cn(
              "p-6 md:p-8",
              ink ? "bg-[var(--color-navy-500)]" : "bg-[var(--color-surface-raised)]",
            )}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s`,
            }}
          >
            {isNumeric ? (
              <AnimatedStat
                value={numericValue}
                unit={s.unit || undefined}
                label={s.label}
                size={sizeMap[size]}
                duration={1.8}
                className={ink ? "[&_.stat-digit]:text-white [&_.label-mono]:text-white/60" : ""}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <span className={cn("label-mono", ink ? "text-white/60" : "text-[var(--color-navy-400)]")}>
                  {s.label}
                </span>
                <span
                  className={cn(
                    "stat-digit font-medium",
                    size === "xl" ? "text-6xl md:text-7xl" : size === "lg" ? "text-5xl" : "text-4xl",
                    ink ? "text-white" : "text-[var(--color-navy-500)]",
                  )}
                >
                  {s.value}
                  {s.unit && (
                    <span className="ml-1 font-normal opacity-70 text-xl md:text-2xl">{s.unit}</span>
                  )}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
