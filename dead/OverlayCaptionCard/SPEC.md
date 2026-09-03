# OverlayCaptionCard

## Look
- Full-bleed image (or zinc fallback) with bottom-up dark gradient
- Title and optional subtitle anchored in the caption area
- Subtle zoom on hover when linked

## Page behavior
- Grid or masonry tile; static except hover scale on image
- Optional whole-card link via href

## Neighbors
- Above: section title or category filter
- Below: more tiles in a responsive grid

## Viewport and resize
- Mobile: full-width tiles, smaller caption padding
- Desktop: aspect ratio preserved via aspect-* utilities
- prefers-reduced-motion: disable hover scale (CSS transition still minimal)
