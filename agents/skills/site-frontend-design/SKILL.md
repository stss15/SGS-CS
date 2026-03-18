---
name: site-frontend-design
description: Design and restyle SGS web interfaces in this repository. Use when editing Astro pages or components, legacy Nunjucks layouts, CSS files, or UI-heavy curriculum pages that need stronger visual design, responsive polish, accessibility improvements, or a new page treatment that must still feel native to the SGS brand.
---

# SGS Frontend Design

Start by identifying whether the page lives in the Astro shell or the legacy layer. Preserve the established SGS design language instead of importing generic startup UI patterns.

## Workflow

1. Locate the shell first.
- Astro shell and shared tokens: `apps/site/src/layouts/BaseLayout.astro`, `apps/site/src/components`, `apps/site/src/styles/tokens.css`
- Legacy shell and shared styling: `src/templates/layouts/base.njk`, `src/static/css/style.css`

2. Choose the smallest styling surface.
- Edit shared tokens or shell CSS only when the change should affect multiple route families.
- Put page-specific styling in a dedicated file under `src/static/css/` and load it through frontmatter or route props.
- Avoid large inline style blocks unless the page is already a self-contained HTML artifact.

3. Keep SGS look and feel.
- Use the warm neutral background, navy and gold accent palette, and the existing header and card language.
- Use `Outfit` for headings and `Source Sans 3` for body copy. Only use `Lexend` or `Literata` in reader-style experiences that already depend on them.
- Prefer subtle atmosphere: radial washes, soft shadows, pill navigation, generous spacing, and restrained motion.

4. Raise quality without breaking trust.
- Make layouts feel deliberate and polished, but keep them classroom-safe and easy to scan.
- Avoid novelty-first treatments that compete with lesson content.
- Avoid purple gradients on white, generic SaaS dashboards, or mismatched font stacks.

5. Validate before finalizing.
- Check both desktop and mobile states.
- Keep focus styles visible, target sizes comfortable, and color usage understandable without red or green cues alone.
- Run `npm run framework:build` after substantial UI changes.

## References

Read `references/design-language.md` when the change involves palette, typography, spacing, page composition, or shared UI conventions.
