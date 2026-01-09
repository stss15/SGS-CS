# Slide Deck Migration Task

## The Problem

The IB slide decks are currently organized by **topic** (A1, A2, A3, A4, B1, B2, B3, B4) in `public/ib/`. They need to be reorganized by **unit** in `src/pages/ib-2027/sl/unit-N/slides/` and `src/pages/ib-2027/hl/unit-N/slides/`.

This requires:
1. Moving each slide file to its correct unit folder based on the unit plan mappings
2. Updating relative paths in each file since the new location is deeper in the directory structure
3. Fixing a Reveal.js bug where Quick Check sections overlap main content

---

## Unit Mapping Logic

The unit plans in `docs/content/ib-content/Unit Plans/` define which topics belong to which unit:

- **SL Unit 1** = B1 topics *(already done)*
- **SL Unit 2** = B2.1
- **SL Unit 3** = B2.2
- **SL Unit 4** = B2.3, B2.4, B2.5
- **SL Unit 5** = B3.1
- **SL Unit 6** = A3.1, A3.2, A3.3
- **SL Unit 7** = A4.1, A4.4
- **SL Unit 9** = A1.1
- **SL Unit 10** = A1.2, A1.3
- **SL Unit 11** = A2.1, A2.2, A2.3, A2.4

HL units follow a similar pattern with some overlap.

---

## Path Update Requirement

The source files in `public/ib/` use paths like `../../css/` because they're 2 levels deep from the public root.

The new location `src/pages/ib-2027/sl/unit-N/slides/` is 4 levels deep, so paths must change to `../../../../css/`.

Also, the back button currently points to the old topic index (e.g., `../../ib/B2/index.html`) and needs to point to the unit index (`../index.html`).

---

## The Reveal.js Overlap Bug

Some slides have a structural issue where a Quick Check `<section>` is nested inside a parent `<section>` along with regular content. Reveal.js renders both simultaneously, causing overlap.

**Fix**: Wrap the main content in its own `<section>` so the Quick Check becomes a proper vertical sub-slide (navigated with the down arrow).

---

## Solution Approach

1. For each slide file: copy from `public/ib/[topic]/` to `src/pages/ib-2027/[level]/unit-[N]/slides/`
2. In each copied file: update all `../../` paths to `../../../../`
3. In each copied file: change the back button href to `../index.html`
4. Check for and fix any nested section issues
5. Add slide buttons to each unit's index.njk file
6. Run `npm run build` to generate the static site

---

## Reference Files

- Unit plans: `docs/content/ib-content/Unit Plans/SL/` and `HL/`
- Source slides: `public/ib/[A1-B4]/*.html`
- Target structure: `src/pages/ib-2027/[sl|hl]/unit-[N]/slides/`
- Validation script: `scripts/validate_slide_structure.py`
- Example working slide: `src/pages/ib-2027/sl/unit-1/slides/B1.1_problem_specification.html`
