import { useEffect, useState } from "react";

/**
 * Live local time in New Delhi (Asia/Kolkata), updating every 30s.
 * Returns "" until mounted (avoids SSR/hydration issues and keeps the
 * pill width stable during the first paint).
 */
export function useLocalTime(): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const tick = () => setTime(fmt.format(new Date()).toUpperCase());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
