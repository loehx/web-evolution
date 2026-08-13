import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, Center, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import type { Group } from 'three'
import { DEFAULT_PLANT, PLANT_URLS, type PlantId } from './plants'

export interface PlantOrbitSceneProps {
  plant?: PlantId
  radians: { x: number; y: number }
  autoRotate?: boolean
  isDragging?: boolean
}

function PlantMesh({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const cloned = useMemo(() => scene.clone(true), [scene])
  return <primitive object={cloned} />
}

function PlantPivot({
  url,
  radians,
  autoRotate,
  isDragging,
}: {
  url: string
  radians: { x: number; y: number }
  autoRotate: boolean
  isDragging: boolean
}) {
  const groupRef = useRef<Group>(null)
  const idleY = useRef(0)

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    group.rotation.x = radians.x
    if (autoRotate && !isDragging) {
      idleY.current += delta * 0.14
    }
    group.rotation.y = radians.y + idleY.current
  })

  return (
    <group ref={groupRef}>
      <Center>
        <PlantMesh url={url} />
      </Center>
    </group>
  )
}

function SceneContent({
  plant,
  radians,
  autoRotate,
  isDragging,
}: Required<Pick<PlantOrbitSceneProps, 'plant' | 'radians' | 'autoRotate' | 'isDragging'>>) {
  const url = PLANT_URLS[plant]

  return (
    <>
      <ambientLight intensity={0.38} color="#e8f4e8" />
      <directionalLight position={[5, 7, 4]} intensity={1.15} color="#fff8ee" />
      <directionalLight position={[-4, 3, -2]} intensity={0.42} color="#9ec4a8" />
      <directionalLight position={[0, 2, -6]} intensity={0.28} color="#d4e8d0" />
      <spotLight
        position={[2, 6, 1]}
        angle={0.45}
        penumbra={0.8}
        intensity={0.35}
        color="#fff4dc"
      />
      <Environment preset="park" environmentIntensity={0.55} />
      <Bounds fit observe clip margin={1.2}>
        <PlantPivot
          url={url}
          radians={radians}
          autoRotate={autoRotate}
          isDragging={isDragging}
        />
      </Bounds>
    </>
  )
}

export function PlantOrbitScene({
  plant = DEFAULT_PLANT,
  radians,
  autoRotate = false,
  isDragging = false,
}: PlantOrbitSceneProps) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 45, near: 0.01, far: 100 }}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <SceneContent
          plant={plant}
          radians={radians}
          autoRotate={autoRotate}
          isDragging={isDragging}
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(PLANT_URLS.pachira_aquatica_01)
