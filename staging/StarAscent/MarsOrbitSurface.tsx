import { cn } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import type { MarsTrackballVelocity } from './marsTrackball'

const MARS_ORBIT_MIN_PROGRESS = 0.68
const SENSITIVITY = 0.1125
const INERTIA_MAX_SPEED = 45
const INERTIA_DECAY = 1.4

function hitPlanetDisc(
  surface: HTMLElement,
  clientX: number,
  clientY: number,
  reveal: number,
) {
  const rect = surface.getBoundingClientRect()
  const cx = rect.left + rect.width * 0.5
  const cy = rect.top + rect.height * (0.5 - reveal * 0.04)
  const radius = Math.min(rect.width, rect.height) * (0.18 + reveal * 0.22)
  const dx = clientX - cx
  const dy = clientY - cy
  return dx * dx + dy * dy <= radius * radius
}

function clampSpeed(value: number, maxSpeed: number) {
  return Math.max(-maxSpeed, Math.min(maxSpeed, value))
}

export function useMarsTrackballInput(
  surfaceRef: RefObject<HTMLDivElement | null>,
  progressRef: RefObject<number>,
) {
  const revealRef = useRef(0)
  const orientationRef = useRef(new THREE.Quaternion())
  const pendingRef = useRef({ dx: 0, dy: 0 })
  const velocityRef = useRef<MarsTrackballVelocity>({ h: 0, v: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const last = useRef({ x: 0, y: 0, t: 0 })

  useEffect(() => {
    let frame = 0
    const tick = () => {
      const progress = progressRef.current ?? 0
      revealRef.current = Math.max(0, Math.min(1, (progress - 0.5) / 0.42))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [progressRef])

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const progress = progressRef.current ?? 0
      if (progress < MARS_ORBIT_MIN_PROGRESS) return
      const surface = surfaceRef.current
      if (!surface) return
      if (!hitPlanetDisc(surface, event.clientX, event.clientY, revealRef.current)) return

      event.currentTarget.setPointerCapture(event.pointerId)
      last.current = { x: event.clientX, y: event.clientY, t: performance.now() }
      velocityRef.current = { h: 0, v: 0 }
      setIsDragging(true)
    },
    [progressRef, surfaceRef],
  )

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return

    const dx = event.clientX - last.current.x
    const dy = event.clientY - last.current.y
    last.current.x = event.clientX
    last.current.y = event.clientY

    pendingRef.current.dx += dx
    pendingRef.current.dy += dy

    const now = performance.now()
    const dt = Math.max((now - last.current.t) / 1000, 1 / 240)
    last.current.t = now

    const hVel = (dx * SENSITIVITY) / dt
    const vVel = (dy * SENSITIVITY) / dt
    velocityRef.current = {
      h: clampSpeed(velocityRef.current.h * 0.45 + hVel * 0.55, INERTIA_MAX_SPEED),
      v: clampSpeed(velocityRef.current.v * 0.45 + vVel * 0.55, INERTIA_MAX_SPEED),
    }
  }, [])

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setIsDragging(false)
  }, [])

  const bind = {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  }

  return {
    orientationRef,
    pendingRef,
    velocityRef,
    inertiaDecay: INERTIA_DECAY,
    isDragging,
    bind,
  }
}

export function MarsOrbitSurface({
  surfaceRef,
  bind,
  isDragging,
  className,
}: {
  surfaceRef: RefObject<HTMLDivElement | null>
  bind: ReturnType<typeof useMarsTrackballInput>['bind']
  isDragging: boolean
  className?: string
}) {
  return (
    <div
      ref={surfaceRef}
      className={cn('absolute inset-0 z-[6]', className)}
      aria-hidden
      onPointerDown={bind.onPointerDown}
      onPointerMove={bind.onPointerMove}
      onPointerUp={bind.onPointerUp}
      onPointerCancel={bind.onPointerCancel}
      style={{
        touchAction: 'pan-y',
        cursor: isDragging ? 'grabbing' : 'default',
      }}
    />
  )
}
