"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

type Filter = "All" | "Utility" | "Commercial" | "Microgrid";

export function ProjectFilterGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(
    () => ({
      All: projects.length,
      Utility: projects.filter((p) => p.type === "Utility").length,
      Commercial: projects.filter((p) => p.type === "Commercial").length,
      Microgrid: projects.filter((p) => p.type === "Microgrid").length,
    }),
    [projects],
  );

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);

  const filters: Filter[] = ["All", "Utility", "Commercial", "Microgrid"];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by type"
        className="flex flex-wrap items-center gap-0 hairline-b"
      >
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={cn(
                "group relative flex items-baseline gap-3 px-6 py-5",
                "font-mono text-[11px] uppercase tracking-[0.12em]",
                "transition-colors duration-[var(--duration-base)] ease-[var(--ease-precision)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-500)]",
                active
                  ? "text-[var(--color-navy-500)]"
                  : "text-[var(--color-paper-500)] hover:text-[var(--color-navy-500)]",
              )}
            >
              <span>{f}</span>
              <span
                className={cn(
                  "stat-digit text-xs",
                  active
                    ? "text-[var(--color-accent-600)]"
                    : "text-[var(--color-paper-400)]",
                )}
              >
                {String(counts[f]).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-px h-[2px]",
                  "transition-transform duration-[var(--duration-base)] ease-[var(--ease-precision)]",
                  active
                    ? "scale-x-100 bg-[var(--color-navy-500)]"
                    : "scale-x-0 bg-[var(--color-navy-300)] group-hover:scale-x-100",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard
            key={p.slug}
            title={p.title}
            slug={p.slug}
            location={p.location}
            type={p.type}
            status={p.status}
            capacityMwh={p.capacityMwh}
            powerMw={p.powerMw}
            year={p.year}
            image={p.image}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[var(--color-paper-500)]">
          No projects match this filter.
        </p>
      )}
    </div>
  );
}
