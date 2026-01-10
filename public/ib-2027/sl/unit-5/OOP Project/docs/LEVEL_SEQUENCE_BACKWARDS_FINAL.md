# LEVEL_SEQUENCE_BACKWARDS_FINAL.md

**Purpose**: Define the peel-back from Level X (final game) into earlier levels.

**Date**: 2026-01-10  
**Status**: FROZEN

---

## Approach

We built Level X (final game) first. This document peels it back into learnable chunks.

**Level count is an OUTPUT, not a target.** Based on cognitive load and workload analysis, we arrive at **12 distinct levels** (including Preflight and 3 contained puzzles).

---

## Level Sequence Overview

| # | ID | Display Name | Student Builds | Time |
|---|-----|--------------|----------------|------|
| 0 | — | Preflight: OOP Foundations | — (worksheet only) | 1 lesson |
| 1 | A | Foundation: The Player Class | Player class | 2-3 lessons |
| 2 | B | Specialisation: Brute & Scout | Subclasses, override | 2-3 lessons |
| 3 | C | Carrying Capacity: Inventory | Inventory + MAX_CAPACITY | 2-3 lessons |
| 4 | P1 | Terminal Access: Stacks & Queues | Stack, Queue | 1-2 lessons |
| 5 | D | Making Things Happen: Item Use | use_item, consume | 2-3 lessons |
| 6 | P2 | Data Retrieval: Log Search | search_logs, sort_logs | 1-2 lessons |
| 7 | E | Exploring the Facility | (code reading) | 1 lesson |
| 8 | F | First Contact: Drone Dialogue | respond_to_npc | 1-2 lessons |
| 9 | G | Threat Response: Security Bot | choose_action, compute_damage | 2-3 lessons |
| 10 | P3 | Access Validation: Code Checker | validate_code | 1 lesson |
| 11 | H | Checkpoints: Save & Load | to_save_data, from_save_data | 2-3 lessons |
| 12 | I | Mission Complete: Playthrough | (reflection) | 1 lesson |

**Total**: ~20-26 lessons (approximately one academic term)

---

## Detailed Level Specifications

### Preflight: OOP Foundations

**Type**: Worksheet-only (no download)

**Student builds**: Nothing

**Worksheet teaches**:
- What is OOP?
- Classes vs objects (blueprint analogy)
- Attributes and methods
- UML class diagram reading
- How this project works
- How to use the validator

**Engine content**: None

**Validator**: None

---

### Level A: Foundation — The Player Class

**Student builds**:
- `Player` class with:
  - `__init__(self, name: str)`
  - `get_starting_stats(self) -> dict`
  - `get_status(self) -> str`
  - `take_damage(self, amount: int) -> None`
  - `heal(self, amount: int) -> None`

**Engine provides**:
- Minimal command loop (help, status, look, quit)
- 1 room: Airlock
- No items, no NPCs, no encounters

**Validator checks**:
- Player class exists
- Constructor accepts name
- get_starting_stats returns dict with health, max_health, armour, accuracy
- get_status returns string containing name
- take_damage reduces health, clamps at 0
- heal increases health, clamps at max_health

**World content**:
- Airlock description only

---

### Level B: Specialisation — Brute & Scout

**Student builds**:
- `Brute(Player)` class overriding `get_starting_stats()`
- `Scout(Player)` class overriding `get_starting_stats()`

**Engine provides**:
- Player type selection at start
- Same 1 room: Airlock
- Polymorphic calling of get_starting_stats()

**Validator checks**:
- Brute inherits from Player
- Scout inherits from Player
- Brute.get_starting_stats() returns different values than base
- Scout.get_starting_stats() returns different values than Brute

**Reference baseline from A**: Teacher's Player implementation

---

### Level C: Carrying Capacity — Inventory

**Student builds**:
- `Inventory` class with:
  - `MAX_CAPACITY = 10` (class variable)
  - `__init__(self)`
  - `add(self, item_id: str) -> bool`
  - `remove(self, item_id: str) -> bool`
  - `list_items(self) -> list`
  - `has_item(self, item_id: str) -> bool`
  - `is_full(self) -> bool`
  - `count(self) -> int`
- Integration: Player creates Inventory in `__init__`

**Engine provides**:
- 2 rooms: Airlock, Storage Cage
- 3 items: Keycard, Crowbar, Torch
- `take` and `inventory` commands

**Validator checks**:
- Inventory class exists with MAX_CAPACITY
- add/remove/has_item/list_items behave correctly
- Capacity limit enforced
- Player has inventory attribute

**Reference baseline**: Teacher's Player + Brute/Scout

---

### P1: Terminal Access — Stacks & Queues

**Type**: Contained puzzle

**Student builds**:
- `Stack` class with push/pop/peek/is_empty/size
- `Queue` class with enqueue/dequeue/front/is_empty/size

**Engine provides**:
- Same 2 rooms
- Terminal object in Control Hub (preview)
- Puzzle uses Stack for "undo" and Queue for "execute"

**Validator checks**:
- Stack follows LIFO
- Queue follows FIFO
- Empty operations return None

**Note**: This puzzle is isolated — it unlocks a door but doesn't expand global mechanics.

---

### Level D: Making Things Happen — Item Use

**Student builds**:
- `Player.use_item(self, item_id: str, target: str) -> str`
- `Inventory.consume(self, item_id: str) -> bool`

**Engine provides**:
- 3 rooms: Airlock, Storage Cage, Lab Bench
- New items: Med Patch, Access Code Note
- `use <item>` and `use <item> on <target>` commands
- Locked door (needs Keycard)
- Chest (needs Crowbar)

**Validator checks**:
- use_item returns string
- Med Patch heals and is consumed
- Keycard unlocks door (returns success message)
- consume removes item and returns True

---

### P2: Data Retrieval — Log Search

**Type**: Contained puzzle

**Student builds**:
- `search_logs(logs: list, author: str) -> list`
- `sort_logs(logs: list, key: str, descending: bool) -> list`

**Engine provides**:
- Research Archive room (preview)
- Log entry list (20 entries)
- Puzzle: find Dr. Chen's non-corrupted entry

**Validator checks**:
- search_logs filters by author
- sort_logs orders by key
- Returns correct subset/ordering

**Note**: Uses Python built-ins (sorted with key). Manual sorting NOT required.

---

### Level E: Exploring the Facility

**Type**: Engine/content expansion (code reading)

**Student builds**: Nothing new

**Worksheet teaches**:
- How the engine loads rooms from JSON
- How exits connect rooms
- How the command parser works
- Code reading exercises with comprehension questions

**Engine provides**:
- Full 10-room map unlocked
- Navigation working

**Purpose**: Students see the bigger picture before adding more mechanics.

---

### Level F: First Contact — Drone Dialogue

**Student builds**:
- `Player.respond_to_npc(self, options: list) -> int`

**Engine provides**:
- Maintenance Drone NPC in Main Corridor
- `talk <npc>` command
- Dialogue script (4 exchanges)

**Validator checks**:
- respond_to_npc returns int
- Return value in valid range (0 to len-1)

---

### Level G: Threat Response — Security Bot

**Student builds**:
- `Player.choose_action(self, options: list) -> int`
- `Player.compute_damage(self, base: int, armour: int) -> int`

**Engine provides**:
- Encounter 1: Sentry Droid in Airlock exit
- Encounter loop (engine-owned)
- Options: Attack, Defend, Use Item, Run

**Validator checks**:
- choose_action returns int in valid range
- compute_damage returns max(0, base - armour)

**Note**: Engine handles 3-5 total encounters using same system; students only build hooks once.

---

### P3: Access Validation — Code Checker

**Type**: Contained puzzle

**Student builds**:
- `validate_code(code: str, used_codes: set) -> bool`

**Engine provides**:
- Security terminal requiring unique codes
- Set of previously used codes

**Validator checks**:
- Returns False if code in used_codes
- Returns True if code not in used_codes

---

### Level H: Checkpoints — Save & Load

**Student builds**:
- `Player.to_save_data(self) -> dict`
- `Player.from_save_data(cls, data: dict) -> Player` (class method)

**Engine provides**:
- `save` and `load` commands
- JSON file handling
- Error handling for missing/corrupt saves

**Validator checks**:
- to_save_data returns dict with required keys
- from_save_data reconstructs player with matching attributes
- Round-trip test passes

---

### Level I: Mission Complete — Final Playthrough

**Student builds**: Nothing new (optional polish task)

**Engine provides**:
- Complete final game
- All 10 rooms, 14 items, 3 NPCs, 4 encounters, 3 puzzles
- Full story playable

**Worksheet focus**:
- Play through entire game
- Read `run_game.py` main loop
- Identify how student code integrates
- Reflection questions
- Optional extension: add custom status message

---

## Method Introduction by Level

| Level | New Methods | Cumulative |
|-------|-------------|------------|
| A | 5 (init, get_starting_stats, get_status, take_damage, heal) | 5 |
| B | 2 (Brute/Scout overrides) | 7 |
| C | 8 (Inventory methods + integration) | 15 |
| P1 | 10 (Stack + Queue) | 25 |
| D | 2 (use_item, consume) | 27 |
| P2 | 2 (search_logs, sort_logs) | 29 |
| E | 0 | 29 |
| F | 1 (respond_to_npc) | 30 |
| G | 2 (choose_action, compute_damage) | 32 |
| P3 | 1 (validate_code) | 33 |
| H | 2 (to_save_data, from_save_data) | 35 |
| I | 0 | 35 |

**Average per level**: ~3 new methods (manageable)

---

## World Content by Level

| Level | Rooms | Items | NPCs | Encounters | Puzzles |
|-------|-------|-------|------|------------|---------|
| A | 1 | 0 | 0 | 0 | 0 |
| B | 1 | 0 | 0 | 0 | 0 |
| C | 2 | 3 | 0 | 0 | 0 |
| P1 | 2 | 3 | 0 | 0 | 1 |
| D | 3 | 5 | 0 | 0 | 0 |
| P2 | 3 | 5 | 0 | 0 | 1 |
| E | 10 | 8 | 0 | 0 | 0 |
| F | 10 | 8 | 1 | 0 | 0 |
| G | 10 | 10 | 1 | 1 | 0 |
| P3 | 10 | 10 | 1 | 1 | 1 |
| H | 10 | 12 | 2 | 2 | 2 |
| I | 10 | 14 | 3 | 4 | 3 |

---

## Reference Baseline Strategy

Each level builds on teacher reference solutions from previous levels.

| Level | Ships As Reference From |
|-------|------------------------|
| A | — (first student code) |
| B | Reference Player from A |
| C | Reference Player + types from B |
| P1 | Reference all from C |
| D | Reference all from P1 |
| P2 | Reference all from D |
| E | Reference all from P2 |
| F | Reference all from E |
| G | Reference all from F |
| P3 | Reference all from G |
| H | Reference all from P3 |
| I | Reference all from H |

Students do NOT carry their code forward. Each level starts fresh with teacher baselines.

---

## Next Steps

1. ✅ Build Level X final game (runnable)
2. Create level folders working backwards from I to A
3. Create validators for each level
4. Create worksheet specs (markdown) for each level
5. Create HTML worksheets from specs
6. Create downloadable ZIPs
