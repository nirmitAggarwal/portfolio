import { useState, type CSSProperties } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { phases } from "@/data/phases";
import { cn } from "@/lib/utils";

const IMAGE_SRC = "/images/3-phases-of-building-artwork.png";

export function BuildingPhases() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section className="relative">
      <SectionHeading>Building Phases</SectionHeading>

      <div
        className="relative mt-10 w-full overflow-hidden rounded-2xl border border-border bg-black"
        onMouseLeave={() => setActive(null)}
      >
        {/* Artwork */}
        <div className="relative aspect-[16/9] min-h-[500px] w-full">
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
                      "absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10",
                      "translate-y-5 opacity-0 transition-all duration-500 ease-out",
                      isActive && "translate-y-0 opacity-100"
                    )}
                  >
                    {/* Phase number */}
                    <div className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/60">
                      0{index + 1}
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                      {phase.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75 md:text-base">
                      {phase.description}
                    </p>
                  </div>

                  {/* Inactive phase label */}
                  <div
                    className={cn(
                      "absolute left-5 top-5 transition-all duration-500 md:left-8 md:top-8",
                      isActive
                        ? "translate-y-[-4px] opacity-0"
                        : "opacity-70"
                    )}
                  >
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-white drop-shadow-md">
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
            <div className="rounded-full border border-white/20 bg-black/20 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
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
                "group flex items-center justify-center gap-2 px-4 py-4 text-xs uppercase tracking-[0.15em]",
                "text-white/40 transition-colors duration-300",
                "hover:text-white",
                active === index && "text-white"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300",
                  active === index && "scale-125 bg-white"
                )}
              />
              {phase.title}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}