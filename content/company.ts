/**
 * Core company facts. Sourced from research/company_profile.md.
 * Mark anything unverified with `{TODO:}` so grep can find it later.
 */

export const company = {
  name: "Eneon",
  legalName: "Eneon ES Inc.",
  tagline: "Energy storage, engineered.",
  description:
    "Eneon ES designs, builds, and operates battery energy storage systems for microgrids, utilities, and commercial projects across North America.",
  shortDescription:
    "Battery energy storage systems engineered for microgrids, utilities, and commercial projects.",
  founded: "{TODO: founding year — verify in research/company_profile.md}",
  headquarters: {
    city: "Calgary",
    region: "Alberta",
    country: "Canada",
    line: "Calgary, Alberta, Canada",
  },
  contact: {
    email: "info@eneon-es.com",
    // Phone intentionally omitted per Phase 5 Q&A decision.
  },
  social: {
    linkedin: "https://www.linkedin.com/company/eneon-es",
    youtube: "https://www.youtube.com/@eneon-es",
  },
  origin: {
    label: "Engineered in Canada",
    description:
      "Designed, engineered, and assembled in Calgary, Alberta, with deployments across North America.",
  },
  mission:
    "Make battery energy storage the reliable backbone of the grid transition — engineered for harsh conditions, transparent operation, and long service life.",
} as const;

export type Company = typeof company;
