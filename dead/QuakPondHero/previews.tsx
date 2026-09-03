import type { PreviewVariant } from '../../src/previews/types'
import type { QuakPondHeroProps } from './QuakPondHero'

export const quakPondHeroVariants: PreviewVariant<QuakPondHeroProps>[] = [
  { id: 1, label: 'QUAK / QUAK (default flock)', props: { lines: ['QUAK', 'QUAK'] } },
  {
    id: 2,
    label: 'Headline + smaller flock',
    props: { lines: ['QUAK', 'QUAK'], count: 120 },
  },
  {
    id: 3,
    label: 'Long headline lines',
    props: { lines: ['QUACKING', 'ENDLESSLY'], count: 200 },
  },
  { id: 4, label: 'Missing headline (lawn only)', props: { lines: [], count: 220 } },
  { id: 5, label: 'Single line stamp', props: { lines: ['QUAK'], count: 180 } },
  {
    id: 6,
    label: 'Three-line stamp',
    props: { lines: ['QUAK', 'QUAK', 'QUAK'], count: 200 },
  },
  { id: 7, label: 'Empty second line', props: { lines: ['QUAK', ''], count: 160 } },
  { id: 8, label: 'Dense crowd', props: { lines: ['QUAK', 'QUAK'], count: 320 } },
  { id: 9, label: 'Sparse lawn', props: { lines: ['QUAK', 'QUAK'], count: 48 } },
  { id: 10, label: 'German copy', props: { lines: ['QUAK', 'ENTEN'], count: 200 } },
  { id: 11, label: 'Numeric stamp', props: { lines: ['100', 'DUCKS'], count: 100 } },
  { id: 12, label: 'All caps question', props: { lines: ['WHO', 'QUAK'], count: 180 } },
  { id: 13, label: 'Lowercase', props: { lines: ['quak', 'quak'], count: 200 } },
  { id: 14, label: 'Wide words', props: { lines: ['POND', 'LIFE'], count: 210 } },
  { id: 15, label: 'Tiny flock stress', props: { lines: ['QUAK', 'QUAK'], count: 12 } },
  { id: 16, label: 'Japanese copy', props: { lines: ['ガー', 'ガー'], count: 180 } },
  { id: 17, label: 'One duck', props: { lines: ['QUAK', 'QUAK'], count: 1 } },
  { id: 18, label: 'Hyphenated', props: { lines: ['QUAK-QUAK', 'NOW'], count: 160 } },
  { id: 19, label: 'Short codes', props: { lines: ['QK', 'QK'], count: 220 } },
  {
    id: 20,
    label: 'Very long tokens',
    props: { lines: ['SUPERQUAK', 'MEGADUCKS'], count: 240 },
  },
]
