import type { PreviewVariant } from '../../src/previews/types'
import type { TundraFrostHeroProps } from './TundraFrostHero'

export const tundraFrostHeroVariants: PreviewVariant<TundraFrostHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Tundra'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Polar',
      titleLines: ['Frost', 'crystal'],
      subtitle: 'Futuristic arctic hero with grabable ice octahedron in drifting polar mist.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every facet catches cyan light as the frost crystal drifts inside the arctic void'],
      subtitle: 'Long headline wraps inside SVG lines.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], subtitle: 'Empty title falls back.' } },
  { id: 5, label: 'Short subtitle', props: { titleLines: ['Ice'], subtitle: 'Brief copy.' } },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      eyebrow: 'Tundra',
      titleLines: ['Frost', 'field'],
      subtitle:
        'The octahedron is not decoration — it is the focal object. Copy rides the arctic void while pointer orbit lets you inspect every icy face. Mobile stacks copy above the frost crystal.',
    },
  },
  { id: 7, label: 'Empty subtitle', props: { titleLines: ['Crystal only'], eyebrow: 'Tundra' } },
  { id: 8, label: 'No CTA', props: { titleLines: ['Freeze', 'on'], subtitle: 'No button — frost crystal only.' } },
  {
    id: 9,
    label: 'Single CTA',
    props: {
      titleLines: ['Orbit'],
      subtitle: 'One primary action.',
      ctaLabel: 'Enter the frost',
      ctaHref: '#frost',
    },
  },
  {
    id: 10,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Sealed'],
      ctaLabel: 'Frozen',
      ctaDisabled: true,
    },
  },
  {
    id: 11,
    label: 'Dual line headline',
    props: {
      eyebrow: 'Arctic',
      titleLines: ['Tundra', 'ascent'],
      subtitle: 'Two-line SVG headline.',
      ctaLabel: 'Descend',
      ctaHref: '#descend',
    },
  },
  {
    id: 12,
    label: 'Three line headline',
    props: {
      titleLines: ['Frozen', 'core', 'rising'],
      subtitle: 'Three explicit lines.',
    },
  },
  {
    id: 13,
    label: 'Eyebrow only',
    props: { eyebrow: 'Polar telemetry', titleLines: ['Frost'], subtitle: 'Minimal eyebrow + title.' },
  },
  {
    id: 14,
    label: 'Stat in subtitle',
    props: {
      titleLines: ['-40°C'],
      subtitle: 'Average surface temperature of the tundra frost field.',
    },
  },
  {
    id: 15,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Permafrost'],
      subtitle: '"The ice remembers every winter in its crystalline heart." — Arctic proverb',
    },
  },
  {
    id: 16,
    label: 'Code in subtitle',
    props: {
      titleLines: ['frost'],
      subtitle: 'const crystal = orbit.rotate({ pitch, yaw, temp: -40 })',
    },
  },
  {
    id: 17,
    label: 'Long CTA label',
    props: {
      titleLines: ['Vent'],
      ctaLabel: 'Open the polar observation chamber',
      ctaHref: '#vent',
    },
  },
  {
    id: 18,
    label: 'Full hero',
    props: {
      eyebrow: 'Frost telemetry',
      titleLines: ['Crystal', 'ascent'],
      subtitle: 'Complete hero with eyebrow, subtitle, and CTA.',
      ctaLabel: 'Inspect crystal',
      ctaHref: '#inspect',
    },
  },
  {
    id: 19,
    label: 'Single word title',
    props: { titleLines: ['ICE'], subtitle: 'One-word display headline.' },
  },
  {
    id: 20,
    label: 'No eyebrow full',
    props: {
      titleLines: ['Tundra', 'void'],
      subtitle: 'No eyebrow — copy and crystal only.',
      ctaLabel: 'Orbit',
      ctaHref: '#orbit',
    },
  },
]
