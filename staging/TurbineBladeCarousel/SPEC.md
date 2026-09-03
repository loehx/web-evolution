# TurbineBladeCarousel

## Reference

- **Source type:** CodePen
- **Awards URL:** (n/a)
- **Live / pen URL:** https://codepen.io/japanihon/pen/poLbNLa
- **Site / pen name:** Carousel using CSS scroll snap and Alpine
- **Section lifted:** Horizontal drag-scroll carousel with snap-to-center slides and momentum drag
- **Why it fits the role:** Card slider with native scroll-snap, drag interaction, and center-aligned active card
- **Adaptation notes:** Scale to full viewport; cards styled as turbine blades on a steel hub; industrial palette

## Creative direction

**Reference:** https://codepen.io/japanihon/pen/poLbNLa — CSS scroll snap drag carousel
**Style:** Brutalist
**Typography:** Condensed industrial headlines; mono index labels
**Layout:** Horizontal snap rail with cards mounted on rotating turbine blade spokes from a central hub
**Color:** Gunmetal `#2a2a2e` + steel `#8a8a8e` + warning amber `#f5a623`
**Motion:** Snap scroll on drag; active blade lifts and brightens; hub slow rotation
**Signature:** Stories ride turbine blade spokes radiating from a central steel hub — drag the rail to spin the next blade to center
**Faithful to reference:** Scroll-snap horizontal carousel, drag-to-scroll, center snap alignment
**Changed for repo:** Full viewport stage; turbine visual metaphor; props API; touch + arrow controls

## Role

- card slider (image + text per card)

## Look

Not a 3-up grid. Cards mount on turbine blade spokes radiating from a central hub — drag the horizontal rail to snap the next story blade to center focus.

## Motion

- Role: primary interaction
- Moves: snap scroll, blade lift on active, hub rotation
- Durations: `motionDuration.standard` for snap; `motionDuration.emphasis` for hub
- prefers-reduced-motion: instant snap, static hub

## Page behavior

- Root: `min-h-[100svh] w-full`
- Horizontal overflow rail centered vertically

## Neighbors

- Above: MagmaCoreHero
- Below: SlateChalkSplit

## Width model

- Full browser width (`w-full`); no max-width on root

## Image ratios

- Card image: `4/5` — cropped with object-cover via RatioImage

## Headlines

- Section title: HTML h2 when provided

## Responsive (mobile → tablet → desktop → large)

- Mobile: full-width cards, smaller hub, touch drag
- Tablet: wider cards, visible hub
- Desktop: cards bleed off edges, arrow controls
- Large: extra card scale on active blade

## 3D

- N/A
