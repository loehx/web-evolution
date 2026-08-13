import {
  FaqAccordionStack,
  type FaqAccordionStackProps,
} from '../../staging/FaqAccordionStack/FaqAccordionStack'
import { faqAccordionStackVariants } from '../../staging/FaqAccordionStack/previews'
import {
  BreadcrumbTrail,
  type BreadcrumbTrailProps,
} from '../../staging/BreadcrumbTrail/BreadcrumbTrail'
import { breadcrumbTrailVariants } from '../../staging/BreadcrumbTrail/previews'
import {
  ModalSpotlight,
  type ModalSpotlightProps,
} from '../../staging/ModalSpotlight/ModalSpotlight'
import { modalSpotlightVariants } from '../../staging/ModalSpotlight/previews'
import {
  GradientMeshBand,
  type GradientMeshBandProps,
} from '../../staging/GradientMeshBand/GradientMeshBand'
import { gradientMeshBandVariants } from '../../staging/GradientMeshBand/previews'
import {
  CarouselCardDeck,
  type CarouselCardDeckProps,
} from '../../staging/CarouselCardDeck/CarouselCardDeck'
import { carouselCardDeckVariants } from '../../staging/CarouselCardDeck/previews'
import {
  OverlayCaptionCard,
  type OverlayCaptionCardProps,
} from '../../staging/OverlayCaptionCard/OverlayCaptionCard'
import { overlayCaptionCardVariants } from '../../staging/OverlayCaptionCard/previews'
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

const BATCH_3_CREATED = '2026-08-12T15:06:00Z'
const BATCH_2_CREATED = '2026-08-12T09:20:37Z'
const BATCH_1_CREATED = '2026-08-12T08:51:59Z'

export const stagedComponents: StagedComponent[] = [
  {
    name: 'FaqAccordionStack',
    slug: 'FaqAccordionStack',
    createdAt: BATCH_3_CREATED,
    variants: faqAccordionStackVariants,
    render: (props) => <FaqAccordionStack {...(props as FaqAccordionStackProps)} />,
  },
  {
    name: 'BreadcrumbTrail',
    slug: 'BreadcrumbTrail',
    createdAt: BATCH_2_CREATED,
    variants: breadcrumbTrailVariants,
    render: (props) => <BreadcrumbTrail {...(props as BreadcrumbTrailProps)} />,
  },
  {
    name: 'ModalSpotlight',
    slug: 'ModalSpotlight',
    createdAt: BATCH_2_CREATED,
    variants: modalSpotlightVariants,
    render: (props) => <ModalSpotlight {...(props as ModalSpotlightProps)} />,
  },
  {
    name: 'GradientMeshBand',
    slug: 'GradientMeshBand',
    createdAt: BATCH_2_CREATED,
    variants: gradientMeshBandVariants,
    render: (props) => <GradientMeshBand {...(props as GradientMeshBandProps)} />,
  },
  {
    name: 'CarouselCardDeck',
    slug: 'CarouselCardDeck',
    createdAt: BATCH_2_CREATED,
    variants: carouselCardDeckVariants,
    render: (props) => <CarouselCardDeck {...(props as CarouselCardDeckProps)} />,
  },
  {
    name: 'OverlayCaptionCard',
    slug: 'OverlayCaptionCard',
    createdAt: BATCH_2_CREATED,
    variants: overlayCaptionCardVariants,
    render: (props) => <OverlayCaptionCard {...(props as OverlayCaptionCardProps)} />,
  },
  {
    name: 'ParallaxHero',
    slug: 'ParallaxHero',
    createdAt: BATCH_1_CREATED,
    variants: parallaxHeroVariants,
    render: (props) => <ParallaxHero {...(props as ParallaxHeroProps)} />,
  },
  {
    name: 'MarqueeRibbon',
    slug: 'MarqueeRibbon',
    createdAt: BATCH_1_CREATED,
    variants: marqueeRibbonVariants,
    render: (props) => <MarqueeRibbon {...(props as MarqueeRibbonProps)} />,
  },
  {
    name: 'SkeletonReveal',
    slug: 'SkeletonReveal',
    createdAt: BATCH_1_CREATED,
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
    createdAt: BATCH_1_CREATED,
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
