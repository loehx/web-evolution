import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { motionDuration } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type GlyphVeilTone = 'ink' | 'paper'

export type GlyphVeilProps = {
  className?: string
  headline?: string
  tone?: GlyphVeilTone
  /** CSS px for the neon yellow torch disc */
  torchRadius?: number
}

const DEFAULT_HEADLINE = 'Alexander Löhn\nWeb & AI Developer'

const NEON_YELLOW = '#F5FF3D'
const REVEAL_FILL = 'rgba(255, 255, 255, 1)'
const FONT_FAMILY = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace'
const DESKTOP_FONT_REM = 1
const MOBILE_FONT_REM = 0.7
const STENCIL_SCALE = 8

function resolveFontRem(viewportW: number, viewportH: number) {
  return viewportH > viewportW ? MOBILE_FONT_REM : DESKTOP_FONT_REM
}

function fontStackForRem(fontRem: number) {
  return `${fontRem}rem ${FONT_FAMILY}`
}

type GridState = {
  cols: number
  rows: number
  cellW: number
  cellH: number
  width: number
  height: number
  fontStack: string
  /** UTF-16 of the headline letter that owns this cell; 0 = empty */
  letters: Uint16Array
  /** 1 = torch has painted this cell */
  revealed: Uint8Array
}

function cellLuminance(
  data: Uint8ClampedArray,
  sw: number,
  col: number,
  row: number,
) {
  const x0 = col * STENCIL_SCALE
  const y0 = row * STENCIL_SCALE
  let sum = 0
  const samples = STENCIL_SCALE * STENCIL_SCALE
  for (let dy = 0; dy < STENCIL_SCALE; dy++) {
    for (let dx = 0; dx < STENCIL_SCALE; dx++) {
      const px = (y0 + dy) * sw + (x0 + dx)
      const o = px * 4
      sum += (data[o] + data[o + 1] + data[o + 2]) / 3
    }
  }
  return sum / samples
}

function wrapWords(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return []
  if (words.length === 1) return words

  const lines: string[] = []
  let current = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const test = `${current} ${word}`
    if (ctx.measureText(test).width <= maxWidth) {
      current = test
    } else {
      lines.push(current)
      current = word
    }
  }
  lines.push(current)
  return lines
}

function resolveHeadlineLines(
  ctx: CanvasRenderingContext2D,
  headline: string,
  targetW: number,
  wrapWordsOnPortrait: boolean,
): string[] {
  const paragraphs = headline.split('\n')
  const lines: string[] = []

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim()
    if (!trimmed) continue

    if (!wrapWordsOnPortrait || ctx.measureText(trimmed).width <= targetW) {
      lines.push(trimmed)
      continue
    }

    lines.push(...wrapWords(ctx, trimmed, targetW))
  }

  return lines.length ? lines : ['']
}

function buildHeadlineLetters(
  cols: number,
  rows: number,
  headline: string,
  viewportW: number,
  viewportH: number,
): Uint16Array {
  const letters = new Uint16Array(cols * rows)
  if (!headline.trim() || cols < 4 || rows < 4) return letters

  const sw = cols * STENCIL_SCALE
  const sh = rows * STENCIL_SCALE
  const off = document.createElement('canvas')
  off.width = sw
  off.height = sh
  const ctx = off.getContext('2d')
  if (!ctx) return letters

  const portrait = viewportH > viewportW
  const targetW = sw * (portrait ? 0.92 : 0.88)
  const maxBlockH = sh * (portrait ? 0.88 : 0.78)
  const lineHeightFactor = portrait ? 1.1 : 1.15
  const headlineFont = () =>
    `bold ${fontSize}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`

  const minFontSize = portrait ? Math.max(14, Math.floor(sh * 0.11)) : 8
  let fontSize = Math.floor(sh * (portrait ? 0.46 : 0.42))
  let lines = headline.split('\n')

  for (; fontSize >= minFontSize; fontSize -= 2) {
    ctx.font = headlineFont()
    lines = resolveHeadlineLines(ctx, headline, targetW, portrait)
    const longest = lines.reduce(
      (a, b) => (ctx.measureText(a).width >= ctx.measureText(b).width ? a : b),
      lines[0] ?? '',
    )
    const lineHeight = fontSize * lineHeightFactor
    const blockH = lineHeight * lines.length
    const fitsWidth = ctx.measureText(longest).width <= targetW
    const fitsHeight = blockH <= maxBlockH
    if (fitsWidth && fitsHeight) break
  }

  fontSize = Math.max(fontSize, minFontSize)
  ctx.font = headlineFont()
  lines = resolveHeadlineLines(ctx, headline, targetW, portrait)
  const lineHeight = fontSize * lineHeightFactor
  const blockH = lineHeight * lines.length
  let y = sh / 2 - blockH / 2 + lineHeight / 2
  const best = new Uint8Array(cols * rows)

  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'

  for (const line of lines) {
    const glyphs = Array.from(line)
    const lineWidth = ctx.measureText(line).width
    let x = sw / 2 - lineWidth / 2
    for (const ch of glyphs) {
      const adv = ctx.measureText(ch).width
      if (ch !== ' ') {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, sw, sh)
        ctx.fillStyle = '#fff'
        ctx.fillText(ch, x, y)
        const data = ctx.getImageData(0, 0, sw, sh).data
        const code = ch.codePointAt(0) ?? 0
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const lum = cellLuminance(data, sw, col, row)
            if (lum < 40) continue
            const i = row * cols + col
            if (lum >= best[i]) {
              best[i] = lum
              letters[i] = code
            }
          }
        }
      }
      x += adv
    }
    y += lineHeight
  }

  return letters
}

function measureCell(ctx: CanvasRenderingContext2D, fontRem: number) {
  const fontStack = fontStackForRem(fontRem)
  ctx.font = fontStack
  ctx.textAlign = 'left'
  const cellW = ctx.measureText('M').width
  const cellH = remPx(fontRem)
  return { cellW, cellH, fontStack }
}

function sizeCanvas(
  canvas: HTMLCanvasElement,
  w: number,
  h: number,
  dpr: number,
) {
  canvas.width = Math.floor(w * dpr)
  canvas.height = Math.floor(h * dpr)
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return ctx
}

function remPx(n: number) {
  return parseFloat(getComputedStyle(document.documentElement).fontSize) * n
}

function resolveTorchRadius(explicit: number | undefined, mobile = false) {
  const base = explicit ?? remPx(6)
  return mobile ? base * 0.8 : base
}

function isMobileViewport(viewportW: number, viewportH: number) {
  return viewportH > viewportW
}

function positionTorch(
  torch: HTMLDivElement,
  x: number,
  y: number,
  radius: number,
) {
  const diameter = radius * 2
  torch.style.width = `${diameter}px`
  torch.style.height = `${diameter}px`
  torch.style.marginLeft = '0'
  torch.style.marginTop = '0'
  torch.style.left = `${x - radius}px`
  torch.style.top = `${y - radius}px`
}

export function GlyphVeil({
  className,
  headline = DEFAULT_HEADLINE,
  tone = 'ink',
  torchRadius,
}: GlyphVeilProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const torchRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<GridState | null>(null)
  const pointerRef = useRef({
    x: 0,
    y: 0,
    engaged: false,
    pressed: false,
    movedWhilePressed: false,
  })
  const mobileRef = useRef(false)
  const rafRef = useRef(0)
  const [explored, setExplored] = useState(false)
  const [torchVisible, setTorchVisible] = useState(true)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const reduceMotion = useReducedMotion()
  const appear = reduceMotion ? 0 : motionDuration.hero
  const torchTransition = reduceMotion ? 0 : motionDuration.standard
  const ease = [0.16, 1, 0.3, 1] as const

  const resolvedHeadline = headline.trim() || DEFAULT_HEADLINE
  const bgClass = tone === 'paper' ? 'bg-white' : 'bg-black'

  const rebuildGrid = useCallback(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const rect = section.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const w = Math.max(1, rect.width)
    const h = Math.max(1, rect.height)

    const ctx = sizeCanvas(canvas, w, h, dpr)
    if (!ctx) return

    mobileRef.current = isMobileViewport(w, h)
    setIsMobileLayout(mobileRef.current)
    if (!mobileRef.current) setTorchVisible(true)

    const fontRem = resolveFontRem(w, h)
    const { cellW, cellH, fontStack } = measureCell(ctx, fontRem)
    const cols = Math.max(1, Math.ceil(w / cellW))
    const rows = Math.max(1, Math.ceil(h / cellH))
    const total = cols * rows

    const letters = buildHeadlineLetters(cols, rows, resolvedHeadline, w, h)
    const revealed = new Uint8Array(total)

    if (!pointerRef.current.engaged) {
      pointerRef.current.x = w / 2
      pointerRef.current.y = h / 2
    }

    gridRef.current = {
      cols,
      rows,
      cellW,
      cellH,
      width: w,
      height: h,
      fontStack,
      letters,
      revealed,
    }

    const torch = torchRef.current
    if (torch) {
      positionTorch(
        torch,
        pointerRef.current.x,
        pointerRef.current.y,
        resolveTorchRadius(torchRadius, mobileRef.current),
      )
    }
  }, [resolvedHeadline, torchRadius])

  useEffect(() => {
    rebuildGrid()
    const section = sectionRef.current
    if (!section) return

    const ro = new ResizeObserver(() => rebuildGrid())
    ro.observe(section)
    return () => ro.disconnect()
  }, [rebuildGrid])

  useEffect(() => {
    const frame = () => {
      rafRef.current = requestAnimationFrame(frame)

      const canvas = canvasRef.current
      const torch = torchRef.current
      const grid = gridRef.current
      if (!canvas || !grid) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const { cols, rows, cellW, cellH, width, height, fontStack, letters, revealed } =
        grid
      const ptr = pointerRef.current
      const radius = resolveTorchRadius(torchRadius, mobileRef.current)
      const r2 = radius * radius
      const revealTorch = !mobileRef.current || torchVisible

      if (torch) {
        positionTorch(torch, ptr.x, ptr.y, radius)
      }

      if (revealTorch) {
        const col0 = Math.max(0, Math.floor((ptr.x - radius) / cellW))
        const col1 = Math.min(cols - 1, Math.ceil((ptr.x + radius) / cellW))
        const row0 = Math.max(0, Math.floor((ptr.y - radius) / cellH))
        const row1 = Math.min(rows - 1, Math.ceil((ptr.y + radius) / cellH))
        for (let row = row0; row <= row1; row++) {
          for (let col = col0; col <= col1; col++) {
            const px = (col + 0.5) * cellW - ptr.x
            const py = (row + 0.5) * cellH - ptr.y
            if (px * px + py * py <= r2) {
              revealed[row * cols + col] = 1
            }
          }
        }
      }

      ctx.clearRect(0, 0, width, height)
      ctx.font = fontStack
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.imageSmoothingEnabled = false

      ctx.fillStyle = REVEAL_FILL
      const lineBuf: string[] = []
      for (let row = 0; row < rows; row++) {
        lineBuf.length = 0
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col
          lineBuf.push(
            revealed[i]
              ? letters[i]
                ? String.fromCodePoint(letters[i])
                : '.'
              : ' ',
          )
        }
        ctx.fillText(lineBuf.join(''), 0, row * cellH)
      }
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [torchRadius, torchVisible])

  const engage = () => {
    if (!pointerRef.current.engaged) {
      pointerRef.current.engaged = true
      setExplored(true)
    }
  }

  const pointerFromEvent = (e: ReactPointerEvent<HTMLElement>) => {
    const section = sectionRef.current
    if (!section) return null
    const rect = section.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handlePointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (mobileRef.current && !torchVisible) return

    sectionRef.current?.setPointerCapture(e.pointerId)
    const ptr = pointerRef.current
    ptr.pressed = true
    ptr.movedWhilePressed = false

    engage()
    const pos = pointerFromEvent(e)
    if (pos) {
      ptr.x = pos.x
      ptr.y = pos.y
    }
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (mobileRef.current && !torchVisible) return

    const pos = pointerFromEvent(e)
    if (!pos) return

    const ptr = pointerRef.current

    if (ptr.pressed) {
      const dx = pos.x - ptr.x
      const dy = pos.y - ptr.y
      if (dx * dx + dy * dy > 4) ptr.movedWhilePressed = true
    }

    if (!ptr.engaged) {
      const radius = resolveTorchRadius(torchRadius, mobileRef.current)
      const dx = pos.x - ptr.x
      const dy = pos.y - ptr.y
      if (dx * dx + dy * dy > radius * radius) return
      engage()
    }

    ptr.x = pos.x
    ptr.y = pos.y
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLElement>) => {
    const ptr = pointerRef.current
    ptr.pressed = false

    if (mobileRef.current && ptr.movedWhilePressed) {
      setTorchVisible(false)
    }

    try {
      sectionRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }

  const resetModule = () => {
    const grid = gridRef.current
    const section = sectionRef.current
    if (grid) grid.revealed.fill(0)
    pointerRef.current.engaged = false
    pointerRef.current.pressed = false
    pointerRef.current.movedWhilePressed = false
    setTorchVisible(true)
    if (section) {
      const rect = section.getBoundingClientRect()
      pointerRef.current.x = rect.width / 2
      pointerRef.current.y = rect.height / 2
    }
    setExplored(false)
  }

  const showTorch = !isMobileLayout || torchVisible
  const effectiveTorchRadius = resolveTorchRadius(torchRadius, isMobileLayout)

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative min-h-[100svh] w-full overflow-hidden',
        bgClass,
        className,
      )}
      style={{
        touchAction: isMobileLayout && !torchVisible ? 'pan-y' : 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <motion.div
        ref={torchRef}
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: showTorch ? 1 : 0,
          scale: showTorch ? 1 : 0.9,
        }}
        transition={{ duration: torchTransition, ease }}
        style={{
          backgroundColor: NEON_YELLOW,
          width: '12rem',
          height: '12rem',
          left: '50%',
          top: '50%',
          marginLeft: '-6rem',
          marginTop: '-6rem',
          willChange: 'transform, left, top, opacity',
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 h-full w-full mix-blend-difference"
        aria-hidden
      />

      <h1 className="sr-only">{resolvedHeadline}</h1>

      <div
        className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 -translate-y-full"
        style={{
          top: `calc(50% - ${effectiveTorchRadius}px - 3rem)`,
        }}
      >
        <AnimatePresence>
          {!explored && (
            <motion.p
              key="hint"
              aria-hidden
              className={cn(
                'font-mono text-xs tracking-[0.28em]',
                tone === 'paper' ? 'text-black' : 'text-white',
              )}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                duration: appear,
                delay: reduceMotion ? 0 : 0.28,
                ease,
              }}
            >
              {isMobileLayout ? 'TOUCH TO EXPLORE' : 'CLICK TO EXPLORE'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <AnimatePresence>
          {explored && (
            <motion.button
              key="reset"
              type="button"
              className="rounded-full bg-[#F5FF3D] px-4 py-1.5 font-mono text-xs font-medium tracking-wide text-black"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: appear, ease }}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={resetModule}
            >
              Reset
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
