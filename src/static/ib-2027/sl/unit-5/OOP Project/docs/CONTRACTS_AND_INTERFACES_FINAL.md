# CONTRACTS_AND_INTERFACES_FINAL.md

**Purpose**: Define exact class names, method signatures, and expected behaviours for all student-facing code. This is the stable interface surface that validators check.

**Date**: 2026-01-10  
**Status**: FROZEN

---

## Overview

Student code lives in `/student/` folder. Engine imports from this location.

The engine depends on these **contract-critical interfaces**. They must exist and behave as specified.

---

## 1) Player Class

**File**: `student/player.py` (or student-organised equivalent)  
**Class**: `Player`

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| name | str | Player's name |
| health | int | Current health (0 to max) |
| max_health | int | Maximum health |
| armour | int | Damage reduction |
| accuracy | int | Hit chance percentage |
| inventory | Inventory | Composition — Player has-a Inventory |

### Methods

| Method | Signature | Returns | Behaviour |
|--------|-----------|---------|-----------|
| `__init__` | `(self, name: str)` | None | Set name, set starting stats directly, create Inventory |
| `get_status` | `(self)` | str | Returns formatted status string with name and health |
| `take_damage` | `(self, amount: int)` | None | Reduce health by amount, clamp at 0 |
| `heal` | `(self, amount: int)` | None | Increase health, clamp at max_health |
| `use_item` | `(self, item_id: str, target: str)` | str | Return outcome message; engine applies item effects in full-game levels |
| `respond_to_npc` | `(self, options: list)` | int | Return index of chosen dialogue option (0 to len-1) |
| `choose_action` | `(self, options: list)` | int | Return index of chosen combat action (0 to len-1) |
| `compute_damage` | `(self, base: int, armour: int)` | int | Return `max(0, base - armour)` |
| `to_save_data` | `(self)` | dict | Return serialisable dict with required keys |
| `from_save_data` | `(cls, data: dict)` | Player | Class method: reconstruct Player from dict |

### to_save_data() Return Format

```python
{
    "name": str,
    "player_type": str,  # "player", "brute", or "scout"
    "health": int,
    "max_health": int,
    "armour": int,
    "accuracy": int,
    "inventory": list  # list of item_id strings
}
```

---

## 2) Player Subclasses

**File**: `student/player_types.py` (or student-organised equivalent)

### Brute Class

| Aspect | Value |
|--------|-------|
| Inherits from | Player |
| Overrides | Constructor (`__init__`) and `describe_specialty()` |
| Stats | health=120, max_health=120, armour=3, accuracy=70 |

### Scout Class

| Aspect | Value |
|--------|-------|
| Inherits from | Player |
| Overrides | Constructor (`__init__`) and `describe_specialty()` |
| Stats | health=80, max_health=80, armour=1, accuracy=95 |

---

## 3) Inventory Class

**File**: `student/inventory.py` (or student-organised equivalent)  
**Class**: `Inventory`

### Class Variable

| Variable | Type | Value |
|----------|------|-------|
| MAX_CAPACITY | int | 10 |

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| _items | list | Internal list of item_id strings (protected) |

### Methods

| Method | Signature | Returns | Behaviour |
|--------|-----------|---------|-----------|
| `__init__` | `(self)` | None | Create empty `_items` list |
| `add` | `(self, item_id: str)` | bool | Add if not duplicate and under capacity; return success |
| `remove` | `(self, item_id: str)` | bool | Remove if present; return success |
| `list_items` | `(self)` | list | Return copy of `_items` |
| `has_item` | `(self, item_id: str)` | bool | Return True if item_id in `_items` |
| `consume` | `(self, item_id: str)` | bool | Remove item if consumable*; return success |
| `is_full` | `(self)` | bool | Return True if len >= MAX_CAPACITY |
| `count` | `(self)` | int | Return number of items |

*Note: `consume` should always remove and return True if item exists; engine determines consumability.

*Note: In Level D (standalone test), `use_item` is responsible for healing and consuming. In full-game levels, the engine handles effects and your method returns narrative text only.

---

## 4) Stack Class

**File**: `student/data_structs.py` (or student-organised equivalent)  
**Class**: `Stack`

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| _items | list | Internal list for LIFO storage |

### Methods

| Method | Signature | Returns | Behaviour |
|--------|-----------|---------|-----------|
| `__init__` | `(self)` | None | Create empty list |
| `push` | `(self, item)` | None | Append item to end |
| `pop` | `(self)` | item or None | Remove and return last item; None if empty |
| `peek` | `(self)` | item or None | Return last item without removing; None if empty |
| `is_empty` | `(self)` | bool | Return True if no items |
| `size` | `(self)` | int | Return number of items |

---

## 5) Queue Class

**File**: `student/data_structs.py` (or student-organised equivalent)  
**Class**: `Queue`

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| _items | deque | Internal deque for FIFO storage |

### Methods

| Method | Signature | Returns | Behaviour |
|--------|-----------|---------|-----------|
| `__init__` | `(self)` | None | Create empty deque |
| `enqueue` | `(self, item)` | None | Append item to end |
| `dequeue` | `(self)` | item or None | Remove and return first item; None if empty |
| `front` | `(self)` | item or None | Return first item without removing; None if empty |
| `is_empty` | `(self)` | bool | Return True if no items |
| `size` | `(self)` | int | Return number of items |

---

## 6) Log Search Functions

**File**: `student/log_search.py` (or student-organised equivalent)

### search_logs Function

| Aspect | Value |
|--------|-------|
| Signature | `search_logs(logs: list, author: str) -> list` |
| Behaviour | Return all log entries where `log["author"] == author` |
| Returns | List of matching log dicts |

### sort_logs Function

| Aspect | Value |
|--------|-------|
| Signature | `sort_logs(logs: list, key: str, descending: bool = False) -> list` |
| Behaviour | Return logs sorted by `log[key]`; use `sorted()` with key function |
| Returns | Sorted list of log dicts |

### Log Entry Format

```python
{
    "timestamp": int,       # Unix timestamp or simple int
    "author": str,          # Author name
    "content": str,         # Log message
    "corrupted": bool       # True if corrupted/unreadable
}
```

---

## 7) Code Validator Function

**File**: `student/log_search.py` (or separate file)

### validate_code Function

| Aspect | Value |
|--------|-------|
| Signature | `validate_code(code: str, used_codes: set) -> bool` |
| Behaviour | Return True if code is not in used_codes |
| Returns | bool |

---

## 8) Engine-Owned Interfaces (NOT Student-Built)

These are provided by the engine. Students do NOT implement these.

| Component | Engine Responsibility |
|-----------|----------------------|
| Room class | World model, exits, contents |
| Item class | Item definitions, effects |
| NPC class | Dialogue scripts |
| Enemy class | Stats, behaviour patterns |
| CommandParser | Input tokenisation, routing |
| WorldLoader | Load JSON content files |
| EncounterLoop | Run combat sequence |
| SaveLoadManager | File I/O, error handling |

---

## 9) Validation Priority

Validators check in this order:

### Structure Checks (Block on Failure)

1. Can import student modules
2. Player class exists
3. Brute class exists and inherits Player
4. Scout class exists and inherits Player
5. Inventory class exists
6. Stack class exists
7. Queue class exists
8. Required functions exist (search_logs, sort_logs, validate_code)

### Behaviour Checks (Report All Failures)

1. Player constructor works with name
2. Brute and Scout return different stats
3. describe_specialty returns a string for Brute and Scout
4. take_damage clamps at 0
5. heal clamps at max_health
6. Inventory add/remove/has_item behave correctly
7. Inventory respects MAX_CAPACITY
8. Stack push/pop/peek follow LIFO
9. Queue enqueue/dequeue/front follow FIFO
10. search_logs returns correct matches
11. sort_logs returns correctly ordered list
12. validate_code returns correct boolean
13. choose_action returns int in valid range
14. compute_damage returns max(0, base - armour)
15. to_save_data returns dict with required keys
16. from_save_data reconstructs player correctly

---

## 10) Method Count Summary

| File | Methods/Functions | Cumulative |
|------|-------------------|------------|
| player.py | 10 methods | 10 |
| player_types.py | 4 methods (overrides) | 14 |
| inventory.py | 8 methods + 1 class var | 21 |
| data_structs.py | 12 methods (Stack + Queue) | 33 |
| log_search.py | 3 functions | 36 |

**Total**: ~36 callable items across student code

This remains manageable when spread across ~12 levels (~3 new items per level average).

---

## 11) Import Structure

Engine will import like this:

```python
from student.player import Player
from student.player_types import Brute, Scout
from student.inventory import Inventory
from student.data_structs import Stack, Queue
from student.log_search import search_logs, sort_logs, validate_code
```

Students may organise differently as long as these imports work.
