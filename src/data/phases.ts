export type Phase = {
  id: string;
  num: string;
  label: string;
  title: string;
  description: string;
};

/**
 * The three phases of building — rendered over the 3-phase artwork.
 * Edit copy here; the component stays untouched.
 */
export const phases: Phase[] = [
  {
    id: "plan",
    num: "01",
    label: "Plan",
    title: "Sketch the architecture.",
    description:
      "Whiteboards, schemas, and long lists — the idea earns its shape before a single line of code.",
  },
  {
    id: "build",
    num: "02",
    label: "Build",
    title: "Head down, hands on keys.",
    description:
      "Laptops open and experiments running — the hall hums while concepts turn into working software.",
  },
  {
    id: "ship",
    num: "03",
    label: "Ship",
    title: "Press the launch button.",
    description:
      "Monitors green, servers warm — the work goes live, meets real users, and keeps getting better.",
  },
];
