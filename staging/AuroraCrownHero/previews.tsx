import type { PreviewVariant } from '../../src/previews/types'
import type { AuroraCrownHeroProps } from './AuroraCrownHero'

export const auroraCrownHeroVariants: PreviewVariant<AuroraCrownHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Aurora'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Polar night',
      titleLines: ['Crown', 'of ice'],
      subtitle: 'A futuristic aurora stage with a grabable crystal crown in the luminous field.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['When the northern lights crown the frozen horizon'],
      subtitle: 'Long lines wrap without breaking the aurora composition.',
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], subtitle: 'Empty title falls back to Aurora crown.' },
  },
  {
    id: 5,
    label: 'Short body',
    props: { titleLines: ['Ice', 'crown'], subtitle: 'Brief copy beneath the aurora.' },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Arctic',
      titleLines: ['Crystal', 'throne'],
      subtitle:
        'The crown is not decoration — it is the heart of the aurora. Copy anchors the frozen ground while the crystal waits for you to orbit every facet. Mobile stacks copy above the field; desktop splits the polar sky.',
    },
  },
  { id: 7, label: 'Empty body', props: { eyebrow: 'No subtitle', titleLines: ['Crown only'] } },
  {
    id: 8,
    label: 'Eyebrow only + title',
    props: { eyebrow: 'Borealis', titleLines: ['Night', 'glow'] },
  },
  {
    id: 9,
    label: 'No eyebrow',
    props: { titleLines: ['Sky', 'crown'], subtitle: 'Eyebrow omitted.' },
  },
  {
    id: 10,
    label: 'No CTA',
    props: {
      titleLines: ['Silent', 'lights'],
      subtitle: 'No button — crown is the interaction.',
    },
  },
  {
    id: 11,
    label: 'Single CTA',
    props: {
      titleLines: ['Ascend'],
      subtitle: 'One primary action.',
      ctaLabel: 'Enter aurora',
      ctaHref: '#aurora',
    },
  },
  {
    id: 12,
    label: 'Dual CTA (primary only)',
    props: {
      titleLines: ['Rise', 'up'],
      subtitle: 'Primary CTA only in this component.',
      ctaLabel: 'Explore',
      ctaHref: '#explore',
    },
  },
  {
    id: 13,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Frozen'],
      subtitle: 'Submit disabled state.',
      ctaLabel: 'Aurora closed',
      ctaDisabled: true,
    },
  },
  {
    id: 14,
    label: 'Stat block in subtitle',
    props: {
      eyebrow: 'Latitude',
      titleLines: ['68°N', 'glow'],
      subtitle: 'Aurora oval at peak intensity — grab the crown to inspect every facet.',
    },
  },
  {
    id: 15,
    label: 'List in subtitle',
    props: {
      titleLines: ['Three', 'colors'],
      subtitle: 'Green. Violet. Ice. Each hue visible on a crystal face.',
    },
  },
  {
    id: 16,
    label: 'Code in subtitle',
    props: {
      eyebrow: 'Dev',
      titleLines: ['render()', 'crown'],
      subtitle: 'const crown = new Crystal({ orbit: true, glow: "#3dffa0" })',
    },
  },
  {
    id: 17,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Ice', 'remembers'],
      subtitle: '"The aurora does not ask permission — it arrives." — Arctic proverb',
    },
  },
  {
    id: 18,
    label: 'Minimal two-line title',
    props: {
      titleLines: ['Night', 'crown'],
      subtitle: 'Two-line headline with crystal.',
    },
  },
  {
    id: 19,
    label: 'Three-line title',
    props: {
      titleLines: ['Into', 'the', 'lights'],
      subtitle: 'Three explicit SVG lines.',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Aurora Crown',
      titleLines: ['Wear', 'the sky'],
      subtitle: 'Futuristic aurora hero with grabable crystal crown — full marketing copy, CTA, and orbit.',
      ctaLabel: 'Step inside',
      ctaHref: '#inside',
    },
  },
]
