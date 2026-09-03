import { GENESIS_5_STARS, STAR_BRAND_COLORS } from './starFieldGeometry'

export type StarColorKey = 'light' | 'orange' | 'purple' | 'blue'

export type StarColorMask = Record<StarColorKey, boolean>

export type StarAscentSliderKey =
  | 'starSize'
  | 'starCount'
  | 'motionBrightness'
  | 'motionBlur'
  | 'rotationSpeed'
  | 'flightSpeed'

export type StarAscentSettings = {
  starSize: number
  starCount: number
  motionBrightness: number
  motionBlur: number
  rotationSpeed: number
  flightSpeed: number
  colors: StarColorMask
}

export const DEFAULT_STAR_COLOR_MASK: StarColorMask = {
  light: true,
  orange: true,
  purple: true,
  blue: true,
}

export const STAR_COLOR_META: {
  key: StarColorKey
  label: string
  hex: string
}[] = [
  { key: 'light', label: 'Light', hex: STAR_BRAND_COLORS.light },
  { key: 'orange', label: 'Orange', hex: STAR_BRAND_COLORS.orange },
  { key: 'purple', label: 'Purple', hex: STAR_BRAND_COLORS.purple },
  { key: 'blue', label: 'Blue', hex: STAR_BRAND_COLORS.blue },
]

export const DEFAULT_STAR_ASCENT_SETTINGS: StarAscentSettings = {
  starSize: 0.03,
  starCount: 15_000,
  motionBrightness: 3,
  motionBlur: 1,
  rotationSpeed: GENESIS_5_STARS.rotationSpeed,
  flightSpeed: 1,
  colors: DEFAULT_STAR_COLOR_MASK,
}
