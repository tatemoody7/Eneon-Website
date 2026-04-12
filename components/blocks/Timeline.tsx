import NextImage from "next/image";
import { cn } from "@/lib/cn";

export type TimelineEntry = {
  year: string | number;
  title: string;
  description?: string;
  image?: { src: string; alt: string };
};

type TimelineProps = {
  entries: TimelineEntry[];
  orientation?: "vertical" | "horizontal";
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Simple history/timeline block. Vertical (default) or horizontal.
 * Hairline spine with mono year labels and display title + body.
 */
export function Timeline({
  entries,
  orientation = "vertical",
  tone = "default",
  className,
}: TimelineProps) {
  const ink = tone === "ink";

  if (orientation === "horizontal") {
    return (
      <ol
        className={cn(
          "grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-4",
          ink ? "bg-white/10 hairline-ink" : "bg-[var(--line)] hairline",
          className,
        )}
      >
        {entries.map((e, i) => (
          <li
            key={`${e.year}-${i}`}
            className={cn(
              "flex flex-col gap-3 p-6",
              ink ? "bg-[var(--color-navy-500)] text-white" : "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)]",
            )}
          >
            <span
              className={cn(
                "stat-digit text-5xl",
                ink ? "text-[var(--color-accent-500)]" : "text-[var(--color-navy-500)]",
              )}
            >
              {e.year}
            </span>
            <h3 className="text-lg font-medium tracking-[-0.01em]">{e.title}</h3>
            {e.description && (
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  ink ? "text-white/70" : "text-[var(--color-paper-600)]",
                )}
              >
                {e.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("flex flex-col", className)}>
      {entries.map((e, i) => (
        <li
          key={`${e.year}-${i}`}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-8 py-10",
            i > 0 && (ink ? "hairline-ink-t" : "hairline-t"),
          )}
        >
          <span
            className={cn(
              "stat-digit text-5xl md:text-6xl min-w-[4ch]",
              ink ? "text-[var(--color-accent-500)]" : "text-[var(--color-navy-500)]",
            )}
          >
            {e.year}
          </span>
          <div className="flex flex-col gap-4 pt-2">
            <h3
              className={cn(
                "text-2xl font-medium tracking-[-0.02em]",
                ink ? "text-white" : "text-[var(--color-navy-500)]",
              )}
            >
              {e.title}
            </h3>
            {e.description && (
              <p
                className={cn(
                  "text-base leading-relaxed max-w-2xl",
                  ink ? "text-white/70" : "text-[var(--color-paper-600)]",
                )}
              >
                {e.description}
              </p>
            )}
            {e.image && (
              <div className="relative mt-2 aspect-[16/9] max-w-md overflow-hidden rounded-sm">
                <NextImage
                  src={e.image.src}
                  alt={e.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[var(--color-navy-500)]/8 mix-blend-multiply pointer-events-none" />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
