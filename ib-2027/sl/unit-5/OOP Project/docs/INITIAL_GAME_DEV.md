# MASTER CODEX — OOP TEXT ADVENTURE PROJECT

> **This is the authoritative spec.** If any other document conflicts with this file, this file wins.

**Purpose**: Operating manual for building the Python text-adventure OOP learning game.

**Date**: 2026-01-10  
**Status**: FROZEN — Build-Ready

---

## 0) Role and Goal

We are building a **Python text-adventure OOP learning game** delivered as:
1. **Student-facing website worksheets** (one HTML per level; **ZERO Python code**)
2. **Downloadable per-level PyCharm project folders** (engine + validator + student-editable files)

The game must feel like a **AAA-quality Zork-style text adventure** in atmosphere, lore, dialogue, item descriptions, room writing, and environmental storytelling. The **engine can be sophisticated**. Student-facing interfaces must remain **small, explicit, stable, and testable**.

---

## 1) Core Approach (LOCKED)

1. **Build the complete final game first** (Level X = full playable end state)
2. Iterate on Level X until it:
   - feels immersive and high quality
   - stays within student-surface constraints
   - covers required B2/B3 programming + OOP (except recursion)
   - has clean, minimal, testable student interfaces
3. **Only then peel it back into levels**
4. **Level count is an OUTPUT, not a target** (~12, but do not pre-commit)

---

## 2) Prime Directive

Start from a modest, achievable FINAL GAME (Level X).
- **AAA feel comes from content and polish**, not sprawling mechanics
- **Engine may be complex internally**, unless students must touch that system
- Any student-facing interface must be:
  - minimal
  - explicit
  - stable across levels
  - easy to validate
  - not tightly coupled to hidden engine complexity

---

## 3) Non-Negotiables (HARD RULES)

### 3.1 Website Worksheets (HTML)

Worksheets contain **ZERO Python code**:
- no code snippets
- no partial methods
- no examples

Allowed in worksheets:
- UML diagrams (images)
- method names + parameters as plain text (e.g., `use_item(item_id: str, target: str) -> str`)
- keywords + definitions
- maps/visuals/images
- step-by-step task lists
- success criteria checklists
- download buttons/links
- "real-world connection" links

Worksheets must look like worksheets:
- title + objectives + keywords/definitions + "learning box" at top
- narrative context ("in-world")
- tasks + success criteria
- download link/button

### 3.2 Downloadable Per-Level PyCharm Folders

- Each level includes **ONLY what is required for that level to run**
- **No future-level content** in any level download
- Each download boots into a **level-appropriate start state snapshot**
- Student-editable files must NOT include pre-written skeletons or stubs:
  - no `def ...: pass`
  - no partially written methods
  - comments/instructions are allowed
- Engine is teacher-owned and stable:
  - students only edit `/student/`

### 3.3 Validation / Integrity

Every level contains `validate.py`:
- prints clear PASS/FAIL
- includes actionable error messages

Validation strategy:
- structure checks first (imports/classes/methods)
- bounded behaviour checks second
- avoid brittle validators (no strict typing, no over-testing)

### 3.4 Scope / Feature Creep Guardrails

Avoid sprawling mechanics:
- no huge branching state machines
- no RPG skill trees/status effects/loot tables
- no complex undo systems
- no real-time timers

If a concept doesn't naturally improve gameplay, classify it as:
- Worksheet-only, or
- Contained puzzle

NOT a permanent global mechanic.

---

## 4) Locked Design Decisions

### 4.1 Encounter System

Student-built encounter interface stays **fixed and tiny**.

Engine may include **more encounters** without increasing student scope:
- same action set
- same hooks
- same damage model/outcome rules
- differences are content parameters only (enemy name/HP/armour/description)

**Target: 3–5 encounters** using **one encounter system**.

### 4.2 Final Game Caps (Level X)

| Element | Cap |
|---------|-----|
| Rooms | 8–12 |
| Items | 10–16 |
| NPCs | 2–4 |
| Encounters | 3–5 |
| Contained puzzles | 2–3 |
| Story | Largely linear |

### 4.3 Student Surface Area

**The constraint is NOT "only 4 student files".**

The constraint is:
1. Per level, implementation should be **small enough** to complete in ~2–3 lessons
2. Engine ↔ student interface must be minimal, explicit, stable, easy to validate
3. Student code must not require understanding complex engine internals

Students build **many classes** (Room, Item, Enemy, NPC, Container):
- **Contract-critical classes**: engine relies on them (Player, Inventory, etc.)
- **Practice/authoring classes**: level-scoped learning artefacts

Do NOT lock student file names. Lock **interfaces/contracts** that the engine calls.

### 4.4 Coverage Modes (3-Mode Mapping)

Every B2/B3 concept must be labelled as:
- **Student mechanic**: required code that engine calls
- **Contained puzzle**: isolated challenge, doesn't expand global systems
- **Worksheet-only**: taught via exercises, no engine dependency

**2D arrays are Worksheet-only** — NOT forced into gameplay.

### 4.5 Inventory Capacity (LOCKED)

- Metric: item count
- Mechanism: `MAX_CAPACITY` class variable

### 4.6 Search/Sort (LOCKED)

Students may use built-ins: `sorted`, `.sort`, `key=`
No manual sorting algorithms required.

### 4.7 Recursion

NOT in core path. Optional extension only.

---

## 5) Required Contained Puzzles

| ID | Name | Skills Covered |
|----|------|----------------|
| P1 | Stack/Queue Terminal | ADT behaviour, LIFO/FIFO |
| P2 | Log Search/Sort | sorted(), key functions, linear search, validate_code |

All puzzles are **contained** — they don't expand global mechanics.

---

## 6) Build Order (LOCKED)

1. Build **Level X final game** (engine + content) with final student-facing contracts
2. Freeze the student-facing contracts
3. Write validators for those contracts
4. Peel back into level packages + worksheet specs

---

## 7) Required Documents (Frozen Spec Set)

| Document | Purpose |
|----------|---------|
| `INITIAL_GAME_DEV.md` | This file — authoritative master |
| `LEVEL_X_FINAL_GAME_SPEC.md` | Final game content + mechanics |
| `LEVEL_SEQUENCE_BACKWARDS_FINAL.md` | Peel-back plan |
| `CONTRACTS_AND_INTERFACES_FINAL.md` | Exact method signatures |
| `WORKSHEET_TEMPLATE_SPEC_FINAL.md` | Worksheet layout spec |
| `SYLLABUS_COVERAGE_MAP_B2_B3.md` | Coverage matrix with 3 modes |

---

## 8) Level X Requirements

### 8.1 Engine Owns

- World model + loader
- Parser and command loop
- Room transitions
- Item registry + placement
- NPC scripts
- Encounter loop
- File I/O mechanics + error handling
- Content writing (room text, lore)

### 8.2 Student-Facing Surfaces

- Player class fundamentals
- Subclass override(s) for polymorphism
- Inventory composition
- Contained stack/queue class behaviour
- Contained search/sort function behaviour
- Set/dict contained validator behaviour
- Encounter hooks (tiny)
- Save serialisation hooks (tiny)

### 8.3 Level X Folder Structure

```
level_x_final_game/
├── engine/
│   ├── __init__.py
│   ├── game_loop.py
│   ├── command_parser.py
│   ├── world_loader.py
│   ├── encounter.py
│   ├── save_load.py
│   └── content/
│       ├── rooms.json
│       ├── items.json
│       ├── npcs.json
│       └── encounters.json
├── student_reference/
│   ├── player.py
│   ├── player_types.py
│   ├── inventory.py
│   ├── data_structs.py
│   └── log_search.py
├── run_game.py
├── validate.py
└── README.md
```

### 8.4 AAA Feel Requirements

- Strong room descriptions
- Item descriptions with flavour
- Lore via notes/logs/environment
- NPC voice distinct
- Environmental storytelling
- Encounters feel dramatic in text

---

## 9) Key Reminders

- **AAA feel comes from content quality and presentation**, not mechanics count
- Student code must stay **small, explicit, and validated**
- Do not "mechanic-ify" every syllabus concept
- We're building a **teaching experience**, not a commercial game
- The final level is a **playthrough + reading the main loop**, not new coding
- Build Level X FIRST, then peel back

---

## 10) Acceptance Criteria (GO/NO-GO)

- [ ] Exactly one source of truth spec: this file
- [ ] No active doc contradicts it
- [ ] Level X runs end-to-end
- [ ] Student-facing method surface is minimal and stable
- [ ] Coverage map labels every B2/B3 item with 3-mode classification
- [ ] Worksheets contain zero Python code
- [ ] Contained puzzles P1/P2 are explicitly present
