import { useEffect, useState } from "react";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import { site } from "@/data/site";
import { useTheme } from "@/lib/useTheme";
import { useLocalTime } from "@/lib/useLocalTime";
import { cn } from "@/lib/utils";

/**
 * Floating split-pill navbar — two independent boxes, transparent between.
 * LEFT:  avatar (headphones on) + "New Delhi, India" — swaps to live
 *        local time on hover/focus, with a vertical text transition.
 *        Touch devices can't hover, so the pill becomes tap-to-toggle.
 * RIGHT: Resume · LinkedIn · theme · Call.
 * Mobile: location pill + theme + menu (Resume/LinkedIn/Call in the sheet).
 */
export function Navbar() {
  const [locationHover, setLocationHover] = useState(false);
  const [timePinned, setTimePinned] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const time = useLocalTime();

  // Touch devices have no hover — the pill becomes tap-to-toggle instead.
  const [canHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  // Close menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const showTime =
    ((canHover && locationHover) || (!canHover && timePinned)) && time !== "";

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      {/* Tap-outside catcher for the mobile sheet (paints under the nav) */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 sm:hidden"
        />
      )}

      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-3"
      >
        {/* — LEFT: location pill ------------------------------------------------ */}
        <button
          type="button"
          aria-label={
            showTime
              ? `Local time in New Delhi: ${time}`
              : "Location: New Delhi, India — hover, focus or tap for local time"
          }
          aria-pressed={canHover ? undefined : timePinned}
          onMouseEnter={() => canHover && setLocationHover(true)}
          onMouseLeave={() => canHover && setLocationHover(false)}
          onFocus={() => canHover && setLocationHover(true)}
          onBlur={() => canHover && setLocationHover(false)}
          onClick={() => !canHover && setTimePinned((v) => !v)}
          className="group flex h-12 select-none items-center gap-2 rounded-xl border border-border bg-background/85 pl-2 pr-3 backdrop-blur-md transition-colors duration-200 hover:border-border-strong focus-visible:border-border-strong focus-visible:outline-none sm:h-16 sm:gap-3 sm:pl-3 sm:pr-4"
        >
          <img
            src="/images/avatar-headphone-on.webp"
            alt=""
            aria-hidden
            width={48}
            height={48}
            loading="eager"
            className="size-8 rounded-lg border border-border object-cover object-top sm:size-12"
          />
          <span className="relative block h-4 overflow-hidden text-left sm:h-5">
            {/* Two stacked rows slide vertically on hover/focus/tap */}
            <span
              aria-hidden
              className={cn(
                "block text-[0.8125rem] font-bold leading-4 transition-transform duration-300 ease-out sm:text-[0.9375rem] sm:leading-5",
                showTime ? "-translate-y-full" : "translate-y-0",
              )}
            >
              New Delhi, India
            </span>
            <span
              aria-hidden
              className={cn(
                "block font-mono text-[0.8125rem] leading-4 tabular-nums transition-transform duration-300 ease-out sm:text-[0.9375rem] sm:leading-5",
                showTime ? "-translate-y-full" : "translate-y-0",
              )}
            >
              {time || "—:— —"}
            </span>
            {/* Real label for screen readers, never animated */}
            <span className="sr-only">
              {showTime ? `Local time: ${time}` : "New Delhi, India"}
            </span>
          </span>
        </button>

        {/* — RIGHT: controls (its own pill) ------------------------------------- */}
        <div className="flex h-12 items-center gap-0.5 rounded-xl border border-border bg-background/85 px-1.5 backdrop-blur-md sm:h-16 sm:gap-1.5 sm:px-2.5">
          {/* Resume — hidden on mobile, lives in the sheet */}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center rounded-lg px-4 text-[0.9375rem] font-bold text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground sm:flex"
          >
            Resume
          </a>

          {/* LinkedIn — hidden on mobile, lives in the sheet */}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 items-center rounded-lg px-4 text-[0.9375rem] font-bold text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground sm:flex"
          >
            LinkedIn
          </a>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground sm:size-12"
          >
            {theme === "dark" ? (
              <Sun className="size-[1.1rem]" />
            ) : (
              <Moon className="size-[1.1rem]" />
            )}
          </button>

          {/* Call — the prominent action (hidden on mobile, lives in the sheet) */}
          <a
            href={site.phoneHref}
            className="ml-1 hidden h-11 items-center gap-2 rounded-lg bg-primary px-4 text-[0.9375rem] font-bold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 sm:flex sm:h-12 sm:px-5"
          >
            <Phone className="size-4" aria-hidden />
            Call
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-9 items-center justify-center rounded-lg text-foreground sm:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* — Mobile sheet ------------------------------------------------------- */}
      <div
        id="mobile-menu"
        className={cn(
          "mx-auto mt-2 max-w-6xl rounded-xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur-md transition-all duration-300 sm:hidden",
          open ? "block opacity-100" : "hidden opacity-0",
        )}
      >
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg px-4 py-3.5 text-[0.9375rem] font-bold hover:bg-muted"
        >
          Resume
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-lg px-4 py-3.5 text-[0.9375rem] font-bold hover:bg-muted"
        >
          LinkedIn
        </a>
        <a
          href={site.phoneHref}
          className="flex items-center justify-between rounded-lg px-4 py-3.5 text-[0.9375rem] font-bold text-primary hover:bg-muted"
        >
          Call
          <span className="font-mono text-xs text-muted-foreground">{site.phone}</span>
        </a>
      </div>
    </div>
  );
}
