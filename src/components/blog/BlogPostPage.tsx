import { ArrowLeft } from "lucide-react";
import {
  ArticleHeader,
  Markdown,
  formatDate,
} from "@/components/blog/Markdown";
import { NotFound } from "@/components/ui/NotFound";
import { publishedPosts, getPost, type Post } from "@/data/posts";
import { blogIndexHref } from "@/lib/router";
import { site } from "@/data/site";

/**
 * Article page — a FIXED format for every post:
 *   1. Category · date · reading time
 *   2. Display title
 *   3. Horizontal cover image (optional, from frontmatter `cover`)
 *   4. Markdown body — code, math, sections, inline images
 *   5. Prev / next article navigation + back to all writing
 */
export function BlogPostPage({ slug }: { slug: string }) {
  const post = getPost(slug);

  if (!post) {
    return <NotFound attemptedPath={`#/blog/${slug}`} />;
  }

  // Drafts render with a banner — previewable via direct URL, but hidden
  // from all lists (Writing section, blog index, prev/next nav).
  return <PostView post={post} />;
}

function PostView({ post }: { post: Post }) {
  // publishedPosts is sorted newest first.
  const idx = publishedPosts.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? publishedPosts[idx - 1] : undefined;
  const older =
    idx >= 0 && idx < publishedPosts.length - 1
      ? publishedPosts[idx + 1]
      : undefined;

  const prevNext = [
    { label: "Newer", post: newer },
    { label: "Older", post: older },
  ].filter((c): c is { label: string; post: Post } => c.post !== undefined);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
      {post.draft && (
        <div
          role="status"
          className="mb-8 flex items-center gap-3 border border-dashed border-border-strong bg-surface-warm/60 px-4 py-3 font-label text-[0.6875rem] text-muted-foreground"
        >
          DRAFT PREVIEW — hidden from lists until you set draft: false
        </div>
      )}
      <a
        href={blogIndexHref}
        className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
          aria-hidden
        />
        All writing
      </a>

      <div className="mt-8">
        <ArticleHeader
          category={post.category}
          title={post.title}
          date={post.date}
          readingTime={post.readingTime}
        />
      </div>

      {post.cover && (
        <figure className="article-cover article-figure mt-10">
          <img src={post.cover} alt={post.coverAlt ?? ""} loading="eager" />
          {post.coverAlt && <figcaption>{post.coverAlt}</figcaption>}
        </figure>
      )}

      <Markdown>{post.body}</Markdown>

      {/* Prev / next */}
      <nav
        aria-label="More articles"
        className="mt-20 grid gap-px border border-border bg-border sm:grid-cols-2"
      >
        {prevNext.map(({ label, post: p }) => (
          <a
            key={p.slug}
            href={`#/blog/${p.slug}`}
            className="group flex flex-col gap-1 bg-surface p-6 transition-colors hover:bg-surface-warm"
          >
            <span className="font-label text-[0.6875rem] text-muted-foreground">
              {label}
            </span>
            <span className="font-display text-lg leading-snug transition-colors group-hover:text-primary">
              {p.title}
            </span>
            <span className="font-mono text-xs text-muted-foreground/70">
              {formatDate(p.date)} · {p.readingTime}
            </span>
          </a>
        ))}
        <a
          href={blogIndexHref}
          className="group flex flex-col justify-center gap-1 bg-surface p-6 transition-colors hover:bg-surface-warm sm:col-start-2"
        >
          <span className="font-label text-[0.6875rem] text-primary">BROWSE</span>
          <span className="font-display text-lg leading-snug transition-colors group-hover:text-primary">
            All writing →
          </span>
          <span className="font-mono text-xs text-muted-foreground/70">
            {publishedPosts.length} articles
          </span>
        </a>
      </nav>

      <p className="mt-16 text-center font-mono text-xs text-muted-foreground/60">
        {site.name} · {site.tagline}
      </p>
    </article>
  );
}
