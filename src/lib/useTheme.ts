import { useEffect, useState } from "react";
import {
  getStoredTheme,
  setTheme,
  type Theme,
} from "@/lib/theme";

/** Reactive theme state for UI (navbar toggle). */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    // Sync the class in case something changed it directly.
    setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  };

  return { theme, toggle };
}
