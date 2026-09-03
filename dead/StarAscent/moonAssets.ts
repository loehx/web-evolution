import * as THREE from 'three'

/** Equirectangular Moon maps — Solar System Scope color + NASA LOLA displacement. */
export const MOON_TEXTURES = {
  color: '/textures/moon/moon-8k-color.jpg',
  normal: '/textures/moon/moon-8k-normal.png',
  displacement: '/textures/moon/moon-8k-displacement.jpg',
} as const

export const MOON_PLANET = {
  radius: 5,
  /** Sphere segments — high count for displacement detail. */
  widthSegments: 256,
  heightSegments: 256,
  /** Slight axial tilt so the lit cap reads clearly on screen. */
  tiltX: 0.35,
  tiltZ: -0.06,
  /** Radians per second — slow idle Y spin (~6 min per revolution). */
  autoSpinSpeed: 0.018,
} as const

/** Surface color grading — silvery gray, slightly softened. */
export const MOON_COLOR_GRADE = {
  saturation: 0.52,
  lighten: 0.06,
} as const

/** Overall surface brightness — 1 = full, 0.7 ≈ 30% dimmer. */
export const MOON_EXPOSURE = 0.7

/** Hard sunlight on airless regolith. */
export const MOON_SUN = {
  direction: new THREE.Vector3(0.22, 0.92, 0.32).normalize(),
  color: '#fffef8',
  intensity: 3.9,
} as const

/** Exosphere hint — the Moon has almost no atmosphere. */
export const MOON_ATMOSPHERE = {
  scale: 1.018,
  color: new THREE.Color('#8fa8c4'),
  twilight: new THREE.Color('#1e2a3a'),
  power: 4.8,
  intensity: 0.05,
} as const

/** Planet diameter target — min(80vh, 80vw) on screen. */
export const MOON_SCREEN_FRACTION = 0.8

export function moonCameraDistance(
  camera: THREE.PerspectiveCamera,
  radius: number,
  viewportWidth: number,
  viewportHeight: number,
  screenFraction = MOON_SCREEN_FRACTION,
) {
  const vFov = THREE.MathUtils.degToRad(camera.fov)
  const minDim = Math.min(viewportWidth, viewportHeight)
  const targetDiameterPx = screenFraction * minDim
  const angularDiameter = (targetDiameterPx * vFov) / Math.max(viewportHeight, 1)
  return radius / Math.tan(angularDiameter / 2)
}

export function configureMoonTexture(
  texture: THREE.Texture,
  colorSpace: THREE.ColorSpace = THREE.SRGBColorSpace,
) {
  texture.colorSpace = colorSpace
  texture.anisotropy = 8
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  return texture
}

export async function loadMoonTextures() {
  const loader = new THREE.TextureLoader()
  const [color, normal, displacement] = await Promise.all([
    loader.loadAsync(MOON_TEXTURES.color),
    loader.loadAsync(MOON_TEXTURES.normal),
    loader.loadAsync(MOON_TEXTURES.displacement),
  ])

  configureMoonTexture(color, THREE.SRGBColorSpace)
  configureMoonTexture(normal, THREE.NoColorSpace)
  configureMoonTexture(displacement, THREE.NoColorSpace)

  return { color, normal, displacement }
}
