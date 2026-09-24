import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useInView } from '@/lib/useInView'
import { cn } from '@/lib/utils'
import {
  DEFAULT_REVEAL_TIMING,
  letterDelayMs,
  letterTransformStyle,
  parseMode,
  splitDisplayLines,
  wordDelayMs,
  type RevealTiming,
  type StaggeredRevealMode,
} from './revealMotion'

export interface StaggeredTextRevealProps {
  /** Reveal choreography — matches loehx.com stage headline modes. */
  mode?: StaggeredRevealMode
  lines: string[]
  className?: string
  /** Per-letter/word transform duration (ms). */
  letterAnimMs?: number
  /** Delay between letters (ms). */
  letterStaggerMs?: number
  /** Delay between words in word mode (ms). */
  wordStaggerMs?: number
  /** Preview gallery: register a replay handler; return value unregisters. */
  onReplayMount?: (replay: () => void) => () => void
}

const CLIP = 'inline-block overflow-hidden align-top'

type WordSegment = {
  word: string
  wordIndex: number
  letters: { char: string; letterIndex: number }[]
}

type LineSegment = {
  words: WordSegment[]
}

function buildLineSegments(lines: string[]): LineSegment[] {
  let wordIndex = 0
  let letterIndex = 0

  return splitDisplayLines(lines).map((words) => ({
    words: words.map((word) => {
      const segment: WordSegment = {
        word,
        wordIndex,
        letters: Array.from(word).map((char) => {
          const entry = { char, letterIndex }
          letterIndex += 1
          return entry
        }),
      }
      wordIndex += 1
      return segment
    }),
  }))
}

function resolveTiming(props: StaggeredTextRevealProps): RevealTiming {
  return {
    letterAnimMs: props.letterAnimMs ?? DEFAULT_REVEAL_TIMING.letterAnimMs,
    letterStaggerMs: props.letterStaggerMs ?? DEFAULT_REVEAL_TIMING.letterStaggerMs,
    wordStaggerMs: props.wordStaggerMs ?? DEFAULT_REVEAL_TIMING.wordStaggerMs,
    introDelayMs: DEFAULT_REVEAL_TIMING.introDelayMs,
  }
}

export function StaggeredTextReveal({
  mode = 'letter-from-top',
  lines,
  className,
  letterAnimMs,
  letterStaggerMs,
  wordStaggerMs,
  onReplayMount,
}: StaggeredTextRevealProps) {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView('0px 0px -10% 0px')
  const sectionRef = useRef<HTMLElement>(null)
  const wasInViewRef = useRef(false)
  const revealFrameRef = useRef(0)
  const [active, setActive] = useState(Boolean(reduceMotion))
  /** When true, snap transforms with no CSS transition (before a reveal run). */
  const [instant, setInstant] = useState(!reduceMotion)

  const timing = useMemo(
    () =>
      resolveTiming({
        letterAnimMs,
        letterStaggerMs,
        wordStaggerMs,
        lines,
      }),
    [letterAnimMs, letterStaggerMs, wordStaggerMs, lines],
  )

  const cancelRevealFrames = useCallback(() => {
    cancelAnimationFrame(revealFrameRef.current)
    revealFrameRef.current = 0
  }, [])

  const playReveal = useCallback(() => {
    cancelRevealFrames()

    if (reduceMotion) {
      setInstant(false)
      setActive(true)
      return
    }

    setInstant(true)
    setActive(false)

    revealFrameRef.current = requestAnimationFrame(() => {
      if (sectionRef.current) {
        void sectionRef.current.offsetHeight
      }
      setInstant(false)
      revealFrameRef.current = requestAnimationFrame(() => setActive(true))
    })
  }, [cancelRevealFrames, reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      setInstant(false)
      setActive(true)
      wasInViewRef.current = inView
      return
    }

    if (inView && !wasInViewRef.current) {
      playReveal()
    }

    if (!inView) {
      cancelRevealFrames()
      setInstant(true)
      setActive(false)
    }

    wasInViewRef.current = inView
  }, [cancelRevealFrames, inView, playReveal, reduceMotion])

  useEffect(() => () => cancelRevealFrames(), [cancelRevealFrames])

  useEffect(() => {
    if (!onReplayMount) return
    return onReplayMount(playReveal)
  }, [onReplayMount, playReveal])

  const { granularity, direction } = parseMode(mode)
  const displayLines = lines.filter(Boolean)
  const fallback = displayLines.length ? displayLines : ['Staggered', 'text', 'reveal']
  const lineSegments = useMemo(() => buildLineSegments(fallback), [fallback])
  const accessibleLabel = fallback.join(' ')
  const motionReduced = Boolean(reduceMotion)
  const snapMotion = instant && !motionReduced

  return (
    <section
      ref={(node) => {
        sectionRef.current = node
        ref.current = node as HTMLDivElement | null
      }}
      className={cn(
        'relative flex min-h-[100svh] w-full items-center overflow-hidden bg-black px-[5vw] py-16 text-foreground',
        className,
      )}
      aria-label={accessibleLabel}
    >
      <div className="relative z-10 w-full">
        <h1 className="sr-only">{accessibleLabel}</h1>
        <div
          className="pointer-events-none w-full uppercase text-[clamp(2.5rem,10vw,5rem)] font-bold leading-[0.88] tracking-[-0.02em] text-[#fffcfa]"
          aria-hidden
        >
          {lineSegments.map((line, lineIndex) => (
            <span key={`line-${lineIndex}`} className="block">
              {line.words.map((wordSegment, wordIndexInLine) => {
                const { word, wordIndex, letters } = wordSegment
                const isLastWordInLine = wordIndexInLine === line.words.length - 1

                if (granularity === 'word') {
                  return (
                    <span key={`w-${wordIndex}`}>
                      {wordIndexInLine > 0 ? ' ' : null}
                      <span className={cn(CLIP, isLastWordInLine && 'whitespace-nowrap')}>
                        <span
                          className="inline-block"
                          style={letterTransformStyle(
                            active,
                            direction,
                            wordDelayMs(wordIndex, timing),
                            motionReduced,
                            timing,
                            snapMotion,
                          )}
                        >
                          {word}
                        </span>
                      </span>
                    </span>
                  )
                }

                return (
                  <span key={`w-${wordIndex}`}>
                    {wordIndexInLine > 0 ? ' ' : null}
                    <span className={cn(CLIP, isLastWordInLine && 'whitespace-nowrap')}>
                      {letters.map(({ char, letterIndex }) => (
                        <span key={`${wordIndex}-${letterIndex}`} className={CLIP}>
                          <span
                            className="inline-block"
                            style={letterTransformStyle(
                              active,
                              direction,
                              letterDelayMs(letterIndex, timing),
                              motionReduced,
                              timing,
                              snapMotion,
                            )}
                          >
                            {char}
                          </span>
                        </span>
                      ))}
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
