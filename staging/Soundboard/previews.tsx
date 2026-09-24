import type { PreviewVariant } from '../../src/previews/types'
import type { SoundboardProps } from './Soundboard'

export const soundboardVariants: PreviewVariant<SoundboardProps>[] = [
  { id: 1, label: 'Default field', props: {} },
  { id: 2, label: 'Sparse (24 bubbles)', props: { bubbleCount: 24 } },
  { id: 3, label: 'Dense (72 bubbles)', props: { bubbleCount: 72 } },
  { id: 4, label: 'Extra slow rise', props: { riseSpeed: 0.55 } },
  { id: 5, label: 'Faster drift', props: { riseSpeed: 1.6 } },
  { id: 6, label: 'No hint overlay', props: { showHint: false } },
  { id: 7, label: 'Sparse + slow', props: { bubbleCount: 20, riseSpeed: 0.5 } },
  { id: 8, label: 'Dense + slow', props: { bubbleCount: 64, riseSpeed: 0.65 } },
  { id: 9, label: 'Minimal (12)', props: { bubbleCount: 12, showHint: true } },
  { id: 10, label: 'Crowded (96)', props: { bubbleCount: 96, riseSpeed: 0.85 } },
  { id: 11, label: 'Whisper drift', props: { bubbleCount: 40, riseSpeed: 0.4 } },
  { id: 12, label: 'Silent stage', props: { bubbleCount: 36, showHint: false, riseSpeed: 0.9 } },
]
