import {
  ParallaxHero,
  type ParallaxHeroProps,
} from '../../staging/ParallaxHero/ParallaxHero'
import { parallaxHeroVariants } from '../../staging/ParallaxHero/previews'
import {
  MarqueeRibbon,
  type MarqueeRibbonProps,
} from '../../staging/MarqueeRibbon/MarqueeRibbon'
import { marqueeRibbonVariants } from '../../staging/MarqueeRibbon/previews'
import {
  SkeletonReveal,
  FeatureCardSkeleton,
  type SkeletonRevealProps,
} from '../../staging/SkeletonReveal/SkeletonReveal'
import { skeletonRevealVariants } from '../../staging/SkeletonReveal/previews'
import {
  ViewportSnapDeck,
  ViewportSnapSlide,
  type ViewportSnapDeckProps,
} from '../../staging/ViewportSnapDeck/ViewportSnapDeck'
import { viewportSnapDeckVariants } from '../../staging/ViewportSnapDeck/previews'
import type { StagedComponent } from '@/previews/types'

export const stagedComponents: StagedComponent[] = [
  {
    name: 'ParallaxHero',
    slug: 'ParallaxHero',
    variants: parallaxHeroVariants,
    render: (props) => <ParallaxHero {...(props as ParallaxHeroProps)} />,
  },
  {
    name: 'MarqueeRibbon',
    slug: 'MarqueeRibbon',
    variants: marqueeRibbonVariants,
    render: (props) => <MarqueeRibbon {...(props as MarqueeRibbonProps)} />,
  },
  {
    name: 'SkeletonReveal',
    slug: 'SkeletonReveal',
    variants: skeletonRevealVariants,
    render: (props) => {
      const p = props as SkeletonRevealProps & { demoLoaded?: boolean }
      return (
        <div className="mx-auto max-w-xl p-8">
          <SkeletonReveal
            isLoading={p.isLoading}
            skeleton={p.skeleton ?? <FeatureCardSkeleton />}
          >
            {p.children}
          </SkeletonReveal>
        </div>
      )
    },
  },
  {
    name: 'ViewportSnapDeck',
    slug: 'ViewportSnapDeck',
    variants: viewportSnapDeckVariants,
    render: (props) => {
      const p = props as ViewportSnapDeckProps & { slides?: string[] }
      const slides = p.slides ?? ['Slide A', 'Slide B', 'Slide C']
      return (
        <ViewportSnapDeck enabled={p.enabled ?? true} hideScrollbar={p.hideScrollbar ?? true}>
          {slides.map((title, index) => (
            <ViewportSnapSlide
              key={title}
              id={`slide-${index + 1}`}
              className="bg-zinc-900"
            >
              <h2 className="text-center text-4xl font-bold text-white">{title}</h2>
            </ViewportSnapSlide>
          ))}
        </ViewportSnapDeck>
      )
    },
  },
]

export const previewBaseUrl =
  typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'

export function getPreviewLinks() {
  return stagedComponents.map(
    (component) => `${previewBaseUrl}/${component.slug}`,
  )
}
