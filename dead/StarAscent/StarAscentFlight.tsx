import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'

export const CAMERA_REST_Z = 18
export const CAMERA_MIN_Z = 2.5

const MAX_FORWARD = 22
export const STEER_SHIFT = 16
const ACCEL_TAU = 1.15
const DECEL_TAU = 0.6
const STEER_TAU = 0.1

export type StarAscentFlightInput = {
  active: boolean
  steerX: number
  steerY: number
}

export type StarAscentFlightMetrics = {
  speed: number
  active: boolean
  steerX: number
  steerY: number
}

export function StarAscentFlightRig({
  inputRef,
  metricsRef,
  progressRef,
  flightSpeed,
  reduceMotion,
}: {
  inputRef: RefObject<StarAscentFlightInput>
  metricsRef: RefObject<StarAscentFlightMetrics>
  progressRef: RefObject<number>
  flightSpeed: number
  reduceMotion: boolean
}) {
  const { camera } = useThree()
  const forwardVel = useRef(0)
  const smoothSteerX = useRef(0)
  const smoothSteerY = useRef(0)

  useEffect(() => {
    camera.position.set(0, 0, CAMERA_REST_Z)
    camera.rotation.set(0, 0, 0)
    camera.updateMatrixWorld()
  }, [camera])

  useFrame((_, delta) => {
    const input = inputRef.current
    const metrics = metricsRef.current
    if (!input || !metrics) return

    const moonPhase = (progressRef.current ?? 0) > 0.46

    if (reduceMotion || moonPhase) {
      forwardVel.current = 0
      smoothSteerX.current = 0
      smoothSteerY.current = 0
      metrics.speed = 0
      metrics.active = false
      metrics.steerX = 0
      metrics.steerY = 0
      return
    }

    const active = input.active
    const maxForward = MAX_FORWARD * flightSpeed
    const targetForward = active ? maxForward : 0
    const tau = active ? ACCEL_TAU : DECEL_TAU
    forwardVel.current +=
      (targetForward - forwardVel.current) * (1 - Math.exp(-delta / tau))

    smoothSteerX.current +=
      (input.steerX - smoothSteerX.current) * (1 - Math.exp(-delta / STEER_TAU))
    smoothSteerY.current +=
      (input.steerY - smoothSteerY.current) * (1 - Math.exp(-delta / STEER_TAU))

    metrics.steerX = smoothSteerX.current
    metrics.steerY = smoothSteerY.current

    const speed = forwardVel.current
    const moving = speed > 0.04 || active

    if (!moving) {
      metrics.speed = 0
      metrics.active = false
      return
    }

    camera.position.z -= speed * delta

    if (camera.position.z < CAMERA_MIN_Z) {
      camera.position.z = CAMERA_MIN_Z
    }

    camera.rotation.set(0, 0, 0)
    camera.updateMatrixWorld()

    metrics.speed = speed
    metrics.active = true
  })

  return null
}

function steerFromClient(
  surface: HTMLElement,
  clientX: number,
  clientY: number,
): { steerX: number; steerY: number } {
  const rect = surface.getBoundingClientRect()
  const steerX = THREE.MathUtils.clamp(
    (clientX - (rect.left + rect.width * 0.5)) / (rect.width * 0.5),
    -1,
    1,
  )
  const steerY = THREE.MathUtils.clamp(
    (clientY - (rect.top + rect.height * 0.5)) / (rect.height * 0.5),
    -1,
    1,
  )
  return { steerX, steerY }
}

export function useStarAscentFlightInput(
  surfaceRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<number>,
) {
  const inputRef = useRef<StarAscentFlightInput>({
    active: false,
    steerX: 0,
    steerY: 0,
  })
  const metricsRef = useRef<StarAscentFlightMetrics>({
    speed: 0,
    active: false,
    steerX: 0,
    steerY: 0,
  })

  useEffect(() => {
    const surface = surfaceRef.current
    if (!surface) return

    const endFlight = (event: PointerEvent) => {
      inputRef.current.active = false
      inputRef.current.steerX = 0
      inputRef.current.steerY = 0
      if (surface.hasPointerCapture(event.pointerId)) {
        surface.releasePointerCapture(event.pointerId)
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      if ((progressRef.current ?? 0) > 0.46) return

      inputRef.current.active = true
      const steer = steerFromClient(surface, event.clientX, event.clientY)
      inputRef.current.steerX = steer.steerX
      inputRef.current.steerY = steer.steerY
      surface.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!inputRef.current.active) return

      const steer = steerFromClient(surface, event.clientX, event.clientY)
      inputRef.current.steerX = steer.steerX
      inputRef.current.steerY = steer.steerY
      event.preventDefault()
    }

    surface.addEventListener('pointerdown', onPointerDown)
    surface.addEventListener('pointermove', onPointerMove)
    surface.addEventListener('pointerup', endFlight)
    surface.addEventListener('pointercancel', endFlight)
    surface.addEventListener('lostpointercapture', endFlight)

    return () => {
      surface.removeEventListener('pointerdown', onPointerDown)
      surface.removeEventListener('pointermove', onPointerMove)
      surface.removeEventListener('pointerup', endFlight)
      surface.removeEventListener('pointercancel', endFlight)
      surface.removeEventListener('lostpointercapture', endFlight)
    }
  }, [surfaceRef, progressRef])

  return { inputRef, metricsRef }
}

export function StarAscentFlightSurface({
  surfaceRef,
  className,
}: {
  surfaceRef: RefObject<HTMLDivElement | null>
  className?: string
}) {
  return (
    <div
      ref={surfaceRef}
      className={className}
      aria-hidden
      style={{ touchAction: 'none' }}
    />
  )
}
