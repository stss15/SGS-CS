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
