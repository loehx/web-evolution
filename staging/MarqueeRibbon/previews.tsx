import type { PreviewVariant } from '../../src/previews/types'
import type { MarqueeRibbonProps } from './MarqueeRibbon'

export const marqueeRibbonVariants: PreviewVariant<MarqueeRibbonProps>[] = [
  { id: 1, label: 'Three short items', props: { items: ['Design', 'Build', 'Ship'] } },
  {
    id: 2,
    label: 'Five marketing tags',
    props: { items: ['Fast', 'Accessible', 'Responsive', 'Typed', 'Bold'] },
  },
  {
    id: 3,
    label: 'Long items',
    props: {
      items: [
        'End-to-end design systems',
        'Production-ready React components',
        'Scroll-native interactions',
      ],
    },
  },
  { id: 4, label: 'Single item', props: { items: ['Only one label'] } },
  { id: 5, label: 'Numeric items', props: { items: ['01', '02', '03', '04', '05'] } },
  { id: 6, label: 'Emoji items', props: { items: ['🚀 Launch', '✨ Polish', '🎯 Focus'] } },
  {
    id: 7,
    label: 'Slow speed',
    props: { items: ['Slow', 'Marquee', 'Test'], speed: 45 },
  },
  {
    id: 8,
    label: 'Fast speed',
    props: { items: ['Fast', 'Marquee', 'Test'], speed: 12 },
  },
  {
    id: 9,
    label: 'Scroll right',
    props: { items: ['Right', 'Direction', 'Flow'], direction: 'right' },
  },
  {
    id: 10,
    label: 'No pause on hover',
    props: { items: ['Always', 'Moving'], pauseOnHover: false },
  },
  {
    id: 11,
    label: 'Many duplicates stress',
    props: {
      items: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'],
    },
  },
  {
    id: 12,
    label: 'URL-like strings',
    props: { items: ['evolved.dev/pricing', 'evolved.dev/docs', 'evolved.dev/blog'] },
  },
  {
    id: 13,
    label: 'Hashtag campaign',
    props: { items: ['#evolve', '#webcomponents', '#buildinpublic'] },
  },
  {
    id: 14,
    label: 'Mixed case',
    props: { items: ['lowercase', 'UPPERCASE', 'MixedCase'] },
  },
  {
    id: 15,
    label: 'Punctuation heavy',
    props: { items: ['Read more →', 'Docs · API · CLI', 'New — v2.0'] },
  },
  {
    id: 16,
    label: 'Single character items',
    props: { items: ['A', 'B', 'C', 'D', 'E'] },
  },
  {
    id: 17,
    label: 'Whitespace padded (trim test)',
    props: { items: ['  Spaced  ', '  Labels  ', '  Here  '] },
  },
  {
    id: 18,
    label: 'German labels',
    props: { items: ['Entwickeln', 'Testen', 'Veröffentlichen'] },
  },
  {
    id: 19,
    label: 'Tech stack list',
    props: { items: ['React', 'TypeScript', 'Tailwind', 'Motion', 'Vite'] },
  },
  {
    id: 20,
    label: 'Full evolved-web set',
    props: {
      items: [
        'Viewport-native',
        'Payload-driven',
        'Skeleton-first',
        'Parallax depth',
        'Marquee motion',
      ],
      speed: 24,
    },
  },
]
