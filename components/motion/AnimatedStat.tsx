"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, animate } from "motion/react";

type AnimatedStatProps = {
  value: number | string;
  unit?: string;
  label?: string;
  /** Size variant */
  size?: "md" | "lg" | "xl";
  /** Decimal places to show */
  decimals?: number;
  /** Optional prefix (e.g. "$") */
  prefix?: string;
  /** Duration in seconds */
  duration?: number;
  className?: string;
};

const sizeClasses = {
  md: "text-3xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
};

export function AnimatedStat({
  value,
  unit,
  label,
  size = "xl",
  decimals,
  prefix = "",
  duration = 1.6,
  className,
}: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState<string>(typeof value === "number" ? "0" : String(value));
  const isNumeric = typeof value === "number";

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    const numValue = value as number;
    const dec = decimals ?? (numValue % 1 !== 0 ? 2 : 0);

    const controls = animate(0, numValue, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate(latest) {
        setDisplayed(
          latest.toLocaleString("en-US", {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
          })
        );
      },
    });

    return () => controls.stop();
  }, [isInView, value, decimals, duration, isNumeric]);

  return (
    <div className={className}>
      <span
        ref={ref}
        className={`stat-digit ${sizeClasses[size]} text-[var(--color-navy-500)] block`}
      >
        {prefix}
        {isNumeric ? displayed : String(value)}
        {unit && (
          <span className="text-sm ml-1.5 opacity-60 font-sans tracking-normal">
            {unit}
          </span>
        )}
      </span>
      {label && (
        <span className="label-mono text-[var(--color-paper-500)] mt-2 block">
          {label}
        </span>
      )}
    </div>
  );
}
