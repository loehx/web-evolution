# FractureEchoSplit

## Creative direction

**Style:** Editorial
**Typography:** Serif display with echo offset duplicates in faint ink
**Layout:** Diagonal fracture splits viewport — image left with echo layers, text right bleeding into crack
**Color:** Newsprint `#f4f0e8`, ink `#0d0d0d`, fracture violet `#6b5b95`
**Motion:** image-reveal on photo; text-reveal stagger; parallax on echo layers on scroll (subtle)
**Signature:** Fracture line with offset echo typography ghosting behind the headline

## Role

- image + text

## Look

- A diagonal fracture cleaves the stage; photograph sits in the left shard with two offset echo copies, copy sits in the right shard with staggered lines that kiss the crack.
- Not a 50/50 split block — the fracture angle creates tension.

## Motion

- Role: content with emphasis on reveal
- Moves: image-reveal, text-reveal, parallax
- prefers-reduced-motion: static fracture, no echo drift

## Page behavior

- Root: `min-h-[100svh] w-full`
- Fracture runs ~18deg on desktop; stacks on mobile

## Neighbors

- Above: hero or card deck
- Below: contact or footer — fracture angle points toward next section

## Width model

- Full browser width

## Image ratios

- Hero image: 3/4 portrait on mobile stack, 16/10 on desktop left shard

## Headlines

- ResponsiveHeadline for primary title lines

## Responsive

- Mobile: image top, text below, fracture becomes horizontal seam
- Tablet: partial angle
- Desktop: full diagonal fracture
- Large: wider echo offsets

## 3D

- None
