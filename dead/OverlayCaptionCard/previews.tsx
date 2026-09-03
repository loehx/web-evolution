import {
  PLACEHOLDER_BROKEN,
  PLACEHOLDER_LANDSCAPE,
  PLACEHOLDER_PORTRAIT,
} from '../../src/previews/types'
import type { PreviewVariant } from '../../src/previews/types'
import type { OverlayCaptionCardProps } from './OverlayCaptionCard'

export const overlayCaptionCardVariants: PreviewVariant<OverlayCaptionCardProps>[] = [
  {
    id: 1,
    label: 'Headline only',
    props: { imageUrl: PLACEHOLDER_LANDSCAPE, title: 'Mountain retreat' },
  },
  {
    id: 2,
    label: 'Title + subtitle',
    props: {
      imageUrl: PLACEHOLDER_LANDSCAPE,
      title: 'Coastal drive',
      subtitle: 'California · 12 photos',
    },
  },
  {
    id: 3,
    label: 'Very long title',
    props: {
      imageUrl: PLACEHOLDER_PORTRAIT,
      title: 'An extraordinarily long caption title that must wrap within the gradient overlay without clipping',
      subtitle: 'Subtitle stays readable',
    },
  },
  {
    id: 4,
    label: 'Missing title',
    props: { imageUrl: PLACEHOLDER_LANDSCAPE, subtitle: 'Subtitle only fallback' },
  },
  {
    id: 5,
    label: 'Short subtitle',
    props: { imageUrl: PLACEHOLDER_LANDSCAPE, title: 'Brief', subtitle: 'OK' },
  },
  {
    id: 6,
    label: 'Long subtitle',
    props: {
      imageUrl: PLACEHOLDER_PORTRAIT,
      title: 'Editorial',
      subtitle:
        'A longer supporting line that describes the collection, location, or author context beneath the main headline.',
    },
  },
  {
    id: 7,
    label: 'Empty subtitle',
    props: { imageUrl: PLACEHOLDER_LANDSCAPE, title: 'No subtitle field' },
  },
  {
    id: 8,
    label: 'Portrait aspect',
    props: {
      aspect: 'portrait',
      imageUrl: PLACEHOLDER_PORTRAIT,
      title: 'Portrait frame',
      subtitle: '3:4 ratio',
    },
  },
  {
    id: 9,
    label: 'Landscape aspect',
    props: {
      aspect: 'landscape',
      imageUrl: PLACEHOLDER_LANDSCAPE,
      title: 'Wide banner',
      subtitle: '16:10',
    },
  },
  {
    id: 10,
    label: 'Square aspect',
    props: {
      aspect: 'square',
      imageUrl: PLACEHOLDER_LANDSCAPE,
      title: 'Square tile',
      subtitle: '1:1 grid cell',
    },
  },
  {
    id: 11,
    label: 'Missing image',
    props: { title: 'Placeholder background', subtitle: 'No imageUrl' },
  },
  {
    id: 12,
    label: 'Broken image URL',
    props: {
      imageUrl: PLACEHOLDER_BROKEN,
      title: 'Broken media',
      subtitle: 'Browser shows alt fallback',
    },
  },
  {
    id: 13,
    label: 'With href link',
    props: {
      imageUrl: PLACEHOLDER_LANDSCAPE,
      title: 'Linked card',
      subtitle: 'Click through',
      href: '#gallery',
    },
  },
  {
    id: 14,
    label: 'No CTA / no href',
    props: {
      imageUrl: PLACEHOLDER_PORTRAIT,
      title: 'Static card',
      subtitle: 'Decorative only',
    },
  },
  {
    id: 15,
    label: 'Unicode copy',
    props: {
      imageUrl: PLACEHOLDER_LANDSCAPE,
      title: 'Café culture ☕',
      subtitle: 'Zürich · 2026',
    },
  },
  {
    id: 16,
    label: 'Numeric title',
    props: { imageUrl: PLACEHOLDER_LANDSCAPE, title: '2026', subtitle: 'Year in review' },
  },
  {
    id: 17,
    label: 'All fields minimal',
    props: { imageUrl: PLACEHOLDER_PORTRAIT, title: 'A' },
  },
  {
    id: 18,
    label: 'Whitespace padded',
    props: {
      imageUrl: PLACEHOLDER_LANDSCAPE,
      title: '  Spaced title  ',
      subtitle: '  Spaced subtitle  ',
    },
  },
  {
    id: 19,
    label: 'Quote style subtitle',
    props: {
      imageUrl: PLACEHOLDER_PORTRAIT,
      title: 'Studio visit',
      subtitle: '"Light changes everything." — Alex',
    },
  },
  {
    id: 20,
    label: 'Marketing promo',
    props: {
      imageUrl: PLACEHOLDER_LANDSCAPE,
      title: 'New collection',
      subtitle: 'Shop the drop →',
      href: '#shop',
      aspect: 'landscape',
    },
  },
]
