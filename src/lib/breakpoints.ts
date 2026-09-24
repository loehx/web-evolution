/** Canonical viewport ranges for component specs and responsive logic. */
export const breakpoints = {
  /** < 768px */
  mobile: { max: 767 },
  /** 768px – 1023px */
  tablet: { min: 768, max: 1023 },
  /** ≥ 1024px */
  desktop: { min: 1024 },
} as const

/** Tailwind-aligned class prefixes: default = mobile, md = tablet+, lg = desktop+. */
export const breakpointClasses = {
  mobile: '',
  tablet: 'md:',
  desktop: 'lg:',
} as const

export type ViewportTier = keyof typeof breakpoints
