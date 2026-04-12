import type { TeamCardProps } from "@/components/blocks";

/**
 * Team roster. Sourced from research/company_profile.md cross-referenced
 * against the live eneon-es.com team page and the 2023 USCE acquisition
 * press release. Bios are condensed from public LinkedIn and press sources.
 */

export type TeamMember = TeamCardProps & {
  slug: string;
  bio?: string;
  order: number;
};

export const team: TeamMember[] = [
  {
    slug: "ken-franklin",
    order: 1,
    name: "Ken Franklin",
    title: "President",
    department: "Leadership",
    photo: {
      src: "/images/team/ken-franklin.webp",
      alt: "Ken Franklin, President of Eneon ES",
    },
    bio: "20+ years in project management and engineering across Canadian energy infrastructure. P.Eng and PMP. Joined Eneon after seven years with Tundra Process Solutions. Named President in 2023.",
  },
  {
    slug: "huang-iu",
    order: 2,
    name: "Huang-Yee Iu",
    title: "Founder & Chief Technology Officer",
    department: "Leadership",
    photo: {
      src: "/images/team/huang-iu.png",
      alt: "Huang-Yee Iu, Founder and CTO of Eneon ES",
    },
    bio: "Mechanical engineer (B.A.Sc., M.A.Sc., University of Toronto) with two decades in battery systems — from automotive PHEV packs at A123 Systems to stationary microgrid storage. Founded Eneon ES in 2013 inside Canadian Energy's Markham R&D facility.",
  },
  {
    slug: "jason-beacock",
    order: 3,
    name: "Jason Beacock",
    title: "Chief Commercial Officer",
    department: "Commercial",
    photo: {
      src: "/images/team/jason-beacock.webp",
      alt: "Jason Beacock, Chief Commercial Officer of Eneon ES",
    },
    bio: "25+ years in energy, infrastructure, and project commercialization. Leads sales, marketing, and customer strategy across the North American fleet.",
  },
  {
    slug: "jason-ehrman",
    order: 4,
    name: "Jason Ehrman",
    title: "Managing Director, Operations & Execution",
    department: "Operations",
    photo: {
      src: "/images/team/jason-ehrman.jpg",
      alt: "Jason Ehrman, Managing Director of Operations & Execution at Eneon ES",
    },
    bio: "25+ years across military defense, oil & gas, and renewables. Oversees project management, engineering, supply chain, procurement, and project finance.",
  },
  {
    slug: "joshua-wiseman",
    order: 5,
    name: "Joshua Wiseman",
    title: "Managing Director, Technical Services",
    department: "Operations",
    photo: {
      src: "/images/team/joshua-wiseman.jpg",
      alt: "Joshua Wiseman, Managing Director of Technical Services at Eneon ES",
    },
    bio: "15+ years leading industrial services and operations teams. Runs commissioning, field operations, and long-term maintenance programs across the deployed fleet.",
  },
];

export const teamDepartments = [
  "Leadership",
  "Engineering",
  "Operations",
  "Commercial",
] as const;

export type TeamDepartment = (typeof teamDepartments)[number];
