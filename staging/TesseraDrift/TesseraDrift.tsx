import { useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { cn } from '@/lib/utils'
import { buildTesseraLayout } from './sampleLetter'
import {
  DEFAULT_TESSERA_DRIFT_SETTINGS,
  type TesseraDriftSettings,
  type TesseraSliderKey,
} from './tesseraSettings'
import { TesseraDriftControls } from './TesseraDriftControls'

function parseHex(hex: string) {
  const normalized = hex.replace('#', '')
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => char + char)
          .join('')
      : normalized

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function mixColors(from: string, to: string, amount: number) {
  const t = Math.max(0, Math.min(1, amount))
  const a = parseHex(from)
  const b = parseHex(to)
  const mix = (start: number, end: number) => Math.round(start + (end - start) * t)

  return `rgb(${mix(a.r, b.r)}, ${mix(a.g, b.g)}, ${mix(a.b, b.b)})`
}

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

  return { spreadRange, converged, spreadRemaining }
}

export type TesseraDriftProps = {
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

function settingsFromProps(props: TesseraDriftProps): TesseraDriftSettings {
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

export function TesseraDrift(props: TesseraDriftProps) {
  const { className, showControls = true } = props

  const reduceMotion = useReducedMotion()
  const [settings, setSettings] = useState(() => settingsFromProps(props))
  const [fitScale, setFitScale] = useState(1)
  const stageRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef({
    parallaxY: settings.parallaxY,
    parallaxX: settings.parallaxX,
    centerColor: settings.squareColor,
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
    parallaxRef.current = {
      parallaxY: settings.parallaxY,
      parallaxX: settings.parallaxX,
      centerColor: settings.squareColor,
      reduceMotion: !!reduceMotion,
    }
  }, [settings.parallaxY, settings.parallaxX, settings.squareColor, reduceMotion])

  useEffect(() => {
    let frame = 0

    const tick = () => {
      const stage = stageRef.current
      if (stage && !parallaxRef.current.reduceMotion) {
        const rect = stage.getBoundingClientRect()
        const viewportCenter = window.innerHeight * 0.5
        const stageCenter = rect.top + rect.height * 0.5
        const delta = stageCenter - viewportCenter
        const approachDelta = Math.max(0, delta)
        const { converged, spreadRemaining } = computeApproach(delta)
        const spreadScale = window.innerWidth * 0.28
        const items = stage.querySelectorAll<HTMLElement>('[data-tessera-item]')

        items.forEach((element) => {
          const depth = Number(element.dataset.tesseraDepth ?? '1')
          const spreadX = Number(element.dataset.tesseraSpreadX ?? '0')
          const itemColor = element.dataset.tesseraColor ?? '#ffffff'
          const parallaxRate = Math.min(parallaxRef.current.parallaxY * depth, 1)
          const offsetY = -approachDelta * parallaxRate
          const offsetX =
            spreadX * spreadRemaining * parallaxRef.current.parallaxX * depth * spreadScale

          element.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
          element.style.backgroundColor = mixColors(
            itemColor,
            parallaxRef.current.centerColor,
            converged,
          )
        })
      } else if (stage) {
        stage.querySelectorAll<HTMLElement>('[data-tessera-item]').forEach((element) => {
          element.style.transform = 'translate3d(0,0,0)'
          element.style.backgroundColor = parallaxRef.current.centerColor
        })
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [layout.items.length])

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

  const headlineStyle = {
    width: layout.width,
    height: layout.height,
    transform: fitScale < 1 ? `scale(${fitScale})` : undefined,
    transformOrigin: 'center center',
  } satisfies CSSProperties

  const stageContent = (
    <>
      <h1 className="sr-only">{settings.headline}</h1>

      <div className="relative" style={headlineStyle} aria-hidden>
        {layout.items.map((item, index) => (
          <span
            key={index}
            data-tessera-item=""
            data-tessera-depth={item.depth.toFixed(3)}
            data-tessera-spread-x={item.spreadX.toFixed(3)}
            data-tessera-color={item.color}
            aria-hidden
            className="absolute"
            style={{
              left: item.x,
              top: item.y,
              width: item.size,
              height: item.size,
              backgroundColor: reduceMotion ? settings.squareColor : item.color,
              willChange: reduceMotion ? undefined : 'transform',
            }}
          />
        ))}
      </div>

      {showControls ? (
        <TesseraDriftControls
          settings={settings}
          onChange={updateSetting}
          onFieldChange={updateField}
          onToggle={toggleSetting}
          onReshuffle={reshuffle}
        />
      ) : null}
    </>
  )

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
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: settings.background }}
      >
        {stageContent}
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
