import type { PreviewVariant } from '../../src/previews/types'
import type { GlyphVeilProps } from './GlyphVeil'

export const glyphVeilVariants: PreviewVariant<GlyphVeilProps>[] = [
  {
    id: 1,
    label: 'Ink — name + title',
    props: {
      tone: 'ink',
      headline: 'Alexander Löhn\nWeb & AI Developer',
    },
  },
  {
    id: 2,
    label: 'Paper tone',
    props: { tone: 'paper', headline: 'WEB AS ART' },
  },
  {
    id: 3,
    label: 'Short headline',
    props: { headline: 'ART' },
  },
  {
    id: 4,
    label: 'Long headline',
    props: { headline: 'DESIGN THE OPEN WEB' },
  },
  {
    id: 5,
    label: 'Missing headline (fallback)',
    props: { headline: '   ' },
  },
  {
    id: 6,
    label: 'German umlauts',
    props: { headline: 'SCHÖN · WEB · KUNST' },
  },
  {
    id: 7,
    label: 'Single word',
    props: { headline: 'GLYPH', tone: 'paper' },
  },
  {
    id: 8,
    label: 'Three-line headline',
    props: {
      headline: 'WEB\nAS\nART',
      tone: 'ink',
    },
  },
  {
    id: 9,
    label: 'Alt wordmark',
    props: { headline: 'ART · WEB · DESIGN' },
  },
  {
    id: 10,
    label: 'Interface',
    props: { headline: 'INTERFACE' },
  },
  {
    id: 11,
    label: 'Large torch',
    props: { torchRadius: 140, headline: 'WEB AS ART' },
  },
  {
    id: 12,
    label: 'Small torch',
    props: { torchRadius: 44, headline: 'PIXEL' },
  },
  {
    id: 13,
    label: 'Single letter S mosaic',
    props: { headline: 'S' },
  },
  {
    id: 14,
    label: 'Paper + craft',
    props: { tone: 'paper', headline: 'CRAFT' },
  },
  {
    id: 15,
    label: 'Design single word',
    props: { headline: 'DESIGN', tone: 'ink' },
  },
  {
    id: 16,
    label: 'German headline',
    props: { headline: 'GEFLECHT', tone: 'paper' },
  },
  {
    id: 17,
    label: 'Tiny torch + paper',
    props: { tone: 'paper', torchRadius: 32, headline: 'VEIL' },
  },
  {
    id: 18,
    label: 'Huge torch',
    props: { torchRadius: 200, headline: 'TORCH' },
  },
  {
    id: 19,
    label: 'Minimal props',
    props: {},
  },
  {
    id: 20,
    label: 'Ampersand mosaic',
    props: { headline: 'WEB & AI', tone: 'ink' },
  },
]
