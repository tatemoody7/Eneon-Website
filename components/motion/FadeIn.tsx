"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type HTMLMotionProps,
} from "motion/react";

type FadeInProps = HTMLMotionProps<"div"> & {
  /** Slide direction and distance */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Slide distance in px */
  distance?: number;
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Trigger once or every time element enters viewport */
  once?: boolean;
  /** InView threshold (0–1) */
  threshold?: number;
  /** Render as a different element */
  as?: "div" | "section" | "article" | "li" | "span";
};

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
} as const;

export function FadeIn({
  direction = "up",
  distance = 24,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.15,
  as = "div",
  children,
  ...rest
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const d = directionMap[direction];

  const Component = motion.create(as as "div");

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{
        duration,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
