import type { PreviewVariant } from '../../src/previews/types'
import type { ZephyrGaleHeroProps } from './ZephyrGaleHero'

export const zephyrGaleHeroVariants: PreviewVariant<ZephyrGaleHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Zephyr'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Gale',
      titleLines: ['Wind', 'crystal'],
      subtitle: 'Futuristic gale hero with grabable wind-crystal octahedron in horizontal streaks.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every facet catches cyan light as the gale sweeps across the sky'],
      subtitle: 'Long headline wraps inside SVG lines.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], subtitle: 'Empty title falls back.' } },
  { id: 5, label: 'Short subtitle', props: { titleLines: ['Breeze'], subtitle: 'Brief copy.' } },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      eyebrow: 'Zephyr',
      titleLines: ['Gale', 'field'],
      subtitle:
        'The crystal is not decoration — it is the focal object. Copy rides the gale while pointer orbit lets you inspect every translucent face. Mobile stacks copy above the crystal.',
    },
  },
  { id: 7, label: 'Empty subtitle', props: { titleLines: ['Crystal only'], eyebrow: 'Gale' } },
  { id: 8, label: 'No CTA', props: { titleLines: ['Read', 'on'], subtitle: 'No button — crystal only.' } },
  {
    id: 9,
    label: 'Single CTA',
    props: {
      titleLines: ['Ride'],
      subtitle: 'One primary action.',
      ctaLabel: 'Catch the gale',
      ctaHref: '#gale',
    },
  },
  {
    id: 10,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Locked'],
      subtitle: 'Disabled CTA state.',
      ctaLabel: 'Unavailable',
      ctaHref: '#',
      ctaDisabled: true,
    },
  },
  { id: 11, label: 'Eyebrow only', props: { eyebrow: 'Chapter I', titleLines: ['The zephyr'] } },
  {
    id: 12,
    label: 'Stat in subtitle',
    props: {
      titleLines: ['40 km/h'],
      subtitle: 'Average sustained wind speed in a zephyr gale corridor.',
    },
  },
  {
    id: 13,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Translucent'],
      subtitle: '"In the gale, every facet becomes a lens for the sky." — Aerodynamic proverb',
    },
  },
  {
    id: 14,
    label: 'Code in subtitle',
    props: {
      titleLines: ['crystal'],
      subtitle: 'const facet = zephyr.refract({ angle: rotation.y, wavelength: 480 })',
    },
  },
  { id: 15, label: 'No eyebrow', props: { titleLines: ['Plain', 'crystal'], subtitle: 'Eyebrow omitted.' } },
  {
    id: 16,
    label: 'Two-line headline',
    props: {
      eyebrow: 'Gale',
      titleLines: ['Wind', 'rise'],
      subtitle: 'Two-line SVG headline.',
      ctaLabel: 'Orbit',
      ctaHref: '#orbit',
    },
  },
  {
    id: 17,
    label: 'Three-line headline',
    props: {
      titleLines: ['Zephyr', 'wind', 'crystal'],
      subtitle: 'Three stacked headline lines.',
    },
  },
  {
    id: 18,
    label: 'Marketing block',
    props: {
      eyebrow: 'Zephyr Gale',
      titleLines: ['Bold', 'atmosphere'],
      subtitle: 'Full marketing hero with eyebrow, subtitle, and CTA.',
      ctaLabel: 'Begin',
      ctaHref: '#begin',
    },
  },
  { id: 19, label: 'Minimal', props: { titleLines: ['Z'] } },
  {
    id: 20,
    label: 'Full hero',
    props: {
      eyebrow: 'Futuristic wind',
      titleLines: ['Zephyr', 'gale hero'],
      subtitle: 'Complete hero with all fields populated for review.',
      ctaLabel: 'Start orbit',
      ctaHref: '#start',
    },
  },
]
