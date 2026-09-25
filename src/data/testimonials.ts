export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

/**
 * EMPTY STATE — no real testimonials exist yet, so the component renders a
 * tasteful empty state. Add real entries here as they're collected; the UI
 * switches automatically once this array is non-empty.
 */
export const testimonials: Testimonial[] = [];
