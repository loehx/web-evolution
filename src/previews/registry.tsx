import {
  StaggeredTextReveal,
  type StaggeredTextRevealProps,
} from '../../staging/StaggeredTextReveal/StaggeredTextReveal'
import { staggeredTextRevealVariants } from '../../staging/StaggeredTextReveal/previews'
import type { StagedComponent } from '@/previews/types'

const STAGGERED_TEXT_REVEAL_CREATED = '2026-09-24T13:27:00Z'

export const stagedComponents: StagedComponent[] = [
  {
    name: 'StaggeredTextReveal',
    slug: 'StaggeredTextReveal',
    createdAt: STAGGERED_TEXT_REVEAL_CREATED,
    variants: staggeredTextRevealVariants,
    render: (props) => <StaggeredTextReveal {...(props as StaggeredTextRevealProps)} />,
  },
]

export const previewBaseUrl =
  typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

export function getPreviewLinks() {
  return stagedComponents.map(
    (component) => `${previewBaseUrl}/${component.slug}`,
  )
}
