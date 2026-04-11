import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/cn";

type IconProps = LucideProps & {
  icon: LucideIcon;
  size?: "xs" | "sm" | "md" | "lg";
};

/**
 * Standardized icon wrapper enforcing Eneon's 1.25 stroke weight.
 * Always import lucide icons and pass via the `icon` prop.
 */
export function Icon({ icon: LucideComp, size = "md", className, ...rest }: IconProps) {
  const sizeClass = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  return (
    <LucideComp
      strokeWidth={1.25}
      aria-hidden
      className={cn(sizeClass, "shrink-0", className)}
      {...rest}
    />
  );
}
