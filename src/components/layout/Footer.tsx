import { site } from "@/data/site";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg">{site.name}</p>
            <p className="mt-1 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              Built with React. No frameworks were harmed.
            </p>
          </div>

          {/* Section nav — moved here from the header */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-sweep w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="link-sweep w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-sweep w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-sweep w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground/70">
            © {year} {site.name}
          </p>
          <p className="font-mono text-xs text-muted-foreground/70">
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
