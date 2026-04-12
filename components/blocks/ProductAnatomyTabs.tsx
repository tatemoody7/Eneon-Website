"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Video } from "@/components/media";
import { cn } from "@/lib/cn";

export type AnatomyTab = {
  slug: string;
  label: string;
  description: string;
  video: string;
};

type ProductAnatomyTabsProps = {
  tabs: AnatomyTab[];
  poster?: string;
  className?: string;
};

/**
 * Tabbed anatomy walkthrough. Shows one looping video per BESS subsystem.
 * - Left rail: buttons with aria-selected + mono labels
 * - Right pane: active tab's Video, reusing the existing Video primitive
 *   (which handles desktop-only autoplay + prefers-reduced-motion)
 * - Arrow keys switch tabs, Home/End jump to first/last
 */
export function ProductAnatomyTabs({
  tabs,
  poster = "/videos/particle-wave-poster.jpg",
  className,
}: ProductAnatomyTabsProps) {
  const [active, setActive] = useState(0);
  const tablistId = useId();
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    btnRefs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  };

  const activeTab = tabs[active];

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start",
        className,
      )}
    >
      {/* Tab rail */}
      <div
        role="tablist"
        aria-label="BESS anatomy"
        aria-orientation="vertical"
        className="lg:col-span-4 flex flex-col hairline-t"
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          const id = `${tablistId}-tab-${tab.slug}`;
          const panelId = `${tablistId}-panel-${tab.slug}`;
          return (
            <button
              key={tab.slug}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              id={id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group w-full text-left py-5 pr-6 flex items-baseline gap-5 hairline-b",
                "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
                selected
                  ? "text-white"
                  : "text-white/50 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "label-mono shrink-0 w-8",
                  selected
                    ? "text-[var(--color-accent-500)]"
                    : "text-white/30 group-hover:text-[var(--color-accent-500)]",
                )}
              >
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <span className="flex-1 text-xl md:text-2xl font-medium tracking-[-0.02em]">
                {tab.label}
              </span>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 h-px w-6 bg-[var(--color-accent-500)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-precision)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Video panel */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {tabs.map((tab, i) => {
          const selected = i === active;
          const id = `${tablistId}-panel-${tab.slug}`;
          const tabId = `${tablistId}-tab-${tab.slug}`;
          return (
            <div
              key={tab.slug}
              id={id}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
              className="flex flex-col gap-6"
            >
              {/* Remount Video on active change so metadata re-loads cleanly */}
              {selected && (
                <Video
                  alt={`${tab.label} animation`}
                  sources={[{ src: tab.video, type: "video/webm" }]}
                  poster={poster}
                  ratio="16/9"
                  autoPlay
                  loop
                  muted
                  desktopOnlyAutoplay
                  treatment="ink-wash"
                />
              )}
              <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-2xl">
                {activeTab.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
