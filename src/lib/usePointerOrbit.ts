import { useCallback, useRef, useState, type MutableRefObject, type PointerEvent as ReactPointerEvent } from 'react'

export interface OrbitRotation {
  /** Pitch in degrees (pointer move on Y). */
  x: number
  /** Yaw in degrees (pointer move on X). */
  y: number
}

export interface UsePointerOrbitOptions {
  /** Degrees per pixel. */
  sensitivity?: number
  initial?: OrbitRotation
  /** Return false to skip capture (e.g. a duck steal the pointer). */
  shouldStart?: (event: ReactPointerEvent<HTMLElement>) => boolean
  /** Invert pitch so dragging up/down matches grab-the-object feel. */
  invertPitch?: boolean
  /** Invert yaw so dragging left/right matches grab-the-object feel. */
  invertYaw?: boolean
  /** Multiplier on vertical (pitch) drag. 1 = same as yaw. */
  pitchScale?: number
  /** Updated when a drag ends — use as the idle orbit anchor. */
  idleCenterRef?: MutableRefObject<OrbitRotation>
}

const DEFAULT_SENSITIVITY = 0.45

/**
 * Click/tap, hold, and drag to orbit a 3D object on X and Y.
 * Works with mouse and touch via pointer events.
 */
export function usePointerOrbit(options: UsePointerOrbitOptions = {}) {
  const sensitivity = options.sensitivity ?? DEFAULT_SENSITIVITY
  const shouldStart = options.shouldStart
  const invertPitch = options.invertPitch ?? false
  const invertYaw = options.invertYaw ?? false
  const pitchScale = options.pitchScale ?? 1
  const idleCenterRef = options.idleCenterRef
  const initial = options.initial ?? { x: 0, y: 0 }
  const rotationRef = useRef<OrbitRotation>(initial)
  const [rotation, setRotation] = useState<OrbitRotation>(() => ({ ...initial }))
  const [isDragging, setIsDragging] = useState(false)
  const last = useRef({ x: 0, y: 0 })

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (shouldStart && !shouldStart(event)) return
    event.currentTarget.setPointerCapture(event.pointerId)
    last.current = { x: event.clientX, y: event.clientY }
    const current = { ...rotationRef.current }
    setRotation(current)
    setIsDragging(true)
  }, [shouldStart])

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return

      const dx = event.clientX - last.current.x
      const dy = event.clientY - last.current.y
      last.current = { x: event.clientX, y: event.clientY }

      const next = {
        x: rotationRef.current.x + (invertPitch ? dy : -dy) * sensitivity * pitchScale,
        y: rotationRef.current.y + (invertYaw ? -dx : dx) * sensitivity,
      }
      rotationRef.current = next
      setRotation(next)
    },
    [invertPitch, invertYaw, pitchScale, sensitivity],
  )

  const endDrag = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (idleCenterRef) {
      idleCenterRef.current = { ...rotationRef.current }
    }
    setIsDragging(false)
  }, [idleCenterRef])

  return {
    rotation,
    rotationRef,
    isDragging,
    radians: {
      x: (rotation.x * Math.PI) / 180,
      y: (rotation.y * Math.PI) / 180,
    },
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      style: {
        touchAction: 'none' as const,
        cursor: isDragging ? ('grabbing' as const) : ('grab' as const),
      },
    },
  }
}
