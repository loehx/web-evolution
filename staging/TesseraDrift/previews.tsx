import type { PreviewVariant } from '../../src/previews/types'
import { DEFAULT_TESSERA_DRIFT_SETTINGS } from './tesseraSettings'
import type { TesseraDriftProps } from './TesseraDrift'

const base = DEFAULT_TESSERA_DRIFT_SETTINGS

export const tesseraDriftVariants: PreviewVariant<TesseraDriftProps>[] = [
  {
    id: 1,
    label: 'Default — Hello World',
    props: {
      headline: base.headline,
    },
  },
  {
    id: 2,
    label: 'Bottom runway',
    props: {
      headline: 'DRIFT',
      showRunway: true,
    },
  },
  {
    id: 3,
    label: 'High cloud count',
    props: {
      headline: 'DRIFT',
      cloudCount: 160,
    },
  },
  {
    id: 4,
    label: 'Short word — TILE',
    props: {
      headline: 'TILE',
      squareCount: 90,
    },
  },
  {
    id: 5,
    label: 'Long headline',
    props: {
      headline: 'SQUARE TYPE',
      letterScale: 18,
      squareCount: 65,
    },
  },
  {
    id: 6,
    label: 'Dense tesserae',
    props: {
      headline: 'MOSAIC',
      squareCount: 140,
      squareSize: 6,
    },
  },
  {
    id: 7,
    label: 'Sparse field',
    props: {
      headline: 'VOID',
      squareCount: 40,
      cloudCount: 20,
      jitter: 22,
    },
  },
  {
    id: 8,
    label: 'Heavy weight',
    props: {
      headline: 'BOLD',
      fontWeight: 900,
      sampleThreshold: 120,
    },
  },
  {
    id: 9,
    label: 'Light weight',
    props: {
      headline: 'WHISPER',
      fontWeight: 400,
      sampleThreshold: 180,
    },
  },
  {
    id: 10,
    label: 'High parallax',
    props: {
      headline: 'SHEAR',
      parallaxY: 1,
      parallaxX: 0.35,
      depthMax: 1,
    },
  },
  {
    id: 11,
    label: 'Low parallax',
    props: {
      headline: 'CALM',
      parallaxY: 0.15,
      parallaxX: 0.04,
    },
  },
  {
    id: 12,
    label: 'Deep depth spread',
    props: {
      headline: 'FLOW',
      depthMin: 0.35,
      depthMax: 1,
      seed: 7,
    },
  },
  {
    id: 13,
    label: 'Tight depth band',
    props: {
      headline: 'PACK',
      depthMin: 0.5,
      depthMax: 0.75,
    },
  },
  {
    id: 14,
    label: 'Loose jitter field',
    props: {
      headline: 'SCATTER',
      jitter: 32,
    },
  },
  {
    id: 15,
    label: 'Large squares',
    props: {
      headline: 'BLOCK',
      squareSize: 14,
      squareCount: 55,
    },
  },
  {
    id: 16,
    label: 'Fine grid',
    props: {
      headline: 'SOFT',
      squareSize: 5,
      squareCount: 120,
    },
  },
  {
    id: 17,
    label: 'Warm ivory on ink',
    props: {
      headline: 'IVORY',
      squareColor: '#f4f1ea',
      background: '#07080a',
    },
  },
  {
    id: 18,
    label: 'Signal palette',
    props: {
      headline: 'SIGNAL',
      squareColor: '#7a8cff',
      background: '#0a0b12',
    },
  },
  {
    id: 19,
    label: 'Wide tracking',
    props: {
      headline: 'SPACE',
      letterSpacing: 0.14,
      letterScale: 24,
    },
  },
  {
    id: 20,
    label: 'Alt seed + no controls',
    props: {
      headline: 'SEED',
      seed: 128,
      showControls: false,
      showRunway: true,
    },
  },
]
