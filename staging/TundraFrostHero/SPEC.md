# TundraFrostHero

## Reference

- **Source type:** award site
- **Awards URL:** https://www.awwwards.com/sites/ciao-energy-launch-website
- **Live / pen URL:** https://ciao.energy/
- **Site / pen name:** CIAO ENERGY — Launch Website (SOTD Jul 30 2026)
- **Section lifted:** Hero with infinite scrolling — minimalist identity with interactive 3D object centerpiece in cold void
- **Why it fits the role:** Immersive first viewport with grabable 3D focal object, not a centered SaaS block
- **Adaptation notes:** Replace drink can with grabable frost crystal in arctic haze; ice-blue tundra palette; tokens + ResponsiveHeadline

## Creative direction

**Reference:** https://ciao.energy/ — hero with interactive 3D object
**Style:** Futuristic
**Typography:** Massive condensed SVG headlines; mono eyebrow like polar telemetry
**Layout:** Arctic void gradient with copy anchored left and frost crystal stage right
**Color:** Deep tundra `#0a1420` + ice cyan `#a8e6ff` + frost white `#f0f8ff`
**Motion:** Aurora shimmer; hero fade-up for copy; frost crystal orbit on drag
**Signature:** A grabable translucent ice octahedron rotating inside drifting polar mist
**Faithful to reference:** Minimal immersive hero, environmental atmosphere, focal 3D centerpiece
**Changed for repo:** CSS 3D octahedron instead of WebGL; props API; reduced-motion; touch orbit

## Role

- hero (3D orbit)

## Look

Not a centered SaaS hero. Copy rides the arctic void while a frost crystal drifts inside polar haze — every facet catches cyan light as you orbit.

## Motion

- Role: hero
- Moves: fade-up for copy, aurora shimmer, frost orbit on pointer drag
- Durations: `motionDuration.hero` for headline; `motionDuration.emphasis` for aurora pulse
- prefers-reduced-motion: static core, no aurora drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Full viewport stage; frost crystal occupies right half on desktop

## Neighbors

- Above: (page start)
- Below: PylonCardArray

## Width model

- Full browser width (`w-full`); no max-width on root

## Image ratios

- N/A (CSS 3D centerpiece)

## Headlines

- Primary: ResponsiveHeadline with explicit `lines[]`

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked — headline above, frost crystal below at 50svh
- Tablet: same stack with larger type
- Desktop: 50/50 split — copy left, frost crystal right
- Large: extra headline scale; core grows to min(55vw, 340px)

## 3D

- Click/tap + hold + drag orbits X (pitch) and Y (yaw) via `usePointerOrbit`
- Touch works; frost octahedron with icy edges
