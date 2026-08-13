import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AetherWorld } from './worldBackgrounds'

const COUNT = 50_000
const SPAN = 72

function createScatteredStarGeometry(
  white: THREE.Color,
  purple: THREE.Color,
  cyan: THREE.Color,
  seed: number,
) {
  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)
  const mixed = new THREE.Color()
  let state = Math.floor(seed * 1_000_000) + 1

  const rand = () => {
    state = (state * 1_664_525 + 1_013_904_223) >>> 0
    return state / 0x1_0000_0000
  }

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3
    positions[i3] = (rand() - 0.5) * SPAN * 2
    positions[i3 + 1] = (rand() - 0.5) * SPAN * 2
    positions[i3 + 2] = (rand() - 0.5) * SPAN * 2

    const tint = rand()
    if (tint < 0.34) mixed.copy(white)
    else if (tint < 0.67) mixed.copy(purple)
    else mixed.copy(cyan)

    colors[i3] = mixed.r
    colors[i3 + 1] = mixed.g
    colors[i3 + 2] = mixed.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geometry
}

export function ScatteredStarVolume({
  anchor,
  world,
  reduceMotion,
}: {
  anchor: readonly [number, number, number]
  world: AetherWorld
  reduceMotion: boolean
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const rotationSpeed = world.galaxyRotation ?? 0
  const white = useMemo(() => new THREE.Color('#eaeaea'), [])
  const purple = useMemo(() => new THREE.Color(world.accentB), [world.accentB])
  const cyan = useMemo(() => new THREE.Color(world.accentC), [world.accentC])

  const geometry = useMemo(
    () => createScatteredStarGeometry(white, purple, cyan, world.shift ?? 0),
    [white, purple, cyan, world.shift],
  )

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: world.galaxyStarSize ?? 0.04,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
      }),
    [world.galaxyStarSize],
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((_, delta) => {
    if (!pointsRef.current || reduceMotion || rotationSpeed === 0) return
    pointsRef.current.rotation.y += delta * rotationSpeed
  })

  return (
    <group position={anchor}>
      <points
        ref={pointsRef}
        geometry={geometry}
        material={material}
        renderOrder={-2}
        frustumCulled={false}
      />
    </group>
  )
}
