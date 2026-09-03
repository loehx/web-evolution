# CarouselCardDeck

## Look
- Horizontal row of equal-width cards with image slot, title, and description
- Optional prev/next arrows; native scroll-snap for touch and trackpad

## Page behavior
- Inline section carousel; does not hijack vertical scroll
- Keyboard left/right when track is focused

## Neighbors
- Above: section heading or filter chips
- Below: pagination dots (not included) or related links

## Viewport and resize
- Mobile: one card mostly visible, swipe to scroll
- Desktop: multiple cards peek; arrows when showArrows
- prefers-reduced-motion: smooth scroll still works; no auto-play
