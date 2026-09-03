import type { PreviewVariant } from '../../src/previews/types'
import type { MagmaCoreHeroProps } from './MagmaCoreHero'

export const magmaCoreHeroVariants: PreviewVariant<MagmaCoreHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Magma'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Core',
      titleLines: ['Molten', 'heart'],
      subtitle: 'Futuristic volcanic hero with grabable magma dodecahedron in pulsing lava haze.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every facet catches orange light as the magma core pulses inside the volcanic void'],
      subtitle: 'Long headline wraps inside SVG lines.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], subtitle: 'Empty title falls back.' } },
  { id: 5, label: 'Short subtitle', props: { titleLines: ['Heat'], subtitle: 'Brief copy.' } },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      eyebrow: 'Magma',
      titleLines: ['Core', 'field'],
      subtitle:
        'The dodecahedron is not decoration — it is the focal object. Copy rides the volcanic void while pointer orbit lets you inspect every glowing face. Mobile stacks copy above the magma core.',
    },
  },
  { id: 7, label: 'Empty subtitle', props: { titleLines: ['Core only'], eyebrow: 'Magma' } },
  { id: 8, label: 'No CTA', props: { titleLines: ['Burn', 'on'], subtitle: 'No button — magma core only.' } },
  {
    id: 9,
    label: 'Single CTA',
    props: {
      titleLines: ['Orbit'],
      subtitle: 'One primary action.',
      ctaLabel: 'Enter the core',
      ctaHref: '#core',
    },
  },
  {
    id: 10,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Sealed'],
      ctaLabel: 'Cooling',
      ctaDisabled: true,
    },
  },
  {
    id: 11,
    label: 'Dual line headline',
    props: {
      eyebrow: 'Volcanic',
      titleLines: ['Magma', 'ascent'],
      subtitle: 'Two-line SVG headline.',
      ctaLabel: 'Descend',
      ctaHref: '#descend',
    },
  },
  {
    id: 12,
    label: 'Three line headline',
    props: {
      titleLines: ['Molten', 'core', 'rising'],
      subtitle: 'Three explicit lines.',
    },
  },
  {
    id: 13,
    label: 'Eyebrow only',
    props: { eyebrow: 'Heat telemetry', titleLines: ['Core'], subtitle: 'Minimal eyebrow + title.' },
  },
  {
    id: 14,
    label: 'Stat in subtitle',
    props: {
      titleLines: ['1200°C'],
      subtitle: 'Surface temperature of the magma core centerpiece.',
    },
  },
  {
    id: 15,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Forge'],
      subtitle: '"The earth remembers every eruption in its molten heart." — Volcanic proverb',
    },
  },
  {
    id: 16,
    label: 'Code in subtitle',
    props: {
      titleLines: ['magma'],
      subtitle: 'const core = orbit.rotate({ pitch, yaw, heat: 1.0 })',
    },
  },
  {
    id: 17,
    label: 'Long CTA label',
    props: {
      titleLines: ['Vent'],
      ctaLabel: 'Open the volcanic chamber',
      ctaHref: '#vent',
    },
  },
  {
    id: 18,
    label: 'Full hero',
    props: {
      eyebrow: 'Magma telemetry',
      titleLines: ['Core', 'ascent'],
      subtitle: 'Complete hero with eyebrow, subtitle, and CTA.',
      ctaLabel: 'Inspect core',
      ctaHref: '#inspect',
    },
  },
  {
    id: 19,
    label: 'Single word title',
    props: { titleLines: ['LAVA'], subtitle: 'One-word display headline.' },
  },
  {
    id: 20,
    label: 'No eyebrow full',
    props: {
      titleLines: ['Magma', 'void'],
      subtitle: 'No eyebrow — copy and core only.',
      ctaLabel: 'Orbit',
      ctaHref: '#orbit',
    },
  },
]
