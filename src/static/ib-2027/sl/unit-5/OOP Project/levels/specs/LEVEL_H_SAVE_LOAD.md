# Level Specification: Level H - Checkpoints: Save & Load

**Type**: Student builds code  
**Estimated Time**: 2-3 lessons  
**Prerequisites**: Level G

---

## Overview

Students implement serialisation hooks for save/load. The engine handles file I/O; students convert player state to/from dictionaries.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Serialise object state to a dictionary
2. Deserialise a dictionary back into an object
3. Understand class methods (@classmethod)
4. Work with nested data structures
5. Appreciate the separation between data and file I/O

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Serialisation | Converting an object to a storable format |
| Deserialisation | Reconstructing an object from stored data |
| JSON | A text-based data format (engine uses this) |
| Class method | A method that operates on the class, not an instance |
| @classmethod | Decorator to define a class method in Python |
| Round-trip | Saving then loading should produce equivalent state |

---

## Student Deliverables

### Addition to: `student/player.py`

#### Method: `to_save_data`

| Aspect | Value |
|--------|-------|
| Signature | `to_save_data(self) -> dict` |
| Purpose | Convert player state to a dictionary |
| Returns | Dict with all data needed to restore player |

**Required keys**:
- `name` (str)
- `player_type` (str: "player", "brute", or "scout")
- `health` (int)
- `max_health` (int)
- `armour` (int)
- `accuracy` (int)
- `inventory` (list of item_id strings)

#### Class Method: `from_save_data`

| Aspect | Value |
|--------|-------|
| Signature | `from_save_data(cls, data: dict) -> Player` |
| Purpose | Reconstruct a player from saved data |
| Returns | A new Player instance with restored state |

**Behaviour**:
- Create new player with saved name
- Restore all stats from dict
- Restore inventory items
- Return the reconstructed player

---

## Engine Content for This Level

### Rooms
- All 10 rooms

### Items
- 12 items (adds more weapons/healing)

### NPCs
- M-Unit 7, Aria

### Encounters
- Sentry Droid, Repair Bot (2 encounters)

### New Commands
- `save` — save game to file
- `load` — load saved game

---

## Validator Scope

1. **Structure**
   - to_save_data method exists
   - from_save_data class method exists

2. **Behaviour**
   - to_save_data returns dict with required keys
   - from_save_data creates valid player
   - Round-trip: save → load produces same state
   - Inventory is correctly serialised and restored

---

## Reference Baseline

Ships with teacher's completed all Level G code.

---

## Worksheet Focus

- What is serialisation? (object → data)
- What is deserialisation? (data → object)
- Why use a dict? (JSON compatible)
- Class methods: when and why
- Round-trip verification

---

## Example Behaviour

```python
# Saving
player = Brute("Alice")
player.health = 85
player.inventory.add("keycard")

data = player.to_save_data()
# Returns:
# {
#     "name": "Alice",
#     "player_type": "brute",
#     "health": 85,
#     "max_health": 120,
#     "armour": 3,
#     "accuracy": 70,
#     "inventory": ["keycard"]
# }

# Engine saves this dict to JSON file

# Loading
loaded_data = {"name": "Alice", ...}  # From JSON file
player = Brute.from_save_data(loaded_data)
# player.name == "Alice"
# player.health == 85
# player.inventory.has_item("keycard") == True
```

---

## UML Diagram

```
┌────────────────────────────────────────┐
│               Player                   │
├────────────────────────────────────────┤
│ + to_save_data(): dict                 │←── NEW (instance)
│ + from_save_data(cls, data): Player    │←── NEW (classmethod)
└────────────────────────────────────────┘
         ↑
         │ called by
         │
┌────────┴──────────────┐
│  Engine SaveLoadManager│
│                       │
│  - Handles file I/O   │
│  - JSON encoding      │
│  - Error handling     │
└───────────────────────┘
```

---

## Notes for Teachers

- Engine handles ALL file I/O and error handling
- Students just convert to/from dict
- Emphasise @classmethod syntax and `cls` parameter
- from_save_data creates NEW instance, doesn't modify existing
- Subclasses (Brute, Scout) should override to set correct player_type
- Common mistake: forgetting to include inventory
- Common mistake: not using cls in from_save_data
