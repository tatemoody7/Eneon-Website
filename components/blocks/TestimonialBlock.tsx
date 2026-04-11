import { Quote } from "lucide-react";
import { cn } from "@/lib/cn";
import { Icon, EyebrowLabel } from "@/components/atoms";
import { Image } from "@/components/media";

type TestimonialBlockProps = {
  quote: string;
  author: {
    name: string;
    title: string;
    company?: string;
    photo?: { src: string; alt: string };
  };
  eyebrow?: string;
  tone?: "default" | "ink";
  className?: string;
};

/**
 * Testimonial / client quote block with large display quote, author photo,
 * and mono metadata. Uses hairline separators, no curved speech bubble.
 */
export function TestimonialBlock({
  quote,
  author,
  eyebrow = "Client Testimonial",
  tone = "default",
  className,
}: TestimonialBlockProps) {
  const ink = tone === "ink";

  return (
    <figure
      className={cn(
        "flex flex-col gap-10 border p-10 md:p-14",
        ink
          ? "bg-[var(--color-navy-500)] text-white border-white/20"
          : "bg-[var(--color-surface-raised)] text-[var(--color-navy-500)] border-[var(--line-strong)]",
        className,
      )}
    >
      <div className="flex items-start gap-6">
        <Icon
          icon={Quote}
          size="lg"
          className={cn("shrink-0 mt-2", ink ? "text-[var(--color-accent-500)]" : "text-[var(--color-navy-400)]")}
        />
        <div className="flex flex-col gap-4">
          <EyebrowLabel tone={ink ? "ink" : "default"}>{eyebrow}</EyebrowLabel>
          <blockquote className="text-2xl md:text-4xl font-medium tracking-[-0.02em] leading-[1.2] font-[var(--font-display)]">
            {quote}
          </blockquote>
        </div>
      </div>

      <figcaption
        className={cn(
          "flex items-center gap-4 pt-6",
          ink ? "hairline-ink-t" : "hairline-t",
        )}
      >
        {author.photo && (
          <div className="w-12 h-12 overflow-hidden">
            <Image
              src={author.photo.src}
              alt={author.photo.alt}
              ratio="square"
              fill
              sizes="48px"
            />
          </div>
        )}
        <div className="flex flex-col">
          <span
            className={cn(
              "text-base font-medium",
              ink ? "text-white" : "text-[var(--color-navy-500)]",
            )}
          >
            {author.name}
          </span>
          <span
            className={cn(
              "label-mono",
              ink ? "text-white/60" : "text-[var(--color-paper-500)]",
            )}
          >
            {author.title}
            {author.company && ` / ${author.company}`}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
