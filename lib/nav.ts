/**
 * Site navigation config — single source of truth for header, mobile menu,
 * and footer. Mirrors the sitemap from research/design_system.md.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  children?: NavLink[];
};

export const primaryNav: NavGroup[] = [
  {
    label: "Product",
    href: "/product",
    children: [
      { label: "Overview", href: "/product", description: "The Eneon BESS platform" },
      {
        label: "Grid Response",
        href: "/grid-response",
        description: "Sub-second dispatch theater",
      },
      {
        label: "Eneon Connect",
        href: "/connect",
        description: "Monitoring & control software",
      },
      {
        label: "Specifications",
        href: "/product#specifications",
        description: "Capacity, power, compliance",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Microgrids",
        href: "/solutions/microgrids",
        description: "Off-grid & remote power",
      },
      {
        label: "Utility",
        href: "/solutions/utility",
        description: "Grid-scale deployment",
      },
      {
        label: "Commercial & Industrial",
        href: "/solutions/commercial",
        description: "Behind-the-meter storage",
      },
      {
        label: "Solar + Storage",
        href: "/solutions/solar-storage",
        description: "Firm, dispatchable solar",
      },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Sizing Tool",
    href: "/sizing-tool",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Company", href: "/about", description: "Who we are" },
      { label: "Team", href: "/team", description: "Leadership & engineering" },
      { label: "Careers", href: "/careers", description: "Open positions" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
  },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "BESS Platform", href: "/product" },
      { label: "Grid Response", href: "/grid-response" },
      { label: "Eneon Connect", href: "/connect" },
      { label: "Specifications", href: "/product#specifications" },
      { label: "Sizing Tool", href: "/sizing-tool" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Microgrids", href: "/solutions/microgrids" },
      { label: "Utility", href: "/solutions/utility" },
      { label: "Commercial & Industrial", href: "/solutions/commercial" },
      { label: "Solar + Storage", href: "/solutions/solar-storage" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Request a Quote", href: "/quote" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

export const socialNav: NavLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/eneon-es" },
  { label: "YouTube", href: "https://www.youtube.com/@eneon-es" },
];
