import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import type { Group } from 'three'

export type PlantId =
  | 'pachira_aquatica_01'
  | 'anthurium_botany_01'
  | 'fern_02'
  | 'shrub_sorrel_01'
  | 'cheiridopsis_succulent'

export const DEFAULT_PLANT: PlantId = 'pachira_aquatica_01'

const PLANT_URLS: Record<PlantId, string> = {
  pachira_aquatica_01: '/models/plants/pachira_aquatica_01/pachira_aquatica_01_2k.gltf',
  anthurium_botany_01: '/models/plants/anthurium_botany_01/anthurium_botany_01_2k.gltf',
  fern_02: '/models/plants/fern_02/fern_02_2k.gltf',
  shrub_sorrel_01: '/models/plants/shrub_sorrel_01/shrub_sorrel_01_2k.gltf',
  cheiridopsis_succulent: '/models/plants/cheiridopsis_succulent/cheiridopsis_succulent_2k.gltf',
}

/** Camera position [x, y, z] tuned per model — Poly Haven assets are real-world meters. */
const PLANT_CAMERA: Record<PlantId, [number, number, number]> = {
  pachira_aquatica_01: [0, 1.4, 5.8],
  anthurium_botany_01: [0, 0.35, 2.6],
  fern_02: [0, 0.25, 2.3],
  shrub_sorrel_01: [0, 0.2, 2.1],
  cheiridopsis_succulent: [0, 0.12, 1.7],
}

const PLANT_FOV: Record<PlantId, number> = {
  pachira_aquatica_01: 38,
  anthurium_botany_01: 42,
  fern_02: 42,
  shrub_sorrel_01: 44,
  cheiridopsis_succulent: 44,
}

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
      <PlantPivot
        url={url}
        radians={radians}
        autoRotate={autoRotate}
        isDragging={isDragging}
      />
    </>
  )
}

export function PlantOrbitScene({
  plant = DEFAULT_PLANT,
  radians,
  autoRotate = false,
  isDragging = false,
}: PlantOrbitSceneProps) {
  const cameraPos = PLANT_CAMERA[plant]
  const fov = PLANT_FOV[plant]

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: cameraPos, fov, near: 0.05, far: 50 }}
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
