export type Project = {
  title: string;
  description: string;
  longerDescription?: string;
  status?: string;
  technologies: string[];
  image?: string;
  imageAlt?: string;
  github?: string;
  live?: string;
  featured?: boolean;
};

/**
 * Project schema — add a new project by appending an entry here.
 * Everything is optional except title/description/technologies:
 * no image, no live link, and "building" status are all fine.
 */
export const projects: Project[] = [
  {
    title: "Volunteer Cloud",
    description:
      "Distributed volunteer computing platform inspired by BOINC and Folding@home — ordinary machines contributing spare cycles to real workloads.",
    longerDescription:
      "A Rust implementation of a volunteer computing grid: an asynchronous orchestrator distributes work to worker nodes, tracks liveness with heartbeats, and reassigns tasks automatically when nodes disappear. Scheduling is benchmark-aware, plugins execute inside a secured path, and every unit of work is verified with Ed25519 signatures and SHA-256 checksums. Ships with a monitoring dashboard.",
    status: "Active",
    technologies: [
      "Rust",
      "Tokio",
      "Actix Web",
      "SQLite",
      "Python",
      "Ed25519",
      "SHA-256",
    ],
    image: "/images/volunteer-cloud-artwork.png",
    imageAlt:
      "Illustration of a dimly lit hack room with monitors glowing — machines working together late at night",
    github: "https://github.com/nirmitAggarwal/volunteer_cloud",
    featured: true,
  },
  {
    title: "Student Toolkit",
    description:
      "A student productivity platform built with a six-member engineering team — auth, document utilities and the everyday tools students actually need.",
    longerDescription:
      "Technical-lead project at IEEE MSIT. I owned the architecture, ran the GitHub workflow, assigned features and reviewed code. On the engineering side: GitHub OAuth sign-in, JWT session handling, and a suite of PDF and image utilities.",
    status: "Shipped",
    technologies: ["React", "Express.js", "MongoDB", "GitHub OAuth", "JWT"],
    github: "https://github.com/IEEE-MSIT/student_toolkit",
    image: "/images/Student-toolkit.png",
    featured: true,
  },
  {
    title: "The Git Project",
    description:
      "A gamified interactive learning experience that teaches Git and GitHub through challenges, simulations, and hands-on exercises.",
    longerDescription:
      "An interactive Git and GitHub learning platform designed to make version control feel more like a game than a tutorial. Players learn core Git workflows through visual simulations, practical challenges, and progressively harder exercises — covering concepts such as commits, branches, merging, rebasing, remotes, and GitHub workflows. The project turns traditionally command-heavy Git learning into an engaging, hands-on experience with a dedicated learning path and completion certificate.",
    status: "Active",
    technologies: [
      "TypeScript",
      "React",
      "Git",
      "GitHub",
    ],
    image: "/images/GitGame.png",
    imageAlt:
      "A stylized developer workspace showing Git branches, commits, and terminal commands",
    github: "https://github.com/nirmitAggarwal/the-git-project",
    featured: true,
  },
];
