import { useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { buildTesseraLayout } from '../TesseraDrift/sampleLetter'
import { TesseraDriftControls } from '../TesseraDrift/TesseraDriftControls'
import {
  DEFAULT_TESSERA_DRIFT_SETTINGS,
  type TesseraDriftSettings,
  type TesseraSliderKey,
} from '../TesseraDrift/tesseraSettings'
import { createTesseraGlRenderer, parseHexColor } from './tesseraGl'

const APPROACH_HOLD = 0.5
const APPROACH_RANGE = 1.25

function easeOutSubtle(t: number) {
  const progress = Math.max(0, Math.min(1, t))
  const cubic = 1 - (1 - progress) ** 3
  return progress * 0.78 + cubic * 0.22
}

function computeApproach(delta: number) {
  const spreadRange = window.innerHeight * APPROACH_RANGE
  const approachDelta = Math.max(0, delta)
  const scrollProgress = 1 - Math.min(1, approachDelta / spreadRange)
  const active = Math.max(0, (scrollProgress - APPROACH_HOLD) / (1 - APPROACH_HOLD))
  const converged = easeOutSubtle(active)
  const spreadRemaining = 1 - converged

  return { approachDelta, converged, spreadRemaining }
}

export type TesseraDriftShaderProps = {
  className?: string
  headline?: string
  squareCount?: number
  cloudCount?: number
  squareSize?: number
  jitter?: number
  letterScale?: number
  letterSpacing?: number
  fontWeight?: number
  sampleThreshold?: number
  parallaxY?: number
  parallaxX?: number
  depthMin?: number
  depthMax?: number
  seed?: number
  squareColor?: string
  background?: string
  showRunway?: boolean
  showControls?: boolean
}

function settingsFromProps(props: TesseraDriftShaderProps): TesseraDriftSettings {
  return {
    squareCount: props.squareCount ?? DEFAULT_TESSERA_DRIFT_SETTINGS.squareCount,
    cloudCount: props.cloudCount ?? DEFAULT_TESSERA_DRIFT_SETTINGS.cloudCount,
    squareSize: props.squareSize ?? DEFAULT_TESSERA_DRIFT_SETTINGS.squareSize,
    jitter: props.jitter ?? DEFAULT_TESSERA_DRIFT_SETTINGS.jitter,
    letterScale: props.letterScale ?? DEFAULT_TESSERA_DRIFT_SETTINGS.letterScale,
    letterSpacing:
      props.letterSpacing ?? DEFAULT_TESSERA_DRIFT_SETTINGS.letterSpacing,
    fontWeight: props.fontWeight ?? DEFAULT_TESSERA_DRIFT_SETTINGS.fontWeight,
    sampleThreshold:
      props.sampleThreshold ?? DEFAULT_TESSERA_DRIFT_SETTINGS.sampleThreshold,
    parallaxY: props.parallaxY ?? DEFAULT_TESSERA_DRIFT_SETTINGS.parallaxY,
    parallaxX: props.parallaxX ?? DEFAULT_TESSERA_DRIFT_SETTINGS.parallaxX,
    depthMin: props.depthMin ?? DEFAULT_TESSERA_DRIFT_SETTINGS.depthMin,
    depthMax: props.depthMax ?? DEFAULT_TESSERA_DRIFT_SETTINGS.depthMax,
    seed: props.seed ?? DEFAULT_TESSERA_DRIFT_SETTINGS.seed,
    squareColor: props.squareColor ?? DEFAULT_TESSERA_DRIFT_SETTINGS.squareColor,
    background: props.background ?? DEFAULT_TESSERA_DRIFT_SETTINGS.background,
    headline: props.headline ?? DEFAULT_TESSERA_DRIFT_SETTINGS.headline,
    showRunway: props.showRunway ?? DEFAULT_TESSERA_DRIFT_SETTINGS.showRunway,
  }
}

function useDebouncedLayout(settings: TesseraDriftSettings) {
  const [layoutSeed, setLayoutSeed] = useState(settings.seed)
  const [debounced, setDebounced] = useState(settings)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(settings), 120)
    return () => window.clearTimeout(timer)
  }, [settings])

  useEffect(() => {
    setLayoutSeed(settings.seed)
  }, [settings.seed])

  const layoutSettings = useMemo(
    () => ({ ...debounced, seed: layoutSeed }),
    [debounced, layoutSeed],
  )

  const layout = useMemo(() => buildTesseraLayout(layoutSettings), [layoutSettings])

  const reshuffle = useCallback(() => {
    setLayoutSeed((current) => current + 1)
  }, [])

  return { layout, reshuffle }
}

export function TesseraDriftShader(props: TesseraDriftShaderProps) {
  const { className, showControls = true } = props

  const reduceMotion = useReducedMotion()
  const [settings, setSettings] = useState(() => settingsFromProps(props))
  const [fitScale, setFitScale] = useState(1)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<ReturnType<typeof createTesseraGlRenderer>>(null)
  const motionRef = useRef({
    parallaxY: settings.parallaxY,
    parallaxX: settings.parallaxX,
    background: parseHexColor(settings.background),
    reduceMotion: !!reduceMotion,
  })

  useEffect(() => {
    setSettings(settingsFromProps(props))
  }, [
    props.headline,
    props.squareCount,
    props.cloudCount,
    props.squareSize,
    props.jitter,
    props.letterScale,
    props.letterSpacing,
    props.fontWeight,
    props.sampleThreshold,
    props.parallaxY,
    props.parallaxX,
    props.depthMin,
    props.depthMax,
    props.seed,
    props.squareColor,
    props.background,
    props.showRunway,
  ])

  const { layout, reshuffle } = useDebouncedLayout(settings)

  useEffect(() => {
    motionRef.current = {
      parallaxY: settings.parallaxY,
      parallaxX: settings.parallaxX,
      background: parseHexColor(settings.background),
      reduceMotion: !!reduceMotion,
    }
  }, [settings.parallaxY, settings.parallaxX, settings.background, reduceMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = createTesseraGlRenderer(canvas)
    rendererRef.current = renderer

    return () => {
      renderer?.destroy()
      rendererRef.current = null
    }
  }, [])

  useEffect(() => {
    rendererRef.current?.setLayout(layout.items)
  }, [layout.items])

  useEffect(() => {
    const fitHeadline = () => {
      if (layout.width <= 0 || layout.height <= 0) {
        setFitScale(1)
        return
      }

      const maxWidth = window.innerWidth * 0.92
      const maxHeight = window.innerHeight * 0.62
      setFitScale(Math.min(1, maxWidth / layout.width, maxHeight / layout.height))
    }

    fitHeadline()
    window.addEventListener('resize', fitHeadline)
    return () => window.removeEventListener('resize', fitHeadline)
  }, [layout.width, layout.height])

  useEffect(() => {
    let frame = 0

    const tick = () => {
      const stage = stageRef.current
      const canvas = canvasRef.current
      const renderer = rendererRef.current

      if (stage && canvas && renderer) {
        const rect = stage.getBoundingClientRect()
        const viewportWidth = rect.width
        const viewportHeight = rect.height
        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        renderer.resize(viewportWidth, viewportHeight, dpr)

        const viewportCenter = window.innerHeight * 0.5
        const stageCenter = rect.top + rect.height * 0.5
        const delta = stageCenter - viewportCenter
        const { approachDelta, spreadRemaining } = motionRef.current.reduceMotion
          ? { approachDelta: 0, spreadRemaining: 0 }
          : computeApproach(delta)

        renderer.draw({
          viewportWidth,
          viewportHeight,
          layoutWidth: layout.width,
          layoutHeight: layout.height,
          fitScale,
          approachDelta,
          spreadRemaining,
          parallaxY: motionRef.current.parallaxY,
          parallaxX: motionRef.current.parallaxX,
          spreadScale: window.innerWidth * 0.28,
          background: motionRef.current.background,
          reduceMotion: motionRef.current.reduceMotion,
        })
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [fitScale, layout.width, layout.height, layout.items.length])

  const updateSetting = (key: TesseraSliderKey, value: number) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const updateField = (
    key: 'headline' | 'squareColor' | 'background' | 'seed',
    value: string | number,
  ) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const toggleSetting = (key: 'showRunway') => {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div
      className={cn(
        'relative w-full',
        settings.showRunway ? 'min-h-[200svh]' : 'h-[100svh]',
        className,
      )}
      style={{ backgroundColor: settings.background }}
    >
      <div
        ref={stageRef}
        className="relative h-[100svh] w-full overflow-hidden"
        style={{ backgroundColor: settings.background }}
      >
        <h1 className="sr-only">{settings.headline}</h1>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          aria-hidden
        />

        {showControls ? (
          <TesseraDriftControls
            settings={settings}
            onChange={updateSetting}
            onFieldChange={updateField}
            onToggle={toggleSetting}
            onReshuffle={reshuffle}
          />
        ) : null}
      </div>

      {settings.showRunway ? (
        <div
          className="h-[100svh] w-full"
          style={{ backgroundColor: settings.background }}
          aria-hidden
        />
      ) : null}
    </div>
  )
}
