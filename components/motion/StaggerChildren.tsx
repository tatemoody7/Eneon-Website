"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type StaggerChildrenProps = {
  children: React.ReactNode;
  /** Stagger delay between children in seconds */
  stagger?: number;
  /** Initial delay before stagger starts */
  delay?: number;
  /** Animation duration per child */
  duration?: number;
  /** Direction children slide in from */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Slide distance in px */
  distance?: number;
  /** Trigger once */
  once?: boolean;
  className?: string;
};

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
} as const;

export function StaggerChildren({
  children,
  stagger = 0.08,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 20,
  once = true,
  className,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const d = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: d.x * distance, y: d.y * distance },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    duration,
                    ease: [0.2, 0.8, 0.2, 1],
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
