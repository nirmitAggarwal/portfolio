import { Section, SectionHeading } from "@/components/ui/section";
import { experiences } from "@/data/experience";

/**
 * Experience — a scannable editorial timeline. Each entry is one row:
 * period on the left, role and story on the right. Expandable highlights
 * keep the default view quiet.
 */
export function Experience() {
  return (
    <Section id="experience" index="03" label="Experience">
      <SectionHeading id="experience-heading" className="reveal">
        Where I've built so far
      </SectionHeading>

      <ol className="mt-12 border-t border-border">
        {experiences.map((exp, i) => (
          <li
            key={`${exp.org}-${exp.start}`}
            className="reveal group grid gap-3 border-b border-border py-8 md:grid-cols-12 md:gap-8 md:py-10"
            style={{ "--reveal-delay": Math.min(i, 3) } as React.CSSProperties}
          >
            {/* Period */}
            <div className="md:col-span-3">
              <p className="font-label text-[0.6875rem] text-muted-foreground">
                {exp.period}
              </p>
            </div>

            {/* Role + org */}
            <div className="md:col-span-4">
              <h3 className="font-display text-xl leading-snug md:text-[1.375rem]">
                {exp.role}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{exp.org}</p>
            </div>

            {/* Summary + highlights */}
            <div className="md:col-span-5">
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                {exp.summary}
              </p>
              <details className="group mt-3">
                <summary className="cursor-pointer list-none text-[0.8125rem] font-bold text-primary transition-colors hover:text-primary/80 [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="group-open:hidden">Details +</span>
                    <span className="hidden group-open:inline">Details −</span>
                  </span>
                </summary>
                <ul className="mt-3 space-y-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-[0.875rem] leading-relaxed text-muted-foreground"
                    >
                      <span aria-hidden className="mt-[0.4em] size-1 shrink-0 bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                {exp.tags && (
                  <p className="mt-4 font-mono text-[0.6875rem] text-muted-foreground/70">
                    {exp.tags.join(" · ")}
                  </p>
                )}
              </details>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
