import { useState, type CSSProperties } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { phases } from "@/data/phases";
import { cn } from "@/lib/utils";

const IMAGE_SRC = "/images/3-phases-of-building-artwork.png";

export function BuildingPhases() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="phases" index="01" label="Building Phases">
      <SectionHeading id="phases-heading">Building Phases</SectionHeading>

      <div
        className="@container relative mt-10 w-full overflow-hidden rounded-2xl border border-border bg-black"
        onMouseLeave={() => setActive(null)}
      >
        {/* Artwork — no min-height, so the 16:9 ratio holds at every width.
            All overlay sizes use cqw (relative to this card's width) so mobile
            renders a proportional miniature of the desktop layout instead of
            reflowing to viewport breakpoints. max() floors keep things legible
            on the narrowest phones. */}
        <div className="relative aspect-[16/9] w-full">
          {/* Grayscale base image */}
          <img
            src={IMAGE_SRC}
            alt="Three phases of building"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />

          {/* Color image — only the active third is revealed */}
          {active !== null && (
            <img
              src={IMAGE_SRC}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
              style={
                {
                  clipPath: `inset(0 ${((2 - active) / 3) * 100}% 0 ${
                    (active / 3) * 100
                  }%)`,
                  filter: "saturate(1.08) brightness(1.05)",
                } as CSSProperties
              }
            />
          )}

          {/* Dark gradient for text readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Three interactive zones */}
          <div className="absolute inset-0 grid grid-cols-3">
            {phases.map((phase, index) => {
              const isActive = active === index;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`View ${phase.title}`}
                  className={cn(
                    "group relative h-full cursor-pointer border-r border-white/20 text-left outline-none transition-all duration-500 last:border-r-0",
                    isActive && "bg-white/[0.03]"
                  )}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() =>
                    setActive((current) =>
                      current === index ? null : index
                    )
                  }
                >
                  {/* Active vertical highlight */}
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 w-px bg-white/0 transition-all duration-500",
                      isActive && "bg-white/50"
                    )}
                  />

                  {/* Phase content */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 p-[max(0.625rem,3.73cqw)]",
                      "translate-y-5 opacity-0 transition-all duration-500 ease-out",
                      isActive && "translate-y-0 opacity-100"
                    )}
                  >
                    {/* Phase number */}
                    <div className="mb-[max(0.25rem,1.12cqw)] text-[max(0.5rem,1.12cqw)] font-medium uppercase tracking-[0.25em] text-white/60">
                      0{index + 1}
                    </div>

                    <h3 className="text-[max(0.875rem,3.36cqw)] font-semibold tracking-tight text-white">
                      {phase.title}
                    </h3>

                    <p className="mt-[max(0.25rem,0.75cqw)] max-w-[35.8cqw] text-[max(0.625rem,1.49cqw)] leading-relaxed text-white/75">
                      {phase.description}
                    </p>
                  </div>

                  {/* Inactive phase label */}
                  <div
                    className={cn(
                      "absolute left-[max(0.625rem,2.99cqw)] top-[max(0.625rem,2.99cqw)] transition-all duration-500",
                      isActive
                        ? "translate-y-[-4px] opacity-0"
                        : "opacity-70"
                    )}
                  >
                    <span className="text-[max(0.5rem,1.12cqw)] font-medium uppercase tracking-[0.2em] text-white drop-shadow-md">
                      {phase.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center instruction when nothing is active */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500",
              active !== null ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="rounded-full border border-white/20 bg-black/20 px-[max(0.625rem,1.87cqw)] py-[max(0.3125rem,0.93cqw)] text-[max(0.5rem,1.12cqw)] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
              Explore the process
            </div>
          </div>
        </div>

        {/* Bottom phase navigation */}
        <div className="grid grid-cols-3 border-t border-white/10 bg-black/90">
          {phases.map((phase, index) => (
            <button
              key={index}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() =>
                setActive((current) =>
                  current === index ? null : index
                )
              }
              className={cn(
                "group flex items-center justify-center gap-1.5 px-2 py-3 text-[0.5625rem] uppercase tracking-[0.1em]",
                "text-white/40 transition-colors duration-300",
                "hover:text-white",
                active === index && "text-white",
                "sm:gap-2 sm:px-4 sm:py-4 sm:text-xs sm:tracking-[0.15em]"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300",
                  active === index && "scale-125 bg-white"
                )}
              />
              {/* Short label fits the narrow columns on mobile */}
              <span className="sm:hidden">{phase.label}</span>
              <span className="hidden sm:inline">{phase.title}</span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}