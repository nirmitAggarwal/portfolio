export type WritingPost = {
  title: string;
  category:
    | "Engineering"
    | "Rust"
    | "Systems"
    | "Networking"
    | "Projects"
    | "Learning";
  date: string;
  readingTime: string;
  excerpt: string;
  slug: string;
  draft?: boolean;
};

/**
 * SAMPLE POSTS — clearly marked demo content while the blog is empty.
 * Replace these with real articles when they exist; keep the same shape.
 * (draft: true renders with a "Draft" mark.)
 */
export const writingPosts: WritingPost[] = [
  {
    title: "What building a BOINC clone taught me about failure",
    category: "Projects",
    date: "2026-08-14",
    readingTime: "6 min",
    excerpt:
      "Volunteer nodes vanish mid-task. Networks partition. Disks fill. Designing a distributed system for machines you don't control means designing for failure first — here's what that looked like in practice.",
    slug: "what-building-a-boinc-clone-taught-me",
  },
  {
    title: "Rust ownership, explained through a task queue",
    category: "Rust",
    date: "2026-07-02",
    readingTime: "8 min",
    excerpt:
      "The borrow checker finally clicked for me when I stopped fighting it and started designing ownership into a work-queue's API. A walkthrough of the reasoning, one compile error at a time.",
    slug: "rust-ownership-through-a-task-queue",
  },
  {
    title: "Reading TCP traces to debug a 'slow' API",
    category: "Networking",
    date: "2026-06-18",
    readingTime: "7 min",
    excerpt:
      "The endpoint wasn't slow — the connection was. Notes on how a packet capture turned a vague latency complaint into a two-line fix.",
    slug: "reading-tcp-traces-to-debug-a-slow-api",
  },
  {
    title: "Why I'm learning systems programming in public",
    category: "Learning",
    date: "2026-05-30",
    readingTime: "4 min",
    excerpt:
      "Building in the open keeps me honest. What I'm working on, what I don't understand yet, and why incomplete notes beat perfect silence.",
    slug: "learning-systems-programming-in-public",
  },
];
