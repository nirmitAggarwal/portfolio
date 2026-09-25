import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { writingPosts } from "@/data/writing";
import { blogHref, blogIndexHref } from "@/lib/router";

/**
 * Writing — editorial list of posts. Sample posts are marked in the data
 * file; when real posts replace them the UI needs no changes.
 */
export function Writing() {
  return (
    <Section id="writing" index="08" label="Writing">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="writing-heading" className="reveal">
          Notes & write-ups
        </SectionHeading>
        <p
          className="reveal max-w-[36ch] text-sm leading-relaxed text-muted-foreground"
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
        >
          Engineering notes and project post-mortems, published straight from
          markdown. Click through to read — every article opens as its own page.
        </p>
      </div>

      <ol className="mt-12 border-t border-border">
        {writingPosts.map((post, i) => (
          <li key={post.slug}>
            <a
              href={blogHref(post.slug)}
              className="reveal group grid gap-2 border-b border-border py-6 transition-colors md:grid-cols-12 md:items-baseline md:gap-8 md:py-7"
              style={{ "--reveal-delay": Math.min(i, 3) } as React.CSSProperties}
            >
              <div className="flex items-center gap-3 md:col-span-3">
                <span className="font-label text-[0.6875rem] text-primary">
                  {post.category}
                </span>
              </div>

              <h3 className="font-display text-xl leading-snug transition-colors group-hover:text-primary md:col-span-6 md:text-[1.375rem]">
                {post.title}
              </h3>

              <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                <time className="font-mono text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span className="font-mono text-xs text-muted-foreground/70">
                  {post.readingTime}
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground/90 md:col-span-9 md:col-start-4 md:hidden">
                {post.excerpt}
              </p>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-end">
        <a
          href={blogIndexHref}
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          All writing
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>
      </div>
    </Section>
  );
}
