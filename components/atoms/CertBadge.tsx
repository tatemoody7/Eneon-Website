import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type CertBadgeProps = {
  code: string;
  label?: string;
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Certification badge used for UL 9540, IEC 62619, NFPA 855, etc.
 * Monospace code + optional plain-text label.
 */
export function CertBadge({ code, label, tone = "default", className }: CertBadgeProps) {
  const toneClass = {
    default: "border-[var(--line-strong)] text-[var(--color-navy-500)]",
    ink: "border-white/20 text-white",
  }[tone];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 border px-3 h-9",
        toneClass,
        className,
      )}
    >
      <Icon icon={ShieldCheck} size="sm" />
      <span className="label-mono">{code}</span>
      {label && (
        <span className="label-mono opacity-60 border-l border-current/20 pl-2 ml-1">
          {label}
        </span>
      )}
    </div>
  );
}
