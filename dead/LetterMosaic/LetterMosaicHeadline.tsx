import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type LetterLayout = {
  points: { x: number; y: number }[]
  aspect: number
}

const SAMPLE_SIZE = 280
const GRID_STEP = 9
const TILE_SCALE = 0.088

function sampleLetter(char: string, fontFamily: string): LetterLayout {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return { points: [], aspect: 0.65 }

  const font = `600 ${SAMPLE_SIZE}px ${fontFamily}`
  ctx.font = font
  const metrics = ctx.measureText(char)
  const pad = SAMPLE_SIZE * 0.08
  const width = Math.ceil(metrics.width + pad * 2)
  const height = Math.ceil(SAMPLE_SIZE * 1.12)

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
  const points: { x: number; y: number }[] = []

  for (let y = GRID_STEP / 2; y < height; y += GRID_STEP) {
    for (let x = GRID_STEP / 2; x < width; x += GRID_STEP) {
      const row = Math.floor(y)
      const col = Math.floor(x)
      let sum = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const sx = col + dx
          const sy = row + dy
          if (sx < 0 || sy < 0 || sx >= width || sy >= height) continue
          const i = (sy * width + sx) * 4
          sum += data[i]!
        }
      }
      if (sum / 9 > 140) {
        points.push({ x: (x / width) * 100, y: (y / height) * 100 })
      }
    }
  }

  return { points, aspect: width / height }
}

function MosaicLetter({ char }: { char: string }) {
  const [layout, setLayout] = useState<LetterLayout | null>(null)

  useEffect(() => {
    if (char === ' ') {
      setLayout({ points: [], aspect: 0.32 })
      return
    }

    const fontFamily = getComputedStyle(document.documentElement).fontFamily
    setLayout(sampleLetter(char, fontFamily))
  }, [char])

  if (char === ' ') {
    return <span className="inline-block w-[0.32em]" aria-hidden />
  }

  if (!layout) {
    return (
      <span className="inline-block opacity-0" style={{ width: '0.65em', height: '1em' }} aria-hidden>
        {char}
      </span>
    )
  }

  return (
    <span
      className="relative inline-block align-bottom"
      style={{ width: `${layout.aspect}em`, height: '1em' }}
      aria-hidden
    >
      {layout.points.map((point, index) => (
        <span
          key={index}
          className="absolute font-semibold leading-none text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${TILE_SCALE}em`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export function LetterMosaicHeadline({
  headline,
  className,
}: {
  headline: string
  className?: string
}) {
  const letters = Array.from(headline)

  return (
    <h1 className={cn(className)}>
      <span className="sr-only">{headline}</span>
      <span className="inline-flex flex-wrap items-end tracking-[-0.04em]" aria-hidden>
        {letters.map((char, index) => (
          <MosaicLetter key={`${char}-${index}`} char={char} />
        ))}
      </span>
    </h1>
  )
}
