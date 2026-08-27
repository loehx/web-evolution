# ZephyrGaleHero

## Reference

- **Source type:** award site
- **Awards URL:** https://www.awwwards.com/sites/lightship-2
- **Live / pen URL:** https://lightshiprv.com/
- **Site / pen name:** Lightship (Locomotive, SOTD Jan 13 2026)
- **Section lifted:** Homepage hero — atmospheric full-bleed sky gradient with oversized display type and a floating product centerpiece
- **Why it fits the role:** Cinematic first viewport with environmental motion and a focal 3D object, not a centered SaaS block
- **Adaptation notes:** Replace RV with grabable wind-crystal octahedron; cyan gale streaks instead of sky video; tokens + ResponsiveHeadline

## Creative direction

**Reference:** https://lightshiprv.com/ — homepage hero atmospheric intro
**Style:** Futuristic
**Typography:** Light condensed SVG headlines; airy mono eyebrow
**Layout:** Gale sky gradient with copy anchored left and wind crystal stage right
**Color:** Pale cyan `#b8e8f4` + storm slate `#1a2838` + white mist `#f0fafc`
**Motion:** Horizontal wind streaks; hero fade-up for copy; crystal orbit on drag
**Signature:** A grabable translucent wind-crystal octahedron rotating in horizontal gale streaks
**Faithful to reference:** Atmospheric full-bleed hero, environmental motion, focal 3D centerpiece
**Changed for repo:** CSS 3D crystal instead of WebGL RV; props API; reduced-motion; touch orbit

## Role

- hero (3D orbit)

## Look

Not a centered SaaS hero. Copy rides the gale while a translucent wind-crystal octahedron floats in horizontal streaks — every facet catches cyan light as you orbit.

## Motion

- Role: hero
- Moves: fade-up for copy, wind streak slide, crystal orbit on pointer drag
- Durations: `motionDuration.hero` for headline; `motionDuration.standard` for streaks
- prefers-reduced-motion: static crystal, no streak animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Two-column on desktop; stacked on mobile

## Neighbors

- Above: page top
- Below: OrreryPlanetDeck

## Width model

- Full browser width; no max-width on root

## Image ratios

- N/A (3D CSS wind crystal)

## Headlines

- Primary: ResponsiveHeadline with explicit lines

## Responsive (mobile → tablet → desktop → large)

- Mobile: copy above crystal stage; smaller type; touch orbit
- Tablet: side-by-side with reduced crystal scale
- Desktop: full two-column; gale streaks across viewport
- Large: crystal scales with viewport; copy uses extra left margin

## 3D

- Click/tap + hold + drag orbits X (pitch) and Y (yaw) via `usePointerOrbit`
- CSS 3D octahedron with translucent cyan facet textures
