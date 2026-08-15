import * as THREE from 'three'

/** Equirectangular Mars maps — Solar System Scope color + MOLA-derived normal/displacement (MarsJS). */
export const MARS_TEXTURES = {
  color: '/textures/mars/mars-8k-color.jpg',
  normal: '/textures/mars/mars-8k-normal.png',
  displacement: '/textures/mars/mars-8k-displacement.jpg',
} as const

export const MARS_PLANET = {
  radius: 5,
  /** Sphere segments — high count for displacement detail. */
  widthSegments: 256,
  heightSegments: 256,
  /** Slight axial tilt so the lit cap reads clearly on screen. */
  tiltX: 0.42,
  tiltZ: -0.08,
  /** Radians per second — slow idle Y spin (~6 min per revolution). */
  autoSpinSpeed: 0.018,
} as const

/** Surface color grading — lower = more pastel. */
export const MARS_COLOR_GRADE = {
  saturation: 0.68,
  lighten: 0.14,
} as const

/** Warm sun tint — thin Martian atmosphere scatters red at the limb. */
export const MARS_SUN = {
  direction: new THREE.Vector3(0.22, 0.92, 0.32).normalize(),
  color: '#fff5eb',
  intensity: 3.6,
} as const

export const MARS_ATMOSPHERE = {
  scale: 1.045,
  color: new THREE.Color('#ff9a7a'),
  twilight: new THREE.Color('#5a3028'),
  power: 3.8,
  intensity: 0.42,
} as const

/** Planet diameter target — min(80vh, 80vw) on screen. */
export const MARS_SCREEN_FRACTION = 0.8

export function marsCameraDistance(
  camera: THREE.PerspectiveCamera,
  radius: number,
  viewportWidth: number,
  viewportHeight: number,
  screenFraction = MARS_SCREEN_FRACTION,
) {
  const vFov = THREE.MathUtils.degToRad(camera.fov)
  const minDim = Math.min(viewportWidth, viewportHeight)
  const targetDiameterPx = screenFraction * minDim
  const angularDiameter = (targetDiameterPx * vFov) / Math.max(viewportHeight, 1)
  return radius / Math.tan(angularDiameter / 2)
}

export function configureMarsTexture(
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

export async function loadMarsTextures() {
  const loader = new THREE.TextureLoader()
  const [color, normal, displacement] = await Promise.all([
    loader.loadAsync(MARS_TEXTURES.color),
    loader.loadAsync(MARS_TEXTURES.normal),
    loader.loadAsync(MARS_TEXTURES.displacement),
  ])

  configureMarsTexture(color, THREE.SRGBColorSpace)
  configureMarsTexture(normal, THREE.NoColorSpace)
  configureMarsTexture(displacement, THREE.NoColorSpace)

  return { color, normal, displacement }
}
