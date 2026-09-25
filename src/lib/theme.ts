export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Apply a theme by toggling the `.dark` class on <html>. */
function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/** Read the stored theme, falling back to the OS preference. */
export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Set + persist the theme. */
export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  apply(theme);
}

/** Initialize from storage/OS. Called once on mount. */
export function initTheme() {
  apply(getStoredTheme());
}

/** Toggle between light and dark. Returns the new theme. */
export function toggleTheme(): Theme {
  const next: Theme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  setTheme(next);
  return next;
}
