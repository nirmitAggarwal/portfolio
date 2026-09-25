import { parse as parseYaml } from "yaml";
import type { WritingPost } from "./writing";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BLOG ENGINE — how publishing works (strictly frontend, no backend)
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Create `src/data/posts/my-post-slug.md`.
 *    The FILENAME (without .md) is the URL slug: `#/blog/my-post-slug`.
 * 2. Start the file with YAML frontmatter:
 *
 *      ---
 *      title: My post title
 *      category: Engineering   // Engineering | Rust | Systems | Networking | Projects | Learning
 *      date: 2026-09-20        // ISO date — shown as "Sep 2026"
 *      readingTime: 6 min      // shown as-is
 *      excerpt: One-sentence summary shown in lists.
 *      cover: /images/my-cover.png   // optional hero image (horizontal)
 *      coverAlt: Description of the cover
 *      draft: true             // optional — hides from lists, direct URL still works
 *      ---
 *
 * 3. Write the body in Markdown (GFM). Supported inline:
 *      - fenced code blocks with language highlighting: ```rust
 *      - inline math $E = mc^2$ and display math $$ ... $$
 *      - images anywhere: ![alt](/images/pic.png) with optional caption suffix
 *      - headings ## , lists, tables, blockquotes, task lists, links, bold/italic
 * 4. Set draft: false (or omit it). It appears on #/blog and in the Writing
 *    section of the home page automatically. That's the whole pipeline.
 *
 * Add a new .md file and it just shows up — no component edits needed.
 * ----------------------------------------------------------------------------
 */

// Vite loads every markdown file under src/data/posts at build time.
// `query: "?raw"` gives the file contents as a string; `eager` bundles them
// synchronously so the list is available without async loading.
const modules = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type PostFrontmatter = {
  title: string;
  category: WritingPost["category"];
  date: string; // ISO "YYYY-MM-DD"
  readingTime: string;
  excerpt: string;
  cover?: string; // horizontal hero image, path under /public
  coverAlt?: string;
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  body: string; // raw markdown, rendered by the blog page
};

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = parseYaml(match[1]) as Record<string, unknown>;
  return { data, body: raw.slice(match[0].length) };
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/i, "");
}

/** YAML parses unquoted dates as Date objects — normalize to ISO strings. */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

/** All posts, newest first. Drafts are included — filter at the call site. */
export const allPosts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      title: String(data.title ?? "Untitled"),
      category: (data.category ?? "Engineering") as WritingPost["category"],
      date: toIsoDate(data.date),
      readingTime: String(data.readingTime ?? ""),
      excerpt: String(data.excerpt ?? ""),
      cover: typeof data.cover === "string" ? data.cover : undefined,
      coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : undefined,
      draft: data.draft === true,
      body,
    } satisfies Post;
  })
  .sort((a, b) => b.date.localeCompare(a.date));

/** Published posts only (drafts hidden). */
export const publishedPosts: Post[] = allPosts.filter((p) => !p.draft);

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

/** Convert a Post to the shape the Writing section renders. */
export function toWritingPost(post: Post): WritingPost {
  return {
    title: post.title,
    category: post.category,
    date: post.date,
    readingTime: post.readingTime,
    excerpt: post.excerpt,
    slug: post.slug,
    draft: post.draft || undefined,
  };
}
