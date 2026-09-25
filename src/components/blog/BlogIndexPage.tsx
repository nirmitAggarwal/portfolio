import { ArrowUpRight } from "lucide-react";
import { publishedPosts } from "@/data/posts";
import { formatDate } from "@/components/blog/Markdown";
import { blogHref } from "@/lib/router";

/**
 * Blog index — every published article, newest first.
 * Reachable at #/blog and via the Writing section on the home page.
 */
export function BlogIndexPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-24 pt-36 md:px-10 md:pt-44">
      <header className="border-b border-border pb-10">
        <p className="font-label text-[0.6875rem] text-primary">WRITING</p>
        <h1 className="mt-6 font-display text-4xl leading-[1.08] text-balance sm:text-5xl">
          Notes & write-ups
        </h1>
        <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
          Engineering notes and project post-mortems — published straight from
          markdown, one article at a time.
        </p>
      </header>

      <ol className="border-b border-border">
        {publishedPosts.map((post) => (
          <li key={post.slug}>
            <a
              href={blogHref(post.slug)}
              className="group relative grid gap-2 border-b border-border py-7 transition-colors md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <div className="flex items-center gap-3 md:col-span-3">
                <span className="font-label text-[0.6875rem] text-primary">
                  {post.category}
                </span>
              </div>

              <div className="md:col-span-9">
                <h2 className="font-display text-xl leading-snug transition-colors group-hover:text-primary md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-muted-foreground/90">
                  {post.excerpt}
                </p>
                <p className="mt-3 font-mono text-xs text-muted-foreground/70">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {" · "}
                  {post.readingTime}
                </p>
              </div>

              <ArrowUpRight
                className="absolute right-0 top-7 size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary md:relative md:right-auto md:top-auto md:col-start-12 md:row-start-1 md:self-center"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ol>

      <p className="mt-10 font-mono text-xs text-muted-foreground/60">
        {publishedPosts.length} articles · more as they're finished
      </p>
    </div>
  );
}
