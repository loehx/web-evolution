# AetherHandset

## Creative direction

**Style:** Futuristic
**Typography:** Oversized display headline at `20vw` by default, hairline tracking; tagline / subheadline / body in rem only
**Layout:** Type overlays the empty half of a full-bleed 3D void; a titanium iPhone occupies the other half
**Color:** Deep indigo-void `#07061a` + magenta/cyan nebula gradients + titanium `#c9c6c0` + black glass
**Motion:** Hero fade-in of the world; idle float (parallax) on the handset; pointer orbit is the primary interaction
**Signature:** A photoreal iPhone you can flip in a gradient void — not a bronze cube, not a duck pond

## Role

- hero

## Look

A 3D world is the page: a dark space with soft volumetric-looking color gradients (nebula washes, no stars-as-particles). A real-feeling iPhone (titanium chassis, glass face, Dynamic Island, camera bump, side buttons, screen image) floats in that world. Copy sits on the empty side of the stage and never lives in a card.

## Motion

- Role: hero stage; primary interaction is pointer orbit of the phone
- Moves: fade-in (canvas/copy mount), parallax (idle float), no marquee
- Durations: fade-in `motionDuration.hero`; orbit is 1:1 with pointer (no laggy spring); idle float is a slow sine
- prefers-reduced-motion: skip idle float; orbit stays (user-initiated)

## Page behavior

- Root desktop: `h-[100vh] w-full` (exactly one viewport high — no extra scroll inside the module)
- Root mobile: `min-h-[100svh] w-full` — phone first, copy immediately under it with almost no gap
- WebGL canvas is `absolute inset-0`; copy overlay `z-10` with `pointer-events: none` except any interactive children (none required)
- Preview pages mount the canvas only while the section is near the viewport (IntersectionObserver)

## Neighbors

- Above: none (page start)
- Below: any content stage — no scroll-jacking; `touch-action: none` only on the 3D hit target

## Width model

- Full browser width (`w-full`); no `max-w-*` / `container` on the root
- Copy may have a measure (`max-w` on the text column only)

## Image ratios

- Screen image is a portrait slot (~19.5:9 iPhone screen). Prop `screenImage` is a URL. Cover-crop to the screen quad. Default preview uses `PLACEHOLDER_PORTRAIT`.

## Copy props

- `headline` — `font-size: 20vw` by default, tight leading (~0.85)
- `tagline` — rem
- `subheadline` — rem
- `text` — rem, body copy
- `screenImage` — URL for the phone screen
- `stageSide` — `'left' | 'right'`; shadow stage only. Phone in the middle of that half; headline on the opposite side.

## Responsive (mobile → tablet → desktop → large)

- Mobile: phone sits in the upper ~58% of the stage, slightly large; copy overlays the empty lower void, flush under the phone (gap ≤ 0.5rem). Headline still `20vw`. Tap-hold-drag to flip. No hover required.
- Tablet / desktop / large: exact `100vh`. Non-shadow worlds keep the phone visually on the right with copy on the left. Shadow stage uses `stageSide`: phone sits in the **middle of the left or right 50%**, copy occupies the opposite half (right-aligned when on the right).
- Hover is optional grab cursor only.

## 3D

- Click/tap + hold + drag rotates the **phone** (not the world camera): horizontal → yaw Y, vertical → pitch X, full orbit via `usePointerOrbit`
- Touch: `touch-action: none` on the hit target
- Idle auto-rotate of the camera is off; optional gentle float on the phone, including shadow stage (skipped when reduced-motion)
- Three.js + R3F is required for PBR titanium/glass and a mapped screen
- Build the phone from Three.js primitives (`RoundedBoxGeometry`, cylinders, planes) — no heavy GLB download
- Lighting: PMREM / RoomEnvironment or generated gradient env map + key + rim. MeshPhysicalMaterial (metalness, roughness, clearcoat). Skip expensive transmission on the whole chassis.
- Shadow stage (`world.style === 'shadowstage'`): fixed camera aimed at stage center. `stageSide` left/right. Orbit rotates the phone through a full yaw (back included). Spotlight sits directly above the phone; rest-pose shadow is a small, slightly blurred footprint in the center of the pool. VSM softens corners. A faint additive cone makes the beam visible. Floor is a dark shadow-receiving plane.
- Performance: `dpr={[1, 1.5]}`, `powerPreference: 'high-performance'`, antialias on, shadow maps only on the shadow stage, unmount canvas offscreen, keep draw calls low (one phone group)

## Size (important)

- World units: phone height ≈ 2.55 (width ≈ 1.22, depth ≈ 0.12) matching iPhone 16 Pro proportions
- Camera: product FOV ~32°, distance such that the phone reads as a large web hero object on the right (desktop) / top (mobile)
- Do not scale the phone down to “icon” size
