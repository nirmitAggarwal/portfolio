import { ArrowDown, FileDown, Github, Linkedin } from "lucide-react";
import { site } from "@/data/site";
import type { CSSProperties } from "react";

const STARS = [
  { top: "12%", left: "78%", duration: "7s", delay: "0.5s" },
  { top: "22%", left: "88%", duration: "9s", delay: "3.2s" },
  { top: "8%", left: "55%", duration: "8s", delay: "5.1s" },
  { top: "30%", left: "94%", duration: "10s", delay: "1.8s" },
  { top: "16%", left: "64%", duration: "7.5s", delay: "7s" },
] as const;

/**
 * Hero — centered, one strong line with an inline "emoji" avatar,
 * the working-avatar figure as the plate below, shooting stars behind.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col"
    >
      {/* Shooting stars (decorative) */}
      <div className="shooting-stars" aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="shooting-star"
            style={
              {
                top: s.top,
                left: s.left,
                "--duration": s.duration,
                "--delay": s.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-28 text-center md:px-10 md:pt-32">
        <p
          className="reveal font-label text-[0.75rem] text-muted-foreground"
          style={{ "--reveal-delay": 0 } as CSSProperties}
        >
          {site.role} — New Delhi, India
        </p>

        <h1
          className="reveal mt-7 max-w-[24ch] font-display text-[2.1rem] leading-[1.18] text-balance sm:max-w-[30ch] sm:text-5xl lg:text-[3.6rem]"
          style={{ "--reveal-delay": 1 } as CSSProperties}
        >
          Hi, I'm Nirmit{" "}
          <img
            src="/images/avatar-headphone-off.webp"
            alt=""
            aria-hidden
            width={720}
            height={720}
            loading="eager"
            className="mx-1 inline-block size-[1.15em] translate-y-[0.18em] rounded-full border border-border object-cover object-top"
          />
          — I build products that hold up in{" "}
          <span className="text-primary">production</span> and understand the
          people who use them, to bring real results.
        </h1>

        <p
          className="reveal mt-7 max-w-[56ch] text-lg leading-relaxed text-muted-foreground"
          style={{ "--reveal-delay": 2 } as CSSProperties}
        >
          I enjoy building practical software and learning by working on projects rather than just following tutorials.
        </p>

        <div
          className="reveal mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ "--reveal-delay": 3 } as CSSProperties}
        >
          <a
            href="#work"
            className="inline-flex h-12 items-center gap-2 bg-primary px-7 text-[0.9375rem] font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            See my work
            <ArrowDown className="size-4" aria-hidden />
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center border border-border-strong px-7 text-[0.9375rem] font-bold transition-colors hover:border-primary hover:text-primary"
          >
            Get in touch
          </a>
        </div>

        <div
          className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          style={{ "--reveal-delay": 4 } as CSSProperties}
        >
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="link-sweep inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Github className="size-4" aria-hidden /> GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-sweep inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Linkedin className="size-4" aria-hidden /> LinkedIn
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="link-sweep inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <FileDown className="size-4" aria-hidden /> Résumé
          </a>
        </div>
      </div>
    </section>
  );
}
