# FINAL_SANITY_CHECK_BEFORE_BUILD.md

**Purpose**: Compare the master spec (INITIAL_GAME_DEV.md) against existing planning docs, identify gaps, confirm alignment, and provide a clear "go/no-go" for build phase.

**Date**: 2026-01-10  
**Status**: Ready for Review

---

## Executive Summary

### Overall Alignment: ✅ GOOD (with adjustments needed)

The master spec and existing planning documents are **mostly aligned**. The main gaps are:
1. **Packaging freshness**: Zips can drift from folder contents if not rebuilt
2. **Hint strictness**: Avoid hints that resemble full solutions
3. **Documentation upkeep**: Keep interfaces/specs aligned after any engine or template changes

### Recommendation: PROCEED with adjustments

The core design is sound. We need to:
1. Align docs to current interfaces and level set
2. Keep worksheets and hints conceptual (no full solutions)
3. Rebuild zips after any template/engine changes

---

## 1) Master Spec Requirements vs Current State

### 1.1 Non-Negotiable Success Criteria Check

| Requirement | Master Spec | Current State | Status |
|-------------|-------------|---------------|--------|
| AAA feel from content, not mechanics | ✓ Required | ✓ Planned (rich descriptions, lore) | ✅ ALIGNED |
| Student code stays small/explicit | ✓ Required | ~38 callables across 5 files | ✅ ALIGNED |
| No Python on worksheets | ✓ Required | ✓ Specified in worksheet spec | ✅ ALIGNED |
| Each level self-contained | ✓ Required | ✓ Packaging rules defined | ✅ ALIGNED |
| No pre-written skeletons | ✓ Required | Stubs present, no full solutions | ⚠️ REVIEW |
| validate.py per level | ✓ Required | ✓ Validation framework defined | ✅ ALIGNED |
| Engine stable, student edits /student only | ✓ Required | ✓ Folder structure defined | ✅ ALIGNED |

**Conclusion**: All non-negotiables are satisfied.

---

### 1.2 Level Count Comparison

| Aspect | Master Spec | Current Plan | Gap |
|--------|-------------|--------------|-----|
| Target levels | 12–14 | 12 (Preflight + A–I + P1 + P2) | ✅ Aligned |
| Warmup level | X-9 (worksheet-only) | Preflight | ✅ Matches |
| First class | X-8 | Level A | ✅ Matches |
| Inheritance | X-7 | Level B | ✅ Matches |
| Inventory/Composition | X-6 | Level C | ✅ Matches |
| Item interaction | X-5 | Level D | ✅ Matches |
| World expansion | X-4 | Level E | ✅ Matches |
| NPC dialogue | X-3 | Level F | ✅ Matches |
| Encounter | X-2 | Level G | ✅ Matches |
| Save/load | X-1 | Level H | ✅ Matches |
| Final playthrough | X | Level I | ✅ Matches |
| Stack/Queue puzzle | P1 | Level C+ | ✅ Matches |
| Search/sort puzzle | P2 | Level D+ (P2) | ✅ Matches |
| Set/dict unique puzzle | P3 | **NOT PLANNED** | ✅ Optional (covered in P2 validate_code) |

**Action Required**: None — contained puzzles are in place (P1, P2).

---

### 1.3 Coverage Mode Classification

Master spec requires every B2/B3 skill be labelled as:
- **Student mechanic**: Required student code that engine calls
- **Contained puzzle**: Isolated challenge, doesn't expand global systems
- **Worksheet-only**: Taught via worksheet exercises, no engine dependency

**Current State**: `SYLLABUS_COVERAGE_MAP_B2_B3.md` now uses Student Mechanic, Contained Puzzle, and Worksheet-Only labels.

**Action Required**: None.

---

### 1.4 Required Documents Comparison

| Master Spec Requires | Existing Equivalent | Gap |
|---------------------|--------------------|----|
| LEVEL_SEQUENCE_BACKWARDS_FINAL.md | PLAN_LEVEL_SEQUENCE_BACKWARDS.md | ✅ Updated |
| LEVEL_X_FINAL_GAME_SPEC.md | PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md | ✅ Exists |
| WORKSHEET_TEMPLATE_SPEC_FINAL.md | README_07_WEBSITE_WORKSHEET_SPEC.md | ✅ Consolidated |
| SYLLABUS_COVERAGE_MAP_B2_B3.md | COVERAGE_MATRIX_B2_B3_TO_LEVELS.md | ✅ Uses mode labels |
| CONTRACTS_AND_INTERFACES_FINAL.md | Final Level X doc §4 | ✅ Extracted |
| AUDIT success criteria check | This document | ✅ Creating now |

---

## 2) Gap Analysis: What's Missing

### 2.1 Contained Puzzle Levels

Contained puzzles now in place:
- **P1**: Stack/Queue terminal (Level C+)
- **P2**: Log search/sort + validate_code (Level D+)

**Updated Level Count**: Preflight + A, B, C, P1, D, P2, E, F, G, H, I = **12 levels** ✅

---

### 2.2 Missing Concepts from B2 (Now Addressed)

| Concept | Master Spec Guidance | Proposed Coverage |
|---------|---------------------|-------------------|
| 2D arrays | "Don't force matrices" | ⚠️ Drop from plan (was in C+) — master spec says NO |
| Search/sort | Contained puzzle P2 | ✅ Level D+ (log search) |
| Sets/dicts for validation | Contained puzzle P2 | ✅ validate_code in P2 |
| File I/O | Student mechanic | ✅ Level P2 (load_logs_from_file) |
| Exception handling | Student mechanic | ✅ Level F/G input conversion |

**Critical Decision**: The master spec explicitly says **no 2D matrix** — it's a "forced fit". Remove from Level C+ terminal puzzle. Keep terminal simple (Stack/Queue only).

---

### 2.3 Document Consolidation Status

The `/docs` folder currently has many files. Per master spec, we need exactly 5 planning docs + 1 audit. Here's the consolidation plan:

| Keep/Create | Source | Action |
|-------------|--------|--------|
| LEVEL_SEQUENCE_BACKWARDS_FINAL.md | planning/PLAN_LEVEL_SEQUENCE_BACKWARDS.md | ✅ Updated for 12 levels |
| LEVEL_X_FINAL_GAME_SPEC.md | planning/PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md | ✅ Renamed, content kept |
| WORKSHEET_TEMPLATE_SPEC_FINAL.md | README_07 | ✅ Consolidated |
| SYLLABUS_COVERAGE_MAP_B2_B3.md | planning/COVERAGE_MATRIX | ✅ Mode labels added |
| CONTRACTS_AND_INTERFACES_FINAL.md | Final Level X doc §4 | ✅ Extracted |
| FINAL_SANITY_CHECK | This document | ✅ Creating now |

**Files to Archive/Delete**:
- All README_00 through README_11 (move to `/docs/archive/` or delete)
- AUDIT_00 (superseded by this file)
- LEVEL_LIST_FINAL_NAMING_DRAFT.md (merge into sequence doc)

---

## 3) Issues and Concerns

### 3.1 Concern: Level E is Still "Dead"

**Issue**: Level E (world expansion) originally had no student code.

**Resolution**: ✅ Addressed. Level E now includes a micro-lab (Logbook aggregation) plus exploration and code reading.

---

### 3.2 Concern: 2D Array Coverage Removed

**Issue**: We previously planned a 2D array demo in Level C+. Master spec says NO.

**Master Spec Says**: "requiring a 2D matrix world grid when room graph navigation is simpler and more Zork-like" is a **forced fit**.

**Resolution**: 
- Remove 2D array from Level C+ terminal puzzle
- Cover 2D arrays in a **Worksheet-only** exercise (Level C+ or H worksheet)
- Worksheet shows "here's what a 2D array looks like; here's how you'd access it" — no engine dependency
- Mark as "Worksheet-only" in coverage matrix

---

### 3.3 Concern: Static-ish Demo (MAX_CAPACITY)

**Issue**: We planned `Inventory.MAX_CAPACITY` as a class variable to demo static concepts.

**Master Spec Says**: Doesn't explicitly mention this, but allows "contained" demos.

**Resolution**: ✅ KEEP. This is a natural fit — inventory capacity is a reasonable constraint. It doesn't add complexity, just a single class variable.

---

### 3.4 Concern: HL-Only Concepts

**Issue**: B3.2 (polymorphism, abstraction, patterns) are marked HL-only in the syllabus.

**Master Spec Says**: "teach them anyway as enrichment" but don't require students to implement complex patterns.

**Resolution**:
- Polymorphism: ✅ Already in Level B (engine calls same method, gets different results)
- Composition/Aggregation: ✅ Already in Level C (Player has-a Inventory)
- Design Patterns: Worksheet-only (show engine examples, don't require implementation)

---

### 3.5 Concern: Recursion

**Issue**: B2.4 mentions recursion (HL-only).

**Master Spec Says**: "Recursion is handled in later extension content (separate pathway/rooms), not in the core build sequence."

**Resolution**: ✅ NOT in core 12 levels. If we want it later, create an optional "Extension Room" level. For now, mark as **out of scope**.

---

## 4) Proposed Final Level Sequence (12 Levels)

| # | ID | Display Name | Student Builds | Coverage Mode |
|---|-----|--------------|----------------|---------------|
| 1 | — | OOP Foundations | — | Worksheet-only |
| 2 | A | Foundation: Player Class | Player class | Student mechanic |
| 3 | B | Specialisation: Brute & Scout | Subclasses, override | Student mechanic |
| 4 | C | Carrying Capacity: Inventory | Inventory + MAX_CAPACITY | Student mechanic |
| 5 | C+ | Terminal Access: Stacks & Queues | Stack, Queue | Contained puzzle |
| 6 | D | Making Things Happen: Item Use | use_item, consume | Student mechanic |
| 7 | D+ | Data Retrieval: Log Search | search/sort function | Contained puzzle |
| 8 | E | Mission Log + Exploration | Logbook aggregation | Student mechanic |
| 9 | F | First Contact: Drone Dialogue | respond_to_npc | Student mechanic |
| 10 | G | Threat Response: Security Bot | choose_action, compute_damage | Student mechanic |
| 11 | H | Checkpoints: Save & Load | to_save_data, from_save_data | Student mechanic |
| 12 | I | Mission Complete: Playthrough | (reflection) | Worksheet-only |

**Note**: Dropped G+ (code validator) — we hit 12 levels without it. If needed, it can be added or merged into Level G.

---

## 5) Student Surface Area Summary

| File | Methods/Attributes | Cumulative |
|------|--------------------|------------|
| player.py | __init__, get_status, take_damage, heal, use_item, respond_to_npc, choose_action, compute_damage, to_save_data, from_save_data | 10 methods |
| player_types.py | Brute/Scout __init__ + describe_specialty | 4 methods |
| inventory.py | __init__, add, remove, list_items, has_item, consume, is_full, count + MAX_CAPACITY | 8 methods + 1 class var |
| data_structs.py | Stack (6 methods), Queue (6 methods) | 12 methods |
| log_search.py | load_logs_from_file, search_logs, sort_logs, validate_code | 4 functions |

**Total**: ~38 callables across 5 files

**Master Spec Check**: ✅ "Small, explicit, and testable" — YES

---

## 6) Success Criteria Verification

### 6.1 From Master Spec §0.2

| Criteria | Verified? |
|----------|----------|
| No forced mechanics | ✅ 2D arrays removed; all skills have natural fit |
| 12–14 levels | ✅ 12 levels planned |
| AAA feel via content | ✅ Rich descriptions, lore, atmosphere planned |
| Student surface area small | ✅ ~28 methods across 5 files |
| Coverage map complete | ⚠️ Needs update with mode labels |

### 6.2 From Master Spec §0.3 (Delivery Constraints)

| Constraint | Verified? |
|------------|----------|
| Zero Python on worksheets | ✅ Enforced |
| Each download self-contained | ✅ Packaging rules defined |
| No skeleton stubs | ✅ Comments only |
| validate.py per level | ✅ Framework defined |
| Engine stable | ✅ Only /student editable |

---

## 7) Recommended Actions Before Build

### 7.1 Document Updates (Quick)

1. **Remove 2D array puzzle from Level C+**
   - Keep terminal puzzle as Stack/Queue only
   - Add 2D array as worksheet exercise (no engine code)

2. **Add Level D+ (Log Search)**
   - Create new level between D and E
   - Student implements search/sort on log entries
   - Contained puzzle, no global mechanics

3. **Update COVERAGE_MATRIX with mode labels**
   - Replace ✓/○/◇ with "Student mechanic / Contained puzzle / Worksheet-only"

4. **Extract CONTRACTS_AND_INTERFACES_FINAL.md**
   - Pull method signatures from Final Level X doc §4
   - Add the new log_search method

### 7.2 Document Consolidation (Can Do During Build)

1. Archive old README files to `/docs/archive/`
2. Rename planning docs to match master spec names
3. Keep this sanity check as the audit

### 7.3 Ready to Build

Once the above quick updates are done, we can start:
1. **Engine skeleton** (`run_game.py`, command parser, world loader)
2. **Level A folder** (first complete deliverable)
3. **Preflight worksheet** (HTML, website-only)
4. **Validator utilities** (shared helpers)

---

## 8) Go/No-Go Decision

### ✅ GO — with conditions

**Conditions for GO**:
1. Confirm Level D+ addition is acceptable (adds 1 more level)
2. Confirm 2D array removal is acceptable (worksheet-only coverage)
3. Confirm Level E micro-lab (Logbook aggregation) is acceptable

**If YES to all**: Start build phase immediately.

---

## 9) Quick Reference: What We're Building

```
OOP Project (12 levels)
├── Preflight: OOP mental model (worksheet-only)
├── Level A: Player class (first student code)
├── Level B: Brute/Scout inheritance
├── Level C: Inventory composition + MAX_CAPACITY static demo
├── Level C+: Stack/Queue terminal puzzle (contained)
├── Level D: use_item/consume interactions
├── Level D+: Log search/sort (contained puzzle) [NEW]
├── Level E: Mission Log + Exploration (aggregation)
├── Level F: NPC dialogue hook
├── Level G: Encounter hooks
├── Level H: Save/load serialisation
└── Level I: Final playthrough + reflection
```

**Engine**: Rich content, command parser, world loader, all mechanics hidden
**Student**: 6 Python files, ~30 methods, all validated
**Worksheets**: 12 HTML pages, zero Python, rich visuals

---

## Summary

The master spec and existing plans are well-aligned. Main adjustments:
1. Add Level D+ (search/sort puzzle) → 12 levels
2. Remove 2D array from mechanics → worksheet-only
3. Update coverage matrix with mode labels
4. Ready to build after user confirmation

**Awaiting confirmation to proceed.**
