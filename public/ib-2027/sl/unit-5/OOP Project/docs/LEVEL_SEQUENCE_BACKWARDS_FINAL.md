# LEVEL_SEQUENCE_BACKWARDS_FINAL.md

**Purpose**: Define the peel-back from Level X (final game) into earlier levels.

**Date**: 2026-01-10  
**Status**: FROZEN

---

## Approach

We built Level X (final game) first. This document peels it back into learnable chunks.

**Level count is an OUTPUT, not a target.** Based on cognitive load and workload analysis, we arrive at **12 distinct levels** (including Preflight and 2 contained puzzles).

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
| 7 | E | Mission Log + Exploration | Logbook (aggregation) | 1–2 lessons |
| 8 | F | First Contact: Drone Dialogue | respond_to_npc | 1-2 lessons |
| 9 | G | Threat Response: Security Bot | choose_action, compute_damage | 2-3 lessons |
| 10 | H | Checkpoints: Save & Load | to_save_data, from_save_data | 2-3 lessons |
| 11 | I | Mission Complete: Playthrough | (reflection) | 1 lesson |

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
- get_status returns string containing name
- take_damage reduces health, clamps at 0
- heal increases health, clamps at max_health

**World content**:
- Airlock description only

---

### Level B: Specialisation — Brute & Scout

**Student builds**:
- `Brute(Player)` class overriding stats in `__init__`
- `Scout(Player)` class overriding stats in `__init__`
- `describe_specialty()` method in both subclasses (polymorphism)

**Engine provides**:
- Player type selection at start
- Same 1 room: Airlock
- Polymorphic calling of describe_specialty()

**Validator checks**:
- Brute inherits from Player
- Scout inherits from Player
- Brute and Scout stats differ from base Player
- Brute.describe_specialty() returns a string
- Scout.describe_specialty() returns a string

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

### Level E: Mission Log + Exploration

**Type**: Micro-lab + engine/content expansion

**Student builds**:
- `Logbook` class (aggregation)
- `Player.attach_logbook()` and `Player.record_event()`

**Worksheet teaches**:
- Aggregation vs composition (logbook exists independently)
- How the engine loads rooms from JSON
- How exits connect rooms
- How the command parser works
- Code reading exercises with comprehension questions

**Engine provides**:
- Full 10-room map unlocked
- Navigation working

**Purpose**: Small OOP lab before adding more mechanics, plus code reading practice.

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
| A | 4 (init, get_status, take_damage, heal) | 4 |
| B | 4 (Brute/Scout __init__ + describe_specialty) | 8 |
| C | 8 (Inventory methods + integration) | 16 |
| P1 | 12 (Stack + Queue) | 28 |
| D | 2 (use_item, consume) | 30 |
| P2 | 4 (load_logs_from_file, search_logs, sort_logs, validate_code) | 34 |
| E | 0 | 34 |
| F | 1 (respond_to_npc) | 35 |
| G | 2 (choose_action, compute_damage) | 37 |
| H | 2 (to_save_data, from_save_data) | 39 |
| I | 0 | 39 |

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
| E | 10 | 8 | 1 | 2 | 0 |
| F | 10 | 8 | 1 | 2 | 0 |
| G | 10 | 10 | 1 | 1 | 0 |
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
| H | Reference all from G |
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
