# PLAN_FINAL_LEVEL_X_FINAL_PLAYTHROUGH.md

**Purpose**: Define the modest, achievable final game state that all earlier levels peel back from.

**Date**: 2026-01-10  
**Status**: Planning (no code implementation yet)

---

## Important Balance Rule

> The engine may be complex internally, but student-facing interfaces MUST be simple.
> If a student must implement something that touches engine systems (battle/save/load), the required student-facing interface must be small, explicit, and testable, with minimal hidden coupling.

---

## 1) Final Level X Purpose

**What students do in this final level:**

Final Level X is a "capstone playthrough" where students experience the complete modest game. By this point, students have already built all required classes and methods in prior levels. In Level X, students:

- Do NOT build new classes or methods
- Play through the complete scenario end-to-end
- May complete an optional "polish" task (add one cosmetic method or message)
- Reflect on how all their classes integrate into the working game

**Pedagogical goal**: Students see the fruit of their work — a playable text adventure that uses their Player, Inventory, and hook methods.

---

## 2) Final Playthrough: Constrained Feature List

### What EXISTS in the final game:

| Feature | Description | Student-built? |
|---------|-------------|----------------|
| Player class | name, health, stats, status display | Yes (Level A) |
| Player subclasses | Brute, Scout with `get_starting_stats()` | Yes (Level B) |
| Inventory | add/remove/list/has_item via IDs | Yes (Level C) |
| Stack/Queue | puzzle segment classes | Yes (Level C+) |
| Item use | `use_item(item_id, target)` on Player | Yes (Level D) |
| Rooms/map | 5 rooms, movement | Engine-owned (Level E) |
| NPC talk | Maintenance Drone, simple dialogue | Engine-owned + hook (Level F) |
| Encounter | one Security Bot fight | Engine loop + student hooks (Level G) |
| Save/load | checkpoint persistence | Engine I/O + student serialisation (Level H) |

### What does NOT exist:

| Excluded Feature | Reason |
|------------------|--------|
| Multiple endings | Scope creep |
| Branching dialogue | Scope creep |
| Multiple enemy types | Keep encounter simple |
| Complex loot tables | Keep inventory simple |
| Skill trees / leveling | Not required for OOP demo |
| Timed events | Unnecessary complexity |
| Multiplayer | Out of scope |
| GUI | Text-only |

---

## 3) World Content Summary

### Rooms (5 total)

| Room ID | Name | Description | Exits | Contains |
|---------|------|-------------|-------|----------|
| airlock | Airlock | Entry point; metallic chamber, sealed outer door | east→main_corridor | — |
| main_corridor | Main Corridor | Central hub; flickering lights, doors on sides | west→airlock, north→lab_bench, south→storage_cage, east→control_terminal | Torch, Maintenance Drone |
| storage_cage | Storage Cage | Locked supplies area | north→main_corridor | Supply Chest (crowbar-opened), Keycard |
| lab_bench | Lab Bench | Research station with broken equipment | south→main_corridor | Med Patch, Access Code Note |
| control_terminal | Control Terminal | Main control hub; Security Bot patrols | west→main_corridor | Battery, Shield Plate, Signal Beacon, Terminal puzzle, Security Bot (encounter) |

### Items (8 total)

| Item ID | Name | Location | Use | Consumable? |
|---------|------|----------|-----|-------------|
| keycard | Keycard | storage_cage | Unlocks lab_bench door | No |
| crowbar | Crowbar | main_corridor (hidden) | Opens supply_chest | No |
| torch | Torch | main_corridor | Illumination (cosmetic) | No |
| battery | Battery | control_terminal | Powers terminal puzzle | No |
| med_patch | Med Patch | lab_bench | Heals +20 HP | Yes |
| access_code_note | Access Code Note | lab_bench | Reveals terminal code | No |
| shield_plate | Shield Plate | control_terminal | Adds +10 temp armour | Yes |
| signal_beacon | Signal Beacon | control_terminal | Triggers ending | No |

### NPCs (1 total)

| NPC ID | Name | Location | Dialogue |
|--------|------|----------|----------|
| maintenance_drone | Maintenance Drone | main_corridor | 2-line hint about keycard and supplies |

### Interactive Objects

| Object ID | Type | Location | Requires | Effect |
|-----------|------|----------|----------|--------|
| security_door | door | main_corridor→lab_bench | keycard | Unlocks passage |
| supply_chest | chest | storage_cage | crowbar | Contains med_patch, battery |
| terminal | terminal | control_terminal | battery + access_code | Stack/queue puzzle |

### Encounters (1 total)

| Encounter ID | Enemy | Location | Trigger |
|--------------|-------|----------|---------|
| security_bot_encounter | Security Bot (HP 50, DMG 15, ARM 5) | control_terminal | On first entry |

---

## 4) Student-Code Contracts in Final Level X

### Student files in final level folder:

```
student/
  player.py        # Player base class
  player_types.py  # Brute, Scout subclasses
  inventory.py     # Inventory class
  data_structs.py  # Stack, Queue classes
```

### Classes and methods students have built (by Level X):

**Player class** (student/player.py)
- `__init__(name: str)` — constructor
- `get_status() -> str` — returns status string
- `take_damage(amount: int) -> None` — reduces health, clamps at 0
- `heal(amount: int) -> None` — increases health, clamps at max
- `use_item(item_id: str, target: str) -> str` — uses item, returns outcome
- `respond_to_npc(options: list) -> int` — returns choice index
- `choose_action(options: list) -> int` — returns encounter action index
- `compute_damage(base: int, armour: int) -> int` — returns damage after armour
- `to_save_data() -> dict` — returns serialisable dict
- `from_save_data(data: dict) -> Player` — class method, reconstructs player

**Brute class** (student/player_types.py)
- Inherits from Player
- Overrides `get_starting_stats() -> dict` — returns `{"health": 120, "armour": 2, "accuracy": 70}`

**Scout class** (student/player_types.py)
- Inherits from Player
- Overrides `get_starting_stats() -> dict` — returns `{"health": 80, "armour": 0, "accuracy": 95}`

**Inventory class** (student/inventory.py)
- `__init__()` — empty inventory
- `add(item_id: str) -> bool` — True if added, False if duplicate
- `remove(item_id: str) -> bool` — True if removed, False if not found
- `list_items() -> list` — returns list of item IDs
- `has_item(item_id: str) -> bool` — True if present
- `consume(item_id: str) -> bool` — removes if consumable, returns True/False

**Stack class** (student/data_structs.py)
- `__init__()` — empty stack
- `push(item) -> None`
- `pop() -> item or None`
- `peek() -> item or None`
- `is_empty() -> bool`

**Queue class** (student/data_structs.py)
- `__init__()` — empty queue
- `enqueue(item) -> None`
- `dequeue() -> item or None`
- `front() -> item or None`
- `is_empty() -> bool`

### Battle interface (student-built vs engine-owned)

| Component | Owner | Interface |
|-----------|-------|-----------|
| Encounter loop | Engine | Calls student methods |
| Player action selection | **Student** | `choose_action(options: list) -> int` |
| Damage calculation | **Student** | `compute_damage(base: int, armour: int) -> int` |
| Enemy behaviour | Engine | Scripted, deterministic |
| Health tracking | Engine calls student | Engine calls `take_damage()`, `heal()` |
| Battle end condition | Engine | Checks health values |

**Student responsibility in battle**: 2 methods. Engine hides loop, enemy AI, turn order.

### Save/load interface (student-built vs engine-owned)

| Component | Owner | Interface |
|-----------|-------|-----------|
| File I/O | Engine | Reads/writes file |
| Serialisation | **Student** | `to_save_data() -> dict` |
| Deserialisation | **Student** | `from_save_data(data: dict) -> Player` |
| Inventory serialisation | Engine | Calls `list_items()` |
| Room/world state | Engine | Engine handles |

**Student responsibility in save/load**: 2 methods. Engine hides file paths, formats, error handling.

---

## 5) Engine Responsibilities in Final Level X

The engine owns and hides:

| System | Engine Responsibility |
|--------|----------------------|
| Command parser | Tokenise input, match commands |
| World loader | Load world.json, build room graph |
| Room navigation | Validate exits, move player |
| Item registry | Track item definitions, locations |
| NPC dialogue | Store/display dialogue, call student hook for choice |
| Encounter loop | Run turn order, apply effects, check end conditions |
| Save/load I/O | Read/write files, handle missing/corrupt |
| Death/restart | Detect death, reset to level snapshot |
| Victory | Detect signal beacon use, print ending |

**Engine complexity hidden**: Students never see command parsing, world graph, encounter state machine, file I/O code.

---

## 6) Save/Load Model

### What is persisted (minimal state):

| Data | Source | Format |
|------|--------|--------|
| player_name | Player.name | string |
| player_type | "brute" or "scout" | string |
| player_health | Player.health | int |
| player_stats | get_starting_stats() result | dict |
| inventory | Inventory.list_items() | list of strings |
| current_room | Engine | string (room_id) |
| world_flags | Engine | dict (e.g., {"security_door_unlocked": true}) |

### File format:
- JSON file at `saves/game_save.json`
- Engine handles read/write
- Student provides `to_save_data()` and `from_save_data()`

### Error handling:
- Missing file: engine prints message, continues with fresh state
- Corrupt file: engine prints message, continues with fresh state
- No exceptions leak to student code

---

## 7) Encounter Model

### Encounter flow (engine-controlled):

1. Player enters control_terminal for first time
2. Engine triggers security_bot_encounter
3. Engine shows encounter intro text
4. LOOP:
   - Engine displays options: `["Attack", "Defend", "Use Item", "Run"]`
   - Engine calls `player.choose_action(options)` → gets index
   - Engine applies player action effect
   - Engine applies enemy action (fixed behaviour)
   - Engine checks health values
5. END when player HP = 0 (death) or enemy HP = 0 (victory) or player ran

### Student methods for encounter:

| Method | Purpose | Returns |
|--------|---------|---------|
| `choose_action(options: list) -> int` | Pick action from list | Index 0-3 |
| `compute_damage(base: int, armour: int) -> int` | Calculate damage | `max(0, base - armour)` |

### Determinism:
- Enemy behaviour is scripted (always attacks)
- Damage values are fixed
- Validator can reproduce encounter with seeded choices

### Death handling:
- Print "You have been defeated."
- Restart from level start state (snapshot)
- No permadeath

---

## 8) Validation Strategy for Final Level X

### What validate.py checks:

**Structure checks** (stop on first failure):
- student/player.py imports successfully
- student/player_types.py imports successfully
- student/inventory.py imports successfully
- student/data_structs.py imports successfully
- Player class exists
- Brute class exists and inherits Player
- Scout class exists and inherits Player
- Inventory class exists
- Stack class exists
- Queue class exists

**Signature checks**:
- All required methods exist and are callable
- Methods accept correct parameter counts

**Behaviour checks** (continue through all):
- Player constructor sets name and health
- take_damage clamps at 0
- heal clamps at max
- Brute.get_starting_stats() returns dict with health/armour/accuracy
- Scout.get_starting_stats() returns different values than Brute
- Inventory add/remove/has_item behave correctly
- Stack push/pop/peek/is_empty behave correctly
- Queue enqueue/dequeue/front/is_empty behave correctly
- use_item returns string outcome
- choose_action returns int in valid range
- compute_damage returns max(0, base - armour)
- to_save_data returns dict with required keys
- from_save_data reconstructs player correctly

### Error message style:

```
FAIL: Brute class not found in student/player_types.py
  Expected: class Brute inheriting from Player
  Found: ImportError — name 'Brute' not found
  Fix: Ensure Brute class is defined and inherits from Player
```

---

## 9) Worksheet Plan for Final Level X

### Objectives (5 bullets):
- Experience the complete adventure built across all levels
- Verify that all implemented classes work together
- Test save/load and encounter in context
- Complete an optional polish task
- Reflect on the full OOP journey

### Keywords and definitions:

| Keyword | Definition |
|---------|------------|
| Integration | Combining multiple classes to create a complete system |
| Playthrough | A complete session of gameplay from start to finish |
| Capstone | A final project that demonstrates accumulated skills |

### UML images needed:
- Full class diagram showing Player → Brute/Scout inheritance + Player has Inventory composition
- Sequence diagram of encounter flow (engine ↔ Player interaction)
- Object diagram showing game state at start

### Step-by-step tasks:

1. Download and extract level_x_final_playthrough folder
2. Open in PyCharm and review your student files
3. Run validate.py — should be PASS (if not, fix issues)
4. Run run_game.py
5. Play through the complete scenario
6. Try save and load commands
7. Complete the encounter
8. Trigger the ending with the signal beacon
9. (Optional) Add a custom message to get_status() that includes player type
10. Reflect: which class was hardest to build? Why?

### Acceptance checklist:
- [ ] validate.py returns PASS
- [ ] Can move between all 5 rooms
- [ ] Can pick up all 8 items
- [ ] Can use keycard to unlock lab_bench
- [ ] Can use crowbar to open supply_chest
- [ ] Can talk to Maintenance Drone
- [ ] Can save and load game state
- [ ] Can complete encounter with Security Bot
- [ ] Can trigger ending with signal beacon

---

## 10) Scope Guardrails for Final Level X

### Explicitly NOT included:

| Excluded | Reason |
|----------|--------|
| New student code | Level X is playthrough only |
| Multiple save slots | Keep save/load simple |
| High score / leaderboard | Unnecessary |
| Timer / real-time events | Complexity |
| Sound / graphics | Text-only |
| Complex puzzle chains | One terminal puzzle is enough |
| Branching story | Linear path only |
| Multiple NPCs | One drone is enough |
| Multiple enemies | One encounter is enough |
| Cheat codes / debug mode | Not pedagogical |

### Hard limits for entire project:

- Maximum 5 rooms
- Maximum 8 items
- Maximum 1 NPC
- Maximum 1 encounter
- Maximum 4 student files
- Maximum ~15 student methods total

---

## Summary

Final Level X is a capstone experience. Students play the game they built. The engine provides rich lore and immersive text, but student code remains small and focused:

- 4 files, ~15 methods
- 2 battle hooks (choose_action, compute_damage)
- 2 save hooks (to_save_data, from_save_data)
- Simple, testable interfaces

Everything else is engine-owned and hidden.
