import type { LucideIcon } from "lucide-react";
import { Network, Zap, Factory, Sun } from "lucide-react";

export type Solution = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  audience: string;
};

/**
 * The four customer verticals. Microgrids is the current flagship per
 * Phase 5 Q&A, so it's ordered first and gets the most detail.
 */
export const solutions: Solution[] = [
  {
    slug: "microgrids",
    label: "Microgrids",
    tagline: "Off-grid and remote power, solved.",
    description:
      "Standalone and hybrid microgrid systems for remote communities, industrial sites, and critical infrastructure where the nearest grid connection is hours away — or doesn't exist.",
    icon: Network,
    features: [
      "Black-start and islanded operation",
      "Diesel displacement with solar + storage",
      "Cold-climate thermal management",
      "Remote monitoring via Eneon Connect",
      "Containerized delivery and fast deployment",
    ],
    audience: "Remote communities, mining, oil & gas, military, telecom",
  },
  {
    slug: "utility",
    label: "Utility",
    tagline: "Grid-scale storage for a flexible future.",
    description:
      "Utility-scale battery systems for frequency regulation, capacity firming, peak shaving, and renewable integration. Engineered for 20+ year service life with augmentation pathways built in.",
    icon: Zap,
    features: [
      "Ancillary services (FCAS, FR, VAR)",
      "Peak shaving and capacity deferral",
      "Renewable firming and time-shifting",
      "Augmentation-ready DC architecture",
      "Direct grid-forming inverter support",
    ],
    audience: "Investor-owned utilities, co-ops, IPPs, transmission operators",
  },
  {
    slug: "commercial",
    label: "Commercial & Industrial",
    tagline: "Behind-the-meter savings and resilience.",
    description:
      "Behind-the-meter storage for commercial facilities, data centers, and industrial plants. Cuts demand charges, provides backup power, and unlocks participation in utility programs.",
    icon: Factory,
    features: [
      "Demand charge reduction",
      "Backup and islanding capability",
      "Time-of-use arbitrage",
      "Utility program integration",
      "Flexible siting (indoor / outdoor / rooftop)",
    ],
    audience: "Data centers, manufacturing, logistics, hospitals, campuses",
  },
  {
    slug: "solar-storage",
    label: "Solar + Storage",
    tagline: "Firm, dispatchable renewable power.",
    description:
      "Integrated solar-plus-storage systems that turn variable PV into firm, dispatchable capacity. DC-coupled or AC-coupled architectures to match your project economics.",
    icon: Sun,
    features: [
      "DC or AC coupling options",
      "PV clipping recovery",
      "Solar smoothing and curtailment",
      "ITC-compatible system design",
      "Integrated O&M contracts",
    ],
    audience: "Solar developers, EPCs, corporate PPA off-takers",
  },
];
