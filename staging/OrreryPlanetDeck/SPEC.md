# OrreryPlanetDeck

## Reference

- **Source type:** CodePen
- **Live / pen URL:** https://codepen.io/GreenSock/pen/RwwLXX
- **Site / pen name:** GreenSock — Horizontal scroll sections
- **Section lifted:** Horizontal card track with snap and drag — scaled to orbital ring layout
- **Why it fits the role:** Card stories advance on a spatial track, not a generic carousel dots UI
- **Adaptation notes:** Cards sit on concentric orbital rings like a planetarium orrery; swipe advances orbit position

## Creative direction

**Reference:** https://codepen.io/GreenSock/pen/RwwLXX — horizontal scroll card track
**Style:** Luxury
**Typography:** Serif card titles; gold mono eyebrow
**Layout:** Dark planetarium dome with cards on elliptical orbital rings
**Color:** Deep space `#0a0818` + gold orbit `#d4a84b` + ivory copy `#f4efe6`
**Motion:** Ring rotation on card change; ripple pulse along orbit path
**Signature:** Stories ride elliptical orbital rings like a brass orrery — swipe spins the mechanism
**Faithful to reference:** Horizontal card advancement with drag/swipe
**Changed for repo:** Radial orbital metaphor; full viewport; props API; reduced-motion

## Role

- card slider (image + text per card)

## Look

Not a horizontal scroll row. Cards sit on brass orbital rings in a planetarium dome — swipe or arrows spin the orrery to bring the next story to the front position.

## Motion

- Role: primary interaction
- Moves: ring rotation, card fade-in, orbit pulse
- Durations: `motionDuration.emphasis` for ring spin; `motionDuration.standard` for card reveal
- prefers-reduced-motion: instant card swap, static rings

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered orrery stage with header eyebrow top-left

## Neighbors

- Above: ZephyrGaleHero
- Below: BrocadeLoomSplit

## Width model

- Full browser width

## Image ratios

- Card image: `16/10` — cropped with object-cover via RatioImage

## Headlines

- Section title: HTML h2 (secondary to card titles)

## Responsive (mobile → tablet → desktop → large)

- Mobile: smaller rings; swipe gesture; compact card
- Tablet: medium ring scale
- Desktop: full orrery with arrow controls
- Large: rings expand to use width
