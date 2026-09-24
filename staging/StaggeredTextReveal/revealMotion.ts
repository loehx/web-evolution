import type { CSSProperties } from 'react'

/** Timing + easing ported from loehx.com stage IntroHeadline (Sep 2026). */
export const LETTER_ANIM_MS = 1500
export const LETTER_STAGGER_MS = 40
export const WORD_STAGGER_MS = 50
export const INTRO_DELAY_MS = 200
export const HIDDEN_OFFSET_PERCENT = 115

export const LETTER_EASE = 'cubic-bezier(0, 1, 0.3, 1)'

export interface RevealTiming {
  letterAnimMs: number
  letterStaggerMs: number
  wordStaggerMs: number
  introDelayMs: number
}

export const DEFAULT_REVEAL_TIMING: RevealTiming = {
  letterAnimMs: LETTER_ANIM_MS,
  letterStaggerMs: LETTER_STAGGER_MS,
  wordStaggerMs: WORD_STAGGER_MS,
  introDelayMs: INTRO_DELAY_MS,
}

export type RevealGranularity = 'letter' | 'word'
export type RevealDirection = 'from-top' | 'from-bottom' | 'from-left'

export type StaggeredRevealMode =
  | 'letter-from-top'
  | 'letter-from-bottom'
  | 'letter-from-left'
  | 'word-from-top'
  | 'word-from-bottom'
  | 'word-from-left'

export function parseMode(mode: StaggeredRevealMode): {
  granularity: RevealGranularity
  direction: RevealDirection
} {
  const sep = '-from-'
  const sepIndex = mode.indexOf(sep)
  const granularity = mode.slice(0, sepIndex) as RevealGranularity
  const direction = `from-${mode.slice(sepIndex + sep.length)}` as RevealDirection
  return { granularity, direction }
}

export function hiddenTransform(active: boolean, direction: RevealDirection): string {
  if (active) return 'translate(0, 0)'

  switch (direction) {
    case 'from-top':
      return `translateY(-${HIDDEN_OFFSET_PERCENT}%)`
    case 'from-bottom':
      return `translateY(${HIDDEN_OFFSET_PERCENT}%)`
    case 'from-left':
      return `translateX(-${HIDDEN_OFFSET_PERCENT}%)`
    default:
      return `translateY(-${HIDDEN_OFFSET_PERCENT}%)`
  }
}

export function letterDelayMs(
  globalLetterIndex: number,
  timing: RevealTiming = DEFAULT_REVEAL_TIMING,
  useIntroDelay = true,
): number {
  return (useIntroDelay ? timing.introDelayMs : 0) + globalLetterIndex * timing.letterStaggerMs
}

export function wordDelayMs(
  wordIndex: number,
  timing: RevealTiming = DEFAULT_REVEAL_TIMING,
): number {
  return timing.introDelayMs + wordIndex * timing.wordStaggerMs
}

export function splitDisplayLines(lines: string[]): string[][] {
  return lines.map((line) => line.split(/\s+/).filter(Boolean))
}

export function letterTransformStyle(
  active: boolean,
  direction: RevealDirection,
  delayMs: number,
  reduceMotion: boolean,
  timing: RevealTiming = DEFAULT_REVEAL_TIMING,
  instant = false,
): CSSProperties {
  if (reduceMotion) {
    return { transform: 'translate(0, 0)' }
  }

  const transform = hiddenTransform(active, direction)

  if (instant) {
    return { transform, transition: 'none' }
  }

  return {
    transform,
    transitionProperty: 'transform',
    transitionDuration: `${timing.letterAnimMs}ms`,
    transitionTimingFunction: LETTER_EASE,
    transitionDelay: `${delayMs}ms`,
  }
}
