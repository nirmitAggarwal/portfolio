export type SkillGroup = {
  label: string;
  blurb?: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    blurb: "What I think in",
    skills: ["JavaScript", "TypeScript", "Rust", "Python", "SQL", "Bash"],
  },
  {
    label: "Backend",
    blurb: "Where I'm most at home",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "OAuth",
      "WebSockets",
      "Redis",
      "API Design",
    ],
  },
  {
    label: "Frontend",
    blurb: "Enough to ship",
    skills: ["React", "Vite", "Tailwind CSS", "Zustand"],
  },
  {
    label: "Databases",
    blurb: "Where data lives",
    skills: ["MongoDB", "MySQL", "Redis"],
  },
  {
    label: "Infrastructure",
    blurb: "How it runs",
    skills: ["Docker", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    label: "Tools",
    blurb: "Daily drivers",
    skills: ["Git", "GitHub", "Postman", "npm", "Bun", "VS Code"],
  },
  {
    label: "CS",
    blurb: "The foundations",
    skills: [
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "System Design",
      "Distributed Systems",
    ],
  },
];
