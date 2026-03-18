---
name: site-migration-parity
description: Preserve SGS URL, content, and browser parity while migrating routes and experiences. Use when replacing legacy pages, moving content into Astro, refactoring interactive surfaces, or decommissioning compatibility layers and you need to keep current public behavior intact.
---

# SGS Migration Parity

Use this skill whenever a route family, content model, or interactive experience is being moved. Keep the public contract stable until the replacement is proven.

## Workflow

1. Define the parity surface.
- Public routes and `.html` aliases.
- Content coverage and section hierarchy.
- Downloadable assets and local data files.
- Browser behavior, accessibility, and responsive states.

2. Inventory the existing family.
- List the current source files.
- List the published route targets.
- List the asset and data dependencies.
- Record the expected browser interactions.

3. Migrate one family at a time.
- Keep the legacy path alive until the replacement path is confirmed.
- Add compatibility shims instead of widening the rewrite surface.
- Prefer adapters and manifests over implicit file coupling.

4. Verify parity before removal.
- Confirm route resolution.
- Confirm content coverage.
- Confirm assets still publish and load.
- Confirm the browser flow still works at desktop and mobile widths.

5. Decommission only after checks pass.
- Remove the compatibility path only after the replacement has a green build and the parity surface matches.

## Non-Negotiables

- Preserve exact public URLs and aliases unless a redirect has been explicitly approved.
- Preserve section order, unit structure, and downloadable assets.
- Preserve local data contracts and `localStorage` keys where practical.
- Preserve accessibility and keyboard support.
- Do not delete compatibility shims before the replacement is live and tested.

## References

Read `references/parity-checklist.md` for the exact checks to run before decommissioning any legacy route family.
