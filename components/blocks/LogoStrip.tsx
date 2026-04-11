import { cn } from "@/lib/cn";

export type LogoItem = {
  name: string;
  /** Optional image src (SVG/PNG). If omitted, renders as a wordmark. */
  src?: string;
};

type LogoStripProps = {
  logos: LogoItem[];
  heading?: string;
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Logo / wordmark strip used for client/partner proof.
 * Renders as uniform-height monochrome wordmarks when no image is provided.
 */
export function LogoStrip({ logos, heading, tone = "default", className }: LogoStripProps) {
  const ink = tone === "ink";

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {heading && (
        <p
          className={cn(
            "label-mono",
            ink ? "text-white/60" : "text-[var(--color-paper-500)]",
          )}
        >
          {heading}
        </p>
      )}
      <ul
        className={cn(
          "grid grid-cols-2 gap-px md:grid-cols-3 lg:grid-cols-6",
          ink ? "bg-white/10 hairline-ink" : "bg-[var(--line)] hairline",
        )}
      >
        {logos.map((logo) => (
          <li
            key={logo.name}
            className={cn(
              "flex h-20 items-center justify-center px-4",
              ink ? "bg-[var(--color-navy-500)]" : "bg-[var(--color-surface-raised)]",
            )}
          >
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className={cn(
                  "max-h-8 w-auto object-contain",
                  ink
                    ? "brightness-0 invert opacity-70"
                    : "opacity-60 grayscale transition-[opacity,filter] duration-[var(--duration-base)] hover:opacity-100 hover:grayscale-0",
                )}
              />
            ) : (
              <span
                className={cn(
                  "text-sm font-medium tracking-[-0.01em]",
                  ink ? "text-white/80" : "text-[var(--color-navy-500)]",
                )}
              >
                {logo.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
