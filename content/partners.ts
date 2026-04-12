import type { LogoItem } from "@/components/blocks";

/**
 * Partner + customer references used on the home page and about page
 * LogoStrip. Names sourced from research/company_profile.md and the
 * existing eneon-es.com project pages. Real logo SVGs land in
 * /public/brand/partners/ when available.
 */

export const customerLogos: LogoItem[] = [
  { name: "Freetown, MA" },
  { name: "Lyon County, MN" },
  { name: "Beardstown, IL" },
  { name: "Oregon, IL" },
  { name: "Southwick, MA" },
  { name: "Mississauga, ON" },
];

export const partnerLogos: LogoItem[] = [
  { name: "US Clean Energy", src: "/images/partners/usce-logo.png" },
  { name: "Canadian Energy" },
  { name: "Tundra Process Solutions" },
];
