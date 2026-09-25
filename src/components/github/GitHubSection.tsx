import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/data/site";

/**
 * GitHub — deliberately lightweight. Links to the profile; the activity
 * area is a placeholder so live contribution data can be added later
 * without redesigning the section.
 */
export function GitHubSection() {
  return (
    <Section id="github" index="11" label="GitHub">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading id="github-heading" className="reveal">
            The work is public
          </SectionHeading>
          <p
            className="reveal mt-5 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
          >
            Everything I build lives in the open — commits, failed experiments
            and all. No fabricated contribution graphs here; just the repos.
          </p>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="reveal group mt-7 inline-flex items-center gap-2 border border-border-strong px-6 py-3.5 font-mono text-[0.9375rem] transition-colors hover:border-primary hover:text-primary"
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
          >
            github.com/{site.githubHandle}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>

        <div className="lg:col-span-6">
          <div
            className="reveal-media border border-border bg-surface-warm p-8 md:p-10"
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
          >
            <p className="font-label text-[0.6875rem] text-muted-foreground">
              ACTIVITY — PLACEHOLDER
            </p>
            {/* contribution-grid placeholder, to be replaced by live data */}
            <div className="mt-6 grid grid-cols-[repeat(26,1fr)] gap-1" aria-hidden>
              {Array.from({ length: 26 * 4 }).map((_, i) => (
                <span
                  key={i}
                  className="aspect-square rounded-[1px] bg-border/70"
                />
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A live contribution view may land here later. Until then, the
              profile itself is the source of truth.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
