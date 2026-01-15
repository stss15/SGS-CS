# Changelog

## 2026-01-15 - Major Refactor & Firebase Migration

### File Organization
- Created `archive/` folder for obsolete files with README documentation
- Moved Python scripts from `public/` to `scripts/`:
  - `apply_ib_keywords.py`
  - `apply_igcse_keywords.py` (renamed from apply_keywords.py)
  - `check_links.py`
  - `update_igcse_index_links.py` (renamed from update_index_links.py)

### Firebase Hosting Setup
- Added `firebase.json` with hosting configuration, caching headers, and 404 fallback
- Added `.firebaserc` with project configuration (sgsd-science-webapp)
- Created `firebase-hosting.yml` GitHub Actions workflow for Firebase deployment
- Updated `package.json` with Firebase scripts: `serve`, `deploy`, `preview`

### Navigation Improvements
- Created `coming-soon.njk` template for placeholder pages
- Created static `404.html` page with navigation links

### CI/CD Updates
- Updated `pages.yml` workflow with correct script paths

### CSS Consolidation
- Created `assessment-base.css` (650 lines) consolidating all assessment styles
- Updated 34 assessment HTML files to use the new base CSS
- Archived 43 individual assessment CSS files to `archive/css-legacy/`

---

## 2025-11-28
- Added shared Reveal configuration via `public/js/slide-deck.js` with auto-fit plugin, unified sizing (1600x900, margin 0.06) and consistent slide numbering.
- Standardised slide layouts: flex-centred sections, automatic `.slide-inner js-autofit` wrappers, and optional `.scrollable` escape hatch across KS3/IGCSE themes.
- Updated KS3 and IGCSE slide decks (Year 7 Unit 2 L1-L8, Topic 4.1/4.2) and authoring templates to consume the shared config instead of inline initialisers.
- Documented the sizing approach for AI agents (`docs/agent/reveal-slide-deck-sizing-guide.md`) to keep future decks consistent.
