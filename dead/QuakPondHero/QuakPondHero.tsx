import { useCallback, useEffect, useId, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { motion, useReducedMotion } from 'motion/react'
import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { cn } from '@/lib/utils'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit, type OrbitRotation } from '@/lib/usePointerOrbit'

export interface QuakPondHeroProps {
  /** Two (or more) SVG lines. Default: QUAK / QUAK */
  lines?: string[]
  /** Requested flock size; capped on smaller viewports. */
  count?: number
  className?: string
}

const DEG = Math.PI / 180
const GRAVITY = 22
const LAWN_RADIUS = 12
const DEFAULT_LINES = ['QUAK', 'QUAK'] as const
const DEFAULT_COUNT = 240

const YELLOW = new THREE.Color('#f4c43a')
const ORANGE = new THREE.Color('#ef7c16')
const WING = new THREE.Color('#e8b22c')
const EYE = new THREE.Color('#1a1208')

type DuckState = 'idle' | 'held' | 'falling'

interface DuckSim {
  x: number
  y: number
  z: number
  vx: number
  vz: number
  vy: number
  yaw: number
  scale: number
  phase: number
  bobSpeed: number
  state: DuckState
}

function colorize(geometry: THREE.BufferGeometry, color: THREE.Color) {
  const n = geometry.attributes.position.count
  const colors = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  return geometry
}

function createDuckGeometry() {
  const body = new THREE.SphereGeometry(0.42, 12, 10)
  body.scale(1.22, 0.78, 1.05)
  body.translate(0, 0.34, 0)
  colorize(body, YELLOW)

  const head = new THREE.SphereGeometry(0.26, 12, 10)
  head.translate(0.1, 0.7, 0.22)
  colorize(head, YELLOW)

  const tail = new THREE.SphereGeometry(0.16, 8, 6)
  tail.scale(0.75, 0.45, 1.15)
  tail.translate(-0.4, 0.44, 0)
  colorize(tail, YELLOW)

  const wingL = new THREE.SphereGeometry(0.16, 8, 6)
  wingL.scale(0.55, 0.28, 0.85)
  wingL.translate(0.02, 0.36, 0.38)
  colorize(wingL, WING)

  const wingR = wingL.clone()
  wingR.translate(0, 0, -0.76)
  colorize(wingR, WING)

  const beak = new THREE.ConeGeometry(0.1, 0.24, 7)
  beak.rotateX(Math.PI / 2)
  beak.translate(0.12, 0.64, 0.48)
  colorize(beak, ORANGE)

  const eyeL = new THREE.SphereGeometry(0.045, 6, 5)
  eyeL.translate(0.2, 0.78, 0.38)
  colorize(eyeL, EYE)

  const eyeR = new THREE.SphereGeometry(0.045, 6, 5)
  eyeR.translate(0.02, 0.78, 0.4)
  colorize(eyeR, EYE)

  const merged = mergeGeometries(
    [body, head, tail, wingL, wingR, beak, eyeL, eyeR],
    false,
  )
  body.dispose()
  head.dispose()
  tail.dispose()
  wingL.dispose()
  wingR.dispose()
  beak.dispose()
  eyeL.dispose()
  eyeR.dispose()
  if (!merged) {
    throw new Error('Duck geometry merge failed')
  }
  merged.computeVertexNormals()
  return merged
}

function seedDucks(count: number, radius: number): DuckSim[] {
  const ducks: DuckSim[] = []
  for (let i = 0; i < count; i++) {
    const t = (i + 0.37) * 2.399963
    const r = Math.sqrt((i + 0.5) / count) * radius * 0.92
    ducks.push({
      x: Math.cos(t) * r,
      y: 0,
      z: Math.sin(t) * r,
      vx: 0,
      vz: 0,
      vy: 0,
      yaw: t + 0.4,
      scale: 0.38 + ((i * 17) % 100) / 100 * 0.55,
      phase: i * 0.618,
      bobSpeed: 1.6 + ((i * 13) % 10) / 10,
      state: 'idle',
    })
  }
  return ducks
}

function flockCountForViewport(requested: number) {
  if (typeof window === 'undefined') return requested
  const w = window.innerWidth
  if (w < 768) return Math.min(requested, 96)
  if (w < 1024) return Math.min(requested, 160)
  return requested
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

function QuakStamp({ lines }: { lines: string[] }) {
  const visible = lines.filter((line) => line.length > 0)
  if (visible.length === 0) return null

  const lineHeight = 100 / visible.length
  const fontSize = Math.min(42, lineHeight * 0.78)

  return (
    <h1 className="pointer-events-none absolute inset-0 z-10 grid place-items-center text-black">
      <span className="sr-only">{visible.join(' ')}</span>
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="block overflow-visible"
        style={{
          width: 'min(100vw, 100svh)',
          height: 'min(100vw, 100svh)',
        }}
      >
        {visible.map((line, index) => (
          <text
            key={`${line}-${index}`}
            x="50"
            y={lineHeight * index + lineHeight * 0.72}
            textAnchor="middle"
            fill="currentColor"
            fontSize={fontSize}
            fontWeight={900}
            fontFamily="var(--font-sans, Inter, ui-sans-serif, system-ui, sans-serif)"
            letterSpacing="-0.08em"
          >
            {line}
          </text>
        ))}
      </svg>
    </h1>
  )
}

const cameraOffset = new THREE.Vector3()
const cameraSpherical = new THREE.Spherical()

function CameraRig({ rotation }: { rotation: OrbitRotation }) {
  const { camera } = useThree()

  useFrame(() => {
    cameraSpherical.set(
      22,
      THREE.MathUtils.degToRad(THREE.MathUtils.clamp(80 - rotation.x, 68, 88)),
      rotation.y * DEG,
    )
    cameraOffset.setFromSpherical(cameraSpherical)
    camera.position.set(cameraOffset.x, cameraOffset.y + 7.5, cameraOffset.z)
    camera.lookAt(0, 1.4, 0)
  })

  return null
}

function Lawn() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[280, 280]} />
      <meshLambertMaterial color="#4db33a" side={THREE.DoubleSide} />
    </mesh>
  )
}

const CLOUD_BLOBS = [
  { cx: 180, cy: 90, rx: 140, ry: 48 },
  { cx: 280, cy: 108, rx: 110, ry: 40 },
  { cx: 90, cy: 118, rx: 90, ry: 34 },
  { cx: 620, cy: 70, rx: 170, ry: 52 },
  { cx: 760, cy: 92, rx: 130, ry: 44 },
  { cx: 540, cy: 105, rx: 80, ry: 30 },
  { cx: 980, cy: 80, rx: 150, ry: 46 },
  { cx: 1100, cy: 110, rx: 100, ry: 36 },
  { cx: 400, cy: 160, rx: 120, ry: 38 },
] as const

function SkyWash({ reduceMotion }: { reduceMotion: boolean }) {
  const blurId = useId().replace(/:/g, '')

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#6ebfff] via-[#93d2ff] to-[#c8e9ff]" />
      <motion.svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        initial={false}
        animate={reduceMotion ? { x: 0 } : { x: ['0%', '3%', '0%', '-2%', '0%'] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 48, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <defs>
          <filter id={blurId} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>
        <g filter={`url(#${blurId})`} fill="#ffffff" opacity={0.78}>
          {CLOUD_BLOBS.map((blob) => (
            <ellipse key={`${blob.cx}-${blob.cy}`} cx={blob.cx} cy={blob.cy} rx={blob.rx} ry={blob.ry} />
          ))}
        </g>
      </motion.svg>
    </div>
  )
}

function DuckFlock({
  count,
  reduceMotion,
  stealOrbit,
}: {
  count: number
  reduceMotion: boolean
  stealOrbit: MutableRefObject<boolean>
}) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const ducks = useRef<DuckSim[]>([])
  const held = useRef<number | null>(null)
  const geometry = useMemo(() => createDuckGeometry(), [])
  const dummy = duckDummy
  const liftPlane = duckLiftPlane
  const hit = duckHit

  useEffect(() => {
    ducks.current = seedDucks(count, LAWN_RADIUS)
    return () => {
      stealOrbit.current = false
      held.current = null
    }
  }, [count, stealOrbit])

  useEffect(() => {
    const drop = () => {
      const id = held.current
      if (id == null) return
      const duck = ducks.current[id]
      if (duck) {
        duck.state = 'falling'
        duck.vy = 0.4
      }
      held.current = null
      stealOrbit.current = false
    }
    window.addEventListener('pointerup', drop)
    window.addEventListener('pointercancel', drop)
    return () => {
      window.removeEventListener('pointerup', drop)
      window.removeEventListener('pointercancel', drop)
    }
  }, [stealOrbit])

  useFrame((state, dt) => {
    const inst = mesh.current
    if (!inst || ducks.current.length === 0) return
    const t = state.clock.elapsedTime
    const step = Math.min(dt, 0.033)
    const { camera, pointer, raycaster } = state

    if (held.current != null) {
      const duck = ducks.current[held.current]
      const lift = THREE.MathUtils.mapLinear(pointer.y, -1, 1, 0.55, 6.2)
      liftPlane.constant = -lift
      raycaster.setFromCamera(pointer, camera)
      if (raycaster.ray.intersectPlane(liftPlane, hit)) {
        duck.x = hit.x
        duck.z = hit.z
        duck.y = lift
        duck.vy = 0
      }
    }

    for (let i = 0; i < ducks.current.length; i++) {
      const duck = ducks.current[i]
      if (duck.state === 'idle') {
        if (!reduceMotion) {
          duck.yaw += Math.sin(t * 0.9 + duck.phase) * 0.55 * step
          duck.x += Math.cos(duck.yaw) * 0.35 * duck.scale * step
          duck.z += Math.sin(duck.yaw) * 0.35 * duck.scale * step
        }
        const r = Math.hypot(duck.x, duck.z)
        if (r > LAWN_RADIUS) {
          duck.x *= LAWN_RADIUS / r
          duck.z *= LAWN_RADIUS / r
          duck.yaw += 2.1
        }
        duck.y = reduceMotion ? 0 : Math.sin(t * duck.bobSpeed + duck.phase) * 0.07 * duck.scale
      } else if (duck.state === 'falling') {
        duck.vy -= GRAVITY * step
        duck.y += duck.vy * step
        if (duck.y <= 0) {
          duck.y = 0
          duck.vy = 0
          duck.state = 'idle'
        }
      }

      dummy.position.set(duck.x, duck.y, duck.z)
      dummy.rotation.set(0, duck.yaw, duck.state === 'held' ? 0.12 : 0)
      dummy.scale.setScalar(duck.scale)
      dummy.updateMatrix()
      inst.setMatrixAt(i, dummy.matrix)
    }
    inst.instanceMatrix.needsUpdate = true
  })

  const onPointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const id = event.instanceId
      if (id == null) return
      event.stopPropagation()
      event.nativeEvent.stopPropagation()
      const duck = ducks.current[id]
      if (!duck) return
      duck.state = 'held'
      duck.vy = 0
      held.current = id
      stealOrbit.current = true
    },
    [stealOrbit],
  )

  return (
    <instancedMesh
      key={count}
      ref={mesh}
      args={[geometry, undefined, count]}
      onPointerDown={onPointerDown}
      frustumCulled={false}
    >
      <meshStandardMaterial vertexColors roughness={0.45} metalness={0.04} />
    </instancedMesh>
  )
}
const duckDummy = new THREE.Object3D()
const duckLiftPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2)
const duckHit = new THREE.Vector3()

function World({
  rotation,
  count,
  reduceMotion,
  stealOrbit,
}: {
  rotation: OrbitRotation
  count: number
  reduceMotion: boolean
  stealOrbit: MutableRefObject<boolean>
}) {
  return (
    <>
      <hemisphereLight args={['#e7f6ff', '#3d7a2e', 0.9]} />
      <directionalLight position={[10, 18, 8]} intensity={1.15} color="#fff6d6" />
      <CameraRig rotation={rotation} />
      <Lawn />
      <DuckFlock count={count} reduceMotion={reduceMotion} stealOrbit={stealOrbit} />
    </>
  )
}

export function QuakPondHero({
  lines = [...DEFAULT_LINES],
  count = DEFAULT_COUNT,
  className,
}: QuakPondHeroProps) {
  const reduceMotion = useReducedMotion() ?? false
  const { ref, near } = useNearViewport()
  const stealOrbit = useRef(false)
  const [flock, setFlock] = useState(() => flockCountForViewport(count))

  useEffect(() => {
    const sync = () => setFlock(flockCountForViewport(count))
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [count])

  const orbit = usePointerOrbit({
    initial: { x: 0, y: 18 },
    shouldStart: () => !stealOrbit.current,
  })

  return (
    <section
      ref={ref}
      className={cn('relative min-h-[100svh] w-full overflow-hidden bg-[#93d2ff]', className)}
      aria-label="Lawn of rubber ducks under a QUAK headline. Pick a duck, then release to drop it."
    >
      <div
        className="absolute inset-0 min-h-[100svh] w-full"
        {...orbit.bind}
        style={orbit.bind.style}
      >
        <SkyWash reduceMotion={reduceMotion} />
        {near ? (
          <Canvas
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            camera={{ fov: 36, near: 0.1, far: 160, position: [0, 10, 22] }}
            className="absolute inset-0"
            style={{ touchAction: 'none', background: 'transparent' }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0)
            }}
          >
            <World
              rotation={orbit.rotation}
              count={flock}
              reduceMotion={reduceMotion}
              stealOrbit={stealOrbit}
            />
          </Canvas>
        ) : null}
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : motionDuration.hero }}
      >
        <QuakStamp lines={lines} />
      </motion.div>
    </section>
  )
}
