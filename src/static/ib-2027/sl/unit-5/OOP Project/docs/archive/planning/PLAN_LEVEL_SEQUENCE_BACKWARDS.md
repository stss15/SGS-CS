# PLAN_LEVEL_SEQUENCE_BACKWARDS.md

**Purpose**: Define the backward decomposition from Final Level X into earlier levels.

**Date**: 2026-01-10  
**Status**: Planning (no code implementation yet)

---

## Important Balance Rule

> The engine may be complex internally, but student-facing interfaces MUST be simple.
> If a student must implement something that touches engine systems (battle/save/load), the required student-facing interface must be small, explicit, and testable, with minimal hidden coupling.

---

## How We Will Decide the Final Number of Levels

### Criteria:

1. **Student workload per level**: Each level should be completable in 2-3 lessons (3-5 hours). If a level requires more, split it.

2. **Concept grouping**: One major OOP concept per level. Combining two major concepts (e.g., inheritance AND composition) creates cognitive overload.

3. **Validator complexity**: Each level's validator should check a focused set of behaviours. If validator becomes sprawling, split the level.

4. **Progressive disclosure**: Each level should add ONE new student file or ONE new major method family. Avoid introducing 5+ new methods at once.

5. **Engine readiness**: Each level's engine must be self-contained and testable. If engine additions require significant new systems, delay them.

### Target count:
- **Preflight + 9 main levels** (A through I)
- Preflight is website-only warmup
- Levels A-H build incrementally
- Level I is final playthrough (no new student code)

---

## Level Sequence (Backwards from Final)

### Level X → Level I: Final Playthrough

**What student builds**: Nothing new. Playthrough only.

**Engine/content in download**:
- Complete 5-room map
- All 8 items
- Maintenance Drone NPC
- Security Bot encounter
- Save/load system
- Terminal puzzle

**Validator checks**: All prior contracts (full validation suite)

**Worksheet teaches**: Integration, reflection

**Baseline assumed from Level H**: Complete working game

---

### Level I → Level H: Save/Load (Persistence)

**What student builds**:
- `Player.to_save_data() -> dict`
- `Player.from_save_data(data: dict) -> Player` (class method)

**Engine/content in download**:
- 5-room map (unchanged from G)
- All items/NPCs/encounter from G
- NEW: Engine save/load I/O system
- save and load commands added

**Validator checks**:
- `to_save_data()` returns dict with keys: name, health, stats, inventory
- `from_save_data(data)` reconstructs player with matching attributes
- Round-trip test: save → load → attributes match

**Worksheet teaches**:
- Serialisation (converting objects to data)
- File I/O concepts (engine handles mechanics)
- Exception handling (engine shows how it catches errors)
- class methods vs instance methods

**Baseline assumed from Level G**: Player with encounter hooks, Inventory, complete world

---

### Level H → Level G: Encounter (Simple Combat)

**What student builds**:
- `Player.choose_action(options: list) -> int`
- `Player.compute_damage(base: int, armour: int) -> int`

**Engine/content in download**:
- 5-room map (unchanged)
- All items/NPCs from F
- NEW: Security Bot added to control_terminal
- NEW: Encounter loop in engine
- NEW: Death/restart handling

**Validator checks**:
- `choose_action([...])` returns int in valid range
- `compute_damage(base, armour)` returns `max(0, base - armour)`
- Simulated encounter with seeded inputs produces expected outcomes

**Worksheet teaches**:
- Turn-based loops (engine-owned, student hooks)
- State changes during gameplay
- Encapsulating behaviour in methods
- Defensive coding (valid returns)

**Baseline assumed from Level F**: Player with NPC hook, Inventory, map navigation

---

### Level G → Level F: NPC Dialogue

**What student builds**:
- `Player.respond_to_npc(options: list) -> int`

**Engine/content in download**:
- 5-room map (unchanged)
- All items from E
- NEW: Maintenance Drone NPC in main_corridor
- NEW: talk command
- NEW: NPC dialogue system (engine-owned)

**Validator checks**:
- `respond_to_npc([...])` returns int in valid range (0 to len-1)

**Worksheet teaches**:
- Method hooks (engine calls student code)
- Return values as communication
- Lists as parameters

**Baseline assumed from Level E**: Player with use_item, Inventory, map navigation

---

### Level F → Level E: Rooms and Movement

**What student builds**: Nothing new. Engine/content expansion level.

**Engine/content in download**:
- NEW: Full 5-room map (airlock, main_corridor, storage_cage, lab_bench, control_terminal)
- NEW: Room navigation (move command)
- NEW: look command shows room + exits + items
- Items placed in rooms: torch, keycard, crowbar, med_patch, access_code_note, battery
- security_door and supply_chest objects
- Students review engine code structure (optional)

**Validator checks**: No student code to validate. Level is "engine expansion + orientation".

**Worksheet teaches**:
- How engine manages world state
- How rooms connect
- How items are placed
- Code reading (students browse engine/)

**Baseline assumed from Level D**: Player with use_item, Inventory with consume

---

### Level E → Level D: Item Interactions

**What student builds**:
- `Player.use_item(item_id: str, target: str) -> str`
- `Inventory.consume(item_id: str) -> bool`

**Engine/content in download**:
- 2-room map: airlock + main_corridor
- NEW: security_door object in main_corridor
- NEW: supply_chest object (visible but requires crowbar)
- Items: keycard, crowbar, med_patch
- use <item> on <target> command added
- Engine validates targets before calling student code

**Validator checks**:
- `use_item("keycard", "security_door")` returns string containing "unlock"
- `use_item("med_patch", "self")` heals and removes item
- `consume("med_patch")` returns True and removes
- `consume("keycard")` returns False (not consumable)

**Worksheet teaches**:
- Object interaction patterns
- String return values as output
- Conditional logic based on item type
- Defensive handling of invalid inputs

**Baseline assumed from Level C+**: Player with Inventory, Stack/Queue classes

---

### Level D → Level C+: Terminal Puzzle (Stacks/Queues)

**What student builds**:
- `Stack` class with push/pop/peek/is_empty
- `Queue` class with enqueue/dequeue/front/is_empty

**Engine/content in download**:
- 1-room map: airlock only (same as C)
- Items: same as C
- NEW: Terminal object presents puzzle (optional segment)
- Puzzle uses Stack or Queue (engine calls student classes)

**Validator checks**:
- Stack: push/pop/peek/is_empty behave as LIFO
- Queue: enqueue/dequeue/front/is_empty behave as FIFO
- Empty operations return None

**Worksheet teaches**:
- Abstract data types
- LIFO vs FIFO
- Encapsulating data structure behaviour
- Using lists and deque internally

**Baseline assumed from Level C**: Player with Inventory (composition)

---

### Level C+ → Level C: Inventory (Composition)

**What student builds**:
- `Inventory` class with add/remove/list_items/has_item
- Integration into Player (`Player.inventory = Inventory()`)

**Engine/content in download**:
- 1-room map: airlock only
- NEW: 2 takeable items (keycard, torch)
- take command added
- inventory command added
- Engine calls student Inventory methods

**Validator checks**:
- Inventory() creates empty inventory
- add("keycard") returns True
- add("keycard") again returns False (duplicate)
- has_item("keycard") returns True
- remove("keycard") returns True
- has_item("keycard") returns False
- list_items() returns list
- Player.inventory is Inventory instance

**Worksheet teaches**:
- Composition ("has-a" relationship)
- Encapsulation (protected _items list)
- Boolean return values for success/failure
- Method delegation

**Baseline assumed from Level B**: Player base class + Brute/Scout subclasses

---

### Level C → Level B: Inheritance (Player Types)

**What student builds**:
- `Brute` class inheriting from Player
- `Scout` class inheriting from Player
- Override `get_starting_stats() -> dict` in each

**Engine/content in download**:
- 1-room map: airlock only (unchanged)
- No items yet
- NEW: Player type selection at game start
- Engine calls `get_starting_stats()` polymorphically

**Validator checks**:
- Brute inherits from Player
- Scout inherits from Player
- Brute.get_starting_stats() returns dict with health=120, armour=2, accuracy=70
- Scout.get_starting_stats() returns dict with health=80, armour=0, accuracy=95
- Brute(name) constructor works
- Scout(name) constructor works

**Worksheet teaches**:
- Inheritance ("is-a" relationship)
- Method overriding
- Polymorphism (engine calls same method, gets different results)
- super() usage

**Baseline assumed from Level A**: Player base class with core methods

---

### Level B → Level A: Foundation (First Class)

**What student builds**:
- `Player` class with __init__, get_status, take_damage, heal, get_starting_stats
- Required attributes: name, health

**Engine/content in download**:
- 1-room map: airlock only
- No items, no NPCs, no encounters
- Minimal command loop: help, status, look
- Engine constructs Player and calls methods

**Validator checks**:
- Player class exists
- Player("Test") creates player with name="Test"
- get_status() returns string containing name
- take_damage(50) reduces health
- take_damage(999) clamps at 0
- heal(20) increases health
- heal(999) clamps at max
- get_starting_stats() returns dict (base version)

**Worksheet teaches**:
- Classes and objects
- Constructors (__init__)
- Instance attributes
- Methods with parameters
- Value clamping (defensive coding)

**Baseline assumed**: None (first level)

---

### Level A → Preflight: OOP Intro (Teacher-Led Warmup)

**What student builds**: Nothing permanent. Live coding with teacher.

**Engine/content in download**: None (website-only worksheet)

**Validator checks**: None

**Worksheet teaches**:
- What is a class? (Book example)
- What are attributes? (Car example)
- What are methods? (BankAccount example)
- What is inheritance? (Person → Student/Teacher)
- Live practice creating simple classes

**Baseline assumed**: None (true starting point)

---

## Per-Level Reference Baselines

Each level builds on the previous. Before packaging level N, we create a **teacher reference solution** for level N-1. This reference solution ships inside level N's engine.

| Level | Ships As Reference From |
|-------|------------------------|
| Preflight | — |
| A | — (first student code) |
| B | Reference Player from A |
| C | Reference Player + Brute/Scout from B |
| C+ | Reference Player + types + Inventory from C |
| D | Reference all from C+ |
| E | Reference all from D |
| F | Reference all from E |
| G | Reference all from F |
| H | Reference all from G |
| I | Reference all from H |

Reference solutions live in private teacher folder, never in student download.

---

## Level Folder Contents Summary

| Level | student/ files | Rooms | Items | NPCs | Encounters | New Methods | Worksheet Focus |
|-------|---------------|-------|-------|------|------------|-------------|-----------------|
| Preflight | — | — | — | — | — | — | OOP concepts |
| A | player.py | 1 | 0 | 0 | 0 | 5 | Classes, objects |
| B | +player_types.py | 1 | 0 | 0 | 0 | 2 | Inheritance |
| C | +inventory.py | 1 | 2 | 0 | 0 | 5 | Composition |
| C+ | +data_structs.py | 1 | 2 | 0 | 0 | 8 | Data structures |
| D | — | 2 | 3 | 0 | 0 | 2 | Interaction |
| E | — | 5 | 6 | 0 | 0 | 0 | Engine review |
| F | — | 5 | 6 | 1 | 0 | 1 | NPC hooks |
| G | — | 5 | 6 | 1 | 1 | 2 | Encounter |
| H | — | 5 | 8 | 1 | 1 | 2 | Persistence |
| I | — | 5 | 8 | 1 | 1 | 0 | Capstone |

**Total new student methods**: ~27 (spread across 9 levels)
**Average per level**: ~3 new methods (manageable for beginners)

---

## Level by Level Validator Scope

| Level | Structure Checks | Behaviour Checks |
|-------|-----------------|------------------|
| A | Player class, 5 methods | Constructor, damage/heal clamping, status output |
| B | Brute/Scout classes, inheritance | Override returns different dicts |
| C | Inventory class, 4 methods, composition | Add/remove/has/list behaviour |
| C+ | Stack class, Queue class | LIFO/FIFO behaviour |
| D | use_item, consume methods | Item effects, consume logic |
| E | — | — (engine-only) |
| F | respond_to_npc method | Returns valid index |
| G | choose_action, compute_damage | Valid returns, damage calc |
| H | to_save_data, from_save_data | Round-trip persistence |
| I | All above | Full integration check |

---

## Next Steps After This Plan

1. Create level folder template (directory structure)
2. Create worksheet HTML template
3. Create validator utility module (shared helpers)
4. Build Preflight worksheet (website-only)
5. Build Level A folder + worksheet + validator (first full deliverable)
6. Iterate forward through levels B, C, C+, D, E, F, G, H, I

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Level scope creep | Hard method count limits per level |
| Engine complexity leaking | All engine systems hidden behind simple student interfaces |
| Validator brittleness | Test presence + behaviour, not types |
| Student confusion at Level A | Preflight warmup + extremely detailed worksheet |
| Integration issues | Reference baselines ensure compatibility |
| Time overruns | Time estimates per level; split if needed |

---

## Summary

Starting from the final playthrough (Level I), we peel backwards through 8 building levels (A-H) plus a warmup (Preflight). Each level adds a small, focused set of student code. Engine complexity grows but remains hidden. Student interfaces stay simple and testable.

**Total student deliverables**:
- 4 Python files
- ~27 methods
- Spread across 9 levels
- Each level: 2-3 lessons
