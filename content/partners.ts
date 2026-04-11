import type { LogoItem } from "@/components/blocks";

/**
 * Partner + customer logos for the home page and about page LogoStrip.
 * Per Phase 5 Q&A, we use names from existing project pages as customer
 * proof. Real logo SVGs land in /public/brand/partners/ later.
 */

export const customerLogos: LogoItem[] = [
  { name: "Fort Chipewyan" },
  { name: "Old Crow" },
  { name: "Colville Lake" },
  { name: "Łutsël K'é" },
  { name: "Fort Smith" },
  { name: "Inuvik" },
];

export const partnerLogos: LogoItem[] = [
  { name: "{TODO: inverter partner}" },
  { name: "{TODO: integrator partner}" },
  { name: "{TODO: cell supplier}" },
  { name: "{TODO: EPC partner 1}" },
  { name: "{TODO: EPC partner 2}" },
  { name: "{TODO: utility partner}" },
];
