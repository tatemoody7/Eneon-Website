/**
 * Home page copy deck. Pulled into app/page.tsx in Step 10.
 * Written per Phase 5 design_system.md voice guidance: B2B industrial,
 * engineering-first, no eco-cliché.
 */

export const home = {
  hero: {
    eyebrow: "Battery Energy Storage",
    headline: "Energy storage, engineered.",
    subhead:
      "Eneon ES designs, builds, and operates battery energy storage systems for microgrids, utilities, and commercial projects across North America.",
    primaryCta: { label: "Request a Quote", href: "/quote" },
    secondaryCta: { label: "Explore the Platform", href: "/product" },
  },
  stats: [
    { value: "250", unit: "MWh", label: "Capacity Deployed" },
    { value: "13", unit: "", label: "Projects Operational" },
    { value: "20", unit: "yr", label: "Service Life" },
    { value: "−40", unit: "°C", label: "Cold-Rated" },
  ],
  intro: {
    eyebrow: "Who we are",
    title:
      "A senior team of engineers and field specialists, based in Calgary.",
    description:
      "We build battery systems for the places and customers other storage companies find too hard — remote communities, harsh climates, long timelines. Every deployment comes with real engineering, real field support, and the software to prove it.",
  },
  solutionsIntro: {
    eyebrow: "What we build for",
    title: "Storage for every grid configuration.",
    description:
      "From off-grid subarctic microgrids to utility-scale frequency regulation — the same modular platform, configured to the application.",
  },
  productIntro: {
    eyebrow: "The platform",
    title: "One modular BESS platform. Every application.",
    description:
      "A containerized, augmentation-ready battery energy storage platform engineered for harsh conditions and long service life.",
  },
  connectIntro: {
    eyebrow: "The software",
    title: "Every cell. Every moment. Observable.",
    description:
      "Eneon Connect ships with every system. Real-time telemetry, remote dispatch, and a cell-level view of system health.",
  },
  projectsIntro: {
    eyebrow: "Field proof",
    title: "Deployed where it matters.",
    description:
      "From the east arm of Great Slave Lake to the Arctic coast — our systems operate in places where downtime is not an option.",
  },
  finalCta: {
    eyebrow: "Ready to build",
    title: "Let's engineer your storage project.",
    description:
      "Tell us what you need. An Eneon engineer will respond within one business day.",
    primary: { label: "Request a Quote", href: "/quote" },
    secondary: { label: "Size my System", href: "/sizing-tool" },
  },
};
