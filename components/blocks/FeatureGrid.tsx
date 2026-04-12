import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon, EyebrowLabel } from "@/components/atoms";

export type FeatureItem = {
  icon?: LucideIcon;
  number?: string | number;
  title: string;
  description: string;
};

type FeatureGridProps = {
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Feature grid — monospace numbered list of feature blurbs.
 * Uses hairlines as grid lines (1px inset borders via gap trick).
 */
export function FeatureGrid({
  features,
  columns = 3,
  tone = "default",
  className,
}: FeatureGridProps) {
  const colClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const ink = tone === "ink";

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-px",
        colClass,
        ink ? "bg-white/10" : "bg-[var(--line)]",
        ink ? "hairline-ink" : "hairline",
        className,
      )}
    >
      {features.map((f, i) => {
        const isLast = i === features.length - 1;
        const remainder = features.length % columns;
        const shouldSpan = isLast && remainder !== 0;
        const spanCols = shouldSpan ? columns - remainder + 1 : 1;

        return (
        <li
          key={`${f.title}-${i}`}
          className={cn(
            "flex flex-col gap-4 p-8",
            ink
              ? "bg-[var(--color-navy-500)] text-white"
              : "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)]",
            spanCols === 2 && "lg:col-span-2",
            spanCols === 3 && "lg:col-span-3",
          )}
        >
          <div className="flex items-center justify-between">
            {f.icon ? (
              <Icon icon={f.icon} size="lg" />
            ) : (
              <EyebrowLabel tone={ink ? "ink" : "default"}>
                {typeof f.number === "number"
                  ? f.number.toString().padStart(2, "0")
                  : (f.number ?? (i + 1).toString().padStart(2, "0"))}
              </EyebrowLabel>
            )}
          </div>

          <h3
            className={cn(
              "text-2xl font-medium tracking-[-0.02em]",
              ink ? "text-white" : "text-[var(--color-navy-500)]",
            )}
          >
            {f.title}
          </h3>

          <p
            className={cn(
              "text-base leading-relaxed",
              ink ? "text-white/70" : "text-[var(--color-paper-600)]",
            )}
          >
            {f.description}
          </p>
        </li>
        );
      })}
    </ul>
  );
}
