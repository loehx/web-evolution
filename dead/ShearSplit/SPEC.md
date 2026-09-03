# ShearSplit

## Creative direction

**Style:** Luxury
**Typography:** Champagne display against charcoal; body as a narrow measure
**Layout:** A diagonal shear — image and copy never share a 50/50 box
**Color:** Charcoal `#0c0c0c` + champagne `#e8d5b5`
**Motion:** Image-reveal along the cut
**Signature:** The diagonal is the composition, not a rounded card beside text

## Look

Clip-path shear on desktop. Mobile stacks as two full-width bands (not a squashed diagonal).

## Motion

- Role: content (subtle) with image-reveal
- Durations: `motionDuration.emphasis` for the clip
- prefers-reduced-motion: static split, no clip animation

## Page behavior

- Root: `min-h-[100svh] w-full`

## Neighbors

- Above: TideCardRail
- Below: InquiryChamber

## Responsive (mobile → tablet → desktop → large)

- Mobile: image 52svh, copy below; no hover
- Tablet: milder diagonal
- Desktop / large: aggressive shear, type in the remaining wedge
