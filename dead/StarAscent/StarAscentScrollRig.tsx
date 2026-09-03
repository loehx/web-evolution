import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, type RefObject } from 'react'
import * as THREE from 'three'
import { CAMERA_REST_Z } from './StarAscentFlight'
import { MOON_PLANET, moonCameraDistance } from './moonAssets'

const MOON_LOOK_Y = -0.85
const MOON_CAM_Y = 0.35

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Scroll-driven camera drift from star field into the Moon approach. */
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
    const moonBlend = smoothstep(0.48, 0.86, progress)
    if (moonBlend <= 0.001) return

    const moonDistance = moonCameraDistance(
      camera,
      MOON_PLANET.radius,
      size.width || window.innerWidth,
      size.height || window.innerHeight,
    )
    camera.position.x = THREE.MathUtils.lerp(0, 0, moonBlend)
    camera.position.y = THREE.MathUtils.lerp(0, MOON_CAM_Y, moonBlend)
    camera.position.z = THREE.MathUtils.lerp(CAMERA_REST_Z, moonDistance, moonBlend)

    const lookY = THREE.MathUtils.lerp(0, MOON_LOOK_Y, moonBlend)
    camera.rotation.set(0, 0, 0)
    camera.lookAt(0, lookY, 0)
    camera.updateMatrixWorld()
  })

  return null
}

export { MOON_LOOK_Y, smoothstep }
