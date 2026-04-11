import type { TeamCardProps } from "@/components/blocks";

/**
 * Team roster. {TODO:} markers cover names/titles pending verification
 * from LinkedIn or the current team page.
 */

export type TeamMember = TeamCardProps & {
  slug: string;
  bio?: string;
  order: number;
};

export const team: TeamMember[] = [
  {
    slug: "leadership-1",
    order: 1,
    name: "{TODO: CEO name}",
    title: "Chief Executive Officer",
    department: "Leadership",
    bio: "{TODO: short bio — 2–3 sentences from LinkedIn or current team page}",
  },
  {
    slug: "leadership-2",
    order: 2,
    name: "{TODO: CTO name}",
    title: "Chief Technology Officer",
    department: "Leadership",
    bio: "{TODO: short bio}",
  },
  {
    slug: "leadership-3",
    order: 3,
    name: "{TODO: VP Engineering name}",
    title: "VP, Engineering",
    department: "Leadership",
    bio: "{TODO: short bio}",
  },
  {
    slug: "leadership-4",
    order: 4,
    name: "{TODO: Head of Operations}",
    title: "Head of Operations",
    department: "Operations",
    bio: "{TODO: short bio}",
  },
];

export const teamDepartments = [
  "Leadership",
  "Engineering",
  "Operations",
  "Commercial",
] as const;

export type TeamDepartment = (typeof teamDepartments)[number];
