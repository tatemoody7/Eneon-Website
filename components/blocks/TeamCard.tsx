import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon, EyebrowLabel } from "@/components/atoms";
import { Image } from "@/components/media";

export type TeamCardProps = {
  name: string;
  title: string;
  department?: string;
  photo?: { src: string; alt: string };
  linkedinUrl?: string;
  className?: string;
};

/**
 * Team member card — portrait, name, title, optional LinkedIn.
 * Uses aspect-[3/4] portrait frame and ink-wash treatment for consistency.
 */
export function TeamCard({
  name,
  title,
  department,
  photo,
  linkedinUrl,
  className,
}: TeamCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 border border-[var(--line)] bg-[var(--color-surface-raised)] p-5",
        className,
      )}
    >
      {photo ? (
        <Image
          alt={photo.alt}
          src={photo.src}
          ratio="3/2"
          treatment="ink-wash"
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          frameClassName="aspect-[3/4]"
        />
      ) : (
        <div className="aspect-[3/4] bg-[var(--color-surface-sunken)] flex items-center justify-center">
          <span className="label-mono text-[var(--color-paper-500)]">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {department && (
          <EyebrowLabel tone="muted">{department}</EyebrowLabel>
        )}
        <h3 className="text-xl font-medium tracking-[-0.02em] text-[var(--color-navy-500)]">
          {name}
        </h3>
        <p className="text-sm text-[var(--color-paper-600)]">{title}</p>
      </div>

      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="inline-flex h-10 items-center gap-2 px-3 border border-[var(--line)] text-[var(--color-navy-500)] hover:bg-[var(--color-navy-500)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)] label-mono self-start"
        >
          LinkedIn
          <Icon icon={ArrowUpRight} size="sm" />
        </a>
      )}
    </div>
  );
}
