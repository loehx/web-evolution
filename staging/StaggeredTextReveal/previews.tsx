import type { PreviewVariant } from '../../src/previews/types'
import type { StaggeredTextRevealProps } from './StaggeredTextReveal'

const stageLines = ["Hi, I'm Alex.", 'Freelance web developer,', 'hooked on AI.']

export const staggeredTextRevealVariants: PreviewVariant<StaggeredTextRevealProps>[] = [
  {
    id: 1,
    label: 'Letter by letter — from top',
    props: { mode: 'letter-from-top', lines: stageLines },
  },
  {
    id: 2,
    label: 'Letter by letter — from bottom',
    props: { mode: 'letter-from-bottom', lines: stageLines },
  },
  {
    id: 3,
    label: 'Word by word — from top',
    props: { mode: 'word-from-top', lines: stageLines },
  },
  {
    id: 4,
    label: 'Word by word — from bottom',
    props: { mode: 'word-from-bottom', lines: stageLines },
  },
  {
    id: 5,
    label: 'Letter by letter — from left',
    props: { mode: 'letter-from-left', lines: stageLines },
  },
  {
    id: 6,
    label: 'Word by word — from left',
    props: { mode: 'word-from-left', lines: stageLines },
  },
]
