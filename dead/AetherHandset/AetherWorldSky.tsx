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
  brightness = 1,
  contrast = 1,
}: {
  imageUrl: string
  shift: number
  brightness?: number
  contrast?: number
}) {
  const texture = useSkyTexture(imageUrl)
  const material = useMemo(() => {
    if (!texture) return null

    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      depthWrite: false,
      toneMapped: false,
    })

    const b = Math.max(0, brightness)
    const c = Math.max(0, contrast)

    if (c !== 1) {
      mat.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <map_fragment>',
          `#include <map_fragment>
          diffuseColor.rgb = clamp((diffuseColor.rgb - 0.5) * ${c} + 0.5, 0.0, 1.0);
          diffuseColor.rgb *= ${b};`,
        )
      }
      mat.customProgramCacheKey = () => `photo-sky-${b}-${c}`
    } else if (b !== 1) {
      mat.color.setScalar(b)
    }

    return mat
  }, [texture, brightness, contrast])

  useEffect(() => () => material?.dispose(), [material])

  if (!texture || !material) return null

  return (
    <mesh
      scale={40}
      frustumCulled={false}
      renderOrder={-1}
      rotation={[0, shift * Math.PI * 2, 0]}
      material={material}
    >
      <sphereGeometry args={[1, 64, 32]} />
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
    return (
      <PhotoWorldSky
        imageUrl={skyImage}
        shift={world.shift ?? 0}
        brightness={world.skyBrightness ?? 1}
        contrast={world.skyContrast ?? 1}
      />
    )
  }

  if (world.style === 'shadowstage' || world.style === 'galaxy' || world.style === 'starvolume') {
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
