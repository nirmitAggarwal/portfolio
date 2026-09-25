import { Section, SectionHeading } from "@/components/ui/section";
import { nowEntries } from "@/data/now";

/**
 * Now — what I'm currently building / learning / exploring. Intentionally
 * dynamic: src/data/now.ts is the only file to touch when focus changes.
 */
export function Now() {
  return (
    <Section id="now" index="07" label="Now">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="now-heading" className="reveal">
          What I'm up to right now
        </SectionHeading>
        <p
          className="reveal max-w-[36ch] text-sm leading-relaxed text-muted-foreground"
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
        >
          This section changes as my focus does — it's the live part of the
          site. Last touched September 2026.
        </p>
      </div>

      <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
        {nowEntries.map((entry, i) => (
          <div
            key={entry.category}
            className="reveal bg-surface p-7 md:p-8"
            style={{ "--reveal-delay": i + 1 } as React.CSSProperties}
          >
            <p className="font-label text-[0.6875rem] text-primary">
              {entry.category}
            </p>
            <ul className="mt-5 space-y-3.5">
              {entry.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground"
                >
                  <span aria-hidden className="mt-[0.45em] size-1 shrink-0 bg-foreground/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
