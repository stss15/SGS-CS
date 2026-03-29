# IB Textbook Progress — Session Log

> Last updated: 2026-03-29
> Branch: `main` (all work committed and deployed to https://sgs-science.web.app)

---

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

## How to start the next session

```bash
# Create a feature branch
git checkout -b feat/ib-textbook-a-themes

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
