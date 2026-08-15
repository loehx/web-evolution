import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, type RefObject } from 'react'
import * as THREE from 'three'
import { CAMERA_REST_Z } from './StarAscentFlight'
import { MARS_PLANET, marsCameraDistance } from './marsAssets'

const MARS_LOOK_Y = -0.85
const MARS_CAM_Y = 0.35

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Scroll-driven camera drift from star field into the Mars approach. */
export function StarAscentScrollRig({
  progressRef,
}: {
  progressRef: RefObject<number>
}) {
  const { camera, size } = useThree()

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    camera.position.set(0, 0, CAMERA_REST_Z)
    camera.rotation.set(0, 0, 0)
    camera.updateMatrixWorld()
  }, [camera])

  useFrame(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    const progress = progressRef.current ?? 0
    const marsBlend = smoothstep(0.48, 0.86, progress)
    if (marsBlend <= 0.001) return

    const marsDistance = marsCameraDistance(
      camera,
      MARS_PLANET.radius,
      size.width || window.innerWidth,
      size.height || window.innerHeight,
    )
    camera.position.x = THREE.MathUtils.lerp(0, 0, marsBlend)
    camera.position.y = THREE.MathUtils.lerp(0, MARS_CAM_Y, marsBlend)
    camera.position.z = THREE.MathUtils.lerp(CAMERA_REST_Z, marsDistance, marsBlend)

    const lookY = THREE.MathUtils.lerp(0, MARS_LOOK_Y, marsBlend)
    camera.rotation.set(0, 0, 0)
    camera.lookAt(0, lookY, 0)
    camera.updateMatrixWorld()
  })

  return null
}

export { MARS_LOOK_Y, smoothstep }
