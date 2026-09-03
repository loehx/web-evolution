# ModalSpotlight

## Look
- Frosted backdrop with violet-tinted shadow on the panel
- Rounded card panel with optional title and close button
- Spring scale-in entrance via Motion

## Page behavior
- Fixed overlay at z-50; locks body scroll while open
- Escape key and backdrop click close when onClose provided

## Neighbors
- Above: entire page content (dims behind)
- Below: n/a when open — blocks interaction with page

## Viewport and resize
- Mobile: full-width with padding, sm/md/lg max-width on larger screens
- prefers-reduced-motion: shorter transitions via Motion defaults
