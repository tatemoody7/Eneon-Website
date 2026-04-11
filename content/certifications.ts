/**
 * Certification + compliance data. Per Phase 5 Q&A, the current stack is
 * UL 9540 / 9540A, IEC 62619 / 62933, NFPA 855.
 */

export type Certification = {
  code: string;
  label: string;
  category: "safety" | "performance" | "environmental";
  description: string;
  authority: string;
};

export const certifications: Certification[] = [
  {
    code: "UL 9540",
    label: "System",
    category: "safety",
    description:
      "Standard for Energy Storage Systems and Equipment — the baseline safety certification for complete BESS installations in North America.",
    authority: "UL Solutions",
  },
  {
    code: "UL 9540A",
    label: "Fire Test",
    category: "safety",
    description:
      "Large-scale fire propagation test method for battery energy storage systems. Validates that thermal runaway in one module does not cascade to adjacent units.",
    authority: "UL Solutions",
  },
  {
    code: "IEC 62619",
    label: "Cell Safety",
    category: "safety",
    description:
      "International safety standard for secondary lithium cells and batteries used in industrial applications.",
    authority: "International Electrotechnical Commission",
  },
  {
    code: "IEC 62933",
    label: "System Performance",
    category: "performance",
    description:
      "Standard defining the operational performance and testing methodology for electrical energy storage systems.",
    authority: "International Electrotechnical Commission",
  },
  {
    code: "NFPA 855",
    label: "Installation",
    category: "safety",
    description:
      "Standard for the Installation of Stationary Energy Storage Systems — governs spacing, ventilation, and emergency response planning.",
    authority: "National Fire Protection Association",
  },
];
