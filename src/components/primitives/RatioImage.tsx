import { cn } from '@/lib/utils'

/** Common aspect ratios for image slots. */
export type ImageRatio =
  | '16/9'
  | '16/10'
  | '4/3'
  | '3/4'
  | '1/1'
  | `${number}/${number}`

const ratioClasses: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '16/10': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
}

function ratioClass(ratio: ImageRatio) {
  return ratioClasses[ratio] ?? `aspect-[${ratio}]`
}

export interface RatioImageProps {
  src?: string
  alt?: string
  /** Required — image is cropped with object-cover when source aspect differs. */
  ratio: ImageRatio
  className?: string
  imgClassName?: string
}

/**
 * Full-width image in a fixed aspect-ratio box. Unlike-sized sources are center-cropped.
 */
export function RatioImage({
  src,
  alt = '',
  ratio,
  className,
  imgClassName,
}: RatioImageProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', ratioClass(ratio), className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn('absolute inset-0 h-full w-full object-cover object-center', imgClassName)}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800" aria-hidden />
      )}
    </div>
  )
}
