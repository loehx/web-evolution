# PointerTiltShowcase

## Content scenario

**Product showcase with interactive 3D model** — welcome text beside a glTF object that tilts toward cursor position or touch/drag on mobile and tablet.

Prop slots:

| Slot | Purpose |
|------|---------|
| `eyebrow` | Small label above headline |
| `headlineLines` | Primary title via `ResponsiveHeadline` |
| `intro` | Supporting paragraph |
| `ctaLabel` / `onCtaClick` | Optional primary action |
| `modelSrc` | Path to glTF binary (default `/models/duck.glb`) |
| `modelScale` | Scene scale multiplier |
| `maxTilt` | Max rotation radians toward pointer |
| `modelSide` | `left` or `right` column on desktop |
| `viewportRatio` | `4/5`, `16/10`, or `1/1` for the 3D viewport box |

## Look

- Full-width zinc-950 band; two-column grid on desktop
- Fixed-ratio 3D viewport with dark canvas background and bottom gradient fade
- Violet eyebrow, SVG headline, muted intro copy
- glTF models: Khronos sample duck and avocado in `/public/models/`

## Page behavior

- Document-flow section; pointer tracking listens on the full section width
- `pointermove`, `pointerdown`, and `pointerleave` drive normalized `-1…1` coordinates
- Model rotation lerps toward target each frame via `@react-three/fiber`
- `prefers-reduced-motion`: pointer tracking off; slow idle Y rotation instead

## Neighbors

- Above: hero or stats row
- Below: feature grid, FAQ, or footer CTA

## Width model

- Root `<section>` is `w-full` only — no outer `max-w-*` or `container`
- Inner grid spans full width; intro uses `max-w-prose` for readable line length inside its column only

## Image ratios

| Slot | Ratios | Notes |
|------|--------|-------|
| 3D viewport | `4/5` (default), `16/10`, `1/1` | Fixed aspect box; canvas fills with `object-cover`-equivalent absolute inset |

Not a raster image — viewport uses explicit `aspect-*` utilities matching the image-ratio standard.

## Headlines

- Primary: `ResponsiveHeadline` (SVG, width-linked)
- Eyebrow / intro: HTML

## Viewport and resize

| Tier | Range | Layout |
|------|-------|--------|
| Mobile | < 768px | Stacked — copy above model; hint text to drag/tap |
| Tablet | 768–1023px | Still stacked; touch drag on canvas |
| Desktop | ≥ 1024px | Two columns; hover anywhere in section tilts model |

- `prefers-reduced-motion`: disable pointer-driven tilt; gentle auto-rotate on model

## Tech

- `@react-three/fiber` + `@react-three/drei` + `three`
- Lazy-loaded canvas to defer WebGL bundle
- Models preloaded with `useGLTF.preload`
