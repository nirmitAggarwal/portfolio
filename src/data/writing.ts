import { allPosts, toWritingPost } from "./posts";

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
 * PUBLISHED POSTS — derived automatically from the markdown files in
 * src/data/posts/ (frontmatter + body). To publish a new article:
 *
 *   1. Create src/data/posts/<slug>.md with YAML frontmatter at the top
 *      (title, category, date, readingTime, excerpt — see src/data/posts.ts).
 *   2. Write the body in Markdown. Done — it appears here and on #/blog.
 *
 * Posts marked `draft: true` are excluded from this list but remain
 * reachable via their direct URL #/blog/<slug>.
 */
export const writingPosts: WritingPost[] = allPosts
  .filter((p) => !p.draft)
  .map(toWritingPost);
