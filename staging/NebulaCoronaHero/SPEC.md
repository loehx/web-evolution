# NebulaCoronaHero

## Reference

- **Source type:** award site
- **Awards URL:** https://www.awwwards.com/sites/radian
- **Live / pen URL:** https://www.rideradian.com/
- **Site / pen name:** Radian (UNCOMMON, SOTD Jul 4 2026)
- **Section lifted:** Homepage hero — dark immersive launch viewport with oversized display type and a floating product centerpiece in atmospheric void
- **Why it fits the role:** Cinematic first viewport with environmental depth and a focal 3D object, not a centered SaaS block
- **Adaptation notes:** Replace motorbike with grabable corona icosahedron in nebula gas clouds; violet/magenta nebula instead of lime/black; tokens + ResponsiveHeadline

## Creative direction

**Reference:** https://www.rideradian.com/ — homepage hero launch intro
**Style:** Futuristic
**Typography:** Massive condensed SVG headlines; mono eyebrow like telemetry readout
**Layout:** Deep space nebula gradient with copy anchored left and corona sphere stage right
**Color:** Deep violet `#1a0a2e` + magenta corona `#e040fb` + star white `#f8f4ff`
**Motion:** Drifting nebula clouds; hero fade-up for copy; corona orbit on drag
**Signature:** A grabable glowing corona icosahedron rotating inside drifting magenta nebula gas
**Faithful to reference:** Dark immersive hero, environmental atmosphere, focal 3D centerpiece
**Changed for repo:** CSS 3D icosahedron instead of WebGL bike; props API; reduced-motion; touch orbit

## Role

- hero (3D orbit)

## Look

Not a centered SaaS hero. Copy rides the nebula void while a corona icosahedron pulses inside drifting gas clouds — every facet catches magenta light as you orbit.

## Motion

- Role: hero
- Moves: fade-up for copy, nebula drift, corona orbit on pointer drag
- Durations: `motionDuration.hero` for headline; `motionDuration.emphasis` for nebula
- prefers-reduced-motion: static corona, no cloud drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Full viewport stage; corona stage occupies right half on desktop

## Neighbors

- Above: (page start)
- Below: PlinthCardPedestal

## Width model

- Full browser width (`w-full`); no max-width on root

## Image ratios

- N/A (CSS 3D centerpiece)

## Headlines

- Primary: ResponsiveHeadline with explicit `lines[]`

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked — headline above, corona below at 50svh
- Tablet: same stack with larger type
- Desktop: 50/50 split — copy left, corona right
- Large: extra headline scale; corona grows to min(55vw, 340px)

## 3D

- Click/tap + hold + drag orbits X (pitch) and Y (yaw) via `usePointerOrbit`
- Touch works; corona icosahedron with glowing edges
