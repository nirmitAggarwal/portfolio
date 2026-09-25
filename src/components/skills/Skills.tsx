import { useState } from "react";
import { Plus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

/**
 * Toolbox — grouped skills as an elegant interactive list. Each group is a
 * row; clicking expands it. One open at a time keeps the section quiet.
 */
export function Skills() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="skills" index="05" label="Toolbox">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="skills-heading" className="reveal">
            The toolbox
          </SectionHeading>
          <p
            className="reveal mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted-foreground"
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
          >
            Grouped by how I use them, not alphabetized into a wall of badges.
            The CS group is coursework I'm actively turning into practice.
          </p>
        </div>

        <div
          className="reveal lg:col-span-8"
          style={{ "--reveal-delay": 2 } as React.CSSProperties}
        >
          <ul className="border-t border-border">
            {skillGroups.map((group, i) => {
              const open = openIndex === i;
              return (
                <li key={group.label} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`skill-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-primary"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-label text-[0.6875rem] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl md:text-2xl">
                        {group.label}
                      </span>
                      {group.blurb && (
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                          — {group.blurb}
                        </span>
                      )}
                    </span>
                    <Plus
                      aria-hidden
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        open && "rotate-45 text-primary",
                      )}
                    />
                  </button>

                  <div
                    id={`skill-panel-${i}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-wrap gap-2 pb-6 pl-9 pr-2 sm:pl-11">
                        {group.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {!open && <span className="sr-only">{group.skills.join(", ")}</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
