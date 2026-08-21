import type { PreviewVariant } from '../../src/previews/types'
import type { FolioMarginSplitProps } from './FolioMarginSplit'

const IMG_PORT =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'
const IMG_LAND =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
const IMG_SQ =
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe89?w=800&q=80'

const notes3 = ['See also: coastal study', 'Rev. 3 — tighten lede', 'Approved']

export const folioMarginSplitVariants: PreviewVariant<FolioMarginSplitProps>[] = [
  {
    id: 1,
    label: 'Headline + image',
    props: {
      titleLines: ['Open folio'],
      image: IMG_PORT,
    },
  },
  {
    id: 2,
    label: 'Headline + subtext + image',
    props: {
      eyebrow: 'Chapter IV',
      titleLines: ['Margin', 'notes'],
      body: 'Editorial image and copy on a manuscript spread with crimson annotations in the gutter.',
      image: IMG_LAND,
      marginNotes: notes3,
    },
  },
  {
    id: 3,
    label: 'Very long headline',
    props: {
      titleLines: ['When the editor marks every line in red ink'],
      body: 'Long headlines wrap within the recto column.',
      image: IMG_SQ,
    },
  },
  {
    id: 4,
    label: 'Missing headline fallback',
    props: {
      titleLines: [],
      body: 'Falls back to Untitled folio.',
      image: IMG_PORT,
    },
  },
  {
    id: 5,
    label: 'Short body',
    props: {
      titleLines: ['Brief'],
      body: 'One sentence.',
      image: IMG_LAND,
    },
  },
  {
    id: 6,
    label: 'Long body text',
    props: {
      titleLines: ['Manuscript'],
      body:
        'The folio treats the viewport as an open book. Verso carries the photograph; recto holds the headline and body. Margin notes run in the gutter like a marked-up proof — not a sidebar widget.',
      image: IMG_PORT,
      marginNotes: ['Expand §2', 'Check caption'],
    },
  },
  {
    id: 7,
    label: 'Empty body',
    props: {
      titleLines: ['Image only'],
      image: IMG_SQ,
      marginNotes: ['No copy'],
    },
  },
  {
    id: 8,
    label: 'Portrait image',
    props: {
      titleLines: ['Tall crop'],
      body: '4/5 portrait on verso.',
      image: IMG_PORT,
    },
  },
  {
    id: 9,
    label: 'Landscape image',
    props: {
      titleLines: ['Wide source'],
      body: 'Center-cropped to portrait slot.',
      image: IMG_LAND,
    },
  },
  {
    id: 10,
    label: 'Missing image',
    props: {
      titleLines: ['Text folio'],
      body: 'Verso shows placeholder.',
      marginNotes: ['Add figure'],
    },
  },
  {
    id: 11,
    label: 'Broken image URL',
    props: {
      titleLines: ['Broken verso'],
      image: 'https://example.invalid/photo.jpg',
      body: 'Image fails gracefully.',
    },
  },
  {
    id: 12,
    label: 'No CTA',
    props: {
      titleLines: ['Read'],
      body: 'No link at bottom.',
      image: IMG_SQ,
    },
  },
  {
    id: 13,
    label: 'Single CTA',
    props: {
      titleLines: ['Continue'],
      body: 'One italic link.',
      ctaLabel: 'Read chapter',
      ctaHref: '#chapter',
      image: IMG_PORT,
    },
  },
  {
    id: 14,
    label: 'Many margin notes',
    props: {
      titleLines: ['Annotated'],
      body: 'Gutter fills with notes.',
      image: IMG_LAND,
      marginNotes: [
        'First note',
        'Second — longer annotation that wraps in the narrow gutter',
        'Third',
        'Fourth',
        'Fifth',
      ],
    },
  },
  {
    id: 15,
    label: 'No margin notes',
    props: {
      titleLines: ['Clean spread'],
      body: 'Empty gutter shows dash.',
      image: IMG_SQ,
    },
  },
  {
    id: 16,
    label: 'Article excerpt',
    props: {
      eyebrow: 'Essay',
      titleLines: ['On craft'],
      body: 'We build stages, not widgets. The folio is the page.',
      image: IMG_PORT,
      marginNotes: ['Published Aug 2026'],
      ctaLabel: 'Full essay',
    },
  },
  {
    id: 17,
    label: 'Case study',
    props: {
      eyebrow: 'Client work',
      titleLines: ['Harbor', 'rebuild'],
      body: 'Infrastructure refresh along the north coast.',
      image: IMG_LAND,
      marginNotes: ['2025', 'Public sector'],
    },
  },
  {
    id: 18,
    label: 'Pull quote in body',
    props: {
      titleLines: ['Voices'],
      body: '"The margin is where the real conversation happens." — Editor',
      image: IMG_SQ,
    },
  },
  {
    id: 19,
    label: 'Two-line headline',
    props: {
      titleLines: ['Red ink', 'gutter'],
      body: 'ResponsiveHeadline with two lines.',
      image: IMG_PORT,
      marginNotes: ['v2'],
    },
  },
  {
    id: 20,
    label: 'Full editorial stack',
    props: {
      eyebrow: 'Studio journal',
      titleLines: ['Marked', 'pages'],
      body: 'Every evolve batch adds another folio to the library.',
      image: IMG_LAND,
      marginNotes: notes3,
      ctaLabel: 'Archive',
      ctaHref: '#archive',
    },
  },
]
