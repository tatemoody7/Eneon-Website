import { cn } from "@/lib/cn";
import { EyebrowLabel } from "@/components/atoms";

export type SpecRow = {
  label: string;
  value: string;
  note?: string;
};

export type SpecGroup = {
  heading: string;
  rows: SpecRow[];
};

type SpecTableProps = {
  groups: SpecGroup[];
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Spec sheet / tech table. Hairline-separated rows, label column in mono,
 * value column in body font, optional note in small mono beneath.
 */
export function SpecTable({ groups, tone = "default", className }: SpecTableProps) {
  const ink = tone === "ink";

  return (
    <div className={cn("flex flex-col gap-12", className)}>
      {groups.map((group) => (
        <section key={group.heading} className="flex flex-col gap-6">
          <header
            className={cn(
              "flex items-center justify-between pb-4",
              ink ? "hairline-ink-b" : "hairline-b",
            )}
          >
            <EyebrowLabel tone={ink ? "ink" : "default"}>{group.heading}</EyebrowLabel>
          </header>
          <dl className="flex flex-col">
            {group.rows.map((row, i) => (
              <div
                key={`${row.label}-${i}`}
                className={cn(
                  "grid grid-cols-[1fr_1.5fr] gap-6 py-4 items-baseline",
                  i > 0 && (ink ? "hairline-ink-t" : "hairline-t"),
                )}
              >
                <dt
                  className={cn(
                    "label-mono",
                    ink ? "text-white/60" : "text-[var(--color-paper-500)]",
                  )}
                >
                  {row.label}
                </dt>
                <dd className="flex flex-col gap-1">
                  <span
                    className={cn(
                      "text-lg md:text-xl font-medium tabular-nums",
                      ink ? "text-white" : "text-[var(--color-navy-500)]",
                    )}
                  >
                    {row.value}
                  </span>
                  {row.note && (
                    <span
                      className={cn(
                        "text-xs",
                        ink ? "text-white/50" : "text-[var(--color-paper-500)]",
                      )}
                    >
                      {row.note}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
