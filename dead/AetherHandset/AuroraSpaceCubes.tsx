import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AetherWorld } from './worldBackgrounds'
import { usePhoneChassisMaterial } from './phoneMaterial'

const CUBE_COUNT = 45
const NEAR_COUNT = 15
/** Keep cube centers outside the phone hull (~1.35 radius) + half cube size. */
const MIN_NEAR_RADIUS = 2.73
const MAX_NEAR_RADIUS = 4.76
const MIN_FAR_RADIUS = 5.46
const MAX_FAR_RADIUS = 9.1

/** Default orbit camera direction (phone → camera at x:-18°, y:38°, dist ~6.4). */
const INITIAL_CAM_DIR = new THREE.Vector3(0.586, -0.309, 0.748).normalize()

interface SpaceCube {
  position: THREE.Vector3
  size: number
  rotation: THREE.Euler
  spin: THREE.Vector3
  floatPhase: number
  floatAmp: number
  /** Accent palette slot for liquid-style worlds. */
  accentSlot: 0 | 1 | 2
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function randomUnit(rand: () => number, out = new THREE.Vector3()) {
  const theta = rand() * Math.PI * 2
  const z = rand() * 2 - 1
  const r = Math.sqrt(Math.max(0, 1 - z * z))
  return out.set(r * Math.cos(theta), z, r * Math.sin(theta))
}

/** Bias direction toward the initial camera hemisphere. */
function randomVisibleDirection(rand: () => number, out = new THREE.Vector3()) {
  for (let attempt = 0; attempt < 12; attempt++) {
    randomUnit(rand, out)
    if (out.dot(INITIAL_CAM_DIR) > -0.15) return out
  }
  return out.copy(INITIAL_CAM_DIR).add(
    new THREE.Vector3((rand() - 0.5) * 0.8, (rand() - 0.5) * 0.8, (rand() - 0.5) * 0.8),
  ).normalize()
}

function pickAccentSlot(rand: () => number, style: AetherWorld['style']): 0 | 1 | 2 {
  const roll = rand()
  if (style === 'liquid') {
    if (roll < 0.22) return 0
    if (roll < 0.52) return 1
    return 2
  }
  if (roll < 0.33) return 0
  if (roll < 0.66) return 1
  return 2
}

function buildSpaceCubes(world: AetherWorld): SpaceCube[] {
  const rand = seededRandom(9031 + Math.floor((world.shift ?? 0) * 1000))
  const cubes: SpaceCube[] = []

  for (let i = 0; i < NEAR_COUNT; i++) {
    const dir = randomVisibleDirection(rand)
    const radius = MIN_NEAR_RADIUS + rand() * (MAX_NEAR_RADIUS - MIN_NEAR_RADIUS)

    cubes.push({
      position: dir.multiplyScalar(radius),
      size: 0.1 + rand() * 0.22,
      rotation: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      spin: new THREE.Vector3(
        (rand() - 0.5) * 0.22,
        (rand() - 0.5) * 0.28,
        (rand() - 0.5) * 0.18,
      ),
      floatPhase: rand() * Math.PI * 2,
      floatAmp: 0.04 + rand() * 0.1,
      accentSlot: pickAccentSlot(rand, world.style),
    })
  }

  for (let i = NEAR_COUNT; i < CUBE_COUNT; i++) {
    const dir = randomUnit(rand)
    const radius = MIN_FAR_RADIUS + rand() * (MAX_FAR_RADIUS - MIN_FAR_RADIUS)

    cubes.push({
      position: dir.multiplyScalar(radius),
      size: 0.08 + rand() * 0.28,
      rotation: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      spin: new THREE.Vector3(
        (rand() - 0.5) * 0.16,
        (rand() - 0.5) * 0.2,
        (rand() - 0.5) * 0.14,
      ),
      floatPhase: rand() * Math.PI * 2,
      floatAmp: 0.06 + rand() * 0.14,
      accentSlot: pickAccentSlot(rand, world.style),
    })
  }

  return cubes
}

function useAccentShineMaterials(world: AetherWorld) {
  const accents = useMemo(
    () => [world.accentA, world.accentB, world.accentC].map((hex) => new THREE.Color(hex)),
    [world.accentA, world.accentB, world.accentC],
  )

  const materials = useMemo(
    () =>
      accents.map((color) => {
        const emissive = color.clone().multiplyScalar(0.62)
        return new THREE.MeshPhysicalMaterial({
          color,
          emissive,
          emissiveIntensity: 0.55,
          metalness: 0.58,
          roughness: 0.11,
          clearcoat: 1,
          clearcoatRoughness: 0.035,
          envMapIntensity: 1.4,
          toneMapped: false,
        })
      }),
    [accents],
  )

  useEffect(
    () => () => {
      materials.forEach((material) => material.dispose())
    },
    [materials],
  )

  return materials
}

export function WorldSpaceCubes({
  anchor,
  world,
  reduceMotion,
}: {
  anchor: readonly [number, number, number]
  world: AetherWorld
  reduceMotion: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const cubes = useMemo(() => buildSpaceCubes(world), [world])
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const chassisMaterial = usePhoneChassisMaterial()
  const accentMaterials = useAccentShineMaterials(world)
  const usePhoneSurface = world.style === 'aurora'

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state) => {
    const group = groupRef.current
    if (!group || reduceMotion) return

    const t = state.clock.elapsedTime
    group.children.forEach((child, i) => {
      const cube = cubes[i]
      if (!cube) return
      child.rotation.x = cube.rotation.x + cube.spin.x * t
      child.rotation.y = cube.rotation.y + cube.spin.y * t
      child.rotation.z = cube.rotation.z + cube.spin.z * t
      child.position.y =
        cube.position.y + Math.sin(t * 0.55 + cube.floatPhase) * cube.floatAmp
    })
  })

  return (
    <group ref={groupRef} position={anchor}>
      {cubes.map((cube, i) => (
        <mesh
          key={i}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.size}
          geometry={geometry}
          material={
            usePhoneSurface ? chassisMaterial : accentMaterials[cube.accentSlot]
          }
          renderOrder={1}
        />
      ))}
    </group>
  )
}

/** @deprecated Use WorldSpaceCubes */
export const AuroraSpaceCubes = WorldSpaceCubes
