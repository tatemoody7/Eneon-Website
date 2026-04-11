import type { ProjectCardProps } from "@/components/blocks";

/**
 * Project case studies. Names and locations are from the existing
 * eneon-es.com project pages (Phase 2 crawl). Capacities are
 * {TODO:} until we verify from the original data sheets or tag sheets.
 */

export type Project = ProjectCardProps & {
  summary: string;
  client?: string;
  commissioned?: string;
  highlights: string[];
  /** Keep slug in sync with the <Link href="/projects/[slug]"> route */
  slug: string;
};

const placeholderImage = (title: string) => ({
  src: `https://placehold.co/1200x800/0E2F5C/FAF8F4?text=${encodeURIComponent(title)}`,
  alt: `${title} — project photo placeholder`,
});

export const projects: Project[] = [
  {
    slug: "fort-chipewyan",
    title: "Fort Chipewyan Solar + Storage",
    location: "Fort Chipewyan, AB",
    capacityMwh: 2.5,
    powerMw: 0.6,
    type: "Microgrid",
    status: "Operational",
    year: 2020,
    summary:
      "Off-grid solar + battery microgrid serving Fort Chipewyan, the oldest European settlement in Alberta. Displaces diesel generation with a hybrid PV-plus-storage system built for subarctic conditions.",
    highlights: [
      "Displaces over 650,000 L of diesel fuel per year",
      "Built to operate through −40°C winters",
      "Integrated with existing community diesel gensets",
      "Remote monitoring via Eneon Connect",
    ],
    image: placeholderImage("Fort Chipewyan"),
  },
  {
    slug: "old-crow",
    title: "Old Crow Solar Project",
    location: "Old Crow, YT",
    capacityMwh: 1.0,
    powerMw: 0.3,
    type: "Microgrid",
    status: "Operational",
    year: 2021,
    summary:
      "Battery storage paired with solar PV for the Vuntut Gwitchin First Nation community of Old Crow — the northernmost community in Yukon, accessible only by air.",
    highlights: [
      "Powered by solar above the Arctic Circle",
      "Fly-in deployment logistics",
      "Seamless handoff with existing diesel infrastructure",
    ],
    image: placeholderImage("Old Crow"),
  },
  {
    slug: "colville-lake",
    title: "Colville Lake Hybrid",
    location: "Colville Lake, NT",
    type: "Microgrid",
    status: "Operational",
    year: 2019,
    summary:
      "Hybrid diesel-solar-battery microgrid serving the Dene community of Colville Lake in Canada's Northwest Territories.",
    highlights: [
      "Operates in total energy islanding mode",
      "Seasonal load balancing",
      "{TODO: capacity + power rating}",
    ],
    image: placeholderImage("Colville Lake"),
  },
  {
    slug: "lutsel-ke",
    title: "Łutsël K'é Solar + Storage",
    location: "Łutsël K'é, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Renewable microgrid on the east arm of Great Slave Lake, supporting the Łutsël K'é Dene First Nation.",
    highlights: [
      "Integrated with community-owned solar array",
      "Diesel displacement + grid resilience",
      "{TODO: year + capacity}",
    ],
    image: placeholderImage("Łutsël K'é"),
  },
  {
    slug: "fort-smith",
    title: "Fort Smith BESS",
    location: "Fort Smith, NT",
    type: "Utility",
    status: "Operational",
    summary:
      "Utility battery storage deployment providing grid support and renewable integration for Fort Smith.",
    highlights: [
      "Peak shaving and diesel fuel reduction",
      "Grid-support services",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Fort Smith"),
  },
  {
    slug: "jean-marie-river",
    title: "Jean Marie River Microgrid",
    location: "Jean Marie River, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Small-scale microgrid solution serving the Jean Marie River First Nation.",
    highlights: [
      "Hybrid generation",
      "Community-scale deployment",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Jean Marie River"),
  },
  {
    slug: "wekweeti",
    title: "Wekweètì Hybrid",
    location: "Wekweètì, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Integrated solar-plus-storage solution for the Tłı̨chǫ community of Wekweètì.",
    highlights: [
      "Subarctic operating conditions",
      "Hybrid with diesel generation",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Wekweètì"),
  },
  {
    slug: "gameti",
    title: "Gamètì Solar Integration",
    location: "Gamètì, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Solar + storage integration with existing diesel-powered infrastructure in Gamètì.",
    highlights: [
      "Diesel displacement",
      "Cold-weather operation",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Gamètì"),
  },
  {
    slug: "whati",
    title: "Whatì BESS",
    location: "Whatì, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Battery storage deployment enabling renewable integration and grid stability for Whatì.",
    highlights: [
      "Renewable firming",
      "Remote operation",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Whatì"),
  },
  {
    slug: "tuktoyaktuk",
    title: "Tuktoyaktuk Storage",
    location: "Tuktoyaktuk, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Arctic-coast battery storage deployment supporting local grid and diesel reduction.",
    highlights: [
      "Northernmost Canadian mainland",
      "Arctic conditions",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Tuktoyaktuk"),
  },
  {
    slug: "inuvik",
    title: "Inuvik Hybrid System",
    location: "Inuvik, NT",
    type: "Utility",
    status: "Operational",
    summary:
      "Utility-connected storage supporting Inuvik's grid modernization efforts.",
    highlights: [
      "Grid modernization",
      "Integration with wind and solar",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Inuvik"),
  },
  {
    slug: "aklavik",
    title: "Aklavik Microgrid",
    location: "Aklavik, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Hybrid renewable microgrid solution for the Mackenzie Delta community of Aklavik.",
    highlights: [
      "Mackenzie Delta deployment",
      "Hybrid renewable",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Aklavik"),
  },
  {
    slug: "fort-good-hope",
    title: "Fort Good Hope Solar Project",
    location: "Fort Good Hope, NT",
    type: "Microgrid",
    status: "Operational",
    summary:
      "Solar + storage project serving the K'asho Got'ine community of Fort Good Hope.",
    highlights: [
      "Community-scale renewable integration",
      "Diesel displacement",
      "{TODO: project stats}",
    ],
    image: placeholderImage("Fort Good Hope"),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const totalProjects = projects.length;
