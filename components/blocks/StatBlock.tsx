import { cn } from "@/lib/cn";
import { StatDigit } from "@/components/atoms";

export type Stat = {
  value: string | number;
  unit?: string;
  label: string;
};

type StatBlockProps = {
  stats: Stat[];
  columns?: 2 | 3 | 4;
  tone?: "default" | "ink";
  size?: "md" | "lg" | "xl";
  className?: string;
};

/**
 * Row/grid of large statistics separated by hairlines.
 * Uses the signature "gap-px on a line background" trick for 1px dividers.
 */
export function StatBlock({
  stats,
  columns = 4,
  tone = "default",
  size = "lg",
  className,
}: StatBlockProps) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  }[columns];

  const ink = tone === "ink";

  return (
    <div
      className={cn(
        "grid gap-px",
        colClass,
        ink ? "bg-white/10 hairline-ink" : "bg-[var(--line)] hairline",
        className,
      )}
    >
      {stats.map((s, i) => (
        <div
          key={`${s.label}-${i}`}
          className={cn(
            "p-6 md:p-8",
            ink ? "bg-[var(--color-navy-500)]" : "bg-[var(--color-surface-raised)]",
          )}
        >
          <StatDigit
            value={s.value}
            unit={s.unit}
            label={s.label}
            size={size}
            tone={ink ? "ink" : "default"}
          />
        </div>
      ))}
    </div>
  );
}
