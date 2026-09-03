import type { PreviewVariant } from '../../src/previews/types'
import type { CascadeSpireHeroProps } from './CascadeSpireHero'

export const cascadeSpireHeroVariants: PreviewVariant<CascadeSpireHeroProps>[] = [
  {
    id: 1,
    label: 'Headline only',
    props: { titleLines: ['Cascade'] },
  },
  {
    id: 2,
    label: 'Eyebrow + headline + subtitle',
    props: {
      eyebrow: 'Brutalist stage',
      titleLines: ['Waterfall', 'of slabs'],
      subtitle: 'Copy steps down while the spire waits to be grabbed.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Monument typography that refuses to shrink into a card'],
      subtitle: 'Each slab offsets further — the cascade reads as motion frozen in concrete.',
    },
  },
  {
    id: 4,
    label: 'Missing eyebrow',
    props: {
      titleLines: ['No eyebrow'],
      subtitle: 'Slabs still stack.',
      ctaLabel: 'Enter',
    },
  },
  {
    id: 5,
    label: 'Short subtitle',
    props: {
      eyebrow: 'Stage 01',
      titleLines: ['Spire'],
      subtitle: 'Grab it.',
    },
  },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      eyebrow: 'CascadeSpireHero',
      titleLines: ['Raw', 'concrete'],
      subtitle:
        'A hero that treats typography as geological layers. The acid lime accent is the only shout — everything else is mass and drag.',
    },
  },
  {
    id: 7,
    label: 'Empty subtitle',
    props: {
      eyebrow: 'No body',
      titleLines: ['Slabs only'],
      ctaLabel: 'Proceed',
    },
  },
  {
    id: 8,
    label: 'Single CTA',
    props: {
      titleLines: ['One action'],
      ctaLabel: 'Start the pour',
    },
  },
  {
    id: 9,
    label: 'Dual slab CTA disabled',
    props: {
      titleLines: ['Locked'],
      ctaLabel: 'Unavailable',
      ctaDisabled: true,
    },
  },
  {
    id: 10,
    label: 'Three-line headline',
    props: {
      eyebrow: 'Multi-line',
      titleLines: ['Step', 'down', 'three'],
      subtitle: 'ResponsiveHeadline keeps breaks explicit.',
    },
  },
  {
    id: 11,
    label: 'German copy',
    props: {
      eyebrow: 'Beton',
      titleLines: ['Kaskade'],
      subtitle: 'Ziehen Sie den Kristall.',
      ctaLabel: 'Weiter',
    },
  },
  {
    id: 12,
    label: 'Japanese short',
    props: {
      eyebrow: '段',
      titleLines: ['瀑布'],
      subtitle: '掴んで回す。',
    },
  },
  {
    id: 13,
    label: 'All fields max',
    props: {
      eyebrow: 'Full cascade',
      titleLines: ['Every', 'slab', 'filled'],
      subtitle: 'Eyebrow, title, body, and CTA each own a concrete step.',
      ctaLabel: 'Commit',
    },
  },
  {
    id: 14,
    label: 'Minimal two words',
    props: { titleLines: ['Go'] },
  },
  {
    id: 15,
    label: 'Long eyebrow',
    props: {
      eyebrow: 'BRUTALIST FULL-VIEWPORT HERO WITH POINTER ORBIT',
      titleLines: ['Still', 'not SaaS'],
    },
  },
  {
    id: 16,
    label: 'CTA only extra',
    props: {
      titleLines: ['Action slab'],
      ctaLabel: 'Transmit',
    },
  },
  {
    id: 17,
    label: 'Subtitle quote',
    props: {
      titleLines: ['Echo'],
      subtitle: '"Mass is a design tool when whitespace is intentional."',
    },
  },
  {
    id: 18,
    label: 'Two-line title short',
    props: {
      eyebrow: 'Pair',
      titleLines: ['Left', 'Right'],
      subtitle: 'Spire on the right on desktop.',
    },
  },
  {
    id: 19,
    label: 'No CTA',
    props: {
      eyebrow: 'Read only',
      titleLines: ['No button'],
      subtitle: 'Orbit is the interaction.',
    },
  },
  {
    id: 20,
    label: 'Product launch',
    props: {
      eyebrow: 'Launch week',
      titleLines: ['Forge', 'Series'],
      subtitle: 'Titanium tools for people who build in public.',
      ctaLabel: 'Reserve yours',
    },
  },
]
