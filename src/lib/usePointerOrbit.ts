import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

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
}

const DEFAULT_SENSITIVITY = 0.45

/**
 * Click/tap, hold, and drag to orbit a 3D object on X and Y.
 * Works with mouse and touch via pointer events.
 */
export function usePointerOrbit(options: UsePointerOrbitOptions = {}) {
  const sensitivity = options.sensitivity ?? DEFAULT_SENSITIVITY
  const [rotation, setRotation] = useState<OrbitRotation>(
    () => options.initial ?? { x: 0, y: 0 },
  )
  const [isDragging, setIsDragging] = useState(false)
  const last = useRef({ x: 0, y: 0 })

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    last.current = { x: event.clientX, y: event.clientY }
    setIsDragging(true)
  }, [])

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return

      const dx = event.clientX - last.current.x
      const dy = event.clientY - last.current.y
      last.current = { x: event.clientX, y: event.clientY }

      setRotation((current) => ({
        x: current.x - dy * sensitivity,
        y: current.y + dx * sensitivity,
      }))
    },
    [sensitivity],
  )

  const endDrag = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setIsDragging(false)
  }, [])

  return {
    rotation,
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
