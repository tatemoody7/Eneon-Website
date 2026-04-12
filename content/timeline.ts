import type { TimelineEntry } from "@/components/blocks";

/**
 * Company timeline. Dates verified against research/company_profile.md.
 */

export const companyTimeline: TimelineEntry[] = [
  {
    year: "2013",
    title: "Eneon ES founded",
    description:
      "Eneon ES is established by Canadian Energy as its battery storage arm. R&D facility opens in Markham, Ontario, led by founder and CTO Huang-Yee Iu.",
    image: { src: "/images/timeline/2013.jpg", alt: "Eneon ES founding in 2013 — early R&D at the Markham facility" },
  },
  {
    year: "2016",
    title: "First prototype systems",
    description:
      "Initial battery storage prototypes undergo testing and validation, laying the groundwork for the commercial FlexBlock platform.",
    image: { src: "/images/timeline/2016.jpg", alt: "Early Eneon prototype battery system testing in 2016" },
  },
  {
    year: "2018",
    title: "Tundra Process Solutions joins as second partner",
    description:
      "Tundra Process Solutions of Calgary becomes a founding partner, anchoring Eneon's engineering and fabrication operations in Alberta.",
    image: { src: "/images/timeline/2018.png", alt: "Tundra Process Solutions partnership announcement in 2018" },
  },
  {
    year: "2020",
    title: "First commercial solar + storage projects",
    description:
      "Commissions early community-scale DC-coupled solar + storage systems in the US Midwest and New England, alongside Ontario Global Adjustment peak-shaving batteries.",
    image: { src: "/images/timeline/2020.png", alt: "First Eneon commercial solar + storage deployment in 2020" },
  },
  {
    year: "2021",
    title: "Fleet expansion across North America",
    description:
      "Rapid growth with multiple simultaneous deployments across Massachusetts, Illinois, and Minnesota. Total operational capacity exceeds 50 MWh.",
    image: { src: "/images/timeline/2021.png", alt: "Eneon fleet expansion across North America in 2021" },
  },
  {
    year: "2022",
    title: "Eneon Connect launched",
    description:
      "Releases the Eneon Connect monitoring and dispatch platform, shipping by default with every BESS and providing cell-level telemetry and remote operations.",
  },
  {
    year: "2023",
    title: "Joins US Clean Energy",
    description:
      "Eneon ES is acquired by US Clean Energy, expanding commercial reach across North America while retaining its senior engineering team and Calgary base.",
    image: { src: "/images/timeline/2023.png", alt: "Eneon ES joins US Clean Energy in 2023" },
  },
];
