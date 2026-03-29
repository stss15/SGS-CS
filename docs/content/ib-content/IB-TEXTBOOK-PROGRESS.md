# IB Textbook Progress — Session Log

> Last updated: 2026-03-29
> Branch: `main` (all work committed and deployed to https://sgs-science.web.app)

---

## Session 4 — 2026-03-29

### Overview

Completed the source-pack-driven textbook rebuild for themes `A2`, `A3`, and `A4` in the post-UI-overhaul textbook format. This was a full replacement of the old A2-A4 unit markdown, not a revision pass on the legacy files.

Primary source hierarchy used for the rewrite:

- `apps/site/src/lib/ib2027-syllabus.ts`
- `docs/content/ib-content/IB Textbook Improvements/A2.pdf`
- `docs/content/ib-content/IB Textbook Improvements/A3/*.pdf`
- `docs/content/ib-content/IB Textbook Improvements/A4/*.pdf`
- `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
- `docs/content/ib-content/IB Textbook Improvements/agent_style_guide.html`
- `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
- `docs/content/ib-content/IB_Content_MD/*` structure PDFs as scope and terminology guardrails
- existing B-theme textbook files as the style benchmark

Editorial rules enforced throughout:

- no `reader-section-body`
- no top-of-file glossary dumps
- no activity or worksheet voice
- dedicated HL files for HL-only material
- deliberate variation in section openings, callout use, and worked-example placement to avoid rinse-repeat structure

### 4a. Added A2 textbook files

New files created:

- `apps/site/src/content/ib-textbooks/sl/a2-1-network-fundamentals.md`
- `apps/site/src/content/ib-textbooks/hl/a2-1-tcp-ip-model.md`
- `apps/site/src/content/ib-textbooks/sl/a2-2-network-architecture.md`
- `apps/site/src/content/ib-textbooks/hl/a2-2-servers.md`
- `apps/site/src/content/ib-textbooks/sl/a2-3-data-transmissions.md`
- `apps/site/src/content/ib-textbooks/hl/a2-3-routing.md`
- `apps/site/src/content/ib-textbooks/sl/a2-4-network-security.md`
- `apps/site/src/content/ib-textbooks/hl/a2-4-security-extensions.md`

Legacy files removed:

- `apps/site/src/content/ib-textbooks/sl/unit-11.md`
- `apps/site/src/content/ib-textbooks/hl/unit-11.md`

Notes:

- `A2.1-A2.4` now render entirely from the new theme-based files.
- `A2.4.1` was rewritten as a balanced discussion rather than a one-sided firewall description.
- `A2.4.4` explicitly separates symmetric encryption, asymmetric encryption, and the role of certificate authorities/digital certificates.

### 4b. Added A3 textbook files

New files created:

- `apps/site/src/content/ib-textbooks/sl/a3-1-database-fundamentals.md`
- `apps/site/src/content/ib-textbooks/sl/a3-2-database-design.md`
- `apps/site/src/content/ib-textbooks/sl/a3-3-database-programming.md`
- `apps/site/src/content/ib-textbooks/hl/a3-3-advanced-database-programming.md`
- `apps/site/src/content/ib-textbooks/hl/a3-4-alternative-databases.md`

Legacy files removed:

- `apps/site/src/content/ib-textbooks/sl/unit-6.md`
- `apps/site/src/content/ib-textbooks/hl/unit-5.md`

Notes:

- `A3.3` is now correctly split between core SQL content and HL extension content.
- `A3.4.4` distributed databases is now present in the active textbook content.

### 4c. Added A4 textbook files

New files created:

- `apps/site/src/content/ib-textbooks/sl/a4-1-machine-learning-fundamentals.md`
- `apps/site/src/content/ib-textbooks/hl/a4-2-data-preprocessing.md`
- `apps/site/src/content/ib-textbooks/hl/a4-3-core-approaches.md`
- `apps/site/src/content/ib-textbooks/hl/a4-3-advanced-approaches.md`
- `apps/site/src/content/ib-textbooks/sl/a4-4-ethical-considerations.md`

Legacy files removed:

- `apps/site/src/content/ib-textbooks/sl/unit-7.md`
- `apps/site/src/content/ib-textbooks/hl/unit-7.md`
- `apps/site/src/content/ib-textbooks/hl/unit-8.md`
- `apps/site/src/content/ib-textbooks/hl/unit-9.md`

Notes:

- Canonical scope was kept to `A4.1.1-A4.4.2`.
- Legacy `A4.2.4` and `A4.3.11` were intentionally not preserved as active standalone textbook entries.
- Discussion prompts from the source PDFs were excluded where they drifted into activity design instead of textbook exposition.

### 4d. Verification

Verification completed:

- `npm run build` passed
- `A2`, `A3`, and `A4` textbook coverage was checked against the new files and the syllabus codes
- `rg "reader-section-body|## Key Terms and Definitions" apps/site/src/content/ib-textbooks/{sl,hl}/a2* apps/site/src/content/ib-textbooks/{sl,hl}/a3* apps/site/src/content/ib-textbooks/{sl,hl}/a4*` returned no matches
- `rg "A4\\.2\\.4|A4\\.3\\.11" apps/site/src/content/ib-textbooks/{sl,hl}/a4*` returned no matches

Build notes:

- Existing Astro route-conflict warnings from `src/pages/ib-2027/[...rest].astro` were still present but unchanged and non-blocking.

### 4e. Remaining legacy-unit caveat

Not all remaining `unit-*` textbook files were deleted in this session.

Files still present after the A2-A4 cutover:

- `apps/site/src/content/ib-textbooks/hl/unit-1.md`
- `apps/site/src/content/ib-textbooks/hl/unit-2.md`
- `apps/site/src/content/ib-textbooks/hl/unit-10.md`
- `apps/site/src/content/ib-textbooks/sl/unit-8.md`
- `apps/site/src/content/ib-textbooks/sl/unit-12.md`

These were left in place because the current repo source still relies on them for unreplaced `A1`, `IA`, and `Case Study` textbook coverage. They are now the only remaining unit-based textbook files and should be removed immediately after their theme-based replacements exist.

---

## Session 3b — 2026-03-29 (follow-up fixes)

### Overview

Five UI bug fixes deployed after reviewing the live textbook page:

---

### Fix 1: Python syntax highlighting restored (reader.css)

Shiki (Astro's built-in code highlighter) injects inline `style="color:..."` spans for keywords, strings, comments etc. Our `reader.css` had `color: #e6edf9 !important;` on `.reader-content pre.astro-code`, which overrode all Shiki inline styles and made code blocks a flat single colour. Removed the `!important` so Shiki's syntax colours now render correctly (keywords pink/red, strings light blue, comments grey).

**File changed:** `src/static/css/reader.css` (line 430)

---

### Fix 2: Full-width layout (reader.css)

The reader was constrained by three width limits:
- `--reader-page-width: 72rem` on `:root`
- `max-width: min(100%, 62rem)` on `.reader-prose`
- `max-width: 68ch` on `.reader-content p`

All three removed (`100%`/`none`). The textbook now fills the full available content track beside the sidebar.

**File changed:** `src/static/css/reader.css`

---

### Fix 3: Modal overlay full-viewport coverage (reader.css)

The definition keyword modal overlay was not covering the full screen — an artifact gap appeared around the edges. Changed from `inset: 0` (which can be affected by parent stacking context) to explicit `top/left/right/bottom: 0` with `width: 100vw; height: 100vh`. Also increased backdrop opacity (0.22 → 0.38) and blur (3px → 4px).

**File changed:** `src/static/css/reader.css`

---

### Fix 4: Improved whitespace / spacing (reader.css)

Everything felt "rammed together". Increased margins and padding:
- Paragraph/list-item margin: `0.55em → 0.75em`
- H2 margin-top: `2rem → 2.5rem`
- H3 margin-top: `1.35rem → 2rem`
- Chapter-level spacing between major IB sections: `2rem/3rem → 3rem/4rem`

**File changed:** `src/static/css/reader.css`

---

### Fix 5: Sidebar textbook sub-unit numbers visible (CourseExplorer.astro)

The textbook sidebar items (B2.1, B2.2, etc.) all pointed to `textbook/index.html#b2-1`, `textbook/index.html#b2-2`, etc. The `hrefMatchesCurrentPath()` function strips hash fragments, so ALL items matched as "current" and received the gold-background + white-text active style — making the B2.1 numbers invisible.

Fixed by adding an `itemIsCurrent()` helper that returns `false` for any link containing a `#` hash fragment. This prevents hash-anchored links from being marked as current at SSR time.

**File changed:** `apps/site/src/components/CourseExplorer.astro`

---

## Session 3 — 2026-03-29

### Overview

This session focused on a full editorial UI refinement of the IB textbook reader. No content was changed — all work was purely stylistic, applied globally via `reader.css` and `tokens.css`. The goal was to make the textbook feel closer to a polished e-reader / print-ready textbook, rather than raw HTML content.

---

### 5a. Progress log updated (IB-TEXTBOOK-PROGRESS.md)

Added entries for the two commits made since the last session:

- `bcb73f83` — **Redesign textbook reader UI**: Major overhaul of `reader.css` introducing the Academic Atelier theme, paper-effect containers, editorial dividers, scroll-spy, and responsive breakpoints.
- `1a338d34` — **Finalize textbook reader refinements**: Follow-up polish pass tightening spacing, refining component blocks, and fixing mobile overflow.

---

### 5b. Removed "In this chapter" jump-nav (textbook.astro)

The top-of-page contents block (`.ib-textbook-contents`) was a jump-nav listing all chapter sections (B2.1, B2.2, etc.) with anchor links. This was removed because:

- It duplicated the sidebar navigation exactly — students already have section links in the sidebar.
- It added visual weight before any content appeared.
- The scroll-spy JS that powered it was tied to this block; with the block gone the JS was also cleaned up.

**File changed:** `apps/site/src/pages/ib-2027/[level]/textbook.astro` — removed `<div class="ib-textbook-contents">` block (~16 lines).

---

### 5c. Fixed sidebar textbook topic link colors (tokens.css)

**Problem:** Sub-unit anchor links in the Textbook group of the sidebar (e.g. B2.1, B2.2, B3.1) were rendering in `rgba(23, 34, 49, 0.88)` — a dark semi-transparent tone that blended with the warm cream sidebar background (`#f8f6f2`), making links hard to distinguish.

**Fix:** Changed `.course-explorer__item-link` and `.course-explorer__direct-link` color to `var(--navy-900)` (`#0a1628`) for solid legibility. The active/hover state retains the gold highlight.

**File changed:** `apps/site/src/styles/tokens.css` — line ~2434.

---

### 5d. Full reader CSS editorial overhaul (reader.css)

This was the largest change — a ground-up rewrite of the post-redesign CSS layer in `reader.css`. Key changes:

#### Typography scale
- Reduced `--reader-scale` from `1.05` → `0.96` — everything was slightly too large, causing excessive scrolling.
- Reader body line height: `1.72` for paragraphs (generous reading rhythm).
- Paragraph max-width capped at `68ch` to prevent excessively long lines.

#### Heading hierarchy
- **Section H2** (chapter names like A1.1, B2.3): `clamp(1.6rem, 2.3vw, 2.1rem)` bold display — large and clear, no card border.
- **Sub-section H2** (within-content headings): `clamp(1.1rem, 1.45vw, 1.3rem)` — clearly subordinate.
- **H3** (subsection labels): `0.95rem` with a 2px left-bar accent in semantic color (blue = exam, gold = concept, green = applied, purple = worked example). No card/box background — cleaner editorial style.

#### Section / chapter spacing
- Between chapter sections (`.ib-textbook-section + .ib-textbook-section`): `3rem` padding-top with a gradient rule line (fades left → right).
- Subtopic H2 headings inside content have `3.5rem` top margin with a short top-rule (`2px` line, `3.5rem` wide) above them.
- This creates clear visual breaks between major topics without card borders.

#### Component blocks
All callout blocks switched from heavy card-with-border to minimal left-bar + gradient-fade:
- **Definitions** (`.ib-textbook-defn`): 2px gold left border, gradient fade.
- **Notes** (`.ib-textbook-note`): 3px blue left border, light rounded card.
- **Warnings** (`.ib-textbook-warning`): 3px red left border, light rounded card.
- **Worked examples** (`.ib-textbook-worked`): 3px purple left border, very subtle background.
- **Summaries** (`.ib-textbook-summary`): 3px green left border, very subtle background.

#### Keyword styling
Keywords changed from pill-style chips to **inline highlight underlay** — a subtle warm-gold bar behind the text (like a highlighter pen), no box or border. Much less visually cluttered.

#### Code blocks
- Border radius reduced from `14px` → `0.85rem`.
- Shadow tightened.
- Language badge repositioned slightly.

#### Tables
- Border radius reduced from `14px` → `0.75rem`.
- Background slightly transparent (`rgba(255,255,255,0.86)`).

#### Responsive breakpoints
- **≤1100px**: Reduced content padding.
- **≤900px**: Unconstrained stage width, smaller dochead padding, single-column contents list.
- **≤640px**: Compact mobile padding, tables/code become horizontally scrollable, adjusted H2/H3 sizes.

**File changed:** `src/static/css/reader.css` — full rewrite of the editorial refinement section (~800 lines changed/added).

---

### 5e. Build and deploy

After all changes were committed:

```bash
npm run build          # Astro + Eleventy build
npx firebase deploy --only hosting
```

Live site: https://sgs-science.web.app

---

## What still needs to be done

### A-theme textbook content (not yet written)

| Theme | Section | Syllabus points | Status |
|-------|---------|-----------------|--------|
| A1 | A1.3 Networks and communications | A1.3.1–A1.3.6 | ❌ Not started |
| A1 | A1.4 Cybersecurity | A1.4.1–A1.4.5 | ❌ Not started |
| A1 | HL extensions (A1.1 HL, A1.3 HL, A1.4 HL) | Various | ❌ Not started |
| A2 | A2.1 Abstraction and thinking | A2.1.1–A2.1.4 | ❌ Not started |
| A2 | A2.2 Algorithms and program design | A2.2.1–A2.2.5 | ❌ Not started |
| A2 | A2.3 Impacts of computing | A2.3.1–A2.3.4 | ❌ Not started |
| A2 | A2.4 Emerging technologies | A2.4.1–A2.4.3 | ❌ Not started |
| A3 | A3.1 Databases and SQL | A3.1.1–A3.1.6 | ❌ Not started |
| A3 | A3.2 Data modelling | A3.2.1–A3.2.4 | ❌ Not started |
| A3 | A3.3 Data analysis | A3.3.1–A3.3.3 | ❌ Not started |
| A3 | A3.4 HL extensions | A3.4.1–A3.4.4 | ❌ Not started |
| A4 | A4.1 Networks — infrastructure | A4.1.1–A4.1.5 | ❌ Not started |
| A4 | A4.2 Communication protocols | A4.2.1–A4.2.4 | ❌ Not started |
| A4 | A4.3 Internet technologies | A4.3.1–A4.3.4 | ❌ Not started |
| A4 | A4.4 HL extensions | A4.4.1–A4.4.3 | ❌ Not started |

### B-theme gaps

| Theme | Section | Issue | Status |
|-------|---------|-------|--------|
| B1 | B1.2 Systems thinking | Not written yet | ❌ Not started |
| B1 | B1.3 System design | Not written yet | ❌ Not started |
| B1 | B1.4 System change | Not written yet | ❌ Not started |

### Reader / UX improvements

- [ ] Add a scroll-spy to the sidebar so the active B2.1/B2.2 anchor link highlights as you scroll past each section on the textbook page
- [ ] Add a "Back to top" button that appears after scrolling down on the textbook page
- [ ] Consider adding a progress indicator (e.g. thin progress bar at top) for long textbook pages

### Content quality

- [ ] Peer-review all textbook content against the official IB 2027 guide once it's finalised
- [ ] Add more worked examples and Python code samples to B2.3 (programming constructs)
- [ ] B3.2 (OOP advanced HL) design patterns section could be expanded with UML diagrams
- [ ] B4.1 (ADTs) linked list diagrams would benefit from SVG visual representations of node/pointer structures

### Workflow improvements for next session

- Create a feature branch before starting: `git checkout -b feat/ib-textbook-a-themes`
- Keep `src/static/` as the single source of truth for JS/CSS — don't edit `public/` directly
- Use `npm run build && firebase deploy --only hosting` after every major content chunk, not just at the end

---

## Session 2 — 2026-03-29

### Textbook reader editorial redesign (reader.css + reader.js)

Major editorial-style visual overhaul of the textbook reader:

- Added "Academic Atelier" theme refresh with warm accent colors, updated radius values, and refined surface backgrounds.
- Added "Editorial textbook refinement" layer — paper-effect container with gradient background and shadow, constrained page width (72rem), generous dochead padding, and large display title.
- Overhauled subtopic headings (H2/H3) — removed card-style borders in favour of minimal left-accent bars with semantic colour coding (blue for commands, gold for concepts, green for applied, purple for examples).
- Replaced card-style section body wrappers with subtle left-border + gradient-fade backgrounds.
- Refined typography: increased line-height, adjusted heading sizes with clamp(), improved list and blockquote spacing.
- Improved code blocks with larger border radius, dark border, and deeper shadow.
- Added scroll-spy to "In this chapter" contents block — active link highlights as you scroll past each section, with `aria-current` support.
- Fixed overflow-x issues on reader body and main container.
- Added responsive breakpoints for mobile (900px, 640px) with adjusted spacing, font sizes, and single-column contents grid.
- Prevented wide tables and code blocks from expanding the mobile page track.

**Files changed:** `src/static/css/reader.css`, `src/static/js/reader.js`, `public/css/reader.css`, `public/js/reader.js`

---

## Session 1

## What was done this session

### 1. Textbook reader redesign (reader.css + reader.js)

Replaced the old `<details>`-based collapsible chapter system with a flat, continuous-scroll reader.

- Each major section (B2.1, B2.2, etc.) now has a bold editorial divider: 5px accent left border, gradient background, large H2 heading.
- Subtopic headings (B2.1.1, B2.1.2, etc.) have their own card-style headers with dashed separators between them.
- The "In this chapter" jump-nav at the top of each textbook page has a matching accent border and hover slide animation.
- Removed all `<details>` chapter wrapping from `reader.js` and the supporting CSS.
- Removed the `expandChapterForId` function (no longer needed).

**Files changed:** `src/static/js/reader.js`, `src/static/css/reader.css`, `public/js/reader.js`, `public/css/reader.css`

---

### 2. Sidebar TEXTBOOK header now navigates to the textbook page

Added a `groupHref` property to `ShellNavGroup` so accordion group headers can also act as navigation links.

- Clicking **TEXTBOOK** in the sidebar from any unit overview page now navigates to the textbook page.
- When already on the textbook page, clicking TEXTBOOK just expands/collapses the accordion.
- B2.1, B2.2 etc. links remain as anchor links (`#b2-1`, `#b2-2`) that scroll to the relevant section.

**Files changed:** `apps/site/src/lib/curriculum-shell.ts`, `apps/site/src/lib/auto-shell.ts`, `apps/site/src/components/CourseExplorer.astro`

---

### 3. New textbook content written (B themes)

All B-theme HL and SL textbook content written fresh from IB 2027 textbook PDF source material.

| File | Covers | Syllabus points |
|------|--------|-----------------|
| `src/content/ib-textbooks/sl/b1-1-computational-thinking.md` | B1.1 Computational Thinking | B1.1.1–B1.1.4 |
| `src/content/ib-textbooks/sl/b2-1-fundamentals.md` | B2.1 Programming fundamentals | B2.1.1–B2.1.4 |
| `src/content/ib-textbooks/sl/b2-2-data-structures.md` | B2.2 Data structures | B2.2.1–B2.2.4 |
| `src/content/ib-textbooks/sl/b2-3-programming-constructs.md` | B2.3 Programming constructs | B2.3.1–B2.3.4 |
| `src/content/ib-textbooks/sl/b2-4-algorithms.md` | B2.4 Programming algorithms | B2.4.1–B2.4.3 |
| `src/content/ib-textbooks/sl/b2-5-file-processing.md` | B2.5 File processing | B2.5.1 |
| `src/content/ib-textbooks/hl/b2-4-recursion.md` | B2.4 Recursion (HL) | B2.4.4–B2.4.5 |
| `src/content/ib-textbooks/sl/b3-1-oop-fundamentals.md` | B3.1 OOP fundamentals | B3.1.1–B3.1.5 |
| `src/content/ib-textbooks/hl/b3-2-oop-advanced.md` | B3.2 OOP advanced (HL) | B3.2.1–B3.2.5 |
| `src/content/ib-textbooks/hl/b4-1-abstract-data-types.md` | B4.1 ADTs (HL) | B4.1.1–B4.1.6 |

Also created partial A1 content:
| File | Covers | Syllabus points |
|------|--------|-----------------|
| `src/content/ib-textbooks/sl/a1-1-hardware.md` | A1.1 Computer hardware | A1.1.1–A1.1.5 |
| `src/content/ib-textbooks/sl/a1-2-data.md` | A1.2 Data representation | A1.2.1–A1.2.4 |

---

### 4. Component system established

Defined HTML component classes for structured callout blocks used consistently across all textbook files:

| Class | Purpose |
|-------|---------|
| `ib-textbook-summary` | Key takeaways block (end of each section) |
| `ib-textbook-warning` | Common mistake / red flag |
| `ib-textbook-note` | Exam tip / blue callout |
| `ib-textbook-worked` | Worked example (trace-through, code demo) |
| `ib-textbook-defn` | Term + definition block |

Styles for all of these are in `src/static/css/reader.css`.

---

## Mistakes made / lessons learned

### Mistake 1 — Wrong syllabus point code for hash tables (B4)
The old `unit-6.md` had `B4.1.7` for hash tables, which doesn't exist. Hash tables are covered under `B4.1.6` (Core principles of ADTs). Also missing were `B4.1.1` (ADT properties/purpose) and `B4.1.3` (linked list construction). All corrected in the new file.

### Mistake 2 — Two source locations for reader.js / reader.css
The build pipeline copies `src/static/js/reader.js` → `public/js/reader.js` → `apps/site/dist/js/reader.js`. Editing only `public/js/reader.js` was overwritten on the next build. Both `src/static/` and `public/` must be kept in sync manually (or ideally only `src/static/` should be the source of truth).

### Mistake 3 — Committing directly to main throughout
All work was committed directly to `main` rather than a feature branch, so no PR workflow was possible. For future sessions, create a feature branch first (`git checkout -b feat/ib-textbooks`) and PR into main when done.

### Mistake 4 — Large dist/public committed as tracked files
The `.gitignore` lists `public/` and `apps/site/dist/` but they're already tracked (force-added historically). This causes every build to generate ~750 modified files in git status. Ideally these should be untracked and deployed directly from CI. For now, they must be force-added after each build.

### Mistake 5 — `unitNumber` frontmatter collisions
Early textbook content used sequential `unitNumber` values that didn't match anything meaningful. The field is used for ordering, so any duplicate or wrong value causes content to appear out of order. Use a high unique number (e.g. 31, 32) for content not yet assigned a canonical number.

---

## Session 5 — 2026-03-29 remediation pass

This session was a targeted quality pass over the first A2-A4 rewrite after a structured multi-agent review against the local textbook rubric and the rewritten B-theme benchmark files.

### Files revised

| File | Focus of remediation |
|------|----------------------|
| `src/content/ib-textbooks/sl/a3-2-database-design.md` | Added clearer normalization reasoning-in-motion and restored peer syllabus-heading structure |
| `src/content/ib-textbooks/sl/a3-3-database-programming.md` | Removed HL bleed, promoted `A3.3.2` and `A3.3.3` to peer sections, tightened SL scope |
| `src/content/ib-textbooks/hl/a3-3-advanced-database-programming.md` | Added a concrete grouped-results aggregate example with `GROUP BY` / `HAVING` distinction |
| `src/content/ib-textbooks/hl/a3-4-alternative-databases.md` | Rebuilt around fuller textbook exposition and the current A3 source material |
| `src/content/ib-textbooks/hl/a4-2-data-preprocessing.md` | Rewrote around before/after dataset work, clearer feature-selection judgement, and stronger dimensionality-reduction trade-offs |
| `src/content/ib-textbooks/hl/a4-3-core-approaches.md` | Added traced linear-regression residuals, a worked classification example, and counted association-rule metrics |
| `src/content/ib-textbooks/hl/a4-3-advanced-approaches.md` | Rebuilt CNN explanation around filter/pooling motion and added a more concrete genetic-algorithm process example |
| `src/content/ib-textbooks/sl/a4-4-ethical-considerations.md` | Rewrote as scenario-led IB discussion rather than generic issue listing |
| `src/content/ib-textbooks/hl/a2-4-security-extensions.md` | Reframed around clearer vulnerability distinctions and stronger threat-to-countermeasure logic |

### Review-guided decisions

- Prioritized hard scope and style failures before minor line edits:
  - removed aggregate-query drift from SL A3.3
  - rebuilt weaker A4 sections around worked thinking rather than overview prose
  - reduced the taxonomy-heavy feel in A2.4 HL
- Used the following local rubric sources as calibration:
  - `docs/content/ib-content/IB Textbook Improvements/agent_textbook_skill_guide.md`
  - `docs/content/ib-content/IB Textbook Improvements/IB_Writing_Style.html`
- Used rewritten B-theme textbook files as the live benchmark for component use, pacing, and rhetorical variation.

### Verification

- `npm run build`
  - passed after remediation
  - Astro still emitted one duplicate-content-id warning for `hl/a3-4-alternative-databases` during content sync, but the build completed and the textbook routes generated successfully

---

## How to start the next session

```bash
# Start with A1.3 (Networks) — PDF pages are in:
# docs/content/ib-content/IB Textbook Improvements/A1/

# Target file:
# apps/site/src/content/ib-textbooks/sl/a1-3-networks.md

# After writing content:
npm run build
npx firebase deploy --only hosting
```

Content source PDFs are at:
```
docs/content/ib-content/IB Textbook Improvements/
├── A1/
├── A3/
├── A4/
├── B1/
├── B2/
├── B3/
├── B4/
└── IB Comp Sci 2027.pdf   ← full syllabus reference
```
