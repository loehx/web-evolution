# ShaleBedForm

## Reference

- **Source type:** CodePen
- **Live / pen URL:** https://codepen.io/Yaya1203/pen/jOKNwGB
- **Site / pen name:** Yaya1203 — Layered bedrock contact form
- **Section lifted:** Stacked horizontal sediment layers as form field backgrounds with depth illusion
- **Why it fits the role:** Contact form where each field sits on a distinct geological stratum layer
- **Adaptation notes:** Shale bedrock palette; layer shift on focus; full viewport stage

## Creative direction

**Reference:** https://codepen.io/Yaya1203/pen/jOKNwGB — layered sediment form fields
**Style:** Brutalist
**Typography:** Chiseled block title; mono field labels like geological survey marks
**Layout:** Horizontal shale strata bands stack vertically; each form field carves into its layer
**Color:** Shale gray `#5a5a5c` + fossil cream `#e8e4dc` + mineral amber `#c9a227`
**Motion:** Layer shift/slide on focus; stratum highlight on valid input
**Signature:** Contact fields carved into horizontal shale bed layers that shift on focus
**Faithful to reference:** Layered depth illusion, horizontal strata, field-in-layer composition
**Changed for repo:** Shale metaphor, props API, reduced-motion, touch-friendly

## Role

- contact form

## Look

Not a card form. A shale quarry face you inscribe. Each field sits on its own sedimentary stratum that shifts when focused.

## Motion

- Role: primary interaction
- Moves: layer-shift on focus, fade-up on submit
- Durations: `motionDuration.standard` for layer shifts
- prefers-reduced-motion: instant focus states, no layer animation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Form is the entire stage

## Neighbors

- Above: CinderAshSplit
- Below: EstuaryTidalFloor

## Width model

- Full browser width; form content centered but stage is full bleed

## Image ratios

- N/A

## Headlines

- Title as HTML h2 block letters

## Responsive (mobile → tablet → desktop → large)

- Mobile: single column strata, full-width fields
- Tablet: wider form band
- Desktop: form centered in viewport with visible strata margins
- Large: extra stratum depth shadows
