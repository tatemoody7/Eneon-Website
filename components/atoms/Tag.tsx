import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  tone?: "default" | "accent" | "warn" | "ok" | "ink";
  size?: "sm" | "md";
  className?: string;
};

/**
 * A small metadata tag / pill. Used for categories, statuses, project types.
 * Squared corners to match the 0px radius system (pill optional via className).
 */
export function Tag({ children, tone = "default", size = "sm", className }: TagProps) {
  const toneClass = {
    default: "bg-[var(--color-paper-100)] text-[var(--color-navy-500)] border-[var(--line)]",
    accent: "bg-[var(--color-accent-50)] text-[var(--color-accent-800)] border-[var(--color-accent-200)]",
    warn: "bg-[#FEF6DD] text-[var(--color-paper-800)] border-[var(--color-signal-warn)]/40",
    ok: "bg-[#E7F5ED] text-[#1B5E3D] border-[var(--color-signal-ok)]/40",
    ink: "bg-white/5 text-white/80 border-white/10",
  }[tone];

  const sizeClass = {
    sm: "h-6 px-2 text-[10px]",
    md: "h-7 px-3 text-[11px]",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center border label-mono",
        sizeClass,
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
