# PlantOrbitHero

## Creative direction

**Style:** Moss theater / specimen vitrine
**Typography:** Cormorant Garamond display pinned to a corner slab; sans captions
**Layout:** Type occupies a bottom-left slab; a live 3D plant owns the right stage
**Color:** Deep forest `#0f1a12` + sage `#8fb996` + warm gold `#c9a96e`
**Motion:** Scale-in on the plant stage (hero duration), idle auto-rotate, pointer orbit
**Signature:** A monument plant in a greenhouse vitrine — rotate to inspect every leaf

## Look

A botanical specimen you can orbit. Display type is secondary to the living model. Corner marks evoke a museum vitrine without boxing the stage.

## Motion

- Role: hero
- Moves: scale-in (entrance), idle yaw drift, pointer orbit
- Durations: `motionDuration.hero` entrance; orbit is direct
- prefers-reduced-motion: skip entrance and idle drift; pointer orbit remains

## Page behavior

- Root: `min-h-[100svh] w-full`
- Opening stage; no sticky chrome

## Neighbors

- Above: none (page start)
- Below: any content stage — plant should not bleed scroll-jacking

## Responsive (mobile → tablet → desktop → large)

- Mobile: plant centered and large; type as a bottom overlay strip; orbit via tap-hold-drag
- Tablet: plant right, type left
- Desktop / large: plant ~68vw, type pinned bottom-left
- Hover not required; drag is the interaction

## 3D

- Poly Haven CC0 glTF plants via `@react-three/fiber` + `@react-three/drei`
- Default: `pachira_aquatica_01` (potted money tree)
- Click/tap + hold + drag orbits X and Y via `usePointerOrbit`
- Canvas lazy-loaded; `useGLTF.preload` on default plant
- Scene cloned per instance to avoid shared mutations

## Plants

| `plant` id | Model |
|------------|-------|
| `pachira_aquatica_01` | Money tree (default hero) |
| `anthurium_botany_01` | Tropical anthurium |
| `fern_02` | Fern cluster |
| `shrub_sorrel_01` | Low shrub |
| `cheiridopsis_succulent` | Desert succulent |
