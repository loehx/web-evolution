import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ShimmerBlockProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  animate?: boolean
}

/**
 * Single shimmer placeholder block.
 * Adapted from shadcn/ui + unlumen ShimmerSkeleton patterns.
 */
export function ShimmerBlock({
  className,
  rounded = 'md',
  animate = true,
  ...props
}: ShimmerBlockProps) {
  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[rounded]

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('relative overflow-hidden bg-zinc-800/80', roundedClass, className)}
      {...props}
    >
      {animate ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          }}
        />
      ) : null}
    </div>
  )
}

export interface SkeletonRevealProps {
  isLoading: boolean
  skeleton: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Crossfades from skeleton layout to real content without layout shift.
 */
export function SkeletonReveal({
  isLoading,
  skeleton,
  children,
  className,
}: SkeletonRevealProps) {
  return (
    <div className={cn('relative', className)}>
      <div
        aria-hidden={!isLoading}
        className={cn(
          'transition-opacity duration-500 ease-out',
          isLoading ? 'relative opacity-100' : 'pointer-events-none absolute inset-0 opacity-0',
        )}
      >
        {skeleton}
      </div>
      <div
        aria-hidden={isLoading}
        className={cn(
          'transition-opacity duration-500 ease-out',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function FeatureCardSkeleton() {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
      <div className="flex items-start gap-4">
        <ShimmerBlock className="size-14 shrink-0" rounded="lg" />
        <div className="flex-1 space-y-3">
          <ShimmerBlock className="h-4 w-2/3" />
          <ShimmerBlock className="h-3 w-full" />
          <ShimmerBlock className="h-3 w-5/6" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <ShimmerBlock className="h-16" rounded="lg" />
        <ShimmerBlock className="h-16" rounded="lg" />
        <ShimmerBlock className="h-16" rounded="lg" />
      </div>
    </article>
  )
}
