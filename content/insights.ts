/**
 * Insights / Knowledge Hub entries. Per Phase 5 Q&A, whitepapers are
 * ungated. Initial set is placeholder until real content is loaded.
 */

export type Insight = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  category: "Engineering" | "Case Study" | "Whitepaper" | "Perspective";
  readingTime: number;
  date: string;
  cover?: { src: string; alt: string };
  body?: string;
  downloadUrl?: string;
};

export const insights: Insight[] = [
  {
    slug: "microgrid-design-for-subarctic-communities",
    title: "Microgrid Design for Subarctic Communities",
    kicker: "Engineering",
    category: "Engineering",
    readingTime: 9,
    date: "2024-11-12",
    summary:
      "A field guide to sizing, siting, and operating battery storage in subarctic communities where winter lows regularly hit −40°C.",
    body: "{TODO: full article body — 1,200–1,800 words}",
  },
  {
    slug: "ul-9540a-what-it-means-for-site-design",
    title: "UL 9540A — What It Means for Site Design",
    kicker: "Whitepaper",
    category: "Whitepaper",
    readingTime: 14,
    date: "2024-09-03",
    summary:
      "An engineer-to-engineer walkthrough of the UL 9540A fire propagation test and how its results translate to NFPA 855 site layouts.",
    body: "{TODO: full whitepaper body}",
    downloadUrl: "{TODO: PDF URL for ungated download}",
  },
  {
    slug: "augmentation-vs-replacement",
    title: "Augmentation vs. Replacement — A 20-Year View",
    kicker: "Perspective",
    category: "Perspective",
    readingTime: 7,
    date: "2024-07-18",
    summary:
      "Why DC-block architecture matters more than cell chemistry for long-term BESS economics.",
    body: "{TODO: full article body}",
  },
  {
    slug: "fort-chipewyan-one-year-later",
    title: "Fort Chipewyan, One Year Later",
    kicker: "Case Study",
    category: "Case Study",
    readingTime: 11,
    date: "2024-05-02",
    summary:
      "Operational data from the first full year of our Fort Chipewyan solar + storage microgrid — diesel displacement, cycle counts, and lessons learned.",
    body: "{TODO: full case study body}",
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
