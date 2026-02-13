# IGCSE Textbook Migration Quality Log

## Run Metadata

- Date: 2026-02-12
- Scope: IGCSE Topic 1-10 textbook migration to Astro content collection
- Source policy: `igcse_textbook_then_syllabus_then_slides`
- Generator: `scripts/igcse-textbook/generate-topic-textbooks.mjs`
- Validator: `scripts/igcse-textbook/validate-textbook-coverage.mjs`

## Completion Status

- Topic 1: Complete (`apps/site/src/content/igcse-textbooks/topic-1.md`)
- Topic 2: Complete (`apps/site/src/content/igcse-textbooks/topic-2.md`)
- Topic 3: Complete (`apps/site/src/content/igcse-textbooks/topic-3.md`)
- Topic 4: Complete (`apps/site/src/content/igcse-textbooks/topic-4.md`)
- Topic 5: Complete (`apps/site/src/content/igcse-textbooks/topic-5.md`)
- Topic 6: Complete (`apps/site/src/content/igcse-textbooks/topic-6.md`)
- Topic 7: Complete (`apps/site/src/content/igcse-textbooks/topic-7.md`)
- Topic 8: Complete (`apps/site/src/content/igcse-textbooks/topic-8.md`)
- Topic 9: Complete (`apps/site/src/content/igcse-textbooks/topic-9.md`)
- Topic 10: Complete (`apps/site/src/content/igcse-textbooks/topic-10.md`)

## Validation Snapshot

- `npm run igcse:textbook:validate` passed
- Checked topics: 10
- Checked mapped subtopics: 37
- `language-python` usage in IGCSE textbook content: none
- `language-igcse-pseudocode` coverage: present across generated subtopic worked examples

## Known Caveats

- OCR-derived chapter text can contain occasional sentence fragmentation in source-map evidence output files.
- Topic 9 chapter extraction is primarily 9.1 text-based; 9.2/9.3 textbook coverage also uses existing SGS SQL/building artifacts under the locked source hierarchy.
- Legacy `src/pages/igcse/topic*/textbook.njk` placeholders remain intentionally as non-authoritative migration artifacts.

## Debug References

- Route implementation: `apps/site/src/pages/igcse/[topic]/textbook.astro`
- Legacy passthrough exclusion: `apps/site/src/pages/igcse/[...route].astro`
- Collection schema: `apps/site/src/content/config.ts`
- Topic mapping: `scripts/igcse-textbook/topic-map.mjs`
- Source maps: `docs/content/igcse/textbook-source-maps/topic-<n>.md`



## Revision 2 Findings (Topic 1 Style Reset)

- Date: 2026-02-12
- Trigger: review feedback that Topic 1 textbook content was too scripted, over-templated, and not sufficiently grounded in chapter source tone.

### Issues Fixed

1. Removed legacy top-of-page template blocks (`Unit Summary`, `Objectives and Outcomes`) from Topic 1 textbook content.
2. Replaced rigid repeated structure with mixed delivery style (prose, comparison tables, worked arithmetic walkthroughs, misconception checks).
3. Re-grounded Topic 1 content directly in:
   - `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.1.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.2.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.3.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 1 key words.txt`
4. Removed pseudocode examples from Topic 1 (non-algorithm unit), replacing with exam-style numeric worked examples.
5. Updated validator policy for migration phase:
   - no enforced `Overview / Applied Understanding / Worked Example` trio
   - pseudocode required only for Topics 7 and 8
   - modern style checks (`no Unit Summary`, `no Objectives and Outcomes`) currently enforced for Topic 1 and expanded topic-by-topic during rewrites.

### Replication Notes for Topic 2

1. Keep `## Key Terms and Definitions` first.
2. Avoid front-loaded summary/objectives sections.
3. Keep canonical subtopic headings exactly aligned to website labels.
4. Use varied internal section titles and delivery formats between subtopics.
5. Use chapter text + keyword file as first source; only fill structural gaps from syllabus/slides.
6. Use pseudocode only when topic coverage explicitly warrants it (currently locked to Topics 7 and 8).

## Revision 3 Findings (Topic 1 Pedagogical Depth Pass)

- Date: 2026-02-12
- Trigger: feedback that content layout was cleaner but teaching depth and student-facing wording were still too thin.

### Pedagogical Changes Applied

1. Reframed section language to student-first explanatory wording (removed terse "cheat-sheet" style labels).
2. Expanded explanation depth for 1.1 with:
   - explicit place-value table (`128 ... 1`)
   - conversion method matrix
   - separate treatment of addition/overflow/shifts
   - full two's-complement process in both directions (encode and decode).
3. Expanded 1.2 delivery from summary notes into concept-to-method flow:
   - character set vs encoding distinction
   - media-variable impact tables for sound/image
   - worked storage calculations with interpretation.
4. Expanded 1.3 into applied revision-bridge coverage:
   - binary unit system and conversion accuracy emphasis
   - formula recap with process discipline
   - compression choice logic with RLE worked example.
5. Preserved mixed-mode delivery (prose + bullets + tables + worked examples) while keeping specification-bound scope.

### Topic 2 Replication Additions

1. Start each subtopic with a short orientation paragraph ("what this is and why it matters").
2. Include at least one "method table" and one "worked process" per subtopic.
3. Treat misconceptions as a dedicated micro-section where relevant.
4. Ensure each required specification skill appears as a visible, teachable step sequence.

## Revision 4 Findings (Interactive Delivery Upgrade)

- Date: 2026-02-12
- Trigger: feedback that content quality improved but delivery still felt static/PDF-like, especially for binary operations.

### UX/Delivery Changes Applied

1. Replaced static plaintext binary addition formatting with an interactive 8-bit adder widget.
2. Added interactive logical-shift widget showing:
   - before/after bit patterns
   - shifted-out bits
   - decimal effect for positive unsigned values.
3. Added interactive two's-complement helper with both directions:
   - denary -> 8-bit two's complement step breakdown
   - 8-bit two's complement -> denary step breakdown.
4. Added reader-native widget styling in `reader.css` so tools remain visually integrated with textbook sections and responsive layouts.
5. Loaded topic-specific widget runtime only on Topic 1 textbook route to avoid unnecessary script weight on other topics.

## Revision 5 Findings (Topic 1 Coverage + Delivery Balance)

- Date: 2026-02-12
- Trigger: feedback that 1.2/1.3 still felt repetitive, under-scaffolded, and too static in delivery.

### Issues Fixed

1. Rebuilt Topic 1 sections 1.2 and 1.3 with fuller syllabus-aligned coverage from Chapter 1 sources:
   - `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.2.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 1 Subfiles/1.3.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 1 key words.txt`
2. Added explicit text representation teaching sequence:
   - character set vs encoding distinction
   - ASCII anchor ranges
   - encode/decode worked examples.
3. Expanded sound pedagogy:
   - variable impact table
   - Nyquist explanation
   - simple + exam-scale worked size calculations.
4. Expanded image pedagogy:
   - depth ladder (1/2/4/8/24-bit)
   - RGB-to-hex linkage
   - 4x4 bitmap walkthrough showing size impact across depths.
5. Expanded compression pedagogy:
   - practical context matrix
   - lossless/lossy selection language
   - explicit RLE step walkthrough before interactive demo.
6. Added two new Topic 1 interactive tools in `src/static/js/igcse-topic1-interactive.js`:
   - encoding size comparison (`ASCII`, `UTF-8`, `UTF-16`, `UTF-32`)
   - sampling/Nyquist waveform visualiser.
7. Updated reader presentation styles in `src/static/css/reader.css`:
   - cleaner inline code chips
   - waveform visual styles for sampling demo.

### Verification Snapshot

- `npm run igcse:textbook:validate` passed.
- `npm run framework:build` passed.
- `firebase deploy --only hosting` initially blocked by Firebase Hosting quota (HTTP 429, storage limit exceeded).
- Resolved by reducing live channel retained releases from 5 to 2.
- `firebase deploy --only hosting` then passed successfully.

## Revision 6 Findings (Topic 2 Rewrite Replication)

- Date: 2026-02-13
- Trigger: user request to replicate the Topic 1 prose-first quality model onto Topic 2.

### Issues Fixed

1. Removed legacy template sections (`Unit Summary`, `Objectives and Outcomes`) from Topic 2 textbook body.
2. Replaced scripted repeated section cadence with mixed delivery:
   - explanatory prose blocks
   - comparison tables
   - scenario walkthroughs
   - worked parity/encryption process explanations.
3. Removed non-essential pseudocode blocks from Topic 2 and kept coverage aligned to chapter source content and exam language.
4. Re-grounded Topic 2 content directly in:
   - `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.1.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.2.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 2 Subfiles/2.3.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 2 key words.txt`
5. Expanded validator modern-style enforcement set to include Topic 2:
   - `scripts/igcse-textbook/validate-textbook-coverage.mjs` now enforces no legacy summary/objectives sections for Topics 1 and 2.

### Replication Notes for Topic 3

1. Keep canonical subtopic `##` headings unchanged from website labels.
2. Keep `## Key Terms and Definitions` as first content section.
3. Avoid rigid triad headings; vary the internal pedagogy by subtopic.
4. Use worked process sections with real values and interpretation, not pseudocode by default.
5. Keep method vocabulary explicit where marks are tied to command words and protocol terms.

## Revision 7 Findings (Topic 2 Pedagogy Visuals Pass)

- Date: 2026-02-13
- Trigger: follow-up feedback requesting clearer "showing" for parity and encryption processes.

### Changes Applied

1. Added explicit parity-bit worked visuals for both even and odd parity outcomes using bit-grid formatting.
2. Added a parity-block + parity-byte visual matrix and a single-bit error localisation walkthrough (row + column intersection method).
3. Added lightweight encryption flow visuals:
   - symmetric key flow
   - asymmetric key flow
   - Tom/Jane step-sequence table showing public-key transit and private-key decryption.
4. Kept implementation intentionally low-complexity (no heavy runtime tooling) while improving conceptual visibility.

## Revision 8 Findings (Topic 2 Parity Block Pass/Fail Visualisation)

- Date: 2026-02-13
- Trigger: feedback requesting a clearer two-state parity block teaching view.

### Changes Applied

1. Reworked parity block section into explicit:
   - green pass-state matrix
   - red fail-state matrix.
2. Added visual error-location cues in fail-state matrix:
   - failed row highlight
   - failed column highlight
   - stronger highlight at row/column intersection bit.
3. Added step text that maps directly to the matrix colours ("row fails", "column fails", "intersection bit").
4. Added lightweight reader CSS classes for parity row/column/intersection highlighting in `src/static/css/reader.css`.

## Revision 9 Findings (Topic 3.1 Architecture Rewrite)

- Date: 2026-02-13
- Trigger: user request to build Topic 3.1 with the same prose-first quality, source grounding, and dynamic delivery used in Topics 1 and 2.

### Changes Applied

1. Rewrote Topic 3 textbook intro and 3.1 section in:
   - `apps/site/src/content/igcse-textbooks/topic-3.md`
2. Removed legacy top sections from Topic 3 textbook body:
   - `## Unit Summary`
   - `## Objectives and Outcomes`
3. Re-grounded Topic 3.1 content directly in:
   - `docs/content/igcse/chapter-text-files/chapter 3 Subfiles/3.1.txt`
   - `docs/content/igcse/chapter-text-files/Chapter 3 key words.txt`
4. Replaced scripted pseudocode-first delivery in 3.1 with:
   - explanatory prose
   - role-and-process tables
   - sequenced read/write and FDE walkthrough language
   - instruction-set framing using opcode/operand examples
   - embedded-system classification reasoning.
5. Added Topic 3.1 interactive runtime:
   - `src/static/js/igcse-topic3-architecture.js`
   with widgets for:
   - register-level FDE stepper
   - CPU performance sandbox (clock, bus, cache, cores, overclock)
   - embedded-system classifier scenarios.
6. Added supporting reader styles in:
   - `src/static/css/reader.css`
7. Loaded Topic 3 runtime only on Topic 3 textbook route:
   - `apps/site/src/pages/igcse/[topic]/textbook.astro`
8. Updated Topic 3 index textbook card wording to remove coming-soon phrasing:
   - `src/pages/igcse/topic3/index.njk`
9. Extended validator modern-style enforcement to include Topic 3:
   - `scripts/igcse-textbook/validate-textbook-coverage.mjs`

## Revision 10 Findings (Topic 3.1 Scope Correction Pass)

- Date: 2026-02-13
- Trigger: feedback that Topic 3 textbook should currently include authored content for `3.1` only, with chapter links shown for `3.1` to `3.4`.

### Changes Applied

1. Replaced Topic 3 textbook body with a `3.1`-only authoring pass in:
   - `apps/site/src/content/igcse-textbooks/topic-3.md`
2. Removed early draft content for `3.2`, `3.3`, `3.4`, and `3.5` from the Topic 3 textbook body.
3. Removed pseudocode blocks from Topic 3 textbook content to keep scope faithful to 3.1 architecture learning goals.
4. Re-grounded 3.1 delivery to chapter/syllabus skills with:
   - register and bus tracing language
   - fetch-decode-execute sequencing
   - performance trade-off framing
   - embedded-system classification guidance.
5. Added an inline SVG abstraction for FDE flow to improve visual explanation without introducing extra runtime complexity.
6. Updated Topic 3 index textbook resources to chapter links `3.1` to `3.4` in:
   - `src/pages/igcse/topic3/index.njk`
7. Updated chapter-route generation and fallback handling in:
   - `apps/site/src/pages/igcse/[topic]/textbook/[chapter].astro`
   to ensure Topic 3 chapter paths exist and un-authored chapters show fallback content cleanly.
8. Added `.html` alias coverage for Topic 3 chapter routes in:
   - `meta/migration/wave2-routes.json`

### Verification Snapshot

- `npm run framework:build` passed.
- Generated chapter routes include:
  - `/igcse/topic3/textbook/3-1/index.html`
  - `/igcse/topic3/textbook/3-2/index.html`
  - `/igcse/topic3/textbook/3-3/index.html`
  - `/igcse/topic3/textbook/3-4/index.html`
