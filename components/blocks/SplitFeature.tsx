import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EyebrowLabel } from "@/components/atoms";

type SplitFeatureProps = {
  eyebrow?: string;
  eyebrowNumber?: string | number;
  title: ReactNode;
  description?: ReactNode;
  body?: ReactNode;
  media: ReactNode;
  orientation?: "media-right" | "media-left";
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Split feature row — text column + media column side-by-side on desktop,
 * stacked on mobile. Use for alternating "anchor + illustration" sections.
 */
export function SplitFeature({
  eyebrow,
  eyebrowNumber,
  title,
  description,
  body,
  media,
  orientation = "media-right",
  tone = "default",
  className,
}: SplitFeatureProps) {
  const ink = tone === "ink";
  const reverse = orientation === "media-left";

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24 items-center",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-6", reverse && "md:order-2")}>
        {eyebrow && (
          <EyebrowLabel tone={ink ? "ink" : "default"} number={eyebrowNumber}>
            {eyebrow}
          </EyebrowLabel>
        )}
        <h2
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]",
            ink ? "text-white" : "text-[var(--color-navy-500)]",
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-lg md:text-xl leading-relaxed max-w-xl",
              ink ? "text-white/70" : "text-[var(--color-paper-600)]",
            )}
          >
            {description}
          </p>
        )}
        {body}
      </div>

      <div className={cn("relative", reverse && "md:order-1")}>{media}</div>
    </div>
  );
}
