# Interactive Lesson Patterns

## Placement Rules

- Put route-level page wrappers in `apps/site/src/pages/...` when the experience should live inside the Astro shell.
- Keep legacy-authored markup in `src/pages/...` when the route is still Nunjucks-backed.
- Put reusable browser logic in `src/static/js/...`.
- Put dedicated styling in `src/static/css/...`.
- Put lesson datasets or tool fixtures in `src/static/data/...`.

## JavaScript Shape

Prefer the repo's existing explicit pattern:

1. Declare constants and a single `state` object.
2. Cache DOM references in one place.
3. Bind events in one place.
4. Split rendering into small focused functions.
5. Initialize once on `DOMContentLoaded` or through a module entry.

Representative files:

- `src/static/js/tool-sql-playground.js`
- `src/static/js/reader.js`
- `src/static/js/assessment-runtime.js`
- `src/static/js/quiz-utils.js`
- `src/static/js/toolkit.js`

## Interaction Guardrails

- Support keyboard, touch, and mouse.
- Use `data-*` hooks for targeting interactive elements.
- Keep status text visible and expose important updates via `aria-live` where helpful.
- Avoid hover-only affordances and hidden critical actions.
- Preserve work where possible; if reset is destructive, make it explicit.

## Dependency Bias

- Prefer native DOM APIs and small local utilities first.
- Add external libraries only when they clearly reduce complexity or enable a required capability.
- If a third-party library is justified, keep loading explicit and isolated to the page that needs it.

## Validation

- Test one normal path, one invalid path, and one keyboard-only path.
- Check the interactive at a narrow mobile width and a desktop width.
- Rebuild with `npm run framework:build` before finalizing.
