import { Suspense, useCallback, useRef, useState } from 'react'
import { ResponsiveHeadline } from '@/components/primitives'
import { useInView } from '@/lib/useInView'
import { cn } from '@/lib/utils'
import { TiltModelScene, type PointerState } from './TiltModelScene'

export interface PointerTiltShowcaseProps {
  eyebrow?: string
  headlineLines?: string[]
  intro?: string
  ctaLabel?: string
  onCtaClick?: () => void
  /** glTF binary served from /public/models */
  modelSrc?: string
  modelScale?: number
  /** Radians of max tilt toward pointer / tap. */
  maxTilt?: number
  modelSide?: 'left' | 'right'
  /** Fixed aspect ratio for the 3D viewport box. */
  viewportRatio?: '16/10' | '4/5' | '1/1'
  className?: string
}

const ratioClasses = {
  '16/10': 'aspect-[16/10]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
} as const

const DEFAULT_POINTER: PointerState = { x: 0, y: 0 }

function usePrefersReducedMotion() {
  const [reduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  return reduced
}

function ViewportPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-900 text-sm text-zinc-500">
      <div className="h-10 w-10 rounded-full border-2 border-dashed border-zinc-600" aria-hidden />
      <span>Scroll here to load 3D model</span>
    </div>
  )
}

/**
 * Welcome / product band with a glTF model that tilts toward cursor or touch position.
 */
export function PointerTiltShowcase({
  eyebrow,
  headlineLines,
  intro,
  ctaLabel,
  onCtaClick,
  modelSrc = '/models/duck.glb',
  modelScale = 1.4,
  maxTilt = 0.55,
  modelSide = 'right',
  viewportRatio = '4/5',
  className,
}: PointerTiltShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: viewportRef, inView } = useInView('300px 0px')
  const [pointer, setPointer] = useState<PointerState>(DEFAULT_POINTER)
  const reducedMotion = usePrefersReducedMotion()

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = ((clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1)
    setPointer({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    })
  }, [])

  const resetPointer = useCallback(() => {
    setPointer(DEFAULT_POINTER)
  }, [])

  const modelFirst = modelSide === 'left'

  const copy = (
    <div
      className={cn(
        'flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16',
        modelFirst ? 'lg:order-2' : 'lg:order-1',
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300 md:text-sm">
          {eyebrow}
        </p>
      ) : null}
      {headlineLines && headlineLines.length > 0 ? (
        <ResponsiveHeadline
          level={1}
          lines={headlineLines}
          className={cn('text-white', eyebrow && 'mt-4')}
        />
      ) : null}
      {intro ? (
        <p className="mt-5 max-w-prose text-base leading-relaxed text-zinc-300 md:text-lg lg:mt-6">
          {intro}
        </p>
      ) : null}
      {ctaLabel ? (
        <button
          type="button"
          onClick={onCtaClick}
          className="mt-8 inline-flex w-fit items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {ctaLabel}
        </button>
      ) : null}
      <p className="mt-6 text-xs text-zinc-500 md:hidden">
        Drag or tap on the model to rotate it.
      </p>
    </div>
  )

  const viewport = (
    <div
      ref={viewportRef}
      className={cn(
        'relative w-full min-h-[16rem] overflow-hidden bg-zinc-900',
        ratioClasses[viewportRatio],
        modelFirst ? 'lg:order-1' : 'lg:order-2',
      )}
      aria-label="Interactive 3D model — move cursor or drag to tilt"
    >
      <div className="absolute inset-0">
        {inView ? (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-sm text-zinc-500">
                Loading 3D model…
              </div>
            }
          >
            <TiltModelScene
              modelSrc={modelSrc}
              pointer={pointer}
              maxTilt={maxTilt}
              reducedMotion={reducedMotion}
              modelScale={modelScale}
              className="h-full w-full touch-none"
            />
          </Suspense>
        ) : (
          <ViewportPlaceholder />
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-zinc-950/80 to-transparent"
      />
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className={cn('w-full bg-zinc-950', className)}
      onPointerMove={(event) => updatePointer(event.clientX, event.clientY)}
      onPointerLeave={resetPointer}
      onPointerDown={(event) => updatePointer(event.clientX, event.clientY)}
    >
      <div className="grid w-full lg:grid-cols-2 lg:items-stretch">
        {modelFirst ? (
          <>
            {viewport}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {viewport}
          </>
        )}
      </div>
    </section>
  )
}
