# SGS Design Language

## Core Mood

Keep the interface academic, polished, and slightly atmospheric. The site should feel trustworthy for teachers and students, not like a generic SaaS dashboard or a novelty microsite.

## Source Files

| Concern | Legacy source | Astro source |
| --- | --- | --- |
| Shared shell | `src/templates/layouts/base.njk` | `apps/site/src/layouts/BaseLayout.astro` |
| Shared tokens | `src/static/css/style.css` | `apps/site/src/styles/tokens.css` |
| Reader-specific shell | `src/templates/layouts/reader.njk` | reader-style Astro textbook routes |

## Palette

Keep new UI aligned with the existing palette:

- Navy core: `#0a1628`, `#0E214B`, `#1a3066`
- Gold accent: `#BE9A5E`, `#d4b078`, `#e8c99a`
- Warm surfaces: `#faf9f7`, `#f5f3ef`, white cards

Use gold as an accent, not a flood color. Let navy and warm neutrals carry most of the composition.

## Typography

- Use `Outfit` for headings, labels, pills, and high-emphasis UI.
- Use `Source Sans 3` for body copy and most supporting text.
- Use `Lexend` or `Literata` only in reader experiences that already load them.
- Avoid introducing a new font stack unless the whole surface genuinely needs it.

## Composition Patterns

- Use soft radial background washes rather than flat blank canvases.
- Keep pill-style nav, rounded cards, and subtle elevation consistent with the current shell.
- Prefer clear section rhythm and readable grouping over dense dashboard layouts.
- Use one strong visual idea per page, not several competing ones.

## Motion And Interaction

- Keep motion restrained: hover lift, short fades, drawer transitions, and other subtle cues.
- Avoid animation that distracts from lesson content or delays reading.
- Preserve visible focus rings and comfortable hit targets for touch use.

## Accessibility Guardrails

- Keep contrast high enough for classroom projection and mixed lighting.
- Avoid meaning carried only by red and green.
- Treat 360 to 390 px mobile widths as first-class, not afterthoughts.
- Keep long-form reading surfaces calm and distraction-light.
