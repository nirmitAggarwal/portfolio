import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Boot splash — pixel "waiting" avatar with an animated typing indicator and
 * a quietly ticking elapsed-seconds readout. Fades out once `done` flips.
 */
export function LoadingScreen({ done }: { done: boolean }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (done) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [done]);

  return (
    <div
      aria-hidden={done}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        done ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center">
        {/* Idle float animation; disabled under prefers-reduced-motion */}
        <img
          src="/images/avatar-waiting.webp"
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className="w-44 animate-bounce select-none sm:w-52 motion-reduce:animate-none"
        />

        <p className="mt-6 font-label text-[0.75rem] text-muted-foreground">
          Waking up the servers
        </p>

        {/* Typing indicator: three dots pulsing in sequence */}
        <div className="mt-3 flex items-center gap-1.5" role="presentation">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 animate-bounce rounded-full bg-primary motion-reduce:animate-none"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        <p className="mt-4 font-mono text-xs tabular-nums text-muted-foreground/60">
          {elapsed}s
        </p>
      </div>
    </div>
  );
}
