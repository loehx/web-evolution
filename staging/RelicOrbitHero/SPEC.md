# RelicOrbitHero

## Creative direction

**Style:** Brutalist
**Typography:** Crushed grotesk display jammed into a corner; tiny industrial captions
**Layout:** Type occupies a bottom-left slab; a physical relic owns the rest of the stage
**Color:** Tar `#1a1410` + bone `#f4e8d0` + rust `#c45c26`
**Motion:** Scale-in on the relic (hero duration), then the user orbits
**Signature:** An orbitable 3D bronze cube-artifact, not a centered SaaS headline stack

## Look

A monument you can grab. Display type is secondary to the object. Faces are labeled so rotation is readable.

## Motion

- Role: hero
- Moves: scale-in (entrance), then pointer orbit
- Durations: `motionDuration.hero` entrance; orbit is direct
- prefers-reduced-motion: skip entrance; orbit remains

## Page behavior

- Root: `min-h-[100svh] w-full`
- Opening stage; no sticky chrome

## Neighbors

- Above: none (page start)
- Below: TideCardRail or any content stage — relic should not bleed scroll-jacking

## Responsive (mobile → tablet → desktop → large)

- Mobile: relic centered and large; type as a bottom overlay strip; orbit via tap-hold-drag
- Tablet: relic right, type left
- Desktop / large: relic ~55vw, type pinned bottom-left, huge display
- Hover not required; drag is the interaction

## 3D

- Click/tap + hold + drag orbits X and Y via `usePointerOrbit`
