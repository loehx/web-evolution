import type { PreviewVariant } from '../../src/previews/types'
import type { NebulaCoronaHeroProps } from './NebulaCoronaHero'

export const nebulaCoronaHeroVariants: PreviewVariant<NebulaCoronaHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Nebula'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Corona',
      titleLines: ['Deep', 'space'],
      subtitle: 'Futuristic nebula hero with grabable corona icosahedron in drifting magenta gas.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every facet catches magenta light as the corona pulses inside the nebula void'],
      subtitle: 'Long headline wraps inside SVG lines.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], subtitle: 'Empty title falls back.' } },
  { id: 5, label: 'Short subtitle', props: { titleLines: ['Void'], subtitle: 'Brief copy.' } },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      eyebrow: 'Nebula',
      titleLines: ['Corona', 'field'],
      subtitle:
        'The icosahedron is not decoration — it is the focal object. Copy rides the nebula while pointer orbit lets you inspect every glowing face. Mobile stacks copy above the corona.',
    },
  },
  { id: 7, label: 'Empty subtitle', props: { titleLines: ['Corona only'], eyebrow: 'Nebula' } },
  { id: 8, label: 'No CTA', props: { titleLines: ['Drift', 'on'], subtitle: 'No button — corona only.' } },
  {
    id: 9,
    label: 'Single CTA',
    props: {
      titleLines: ['Orbit'],
      subtitle: 'One primary action.',
      ctaLabel: 'Enter the void',
      ctaHref: '#void',
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
  { id: 11, label: 'Eyebrow only', props: { eyebrow: 'Sector VII', titleLines: ['The corona'] } },
  {
    id: 12,
    label: 'Stat in subtitle',
    props: {
      titleLines: ['4.2 ly'],
      subtitle: 'Distance to the nearest observable nebula corona filament.',
    },
  },
  {
    id: 13,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Luminous'],
      subtitle: '"In the corona, every face becomes a lens for starlight." — Astrophysical proverb',
    },
  },
  {
    id: 14,
    label: 'Code in subtitle',
    props: {
      titleLines: ['corona'],
      subtitle: 'const facet = nebula.refract({ angle: rotation.y, wavelength: 420 })',
    },
  },
  { id: 15, label: 'No eyebrow', props: { titleLines: ['Plain', 'corona'], subtitle: 'Eyebrow omitted.' } },
  {
    id: 16,
    label: 'Two-line headline',
    props: {
      eyebrow: 'Corona',
      titleLines: ['Star', 'birth'],
      subtitle: 'Two-line SVG headline.',
      ctaLabel: 'Orbit',
      ctaHref: '#orbit',
    },
  },
  {
    id: 17,
    label: 'Three-line headline',
    props: {
      titleLines: ['Nebula', 'corona', 'hero'],
      subtitle: 'Three stacked headline lines.',
    },
  },
  {
    id: 18,
    label: 'Marketing block',
    props: {
      eyebrow: 'Nebula Corona',
      titleLines: ['Bold', 'cosmos'],
      subtitle: 'Full marketing hero with eyebrow, subtitle, and CTA.',
      ctaLabel: 'Begin',
      ctaHref: '#begin',
    },
  },
  { id: 19, label: 'Minimal', props: { titleLines: ['N'] } },
  {
    id: 20,
    label: 'Full hero',
    props: {
      eyebrow: 'Futuristic nebula',
      titleLines: ['Nebula', 'corona hero'],
      subtitle: 'Complete hero with all fields populated for review.',
      ctaLabel: 'Start orbit',
      ctaHref: '#start',
    },
  },
]
