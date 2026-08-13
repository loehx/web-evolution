import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  DEFAULT_MILKY_WAY_SKY,
  SKY_FRAG,
  SKY_VERT,
  WORLD_STYLE_INDEX,
  type AetherWorld,
} from './worldBackgrounds'

function useSkyTexture(url: string | undefined) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    if (!url) {
      setTexture(null)
      return
    }

    let alive = true
    const loader = new THREE.TextureLoader()
    loader.load(
      url,
      (loaded) => {
        if (!alive) {
          loaded.dispose()
          return
        }
        loaded.colorSpace = THREE.SRGBColorSpace
        loaded.anisotropy = 8
        loaded.flipY = true
        loaded.minFilter = THREE.LinearFilter
        loaded.magFilter = THREE.LinearFilter
        loaded.generateMipmaps = false
        setTexture(loaded)
      },
      undefined,
      () => {
        if (alive) setTexture(null)
      },
    )

    return () => {
      alive = false
    }
  }, [url])

  useEffect(() => () => texture?.dispose(), [texture])

  return texture
}

function PhotoWorldSky({
  imageUrl,
  shift,
}: {
  imageUrl: string
  shift: number
}) {
  const texture = useSkyTexture(imageUrl)

  if (!texture) return null

  return (
    <mesh
      scale={40}
      frustumCulled={false}
      renderOrder={-1}
      rotation={[0, shift * Math.PI * 2, 0]}
    >
      <sphereGeometry args={[1, 64, 32]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

export function AetherWorldSky({
  world,
  reduceMotion,
}: {
  world: AetherWorld
  reduceMotion: boolean
}) {
  const skyImage =
    world.skyImage ?? (world.style === 'milkyway' ? DEFAULT_MILKY_WAY_SKY : undefined)

  if (skyImage) {
    return <PhotoWorldSky imageUrl={skyImage} shift={world.shift ?? 0} />
  }

  if (world.style === 'shadowstage') {
    return null
  }

  return <ShaderWorldSky world={world} reduceMotion={reduceMotion} />
}

function ShaderWorldSky({
  world,
  reduceMotion,
}: {
  world: AetherWorld
  reduceMotion: boolean
}) {
  const timeRef = useRef(0)

  const uniforms = useMemo(
    () => ({
      uStyle: { value: WORLD_STYLE_INDEX[world.style] },
      uTime: { value: 0 },
      uVoid: { value: new THREE.Color(world.void) },
      uA: { value: new THREE.Color(world.accentA) },
      uB: { value: new THREE.Color(world.accentB) },
      uC: { value: new THREE.Color(world.accentC) },
      uGrid: { value: new THREE.Color(world.grid ?? world.accentA) },
      uGridScale: {
        value: new THREE.Vector2(world.gridCols ?? 44, world.gridRows ?? 26),
      },
      uShift: { value: world.shift ?? 0 },
      uLineWidth: { value: world.gridWeight ?? 0.028 },
      uGridStrength: { value: world.gridStrength ?? 0.58 },
    }),
    [world],
  )

  useFrame((_, delta) => {
    if (reduceMotion) return
    timeRef.current += delta
    uniforms.uTime.value = timeRef.current
  })

  return (
    <mesh scale={40} frustumCulled={false} renderOrder={-1}>
      <sphereGeometry args={[1, 48, 32]} />
      <shaderMaterial
        vertexShader={SKY_VERT}
        fragmentShader={SKY_FRAG}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}
