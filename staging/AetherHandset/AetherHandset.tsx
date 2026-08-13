import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit, type OrbitRotation } from '@/lib/usePointerOrbit'
import { WorldSpaceCubes } from './AuroraSpaceCubes'
import { AetherWorldSky } from './AetherWorldSky'
import { ProceduralGalaxy } from './ProceduralGalaxy'
import { ScatteredStarVolume } from './ScatteredStarVolume'
import { PHONE_CHASSIS } from './phoneMaterial'
import {
  DEFAULT_AETHER_WORLD,
  type AetherWorld,
} from './worldBackgrounds'

export type { AetherWorld, AetherWorldStyle } from './worldBackgrounds'
export { DEFAULT_AETHER_WORLD }

export interface AetherHandsetProps {
  headline: ReactNode
  /** Plain-text label for aria when headline is not a string. */
  headlineLabel?: string
  tagline?: string
  subheadline?: string
  text?: string
  screenImage?: string
  world?: AetherWorld
  /** Shadow stage: place the phone in the center of the left or right half. */
  stageSide?: 'left' | 'right'
  className?: string
}

/** iPhone 16 Pro mm → world units (height 2.55). */
const PHONE_H = 2.55
const PHONE_W = 2.55 * (71.5 / 149.6)
const PHONE_D = 2.55 * (8.25 / 149.6)
const CORNER = 2.55 * (13 / 149.6)
const GLASS_INSET = 0.008
const BEZEL = 0.02
const SCREEN_W = PHONE_W - BEZEL * 2
const SCREEN_H = PHONE_H - BEZEL * 2
const SCREEN_R = CORNER - BEZEL
const GLASS_W = PHONE_W - GLASS_INSET * 2
const GLASS_H = PHONE_H - GLASS_INSET * 2
const GLASS_R = CORNER - GLASS_INSET
const ANTHRACITE = '#2c2e32'
const POS_MOBILE = [0, 0.12, 0] as const
const POS_DESKTOP = [0, 0, 0] as const
const GROUND_GAP = 0.42
const SPOT_HEIGHT = 13.5
const SPOT_ANGLE = 0.135
const SPOT_PENUMBRA = 0.32
const SPOT_COLOR = '#fff6ea'

function phoneAnchor(layout: StageLayout, x = 0): readonly [number, number, number] {
  const y = layout === 'mobile' ? POS_MOBILE[1] : POS_DESKTOP[1]
  return [x, y, 0]
}

/** Desktop shadow stage: phone sits in the middle of the left or right 50%. */
function useStageAnchor(
  layout: StageLayout,
  stageSide: 'left' | 'right' | undefined,
): readonly [number, number, number] {
  const { size } = useThree()
  const y = layout === 'mobile' ? POS_MOBILE[1] : POS_DESKTOP[1]
  if (!stageSide || layout === 'mobile') return [0, y, 0]
  const dist = 8.1
  const halfH = dist * Math.tan(THREE.MathUtils.degToRad(16))
  const halfW = halfH * (size.width / Math.max(size.height, 1))
  const x = (stageSide === 'left' ? -0.5 : 0.5) * halfW
  return [x, y, 0]
}

const _camRight = new THREE.Vector3()
const _camUp = new THREE.Vector3()
const _camLook = new THREE.Vector3()

function roundedRectShape(width: number, height: number, radius: number) {
  const w = width / 2
  const h = height / 2
  const r = Math.min(radius, w - 0.001, h - 0.001)
  const s = new THREE.Shape()
  s.moveTo(-w + r, -h)
  s.lineTo(w - r, -h)
  s.absarc(w - r, -h + r, r, -Math.PI / 2, 0, false)
  s.lineTo(w, h - r)
  s.absarc(w - r, h - r, r, 0, Math.PI / 2, false)
  s.lineTo(-w + r, h)
  s.absarc(-w + r, h - r, r, Math.PI / 2, Math.PI, false)
  s.lineTo(-w, -h + r)
  s.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, false)
  return s
}

function stadiumShape(width: number, height: number) {
  return roundedRectShape(width, height, height / 2)
}

function shapeGeometry(shape: THREE.Shape, curveSegments = 48) {
  const geo = new THREE.ShapeGeometry(shape, curveSegments)
  geo.computeBoundingBox()
  geo.computeVertexNormals()
  const bb = geo.boundingBox
  if (bb) {
    const pos = geo.attributes.position
    const uv = new Float32Array(pos.count * 2)
    const sx = bb.max.x - bb.min.x || 1
    const sy = bb.max.y - bb.min.y || 1
    for (let i = 0; i < pos.count; i++) {
      uv[i * 2] = (pos.getX(i) - bb.min.x) / sx
      uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / sy
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  }
  return geo
}

function extrudeRounded(width: number, height: number, depth: number, radius: number, bevel = 0.01) {
  const geo = new THREE.ExtrudeGeometry(roundedRectShape(width, height, radius), {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 32,
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

type StageLayout = 'mobile' | 'desktop'

function useStageLayout(): StageLayout {
  const [layout, setLayout] = useState<StageLayout>(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 'desktop' : 'mobile',
  )

  useEffect(() => {
    const sync = () => setLayout(window.innerWidth >= 768 ? 'desktop' : 'mobile')
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return layout
}

function useNearViewport() {
  const ref = useRef<HTMLElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: '30% 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, near }
}

function applyCoverCrop(texture: THREE.Texture, aspect: number) {
  const img = texture.image as { width: number; height: number } | undefined
  if (!img?.width || !img?.height) return
  const imageAspect = img.width / img.height
  if (imageAspect > aspect) {
    const scale = aspect / imageAspect
    texture.repeat.set(scale, 1)
    texture.offset.set((1 - scale) / 2, 0)
  } else {
    const scale = imageAspect / aspect
    texture.repeat.set(1, scale)
    texture.offset.set(0, (1 - scale) / 2)
  }
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.needsUpdate = true
}

function useScreenTexture(url: string | undefined) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    if (!url) {
      setTexture(null)
      return
    }

    let alive = true
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    loader.load(
      url,
      (loaded) => {
        if (!alive) {
          loaded.dispose()
          return
        }
        loaded.colorSpace = THREE.SRGBColorSpace
        loaded.anisotropy = 4
        loaded.flipY = true
        loaded.minFilter = THREE.LinearFilter
        loaded.generateMipmaps = false
        applyCoverCrop(loaded, SCREEN_W / SCREEN_H)
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

  useEffect(() => {
    return () => {
      texture?.dispose()
    }
  }, [texture])

  return texture
}

function ShadowFloor({ anchor }: { anchor: readonly [number, number, number] }) {
  const [tx, ty, tz] = anchor
  const y = ty - PHONE_H / 2 - GROUND_GAP

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[tx, y, tz]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        color="#1a1714"
        roughness={0.98}
        metalness={0}
        envMapIntensity={0}
      />
    </mesh>
  )
}

function createShaftTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const img = ctx.createImageData(256, 512)
    for (let y = 0; y < 512; y++) {
      const v = y / 511
      const caps = Math.min(v / 0.12, 1) * Math.min((1 - v) / 0.18, 1)
      for (let x = 0; x < 256; x++) {
        const n = (x / 255 - 0.5) * 2
        const falloff = Math.exp(-n * n * 3.2)
        const a = falloff * caps * 0.42
        const i = (y * 256 + x) * 4
        img.data[i] = 255
        img.data[i + 1] = 246
        img.data[i + 2] = 234
        img.data[i + 3] = Math.round(a * 255)
      }
    }
    ctx.putImageData(img, 0, 0)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function LightBeam({
  anchor,
}: {
  anchor: readonly [number, number, number]
  reduceMotion: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [tx, ty, tz] = anchor
  const gy = ty - PHONE_H / 2 - GROUND_GAP
  const shaftTex = useMemo(() => createShaftTexture(), [])
  const width = Math.tan(SPOT_ANGLE) * SPOT_HEIGHT * 2.6
  const behindPhone = 2.05

  useEffect(() => () => shaftTex.dispose(), [shaftTex])

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    const dx = camera.position.x - tx
    const dz = camera.position.z - tz
    const len = Math.hypot(dx, dz) || 1
    group.position.set(
      tx - (dx / len) * behindPhone,
      gy + SPOT_HEIGHT / 2,
      tz - (dz / len) * behindPhone,
    )
    group.rotation.y = Math.atan2(dx, dz)
  })

  return (
    <group ref={groupRef} position={[tx, gy + SPOT_HEIGHT / 2, tz]}>
      <mesh renderOrder={0} frustumCulled={false}>
        <planeGeometry args={[width, SPOT_HEIGHT]} />
        <meshBasicMaterial
          map={shaftTex}
          color={SPOT_COLOR}
          transparent
          opacity={0.42}
          depthWrite={false}
          depthTest
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh renderOrder={0} frustumCulled={false}>
        <planeGeometry args={[width * 1.55, SPOT_HEIGHT]} />
        <meshBasicMaterial
          map={shaftTex}
          color={SPOT_COLOR}
          transparent
          opacity={0.2}
          depthWrite={false}
          depthTest
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function ShadowLight({ anchor }: { anchor: readonly [number, number, number] }) {
  const lightRef = useRef<THREE.SpotLight>(null)
  const target = useMemo(() => new THREE.Object3D(), [])
  const [tx, ty, tz] = anchor
  const gy = ty - PHONE_H / 2 - GROUND_GAP
  const lightPos: [number, number, number] = [tx, gy + SPOT_HEIGHT, tz]

  useLayoutEffect(() => {
    const light = lightRef.current
    if (!light) return
    light.target = target
    target.position.set(tx, gy, tz)
    target.updateMatrixWorld()
    light.shadow.mapSize.set(2048, 2048)
    light.shadow.bias = -0.0002
    light.shadow.normalBias = 0.028
    light.shadow.radius = 2.4
    light.shadow.blurSamples = 8
    light.shadow.camera.near = 4
    light.shadow.camera.far = SPOT_HEIGHT + 1.5
    light.shadow.camera.updateProjectionMatrix()
  }, [gy, target, tx, tz])

  return (
    <>
      <primitive object={target} />
      <spotLight
        ref={lightRef}
        position={lightPos}
        angle={SPOT_ANGLE}
        penumbra={SPOT_PENUMBRA}
        intensity={3200}
        distance={SPOT_HEIGHT + 6}
        decay={2}
        color={SPOT_COLOR}
        castShadow
      />
    </>
  )
}

function FixedCameraRig({ layout }: { layout: StageLayout }) {
  const { camera } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    camera.fov = 32
    camera.near = 0.1
    camera.far = 80
    camera.updateProjectionMatrix()
  }, [camera])

  useFrame(() => {
    const [, ty] = phoneAnchor(layout)
    const dist = layout === 'mobile' ? 7.6 : 8.1
    camera.position.set(0.18, ty + 0.58, dist)
    camera.lookAt(0, ty - 0.52, 0)
    camera.updateMatrixWorld()
  })

  return null
}

function EnvironmentSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    pmrem.compileEquirectangularShader()
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envMap

    return () => {
      scene.environment = null
      envMap.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

/** Minimal IBL so the phone reads in an otherwise black stage. */
function ShadowEnvironmentSetup() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    pmrem.compileEquirectangularShader()
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envMap
    scene.environmentIntensity = 0.12

    return () => {
      scene.environment = null
      scene.environmentIntensity = 1
      envMap.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

function OrbitInertia({
  rotationRef,
  velocityRef,
  isDragging,
  reduceMotion,
  decay,
  pitchMin = -85,
  pitchMax = 85,
}: {
  rotationRef: MutableRefObject<OrbitRotation>
  velocityRef: MutableRefObject<OrbitRotation>
  isDragging: boolean
  reduceMotion: boolean
  decay: number
  pitchMin?: number
  pitchMax?: number
}) {
  useFrame((_, delta) => {
    if (reduceMotion || isDragging) return

    let { x: vx, y: vy } = velocityRef.current
    if (Math.abs(vx) < 0.03 && Math.abs(vy) < 0.03) {
      if (vx !== 0 || vy !== 0) velocityRef.current = { x: 0, y: 0 }
      return
    }

    const nextX = THREE.MathUtils.clamp(rotationRef.current.x + vx * delta, pitchMin, pitchMax)
    const nextY = rotationRef.current.y + vy * delta

    if (nextX !== rotationRef.current.x + vx * delta) vx = 0
    rotationRef.current = { x: nextX, y: nextY }

    const damp = Math.exp(-decay * delta)
    velocityRef.current = { x: vx * damp, y: vy * damp }
  })

  return null
}

function IdleOrbitDriver({
  rotationRef,
  idleCenterRef,
  autoOrbitEnabledRef,
  isDragging,
  reduceMotion,
}: {
  rotationRef: MutableRefObject<OrbitRotation>
  idleCenterRef: MutableRefObject<OrbitRotation>
  autoOrbitEnabledRef: MutableRefObject<boolean>
  isDragging: boolean
  reduceMotion: boolean
}) {
  const phase = useRef(0)

  useFrame((_, delta) => {
    if (reduceMotion || isDragging || !autoOrbitEnabledRef.current) return

    phase.current += delta * 0.24
    const t = phase.current
    const center = idleCenterRef.current
    const pitch =
      center.x +
      Math.sin(t * 1.05) * 12 +
      Math.sin(t * 0.41 + 1.2) * 4.5
    const yaw =
      center.y +
      Math.sin(t * 0.76 + 0.4) * 18 +
      Math.cos(t * 0.58 + 2.1) * 7.5

    rotationRef.current = {
      x: THREE.MathUtils.clamp(pitch, -42, 18),
      y: THREE.MathUtils.clamp(yaw, center.y - 28, center.y + 28),
    }
  })

  return null
}

function CameraRig({
  layout,
  rotationRef,
}: {
  layout: StageLayout
  rotationRef: MutableRefObject<OrbitRotation>
}) {
  const { camera } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    camera.fov = 32
    camera.near = 0.1
    camera.far = 80
    camera.updateProjectionMatrix()
  }, [camera])

  useFrame(() => {
    const rotation = rotationRef.current
    const [tx, ty, tz] = layout === 'mobile' ? POS_MOBILE : POS_DESKTOP
    const dist = layout === 'mobile' ? 6.0 : 6.4
    const pitch = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(rotation.x, -78, 78))
    const yaw = THREE.MathUtils.degToRad(rotation.y)
    const cp = Math.cos(pitch)
    camera.position.set(
      tx + dist * Math.sin(yaw) * cp,
      ty + dist * Math.sin(pitch),
      tz + dist * Math.cos(yaw) * cp,
    )
    camera.lookAt(tx, ty, tz)
    camera.updateMatrixWorld()

    _camRight.set(1, 0, 0).applyQuaternion(camera.quaternion)
    _camUp.set(0, 1, 0).applyQuaternion(camera.quaternion)
    _camLook.set(tx, ty, tz)
    if (layout === 'mobile') {
      _camLook.addScaledVector(_camUp, -0.72)
    } else {
      _camLook.addScaledVector(_camRight, -1.15)
    }
    camera.lookAt(_camLook)
  })

  return null
}

function PhoneHandset({
  screenImage,
  layout,
  reduceMotion,
  floatRef,
  castShadow = false,
  rotationRef,
  shadowStage = false,
  anchor,
}: {
  screenImage?: string
  layout: StageLayout
  reduceMotion: boolean
  floatRef: MutableRefObject<number>
  castShadow?: boolean
  rotationRef?: MutableRefObject<OrbitRotation>
  shadowStage?: boolean
  anchor: readonly [number, number, number]
}) {
  const groupRef = useRef<THREE.Group>(null)
  const screenTex = useScreenTexture(screenImage)
  const fallbackTex = useMemo(() => {
    const canvas = createFallbackScreen()
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    tex.flipY = true
    return tex
  }, [])
  const screenTexActive = screenTex ?? fallbackTex

  useEffect(() => () => fallbackTex.dispose(), [fallbackTex])

  const geometries = useMemo(() => {
    const chassis = extrudeRounded(PHONE_W, PHONE_H, PHONE_D, CORNER, 0.006)
    const glassFront = shapeGeometry(roundedRectShape(GLASS_W, GLASS_H, GLASS_R))
    const glassBack = shapeGeometry(roundedRectShape(PHONE_W - 0.02, PHONE_H - 0.02, CORNER - 0.012))
    const screen = shapeGeometry(roundedRectShape(SCREEN_W, SCREEN_H, SCREEN_R))
    const bump = extrudeRounded(0.56, 0.56, 0.038, 0.12, 0.006)
    const island = shapeGeometry(stadiumShape(0.36, 0.092))
    return { chassis, glassFront, glassBack, screen, bump, island }
  }, [])

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose())
    }
  }, [geometries])

  useLayoutEffect(() => {
    if (!castShadow || !groupRef.current) return
    const apply = () => {
      groupRef.current?.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = false
        }
      })
    }
    apply()
    const id = requestAnimationFrame(apply)
    return () => cancelAnimationFrame(id)
  }, [castShadow, geometries])

  // Position/rotation is driven in useFrame; seed once so the first frame isn't at origin.
  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    const [px, py, pz] = anchor
    group.position.set(px, py, pz)
    if (shadowStage && rotationRef) {
      group.rotation.set(
        THREE.MathUtils.degToRad(rotationRef.current.x),
        THREE.MathUtils.degToRad(rotationRef.current.y),
        0,
      )
    }
  }, [layout, shadowStage, rotationRef, anchor])

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return

    const [px, py, pz] = anchor
    const floatY = reduceMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * (shadowStage ? 0.85 : 0.55) + floatRef.current) *
        (shadowStage ? 0.09 : 0.05)

    if (shadowStage && rotationRef) {
      const pitch = THREE.MathUtils.degToRad(
        THREE.MathUtils.clamp(rotationRef.current.x, -85, 85),
      )
      const yaw = THREE.MathUtils.degToRad(rotationRef.current.y)
      group.rotation.set(pitch, yaw, 0)
      group.position.set(px, py + floatY, pz)
      return
    }

    group.rotation.set(0, 0, 0)
    group.position.set(px, py + floatY, pz)
  })

  const envIntensity = shadowStage ? 0.7 : PHONE_CHASSIS.envMapIntensity
  const bodyMetal = shadowStage ? 0.82 : PHONE_CHASSIS.metalness

  const faceZ = PHONE_D / 2 + 0.001
  const backZ = -PHONE_D / 2 - 0.001
  const screenZ = faceZ + 0.012
  const islandY = PHONE_H / 2 - 0.175
  const bumpX = -PHONE_W / 2 + 0.36
  const bumpY = PHONE_H / 2 - 0.36
  const bumpZ = backZ - 0.02
  const sideX = PHONE_W / 2 + 0.006

  return (
    <group ref={groupRef}>
      <mesh geometry={geometries.chassis} castShadow={castShadow}>
        <meshPhysicalMaterial
          color={ANTHRACITE}
          metalness={bodyMetal}
          roughness={PHONE_CHASSIS.roughness}
          clearcoat={PHONE_CHASSIS.clearcoat}
          clearcoatRoughness={PHONE_CHASSIS.clearcoatRoughness}
          envMapIntensity={envIntensity}
        />
      </mesh>

      <mesh geometry={geometries.glassBack} position={[0, 0, backZ]} rotation={[0, Math.PI, 0]} castShadow={castShadow}>
        <meshPhysicalMaterial
          color="#26282c"
          metalness={0.5}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      <mesh geometry={geometries.bump} position={[bumpX, bumpY, bumpZ]} castShadow={castShadow}>
        <meshPhysicalMaterial
          color={ANTHRACITE}
          metalness={0.86}
          roughness={0.14}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </mesh>

      <Lens x={bumpX - 0.125} y={bumpY + 0.125} z={bumpZ - 0.026} radius={0.092} castShadow={castShadow} />
      <Lens x={bumpX + 0.125} y={bumpY + 0.125} z={bumpZ - 0.026} radius={0.08} castShadow={castShadow} />
      <Lens x={bumpX - 0.125} y={bumpY - 0.125} z={bumpZ - 0.026} radius={0.08} castShadow={castShadow} />

      <mesh position={[bumpX + 0.13, bumpY - 0.12, bumpZ - 0.018]} rotation={[Math.PI / 2, 0, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.028, 0.028, 0.004, 24]} />
        <meshStandardMaterial color="#f4f0e4" emissive="#ffe8b0" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[bumpX + 0.13, bumpY - 0.04, bumpZ - 0.016]} castShadow={castShadow}>
        <cylinderGeometry args={[0.016, 0.016, 0.01, 16]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.4} metalness={0.5} />
      </mesh>

      <mesh geometry={geometries.glassFront} position={[0, 0, faceZ]} castShadow={castShadow}>
        <meshPhysicalMaterial color="#050505" metalness={0.05} roughness={0.06} clearcoat={1} />
      </mesh>

      <mesh geometry={geometries.screen} position={[0, 0, screenZ]} renderOrder={2} castShadow={castShadow}>
        <meshBasicMaterial map={screenTexActive} toneMapped={false} />
      </mesh>

      <mesh geometry={geometries.island} position={[0, islandY, screenZ + 0.004]} castShadow={castShadow}>
        <meshStandardMaterial color="#050505" roughness={0.22} metalness={0.25} />
      </mesh>
      <mesh position={[0.09, islandY, screenZ + 0.006]} castShadow={castShadow}>
        <circleGeometry args={[0.018, 20]} />
        <meshPhysicalMaterial color="#0a1528" metalness={0.85} roughness={0.12} />
      </mesh>
      <mesh position={[-0.055, islandY, screenZ + 0.006]} castShadow={castShadow}>
        <circleGeometry args={[0.008, 12]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      <mesh position={[-sideX, PHONE_H / 2 - 0.42, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.012, 0.07, 0.038]} />
        <meshPhysicalMaterial color={ANTHRACITE} metalness={0.86} roughness={0.14} clearcoat={1} clearcoatRoughness={0.06} />
      </mesh>
      <mesh position={[-sideX, PHONE_H / 2 - 0.64, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.012, 0.14, 0.04]} />
        <meshPhysicalMaterial color={ANTHRACITE} metalness={0.86} roughness={0.14} clearcoat={1} clearcoatRoughness={0.06} />
      </mesh>
      <mesh position={[-sideX, PHONE_H / 2 - 0.84, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.012, 0.14, 0.04]} />
        <meshPhysicalMaterial color={ANTHRACITE} metalness={0.86} roughness={0.14} clearcoat={1} clearcoatRoughness={0.06} />
      </mesh>
      <mesh position={[sideX, PHONE_H / 2 - 0.66, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.012, 0.18, 0.04]} />
        <meshPhysicalMaterial color={ANTHRACITE} metalness={0.86} roughness={0.14} clearcoat={1} clearcoatRoughness={0.06} />
      </mesh>

      <mesh position={[0, -PHONE_H / 2 - 0.001, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
        <capsuleGeometry args={[0.012, 0.09, 4, 12]} />
        <meshStandardMaterial color="#0d0d10" roughness={0.35} metalness={0.65} />
      </mesh>
    </group>
  )
}

function Lens({
  x,
  y,
  z,
  radius,
  castShadow = false,
}: {
  x: number
  y: number
  z: number
  radius: number
  castShadow?: boolean
}) {
  return (
    <group position={[x, y, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[radius + 0.016, radius + 0.016, 0.012, 48]} />
        <meshPhysicalMaterial color={ANTHRACITE} metalness={0.9} roughness={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.001]} castShadow={castShadow}>
        <cylinderGeometry args={[radius + 0.004, radius + 0.004, 0.004, 48]} />
        <meshPhysicalMaterial color="#1c1e22" metalness={0.5} roughness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.004]} castShadow={castShadow}>
        <cylinderGeometry args={[radius * 0.9, radius * 0.9, 0.002, 48]} />
        <meshPhysicalMaterial
          color="#152033"
          metalness={0.15}
          roughness={0.04}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={1.8}
        />
      </mesh>
    </group>
  )
}

function createFallbackScreen(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 1100
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
  return canvas
}

function World({
  screenImage,
  rotationRef,
  velocityRef,
  inertiaDecay,
  idleCenterRef,
  autoOrbitEnabledRef,
  isDragging,
  layout,
  reduceMotion,
  floatRef,
  world,
  stageSide,
}: {
  screenImage?: string
  rotationRef: MutableRefObject<OrbitRotation>
  velocityRef: MutableRefObject<OrbitRotation>
  inertiaDecay: number
  idleCenterRef: MutableRefObject<OrbitRotation>
  autoOrbitEnabledRef: MutableRefObject<boolean>
  isDragging: boolean
  layout: StageLayout
  reduceMotion: boolean
  floatRef: MutableRefObject<number>
  world: AetherWorld
  stageSide?: 'left' | 'right'
}) {
  const isShadowStage = world.style === 'shadowstage'
  const isGalaxy = world.style === 'galaxy'
  const isStarVolume = world.style === 'starvolume'
  const isParticleVoid = isGalaxy || isStarVolume
  const anchor = useStageAnchor(layout, isShadowStage ? stageSide : undefined)

  return (
    <>
      <color attach="background" args={[world.void]} />
      {!isShadowStage ? <EnvironmentSetup /> : <ShadowEnvironmentSetup />}
      {isShadowStage ? (
        <>
          <ambientLight intensity={0.04} />
          <ShadowLight anchor={anchor} />
          <LightBeam anchor={anchor} reduceMotion={reduceMotion} />
          <ShadowFloor anchor={anchor} />
        </>
      ) : isParticleVoid ? (
        <>
          <ambientLight intensity={0.08} />
          <directionalLight position={[5, 7, 8]} intensity={1.35} color="#fff0e8" />
          <directionalLight position={[-4, 2, 5]} intensity={0.45} color="#8090c8" />
          <pointLight position={[1.2, 0.2, 3.5]} intensity={0.35} color="#c8d0ff" distance={14} />
        </>
      ) : (
        <>
          <ambientLight intensity={world.style === 'tunnel' ? 0.57 : 0.55} />
          <directionalLight position={[5, 7, 6]} intensity={2.1} color="#fff7ee" />
          <directionalLight position={[-5, 3, 4]} intensity={1.15} color="#a5f3fc" />
          <directionalLight position={[2, -2, -6]} intensity={0.85} color="#f0abfc" />
          <pointLight position={[1.4, 0.4, 3]} intensity={0.55} color="#e9d5ff" distance={14} />
          {world.style === 'tunnel' ? (
            <>
              <directionalLight position={[0, 8, 1.2]} intensity={0.62} color="#9080e8" />
              <directionalLight position={[0, -6, 1.2]} intensity={0.52} color="#7060d8" />
            </>
          ) : null}
        </>
      )}
      {!isShadowStage ? (
        <IdleOrbitDriver
          rotationRef={rotationRef}
          idleCenterRef={idleCenterRef}
          autoOrbitEnabledRef={autoOrbitEnabledRef}
          isDragging={isDragging}
          reduceMotion={reduceMotion}
        />
      ) : null}
      <OrbitInertia
        rotationRef={rotationRef}
        velocityRef={velocityRef}
        isDragging={isDragging}
        reduceMotion={reduceMotion}
        decay={inertiaDecay}
        pitchMin={isShadowStage ? -85 : -78}
        pitchMax={isShadowStage ? 85 : 78}
      />
      {isShadowStage ? (
        <FixedCameraRig layout={layout} />
      ) : (
        <CameraRig layout={layout} rotationRef={rotationRef} />
      )}
      {!isShadowStage && !isParticleVoid ? (
        <AetherWorldSky world={world} reduceMotion={reduceMotion} />
      ) : null}
      {isGalaxy ? (
        <ProceduralGalaxy anchor={anchor} world={world} reduceMotion={reduceMotion} />
      ) : null}
      {isStarVolume ? (
        <ScatteredStarVolume anchor={anchor} world={world} reduceMotion={reduceMotion} />
      ) : null}
      {world.style === 'aurora' || world.style === 'liquid' ? (
        <WorldSpaceCubes anchor={anchor} world={world} reduceMotion={reduceMotion} />
      ) : null}
      <PhoneHandset
        screenImage={screenImage}
        layout={layout}
        reduceMotion={reduceMotion}
        floatRef={floatRef}
        castShadow={isShadowStage}
        rotationRef={isShadowStage ? rotationRef : undefined}
        shadowStage={isShadowStage}
        anchor={anchor}
      />
    </>
  )
}

function CopyOverlay({
  headline,
  tagline,
  subheadline,
  text,
  reduceMotion,
  copySide = 'left',
}: {
  headline: ReactNode
  tagline?: string
  subheadline?: string
  text?: string
  reduceMotion: boolean
  copySide?: 'left' | 'right'
}) {
  const copyRight = copySide === 'right'

  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute inset-0 z-10 flex flex-col justify-end px-5 pb-6 pt-[58svh]',
        'md:justify-center md:py-0 md:pt-0',
        copyRight
          ? 'md:items-end md:pl-[52%] md:pr-10 md:text-right'
          : 'md:items-start md:pr-[52%] md:pl-10',
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : motionDuration.hero, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          'mt-0 flex max-w-[92vw] flex-col gap-2 md:max-w-[46vw] md:gap-3',
          // Mobile: capture touches on copy so the page scrolls instead of orbiting the phone.
          'max-md:pointer-events-auto max-md:touch-pan-y',
          copyRight && 'md:items-end',
        )}
      >
        <h1 className="text-[20vw] font-semibold leading-[0.85] tracking-[-0.04em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
          {headline}
        </h1>
        {tagline ? (
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80 md:text-base">
            {tagline}
          </p>
        ) : null}
        {subheadline ? (
          <p className="max-w-[36ch] text-lg font-medium leading-snug text-white/90 md:text-xl">
            {subheadline}
          </p>
        ) : null}
        {text ? (
          <p className="max-w-[42ch] text-sm leading-relaxed text-white/55 md:text-base">{text}</p>
        ) : null}
      </div>
    </motion.div>
  )
}

export function AetherHandset({
  headline,
  tagline,
  subheadline,
  text,
  screenImage,
  world = DEFAULT_AETHER_WORLD,
  stageSide,
  headlineLabel,
  className,
}: AetherHandsetProps) {
  const reduceMotion = useReducedMotion() ?? false
  const { ref, near } = useNearViewport()
  const layout = useStageLayout()
  const isShadowStage = world.style === 'shadowstage'
  const floatRef = useRef(Math.random() * Math.PI * 2)
  const idleCenterRef = useRef<OrbitRotation>({ x: -18, y: 38 })
  const autoOrbitEnabledRef = useRef(!isShadowStage)
  const copySide = isShadowStage && stageSide === 'left' ? 'right' : 'left'

  const orbit = usePointerOrbit({
    initial: isShadowStage ? { x: 0, y: 0 } : { x: -18, y: 38 },
    invertPitch: true,
    invertYaw: isShadowStage ? false : true,
    pitchScale: isShadowStage ? 1 : 0.8,
    idleCenterRef: isShadowStage ? undefined : idleCenterRef,
    inertia: true,
  })

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden text-white',
        'min-h-[100svh] md:h-[100vh] md:min-h-0',
        className,
      )}
      style={{ backgroundColor: world.void }}
      aria-label={`${headlineLabel ?? (typeof headline === 'string' ? headline : 'Aether handset')}. Drag to rotate the phone.`}
    >
      <div
        className="absolute inset-0"
        onPointerDown={(event) => {
          if (!isShadowStage) autoOrbitEnabledRef.current = false
          orbit.bind.onPointerDown(event)
        }}
        onPointerMove={orbit.bind.onPointerMove}
        onPointerUp={orbit.bind.onPointerUp}
        onPointerCancel={orbit.bind.onPointerCancel}
        style={orbit.bind.style}
      >
        {near ? (
          <motion.div
            className="h-full w-full"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : motionDuration.hero }}
          >
            <Canvas
              shadows={isShadowStage ? 'variance' : true}
              dpr={[1, 1.5]}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
                preserveDrawingBuffer: true,
              }}
              camera={{ fov: 32, near: 0.1, far: 80, position: [0, 0, 6.4] }}
              style={{ touchAction: 'none' }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.toneMappingExposure = isShadowStage ? 1.22 : 1.25
                gl.shadowMap.enabled = true
                gl.shadowMap.type = isShadowStage
                  ? THREE.VSMShadowMap
                  : THREE.PCFSoftShadowMap
              }}
            >
              <World
                screenImage={screenImage}
                rotationRef={orbit.rotationRef}
                velocityRef={orbit.velocityRef}
                inertiaDecay={orbit.inertiaDecay}
                idleCenterRef={idleCenterRef}
                autoOrbitEnabledRef={autoOrbitEnabledRef}
                isDragging={orbit.isDragging}
                layout={layout}
                reduceMotion={reduceMotion}
                floatRef={floatRef}
                world={world}
                stageSide={stageSide}
              />
            </Canvas>
          </motion.div>
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: world.void }} aria-hidden />
        )}
      </div>

      <CopyOverlay
        headline={headline}
        tagline={tagline}
        subheadline={subheadline}
        text={text}
        reduceMotion={reduceMotion}
        copySide={copySide}
      />
    </section>
  )
}
