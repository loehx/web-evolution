import { cn } from '@/lib/utils'

export interface ResponsiveHeadlineProps {
  /** Each entry is one line; line breaks are explicit, not browser-wrapped. */
  lines: string[]
  /** Semantic level for the accessible fallback. */
  level?: 1 | 2 | 3
  className?: string
  /** SVG viewBox width — height is derived from line count. */
  viewBoxWidth?: number
  /** Font size in viewBox units. */
  fontSize?: number
  /** Line advance in viewBox units. */
  lineHeight?: number
}

/**
 * Headline rendered as a width-responsive SVG so line breaks and scale track the container.
 */
export function ResponsiveHeadline({
  lines,
  level = 1,
  className,
  viewBoxWidth = 1200,
  fontSize = 96,
  lineHeight = 108,
}: ResponsiveHeadlineProps) {
  const filtered = lines.filter(Boolean)
  const label = filtered.join(' ')
  const viewBoxHeight = Math.max(lineHeight, filtered.length * lineHeight)
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'

  if (filtered.length === 0) {
    return null
  }

  return (
    <Tag className={cn('w-full', className)}>
      <span className="sr-only">{label}</span>
      <svg
        aria-hidden
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto text-white"
        role="img"
      >
        <text
          x="0"
          y={fontSize}
          fill="currentColor"
          fontSize={fontSize}
          fontWeight={800}
          fontFamily="var(--font-sans, Inter, ui-sans-serif, system-ui, sans-serif)"
          letterSpacing="-0.02em"
        >
          {filtered.map((line, index) => (
            <tspan key={line + index} x="0" dy={index === 0 ? 0 : lineHeight}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </Tag>
  )
}
