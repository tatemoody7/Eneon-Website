"use client";

import { motion } from "motion/react";

type HeroRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay between children */
  stagger?: number;
  /** Initial delay */
  delay?: number;
};

/**
 * Staggered reveal for hero content. Wraps children in motion.div
 * elements that fade in and slide up sequentially on page load.
 */
export function HeroReveal({
  children,
  className,
  stagger = 0.12,
  delay = 0.2,
}: HeroRevealProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.2, 0.8, 0.2, 1],
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
