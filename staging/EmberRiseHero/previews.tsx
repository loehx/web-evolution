import type { PreviewVariant } from '../../src/previews/types'
import type { EmberRiseHeroProps } from './EmberRiseHero'

export const emberRiseHeroVariants: PreviewVariant<EmberRiseHeroProps>[] = [
  { id: 1, label: 'Headline only', props: { titleLines: ['Ember'] } },
  {
    id: 2,
    label: 'Headline + subtext',
    props: {
      eyebrow: 'Volcanic',
      titleLines: ['Rise', 'from ash'],
      subtitle: 'A full-viewport volcanic stage with a grabable ember crystal in the plume.',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['When the earth exhales molten light'],
      subtitle: 'Long lines wrap without breaking the ash composition.',
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: { titleLines: [], subtitle: 'Empty title falls back to Ember rise.' },
  },
  {
    id: 5,
    label: 'Short body',
    props: { titleLines: ['Heat', 'wave'], subtitle: 'Brief copy above the plume.' },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      eyebrow: 'Forge',
      titleLines: ['Molten', 'core'],
      subtitle:
        'The ember crystal is not decoration — it is the heart of the stage. Copy anchors in the ash while the crystal waits for you to orbit every face. Mobile stacks copy above the crystal; desktop splits the viewport.',
    },
  },
  { id: 7, label: 'Empty body', props: { eyebrow: 'No subtitle', titleLines: ['Crystal only'] } },
  {
    id: 8,
    label: 'Eyebrow only + title',
    props: { eyebrow: 'Signal', titleLines: ['Ash', 'plume'] },
  },
  {
    id: 9,
    label: 'No eyebrow',
    props: { titleLines: ['Night', 'forge'], subtitle: 'Eyebrow omitted.' },
  },
  {
    id: 10,
    label: 'No CTA',
    props: {
      titleLines: ['Silent', 'heat'],
      subtitle: 'No button — crystal is the interaction.',
    },
  },
  {
    id: 11,
    label: 'Single CTA',
    props: {
      titleLines: ['Ignite'],
      subtitle: 'One primary action.',
      ctaLabel: 'Enter forge',
      ctaHref: '#forge',
    },
  },
  {
    id: 12,
    label: 'Dual CTA (primary only)',
    props: {
      titleLines: ['Burn', 'bright'],
      subtitle: 'Primary CTA only in this component.',
      ctaLabel: 'Start',
      ctaHref: '#start',
    },
  },
  {
    id: 13,
    label: 'Disabled CTA',
    props: {
      titleLines: ['Cooling'],
      subtitle: 'Submit disabled state.',
      ctaLabel: 'Cooling down',
      ctaDisabled: true,
    },
  },
  {
    id: 14,
    label: 'Stat block in subtitle',
    props: {
      eyebrow: 'Metrics',
      titleLines: ['1,200°C', 'peak'],
      subtitle: 'Core temperature at eruption — grab the crystal to inspect.',
    },
  },
  {
    id: 15,
    label: 'List in subtitle',
    props: {
      titleLines: ['Three', 'phases'],
      subtitle: 'Ignition. Combustion. Ascent. Each phase visible on a crystal face.',
    },
  },
  {
    id: 16,
    label: 'Code in subtitle',
    props: {
      eyebrow: 'Dev',
      titleLines: ['render()', 'heat'],
      subtitle: 'const ember = new Crystal({ glow: true, orbit: true })',
    },
  },
  {
    id: 17,
    label: 'Quote in subtitle',
    props: {
      titleLines: ['Fire', 'speaks'],
      subtitle: '"The ember remembers what the flame forgot." — Volcanic proverb',
    },
  },
  {
    id: 18,
    label: 'Minimal two-line title',
    props: {
      titleLines: ['Ash', 'ember'],
      subtitle: 'Two-line headline with crystal.',
    },
  },
  {
    id: 19,
    label: 'Three-line title',
    props: {
      titleLines: ['From', 'the', 'depths'],
      subtitle: 'Three explicit SVG lines.',
    },
  },
  {
    id: 20,
    label: 'Full marketing block',
    props: {
      eyebrow: 'Ember Rise',
      titleLines: ['Forge', 'the future'],
      subtitle: 'Volcanic hero with grabable ember crystal — full marketing copy, CTA, and orbit.',
      ctaLabel: 'Begin ascent',
      ctaHref: '#ascent',
    },
  },
]
