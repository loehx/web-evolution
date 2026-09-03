import type { PreviewVariant } from '../../src/previews/types'
import type { LetterMosaicProps } from './LetterMosaic'

export const letterMosaicVariants: PreviewVariant<LetterMosaicProps>[] = [
  {
    id: 1,
    label: 'Single word',
    props: { headline: 'AETHER' },
  },
  {
    id: 2,
    label: 'With tagline',
    props: {
      headline: 'HYPERREAL',
      tagline: 'Each letter built from itself',
    },
  },
  {
    id: 3,
    label: 'Long headline',
    props: { headline: 'ORBITAL' },
  },
  {
    id: 4,
    label: 'Single letter',
    props: { headline: 'S', tagline: 'Mosaic glyph' },
  },
  {
    id: 5,
    label: 'German umlaut',
    props: { headline: 'ÄTHER', tagline: 'Typographic tessellation' },
  },
  {
    id: 6,
    label: 'Short word',
    props: { headline: 'FLUX' },
  },
]
