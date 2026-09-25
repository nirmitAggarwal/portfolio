export type BuildLogEntry = {
  title: string;
  kind: "Hackathon" | "Experiment" | "Competition" | "Milestone";
  date?: string;
  note?: string;
};

/**
 * Hackathons / build log.
 *
 * SAMPLE DATA: entries below are demo content. Replace with real results —
 * keep the same shape: { title, kind, date?, note? }.
 * When this array is non-empty the UI renders the real list.
 */
export const buildLogEntries: BuildLogEntry[] = [
  {
    title: "MSIT Hackathon — distributed task runner",
    kind: "Hackathon",
    date: "2026-03-14",
    note: "36 hours, 4 person team. Built a work-stealing task runner in Rust with a WebSocket control plane; placed in the top five and demoed fault recovery live.",
  },
  {
    title: "BOINC-style volunteer computing clone",
    kind: "Milestone",
    date: "2026-02-02",
    note: "First end-to-end run: 12 volunteer nodes completed 1,000 scheduled tasks with checkpoint-restart surviving simulated node kills.",
  },
  {
    title: "Why does my Redis stream drop events?",
    kind: "Experiment",
    date: "2026-01-18",
    note: "Weekend repro of consumer-group eviction under backpressure. Wrote it up as a post: reading-tcp-traces-to-debug-a-slow-api.",
  },
  {
    title: "Advent of Code — first 25 stars in Rust",
    kind: "Competition",
    date: "2025-12-25",
    note: "Solved all of week one without unwrap() in shipped helpers — lifetime battles documented along the way.",
  },
  {
    title: "Campus LAN file-transfer experiment",
    kind: "Experiment",
    date: "2025-11-09",
    note: "UDP multicast file sync across the hostel network; measured 40× throughput over cloud relay on the same floor. Never left the lab, taught me plenty.",
  },
];
