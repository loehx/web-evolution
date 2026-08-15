import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'
import { StarAscentControls } from './StarAscentControls'
import {
  DEFAULT_STAR_ASCENT_SETTINGS,
  DEFAULT_STAR_COLOR_MASK,
  type StarAscentSettings,
  type StarAscentSliderKey,
  type StarColorKey,
} from './starAscentSettings'
import { GENESIS_5_STARS, STAR_BRAND_COLORS } from './starFieldGeometry'
import {
  StarAscentFlightRig,
  StarAscentFlightSurface,
  useStarAscentFlightInput,
} from './StarAscentFlight'
import { MarsOrbitSurface, useMarsTrackballInput } from './MarsOrbitSurface'
import { MarsPlanet } from './MarsPlanet'
import { MARS_PLANET } from './marsAssets'
import { StarAscentScrollRig } from './StarAscentScrollRig'
import { ScrollStarField } from './ScrollStarField'

export type StarAscentProps = {
  className?: string
  /** Total scroll runway — default 600vh (stars → Mars). */
  scrollHeight?: string
  /** Mars idle autospin in radians per second — default very slow. */
  marsRollSpeed?: number
  starSize?: number
  starCount?: number
  motionBrightness?: number
  motionBlur?: number
  /** Radians per second — default 0.011. */
  rotationSpeed?: number
  seed?: number
  starLight?: string
  starOrange?: string
  starPurple?: string
  starBlue?: string
  showControls?: boolean
}

function useSectionScroll(sectionRef: React.RefObject<HTMLElement | null>) {
  const scrollPxRef = useRef(0)
  const velocityPxRef = useRef(0)
  const progressRef = useRef(0)

  useEffect(() => {
    let frame = 0
    let lastScrollPx = 0
    let lastTime = performance.now()
    let smoothedVelocity = 0

    const tick = () => {
      const section = sectionRef.current
      if (section) {
        const now = performance.now()
        const dt = Math.max(now - lastTime, 1)
        lastTime = now

        const maxScroll = Math.max(section.scrollHeight - section.clientHeight, 0)
        const nextScrollPx = Math.min(Math.max(section.scrollTop, 0), maxScroll)
        const deltaPx = nextScrollPx - lastScrollPx
        const instantVelocity = (Math.abs(deltaPx) / dt) * 1000
        smoothedVelocity +=
          (instantVelocity - smoothedVelocity) * (1 - Math.exp(-dt / 35))

        scrollPxRef.current = nextScrollPx
        velocityPxRef.current = smoothedVelocity
        progressRef.current = maxScroll > 0 ? nextScrollPx / maxScroll : 0
        lastScrollPx = nextScrollPx
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [sectionRef])

  return { scrollPxRef, velocityPxRef, progressRef }
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}

export function StarAscent({
  className,
  scrollHeight = '600vh',
  marsRollSpeed = MARS_PLANET.autoSpinSpeed,
  starSize = DEFAULT_STAR_ASCENT_SETTINGS.starSize,
  starCount = DEFAULT_STAR_ASCENT_SETTINGS.starCount,
  motionBrightness = DEFAULT_STAR_ASCENT_SETTINGS.motionBrightness,
  motionBlur = DEFAULT_STAR_ASCENT_SETTINGS.motionBlur,
  rotationSpeed = GENESIS_5_STARS.rotationSpeed,
  seed = GENESIS_5_STARS.seed,
  starLight = STAR_BRAND_COLORS.light,
  starOrange = STAR_BRAND_COLORS.orange,
  starPurple = STAR_BRAND_COLORS.purple,
  starBlue = STAR_BRAND_COLORS.blue,
  showControls = true,
}: StarAscentProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const flightSurfaceRef = useRef<HTMLDivElement>(null)
  const marsSurfaceRef = useRef<HTMLDivElement>(null)
  const marsDraggingRef = useRef(false)
  const reduceMotion = useReducedMotion()
  const { scrollPxRef, velocityPxRef, progressRef } = useSectionScroll(sectionRef)
  const { inputRef: flightInputRef, metricsRef: flightMetricsRef } =
    useStarAscentFlightInput(flightSurfaceRef, progressRef)
  const marsTrackball = useMarsTrackballInput(marsSurfaceRef, progressRef)

  useEffect(() => {
    marsDraggingRef.current = marsTrackball.isDragging
  }, [marsTrackball.isDragging])

  const [settings, setSettings] = useState<StarAscentSettings>(() => ({
    starSize,
    starCount,
    motionBrightness,
    motionBlur,
    rotationSpeed,
    flightSpeed: DEFAULT_STAR_ASCENT_SETTINGS.flightSpeed,
    colors: { ...DEFAULT_STAR_COLOR_MASK },
  }))
  const debouncedStarCount = useDebouncedValue(settings.starCount, 250)
  const palette = useMemo(
    () => ({ light: starLight, orange: starOrange, purple: starPurple, blue: starBlue }),
    [starLight, starOrange, starPurple, starBlue],
  )
  const fieldSettings = useMemo(
    () => ({ ...settings, starCount: debouncedStarCount }),
    [settings, debouncedStarCount],
  )

  const updateSetting = (key: StarAscentSliderKey, value: number) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const toggleColor = (key: StarColorKey) => {
    setSettings((current) => {
      const enabled = Object.values(current.colors).filter(Boolean).length
      if (current.colors[key] && enabled <= 1) return current
      return {
        ...current,
        colors: { ...current.colors, [key]: !current.colors[key] },
      }
    })
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative h-[100svh] w-full overflow-y-auto overscroll-y-contain',
        className,
      )}
      style={{ backgroundColor: GENESIS_5_STARS.void }}
      aria-label="Scroll from the star field into Mars; hold to fly, then grab the planet to rotate it"
    >
      <div className="relative w-full" style={{ height: scrollHeight }}>
        <div className="sticky top-0 h-[100svh] w-full">
          <Canvas
            dpr={[1, 1.75]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
            camera={{ fov: 32, near: 0.1, far: 160, position: [0, 0, 18] }}
            style={{ touchAction: 'pan-y' }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.NoToneMapping
              gl.toneMappingExposure = 1
            }}
          >
            <color attach="background" args={[GENESIS_5_STARS.void]} />
            <StarAscentScrollRig progressRef={progressRef} />
            <StarAscentFlightRig
              inputRef={flightInputRef}
              metricsRef={flightMetricsRef}
              progressRef={progressRef}
              flightSpeed={settings.flightSpeed}
              reduceMotion={!!reduceMotion}
            />
            <ScrollStarField
              scrollPxRef={scrollPxRef}
              velocityPxRef={velocityPxRef}
              progressRef={progressRef}
              flightMetricsRef={flightMetricsRef}
              settings={fieldSettings}
              rotationSpeed={settings.rotationSpeed}
              seed={seed}
              palette={palette}
              reduceMotion={!!reduceMotion}
            />
            <MarsPlanet
              progressRef={progressRef}
              orientationRef={marsTrackball.orientationRef}
              pendingRef={marsTrackball.pendingRef}
              velocityRef={marsTrackball.velocityRef}
              isDragging={marsTrackball.isDragging}
              isDraggingRef={marsDraggingRef}
              inertiaDecay={marsTrackball.inertiaDecay}
              rollSpeed={marsRollSpeed}
              reduceMotion={!!reduceMotion}
            />
          </Canvas>

          <StarAscentFlightSurface
            surfaceRef={flightSurfaceRef}
            className="absolute inset-0 z-[5] cursor-crosshair"
          />

          <MarsOrbitSurface
            surfaceRef={marsSurfaceRef}
            bind={marsTrackball.bind}
            isDragging={marsTrackball.isDragging}
          />

          {showControls ? (
            <StarAscentControls
              settings={settings}
              onChange={updateSetting}
              onToggleColor={toggleColor}
            />
          ) : null}

          <p className="pointer-events-none absolute inset-x-0 bottom-8 z-10 text-center text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/35">
            {marsTrackball.isDragging
              ? 'Orbiting Mars'
              : 'Scroll · hold to fly · grab Mars to rotate'}
          </p>
        </div>
      </div>
    </section>
  )
}
