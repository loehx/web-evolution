export type TesseraSliderKey =
  | 'squareCount'
  | 'cloudCount'
  | 'squareSize'
  | 'jitter'
  | 'letterScale'
  | 'letterSpacing'
  | 'fontWeight'
  | 'sampleThreshold'
  | 'parallaxY'
  | 'parallaxX'
  | 'depthMin'
  | 'depthMax'

export type TesseraDriftSettings = {
  squareCount: number
  cloudCount: number
  squareSize: number
  jitter: number
  letterScale: number
  letterSpacing: number
  fontWeight: number
  sampleThreshold: number
  parallaxY: number
  parallaxX: number
  depthMin: number
  depthMax: number
  seed: number
  squareColor: string
  background: string
  headline: string
  showRunway: boolean
}

export const DEFAULT_TESSERA_DRIFT_SETTINGS: TesseraDriftSettings = {
  squareCount: 100,
  cloudCount: 80,
  squareSize: 8,
  jitter: 0,
  letterScale: 72,
  letterSpacing: 0.06,
  fontWeight: 800,
  sampleThreshold: 200,
  parallaxY: 0.55,
  parallaxX: 0.42,
  depthMin: 0.15,
  depthMax: 1,
  seed: 42,
  squareColor: '#ffffff',
  background: '#07080a',
  headline: 'Hello World',
  showRunway: false,
}

export const TESSERA_GROUP_DEBUG_COLORS = [
  '#e8c547',
  '#6ec6b8',
  '#c96b9a',
  '#7a8cff',
  '#e07a4a',
  '#9ad66d',
  '#d4a5ff',
  '#ff6b6b',
  '#4ecdc4',
  '#ffe66d',
  '#95e1d3',
  '#ff8fab',
]
