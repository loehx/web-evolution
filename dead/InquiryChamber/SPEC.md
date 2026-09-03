# InquiryChamber

## Creative direction

**Style:** Futuristic
**Typography:** Giant index numbers as labels; fields as hairline slabs
**Layout:** A vertical chamber — the form *is* the page, not a card in the middle
**Color:** Void `#050508` + lime `#c8ff3d`
**Motion:** Staggered fade-up of fields
**Signature:** Contact as a numbered ritual, not a boxed “Get in touch” widget

## Look

Domain-agnostic: name, email, message. No endpoints, JSON, or status badges (PayloadPanel lesson).

## Motion

- Role: primary interaction
- Moves: stagger, fade-up
- Durations: `motionDuration.standard` per field
- prefers-reduced-motion: all fields visible immediately

## Page behavior

- Root: `min-h-[100svh] w-full`
- Form submit is client-side (`preventDefault`); `onSubmit` optional

## Neighbors

- Above: ShearSplit
- Below: ColophonFloor

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked fields, large tap targets, no hover
- Tablet / desktop: two-column name+email, message full width, submit as a full-bleed bar
- Large: type scales up; still full width, no max-w column
