# MagmaCoreHero

## Reference

- **Source type:** award site
- **Awards URL:** https://www.awwwards.com/sites/trionn-2
- **Live / pen URL:** https://www.trionn.studio/
- **Site / pen name:** TRIONN (SOTD Jul 27 2026)
- **Section lifted:** Services hero — 3D mark with particle orbit and hold-to-blast interaction in volcanic dark void
- **Why it fits the role:** Immersive first viewport with a grabable 3D centerpiece, not a centered SaaS block
- **Adaptation notes:** Replace particle mark with grabable magma dodecahedron in lava glow; orange/red magma palette; tokens + ResponsiveHeadline

## Creative direction

**Reference:** https://www.trionn.studio/ — services hero 3D mark orbit
**Style:** Futuristic
**Typography:** Massive condensed SVG headlines; mono eyebrow like heat telemetry
**Layout:** Volcanic void gradient with copy anchored left and magma core stage right
**Color:** Charcoal `#1a0a08` + magma orange `#ff4500` + ember white `#fff4e8`
**Motion:** Lava pulse glow; hero fade-up for copy; magma core orbit on drag
**Signature:** A grabable glowing magma dodecahedron rotating inside pulsing lava heat haze
**Faithful to reference:** Dark immersive hero, environmental heat atmosphere, focal 3D centerpiece
**Changed for repo:** CSS 3D dodecahedron instead of WebGL; props API; reduced-motion; touch orbit

## Role

- hero (3D orbit)

## Look

Not a centered SaaS hero. Copy rides the volcanic void while a magma dodecahedron pulses inside heat haze — every facet catches orange light as you orbit.

## Motion

- Role: hero
- Moves: fade-up for copy, lava pulse, magma orbit on pointer drag
- Durations: `motionDuration.hero` for headline; `motionDuration.emphasis` for lava pulse
- prefers-reduced-motion: static core, no pulse drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Full viewport stage; magma core occupies right half on desktop

## Neighbors

- Above: (page start)
- Below: TurbineBladeCarousel

## Width model

- Full browser width (`w-full`); no max-width on root

## Image ratios

- N/A (CSS 3D centerpiece)

## Headlines

- Primary: ResponsiveHeadline with explicit `lines[]`

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked — headline above, magma core below at 50svh
- Tablet: same stack with larger type
- Desktop: 50/50 split — copy left, magma core right
- Large: extra headline scale; core grows to min(55vw, 340px)

## 3D

- Click/tap + hold + drag orbits X (pitch) and Y (yaw) via `usePointerOrbit`
- Touch works; magma dodecahedron with glowing edges
