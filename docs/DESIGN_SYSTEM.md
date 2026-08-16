# Bitzsznn Design System

## Tokens

Color and type tokens live in `src/app/globals.css`.

- Primitive colors: `--ink-*`, `--ivory-*`, `--sage-*`, `--green-*`, `--gold-*`, `--electric-*`
- Semantic colors: `--background`, `--foreground`, `--surface`, `--muted`, `--border`, `--primary`, `--accent`
- Component tokens: `--button-primary`, `--button-secondary`, `--focus-ring`, `--image-overlay`, `--shadow-soft`, `--radius-card`, `--radius-control`
- Type tokens: `--type-hero`, `--type-display`, `--type-section`, `--type-card-title`, `--type-body`
- Spacing tokens: `--space-section-sm`, `--space-section-md`, `--space-section-lg`

## Typography

Use Manrope through `--font-sans`. Hero pages use `.hero-title`; section headings use `.section-title`. Do not create new page-specific hero font sizes unless a Figma implementation requires a documented exception.

## Layout

- Use `container-shell` and `figma-inner` for page width and edge spacing.
- Use `section-grid-lines` for Figma-style vertical guides.
- Use `overflow-x-clip` on page-level wrappers when needed; avoid `overflow-x-hidden` on `main` because it can create nested vertical scroll containers.

## Buttons

Primary CTAs use green for conversion actions such as `Buy ticket`, `Join the community`, and `Plan an experience`.
Secondary CTAs on light sections should use ink backgrounds or bordered white surfaces with explicit contrast.

## Motion

Use Framer Motion for reveal and stack interactions. Motion should communicate state or progression, stay under 500ms, and respect `prefers-reduced-motion` from global CSS.

