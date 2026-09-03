import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbTrailProps {
  items: BreadcrumbItem[]
  separator?: 'slash' | 'chevron' | 'dot'
  className?: string
}

function Separator({ type }: { type: BreadcrumbTrailProps['separator'] }) {
  if (type === 'chevron') {
    return (
      <span aria-hidden className="text-zinc-600">
        ›
      </span>
    )
  }
  if (type === 'dot') {
    return (
      <span aria-hidden className="text-zinc-600">
        ·
      </span>
    )
  }
  return (
    <span aria-hidden className="text-zinc-600">
      /
    </span>
  )
}

/**
 * Accessible breadcrumb trail with animated underline on the current page.
 */
export function BreadcrumbTrail({
  items,
  separator = 'slash',
  className,
}: BreadcrumbTrailProps) {
  if (items.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className={cn('text-sm text-zinc-500', className)}>
        <span className="italic">No path</span>
      </nav>
    )
  }

  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const content: ReactNode = isLast ? (
            <span
              aria-current="page"
              className="relative font-medium text-zinc-100 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-violet-400 after:content-['']"
            >
              {item.label}
            </span>
          ) : item.href ? (
            <a
              href={item.href}
              className="text-zinc-400 transition hover:text-violet-300"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-zinc-400">{item.label}</span>
          )

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {content}
              {!isLast && <Separator type={separator} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
