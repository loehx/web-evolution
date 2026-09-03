import type { PreviewVariant } from '../../src/previews/types'
import type { HorizonFlareHeroProps } from './HorizonFlareHero'

export const horizonFlareHeroVariants: PreviewVariant<HorizonFlareHeroProps>[] = [
  {
    id: 1,
    label: 'Headline only',
    props: { titleLines: ['Last light'] },
  },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Horizon',
      titleLines: ['Catch the', 'flare'],
      subtitle: 'A full-viewport dusk stage with a grabable molten orb on the seam.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['When the sun kisses the edge of the world'],
      subtitle: 'Long lines wrap without breaking the horizon composition.',
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], subtitle: 'Empty title falls back to Horizon.' },
  },
  {
    id: 5,
    label: 'Short body',
    props: {
      titleLines: ['Dusk', 'drift'],
      subtitle: 'Brief copy above the line.',
    },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Atmosphere',
      titleLines: ['Solar', 'seam'],
      subtitle:
        'The horizon is not decoration — it is the axis of the stage. Copy floats in the upper sky while the flare orb waits on the seam for you to orbit every face. Mobile keeps the stack; desktop splits copy and orb.',
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: {
      eyebrow: 'No subtitle',
      titleLines: ['Orb only'],
    },
  },
  {
    id: 8,
    label: 'Eyebrow only + title',
    props: {
      eyebrow: 'Signal',
      titleLines: ['Flare', 'line'],
    },
  },
  {
    id: 9,
    label: 'No eyebrow',
    props: {
      titleLines: ['Night', 'approach'],
      subtitle: 'Eyebrow omitted.',
    },
  },
  {
    id: 10,
    label: 'No CTA',
    props: {
      titleLines: ['Silent', 'horizon'],
      subtitle: 'No button — orb is the interaction.',
    },
  },
  {
    id: 11,
    label: 'Single CTA',
    props: {
      titleLines: ['Launch', 'pad'],
      subtitle: 'One primary action.',
      ctaLabel: 'Enter orbit',
      ctaHref: '#orbit',
    },
  },
  {
    id: 12,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Standby'],
      ctaLabel: 'Locked',
      ctaDisabled: true,
    },
  },
  {
    id: 13,
    label: 'Three-line headline',
    props: {
      titleLines: ['Beyond', 'the', 'rim'],
      subtitle: 'Multi-line ResponsiveHeadline.',
    },
  },
  {
    id: 14,
    label: 'One-word headline',
    props: {
      titleLines: ['Ignite'],
      ctaLabel: 'Begin',
    },
  },
  {
    id: 15,
    label: 'Marketing welcome',
    props: {
      eyebrow: 'Welcome',
      titleLines: ['Your stage', 'awaits'],
      subtitle: 'Build bold slices — not another centered SaaS hero.',
      ctaLabel: 'Explore',
    },
  },
  {
    id: 16,
    label: 'Stats eyebrow',
    props: {
      eyebrow: '12M km — solar wind',
      titleLines: ['Edge', 'glow'],
      subtitle: 'Eyebrow carries a metric.',
    },
  },
  {
    id: 17,
    label: 'Quote-style subtitle',
    props: {
      titleLines: ['Ember', 'arc'],
      subtitle: '"The horizon is where motion meets stillness."',
    },
  },
  {
    id: 18,
    label: 'Minimal mono',
    props: {
      eyebrow: 'HX-01',
      titleLines: ['Flare'],
    },
  },
  {
    id: 19,
    label: 'CTA + long title',
    props: {
      titleLines: ['A headline that stretches across the upper atmosphere'],
      ctaLabel: 'Transmit',
      ctaHref: '#send',
    },
  },
  {
    id: 20,
    label: 'Full marketing stack',
    props: {
      eyebrow: 'Product launch',
      titleLines: ['Horizon', 'flare'],
      subtitle: 'Grab the orb. Read the sky. Ship the stage.',
      ctaLabel: 'Start trial',
      ctaHref: '#trial',
    },
  },
]
