# IB 2027 Textbook Reader UX/CSS Evaluation

## Date
- 2026-02-11

## Scope
- Reader UX and CSS for all IB 2027 textbook routes (`/ib-2027/<level>/unit-<n>/textbook/index.html`).
- No activities, tasks, or question banks added.
- Preserve objective/outcome coverage while reducing text-wall fatigue.

## Current-State Problems Identified
1. Visual monotony: repeated heading style and repeated list structure made long pages feel samey.
2. Weak subsection semantics: subtopic blocks did not visually distinguish command requirement vs explanation vs application vs example.
3. Bullet overload: repeated unordered lists produced a wall-of-points reading pattern.
4. Code legibility risk: syntax-highlighted blocks inherited inconsistent inline coloring and low hierarchy cues.
5. Scroll fatigue: textbook defaults relied on full-scroll mode unless users manually switched to paged mode.

## UX Goals
1. Create stronger visual hierarchy without adding teacher-facing pedagogy.
2. Use restrained color sectioning to help students orient quickly.
3. Keep objective/outcome alignment explicit and visible.
4. Improve code/table scan quality for revision use.
5. Reduce default long-scroll behavior.

## Design Decisions Implemented
1. Keep `h2` as major anchors; use underline for global sections (Key Terms, Command Map) and card-style blocks for subtopic `h2` headings.
2. Replace all-caps subheading styling with sentence-case, semantically color-coded `h3` blocks:
   - command requirement
   - concept meaning
   - system application
   - worked example
3. Convert "How ... appears in systems" list content into styled card rows to reduce list-wall effect.
4. Add command-term badge treatment so required command language is immediately scannable.
5. Upgrade code blocks with consistent high-contrast background and visible language chip.
6. Keep tables compact and structured with striping/column emphasis for scan speed.
7. Default textbook reader behavior to paged mode via route-level config while preserving user toggles.

## Files Changed
- `src/static/css/reader.css`
- `src/static/js/reader.js`
- `apps/site/src/pages/ib-2027/[level]/[unit]/textbook.astro`

## Outcome/Objective Coverage Safeguard
- Command-and-outcome map remains at top of each unit.
- Subtopic `h2` sections remain one-per-mapped-code.
- No mapped syllabus code removed.

## Next Iteration Ideas (Not Yet Implemented)
1. Add optional compact "summary cards" view toggle for ultra-fast revision.
2. Add per-subtopic collapsible sections on mobile only.
3. Add visual glossary chips that jump to Key Terms table entries.
4. Add reading-time estimates per section in TOC.

## Exit Criteria for This Pass
- Improved readability and hierarchy on SL/HL textbook pages.
- Reduced perceived text-wall effect.
- Preserved objective/outcome alignment and mapped scope boundaries.

## Follow-up Pass (2026-02-11, later)
### Additional Feedback Captured
1. Remove non-essential top-of-page framing text.
2. Remove duplicated command/outcome table.
3. Keep color semantics, but connect heading and content as one grouped block.
4. Restore clean, indented bullets inside grouped containers.
5. Reduce "same script" reading pattern by increasing variation in heading language and content format.

### Implementation Updates
1. `Unit focus` callout removed from textbook route rendering.
2. Generator no longer emits the generic intro paragraph or command/outcome map.
3. Reader CSS now applies same-tone header + outlined body containers for each subsection type.
4. Application/example list sections now use container-level styling instead of per-item card boxing.
5. Generator now uses varied subsection heading sets and richer B1 example formats (tables + contextual mappings + trace content).
6. Python block spacing tightened for readability:
   - `.reader-content pre code { line-height: 1.42; }`
   - `.reader-content pre.astro-code .line { line-height: 1.42; }`

### Validation Alignment Update
1. Validator now enforces:
   - mapped-code section headings
   - key-terms section presence
   - explicit command-term text per mapped section
2. Validator now fails if command/outcome map reappears.
