import { Center, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import type { Group } from 'three'

export interface PointerState {
  x: number
  y: number
}

interface ModelProps {
  url: string
  pointer: PointerState
  maxTilt: number
  reducedMotion: boolean
  scale: number
}

function TiltModel({ url, pointer, maxTilt, reducedMotion, scale }: ModelProps) {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF(url)
  const rotation = useRef({ x: 0, y: 0 })
  const clone = useMemo(() => scene.clone(true), [scene])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    const targetX = reducedMotion ? 0 : pointer.y * maxTilt
    const targetY = reducedMotion ? 0 : pointer.x * maxTilt
    const lerp = reducedMotion ? 1 : Math.min(1, delta * 10)

    rotation.current.x += (targetX - rotation.current.x) * lerp
    rotation.current.y += (targetY - rotation.current.y) * lerp

    if (reducedMotion) {
      rotation.current.y += delta * 0.25
    }

    group.rotation.x = rotation.current.x
    group.rotation.y = rotation.current.y
  })

  return (
    <Center>
      <group ref={groupRef} scale={scale}>
        <primitive object={clone} />
      </group>
    </Center>
  )
}

function SceneFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#52525b" wireframe />
    </mesh>
  )
}

export interface TiltModelSceneProps {
  modelSrc: string
  pointer: PointerState
  maxTilt?: number
  reducedMotion?: boolean
  modelScale?: number
  className?: string
}

export function TiltModelScene({
  modelSrc,
  pointer,
  maxTilt = 0.55,
  reducedMotion = false,
  modelScale = 1,
  className,
}: TiltModelSceneProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0.5, 3.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#18181b']} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />
      <Suspense fallback={<SceneFallback />}>
        <TiltModel
          url={modelSrc}
          pointer={pointer}
          maxTilt={maxTilt}
          reducedMotion={reducedMotion}
          scale={modelScale}
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/duck.glb')
useGLTF.preload('/models/avocado.glb')
