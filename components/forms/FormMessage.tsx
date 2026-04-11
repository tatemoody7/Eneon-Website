import type { ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/atoms";

type FormMessageProps = {
  variant: "success" | "error" | "info";
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Inline form status message — rendered after submit (success / error / info).
 * Always has role="status" or role="alert" for screen readers.
 */
export function FormMessage({ variant, title, children, className }: FormMessageProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      border: "border-[var(--color-signal-ok)]",
      bg: "bg-[#E7F5ED]",
      text: "text-[#1B5E3D]",
      role: "status" as const,
    },
    error: {
      icon: AlertCircle,
      border: "border-[var(--color-signal-error)]",
      bg: "bg-[#FDEAEB]",
      text: "text-[#8A1E22]",
      role: "alert" as const,
    },
    info: {
      icon: Info,
      border: "border-[var(--color-navy-300)]",
      bg: "bg-[var(--color-surface-sunken)]",
      text: "text-[var(--color-navy-500)]",
      role: "status" as const,
    },
  }[variant];

  return (
    <div
      role={config.role}
      className={cn(
        "flex items-start gap-3 border p-4",
        config.border,
        config.bg,
        config.text,
        className,
      )}
    >
      <Icon icon={config.icon} size="sm" className="mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1">
        {title && <p className="label-mono">{title}</p>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
