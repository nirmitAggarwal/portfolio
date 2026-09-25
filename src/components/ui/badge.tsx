import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Small typographic chip for technologies/tags — hairline border, quiet.
 */
export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Status marker with a small dot — "Active", "Building", "Shipped"…
 */
export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-label text-[0.6875rem]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status.toLowerCase() === "building"
            ? "bg-primary"
            : status.toLowerCase() === "shipped"
              ? "bg-emerald-600"
              : "bg-foreground/60",
        )}
      />
      {status}
    </span>
  );
}
