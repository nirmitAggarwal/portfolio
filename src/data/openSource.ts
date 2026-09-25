export type OpenSourceEntry = {
  repo: string;
  repoUrl: string;
  summary: string;
  contributions: string[];
};

export const openSourceEntries: OpenSourceEntry[] = [
  {
    repo: "rust-ui/ui",
    repoUrl: "https://github.com/rust-ui/ui",
    summary:
      "Contributions to the Rust UI ecosystem around Leptos — mostly making onboarding less painful for people on Windows.",
    contributions: [
      "Authored a Leptos troubleshooting guide improving Windows / Git Bash onboarding",
      "Filed implementation issue reports",
      "PRs and issue discussions with maintainers",
    ],
  },
];
