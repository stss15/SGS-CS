# AUDIT_00_SANITY_CHECK_AND_OPEN_QUESTIONS.md

**Purpose**: Cross-check all README spec files, identify contradictions, ambiguities, missing specs, and produce decision-forcing questions that must be answered before build starts.

**Audit date**: 2026-01-10  
**Documents reviewed**: README_00 through README_10 (plus empty README_11)

---

## 1. Direct Contradictions Between READMEs

### 1.1 Document Map Mismatch (README_00 vs Actual Files)

| Issue | Details |
|-------|---------|
| **README_00 line 208** | Lists `README_08_AUTHORING_WORKFLOW_FOR_NEW_LEVELS.md` |
| **Actual file** | `README_08_LEVEL_LOCAL_README_TEMPLATE.md` |
| **Impact** | Minor confusion; no authoring workflow document exists |

**Resolution needed**: Either rename README_08 or create a separate authoring workflow document.

### 1.2 Stacks/Queues Placement Ambiguity

| README_01 | README_02 | README_04 |
|-----------|-----------|-----------|
| Stacks required with push/pop/peek/is_empty | Not listed as OOP feature | Not assigned to any specific level |
| Queues required with enqueue/dequeue/front/is_empty | Not listed as OOP feature | Not assigned to any specific level |

**Conflict**: README_01 mandates stack and queue implementations, but:
- README_02 (OOP features) does not mention them
- README_04 (level breakdown) has no level dedicated to stacks/queues

**Risk**: These data structure classes will need a home. Without a level, they won't be taught.

### 1.3 Static vs Dynamic Structure Teaching

| README_01 | README_02 | README_04 |
|-----------|-----------|-----------|
| "Fixed-capacity list wrapper" allowed | Not mentioned as OOP requirement | No level covers this concept |

**Conflict**: Python features doc allows this demo, but no level or OOP requirement references it.

### 1.4 Level D Option Ambiguity

| README_04 (Level D) |
|---------------------|
| "Student builds Option 1: KeyItem/Consumable class OR Option 2: Player methods for using items" |

**Problem**: The spec offers two mutually exclusive paths but doesn't state which one is chosen. The engine and validator will differ based on choice.

---

## 2. Ambiguities Requiring Clarification

### 2.1 Player Subclass Design

| Question | Location | Impact |
|----------|----------|--------|
| What are the two player subclasses called? | README_02 line 74, README_04 line 73 | Names needed for UML, worksheet, validator |
| What behaviour differs between them? | Not specified | Engine polymorphism call design |
| What method is overridden? | "at least one" specified, no name given | Contract definition for validation |

### 2.2 Inventory Capacity Rule

| README_03 line 148 | README_01 line 193 |
|--------------------|---------------------|
| "Optional capacity constraint (either item count or weight)" | "Fixed-capacity inventory variant" as teaching demo |

**Ambiguity**: Is capacity required or optional? If optional, when is it introduced? If required, which metric (count vs weight)?

### 2.3 Encounter Details

| Question | Location |
|----------|----------|
| What actions can Player choose in encounter? | README_03 line 204 lists "attack, defend, use item, run" but calls it "fixed action set" without confirmation |
| How is damage computed? | Not specified |
| Is enemy health tracked? If so, by whom? | README_03 says "one enemy, fixed behaviour" but no detail |
| How does player "survive/lose"? | Acceptance criteria says "under clear conditions" but conditions not defined |

### 2.4 Save/Load Responsibility Split

| README_03 | README_04 (Level H) |
|-----------|---------------------|
| "Save/load checkpoint" | Student builds "SaveState class from UML OR Player/Inventory methods" |

**Ambiguity**: 
- If SaveState is a class, who calls it? Engine or Player?
- Who is responsible for file I/O mechanics (open/write/read)?
- Does the engine own the file path or does student code?

### 2.5 World Content Format

| README_04 line 324-325 | README_06 line 60 |
|------------------------|-------------------|
| `map_data.<format>` and `rooms.<format>` placeholder | "level-specific map data file" |

**Ambiguity**: What file format? Plain text? Python module? The format affects engine design.

### 2.6 NPC Dialogue Ownership

| README_03 line 188 | README_04 (Level F) |
|--------------------|---------------------|
| "NPC scripts belong to the engine" | Student builds "Player method that returns a response choice" |

**Clarification needed**: NPC dialogue content is engine-owned, but what exactly does the student method do? Return a choice index? Return a string?

---

## 3. Missing Specifications

### 3.1 Completely Missing Documents

| Expected (from README_00) | Status |
|---------------------------|--------|
| `README_08_AUTHORING_WORKFLOW_FOR_NEW_LEVELS.md` | Missing (different doc exists at README_08) |
| `README_11_WORLD_CONTENT_MODEL.md` | Empty file (0 bytes) |

### 3.2 Missing Contract Definitions

| Missing Item | Required By |
|--------------|-------------|
| Exact Player class attribute names | Worksheet/UML, validator |
| Exact Player subclass names | Worksheet/UML, validator, engine |
| Exact Inventory method signatures | Worksheet/UML, validator |
| Exact encounter action method name on Player | Worksheet/UML, validator, engine |
| Exact save/load method signatures | Worksheet/UML, validator |

### 3.3 Missing Engine Design Specs

| Missing Item | Impact |
|--------------|--------|
| How engine initialises/calls student Player | Cannot build engine |
| How engine passes context to encounter hooks | Cannot build encounter system |
| How engine handles player death | Game flow undefined |
| Command parser tokenisation rules | Input handling undefined |
| Room/exit data structure | Map system undefined |

### 3.4 Missing Level Delivery Details

| Missing Item | Required For |
|--------------|--------------|
| Theme/narrative frame for game | Story text, immersion |
| Actual room names and descriptions | Content files |
| Actual item names and purposes | Gameplay testing |
| Actual NPC names and dialogue | Content files |

### 3.5 Missing HTML Worksheet Template

| README_07 | Status |
|-----------|--------|
| Detailed section-by-section layout spec | Exists |
| Actual HTML/CSS template or example | Missing |

---

## 4. Scope Creep Risks

### 4.1 Encounter System Complexity

| Risk Area | Spec References |
|-----------|-----------------|
| README_03 mentions "attack, defend, use item, run" | Four distinct actions |
| README_04 Level G says "compute damage within a bounded rule set" | Implies damage calculation complexity |
| README_03 says "deterministic enough to validate (or bounded randomness with seeded behaviour)" | Randomness adds complexity |

**Risk**: "Simple encounter" could easily balloon into RPG-lite combat.

**Guardrail test**: Can the encounter be validated with <10 lines of behavioural checks?

### 4.2 Level E "Player Hook" Uncertainty

| README_04 Level E |
|-------------------|
| "minimal additions to Player interface if required (e.g., on_enter_room hook), or no new student code if not needed" |

**Risk**: Hooks invite feature creep. If "on_enter_room" is added, what does it return/do? Does it trigger traps? Events?

**Guardrail**: Consider making Level E engine-only with no student code to keep focus.

### 4.3 Level F Dialogue Branching

| README_04 Level F |
|-------------------|
| "Player method that returns a response choice" |

**Risk**: If dialogue has choices, how many? Do choices affect outcomes? Does this introduce state?

**Guardrail**: Keep dialogue to single-path with no persistent flags.

### 4.4 Item Hierarchy Expansion

| README_02 line 75 | README_04 Level D Option 1 |
|-------------------|----------------------------|
| "Item base class with subclasses (e.g., consumable vs key item) only if needed later" | "KeyItem / Consumable class (small and tight)" |

**Risk**: Two item subclasses means building an Item hierarchy. Is this OOP practice or feature creep?

**Decision needed**: Is Item a student-built class or engine-owned?

---

## 5. Pedagogical Risks

### 5.1 Level Progression Jumps

| Level Transition | New Concepts | Risk Level |
|------------------|--------------|------------|
| A → B (Foundation → Inheritance) | Inheritance + polymorphism + overriding | **Medium**: Two new concepts |
| C → D (Inventory → Interactions) | Object targeting + item use mechanics | **High**: Interaction system is complex |
| F → G (NPC → Encounter) | Combat loop + action selection + health changes | **High**: Multiple new mechanics |

### 5.2 Student Workload Estimates

| Level | Estimated Class Work | Estimated Methods | Risk |
|-------|---------------------|-------------------|------|
| A | Player | 3-5 | Low |
| B | 2 subclasses | 1-2 overrides each | Medium |
| C | Inventory + integration | 4-5 | Medium |
| D | Interaction OR item use | Unclear | **Unknown** |
| G | Encounter hooks | Damage calc + action choice | **High** |
| H | SaveState OR serialisation | 2-4 | Medium |

### 5.3 Blank File Learning Curve

| Concern |
|---------|
| Students receive blank files with no skeletons. First-time OOP learners may struggle with "where do I even start?" |

**Mitigation needed**: Worksheets must have extremely clear step-by-step task lists.

### 5.4 Validator Dependency

| Concern |
|---------|
| If validator checks are too strict, students spend time debugging validator errors rather than learning OOP. |
| If validator checks are too loose, incorrect code passes. |

**Recommendation**: First pass of validators should focus on structure only; behaviour checks added incrementally.

---

## 6. Syllabus Alignment Issues

### 6.1 IB 2027 Syllabus Coverage (Based on B2/B3 Themes)

| Syllabus Topic | Covered in Project? | Notes |
|----------------|---------------------|-------|
| Classes and objects | Yes (Level A) | Core feature |
| Constructors | Yes (Level A) | Core feature |
| Instance attributes | Yes (Level A) | Core feature |
| Methods | Yes (Level A+) | Core feature |
| Encapsulation | Yes (Level C) | Via Inventory |
| Inheritance | Yes (Level B) | Player subclasses |
| Polymorphism | Yes (Level B) | Via overriding |
| Composition | Yes (Level C) | Player has Inventory |
| Aggregation | Implicit | README_02 says required but no clear level |
| Abstract classes | Allowed (README_01) | Not explicitly required in any level |
| Static/class attributes | Allowed sparingly | Not taught in any level |
| Stacks | Allowed (README_01) | **No level assigned** |
| Queues | Allowed (README_01) | **No level assigned** |
| File I/O | Yes (Level H) | Save/load |
| Exception handling | Yes (Level H) | Save/load |

### 6.2 Missing from Levels but in Python Features

| Feature | README_01 Status | Level Assignment |
|---------|------------------|------------------|
| Stack (list-based) | Required operations defined | None |
| Queue (deque-based) | Required operations defined | None |
| collections.deque | Allowed | None |
| abc.ABC | Allowed | None |

### 6.3 HL vs SL Differentiation

| User Context Says | Current Spec |
|-------------------|--------------|
| "HL-only content will later be added as optional/extra rooms or puzzle content" | No mechanism defined for HL rooms |
| "Recursion is HL-only in the sense of required to implement" | Recursion explicitly banned in README_01 line 276 |

**Issue**: How will HL content be delivered? Separate level folders? Extra worksheet sections?

---

## 7. Questions That Must Be Answered Before Build Starts

### 7.1 Engine Questions

| ID | Question | Why It Matters | What Breaks If Unanswered | Recommended Default |
|----|----------|----------------|---------------------------|---------------------|
| E01 | What are the exact names for the two Player subclasses? | UML, worksheet, validator, engine all need them | Cannot define contracts | `Warrior` and `Mage` (or similar simple pair) |
| E02 | What method do subclasses override and what does it return? | Polymorphism demo requires this | Engine can't call polymorphically | `special_action(context) -> str` |
| E03 | What format are room/map data files? | Engine design depends on this | Cannot build world loader | Python module with dict/list literals |
| E04 | How does engine initialise Player? Name + type only? | Constructor contract | Validator/engine mismatch | `Player(name: str)`, subclass instances created by engine |
| E05 | Who owns Item classes - engine or student? | Level D design | Two parallel item systems | Engine owns; student uses items via Inventory methods |
| E06 | How does engine handle Player death during encounter? | Game flow | Undefined behaviour | Print message, offer restart/load |

### 7.2 Level Content Questions

| ID | Question | Why It Matters | What Breaks If Unanswered | Recommended Default |
|----|----------|----------------|---------------------------|---------------------|
| L01 | Is Level D Option 1 or Option 2? | Completely different curriculum paths | Cannot build validator or worksheet | Option 2 (Player methods for using items) - keeps Item classes engine-owned |
| L02 | Does Level E add a student hook or not? | If yes, contract needed; if no, level is engine-only | Unclear deliverables | No hook - Level E is engine development only, student reviews code |
| L03 | What are the 4-5 room names for Level E+ map? | Content files, worksheet visuals | Cannot build map | Use placeholder archaeological site theme |
| L04 | What items exist in final game (8-15)? | Content files, inventory testing | Cannot design puzzles | Define minimal set: key, healing potion, torch, keycard, crowbar, note, battery, medkit |
| L05 | What is the NPC name and dialogue for Level F? | Content, worksheet | Cannot build NPC | Single NPC "Guide" with 2-line hint dialogue |
| L06 | Where do stacks/queues fit in the level sequence? | README_01 requires them | Feature never taught | Add optional "Data Structures Bonus" after Level C |

### 7.3 Validation Questions

| ID | Question | Why It Matters | What Breaks If Unanswered | Recommended Default |
|----|----------|----------------|---------------------------|---------------------|
| V01 | Should validators check return types or just presence? | Strictness policy | Inconsistent feedback | Check presence + basic behaviour; skip type checking |
| V02 | Should hash-check for engine tampering be on by default? | Anti-cheating vs maintenance burden | Teacher workflow friction | Off by default; document how to enable |
| V03 | How should validators report multiple errors? | UX for students | Overwhelming output or hidden issues | Stop at first structural error; continue through behaviour errors |

### 7.4 Website Questions

| ID | Question | Why It Matters | What Breaks If Unanswered | Recommended Default |
|----|----------|----------------|---------------------------|---------------------|
| W01 | Is there an HTML/CSS template for worksheets? | Consistency, speed | Each worksheet designed from scratch | Create base template before first worksheet |
| W02 | Where do UML diagrams come from? | Authoring workflow | Inconsistent or missing diagrams | Draw.io exports to PNG; store in spec/ alongside level |
| W03 | What's the download button mechanism? | Worksheet functionality | Broken links | Static zip hosted in /downloads/ folder |

### 7.5 Pedagogy Questions

| ID | Question | Why It Matters | What Breaks If Unanswered | Recommended Default |
|----|----------|----------------|---------------------------|---------------------|
| P01 | What's the target time per level? | Lesson planning | Over/under-scoped levels | 2-3 lessons (3-5 hours) per level |
| P02 | Is there a "Level 0" / pre-OOP warmup? | Cold start problem | Students stuck at line 1 | Optional "Python recap" warmup activity |
| P03 | How do SL and HL paths diverge? | Curriculum design | HL students under-challenged | Same core path; HL gets bonus worksheet sections after each level |
| P04 | Who creates the UML diagrams for students? | Authoring workflow | Missing materials | Teacher/agent creates all UML before level publish |

### 7.6 Packaging/Release Questions

| ID | Question | Why It Matters | What Breaks If Unanswered | Recommended Default |
|----|----------|----------------|---------------------------|---------------------|
| R01 | What's the folder naming convention? | Consistency | Confusing downloads | `oop_level_<letter>_<name>/` e.g., `oop_level_a_foundation/` |
| R02 | Version string format? | Release management | Version confusion | `v1.0`, `v1.1`, etc. per level |
| R03 | Where are reference baseline solutions stored? | Next-level packaging | Cannot build next level folders | Private teacher repo; never in student downloads |
| R04 | Release checklist - who runs it? | QA | Broken levels published | Checklist in README_06 runs before each zip upload |

---

## 8. Decision Log

All decisions recorded 2026-01-10 by Teacher.

### Engine Decisions

| ID | Question | Decision |
|----|----------|----------|
| E01 | Player subclass names | **Brute** and **Scout** |
| E02 | Override method + return | `get_starting_stats() -> dict` (returns health/armour/accuracy) |
| E03 | Room/map data format | **JSON** (`engine/world/world.json`) |
| E04 | Engine initialises Player | Constructor takes `name: str` only; engine creates `Brute(name)` or `Scout(name)` |
| E05 | Item class ownership | **Engine-owned**; students store item IDs via Inventory methods |
| E06 | Player death handling | Print outcome, restart from level snapshot (no permadeath) |

### Level Content Decisions

| ID | Question | Decision |
|----|----------|----------|
| L01 | Level D option | **Option 2** (Player/Inventory methods for using items) |
| L02 | Level E hook | **No hook** — Level E is engine/world expansion only |
| L03 | Room names/theme | "Abandoned Research Facility": Airlock, Main Corridor, Storage Cage, Lab Bench, Control Terminal |
| L04 | Final game items | 8 items: Keycard, Crowbar, Torch, Battery, Med Patch, Access Code Note, Shield Plate, Signal Beacon |
| L05 | NPC | **Maintenance Drone** (no branching, no persistent state) |
| L06 | Stacks/queues placement | **Level C+ "Terminal Puzzle"** segment after Inventory level |

### Validation Decisions

| ID | Question | Decision |
|----|----------|----------|
| V01 | Type checking strictness | Check presence + behaviour only; skip strict type checking |
| V02 | Engine tamper hash | **Off by default**; optional switch for exam conditions |
| V03 | Multiple errors reporting | Stop at first structural error; continue through behaviour errors |

### Website Decisions

| ID | Question | Decision |
|----|----------|----------|
| W01 | Worksheet template | Create base HTML/CSS template before first worksheet |
| W02 | UML source | **PlantUML** (text in teacher repo, export to PNG) |
| W03 | Download mechanism | Static zips in `/downloads/`, linked from worksheets |

### Pedagogy Decisions

| ID | Question | Decision |
|----|----------|----------|
| P01 | Target time per level | 2-3 lessons per level, with optional extension task |
| P02 | Pre-OOP warmup | **Yes** — "Preflight" worksheet (website-only) with classic examples (Book, Car, Person) |
| P03 | HL differentiation | Same core path; optional "puzzle packs" as separate downloads + worksheet sections |
| P04 | UML creation | Teacher/agent produces all UML before release |

### Packaging/Release Decisions

| ID | Question | Decision |
|----|----------|----------|
| R01 | Folder naming | `level_<letter>_<slug>/` (e.g., `level_b_inheritance/`) |
| R02 | Version string | Simple: v1, v2, etc. per level |
| R03 | Reference baseline storage | Private teacher-only area (never packaged) |
| R04 | Release checklist owner | Agent runs automated checks; teacher does final pass |

---

## 9. Resolved Blockers

All critical blockers have been addressed:

| Blocker | Resolution |
|---------|------------|
| Player subclass names (E01, E02) | ✅ Brute and Scout with `get_starting_stats()` |
| Level D path choice (L01) | ✅ Option 2 (engine-owned Items) |
| Stacks/queues placement (L06) | ✅ Level C+ Terminal Puzzle segment |
| README_08 mismatch | ✅ Fixed doc map in README_00; authoring workflow added to README_06 |
| Empty README_11 | ✅ Complete world content model with JSON schema |
| HL differentiation (P03) | ✅ Optional puzzle packs, same core path |

---

## 10. Build Ready Checklist

All decisions are recorded. The following must be created before Level A:

1. [x] All README specs updated with decisions
2. [ ] Level folder template (directory structure)
3. [ ] Worksheet HTML/CSS template
4. [ ] world.json schema validation script
5. [ ] Validator helper utilities
6. [ ] Preflight worksheet (website-only, classic OOP examples)
7. [ ] Level A folder + worksheet (first full deliverable)
