import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AetherWorld } from './worldBackgrounds'

interface GalaxyConfig {
  count: number
  radius: number
  arms: number
  tightness: number
  randomness: number
  randomnessPower: number
  starSize: number
  rotationSpeed: number
}

const DEFAULT_GALAXY: GalaxyConfig = {
  count: 50_000,
  radius: 15,
  arms: 4,
  tightness: 1.2,
  randomness: 0.45,
  randomnessPower: 2.8,
  starSize: 0.012,
  rotationSpeed: 0.06,
}

function resolveGalaxyConfig(world: AetherWorld): GalaxyConfig {
  return {
    count: world.galaxyCount ?? DEFAULT_GALAXY.count,
    radius: world.galaxyRadius ?? DEFAULT_GALAXY.radius,
    arms: world.galaxyArms ?? DEFAULT_GALAXY.arms,
    tightness: world.galaxyTightness ?? DEFAULT_GALAXY.tightness,
    randomness: world.galaxyRandomness ?? DEFAULT_GALAXY.randomness,
    randomnessPower: world.galaxyRandomnessPower ?? DEFAULT_GALAXY.randomnessPower,
    starSize: world.galaxyStarSize ?? DEFAULT_GALAXY.starSize,
    rotationSpeed: world.galaxyRotation ?? DEFAULT_GALAXY.rotationSpeed,
  }
}

function createGalaxyGeometry(
  colorInside: THREE.Color,
  colorOutside: THREE.Color,
  colorAccent: THREE.Color,
  colorLight: THREE.Color | null,
  config: GalaxyConfig,
  usePalette: boolean,
) {
  const { count, radius, arms, tightness, randomness, randomnessPower } = config
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const mixed = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const armRadius = Math.random() * radius
    const spinAngle = armRadius * tightness
    const branchAngle = ((i % arms) / arms) * Math.PI * 2

    const armX = Math.cos(branchAngle + spinAngle) * armRadius
    const armZ = Math.sin(branchAngle + spinAngle) * armRadius

    const rand = (sign: number) =>
      Math.pow(Math.random(), randomnessPower) * sign * randomness * armRadius

    positions[i3] = armX + rand(Math.random() < 0.5 ? 1 : -1)
    positions[i3 + 1] = rand(Math.random() < 0.5 ? 1 : -1)
    positions[i3 + 2] = armZ + rand(Math.random() < 0.5 ? 1 : -1)

    if (usePalette && colorLight) {
      const tint = Math.random()
      if (tint < 0.25) mixed.copy(colorLight)
      else if (tint < 0.5) mixed.copy(colorInside)
      else if (tint < 0.75) mixed.copy(colorOutside)
      else mixed.copy(colorAccent)
    } else if (usePalette) {
      const tint = Math.random()
      if (tint < 0.34) mixed.copy(colorInside)
      else if (tint < 0.67) mixed.copy(colorOutside)
      else mixed.copy(colorAccent)
    } else {
      mixed.copy(colorInside).lerp(colorOutside, armRadius / radius)
    }

    colors[i3] = mixed.r
    colors[i3 + 1] = mixed.g
    colors[i3 + 2] = mixed.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geometry
}

export function ProceduralGalaxy({
  anchor,
  world,
  reduceMotion,
}: {
  anchor: readonly [number, number, number]
  world: AetherWorld
  reduceMotion: boolean
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const config = useMemo(() => resolveGalaxyConfig(world), [world])
  const colorInside = useMemo(() => new THREE.Color(world.accentA), [world.accentA])
  const colorOutside = useMemo(() => new THREE.Color(world.accentB), [world.accentB])
  const colorAccent = useMemo(() => new THREE.Color(world.accentC), [world.accentC])
  const colorLight = useMemo(
    () => (world.galaxyStarLight ? new THREE.Color(world.galaxyStarLight) : null),
    [world.galaxyStarLight],
  )
  const usePalette = world.galaxyStarPalette ?? false

  const geometry = useMemo(
    () =>
      createGalaxyGeometry(
        colorInside,
        colorOutside,
        colorAccent,
        colorLight,
        config,
        usePalette,
      ),
    [colorInside, colorOutside, colorAccent, colorLight, config, usePalette],
  )

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: config.starSize,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
      }),
    [config.starSize],
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((_, delta) => {
    if (!pointsRef.current || reduceMotion) return
    pointsRef.current.rotation.y += delta * config.rotationSpeed
  })

  return (
    <group position={anchor}>
      <points
        ref={pointsRef}
        geometry={geometry}
        material={material}
        position={[0, -0.15, -16]}
        rotation={[0.42, (world.shift ?? 0) * Math.PI * 2, 0.08]}
        renderOrder={-2}
        frustumCulled={false}
      />
    </group>
  )
}
