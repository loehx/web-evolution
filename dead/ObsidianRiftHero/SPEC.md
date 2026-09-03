# ObsidianRiftHero

## Creative direction

**Style:** Brutalist
**Typography:** Compressed grotesk display wedged into the rift wall; micro mono captions
**Layout:** A volcanic rift splits the viewport; a black glass shard floats in the void
**Color:** Basalt `#0d0d12` + obsidian `#1a1a2e` + violet fracture `#6b4ce6`
**Motion:** Scale-in on the shard (hero duration), then pointer orbit
**Signature:** Orbitable obsidian octahedron suspended in a glowing geological rift seam

## Role

- hero

## Look

A chasm you can reach into. The obsidian shard is the protagonist; type clings to the rift walls like strata labels.

## Motion

- Role: hero
- Moves: scale-in (entrance), pointer orbit
- Durations: `motionDuration.hero` entrance; orbit is direct
- prefers-reduced-motion: skip entrance; orbit remains

## Page behavior

- Root: `min-h-[100svh] w-full`
- Opening stage; no sticky chrome

## Neighbors

- Above: none (page start)
- Below: FerrisCardRing or any content stage

## Width model

- Full browser width (`w-full`); no `max-w-*` on root section

## Image ratios

- N/A — 3D CSS shard

## Headlines

- Primary: `ResponsiveHeadline` lines
- Secondary: subtitle as mono caption

## Responsive (mobile → tablet → desktop → large)

- Mobile: shard centered large; type as bottom overlay; orbit via tap-hold-drag
- Tablet: rift diagonal, shard right
- Desktop / large: shard ~50vw in void center-left; type pinned to rift wall
- Hover not required; drag is the interaction

## 3D

- Click/tap + hold + drag orbits X and Y via `usePointerOrbit`
