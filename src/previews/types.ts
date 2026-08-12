import type { ReactNode } from 'react'

export interface PreviewVariant<TProps = unknown> {
  id: number
  label: string
  props: TProps
}

export interface StagedComponent<TProps = unknown> {
  name: string
  slug: string
  variants: PreviewVariant<TProps>[]
  render: (props: TProps) => ReactNode
}

export const PLACEHOLDER_PORTRAIT =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=900&fit=crop'
export const PLACEHOLDER_LANDSCAPE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop'
export const PLACEHOLDER_BROKEN = 'https://example.invalid/broken.jpg'
export const SAMPLE_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
