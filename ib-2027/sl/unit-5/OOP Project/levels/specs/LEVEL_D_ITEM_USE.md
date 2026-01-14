# Level Specification: Level D - Making Things Happen: Item Use

**Type**: Student builds code  
**Estimated Time**: 2-3 lessons  
**Prerequisites**: P1 (Level C+)

---

## Overview

Students implement item interaction through `use_item()` and `consume()` methods. This teaches conditional logic, string manipulation, and method integration.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Implement conditional logic for different item behaviours
2. Return descriptive strings based on outcomes
3. Integrate item use with healing (calling self.heal())
4. Handle edge cases (item not found, invalid target)
5. Mark consumable items as used

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Conditional logic | Using if/elif/else to choose between actions |
| String construction | Building output strings with concatenation or f-strings |
| Method integration | Calling other methods from within a method |
| Consumable | An item that is removed after use |
| Return value | The string result that describes what happened |

---

## Student Deliverables

### Addition to: `student/player.py`

#### New Method: `use_item`

| Aspect | Value |
|--------|-------|
| Signature | `use_item(self, item_id: str, target: str) -> str` |
| Purpose | Use an item on a target, return outcome message |

**Behaviour Requirements**:
- Check if item is in inventory
- If not found: return "You don't have '<item_id>'."
- Handle specific items:
  - `keycard` on door → unlock message
  - `crowbar` on chest → open message
  - `med_patch` on self → heal 20, consume, return heal message
  - `torch` anywhere → light message
  - Other → generic "not sure how to use" message

### Addition to: `student/inventory.py`

#### New Method: `consume`

| Aspect | Value |
|--------|-------|
| Signature | `consume(self, item_id: str) -> bool` |
| Purpose | Remove a consumable item |
| Behaviour | Same as remove() — caller determines consumability |

---

## Engine Content for This Level

### Rooms
- Airlock, Storage Cage, Lab Bench (3 rooms)

### Items
- Previous: Keycard, Crowbar, Torch
- New: Med Patch, Access Code Note

### New Features
- `use <item>` command
- `use <item> on <target>` command
- Locked door (needs keycard)
- Locked chest (needs crowbar)
- Healing from med patch

---

## Validator Scope

1. **Structure**
   - use_item method exists on Player
   - consume method exists on Inventory

2. **Behaviour**
   - use_item returns string
   - use_item on invalid item returns error message
   - Med patch heals and is consumed
   - consume removes item and returns True
   - consume on non-existent returns False

---

## Reference Baseline

Ships with teacher's completed:
- `player.py` (from A, without use_item)
- `player_types.py` (from B)
- `inventory.py` (from C, without consume)
- `data_structs.py` (from P1)

---

## Worksheet Focus

- Conditional logic patterns (if/elif/else)
- String formatting options (f-strings vs concatenation)
- Method calling chains (use_item → heal, use_item → consume)
- Return values as communication

---

## Example Behaviour

```
# Player has med_patch in inventory
result = player.use_item("med_patch", "self")
# Health increases by 20
# med_patch is removed from inventory
# result = "You apply the med patch. +20 HP"

# Player has keycard, using on security_door
result = player.use_item("keycard", "security_door")
# result = "You swipe the keycard. The lock clicks open."
# (engine handles the actual unlocking)
```

---

## UML Diagram

```
┌────────────────────────────────────┐
│              Player                │
├────────────────────────────────────┤
│ + use_item(item_id, target): str   │←── NEW
└────────────────────────────────────┘

┌────────────────────────────────────┐
│            Inventory               │
├────────────────────────────────────┤
│ + consume(item_id): bool           │←── NEW
└────────────────────────────────────┘
```

---

## Notes for Teachers

- This level has more conditional logic than previous
- Emphasise returning meaningful strings
- The engine handles actual state changes (door opening)
- Student code just returns what happened
- Common mistake: not checking if item exists first
- Common mistake: forgetting to call self.heal() for med items
