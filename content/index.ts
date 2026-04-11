/**
 * Content barrel — single import surface for every data file.
 * Usage: `import { company, projects, home } from "@/content";`
 */

export { company } from "./company";
export type { Company } from "./company";

export { certifications } from "./certifications";
export type { Certification } from "./certifications";

export { solutions } from "./solutions";
export type { Solution } from "./solutions";

export { product, connect } from "./product";

export { projects, getProjectBySlug, totalProjects } from "./projects";
export type { Project } from "./projects";

export { team, teamDepartments } from "./team";
export type { TeamMember, TeamDepartment } from "./team";

export { insights, getInsightBySlug } from "./insights";
export type { Insight } from "./insights";

export { openPositions, careersIntro } from "./careers";
export type { JobPosting } from "./careers";

export { companyTimeline } from "./timeline";

export { customerLogos, partnerLogos } from "./partners";

export { home } from "./home";
