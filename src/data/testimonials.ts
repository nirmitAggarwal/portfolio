export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

/**
 * Testimonials — add entries here as they're collected; the UI switches
 * automatically once this array is non-empty.
 *
 * SAMPLE DATA: quotes below are demo content. Replace with real ones —
 * keep the same shape: { quote, name, context }.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Nirmit is the rare teammate who asks “why” before “how” — he'd dissect the problem, sketch two approaches, and come back with a working prototype the same night.",
    name: "Aditi Sharma",
    context: "Teammate, MSIT hackathon team",
  },
  {
    quote:
      "He rebuilt our task distributor in Rust over one weekend after our Python version kept dropping jobs. Cut task turnaround from minutes to seconds and left the code beautifully documented.",
    name: "Rohan Mehta",
    context: "Volunteer maintainer, BOINC-style volunteer computing project",
  },
  {
    quote:
      "I mentored Nirmit through his first packet capture. He showed up the next week having already read the RFCs and debugging a retransmission storm on his own. That instinct can't be taught.",
    name: "Kunal Verma",
    context: "Senior engineer, mentor at a systems-reading group",
  },
  {
    quote:
      "Working with Nirmit on our DSA prep group was effortless — he writes explanations the way good code reads: short, precise, and with the edge cases handled.",
    name: "Priya Nair",
    context: "Peer, DSA study group at MSIT",
  },
];
