# Changelog

## 2026-02-13 - IGCSE Topic 1-2 Textbook Chapter Split

### Textbook Routing
- Added chapter route at `apps/site/src/pages/igcse/[topic]/textbook/[chapter].astro`.
- Route now generates chapter pages for Topics 1-2 only:
  - Topic 1: `1-1`, `1-2`, `1-3`
  - Topic 2: `2-1`, `2-2`, `2-3`
- Each chapter page renders:
  - `## Key Terms and Definitions`
  - the selected subtopic section (`## 1.1` / `## 1.2` / `## 1.3`, etc.)
  from the existing topic markdown source, so no textbook content was duplicated or rewritten.

### IGCSE Topic Index Updates
- Updated `src/pages/igcse/topic1/index.njk` textbook section to three subtopic chapter links.
- Updated `src/pages/igcse/topic2/index.njk` textbook section to three subtopic chapter links.
- Removed the old textbook placeholder wording (`Reader template (coming soon)`) from Topic 1 and Topic 2 textbook cards.

### Route Alias Compatibility
- Added chapter `.html` aliases in `meta/migration/wave2-routes.json`:
  - `/igcse/topic1/textbook/1-1.html`
  - `/igcse/topic1/textbook/1-2.html`
  - `/igcse/topic1/textbook/1-3.html`
  - `/igcse/topic2/textbook/2-1.html`
  - `/igcse/topic2/textbook/2-2.html`
  - `/igcse/topic2/textbook/2-3.html`
- Updated `meta/migration/wave2-routes.json` `updatedAt` to `2026-02-13`.

### Documentation
- Updated `README.md` IGCSE textbook section with the new chapter route and alias notes.
- Updated `docs/SITE_STRUCTURE.md` to include the chapter route path.

## 2026-02-13 - IGCSE Topic 3.1 Textbook Rewrite (Computer Architecture)

### Content Rewrite
- Reworked `apps/site/src/content/igcse-textbooks/topic-3.md` so Topic 3 now begins at `Key Terms and Definitions`, removing legacy:
  - `## Unit Summary`
  - `## Objectives and Outcomes`
- Fully rewrote section `## 3.1 Computer Architecture` in prose-first style with varied delivery:
  - architecture and component explanation
  - register and bus role tables
  - FDE step-based teaching flow
  - instruction set (`opcode`/`operand`) framing
  - embedded-system comparison and exam checklist.
- Source grounding for 3.1 rewrite:
  - `docs/content/igcse/chapter-text-files/chapter 3 Subfiles/3.1.txt`
  - `docs/content/igcse/chapter-text-files/Chapter 3 key words.txt`

### Interactive Delivery
- Added Topic 3.1 interactive runtime:
  - `src/static/js/igcse-topic3-architecture.js`
- Added widgets for:
  - fetch-decode-execute register stepper
  - CPU performance sandbox (clock, bus, cache, cores, overclock trade-offs)
  - embedded-system classifier.
- Added supporting reader widget styles in:
  - `src/static/css/reader.css`
- Loaded Topic 3 runtime on textbook route:
  - `apps/site/src/pages/igcse/[topic]/textbook.astro`

### Index and Validation
- Updated Topic 3 textbook card copy in:
  - `src/pages/igcse/topic3/index.njk`
  removing `Reader template (coming soon)` in favour of active reader wording.
- Updated validator modern-style scope to include Topic 3:
  - `scripts/igcse-textbook/validate-textbook-coverage.mjs`

## 2026-02-12 - IGCSE Textbooks Astro Migration (Topics 1-10)

### Route and Content Migration
- Added Astro content collection schema for IGCSE textbooks in `apps/site/src/content/config.ts`:
  - `topicNumber`, `topicName`, `summary`, `subtopics`, `sourcePolicy`
- Added Astro route `apps/site/src/pages/igcse/[topic]/textbook.astro` for `/igcse/topicX/textbook`.
- Updated `apps/site/src/pages/igcse/[...route].astro` to exclude `/igcse/topic*/textbook.html` from legacy passthrough and avoid route collisions.
- Added generated textbook entries:
  - `apps/site/src/content/igcse-textbooks/topic-1.md` ... `topic-10.md`

### Pseudocode Highlighting
- Added syllabus-aligned custom highlighter runtime:
  - `src/static/js/igcse-pseudocode-highlighter.js`
- Added reader styling support for non-Shiki pseudocode token classes and language chip:
  - `src/static/css/reader.css`
- Added `language-igcse-pseudocode` rendering contract on generated worked examples.
- Applied assignment normalization rule for OCR variants (`¨`, `<-`) to `←`.

### Toolchain
- Added script suite in `scripts/igcse-textbook/`:
  - `topic-map.mjs` (authoritative topic/subtopic/source mapping)
  - `helpers.mjs` (canonical labels, extraction, normalization utilities)
  - `build-source-map.mjs`
  - `generate-topic-textbooks.mjs`
  - `validate-textbook-coverage.mjs`
  - `README.md` (usage, QA rules, source policy)
- Added npm scripts in `package.json`:
  - `igcse:textbook:source-map`
  - `igcse:textbook:generate`
  - `igcse:textbook:validate`

### Source Maps and Coverage Logging
- Added per-topic source map outputs:
  - `docs/content/igcse/textbook-source-maps/topic-1.md` ... `topic-10.md`
- Added migration QA log:
  - `docs/content/igcse/textbook-source-maps/quality-log.md`

### Route Alias Compatibility
- Added `.html` alias targets for all new textbook routes in `meta/migration/wave2-routes.json`:
  - `/igcse/topic1/textbook.html` ... `/igcse/topic10/textbook.html`

### Coverage Notes
- Topic heading labels and subtopic titles are aligned to existing website labels from `src/pages/igcse/topic*/index.njk`.
- Topic 9 includes explicit mapping notes for 9.1/9.2/9.3 coverage under source hierarchy constraints.

## 2026-02-12 - IGCSE Index Follow-up: Specification Write-up + Carousel Revision UX

### IGCSE Index Structure
- Updated `src/templates/layouts/arcade.njk` so IGCSE topic pages render section order as:
  `Textbook`, `Slide Decks`, `Student Activities`, `Assessments`, `Homework`, `Independent Tasks`, `Revision`.
- Replaced the old `Specification Sections` render path with explicit `Slide Decks` rendering from new `slideDeckResources` front matter.
- Added boxed specification summary rendering in index pages:
  `Unit Summary`, `Unit Objectives`, `Learning Outcomes`, and `Subtopic Focus`.

### Front Matter Migration (Topics 1-10)
- Migrated `src/pages/igcse/topic1/index.njk` through `src/pages/igcse/topic10/index.njk`:
  - `specification.sections` -> `slideDeckResources`
  - Added structured `specification.unitSummary`, `specification.objectives`, `specification.outcomes`, `specification.subtopics`
  - Added `css/toolkit.css` and `js/toolkit.js` to support in-page revision image carousels.
- Expanded revision entries to carousel groups where image sets exist (Topics 1-6), and kept placeholders where assets are still pending (Topics 7-10).

### Revision Carousel Integration
- Extended `src/templates/components.njk` resource buttons with `data-carousel-images` support.
- Updated `src/static/js/toolkit.js` to open carousel content directly from inline image arrays.
- Added carousel modal markup to `src/templates/layouts/arcade.njk` so revision visuals open in-page and return cleanly to the topic index.

### Cleanup
- Disabled standalone IGCSE specification route generation by setting `permalink: false` on:
  - `src/pages/igcse/topic1/specification.njk`
  - `src/pages/igcse/topic2/specification.njk`
  - `src/pages/igcse/topic3/specification.njk`
  - `src/pages/igcse/topic4/specification.njk`
  - `src/pages/igcse/topic7/specification.njk`
  - `src/pages/igcse/topic8/specification.njk`
  - `src/pages/igcse/topic9/specification.njk`
  - `src/pages/igcse/topic10/specification.njk`
- Removed obsolete static page:
  - `src/static/igcse/topic6/specification.html`
- Updated `scripts/build.js` to correctly skip page generation when `permalink: false` is set in front matter.

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

## 2026-02-12 - IGCSE Topic 1 Textbook Style Reset

### Content Rewrite
- Rewrote `apps/site/src/content/igcse-textbooks/topic-1.md` from Chapter 1 subfiles and keyword source to match IB SL prose quality style (mixed prose, tables, worked calculations, misconception handling).
- Removed legacy textbook template sections (`Unit Summary`, `Objectives and Outcomes`) from Topic 1 content body.
- Kept canonical subtopic headings (`1.1`, `1.2`, `1.3`) while replacing rigid repeated section cadence with varied section architecture.
- Removed Topic 1 pseudocode blocks and replaced with topic-appropriate arithmetic/representation worked examples.

### Validation Rules Update
- Updated `scripts/igcse-textbook/validate-textbook-coverage.mjs` to support the new writing model:
  - requires pseudocode only for Topics 7 and 8
  - removes mandatory `Overview / Applied Understanding / Worked Example` triad checks
  - enforces at least one level-3 section per subtopic
  - enforces no legacy `Unit Summary`/`Objectives and Outcomes` sections for migrated modern-style topics (currently Topic 1).

### Deployment Notes
- `npm run igcse:textbook:validate` passed after validator alignment.
- `npm run framework:build` passed.
- `firebase deploy --only hosting` completed successfully using current built output after `npm run deploy` failed due local ENOSPC during rebuild.

## 2026-02-12 - IGCSE Topic 1 Pedagogical Depth Rewrite

### Content Improvements
- Reworked `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/content/igcse-textbooks/topic-1.md` to function as a revision bridge (between full textbook and short-form revision notes), not a compact cheat sheet.
- Expanded 1.1 with full instructional flow:
  - explicit 8-bit place-value table
  - conversion method table
  - dedicated coverage for binary addition, overflow, logical shifts
  - two's-complement process in both directions (constructing and interpreting negatives).
- Expanded 1.2/1.3 explanatory prose and method steps, including:
  - character set vs encoding distinction
  - variable-impact tables for sound/image quality vs file size
  - formula-driven worked calculations with unit discipline
  - compression-choice reasoning plus RLE worked example.

### Verification and Release
- `npm run igcse:textbook:validate` passed.
- `npm run framework:build` passed.
- `firebase deploy --only hosting` passed.

## 2026-02-12 - IGCSE Topic 1 Interactive Delivery Pass

### Interactive Textbook UX
- Replaced static binary-operation rendering in `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/content/igcse-textbooks/topic-1.md` with embedded interactive widgets for:
  - 8-bit binary addition + carry + overflow
  - logical shifts with lost-bit feedback
  - two's-complement conversion in both directions.
- Added topic-specific runtime script:
  - `/Users/StevenStewart/SGS-CSC REMIX/src/static/js/igcse-topic1-interactive.js`
- Added reader-integrated widget styling:
  - `/Users/StevenStewart/SGS-CSC REMIX/src/static/css/reader.css`
- Loaded interactive runtime on Topic 1 textbook route only:
  - `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/pages/igcse/[topic]/textbook.astro`

### Verification and Release
- `npm run igcse:textbook:validate` passed.
- `npm run framework:build` passed.
- `firebase deploy --only hosting` passed.

## 2026-02-12 - IGCSE Topic 1 1.2/1.3 Coverage and Pedagogy Pass

### Content and Delivery Updates
- Reworked `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/content/igcse-textbooks/topic-1.md` section `1.2` and `1.3` to reduce repetitive section cadence and improve revision-bridge pedagogy.

## 2026-02-13 - IGCSE Topic 2 Style + Content Rewrite

### Content Rewrite
- Rewrote `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/content/igcse-textbooks/topic-2.md` using Chapter 2 subfiles and key words to match the Topic 1 prose-first quality model.
- Removed legacy template blocks (`Unit Summary`, `Objectives and Outcomes`) and replaced rigid section cadence with varied delivery (prose, comparison tables, scenario flow, worked method breakdowns).
- Removed topic-inappropriate pseudocode usage from Topic 2 and kept explanations focused on packet switching, transmission modes/methods, error checking, and symmetric/asymmetric encryption.

### Validation and Standards
- Updated `/Users/StevenStewart/SGS-CSC REMIX/scripts/igcse-textbook/validate-textbook-coverage.mjs` modern-style enforcement set from Topic 1 only to Topics 1 and 2.
- Continued pseudocode policy enforcement for algorithm-focused topics only (Topics 7 and 8).

## 2026-02-13 - IGCSE Topic 2 Pedagogy Visual Improvements

### Content Teaching Aids
- Extended `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/content/igcse-textbooks/topic-2.md` with additional visual pedagogy elements:
  - parity-bit visual grid for even and odd parity outcomes
  - parity-block/parity-byte matrix plus bit-error localisation explanation
  - symmetric vs asymmetric key-flow visual cards
  - Tom/Jane asymmetric sequence table to show key movement and decryption ownership.
- Kept visuals lightweight and reader-native (no additional JS runtime required for these additions).

### Parity Block Enhancement
- Updated parity-block teaching section in `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/content/igcse-textbooks/topic-2.md` to show two explicit states:
  - PASS matrix (all parity checks matching)
  - FAIL matrix (single-bit error case).
- Added row/column/intersection highlighting for parity failure localisation and corresponding status badges.
- Added supporting parity highlight styling in `/Users/StevenStewart/SGS-CSC REMIX/src/static/css/reader.css`.
- Added fuller text coverage:
  - character-set vs encoding clarity
  - ASCII anchor-range strategy
  - encode/decode worked examples.
- Added fuller sound coverage:
  - Nyquist explanation
  - two-level worked size calculations (simple and exam scale)
  - clearer variable-impact framing (rate, resolution, channels, duration).
- Added fuller image coverage:
  - 1/2/4/8/24-bit depth ladder
  - RGB to hex linkage
  - 4x4 bitmap walkthrough with explicit depth-size contrast.
- Added fuller compression coverage:
  - context-based rationale table
  - lossless/lossy decision framing
  - explicit RLE method walkthrough before interactive tool.

### Interactive Enhancements
- Extended `/Users/StevenStewart/SGS-CSC REMIX/src/static/js/igcse-topic1-interactive.js` with:
  - `data-igcse-encoding-compare` (ASCII/UTF-8/UTF-16/UTF-32 size comparison)
  - `data-igcse-sampling-demo` (waveform sampling visualiser with Nyquist status)
  - richer 24-bit RGB/hex callout in bitmap widget.
- Extended `/Users/StevenStewart/SGS-CSC REMIX/src/static/css/reader.css`:
  - cleaner inline code styling for readability
  - sampling visual component styles (`.igcse-wave*`).
- Added Topic 2 handoff playbook for repeatable authoring:
  - `/Users/StevenStewart/SGS-CSC REMIX/docs/content/igcse/textbook-source-maps/topic-2-authoring-playbook.md`

### Verification and Deployment Status
- `npm run igcse:textbook:validate` passed.
- `npm run framework:build` passed.
- `firebase deploy --only hosting` initially failed due Hosting storage quota (HTTP 429: exceeded quota).
- Reduced live channel retained release count from 5 to 2.
- `firebase deploy --only hosting` then passed.

## 2026-02-13 - IGCSE Topic 3.1 Scope Correction and Chapter Routing

### Content Scope Fix
- Reworked `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/content/igcse-textbooks/topic-3.md` to keep only `## 3.1 Computer Architecture` textbook content in this pass.
- Removed Topic 3 textbook body sections for `3.2`, `3.3`, `3.4`, and `3.5` pending later authoring passes.
- Removed topic-inappropriate pseudocode usage from Topic 3 textbook content and retained source-grounded architecture coverage only.
- Added a syllabus/chapter-aligned 3.1 rewrite with mixed delivery (prose, process tables, memory read/write sequence cards, and an inline SVG abstraction of FDE flow).

### Navigation and Route Updates
- Updated Topic 3 textbook cards in `/Users/StevenStewart/SGS-CSC REMIX/src/pages/igcse/topic3/index.njk` to chapter links:
  - `/igcse/topic3/textbook/3-1.html`
  - `/igcse/topic3/textbook/3-2.html`
  - `/igcse/topic3/textbook/3-3.html`
  - `/igcse/topic3/textbook/3-4.html`
- Updated chapter route generation in `/Users/StevenStewart/SGS-CSC REMIX/apps/site/src/pages/igcse/[topic]/textbook/[chapter].astro` to include Topic 3 chapter paths and prevent key-terms-only rendering when a chapter section is missing.
- Added Topic 3 chapter aliases to `/Users/StevenStewart/SGS-CSC REMIX/meta/migration/wave2-routes.json` for `.html` compatibility.

### Verification
- `npm run framework:build` passed after route-scope fix in `getStaticPaths`.
