# Bitzsznn Design System

## Color Tokens

The site uses three layers of CSS custom properties:

- Primitive tokens: raw brand values such as `--ink-950`, `--gold-400`, `--electric-500`.
- Semantic tokens: usage-based values such as `--background`, `--foreground`, `--surface`, `--primary`, `--accent`.
- Component tokens: focused UI values such as `--button-primary`, `--card-border`, `--focus-ring`, and `--image-overlay`.

Primary CTAs use green against dark event imagery or ivory surfaces. Use `#061006` or `#10240c` on green buttons for readable contrast; reserve white text for dark ink backgrounds only. Light sections should pair `#10240c`, `#183814`, or `#30472d` with ivory/white surfaces. Avoid low-opacity white on light sections and avoid pale grey/brown text for core content.

Interactive states should change transform, shadow, border, and color rather than layout dimensions. Event cards keep the same measured size, then lift/scale on hover so carousel and grid content does not clip.

## Typography

Manrope is the primary UI and content font. Large hero and section headings use heavy weights with tight but readable line-height. Body text stays at 16-18px with generous line-height for mobile readability.

## Motion

Motion should support feedback and orientation. Use short transform/opacity transitions, keep hover lift subtle, and respect `prefers-reduced-motion`.
