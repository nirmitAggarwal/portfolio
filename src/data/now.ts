export type NowEntry = {
  category: "Building" | "Learning" | "Exploring";
  items: string[];
};

/**
 * "Now" section — intentionally dynamic. Update this file whenever the
 * current focus changes; no component edits needed.
 */
export const nowEntries: NowEntry[] = [
  {
    category: "Building",
    items: [
      "Sovereign — a Rust optimization solver core",
      "Volunteer Cloud — hardening recovery paths",
    ],
  },
  {
    category: "Learning",
    items: [
      "Systems programming in Rust",
      "Distributed consensus, properly this time",
      "How databases store and retrieve data under the hood",
    ],
  },
  {
    category: "Exploring",
    items: ["Networking protocols at the packet level", "Developer tooling ideas"],
  },
];
