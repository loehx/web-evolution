import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
  type PreviewVariant,
} from '../../src/previews/types'
import type { TideCard, TideCardRailProps } from './TideCardRail'

const imgA = PLACEHOLDER_LANDSCAPE
const imgB = PLACEHOLDER_PORTRAIT
const imgC = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&h=900&fit=crop'
const imgD = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&h=900&fit=crop'

const trio: TideCard[] = [
  { image: imgA, title: 'North jetty', body: 'Salt air and a long exposure.' },
  { image: imgB, title: 'Portrait hour', body: 'A face against weather.' },
  { image: imgC, title: 'After rain', body: 'The road still holds the sky.' },
]

export const tideCardRailVariants: PreviewVariant<TideCardRailProps>[] = [
  {
    id: 1,
    label: 'Headline only on cards',
    props: {
      cards: [
        { image: imgA, title: 'One' },
        { image: imgB, title: 'Two' },
        { image: imgC, title: 'Three' },
      ],
    },
  },
  {
    id: 2,
    label: 'Headline + subtext',
    props: { eyebrow: 'Dispatch', title: 'Tide stories', cards: trio },
  },
  {
    id: 3,
    label: 'Very long card titles',
    props: {
      title: 'Long lines',
      cards: [
        {
          image: imgA,
          title: 'A dispatch from the furthest breakwater we could walk before the light failed',
          body: 'Wrap test.',
        },
        { image: imgB, title: 'Short', body: 'Contrast.' },
      ],
    },
  },
  {
    id: 4,
    label: 'Missing section title',
    props: { cards: trio },
  },
  {
    id: 5,
    label: 'Short bodies',
    props: {
      title: 'Brief',
      cards: [
        { image: imgA, title: 'A', body: 'Now.' },
        { image: imgC, title: 'B', body: 'Then.' },
      ],
    },
  },
  {
    id: 6,
    label: 'Long bodies',
    props: {
      title: 'Essays',
      cards: [
        {
          image: imgD,
          title: 'The long walk',
          body: 'Two paragraphs worth of caption to see how the slab grows. The image still owns the vertical. Text is a footnote that happens to be beautiful.',
        },
        {
          image: imgA,
          title: 'Second essay',
          body: 'Another long caption so the rail stays honest when copy is not a tweet.',
        },
      ],
    },
  },
  {
    id: 7,
    label: 'Empty bodies',
    props: {
      title: 'Silent captions',
      cards: [
        { image: imgA, title: 'Mute A' },
        { image: imgB, title: 'Mute B' },
        { image: imgC, title: 'Mute C' },
      ],
    },
  },
  {
    id: 8,
    label: 'Portrait images',
    props: {
      title: 'Tall frames',
      cards: [
        { image: imgB, title: 'Portrait one', body: 'Cropped to cover.' },
        { image: imgB, title: 'Portrait two', body: 'Same ratio, new story.' },
      ],
    },
  },
  {
    id: 9,
    label: 'Landscape images',
    props: {
      title: 'Wide frames',
      cards: [
        { image: imgA, title: 'Wide one', body: 'Cover crop.' },
        { image: imgC, title: 'Wide two', body: 'Cover crop.' },
        { image: imgD, title: 'Wide three', body: 'Cover crop.' },
      ],
    },
  },
  {
    id: 10,
    label: 'Missing images',
    props: {
      title: 'No plates',
      cards: [
        { title: 'Ghost one', body: 'Fallback slab.' },
        { title: 'Ghost two', body: 'Still swipeable.' },
      ],
    },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      title: 'Broken plate',
      cards: [
        { image: PLACEHOLDER_BROKEN, title: '404 sea', body: 'Browser broken-image state.' },
        { image: imgA, title: 'Alive', body: 'Neighbor still works.' },
      ],
    },
  },
  {
    id: 12,
    label: 'Single card',
    props: { title: 'Solo', cards: [{ image: imgA, title: 'Only one', body: 'Still a rail.' }] },
  },
  {
    id: 13,
    label: 'Many cards',
    props: {
      title: 'Long tide',
      cards: Array.from({ length: 8 }, (_, i) => ({
        image: [imgA, imgB, imgC, imgD][i % 4],
        title: `Station ${i + 1}`,
        body: 'Keep swiping.',
      })),
    },
  },
  {
    id: 14,
    label: 'Empty rail',
    props: { title: 'Ebb', cards: [] },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: { title: 'Untitled desk', cards: trio },
  },
  {
    id: 16,
    label: 'Eyebrow only header',
    props: { eyebrow: 'Field notes', cards: trio },
  },
  {
    id: 17,
    label: 'Mixed missing image in set',
    props: {
      title: 'Gaps',
      cards: [
        { image: imgA, title: 'Has plate', body: 'Photo.' },
        { title: 'No plate', body: 'Fallback.' },
        { image: imgC, title: 'Has plate again', body: 'Photo.' },
      ],
    },
  },
  {
    id: 18,
    label: 'German copy',
    props: {
      title: 'Gezeiten',
      cards: [
        { image: imgA, title: 'Nordmole', body: 'Salz in der Luft.' },
        { image: imgC, title: 'Nach dem Regen', body: 'Die Straße hält den Himmel.' },
      ],
    },
  },
  {
    id: 19,
    label: 'Quote-like captions',
    props: {
      title: 'Said aloud',
      cards: [
        { image: imgB, title: '“We waited.”', body: 'Interview 04.' },
        { image: imgD, title: '“Then the fog.”', body: 'Interview 05.' },
      ],
    },
  },
  {
    id: 20,
    label: 'Dense header + five cards',
    props: {
      eyebrow: 'Issue 09',
      title: 'Everything the tide brought in',
      cards: [
        ...trio,
        { image: imgD, title: 'Fourth', body: 'Still more.' },
        { image: imgA, title: 'Fifth', body: 'End of this set.' },
      ],
    },
  },
]
