# AnvilStrikeForm

## Creative direction

**Style:** Brutalist
**Typography:** Heavy uppercase form title; forge-orange mono labels
**Layout:** Full-viewport forge with anvil silhouette and strike-glow fields
**Color:** Forge charcoal `#1a1410` + strike orange `#e85d04` + iron gray `#4a4a50`
**Motion:** Orange strike flash behind focused fields; anvil shadow pulse on submit
**Signature:** Contact fields glow with forge-strike orange when focused — hammer meets anvil

## Role

- contact form

## Look

Not a card form. A full-viewport forge ritual where each field receives an orange strike glow on focus, capped by an iron anvil silhouette at the base.

## Motion

- Role: primary interaction
- Moves: strike-glow on focus, anvil pulse on valid submit
- Durations: `motionDuration.standard` for strike; `motionDuration.micro` for focus
- prefers-reduced-motion: instant glow, no pulse

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered forge panel above anvil base

## Neighbors

- Above: SiltLayerSplit
- Below: GlacierCrestFloor

## Width model

- Full browser width; form panel centered but stage is full bleed

## Image ratios

- N/A

## Headlines

- Form title: HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked fields, full-width strike bars
- Tablet: same with larger type
- Desktop: centered forge panel
- Large: anvil scales with viewport width
