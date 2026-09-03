# TesseraDriftShader

## Creative direction

Same brutalist editorial concept as **TesseraDrift** — headline as drifting square tesserae — but rendered on a single WebGL2 canvas with instanced quads instead of DOM spans.

**Style:** Brutalist editorial  
**Signature:** Identical scroll-linked parallax drift, GPU-drawn in one instanced draw call

## Technical notes

- Reuses `buildTesseraLayout` and settings from TesseraDrift
- WebGL2 instanced triangles (6 verts × N squares)
- Per-instance attributes: base position, size, depth, spreadX, debug color
- Scroll motion computed in JS (same `easeOutSubtle` + parallax caps); shader applies transforms; per-square debug colors stay fixed
- `prefers-reduced-motion`: converged state, no parallax offset

## Performance rationale

DOM TesseraDrift creates one `<span>` per square with per-frame style writes. Shader version uploads layout once and draws all squares in a single `drawArraysInstanced` per frame — scales to high density / cloud counts without layout thrash.
