import type { PreviewVariant } from '../../src/previews/types'
import { DEFAULT_STAR_ASCENT_SETTINGS } from './starAscentSettings'
import { GENESIS_5_STARS, STAR_BRAND_COLORS } from './starFieldGeometry'
import type { StarAscentProps } from './StarAscent'

export const starAscentVariants: PreviewVariant<StarAscentProps>[] = [
  {
    id: 1,
    label: 'Genesis drift → Mars — 600vh',
    props: {
      scrollHeight: '600vh',
      starSize: DEFAULT_STAR_ASCENT_SETTINGS.starSize,
      starCount: DEFAULT_STAR_ASCENT_SETTINGS.starCount,
      rotationSpeed: GENESIS_5_STARS.rotationSpeed,
      seed: GENESIS_5_STARS.seed,
      starLight: STAR_BRAND_COLORS.light,
      starOrange: STAR_BRAND_COLORS.orange,
      starPurple: STAR_BRAND_COLORS.purple,
      starBlue: STAR_BRAND_COLORS.blue,
    },
  },
]
