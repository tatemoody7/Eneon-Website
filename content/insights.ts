/**
 * Insights / Knowledge Hub entries. Whitepapers are ungated.
 * Article bodies are drafted for the rebuild and should be reviewed
 * by Eneon engineering before public launch.
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
    slug: "solar-clipping-recapture",
    title: "Solar Clipping Recapture — The Case for DC-Coupled Storage",
    kicker: "Engineering",
    category: "Engineering",
    readingTime: 9,
    date: "2024-11-12",
    cover: { src: "/images/projects/project-drone-01.jpg", alt: "Aerial view of a solar + storage deployment" },
    summary:
      "Why DC-coupled battery storage is often the cheapest megawatt-hour in a solar-plus-storage project — and how to size it against measured inverter clipping losses.",
    body: `Every fixed-inverter solar array leaves energy on the table. When irradiance and temperature push DC output above the inverter's AC nameplate, the excess is clipped and lost. For community solar developers, that clipped energy has already been paid for in modules, racking, and interconnection — but it never reaches the grid.\n\nDC-coupled battery storage captures that clipped energy without oversizing the inverter. Because the battery sits behind the same inverter as the PV array, it absorbs the overproduction directly and discharges later, when the array is producing less than the AC limit. The result is a higher effective DC-to-AC ratio, more delivered energy per interconnected megawatt, and a capacity factor uplift that typically pays for the battery on clipping recovery alone.\n\nThe engineering question is not whether to recapture clipping, but how much storage to install for a given array. The answer depends on the site's measured clipping profile — a function of module count, inverter sizing, orientation, weather, and soiling. Eneon builds project-specific clipping models from hourly production data and pairs them with DC-coupled Eneon BESS sizing. In the typical US SMART / community solar configuration, a 1-to-4 MWh battery paired with a 3-to-5 MW PV block returns clipped energy with better-than-90-percent round-trip efficiency.\n\nThe result, documented across Eneon's Massachusetts and Illinois deployments, is simple: storage is the cheapest additional MWh on the site, and the fastest to install.`,
  },
  {
    slug: "ul-9540a-site-design",
    title: "UL 9540A — What It Means for Site Design",
    kicker: "Whitepaper",
    category: "Whitepaper",
    readingTime: 14,
    date: "2024-09-03",
    cover: { src: "/images/product/product-gtr-01.webp", alt: "Eneon BESS containerized platform" },
    summary:
      "An engineer-to-engineer walkthrough of the UL 9540A fire propagation test and how its results translate to NFPA 855 site layouts.",
    body: `UL 9540A is a large-scale fire propagation test methodology. It is not a pass/fail safety standard — it is a measurement framework. Its output is a dataset that installation engineers and authorities having jurisdiction (AHJs) use to determine separation distances, deflagration venting, and emergency response under NFPA 855.\n\nA UL 9540A test burns through four levels of hierarchy: cell, module, unit, and installation. The test sequence ends as soon as the results are sufficient to characterize thermal runaway propagation at the chosen level. For modern LFP systems, most tests stop at the unit level because LFP chemistry does not propagate in the same way as NMC.\n\nFor a site designer, the UL 9540A report answers three concrete questions. First, does the system propagate from one unit to the next? Second, what is the peak heat release rate and combustion gas composition? Third, what deflagration risk exists inside an enclosure?\n\nNFPA 855 then applies those answers to the installation. Separation distances between enclosures, clearance from property lines and buildings, and required suppression systems all flow from the UL 9540A data. Eneon's containerized BESS platform has been designed against this regulatory chain from the start, which is why site layouts can typically be finalized during the interconnection study rather than after equipment is on-site.`,
    downloadUrl: "mailto:info@eneon-es.com?subject=UL%209540A%20Whitepaper%20Request",
  },
  {
    slug: "augmentation-vs-replacement",
    title: "Augmentation vs. Replacement — A 20-Year View",
    kicker: "Perspective",
    category: "Perspective",
    readingTime: 7,
    date: "2024-07-18",
    cover: { src: "/images/product/engineering-01.webp", alt: "BESS engineering and battery module design" },
    summary:
      "Why DC-block architecture matters more than cell chemistry for long-term BESS economics.",
    body: `Every lithium battery degrades. Calendar aging, cycle aging, and depth-of-discharge effects combine to drive capacity loss on a known curve. The question for a 20-year asset is not whether the battery will need more energy over time — it will — but how the system is designed to handle that addition.\n\nThere are two architectural answers. The first is replacement: the battery is treated as a consumable, and the entire DC block is swapped for a fresh one when end-of-life capacity is reached. The second is augmentation: the system is designed with physical and electrical headroom so additional cells can be added in-place, without touching the existing fleet.\n\nAugmentation is cheaper per added megawatt-hour, but it only works if three things were specified correctly up front: thermal management capacity, DC bus headroom, and inverter overhead. Skimping on any of the three turns augmentation back into replacement.\n\nEneon's BESS platform is specified for augmentation. The DC block is sized with capacity headroom on day one, the HVAC system is sized for the augmented case, and the inverter is selected with spare DC input bandwidth. Over a 20-year asset life, that choice is typically worth a single-digit-percent capex premium and a double-digit-percent lifetime savings.\n\nFor long-tenor offtake contracts — PPAs, tolling agreements, and capacity market positions — that delta is the difference between a profitable asset and a stranded one.`,
  },
  {
    slug: "microgrid-white-paper",
    title: "Microgrid Design for Commercial Resiliency",
    kicker: "Whitepaper",
    category: "Whitepaper",
    readingTime: 11,
    date: "2024-05-02",
    cover: { src: "/images/projects/project-img-1350.jpg", alt: "Community grid resiliency battery installation" },
    summary:
      "A field guide to sizing, siting, and operating battery-based microgrids for commercial facilities that need to ride through utility outages.",
    body: `A commercial microgrid is a battery-backed island that can carry a defined set of critical loads through a utility outage. The engineering problem is not the battery — it is deciding what counts as critical, and for how long.\n\nStep one is the critical load inventory: identify the loads that absolutely must stay online, the loads that can be shed gracefully, and the loads that can go dark. This decomposition drives the energy rating of the battery. Step two is the discharge profile: how long must the island carry those loads before utility service is restored or a generator is brought online? This drives the depth-of-discharge window and therefore the useful capacity.\n\nStep three is the control strategy. Will the battery run in grid-following mode and seamlessly transfer to grid-forming on detection of a utility fault? Will it run a black-start sequence? Will it island-sync back to the utility without a transient? Each of these capabilities carries a cost — in both the inverter selection and the EMS firmware — and needs to be specified early.\n\nStep four is the economics. A critical-load-only microgrid is usually too small to pay back on resiliency alone. Most successful commercial microgrid economics stack resiliency with an active revenue stream: Global Adjustment peak shaving in Ontario, demand charge management in California, or participation in a utility program like National Grid ConnectedSolutions.\n\nEneon's approach is to co-design the battery, the inverter, and the EMS from day one against a specific critical load list. That keeps the system right-sized and the economics real.`,
    downloadUrl: "mailto:info@eneon-es.com?subject=Microgrid%20Whitepaper%20Request",
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
