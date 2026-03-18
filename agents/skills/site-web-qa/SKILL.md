---
name: site-web-qa
description: Validate SGS frontend changes across the browser-facing site. Use when edits touch Astro pages, legacy templates, CSS, JavaScript, route adapters, or build output behavior and you need route smoke tests, responsive checks, console or network verification, or Playwright-style regression coverage.
---

# SGS Web QA

Use this skill to test browser-facing changes after UI, layout, or interaction work. Cover both canonical routes and the legacy compatibility surface when relevant.

## Workflow

1. Choose the runtime.
- Use `npm run framework:dev` for iterative checks.
- Use `npm run framework:build` for final parity and alias validation.

2. Smoke test the touched route family.
- Start with the exact route changed.
- Add nearby routes that share the same layout, script, or adapter.
- Include `.html` aliases when the page family still depends on legacy compatibility.

3. Check browser quality, not just markup.
- Look for console errors, failed asset requests, focus traps, clipped mobile layouts, and broken sticky or modal behavior.
- Verify nav state, reader drawers, dialog close paths, and interactive tool affordances.
- Check at least one mobile-sized viewport and one desktop-sized viewport.

4. Use a real browser when the risk warrants it.
- Prefer Playwright or equivalent browser automation for multi-step flows, responsive screenshots, or regressionable checks.
- Capture the exact route, viewport, and action sequence for failures.

5. Record scope before finishing.
- Note which files changed.
- Note which route families were retested.
- Call out anything not verified in-browser.

## References

Read `references/smoke-routes.md` for the default SGS route matrix and regression checklist.
