/** Motion language durations in seconds (Motion / CSS). */
export const motionDuration = {
  micro: 0.2,
  standard: 0.4,
  emphasis: 0.8,
  hero: 1.2,
} as const

export type MotionDuration = keyof typeof motionDuration

/** Named moves — pick from this set; do not invent one-off easings per component. */
export const motionMove = [
  'fade-up',
  'fade-in',
  'scale-in',
  'slide-in',
  'image-reveal',
  'text-reveal',
  'stagger',
  'parallax',
  'magnetic',
  'marquee',
] as const

export type MotionMove = (typeof motionMove)[number]
