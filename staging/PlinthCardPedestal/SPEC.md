# PlinthCardPedestal

## Reference

- **Source type:** CodePen
- **Live / pen URL:** https://codepen.io/GreenSock/pen/RwKwLWK
- **Site / pen name:** GreenSock — Infinite scrolling, dragging, and snapping cards
- **Section lifted:** Horizontal draggable card track with momentum and snap between cards
- **Why it fits the role:** Card slider with drag interaction and visual depth between cards
- **Adaptation notes:** Cards rest on ascending stone plinth pedestals; full viewport; React state instead of GSAP

## Creative direction

**Reference:** https://codepen.io/GreenSock/pen/RwKwLWK — draggable horizontal card carousel
**Style:** Brutalist
**Typography:** Heavy slab serif card titles; mono eyebrow
**Layout:** Horizontal snap rail where each card sits on a taller stone plinth than the last
**Color:** Limestone `#d4cfc4` + charcoal `#1c1c1e` + shadow `#0a0a0c`
**Motion:** Drag-to-scroll with snap; plinth shadow deepens on active card
**Signature:** Stories ascend on staggered stone plinth pedestals along a horizontal drag rail
**Faithful to reference:** Horizontal drag carousel, snap between cards, momentum feel
**Changed for repo:** Plinth metaphor, full viewport, props API, touch swipe

## Role

- card slider

## Look

Not a flat carousel. Each story card rises from an ascending limestone plinth — drag the rail to bring the next pedestal into center focus.

## Motion

- Role: primary interaction
- Moves: horizontal snap scroll, scale-in on active card, plinth shadow emphasis
- Durations: `motionDuration.standard` for snap; `motionDuration.emphasis` for active lift
- prefers-reduced-motion: instant snap, no lift animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Horizontal overflow scroll with snap points

## Neighbors

- Above: NebulaCoronaHero
- Below: CinderAshSplit

## Width model

- Full browser width; cards bleed off viewport edges

## Image ratios

- Card image: 4/5 — cropped with object-cover via RatioImage

## Headlines

- Card title as HTML; section title optional

## Responsive (mobile → tablet → desktop → large)

- Mobile: single card width 85vw, swipe drag
- Tablet: 70vw cards
- Desktop: 55vw active card with peek of neighbors
- Large: wider cards, taller plinths
