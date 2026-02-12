# SL Unit 1 B1.1-B1.4 Slide Refactor Log

## Baseline audit
- Date: 2026-02-12
- Scope: `/src/pages/ib-2027/sl/unit-1/slides/B1.1_problem_specification.html` to `/src/pages/ib-2027/sl/unit-1/slides/B1.4_algorithm_design.html`
- Initial findings:
  - Decks were recall-heavy and answer-reveal-heavy.
  - B1.2 and B1.4 had malformed nested section depth in live source.
  - Keyword popups and recap framing were overused for this pedagogical intent.

## Pedagogical decisions
- Question-first progression as default entry into each conceptual cluster.
- Slide decks use modeled reasoning plus guided challenge, with teacher scaffold kept invisible to students.
- Worksheet direction appears as compact `small-text` cues inside challenge slides at natural conceptual breaks.
- No retrieval starter blocks, recap bullets, or keyword popup dependency.

## Template rules
- Footer text fixed to `SGS Computer Science`.
- Live date in bottom-left; logo anchored bottom-right.
- Horizontal movement = new conceptual area.
- Vertical movement = same-theme exploration flow.
- Core slide classes:
  - `.slide-question`
  - `.i-do-panel`
  - `.we-do-panel`
  - `.natural-break`
  - `.small-text`

## Deck-by-deck change log
### B1.1 Problem Specification
- Reframed around problem ambiguity, stakeholder conflict, and measurable success criteria.
- Uses modeled reasoning followed by guided challenge flow with embedded worksheet cues.

### B1.2 Computational Thinking
- Reframed around the four pillars as decision tools, not recall definitions.
- Added cross-domain transfer prompts for software, ML, networks, and databases.

### B1.3 Flowcharts and Pseudocode
- Reframed around representation choices and quality of algorithm communication.
- Added guided correction of branching and flow integrity.

### B1.4 Algorithm Design and Tracing
- Reframed around proving correctness through tracing and debugging.
- Added MOD/DIV interpretation and structured debug reasoning flow.

## Coverage map
- B1.1.1: Problem specification construction in B1.1.
- B1.1.2: Core computational thinking concepts in B1.2.
- B1.1.3: Applying computational thinking across CS domains in B1.2.
- B1.1.4: Flowcharts and tracing progression in B1.3 and B1.4.

## QA results
- Use `npm run slides:audit:unit1:b1` to generate and append objective validation snapshots.

## Replication checklist for next unit
- Confirm source-of-truth files for the target unit before editing.
- Reuse `ib-2027-sl-b1-master-template.html` structure and class contract.
- Keep deck density between 12 and 16 sections unless a different limit is explicitly set.
- Enforce question-first progression with invisible scaffold (no explicit teacher-framework labels on slides).
- Run audit script and append results to this log (or a unit-specific sibling log).
- Run `npm run framework:build` to validate route integrity before sign-off.

## Feedback pass - visible scaffolding removed (2026-02-12)
- Student-facing labels `Cluster A/B/C`, `I do`, `We do`, and `You do` were removed from deck content.
- Standalone worksheet-handoff slides were removed; worksheet direction now appears as compact `small-text` cues inside challenge slides.
- Slide rhythm was varied to avoid rigid repeated patterns while retaining the same pedagogical progression under the hood.
- Master template was updated so the default pattern is scenario -> modeled reasoning -> guided challenge -> synthesis, without exposing planning framework language.

### QA Snapshot - 2026-02-12T09:35:34.806Z

| Check | Result |
| --- | --- |
| All deck checks | PASS |
| Route smoke test | PASS |
| Overall | PASS |

| Deck | Sections | Max depth | You Do placeholders | Result |
| --- | ---: | ---: | ---: | --- |
| B1.1_problem_specification.html | 16 | 2 | 2 | PASS |
| B1.2_computational_thinking.html | 16 | 2 | 2 | PASS |
| B1.3_flowcharts_pseudocode.html | 16 | 2 | 2 | PASS |
| B1.4_algorithm_design.html | 16 | 2 | 2 | PASS |

- Route smoke found: B1.1_problem_specification, B1.2_computational_thinking, B1.3_flowcharts_pseudocode, B1.4_algorithm_design

### QA Snapshot - 2026-02-12T11:25:00.386Z

| Check | Result |
| --- | --- |
| All deck checks | PASS |
| Route smoke test | PASS |
| Overall | PASS |

| Deck | Sections | Max depth | Worksheet cues | Result |
| --- | ---: | ---: | ---: | --- |
| B1.1_problem_specification.html | 14 | 2 | 2 | PASS |
| B1.2_computational_thinking.html | 13 | 2 | 2 | PASS |
| B1.3_flowcharts_pseudocode.html | 13 | 2 | 2 | PASS |
| B1.4_algorithm_design.html | 14 | 2 | 2 | PASS |

- Route smoke found: B1.1_problem_specification, B1.2_computational_thinking, B1.3_flowcharts_pseudocode, B1.4_algorithm_design


### QA Snapshot - 2026-02-12T11:27:06.505Z

| Check | Result |
| --- | --- |
| All deck checks | PASS |
| Route smoke test | PASS |
| Overall | PASS |

| Deck | Sections | Max depth | Worksheet cues | Result |
| --- | ---: | ---: | ---: | --- |
| B1.1_problem_specification.html | 14 | 2 | 2 | PASS |
| B1.2_computational_thinking.html | 13 | 2 | 2 | PASS |
| B1.3_flowcharts_pseudocode.html | 13 | 2 | 2 | PASS |
| B1.4_algorithm_design.html | 14 | 2 | 2 | PASS |

- Route smoke found: B1.1_problem_specification, B1.2_computational_thinking, B1.3_flowcharts_pseudocode, B1.4_algorithm_design
