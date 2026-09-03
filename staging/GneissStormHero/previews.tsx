import type { PreviewVariant } from '../../src/previews/types'
import type { GneissStormHeroProps } from './GneissStormHero'

export const gneissStormHeroVariants: PreviewVariant<GneissStormHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Gneiss'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Storm',
      titleLines: ['Banded', 'rock'],
      subtitle: 'Brutalist tempest hero with grabable gneiss boulder in diagonal rain.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Every foliation stripe tells a story of pressure and time'],
      subtitle: 'Long headline wraps inside SVG lines.',
    },
  },
  { id: 4, label: 'Missing headline fallback', props: { titleLines: [], subtitle: 'Empty title falls back.' } },
  {
    id: 5,
    label: 'Short subtitle',
    props: { titleLines: ['Rock'], subtitle: 'Brief copy.' },
  },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      eyebrow: 'Gneiss',
      titleLines: ['Storm', 'wall'],
      subtitle:
        'The boulder is not decoration — it is the focal object. Copy anchors the storm wall while pointer orbit lets you inspect every banded face. Mobile stacks copy above the boulder; desktop places them side by side.',
    },
  },
  { id: 7, label: 'Empty subtitle', props: { titleLines: ['Boulder only'], eyebrow: 'Storm' } },
  {
    id: 8,
    label: 'No CTA',
    props: {
      titleLines: ['Read', 'on'],
      subtitle: 'No button — boulder only.',
    },
  },
  {
    id: 9,
    label: 'Single CTA',
    props: {
      titleLines: ['Explore'],
      subtitle: 'One primary action.',
      ctaLabel: 'Inspect bands',
      ctaHref: '#bands',
    },
  },
  {
    id: 10,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Locked'],
      subtitle: 'Disabled CTA state.',
      ctaLabel: 'Unavailable',
      ctaDisabled: true,
    },
  },
  {
    id: 11,
    label: 'Eyebrow only',
    props: { eyebrow: 'Chapter I', titleLines: ['The gneiss'] },
  },
  {
    id: 12,
    label: 'Stat in subtitle',
    props: {
      titleLines: ['2.7 GPa'],
      subtitle: 'Typical compressive strength of banded gneiss under mountain pressure.',
    },
  },
  {
    id: 13,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Striped'],
      subtitle: '"In gneiss, every band is a chapter of heat and pressure." — Geologist proverb',
    },
  },
  {
    id: 14,
    label: 'Code in subtitle',
    props: {
      titleLines: ['foliation'],
      subtitle: 'const band = gneiss.stripe({ angle: rotation.y, pressure: 2.7 })',
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Plain', 'boulder'],
      subtitle: 'Eyebrow omitted.',
    },
  },
  {
    id: 16,
    label: 'Two-line headline',
    props: {
      eyebrow: 'Tempest',
      titleLines: ['Rain', 'rock'],
      subtitle: 'Two-line SVG headline.',
      ctaLabel: 'Orbit',
      ctaHref: '#orbit',
    },
  },
  {
    id: 17,
    label: 'Three-line headline',
    props: {
      titleLines: ['Storm', 'banded', 'boulder'],
      subtitle: 'Three stacked headline lines.',
    },
  },
  {
    id: 18,
    label: 'Marketing block',
    props: {
      eyebrow: 'Gneiss Storm',
      titleLines: ['Bold', 'geology'],
      subtitle: 'Full marketing hero with eyebrow, subtitle, and CTA.',
      ctaLabel: 'Begin',
      ctaHref: '#begin',
    },
  },
  {
    id: 19,
    label: 'Minimal',
    props: { titleLines: ['G'] },
  },
  {
    id: 20,
    label: 'Full hero',
    props: {
      eyebrow: 'Brutalist mineral',
      titleLines: ['Gneiss', 'storm hero'],
      subtitle: 'Complete hero with all fields populated for review.',
      ctaLabel: 'Start orbit',
      ctaHref: '#start',
    },
  },
]
