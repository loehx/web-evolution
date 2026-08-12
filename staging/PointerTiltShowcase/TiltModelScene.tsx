import { Center, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Component, Suspense, useMemo, useRef, type ReactNode } from 'react'
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

function FallbackMesh() {
  return (
    <mesh>
      <torusKnotGeometry args={[0.55, 0.18, 128, 32]} />
      <meshStandardMaterial color="#a78bfa" metalness={0.35} roughness={0.4} />
    </mesh>
  )
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

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

function SceneContents({
  modelSrc,
  pointer,
  maxTilt = 0.55,
  reducedMotion = false,
  modelScale = 1,
}: Omit<TiltModelSceneProps, 'className'>) {
  return (
    <>
      <color attach="background" args={['#18181b']} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <pointLight position={[0, 2, 2]} intensity={0.5} />
      <Suspense fallback={<FallbackMesh />}>
        <ModelErrorBoundary fallback={<FallbackMesh />}>
          <TiltModel
            url={modelSrc}
            pointer={pointer}
            maxTilt={maxTilt}
            reducedMotion={reducedMotion}
            scale={modelScale}
          />
        </ModelErrorBoundary>
      </Suspense>
    </>
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
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0, 0.4, 2.8], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
      frameloop="always"
    >
      <SceneContents
        modelSrc={modelSrc}
        pointer={pointer}
        maxTilt={maxTilt}
        reducedMotion={reducedMotion}
        modelScale={modelScale}
      />
    </Canvas>
  )
}

useGLTF.preload('/models/duck.glb')
