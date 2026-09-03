import type { PreviewVariant } from '../../src/previews/types'
import { DEFAULT_TESSERA_DRIFT_SETTINGS } from '../TesseraDrift/tesseraSettings'
import type { TesseraDriftShaderProps } from './TesseraDriftShader'

const base = DEFAULT_TESSERA_DRIFT_SETTINGS

export const tesseraDriftShaderVariants: PreviewVariant<TesseraDriftShaderProps>[] = [
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
    label: 'Dense tesserae',
    props: {
      headline: 'MOSAIC',
      squareCount: 140,
      squareSize: 6,
    },
  },
  {
    id: 5,
    label: 'High parallax',
    props: {
      headline: 'SHEAR',
      parallaxY: 1,
      parallaxX: 0.35,
      depthMax: 1,
    },
  },
  {
    id: 6,
    label: 'Warm ivory on ink',
    props: {
      headline: 'IVORY',
      squareColor: '#f4f1ea',
      background: '#07080a',
    },
  },
  {
    id: 7,
    label: 'Heavy load — stress test',
    props: {
      headline: 'SHADER',
      squareCount: 180,
      cloudCount: 320,
      squareSize: 5,
    },
  },
  {
    id: 8,
    label: 'Alt seed + no controls',
    props: {
      headline: 'SEED',
      seed: 128,
      showControls: false,
      showRunway: true,
    },
  },
]
