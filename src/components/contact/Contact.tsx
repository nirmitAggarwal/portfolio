import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/data/site";

/**
 * Contact — strong, simple ending. One big question, one primary action.
 */
export function Contact() {
  return (
    <Section id="contact" index="12" label="Contact">
      <SectionHeading id="contact-heading" className="reveal max-w-[20ch]">
        Have something interesting to build?
      </SectionHeading>

      <p
        className="reveal mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground"
        style={{ "--reveal-delay": 1 } as React.CSSProperties}
      >
        Internships, open source, hackathon teams, or a systems problem you
        can't stop thinking about — my inbox is open.
      </p>

      <a
        href={`mailto:${site.email}`}
        className="reveal group mt-10 inline-flex items-baseline gap-3 font-display text-3xl text-primary transition-colors hover:text-primary/85 sm:text-4xl md:text-5xl"
        style={{ "--reveal-delay": 2 } as React.CSSProperties}
      >
        {site.email}
        <ArrowUpRight
          className="size-7 self-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-8"
          aria-hidden
        />
      </a>

      <div
        className="reveal mt-14 grid gap-px border border-border bg-border sm:grid-cols-3"
        style={{ "--reveal-delay": 3 } as React.CSSProperties}
      >
        {[
          {
            href: site.github,
            label: "GitHub",
            value: `@${site.githubHandle}`,
            icon: Github,
          },
          {
            href: site.linkedin,
            label: "LinkedIn",
            value: site.linkedinHandle,
            icon: Linkedin,
          },
          {
            href: `mailto:${site.email}`,
            label: "Email",
            value: site.email,
            icon: Mail,
          },
        ].map(({ href, label, value, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 bg-surface px-6 py-5 transition-colors hover:bg-surface-warm"
          >
            <span className="flex items-center gap-3.5">
              <Icon className="size-4 text-muted-foreground" aria-hidden />
              <span>
                <span className="font-label block text-[0.625rem] text-muted-foreground">
                  {label}
                </span>
                <span className="mt-0.5 block font-mono text-sm">{value}</span>
              </span>
            </span>
            <ArrowUpRight
              className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              aria-hidden
            />
          </a>
        ))}
      </div>
    </Section>
  );
}
