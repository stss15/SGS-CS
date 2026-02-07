# Production Readiness Plan

Date: 2026-02-06

## Goal

Move the SGS-CS site from "builds successfully" to a repeatable production gate with measurable quality checks.

## Skill-to-Codebase Mapping

| Skill | Applicability to this repo | Action in this plan |
|---|---|---|
| `frontend-design` | High (global UI/UX consistency across static pages) | Enforce baseline UI quality checks for metadata, responsiveness, and image accessibility. |
| `webapp-testing` | High (large interactive surface) | Add automated smoke/quality validation that runs on every build. |
| `web-artifacts-builder` | Medium (workflow principle only) | Use script-based, repeatable build/validation tooling rather than ad-hoc manual checks. |
| `react-best-practices` | Partial (non-React repo, but JS performance principles still apply) | Enforce source hygiene checks and reduce high-risk anti-patterns in shared JS/build tooling. |
| `composition-patterns` | Low/Partial (no React component architecture) | Preserve modular template/layout boundaries and avoid new monolithic inline logic. |
| `react-native-skills` | Not directly applicable | No direct implementation changes in this repo. |
| `web-design-guidelines` | High | Add production checks for critical web interface baseline requirements. |

## Implementation Phases

1. Phase 1: Baseline guardrails
   - Add production validation scripts for build output quality and JS syntax.
   - Replace placeholder `npm test` with real checks.
2. Phase 2: Critical fixes surfaced by checks
   - Ensure viewport and description coverage across generated pages.
   - Fix missing image `alt` attributes in source.
   - Remove inline handler usage in source templates/layouts and enforce data-attribute bridge compatibility.
   - Enforce secure `target="_blank"` link rel attributes and explicit button types.
3. Phase 3: Release workflow hardening
   - Wire validation into standard local workflow (`npm test` / `npm run validate`).
   - Document one-command production gate and remaining backlog.

## Exit Criteria

- `npm run build` succeeds.
- `npm run validate` succeeds with no critical findings.
- `npm test` is no longer a placeholder.
- Build output has baseline UX/accessibility metadata coverage checks passing.

## Current Status

- Completed:
  - Added automated production checks:
    - `scripts/check-source-hygiene.js`
    - `scripts/check-js-syntax.js`
    - `scripts/check-html-quality.js`
    - `scripts/check-link-integrity.js`
  - Added npm scripts:
    - `check:source`
    - `check:js-syntax`
    - `check:html`
    - `check:links`
    - `validate`
  - Replaced placeholder `npm test` with `npm run validate`.
  - Hardened build output to ensure missing viewport/description metadata is injected.
  - Hardened build output to normalize `target="_blank"` links with `rel="noopener noreferrer"`.
  - Hardened build output to inject `decoding="async"` for images missing decoding hints.
  - Replaced inline image `onerror` source attributes with `data-fallback-src` and JS fallback handling.
  - Added build-time migration of legacy inline HTML handlers (`on*`) to data attributes plus a runtime bridge (`src/static/js/legacy-inline-events.js`), eliminating static inline handlers in generated output.
  - Updated bridge injection logic so pages that already use `data-sgs-on*` attributes still get runtime binding.
  - Converted remaining source inline `onclick` attributes to `data-sgs-onclick` in templates/pages.
  - Added explicit `type="button"` on source buttons that are not submit controls.
  - Added responsive image defaults in shared CSS (`style.css`, `slide-deck.css`).
  - Upgraded HTML validation so inline handlers are now a failing condition (not warning-only).
  - Upgraded source/output validation so insecure `target="_blank"` links fail checks.
  - Added accessibility baseline CSS for visible keyboard focus and reduced-motion handling.
- Remaining backlog:
  - Migrate runtime-generated handler strings in legacy JS (`innerHTML`-generated `onclick`) to explicit `addEventListener` patterns so the legacy bridge can be retired.
  - Add browser-level smoke coverage for critical user journeys (navigation + representative interactives).
