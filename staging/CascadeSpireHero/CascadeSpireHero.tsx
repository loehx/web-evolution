import { motion, useReducedMotion } from 'motion/react'
import { ResponsiveHeadline } from '@/components/primitives'
import { motionDuration } from '@/lib/motion'
import { usePointerOrbit } from '@/lib/usePointerOrbit'
import { cn } from '@/lib/utils'

export interface CascadeSpireHeroProps {
  eyebrow?: string
  titleLines: string[]
  subtitle?: string
  ctaLabel?: string
  onCtaClick?: () => void
  ctaDisabled?: boolean
  className?: string
}

const SPIRE_SIZE = 200
const HALF = SPIRE_SIZE / 2

function CrystalSpire() {
  const { rotation, bind, isDragging } = usePointerOrbit({
    initial: { x: -18, y: 24 },
    pitchScale: 0.9,
  })

  const faces = [
    { transform: `rotateY(0deg) translateZ(${HALF}px)`, tone: '#e8e4dc' },
    { transform: `rotateY(90deg) translateZ(${HALF}px)`, tone: '#d4cfc4' },
    { transform: `rotateY(180deg) translateZ(${HALF}px)`, tone: '#b8b2a6' },
    { transform: `rotateY(-90deg) translateZ(${HALF}px)`, tone: '#c8ff3d' },
    { transform: `rotateX(90deg) translateZ(${HALF}px)`, tone: '#f5f2ea' },
    { transform: `rotateX(-90deg) translateZ(${HALF}px)`, tone: '#8a8580' },
  ]

  return (
    <div
      className="relative grid h-full min-h-[45svh] w-full place-items-center lg:min-h-[70svh]"
      {...bind}
      style={bind.style}
      aria-label="Crystal spire. Click or tap, hold, and drag to rotate."
      role="img"
    >
      <div
        className="pointer-events-none"
        style={{ perspective: 1200, perspectiveOrigin: '50% 42%' }}
      >
        <div
          style={{
            width: SPIRE_SIZE,
            height: SPIRE_SIZE,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-black/25"
              style={{
                width: SPIRE_SIZE,
                height: SPIRE_SIZE,
                background: face.tone,
                transform: face.transform,
                backfaceVisibility: 'hidden',
              }}
            />
          ))}
        </div>
      </div>
      <p className="pointer-events-none absolute bottom-4 text-[10px] uppercase tracking-[0.4em] text-[#1a1816]/45 lg:bottom-8">
        {isDragging ? 'Orbiting' : 'Hold and drag'}
      </p>
    </div>
  )
}

export function CascadeSpireHero({
  eyebrow,
  titleLines,
  subtitle,
  ctaLabel,
  onCtaClick,
  ctaDisabled = false,
  className,
}: CascadeSpireHeroProps) {
  const reduceMotion = useReducedMotion()
  const slabs = [
    eyebrow ? { kind: 'eyebrow' as const, content: eyebrow } : null,
    { kind: 'title' as const },
    subtitle ? { kind: 'subtitle' as const, content: subtitle } : null,
    ctaLabel ? { kind: 'cta' as const, content: ctaLabel } : null,
  ].filter(Boolean)

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col bg-[#c8c4bc] text-[#1a1816] lg:grid lg:grid-cols-[42%_58%] lg:flex-row',
        className,
      )}
    >
      <div className="relative z-10 flex flex-col justify-end gap-0 px-4 pb-8 pt-16 lg:px-8 lg:pb-12 lg:pt-20">
        {slabs.map((slab, index) => {
          const offset = index * 12
          const delay = reduceMotion ? 0 : index * 0.12

          if (!slab) return null

          if (slab.kind === 'title') {
            return (
              <motion.div
                key="title"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionDuration.hero, delay }}
                className="bg-[#1a1816] px-4 py-5 md:px-6 md:py-6"
                style={{ marginLeft: offset }}
              >
                <ResponsiveHeadline
                  level={1}
                  lines={titleLines.length ? titleLines : ['Untitled']}
                  className="text-[#c8ff3d]"
                  fontSize={72}
                  lineHeight={80}
                />
              </motion.div>
            )
          }

          return (
            <motion.div
              key={slab.kind}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDuration.standard, delay }}
              className={cn(
                'px-4 py-3 md:px-6',
                slab.kind === 'eyebrow' && 'bg-[#b8b2a6] font-mono text-[10px] uppercase tracking-[0.45em]',
                slab.kind === 'subtitle' && 'max-w-[36ch] bg-[#e8e4dc] text-sm md:text-base',
                slab.kind === 'cta' && 'bg-[#c8ff3d] p-0',
              )}
              style={{ marginLeft: offset }}
            >
              {slab.kind === 'cta' ? (
                <button
                  type="button"
                  disabled={ctaDisabled}
                  onClick={onCtaClick}
                  className="w-full px-4 py-4 text-left text-sm font-semibold uppercase tracking-[0.2em] disabled:opacity-50"
                >
                  {slab.content}
                </button>
              ) : (
                slab.content
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="relative flex-1 bg-[#e8e4dc] lg:min-h-[100svh]">
        <CrystalSpire />
      </div>
    </section>
  )
}
