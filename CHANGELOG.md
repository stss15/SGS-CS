# Changelog

## 2026-02-12 - IGCSE Topic Index Refactor (Topics 1-10)

### IGCSE Index UX
- Refactored `src/pages/igcse/topic1/index.njk` to `src/pages/igcse/topic10/index.njk` into a sectioned structure aligned with recent IB/Year 7 index patterns.
- Removed "Arcade" naming from topic index titles/subtitles and standardized hero headings to topic names (for example, `1. Data Representation`).
- Added consistent index sections across all 10 topics: `Specification Overview`, `Textbook`, `Student Activities`, `Assessments`, `Homework`, `Independent Tasks`, `Revision`.

### Content Relocation
- Moved assessment menu behavior onto topic indexes by linking directly to sub-topic assessments and end-of-unit tests, with explicit placeholders where assessments are not yet available.
- Moved simulations/games/tools into `Independent Tasks`, preserving existing assets and thumbnail usage.
- Moved teaching/revision visual links into each topic `Revision` section alongside flashcards.
- Updated assessment page return links from `assessments.html` to `index.html#assessments`.

### Templates and Styles
- Extended `src/templates/layouts/arcade.njk` to support structured section rendering while preserving legacy card/resource rendering for non-refactored pages.
- Added `independentTaskGrid` macro in `src/templates/components.njk` for image-based independent task cards.
- Added `src/static/css/igcse-index.css` to style specification metadata and smaller 1x1 independent task cards.

### New Topic Textbook Placeholders
- Added blank textbook reader pages for topics 1-10:
  - `src/pages/igcse/topic1/textbook.njk`
  - `src/pages/igcse/topic2/textbook.njk`
  - `src/pages/igcse/topic3/textbook.njk`
  - `src/pages/igcse/topic4/textbook.njk`
  - `src/pages/igcse/topic5/textbook.njk`
  - `src/pages/igcse/topic6/textbook.njk`
  - `src/pages/igcse/topic7/textbook.njk`
  - `src/pages/igcse/topic8/textbook.njk`
  - `src/pages/igcse/topic9/textbook.njk`
  - `src/pages/igcse/topic10/textbook.njk`

### Cleanup
- Removed obsolete intermediate pages no longer needed by the sectioned index flow:
  - `src/static/igcse/topic*/assessments.html`
  - `src/static/igcse/topic*/teaching-and-revision.html`
  - `src/pages/igcse/topic4/assessments.njk`
  - `src/pages/igcse/topic4/teacher_toolkit.njk`
  - `src/pages/igcse/topic8/teacher_toolkit.njk`

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
