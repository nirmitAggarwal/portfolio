import { Quote } from "lucide-react";
import { Section } from "@/components/ui/section";
import { testimonials } from "@/data/testimonials";

/**
 * "People I've built with" — renders real testimonials when they exist in
 * src/data/testimonials.ts; otherwise a tasteful, honest empty state.
 */
export function Testimonials() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section id="testimonials" index="10" label="Testimonials">
      <div className="reveal mb-10 flex items-baseline justify-between gap-6">
        <h2
          id="testimonials-heading"
          className="font-display text-2xl leading-snug sm:text-3xl"
        >
          People I've built with
        </h2>
      </div>

      {hasTestimonials ? (
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-surface p-8">
              <Quote className="size-4 text-primary" aria-hidden />
              <blockquote className="mt-4 font-display text-lg leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{t.name}</span>
                {" — "}
                {t.context}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p
          className="reveal max-w-[46ch] font-display text-xl leading-relaxed text-muted-foreground sm:text-2xl"
          style={{ "--reveal-delay": 1 } as React.CSSProperties}
        >
          Testimonials will appear here as I collect them — from teammates,
          mentors and people I've built with along the way.
        </p>
      )}
    </Section>
  );
}
