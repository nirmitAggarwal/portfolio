import { Flag } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { buildLogEntries } from "@/data/hackathons";

/**
 * Hackathons / Build Log — an important part of the story, but no fabricated
 * achievements. Until real entries exist in src/data/hackathons.ts, this
 * renders an honest "coming soon" state with clearly marked slots.
 */
export function Hackathons() {
  const hasEntries = buildLogEntries.length > 0;

  return (
    <Section id="build-log" index="09" label="Build Log">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="build-log-heading" className="reveal">
            Hackathons & experiments
          </SectionHeading>
          <p
            className="reveal mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
          >
            Weekend builds, competitions, weird prototypes and technical
            milestones — the record of things tried. I'm populating this as the
            results become real, not before.
          </p>
        </div>

        <div className="lg:col-span-7">
          {hasEntries ? (
            <ol className="reveal border-t border-border">
              {buildLogEntries.map((entry) => (
                <li
                  key={entry.title}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-5"
                >
                  <div>
                    <p className="font-display text-lg">{entry.title}</p>
                    {entry.note && (
                      <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-label text-[0.6875rem] text-primary">{entry.kind}</p>
                    {entry.date && (
                      <p className="mt-1 font-mono text-xs text-muted-foreground">{entry.date}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div
              className="reveal border border-dashed border-border-strong bg-surface-warm/50 p-8 md:p-10"
              style={{ "--reveal-delay": 2 } as React.CSSProperties}
            >
              <div className="flex items-center gap-3">
                <Flag className="size-4 text-primary" aria-hidden />
                <p className="font-label text-[0.6875rem] text-muted-foreground">
                  COMING SOON — FIRST ENTRIES IN PROGRESS
                </p>
              </div>
              <p className="mt-4 max-w-[48ch] font-display text-xl leading-snug text-foreground/80">
                The build log starts with the next hackathon. No
                invented wins here — check back after the next weekend build.
              </p>
              <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
                {["Add entry", "Add entry", "Add entry"].map((slot, i) => (
                  <div
                    key={i}
                    className="flex min-h-24 items-center justify-center bg-surface px-4 py-6 text-center"
                  >
                    <span className="font-mono text-xs text-muted-foreground/50">
                      {slot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
