# AUDIT_01_PLAN_FIXES_AND_DECISIONS.md

**Purpose**: Document required fixes to planning documents and key decisions made during syllabus coverage audit.

**Date**: 2026-01-10  
**Status**: Audit Complete

---

## 1) Audit Scope

Documents reviewed:
- `PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md`
- `PLAN_LEVEL_SEQUENCE_BACKWARDS.md`
- `README_04_LEVEL_BREAKDOWN.md`
- `B2_extracted.txt` (B2 Programming syllabus)
- `B3_extracted.txt` (B3 OOP syllabus)
- `IB Comp Sci 2027_extracted.txt` (Course overview)

---

## 2) Summary of Issues Found

### Issue 1: Final Game Scope Too Small for "AAA Feel"

**Problem**: Current plan has only 5 rooms, 8 items, 1 NPC. This feels sparse for an immersive text adventure experience.

**Decision**: KEEP the 5-room count. Increase immersion through:
- Rich room descriptions (100+ words each)
- Multiple interactive objects per room (not just items)
- More environmental storytelling via `look` and `examine` outputs
- Flavour text for all actions

**Rationale**: Adding more rooms increases engine complexity without teaching new OOP concepts. Rich content in existing rooms achieves "AAA feel" without scope creep.

---

### Issue 2: Level E ("Rooms and Movement") is a "Dead" Level

**Problem**: Level E has no student code. Students only play/review the engine. This violates the "no boring class factory" principle by providing no tangible coding outcome.

**Decision**: MERGE Level E content into Level D. 

**New approach**:
- Level D now includes 2 rooms (Airlock + Main Corridor)
- Level E expands to full 5-room map AND adds a small student task

**Student task for revised Level E**:
- Add a `validate_move(direction: str) -> bool` method to Player
- This method checks if player can move (e.g., not incapacitated)
- Simple but gives students something to build

**Alternative (if simpler is preferred)**: Keep Level E as engine-only but add a substantial "code reading" worksheet exercise where students annotate engine code and answer comprehension questions.

---

### Issue 3: B2 Syllabus Gaps

**Problem**: The following B2 topics are not explicitly demonstrated:

| B2 Topic | Syllabus Code | Current Coverage | Gap |
|----------|--------------|------------------|-----|
| 2D arrays/matrices | B2.4.x | Not covered | Need puzzle or demo |
| Dictionaries (meaningful) | B2.4.x | Stats dicts exist but shallow | Need explicit teaching |
| Searching algorithms | B2.5.x | Not covered | Need demo puzzle |
| Sorting algorithms | B2.5.x | Not covered | Need optional demo |
| String manipulation | B2.1.2 | Minimal | Need explicit demo |

**Decisions**:

1. **2D Arrays**: Add a 2D array puzzle to the Terminal (Level C+ extended)
   - Puzzle: "Decode the grid" - student reads coordinates from 2D list
   - Engine provides the puzzle, student's Stack/Queue classes manipulate it

2. **Dictionaries**: Enhanced use in multiple places
   - Level B: `get_starting_stats()` already returns dict ✓
   - Level H: `to_save_data()` already returns dict ✓
   - NEW: Add `Player.get_stats()` method that returns current stats dict
   - Worksheet explicitly teaches dictionary access, keys, values

3. **Searching**: Add to Terminal puzzle (Level C+)
   - Puzzle step requires finding an item in a list
   - Engine demonstrates linear search; student observes
   - Optional worksheet question: "What would binary search require?"

4. **Sorting**: NOT a primary focus
   - Brief mention in worksheet as optional extension
   - Engine may sort inventory display alphabetically (student observes)
   - No student-implemented sorting (not OOP-focused)

5. **String Manipulation**: Add explicit demo
   - Level A: `get_status()` must use f-strings or concatenation
   - Level D: `use_item()` returns constructed strings
   - Worksheet explicitly teaches string methods (upper, lower, strip, split)

---

### Issue 4: B3 Syllabus Gaps

**Problem**: The following B3 topics need more explicit coverage:

| B3 Topic | Syllabus Code | Current Coverage | Gap |
|----------|--------------|------------------|-----|
| Static vs non-static | B3.1.3 | Not covered | Need demo |
| Encapsulation | B3.1.5 | Implicit | Need explicit naming |
| Composition vs aggregation | B3.2.4 | Composition exists | Need teaching distinction |
| Access modifiers | B3.1.5 | Using `_` prefix | Need explicit worksheet |

**Decisions**:

1. **Static vs Non-static Demo**: Add to Level C
   - Add `Inventory.MAX_CAPACITY = 10` class variable (static-ish constraint)
   - `add()` method checks against MAX_CAPACITY
   - Worksheet teaches: "MAX_CAPACITY belongs to the class, not the instance"
   - This shows static property concept without full Java-style statics

2. **Encapsulation**: Already covered via `_items` in Inventory
   - Worksheets must explicitly use the term "encapsulation"
   - Add keywords: encapsulation, information hiding, private/protected

3. **Composition vs Aggregation**: Add to Level C worksheet
   - Composition: Player "has-a" Inventory (Inventory created inside Player)
   - Aggregation example (for contrast): "A Team has Players, but Players exist independently"
   - Worksheet question: "Is this composition or aggregation?"

4. **Access Modifiers**: Already using `_` prefix convention
   - Worksheets must explain: `_attribute` = protected (convention)
   - No public/private keywords in Python, but convention is important

---

### Issue 5: "No Boring Class Factory" Violation Risk

**Problem**: Levels should not feel like "make another class just because". Each level must unlock noticeable game progress.

**Decision**: Audit each level for "unlocks":

| Level | What Student Builds | What It Unlocks |
|-------|--------------------|--------------------|
| A | Player class | Can see status, take damage, heal |
| B | Brute/Scout subclasses | Different playstyles visible at start |
| C | Inventory class | Can pick up and carry items |
| C+ | Stack/Queue | Can solve terminal puzzle |
| D | use_item, consume | Can unlock doors, use consumables |
| E | (engine review or validate_move) | Explore full map |
| F | respond_to_npc | Can get hints from Drone |
| G | choose_action, compute_damage | Can fight Security Bot |
| H | to_save_data, from_save_data | Can save progress |
| I | (playthrough) | Experience complete game |

**Conclusion**: All levels have clear "unlocks". Level E is the weakest but acceptable as a content expansion level.

---

### Issue 6: Contracts Document Missing

**Problem**: Interface contracts are scattered across planning docs. Need consolidated reference.

**Decision**: Contracts already defined in `PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md` section 4. Cross-reference this in all level specs.

**Action**: Each level spec file must include:
```markdown
## Contracts for This Level
See [PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md](./PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md#4-student-code-contracts-in-final-level-x) for full contract definitions.

This level implements:
- [list of contracts from that central doc]
```

---

## 3) Required Document Updates

### 3.1 Updates to PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md

| Section | Change |
|---------|--------|
| §3 World Content | Add note about rich room descriptions for AAA feel |
| §3 Interactive Objects | Expand list to include more examinable objects |
| §4 Contracts | Add `Player.get_stats() -> dict` method |
| §4 Contracts | Add `Inventory.MAX_CAPACITY` class variable |

### 3.2 Updates to PLAN_LEVEL_SEQUENCE_BACKWARDS.md

| Section | Change |
|---------|--------|
| Level E | Add optional `validate_move` student task OR code reading exercise |
| Level C | Add `MAX_CAPACITY` static-ish demo |
| Level C+ | Add 2D array puzzle component + search demo |

### 3.3 Updates to README_04_LEVEL_BREAKDOWN.md

| Section | Change |
|---------|-------|
| Level C | Add `MAX_CAPACITY` constraint to Inventory |
| Level C+ | Expand terminal puzzle to include 2D array access |
| Level E | Clarify student activity (reading OR small method) |

---

## 4) Decisions Log

| ID | Decision | Rationale | Date |
|----|----------|-----------|------|
| D01 | Keep 5 rooms, add rich descriptions | Immersion via content not complexity | 2026-01-10 |
| D02 | Add `Inventory.MAX_CAPACITY` static-ish demo | Cover B3.1.3 without Java statics | 2026-01-10 |
| D03 | Add 2D array puzzle to Terminal | Cover B2.4.x (2D arrays) | 2026-01-10 |
| D04 | Add linear search demo in Terminal | Cover B2.5.x (searching) | 2026-01-10 |
| D05 | Sorting is optional extension only | Not OOP-focused | 2026-01-10 |
| D06 | Level E gets code reading exercise | Avoid "dead" level feeling | 2026-01-10 |
| D07 | Add `Player.get_stats()` method | Explicit dict usage demonstration | 2026-01-10 |
| D08 | Worksheets must use encapsulation terminology | Explicit B3.1.5 coverage | 2026-01-10 |
| D09 | Contracts remain in Final Level X doc | Single source of truth | 2026-01-10 |

---

## 5) Open Questions Resolved

| Question | Resolution |
|----------|-----------|
| How to cover 2D arrays in an OOP project? | Terminal puzzle with grid access |
| How to show static vs non-static without Java? | `MAX_CAPACITY` class variable in Inventory |
| Is Level E acceptable as engine-only? | Yes, with code reading exercise |
| Should students implement sorting? | No, engine can demo; not OOP focus |
| Where are contracts defined? | Section 4 of PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md |

---

## 6) Next Actions

1. [ ] Update `PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md` with changes from §3.1
2. [ ] Update `PLAN_LEVEL_SEQUENCE_BACKWARDS.md` with changes from §3.2
3. [ ] Update `README_04_LEVEL_BREAKDOWN.md` with changes from §3.3
4. [ ] Create `COVERAGE_MATRIX_B2_B3_TO_LEVELS.md` (syllabus mapping)
5. [ ] Create `LEVEL_LIST_FINAL_NAMING_DRAFT.md` (level names)

---

## Summary

The audit found 6 issues:
1. Final game scope (acceptable with rich content)
2. Level E dead level (add code reading)
3. B2 gaps (2D arrays, dicts, searching - addressed)
4. B3 gaps (static demo, encapsulation terminology - addressed)
5. Class factory risk (levels have clear unlocks ✓)
6. Contracts location (centralised in Final Level X doc ✓)

All issues have decisions. Documents need targeted updates per §3.
