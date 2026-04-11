import { cn } from "@/lib/cn";

type StatDigitProps = {
  value: string | number;
  unit?: string;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "default" | "ink" | "accent";
  className?: string;
};

/**
 * Display digit with optional unit and monospace eyebrow label.
 * Tabular-num locked so digits never jitter on swap.
 */
export function StatDigit({
  value,
  unit,
  label,
  size = "lg",
  tone = "default",
  className,
}: StatDigitProps) {
  const sizeClass = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl md:text-7xl",
  }[size];

  const unitSizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl md:text-2xl",
  }[size];

  const toneClass = {
    default: "text-[var(--color-navy-500)]",
    ink: "text-white",
    accent: "text-[var(--color-accent-500)]",
  }[tone];

  const labelToneClass = {
    default: "text-[var(--color-navy-400)]",
    ink: "text-white/60",
    accent: "text-[var(--color-accent-700)]",
  }[tone];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <span className={cn("label-mono", labelToneClass)}>{label}</span>}
      <span className={cn("stat-digit font-medium", sizeClass, toneClass)}>
        {value}
        {unit && (
          <span className={cn("ml-1 font-normal opacity-70", unitSizeClass)}>{unit}</span>
        )}
      </span>
    </div>
  );
}
