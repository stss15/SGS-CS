# IB Syllabus Restructure — Design Spec

## Problem

The IB section currently organises content by teaching delivery order (SL Units 1–12, HL Units 1–11 — 23 units total). Students find it difficult to revise because the website structure doesn't match the official IB syllabus. We're removing the teacher-guided unit pathway entirely and restructuring around the 8 official syllabus units: Theme A (A1–A4) and Theme B (B1–B4).

The "2027" label is also retired — this is simply "IB Computer Science" going forward.

## Architecture Changes

### 1. Course Explorer Sidebar (Global IB Navigation)

Replace the current SL/HL year-group accordion with a syllabus-aligned structure:

```
Theme A: Concepts of Computer Science    [section header, not clickable]
  A1 Computer Fundamentals               [clickable → /ib-2027/A1/]
  A2 Networks                            [clickable → /ib-2027/A2/]
  A3 Databases                           [clickable → /ib-2027/A3/]
  A4 Machine Learning                    [clickable → /ib-2027/A4/]

Theme B: Computational Thinking           [section header, not clickable]
  B1 Computational Thinking              [clickable → /ib-2027/B1/]
  B2 Programming                         [clickable → /ib-2027/B2/]
  B3 Object-Oriented Programming         [clickable → /ib-2027/B3/]
  B4 Abstract Data Types                 [clickable → /ib-2027/B4/]

IA Internal Assessment                   [greyed out, not ready]
EE Extended Essay                        [greyed out, not ready]
Case Study                               [greyed out, not ready]
```

Items have hover effect. No expand/collapse — direct click navigation.

### 2. Landing Page (`/ib-2027/`)

- Title: "IB Computer Science" (no "2027")
- Hero: Student-friendly course overview
- Main content: Syllabus guide breakdown (placeholder for now — user has content ready)
- Sidebar: Theme A/B navigator as described above

### 3. Unit Pages (e.g. `/ib-2027/B2/`)

Left sidebar:
```
Overview                                 [unit summary + objectives, combined view]
─────────────
B2.1 Programming Fundamentals           [clickable → /ib-2027/B2/B2.1/]
B2.2 Data Structures                    [clickable → /ib-2027/B2/B2.2/]
B2.3 Programming Constructs             [clickable → /ib-2027/B2/B2.3/]
B2.4 Programming Algorithms             [clickable → /ib-2027/B2/B2.4/]
B2.5 File Processing                    [clickable → /ib-2027/B2/B2.5/]
─────────────
Textbook                                [full B2 textbook]
Homework
Assessment
Revision
```

Main content: Unit overview with guiding question, SL/HL hours, subtopic summary, learning objectives.

### 4. Subtopic Pages (e.g. `/ib-2027/B2/B2.1/`)

Arcade layout with sidebar sections: slide decks, activities, resources relevant to that subtopic only.

### 5. Content Mapping (Teaching Order → Syllabus)

This is the core task. Every slide deck is already named by syllabus code (e.g. `B2.1_programming_fundamentals.html`), so the mapping is encoded in filenames. The work is:

1. **Slides**: Already in correct syllabus directories (A1/A1.1/slides/, etc.). Verify each slide's content matches its syllabus subtopic. No combining needed — the slides were already authored per-subtopic.

2. **Textbooks**: Currently split across 23 teaching units. Need to consolidate per syllabus unit. B1 textbook has real content; others are stubs ("Coming Soon"). The B2 textbook should aggregate all programming-related textbook content from SL units 1–5 and HL units 3–4.

3. **Activities**: OOP project → B3.1, SQL worksheets → A3, Scenarios → B3 (already moved).

4. **Unit plans**: Extract relevant objectives/outcomes from teaching-order unit plans into syllabus unit overviews.

### 6. Remove Teaching-Order Structure

- Delete SL/HL sidebar navigation from `auto-shell.ts`
- Remove `ib-2027-sl` and `ib-2027-hl` listings from site.json
- Remove `IB_2027_PATHWAY_CARDS` from content-schema
- Keep sl/hl redirect stubs for backward compatibility (already created)
- Remove SL/HL index pages from Astro routing

### 7. Files to Modify

| File | Change |
|------|--------|
| `apps/site/src/lib/auto-shell.ts` | Rewrite `buildIbShell()` → Theme A/B sidebar |
| `apps/site/src/lib/curriculum-shell.ts` | Update interfaces if needed |
| `packages/content-schema/src/index.ts` | Remove pathway cards, add syllabus nav data |
| `src/data/site.json` | Restructure IB listing, remove sl/hl listings |
| `src/pages/ib-2027/index.njk` | New landing page (no "2027") |
| `apps/site/src/pages/ib-2027/index.astro` | New Astro landing page |
| `src/pages/ib-2027/{A1-B4}/index.njk` | Rewrite unit pages with overview + subtopic nav |
| `src/pages/ib-2027/{A1-B4}/{subtopics}/index.njk` | Verify subtopic pages |
| `apps/site/src/pages/ib-2027/[level]/` | Remove or redirect Astro SL/HL routes |

### 8. URL Structure

```
/ib-2027/                    → Landing page (IB Computer Science)
/ib-2027/A1/                 → A1 Computer Fundamentals overview
/ib-2027/A1/A1.1/            → A1.1 subtopic page
/ib-2027/A1/A1.1/slides/...  → Slide deck
/ib-2027/A1/textbook         → A1 full textbook
/ib-2027/B2/                 → B2 Programming overview
/ib-2027/B2/B2.1/            → B2.1 subtopic page
/ib-2027/sl/unit-1/          → Redirect to /ib-2027/B1/ (backward compat)
```

Note: URL path stays `/ib-2027/` (changing would break bookmarks), but all display text drops "2027".

## Success Criteria

1. Side panel shows Theme A / Theme B with clickable A1–B4
2. No trace of SL Unit 1–12 / HL Unit 1–11 teaching-order in navigation
3. All content accessible via syllabus structure
4. Old URLs still redirect
5. Styles, CSS, JS unchanged
6. Zero content loss
