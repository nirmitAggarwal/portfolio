import { ArrowUpRight, GitPullRequest } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { openSourceEntries } from "@/data/openSource";

/**
 * Open Source — small section, part of the engineering story rather than a
 * GitHub badge wall.
 */
export function OpenSource() {
  return (
    <Section id="open-source" index="06" label="Open Source">
      <SectionHeading id="open-source-heading" className="reveal">
        Contributions in the wild
      </SectionHeading>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {openSourceEntries.map((entry, i) => (
          <a
            key={entry.repo}
            href={entry.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="reveal group border border-border p-7 transition-colors duration-300 hover:border-primary/60"
            style={{ "--reveal-delay": i } as React.CSSProperties}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2.5 font-mono text-[0.9375rem] font-bold">
                <GitPullRequest className="size-4 text-primary" aria-hidden />
                {entry.repo}
              </span>
              <ArrowUpRight
                className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                aria-hidden
              />
            </div>

            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {entry.summary}
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
              {entry.contributions.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-[0.45em] size-1 shrink-0 bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </Section>
  );
}
