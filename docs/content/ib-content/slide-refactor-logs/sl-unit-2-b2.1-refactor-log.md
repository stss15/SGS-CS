# SL Unit 2 B2.1 Slide Refactor Log

## Baseline audit
- Date: 2026-02-12
- Scope: `/src/pages/ib-2027/sl/unit-2/slides/B2.1_programming_fundamentals.html`
- Initial findings:
  - Deck relied on recall-style answer reveals and misconception reveal slides.
  - Keyword popup definitions were embedded in student-facing flow.
  - Code examples mixed pedagogy styles and risked overflow/cut-off due long blocks.

## Pedagogical decisions
- Keep question-first pacing and invisible scaffold (model then guided challenge).
- Remove explicit worksheet references from slide content.
- Use short, feature-focused code examples only (not full programs).
- Keep emphasis on prediction, tracing, debugging, and decision-making in class.

## Template rules
- Footer text: `SGS Computer Science`.
- Live date bottom-left and logo bottom-right.
- Horizontal movement for concept shifts; vertical stacks for same-theme progression.
- Core class contract:
  - `.slide-question`
  - `.i-do-panel`
  - `.we-do-panel`
  - `.natural-break`
  - `.code-panel`
  - `.code-split`

## Coverage map
- B2.1.1 Variables and types: data typing, casting, local/global scope behavior.
- B2.1.2 String manipulation: slicing, concatenation, substring extraction, basic casting.
- B2.3.3 Looping constructs: count-controlled (`for`) and condition-controlled (`while`) loops.
- B2.1.3 Exception handling: `try/except` flow and runtime control.
- B2.1.4 Debugging techniques: trace-table reasoning and error classification.

## QA results
- Run `npm run slides:audit:unit2:b2` for structural + pedagogy + code-block checks.
- Run `npm run framework:build` for route/build smoke validation.

## Replication checklist
- Confirm source-of-truth deck(s) in `/src/pages/ib-2027/sl/unit-<n>/slides/`.
- Reuse `ib-2027-sl-b2-master-template.html` and Unit 2 code block constraints.
- Keep code snippets under feature scope with clear indentation and short lines.
- Avoid explicit worksheet references until activity assets are finalized.
- Run unit audit and append QA snapshots.

### QA Snapshot - 2026-02-12T11:48:11.208Z

| Check | Result |
| --- | --- |
| Deck checks | PASS |
| Route smoke test | PASS |
| Overall | PASS |

| Metric | Value |
| --- | --- |
| Sections | 18 |
| Max section depth | 2 |
| Code blocks | 12 |
| Max code line length | 41 |
| Max lines in a code block | 9 |

- Route smoke found: B2.1_programming_fundamentals

