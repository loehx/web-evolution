import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/** iPhone 16 Pro chassis — shared by handset body and aurora cubes. */
export const PHONE_CHASSIS = {
  color: '#2c2e32',
  metalness: 0.86,
  roughness: 0.14,
  clearcoat: 1,
  clearcoatRoughness: 0.06,
  envMapIntensity: 1.25,
} as const

export function usePhoneChassisMaterial(envMapIntensity = PHONE_CHASSIS.envMapIntensity) {
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: PHONE_CHASSIS.color,
        metalness: PHONE_CHASSIS.metalness,
        roughness: PHONE_CHASSIS.roughness,
        clearcoat: PHONE_CHASSIS.clearcoat,
        clearcoatRoughness: PHONE_CHASSIS.clearcoatRoughness,
        envMapIntensity,
      }),
    [envMapIntensity],
  )

  useEffect(() => () => material.dispose(), [material])

  return material
}
