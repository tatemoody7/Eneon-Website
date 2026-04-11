import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/cn";

type AspectRatio = "square" | "16/9" | "4/3" | "3/2" | "2/1" | "auto";

type ImageProps = Omit<NextImageProps, "alt"> & {
  alt: string;
  ratio?: AspectRatio;
  treatment?: "none" | "ink-wash" | "grade" | "tinted";
  caption?: string;
  className?: string;
  frameClassName?: string;
};

const ratioClass: Record<AspectRatio, string> = {
  square: "aspect-square",
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "2/1": "aspect-[2/1]",
  auto: "",
};

/**
 * Image wrapper around next/image.
 *
 * - `alt` is required (TypeScript enforces)
 * - `ratio` wraps in a fixed aspect frame and uses fill+object-cover
 * - `treatment` applies a brand-aligned color overlay:
 *   - ink-wash: navy tint overlay for photos on light surfaces
 *   - grade: bottom-up gradient for hero images (navy → transparent)
 *   - tinted: full subtle navy multiply
 * - Optional caption rendered below as mono label
 */
export function Image({
  alt,
  ratio = "auto",
  treatment = "none",
  caption,
  className,
  frameClassName,
  fill,
  ...rest
}: ImageProps) {
  const useFill = ratio !== "auto" || fill;

  const treatmentOverlay =
    treatment === "ink-wash"
      ? "after:absolute after:inset-0 after:bg-[var(--color-navy-500)]/10 after:mix-blend-multiply after:pointer-events-none"
      : treatment === "grade"
        ? "after:absolute after:inset-0 after:bg-gradient-to-t after:from-[var(--color-navy-900)]/80 after:via-[var(--color-navy-900)]/20 after:to-transparent after:pointer-events-none"
        : treatment === "tinted"
          ? "after:absolute after:inset-0 after:bg-[var(--color-navy-500)]/20 after:mix-blend-multiply after:pointer-events-none"
          : "";

  const frame = (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-surface-sunken)]",
        ratioClass[ratio],
        treatmentOverlay,
        frameClassName,
      )}
    >
      <NextImage
        alt={alt}
        fill={useFill ? true : undefined}
        sizes={useFill ? rest.sizes ?? "100vw" : rest.sizes}
        className={cn(useFill && "object-cover", className)}
        {...rest}
      />
    </div>
  );

  if (!caption) return frame;

  return (
    <figure className="flex flex-col gap-3">
      {frame}
      <figcaption className="label-mono text-[var(--color-paper-500)]">
        {caption}
      </figcaption>
    </figure>
  );
}
