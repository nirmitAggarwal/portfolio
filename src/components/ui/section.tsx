import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section shell: consistent vertical rhythm, top hairline and the small
 * Svetze index label (01 — ABOUT) that gives the site its editorial grid.
 */
export function Section({
  id,
  index,
  label,
  className,
  children,
}: {
  id: string;
  index: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("border-t border-border", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:py-32">
        <div className="reveal mb-12 flex items-baseline justify-between gap-6 md:mb-16">
          <p className="font-label text-[0.75rem] text-muted-foreground">
            {index} — {label}
          </p>
          <span
            aria-hidden
            className="h-px w-24 max-w-[30%] bg-border-strong"
          />
        </div>
        {children}
      </div>
    </section>
  );
}

/** Section heading, referenced by aria-labelledby for landmarks. */
export function SectionHeading({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "font-display text-3xl leading-[1.15] text-balance sm:text-4xl md:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
