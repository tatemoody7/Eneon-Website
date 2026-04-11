"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type VideoSource = { src: string; type?: string };

type VideoProps = {
  sources: VideoSource[];
  poster: string;
  alt?: string;
  ratio?: "16/9" | "4/3" | "3/2" | "2/1" | "auto";
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  desktopOnlyAutoplay?: boolean;
  treatment?: "none" | "grade" | "ink-wash";
  className?: string;
  frameClassName?: string;
};

const ratioClass: Record<NonNullable<VideoProps["ratio"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "2/1": "aspect-[2/1]",
  auto: "",
};

/**
 * Lazy, poster-required video component.
 *
 * - `poster` is required so the frame is never empty before metadata loads
 * - `desktopOnlyAutoplay` gates autoplay to ≥md breakpoint so mobile never
 *   autoplays heavy hero video (per QA checklist)
 * - Respects prefers-reduced-motion — pauses automatically
 * - preload="metadata" to minimize mobile data
 * - muted + playsInline required for iOS inline playback
 */
export function Video({
  sources,
  poster,
  alt,
  ratio = "16/9",
  autoPlay = false,
  loop = true,
  muted = true,
  controls = false,
  desktopOnlyAutoplay = true,
  treatment = "none",
  className,
  frameClassName,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    if (!autoPlay) return;

    const shouldAutoplay = desktopOnlyAutoplay
      ? window.matchMedia("(min-width: 768px)").matches
      : true;

    if (shouldAutoplay) {
      video.play().catch(() => {
        /* autoplay blocked — user can still trigger via controls */
      });
    }
  }, [autoPlay, desktopOnlyAutoplay]);

  const treatmentOverlay =
    treatment === "grade"
      ? "after:absolute after:inset-0 after:bg-gradient-to-t after:from-[var(--color-navy-900)]/80 after:via-[var(--color-navy-900)]/20 after:to-transparent after:pointer-events-none"
      : treatment === "ink-wash"
        ? "after:absolute after:inset-0 after:bg-[var(--color-navy-500)]/10 after:mix-blend-multiply after:pointer-events-none"
        : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-surface-sunken)]",
        ratioClass[ratio],
        treatmentOverlay,
        frameClassName,
      )}
    >
      <video
        ref={videoRef}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        controls={controls}
        aria-label={alt}
        className={cn("h-full w-full object-cover", className)}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type ?? "video/mp4"} />
        ))}
        {alt && <p className="label-mono">{alt}</p>}
      </video>
    </div>
  );
}
