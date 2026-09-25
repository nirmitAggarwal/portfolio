export type BuildLogEntry = {
  title: string;
  kind: "Hackathon" | "Experiment" | "Competition" | "Milestone";
  date?: string;
  note?: string;
};

/**
 * Hackathons / build log. No fabricated achievements — the UI shows a clear
 * "coming soon" state until real entries land here.
 */
export const buildLogEntries: BuildLogEntry[] = [];
