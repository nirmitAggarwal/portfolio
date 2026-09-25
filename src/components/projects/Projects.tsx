import { ArrowUpRight, BookOpen } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

/**
 * Selected Work — large editorial blocks, not card grids. Featured projects
 * alternate alignment; each block pairs a big title + description with
 * artwork or a typographic placeholder, and stays fully readable on touch
 * (no hover-only information).
 */
export function Projects() {
  return (
    <Section id="work" index="04" label="Selected Work">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="work-heading" className="reveal">
          Selected work
        </SectionHeading>
        <p
          className="reveal max-w-[38ch] text-sm leading-relaxed text-muted-foreground"
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
        >
          Three things I'm building or have shipped — chosen because each one
          taught me something systems-level.
        </p>
      </div>

      <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={project.title}
              className="reveal grid items-center gap-8 md:grid-cols-12 md:gap-10"
              style={{ "--reveal-delay": 0 } as React.CSSProperties}
            >
              {/* — Media / typographic placeholder ———————————————— */}
              <div
                className={
                  flip
                    ? "md:col-span-5 md:order-2 md:col-start-8"
                    : "md:col-span-5 md:order-1"
                }
              >
                {project.image ? (
                  <a
                    href={project.github ?? project.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    className="group/img block overflow-hidden border border-border bg-surface-warm"
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt ?? `${project.title} illustration`}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      className="aspect-[8/5] w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                    />
                  </a>
                ) : (
                  <a
                    href={project.github ?? project.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title}${project.github ? " on GitHub" : ""}`}
                    className="group/img relative flex aspect-[8/5] items-center justify-center overflow-hidden border border-border bg-surface-warm"
                  >
                    {/* Technical placeholder: coordinates + big initial */}
                    <span
                      aria-hidden
                      className="font-display absolute left-4 top-3 text-[5.5rem] leading-none text-foreground/8 transition-colors duration-500 group-hover/img:text-primary/20 sm:text-[7rem]"
                    >
                      {project.title.charAt(0)}
                    </span>
                    <span
                      aria-hidden
                      className="font-label absolute bottom-3 right-4 text-[0.625rem] text-muted-foreground/60"
                    >
                      {`// ${project.technologies[0]?.toLowerCase() ?? "rust"} · in progress`}
                    </span>
                    <span
                      aria-hidden
                      className="absolute left-4 right-4 top-1/2 h-px bg-border-strong"
                    />
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-4 bottom-4 w-px bg-border-strong"
                    />
                  </a>
                )}
              </div>

              {/* — Copy ———————————————————————————————————————— */}
              <div
                className={
                  flip
                    ? "md:col-span-6 md:order-1 md:col-start-1"
                    : "md:col-span-6 md:col-start-7 md:order-2"
                }
              >
                <div className="flex items-center gap-4">
                  <StatusBadge status={project.status ?? "Active"} />
                  <span className="font-label text-[0.6875rem] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <details className="group mt-4">
                  <summary className="cursor-pointer list-none text-[0.8125rem] font-bold text-primary transition-colors hover:text-primary/80 [&::-webkit-details-marker]:hidden">
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="size-3.5" aria-hidden />
                      <span className="group-open:hidden">Read more</span>
                      <span className="hidden group-open:inline">Show less</span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[56ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {project.longerDescription ?? project.description}
                  </p>
                </details>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[0.6875rem] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.9375rem] font-bold hover:text-primary"
                    >
                      View on GitHub
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/article:translate-x-0.5 group-hover/article:-translate-y-0.5" aria-hidden />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.9375rem] font-bold hover:text-primary"
                    >
                      Live site
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  )}
                  {!project.github && !project.live && (
                    <span className="text-sm text-muted-foreground/70">
                      Code & notes coming soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
