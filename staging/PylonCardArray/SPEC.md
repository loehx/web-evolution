# PylonCardArray

## Reference

- **Source type:** CodePen
- **Awards URL:** (n/a)
- **Live / pen URL:** https://codepen.io/GreenSock/pen/RwKwLWK
- **Site / pen name:** GreenSock — Infinite scrolling, dragging, and snapping cards
- **Section lifted:** Horizontal card gallery with drag momentum and snap-to-center behavior
- **Why it fits the role:** Card slider with tactile drag rail, not a static 3-up grid
- **Adaptation notes:** Cards mount on steel transmission pylon cross-arms radiating from a central tower hub; industrial palette; full viewport

## Creative direction

**Reference:** https://codepen.io/GreenSock/pen/RwKwLWK — draggable snapping card gallery
**Style:** Brutalist
**Typography:** Bold condensed card titles; mono eyebrow like grid telemetry
**Layout:** Dark industrial void with cards on pylon cross-arm spokes from central tower
**Color:** Charcoal `#1a1e24` + steel `#8a8a8e` + warning amber `#f5a623`
**Motion:** Snap scroll on drag; active card lifts on center; hub slowly rotates
**Signature:** Stories ride steel pylon cross-arms radiating from a transmission tower hub
**Faithful to reference:** Drag-to-snap horizontal card rail with center focus
**Changed for repo:** Pylon spoke metaphor; props API; touch drag; reduced-motion instant snap

## Role

- card slider

## Look

Not a flat card row. Each story mounts on a steel cross-arm spoke radiating from a central transmission pylon — drag the rail to snap the next card to center focus.

## Motion

- Role: primary interaction
- Moves: snap scroll, card lift on active, hub rotation
- Durations: `motionDuration.standard` for snap; `motionDuration.emphasis` for hub spin
- prefers-reduced-motion: instant snap, no hub rotation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Horizontal snap rail centered vertically

## Neighbors

- Above: TundraFrostHero
- Below: IrisPetalSplit

## Width model

- Full browser width (`w-full`)

## Image ratios

- Card image: `4/5` — cropped with object-cover via RatioImage

## Headlines

- Section title: HTML h2 when provided

## Responsive (mobile → tablet → desktop → large)

- Mobile: full-width cards, touch drag, smaller hub
- Tablet: wider cards, arrow controls visible
- Desktop: cards on spoke angles, larger hub
- Large: extra card scale on active snap
