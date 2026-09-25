export type Experience = {
  role: string;
  org: string;
  period: string;
  start: string; // ISO-ish year-month for ordering, newest first
  summary: string;
  highlights: string[];
  tags?: string[];
};

/**
 * Real experience only. Add new entries at the top — the UI renders
 * them in array order, no component changes needed.
 */
export const experiences: Experience[] = [
  {
    role: "Technical Lead",
    org: "IEEE MSIT",
    period: "Apr 2026 — Present",
    start: "2026-04",
    summary:
      "Led a six-member engineering team building Student Toolkit — a student productivity platform.",
    highlights: [
      "Owned architecture decisions and feature assignment across the team",
      "Set up GitHub workflow: branching, reviews, CI conventions",
      "Code review for every merged feature",
      "Built GitHub OAuth and JWT authentication",
      "Shipped PDF and image utility features",
    ],
    tags: ["Architecture", "OAuth", "JWT", "Code Review"],
  },
  {
    role: "Software Engineering Intern",
    org: "MegaBuilders Program",
    period: "Jun 2026 — Jul 2026",
    start: "2026-06",
    summary:
      "Backend development, debugging, feature implementation and collaborative engineering workflows.",
    highlights: [
      "Implemented backend features against real codebases",
      "Debugged and fixed issues across the stack",
      "Worked in a collaborative PR-based workflow",
    ],
    tags: ["Backend", "Debugging", "Collaboration"],
  },
  {
    role: "Student Developer",
    org: "GDG MSIT / Geek Room / Microsoft Student Chapter",
    period: "Aug 2025 — Aug 2026",
    start: "2025-08",
    summary:
      "Hackathons, technical workshops, software projects and developer communities.",
    highlights: [
      "Participated in hackathons and build events",
      "Attended and ran technical workshops",
      "Shipped small software projects with peers",
    ],
    tags: ["Hackathons", "Workshops", "Community"],
  },
];
