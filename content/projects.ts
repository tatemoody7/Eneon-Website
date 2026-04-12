import type { ProjectCardProps } from "@/components/blocks";

/**
 * Project case studies. Data pulled from the live eneon-es.com project
 * pages (Phase 2 crawl) and research/company_profile.md. Capacities and
 * locations match Eneon's public record. Project photos reuse the stock
 * imagery shipped with the rebuild; swap to specific photos when available.
 */

export type Project = ProjectCardProps & {
  summary: string;
  client?: string;
  commissioned?: string;
  highlights: string[];
  /** Keep slug in sync with the <Link href="/projects/[slug]"> route */
  slug: string;
  /** Additional project photos for the detail page gallery */
  gallery?: { src: string; alt: string }[];
  /** Location map image for the detail page */
  mapImage?: { src: string; alt: string };
};

const img = (src: string, alt: string) => ({ src, alt });

export const projects: Project[] = [
  {
    slug: "solar-storage-freetown",
    title: "Freetown Solar + Storage",
    location: "Freetown, MA",
    capacityMwh: 21.45,
    powerMw: 5.0,
    type: "Utility",
    status: "Operational",
    summary:
      "21.45 MWh solar-plus-storage system paired with a community solar array in southeastern Massachusetts — one of the largest DC-coupled deployments in the Eneon fleet.",
    highlights: [
      "DC-coupled architecture for maximum PV harvest",
      "Interconnected under Massachusetts SMART program",
      "Integrated dispatch via Eneon Connect",
    ],
    image: img("/images/projects/project-drone-01.jpg", "Freetown Massachusetts solar + storage site, aerial view"),
    gallery: [
      img("/images/projects/project-10.webp", "BESS enclosure on-site at Freetown"),
      img("/images/projects/project-12.webp", "System commissioning at Freetown project"),
    ],
  },
  {
    slug: "solar-storage-lyon-county",
    title: "Lyon County AC Solar + Storage",
    location: "Lyon County, MN",
    capacityMwh: 26.0,
    powerMw: 6.0,
    type: "Utility",
    status: "Operational",
    summary:
      "26 MWh AC-coupled solar + battery deployment serving Lyon County, Minnesota — Eneon's largest single-site storage installation to date.",
    highlights: [
      "AC-coupled architecture for grid-services flexibility",
      "Capacity firming and peak-shift dispatch",
      "Cold-climate thermal management",
    ],
    image: img("/images/projects/project-m-01.webp", "Lyon County Minnesota AC solar + storage"),
    gallery: [
      img("/images/projects/project-13.webp", "Lyon County storage installation progress"),
      img("/images/projects/project-14.webp", "Lyon County BESS enclosures in field"),
    ],
  },
  {
    slug: "solar-storage-beardstown",
    title: "Beardstown Solar + Storage",
    location: "Beardstown, IL",
    capacityMwh: 11.9,
    powerMw: 3.0,
    type: "Utility",
    status: "Operational",
    summary:
      "11.9 MWh community-scale solar-plus-storage project in Beardstown, Illinois. Firms up midday solar output and extends delivery into the evening peak.",
    highlights: [
      "Community solar + storage configuration",
      "Integrated with regional ISO dispatch",
      "Full remote diagnostics via Eneon Connect",
    ],
    image: img("/images/projects/project-m-02.webp", "Beardstown Illinois solar + storage facility"),
  },
  {
    slug: "solar-storage-oregon-il",
    title: "Oregon Solar + Storage",
    location: "Oregon, IL",
    capacityMwh: 6.8,
    powerMw: 1.9,
    type: "Utility",
    status: "Operational",
    summary:
      "6.8 MWh / 1.9 MW solar-plus-storage deployment in Ameren territory, Oregon, Illinois. Designed for continuous midday shifting and grid-support services.",
    highlights: [
      "1.9 MW continuous power rating",
      "Ameren interconnection",
      "Containerized, augmentation-ready platform",
    ],
    image: img("/images/projects/project-nr-01.webp", "Oregon Illinois solar + storage deployment"),
    mapImage: img("/images/projects/map-project-08.png", "Oregon Illinois project location map"),
  },
  {
    slug: "solar-storage-southwick",
    title: "Southwick Solar + Storage",
    location: "Southwick, MA",
    capacityMwh: 5.45,
    powerMw: 1.5,
    type: "Utility",
    status: "Operational",
    summary:
      "5.45 MWh solar + battery storage system serving Southwick, Massachusetts. Delivered under the state SMART program with integrated PV.",
    highlights: [
      "SMART program interconnection",
      "DC-coupled solar integration",
      "Long-duration dispatch profile",
    ],
    image: img("/images/projects/project-p5.jpg", "Southwick Massachusetts solar + storage project"),
    mapImage: img("/images/projects/map-project-05.png", "Southwick Massachusetts project location map"),
    gallery: [
      img("/images/projects/project-05.png", "Southwick BESS site layout"),
    ],
  },
  {
    slug: "solar-storage-needham",
    title: "Needham Solar + Storage",
    location: "Needham, MA",
    capacityMwh: 0.68,
    powerMw: 0.25,
    type: "Commercial",
    status: "Operational",
    summary:
      "0.68 MWh small-footprint solar-plus-storage installation serving a Needham, Massachusetts customer under the SMART program.",
    highlights: [
      "Compact behind-the-meter deployment",
      "Rapid site mobilization",
      "Automated dispatch via Eneon Connect",
    ],
    image: img("/images/projects/project-m-03.webp", "Needham Massachusetts solar + storage"),
  },
  {
    slug: "methuen-ftm-solar-storage",
    title: "Methuen FTM AC Solar + Storage",
    location: "Methuen, MA",
    capacityMwh: 1.0,
    powerMw: 0.5,
    type: "Commercial",
    status: "Operational",
    summary:
      "1,000 kWh front-of-the-meter AC solar + storage installation for a Methuen, Massachusetts host. AC coupling enables flexible grid-support dispatch.",
    highlights: [
      "Front-of-the-meter utility interconnection",
      "AC-coupled architecture",
      "SMART program participation",
    ],
    image: img("/images/projects/project-p7.webp", "Methuen Massachusetts FTM AC solar + storage"),
  },
  {
    slug: "norfolk-ftm-solar-storage",
    title: "Norfolk FTM AC Solar + Storage",
    location: "Norfolk, MA",
    capacityMwh: 2.5,
    powerMw: 1.0,
    type: "Commercial",
    status: "Operational",
    summary:
      "2,500 kWh front-of-the-meter AC solar + storage system serving Norfolk, Massachusetts. Built to the same containerized Eneon BESS platform used across the fleet.",
    highlights: [
      "2.5 MWh capacity, 1 MW continuous power",
      "Front-of-the-meter grid services",
      "Containerized platform with augmentation headroom",
    ],
    image: img("/images/projects/project-nr-02.webp", "Norfolk Massachusetts FTM solar + storage"),
  },
  {
    slug: "global-adjustment-mississauga-2500",
    title: "Global Adjustment — Mississauga (2.5 MWh)",
    location: "Mississauga, ON",
    capacityMwh: 2.5,
    powerMw: 0.5,
    type: "Commercial",
    status: "Operational",
    summary:
      "2,500 kWh behind-the-meter storage system deployed for a Mississauga industrial host to shave Ontario's Global Adjustment (Class A) peak hours.",
    highlights: [
      "Targets Ontario Class A Global Adjustment",
      "Fully automated peak-hour dispatch",
      "Payback driven by GA demand-charge avoidance",
    ],
    image: img("/images/projects/project-site-01.jpg", "Mississauga industrial BESS installation"),
  },
  {
    slug: "global-adjustment-mississauga-1250",
    title: "Global Adjustment — Mississauga (1.25 MWh)",
    location: "Mississauga, ON",
    capacityMwh: 1.25,
    powerMw: 0.3,
    type: "Commercial",
    status: "Operational",
    summary:
      "1,250 kWh behind-the-meter battery for a second Mississauga commercial host. Designed to reduce Global Adjustment exposure through Class A peak avoidance.",
    highlights: [
      "Behind-the-meter deployment",
      "Class A Global Adjustment optimization",
      "Compact indoor-compatible footprint",
    ],
    image: img("/images/projects/project-dsc01391.jpg", "Mississauga commercial peak-shaving BESS"),
  },
  {
    slug: "global-adjustment-etobicoke",
    title: "Global Adjustment — Etobicoke",
    location: "Etobicoke, ON",
    capacityMwh: 1.25,
    powerMw: 0.3,
    type: "Commercial",
    status: "Operational",
    summary:
      "1,250 kWh peak-shaving battery for an Etobicoke industrial customer participating in Ontario's Global Adjustment program.",
    highlights: [
      "Industrial behind-the-meter application",
      "Automated ICI dispatch",
      "Measured savings through Eneon Connect",
    ],
    image: img("/images/projects/project-je-01.jpg", "Etobicoke Ontario commercial BESS"),
  },
  {
    slug: "global-adjustment-mitchell",
    title: "Global Adjustment — Mitchell",
    location: "Mitchell, ON",
    type: "Commercial",
    status: "Operational",
    summary:
      "Peak-shaving battery deployment for a Mitchell, Ontario host. Reduces Global Adjustment exposure through automated Class A peak-hour dispatch.",
    highlights: [
      "Rural Ontario deployment",
      "Class A Global Adjustment participation",
      "Full remote monitoring",
    ],
    image: img("/images/projects/project-dsc09979.jpg", "Mitchell Ontario peak-shaving BESS"),
  },
  {
    slug: "community-grid-resiliency",
    title: "Community Grid Resiliency",
    location: "Waterton, AB",
    capacityMwh: 5.2,
    powerMw: 1.0,
    type: "Microgrid",
    status: "Operational",
    summary:
      "5,200 kWh community grid-resiliency battery designed to keep critical loads online during outages. A cornerstone deployment of Eneon's microgrid practice.",
    highlights: [
      "Black-start and islanding capability",
      "Integrated with community critical infrastructure",
      "Harsh-climate thermal management",
    ],
    image: img("/images/projects/project-img-1350.jpg", "Community grid resiliency battery in Waterton Alberta"),
    mapImage: img("/images/projects/map-project-17.png", "Waterton Alberta community grid project location map"),
    gallery: [
      img("/images/projects/project-uc.jpg", "BESS units at the Waterton community grid site"),
      img("/images/projects/project-f01.png", "Community grid resiliency system installation"),
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const totalProjects = projects.length;
