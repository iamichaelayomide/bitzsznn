# Bitzsznn Project Rules

## Figma To Code

- Treat Figma output as visual reference, then translate into the project conventions.
- Reuse existing components from `src/components` before creating new ones.
- Keep page sections inside `container-shell`, `figma-inner`, and `section-grid-lines` unless the design intentionally breaks the grid.

## Design Tokens

- Use tokens from `src/app/globals.css` and the guidance in `docs/DESIGN_SYSTEM.md`.
- Do not scatter new hero font sizes. Use `.hero-title` and `.section-title`.
- Do not add page-level `overflow-x-hidden` to `main`; use `overflow-x-clip` only when needed.

## Interaction

- Use Framer Motion for purposeful microinteractions and scroll reveals.
- Hover/focus states must be keyboard accessible and visible.
- Event conversion actions should prioritize `Buy ticket`; supporting actions should say `See details`.

## Content

- Copy should be direct, conversion-focused, and SEO-aware around NYSC events, youth culture, event ticketing, brand activations, community experiences, music events, and post-NYSC connection.

