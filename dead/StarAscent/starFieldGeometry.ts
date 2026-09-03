import * as THREE from 'three'
import type { StarColorKey, StarColorMask } from './starAscentSettings'

export const STAR_COUNT = 50_000
export const STAR_SPAN = 72

/** StarAscent brand palette — stars use only these four colors. */
export const STAR_BRAND_COLORS = {
  void: '#000000',
  light: '#eaeaea',
  orange: '#ff7121',
  purple: '#c4b5fd',
  blue: '#51f2f1',
} as const

/** @deprecated Use STAR_BRAND_COLORS — kept for rotation/seed defaults. */
export const GENESIS_5_STARS = {
  ...STAR_BRAND_COLORS,
  seed: 0.24,
  starSize: 0.075,
  rotationSpeed: 0.011,
} as const

export type StarPalette = {
  light: string
  orange: string
  purple: string
  blue: string
}

function hexToSrgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16)
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ]
}

function buildEnabledColors(
  palette: StarPalette,
  mask: StarColorMask,
): [number, number, number][] {
  const entries: [StarColorKey, string][] = [
    ['light', palette.light],
    ['orange', palette.orange],
    ['purple', palette.purple],
    ['blue', palette.blue],
  ]

  const enabled = entries
    .filter(([key]) => mask[key])
    .map(([, hex]) => hexToSrgb(hex))

  return enabled.length > 0 ? enabled : entries.map(([, hex]) => hexToSrgb(hex))
}

export function createScatteredStarGeometry(
  seed: number = GENESIS_5_STARS.seed,
  palette: StarPalette = {
    light: STAR_BRAND_COLORS.light,
    orange: STAR_BRAND_COLORS.orange,
    purple: STAR_BRAND_COLORS.purple,
    blue: STAR_BRAND_COLORS.blue,
  },
  count: number = STAR_COUNT,
  colorMask: StarColorMask = {
    light: true,
    orange: true,
    purple: true,
    blue: true,
  },
) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const enabledColors = buildEnabledColors(palette, colorMask)
  let state = Math.floor(seed * 1_000_000) + 1

  const rand = () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0
    return state / 0x1_0000_0000
  }

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (rand() - 0.5) * STAR_SPAN * 2
    positions[i3 + 1] = (rand() - 0.5) * STAR_SPAN * 2
    positions[i3 + 2] = (rand() - 0.5) * STAR_SPAN * 2

    const rgb = enabledColors[Math.floor(rand() * enabledColors.length)]
    colors[i3] = rgb[0]
    colors[i3 + 1] = rgb[1]
    colors[i3 + 2] = rgb[2]
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geometry
}
