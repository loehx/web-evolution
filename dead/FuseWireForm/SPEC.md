# FuseWireForm

## Creative direction

**Style:** Futuristic
**Typography:** Industrial mono labels; bold condensed title
**Layout:** Dark fuse panel with glowing wire connections between form fields
**Color:** Panel black `#0d0d0f` + wire amber `#f5a623` + spark cyan `#00d4ff`
**Motion:** Wire glow intensifies on focus; spark flash on valid field
**Signature:** A full-viewport electrical fuse box where wires connect name, email, and message terminals

## Role

- contact form

## Look

Not a generic form card. An industrial fuse panel where each field is a terminal connected by glowing amber wires that spark cyan on focus.

## Motion

- Role: primary interaction
- Moves: wire glow, spark flash on focus
- Durations: `motionDuration.standard` for wire glow
- prefers-reduced-motion: static wire opacity reflects validation

## Page behavior

- Root: `min-h-[100svh] w-full`
- Centered fuse panel on dark background

## Neighbors

- Above: PatinaOxideSplit
- Below: WeirSpillFloor

## Width model

- Full browser width; form inset with px padding only

## Image ratios

- N/A

## Headlines

- Title as HTML h2

## Responsive (mobile → tablet → desktop → large)

- Mobile: stacked fields with vertical wire runs
- Tablet / desktop: same layout, wider wire spans
- Touch focus works; no hover-only content

## 3D

- N/A
