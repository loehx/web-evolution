import type { TesseraDriftSettings } from './tesseraSettings'
import { TESSERA_GROUP_DEBUG_COLORS } from './tesseraSettings'

export type TesseraItem = {
  x: number
  y: number
  size: number
  depth: number
  spreadX: number
  color: string
}

export type TesseraLayout = {
  width: number
  height: number
  items: TesseraItem[]
}

type Point = { x: number; y: number }

const SAMPLE_CANVAS_SIZE = 320

function resolveFontFamily() {
  if (typeof document === 'undefined') {
    return '"Inter", "Helvetica Neue", Arial, sans-serif'
  }
  return getComputedStyle(document.documentElement).fontFamily
}

export function mulberry32(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function cellIsFilled(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  left: number,
  top: number,
  cellSize: number,
  threshold: number,
) {
  const right = Math.min(left + cellSize, width)
  const bottom = Math.min(top + cellSize, height)
  let filled = 0
  let total = 0

  for (let y = top; y < bottom; y++) {
    for (let x = left; x < right; x++) {
      const i = (y * width + x) * 4
      const alpha = data[i + 3]!
      if (alpha < 32) continue
      total += 1
      if (data[i]! >= threshold) filled += 1
    }
  }

  if (total === 0) return false
  return filled / total >= 0.45
}

function resolveGridStep(squareSize: number, density: number): number {
  const clamped = Math.max(20, Math.min(200, density))
  return Math.max(4, Math.round(squareSize * Math.sqrt(100 / clamped)))
}

function sampleLetterGrid(
  char: string,
  settings: Pick<
    TesseraDriftSettings,
    'fontWeight' | 'sampleThreshold' | 'letterScale' | 'squareSize' | 'squareCount'
  >,
  fontFamily: string,
  gridStep: number,
): { points: Point[]; width: number; height: number; gridStep: number } {
  if (char === ' ') {
    return { points: [], width: 0, height: 0, gridStep }
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { points: [], width: 0, height: 0, gridStep }

  const fontSize = SAMPLE_CANVAS_SIZE * (settings.letterScale / 100)
  const font = `${settings.fontWeight} ${fontSize}px ${fontFamily}`
  const capHeight = Math.ceil(fontSize * 1.12)

  ctx.font = font
  const metrics = ctx.measureText(char)
  const pad = fontSize * 0.08
  const width = Math.ceil(metrics.width + pad * 2)
  const height = capHeight

  canvas.width = width
  canvas.height = height

  ctx.font = font
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(char, width / 2, height / 2)

  const data = ctx.getImageData(0, 0, width, height).data
  const points: Point[] = []

  for (let top = 0; top < height; top += gridStep) {
    for (let left = 0; left < width; left += gridStep) {
      if (
        cellIsFilled(
          data,
          width,
          height,
          left,
          top,
          gridStep,
          settings.sampleThreshold,
        )
      ) {
        points.push({ x: left, y: top })
      }
    }
  }

  if (points.length === 0) {
    return { points: [], width: 0, height: capHeight, gridStep }
  }

  const minX = Math.min(...points.map((point) => point.x))
  const maxX = Math.max(...points.map((point) => point.x))

  return {
    points: points.map((point) => ({
      x: point.x - minX,
      y: point.y,
    })),
    width: maxX - minX + gridStep,
    height: capHeight,
    gridStep,
  }
}

function sampleLetterPoints(
  char: string,
  settings: Pick<
    TesseraDriftSettings,
    | 'fontWeight'
    | 'sampleThreshold'
    | 'letterScale'
    | 'squareSize'
    | 'squareCount'
  >,
  fontFamily: string,
): { points: Point[]; width: number; height: number; gridStep: number } {
  const gridStep = resolveGridStep(settings.squareSize, settings.squareCount)
  return sampleLetterGrid(char, settings, fontFamily, gridStep)
}

function applyJitter(value: number, amount: number, rng: () => number) {
  if (amount <= 0) return value
  return value + (rng() * 2 - 1) * amount
}

function createItem(
  x: number,
  y: number,
  size: number,
  settings: TesseraDriftSettings,
  rng: () => number,
): TesseraItem {
  return {
    x,
    y,
    size,
    depth: settings.depthMin + rng() * (settings.depthMax - settings.depthMin),
    spreadX: rng() * 2 - 1,
    color:
      TESSERA_GROUP_DEBUG_COLORS[
        Math.floor(rng() * TESSERA_GROUP_DEBUG_COLORS.length)
      ]!,
  }
}

export function buildTesseraLayout(settings: TesseraDriftSettings): TesseraLayout {
  const rng = mulberry32(settings.seed)
  const fontFamily = resolveFontFamily()
  const chars = Array.from(settings.headline.trim() || 'Hello World')
  const letterGap = settings.letterScale * settings.letterSpacing
  const wordGap = letterGap * 6

  const items: TesseraItem[] = []
  let cursorX = 0
  let maxLetterHeight = 0

  for (const char of chars) {
    if (char === ' ') {
      cursorX += wordGap
      continue
    }

    const letter = sampleLetterPoints(char, settings, fontFamily)
    const letterWidth = letter.width || settings.squareSize * 2
    maxLetterHeight = Math.max(maxLetterHeight, letter.height)
    const tileSize = Math.min(settings.squareSize, letter.gridStep)

    for (const point of letter.points) {
      items.push(
        createItem(
          cursorX + applyJitter(point.x, settings.jitter, rng),
          applyJitter(point.y, settings.jitter, rng),
          tileSize,
          settings,
          rng,
        ),
      )
    }

    cursorX += letterWidth + letterGap
  }

  if (items.length === 0) {
    return { width: 0, height: 0, items: [] }
  }

  const totalWidth = Math.max(cursorX - letterGap, 0)
  const tileSize = settings.squareSize

  if (settings.cloudCount > 0) {
    const padX = Math.max(totalWidth * 0.42, tileSize * 8)
    const padY = Math.max(maxLetterHeight * 0.48, tileSize * 8)

    for (let index = 0; index < settings.cloudCount; index++) {
      items.push(
        createItem(
          applyJitter(-padX + rng() * (totalWidth + padX * 2), settings.jitter, rng),
          applyJitter(-padY + rng() * (maxLetterHeight + padY * 2), settings.jitter, rng),
          tileSize,
          settings,
          rng,
        ),
      )
    }
  }

  let boundsMinX = Infinity
  let boundsMinY = Infinity
  let boundsMaxX = -Infinity
  let boundsMaxY = -Infinity

  for (const item of items) {
    boundsMinX = Math.min(boundsMinX, item.x)
    boundsMinY = Math.min(boundsMinY, item.y)
    boundsMaxX = Math.max(boundsMaxX, item.x + item.size)
    boundsMaxY = Math.max(boundsMaxY, item.y + item.size)
  }

  const normalizedItems = items.map((item) => ({
    ...item,
    x: item.x - boundsMinX,
    y: item.y - boundsMinY,
  }))

  return {
    width: boundsMaxX - boundsMinX,
    height: boundsMaxY - boundsMinY,
    items: normalizedItems,
  }
}
