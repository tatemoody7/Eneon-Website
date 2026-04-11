/**
 * Careers / open positions data. Job board is a Phase 2 addition —
 * start with a thin list that can be edited easily.
 */

export type JobPosting = {
  slug: string;
  title: string;
  department: "Engineering" | "Operations" | "Commercial" | "Leadership";
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  remote: "On-site" | "Hybrid" | "Remote";
  summary: string;
  posted: string;
  applyUrl?: string;
};

export const openPositions: JobPosting[] = [
  {
    slug: "senior-power-electronics-engineer",
    title: "Senior Power Electronics Engineer",
    department: "Engineering",
    location: "Calgary, AB",
    type: "Full-time",
    remote: "Hybrid",
    posted: "Open",
    summary:
      "Lead the design of power conversion stages and DC-block architectures for utility and microgrid BESS deployments.",
    applyUrl: "mailto:careers@eneon-es.com",
  },
  {
    slug: "field-commissioning-engineer",
    title: "Field Commissioning Engineer",
    department: "Operations",
    location: "Calgary, AB (travel)",
    type: "Full-time",
    remote: "On-site",
    posted: "Open",
    summary:
      "Own the commissioning of containerized BESS installations across Canada, from factory acceptance through first-year operations handoff.",
    applyUrl: "mailto:careers@eneon-es.com",
  },
];

export const careersIntro = {
  heading: "Build the backbone of the grid transition.",
  description:
    "We're a small, senior team of engineers, operators, and field specialists based in Calgary. If you care about doing storage right — not fast — we'd love to hear from you.",
  values: [
    "Engineer for the 20-year view, not the quarterly demo.",
    "Transparent operation — internal and external.",
    "Bias toward field experience over theory.",
  ],
};
