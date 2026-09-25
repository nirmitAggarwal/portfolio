import { Section, SectionHeading } from "@/components/ui/section";

const interests = [
  "software engineering",
  "backend systems",
  "distributed systems",
  "Rust",
  "networking",
  "databases",
  "developer tooling",
  "unusual technical projects",
];

export function About() {
  return (
    <Section id="about" index="02" label="About">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading id="about-heading" className="reveal">
            Learning aggressively. Building seriously.
          </SectionHeading>
          <div
            className="reveal mt-8 max-w-[60ch] space-y-5 text-[1.0625rem] leading-relaxed text-muted-foreground"
            style={{ "--reveal-delay": 1 } as React.CSSProperties}
          >
            <p>
              I'm Nirmit — a B.Tech Information Technology student at{" "}
              <span className="text-foreground">
                Maharaja Surajmal Institute of Technology
              </span>{" "}
              (2025–2029). I got into programming the usual way, stayed for the
              unusual parts: how a request finds its way through a network, how
              a database decides what to keep in memory, how a scheduler picks
              the next task.
            </p>
            <p>
              I learn by building the thing from scratch. Not because existing
              tools are bad — because{" "}
              <span className="text-foreground">
                the fastest way to understand a system is to build a small,
                wrong version of it
              </span>{" "}
              and then fix what's wrong.
            </p>
            <p>
              Right now that means Rust, backend infrastructure and distributed
              systems — with a bias for projects that sound slightly too
              ambitious for a student timetable.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <div
            className="reveal"
            style={{ "--reveal-delay": 2 } as React.CSSProperties}
          >
            <p className="font-label text-[0.6875rem] text-muted-foreground">
              CURRENTLY INTO
            </p>
            <ul className="mt-4 space-y-0 border-t border-border">
              {interests.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-[0.9375rem]"
                >
                  <span>{item}</span>
                  <span aria-hidden className="text-primary">→</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
