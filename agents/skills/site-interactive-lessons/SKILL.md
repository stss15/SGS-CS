---
name: site-interactive-lessons
description: Build and debug SGS interactive lesson tools, games, simulations, quizzes, and browser-based utilities. Use when working in `src/static/js`, `src/static/css`, `src/static/data`, Astro tool routes, or legacy curriculum pages that need client-side behavior, state management, keyboard support, or classroom-safe responsive interaction.
---

# SGS Interactive Lessons

Use this skill when the task is primarily about frontend behavior rather than static copy. Keep implementations lightweight, explicit, and easy to maintain inside a content-heavy educational site.

## Workflow

1. Pick the execution surface.
- Put route wrappers in `apps/site/src/pages/...` when the interactive needs an Astro shell.
- Keep legacy page markup in `src/pages/...` or `src/static/...` when the route is still legacy-backed.
- Put reusable behavior in `src/static/js/...`.
- Put feature-specific styling in `src/static/css/...`.
- Put local datasets in `src/static/data/...`.

2. Prefer vanilla JavaScript first.
- Keep a single `state` object, cached DOM nodes, explicit initialization, and small render helpers.
- Use `type="module"` for Astro tool pages when module semantics help.
- Use `DOMContentLoaded` wrappers for legacy scripts that attach to server-rendered pages.
- Add third-party libraries only when the feature genuinely needs them.

3. Make classroom use robust.
- Support keyboard and touch, not only mouse hover.
- Expose status and errors through visible UI and `aria-live` messaging when relevant.
- Keep interaction labels concrete for students and teachers.
- Avoid flows that lose work or hide critical actions behind ambiguous icons.

4. Keep data and rendering predictable.
- Prefer `data-*` hooks over brittle text selectors.
- Keep fetch targets local to the repo when possible.
- Split heavy features into clear phases: load data, derive state, render view, bind events.

5. Validate behavior in the browser.
- Test the happy path, one invalid path, and one keyboard-only path.
- Rebuild with `npm run framework:build` after substantial changes.
- Pair with `site-web-qa` for route-level regression checks.

## References

Read `references/patterns.md` for concrete file placement and implementation patterns already used in the repo.
