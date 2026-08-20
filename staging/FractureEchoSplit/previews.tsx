import type { PreviewVariant } from '../../src/previews/types'
import type { FractureEchoSplitProps } from './FractureEchoSplit'

const IMG =
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80'
const IMG_LAND =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80'
const IMG_PORT =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80'
const IMG_SQ =
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe89?w=1200&q=80'

export const fractureEchoSplitVariants: PreviewVariant<FractureEchoSplitProps>[] = [
  {
    id: 1,
    label: 'Headline + image',
    props: { titleLines: ['Fracture'], image: IMG },
  },
  {
    id: 2,
    label: 'Full editorial',
    props: {
      eyebrow: 'Editorial',
      titleLines: ['Echo', 'lines'],
      body: 'Ghost headlines offset behind the real copy while the violet fracture seam holds the tension.',
      image: IMG,
      ctaLabel: 'Read essay',
      ctaHref: '#essay',
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['Typography that fractures before it folds into a card'],
      body: 'Long titles still echo.',
      image: IMG_PORT,
    },
  },
  {
    id: 4,
    label: 'Missing image',
    props: {
      eyebrow: 'No photo',
      titleLines: ['Text shard'],
      body: 'Placeholder slab on the left.',
    },
  },
  {
    id: 5,
    label: 'Short body',
    props: {
      titleLines: ['Brief'],
      body: 'One line.',
      image: IMG,
    },
  },
  {
    id: 6,
    label: 'Long body',
    props: {
      titleLines: ['Dense'],
      body:
        'The echo layers are decorative but intentional — they signal depth without hiding content in motion. On mobile the fracture becomes a horizontal seam so the shard stack reads clearly on narrow screens.',
      image: IMG_LAND,
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: {
      titleLines: ['No body'],
      image: IMG,
      ctaLabel: 'Only link',
    },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Portrait', 'shard'],
      image: IMG_PORT,
      body: '3:4 crop in echo stack.',
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Wide', 'source'],
      image: IMG_LAND,
      body: 'Center-cropped to ratio.',
    },
  },
  {
    id: 10,
    label: 'Broken image',
    props: {
      titleLines: ['Broken'],
      image: 'https://broken.invalid/img.jpg',
      body: 'Fallback placeholder.',
    },
  },
  {
    id: 11,
    label: 'No CTA',
    props: {
      eyebrow: 'Read',
      titleLines: ['Silent'],
      body: 'No link slab.',
      image: IMG,
    },
  },
  {
    id: 12,
    label: 'Single CTA',
    props: {
      titleLines: ['One link'],
      image: IMG,
      ctaLabel: 'Continue',
      ctaHref: '#continue',
    },
  },
  {
    id: 13,
    label: 'German copy',
    props: {
      eyebrow: 'Riss',
      titleLines: ['Echo', 'Zeilen'],
      body: 'Editorial Bruchlinie.',
      image: IMG,
      ctaLabel: 'Weiterlesen',
    },
  },
  {
    id: 14,
    label: 'Three-line title',
    props: {
      titleLines: ['Three', 'echo', 'lines'],
      body: 'Each line ghosts.',
      image: IMG_PORT,
    },
  },
  {
    id: 15,
    label: 'No eyebrow',
    props: {
      titleLines: ['Clean'],
      body: 'Starts at headline.',
      image: IMG,
    },
  },
  {
    id: 16,
    label: 'Quote body',
    props: {
      titleLines: ['Quoted'],
      body: '"The crack is where the layout admits it is alive."',
      image: IMG_LAND,
    },
  },
  {
    id: 17,
    label: 'Case study',
    props: {
      eyebrow: 'Case study',
      titleLines: ['Atelier', 'Hall'],
      body: 'A print studio that treats paper like architecture.',
      image: IMG,
      ctaLabel: 'View project',
    },
  },
  {
    id: 18,
    label: 'Minimal',
    props: { titleLines: ['Min'], image: IMG_SQ },
  },
  {
    id: 19,
    label: 'Long eyebrow',
    props: {
      eyebrow: 'EDITORIAL IMAGE TEXT SPLIT WITH FRACTURE',
      titleLines: ['Still', 'editorial'],
      image: IMG,
    },
  },
  {
    id: 20,
    label: 'Product story',
    props: {
      eyebrow: 'Forge',
      titleLines: ['Steel', 'meets', 'paper'],
      body: 'Tools designed for makers who document every strike.',
      image: IMG_PORT,
      ctaLabel: 'Shop tools',
    },
  },
]
