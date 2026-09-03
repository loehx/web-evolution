import type { PreviewVariant } from '../../src/previews/types'
import type { ObsidianRiftHeroProps } from './ObsidianRiftHero'

export const obsidianRiftHeroVariants: PreviewVariant<ObsidianRiftHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Obsidian'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Geological',
      titleLines: ['Rift', 'opens'],
      subtitle: 'A brutalist chasm stage with a grabable obsidian shard in the void.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['When the earth splits open to reveal black glass'],
      subtitle: 'Long lines wrap without breaking the rift composition.',
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], subtitle: 'Empty title falls back to Obsidian rift.' },
  },
  {
    id: 5,
    label: 'Short body',
    props: { titleLines: ['Void', 'shard'], subtitle: 'Brief copy beside the fracture.' },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Basalt',
      titleLines: ['Black', 'glass'],
      subtitle:
        'The obsidian shard is not decoration — it is the heart of the rift. Copy clings to the wall while the shard waits for you to orbit every face. Mobile stacks copy above the void; desktop splits the viewport along the fracture seam.',
    },
  },
  { id: 7, label: 'Empty body', props: { eyebrow: 'No subtitle', titleLines: ['Shard only'] } },
  {
    id: 8,
    label: 'Eyebrow only + title',
    props: { eyebrow: 'Fracture', titleLines: ['Deep', 'cut'] },
  },
  {
    id: 9,
    label: 'No eyebrow',
    props: { titleLines: ['Night', 'rift'], subtitle: 'Eyebrow omitted.' },
  },
  {
    id: 10,
    label: 'No CTA',
    props: {
      titleLines: ['Silent', 'void'],
      subtitle: 'No button — shard is the interaction.',
    },
  },
  {
    id: 11,
    label: 'Single CTA',
    props: {
      titleLines: ['Descend'],
      subtitle: 'One primary action.',
      ctaLabel: 'Enter rift',
      ctaHref: '#rift',
    },
  },
  {
    id: 12,
    label: 'Dual CTA (primary only)',
    props: {
      titleLines: ['Break', 'through'],
      subtitle: 'Primary CTA only in this component.',
      ctaLabel: 'Explore',
      ctaHref: '#explore',
    },
  },
  {
    id: 13,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Sealed'],
      subtitle: 'Submit disabled state.',
      ctaLabel: 'Rift closed',
      ctaDisabled: true,
    },
  },
  {
    id: 14,
    label: 'Stat block in subtitle',
    props: {
      eyebrow: 'Depth',
      titleLines: ['2.4km', 'down'],
      subtitle: 'Fracture depth at last survey — grab the shard to inspect.',
    },
  },
  {
    id: 15,
    label: 'List in subtitle',
    props: {
      titleLines: ['Three', 'layers'],
      subtitle: 'Basalt. Obsidian. Void. Each layer visible on a shard face.',
    },
  },
  {
    id: 16,
    label: 'Code in subtitle',
    props: {
      eyebrow: 'Dev',
      titleLines: ['render()', 'rift'],
      subtitle: 'const shard = new Obsidian({ orbit: true, glow: "#6b4ce6" })',
    },
  },
  {
    id: 17,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Glass', 'remembers'],
      subtitle: '"The rift does not forgive — it reveals." — Geological proverb',
    },
  },
  {
    id: 18,
    label: 'Minimal two-line title',
    props: {
      titleLines: ['Black', 'glass'],
      subtitle: 'Two-line headline with shard.',
    },
  },
  {
    id: 19,
    label: 'Three-line title',
    props: {
      titleLines: ['Into', 'the', 'void'],
      subtitle: 'Three explicit SVG lines.',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Obsidian Rift',
      titleLines: ['Split', 'the dark'],
      subtitle: 'Brutalist rift hero with grabable obsidian shard — full marketing copy, CTA, and orbit.',
      ctaLabel: 'Step inside',
      ctaHref: '#inside',
    },
  },
]
