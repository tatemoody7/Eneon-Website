import NextLink from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon, Tag, EyebrowLabel } from "@/components/atoms";
import { Image } from "@/components/media";

export type ProjectCardProps = {
  title: string;
  slug: string;
  location: string;
  capacityMwh?: number;
  powerMw?: number;
  type: "Microgrid" | "Utility" | "Commercial" | "Solar+Storage";
  status: "Operational" | "Commissioning" | "In Development";
  image: {
    src: string;
    alt: string;
  };
  year?: number;
  className?: string;
};

/**
 * Project case-study card. Image hero + metadata strip.
 */
export function ProjectCard({
  title,
  slug,
  location,
  capacityMwh,
  powerMw,
  type,
  status,
  image,
  year,
  className,
}: ProjectCardProps) {
  const statusTone =
    status === "Operational" ? "ok" : status === "Commissioning" ? "warn" : "default";

  return (
    <NextLink
      href={`/projects/${slug}`}
      className={cn(
        "group/project block border border-[var(--line)] bg-[var(--color-surface-raised)]",
        "transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-precision)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-[var(--color-navy-300)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
        className,
      )}
    >
      <div className="relative">
        <Image
          alt={image.alt}
          src={image.src}
          ratio="3/2"
          treatment="ink-wash"
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="transition-transform duration-[var(--duration-slow)] ease-[var(--ease-precision)] group-hover/project:scale-[1.02]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <Tag tone="default">{type}</Tag>
          <Tag tone={statusTone as "ok" | "warn" | "default"}>{status}</Tag>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2 label-mono text-[var(--color-paper-500)]">
          <Icon icon={MapPin} size="xs" />
          <span>{location}</span>
          {year && (
            <>
              <span aria-hidden className="opacity-40">
                /
              </span>
              <span>{year}</span>
            </>
          )}
        </div>

        <h3 className="text-2xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)] transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)] group-hover/project:text-[var(--color-accent-700)]">
          {title}
        </h3>

        {(capacityMwh || powerMw) && (
          <div className="hairline-t pt-4 flex items-end gap-8">
            {capacityMwh != null && (
              <div className="flex flex-col gap-1">
                <EyebrowLabel tone="muted">Capacity</EyebrowLabel>
                <span className="stat-digit text-3xl text-[var(--color-navy-500)]">
                  {capacityMwh}
                  <span className="text-sm ml-1 opacity-70">MWh</span>
                </span>
              </div>
            )}
            {powerMw != null && (
              <div className="flex flex-col gap-1">
                <EyebrowLabel tone="muted">Power</EyebrowLabel>
                <span className="stat-digit text-3xl text-[var(--color-navy-500)]">
                  {powerMw}
                  <span className="text-sm ml-1 opacity-70">MW</span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </NextLink>
  );
}
