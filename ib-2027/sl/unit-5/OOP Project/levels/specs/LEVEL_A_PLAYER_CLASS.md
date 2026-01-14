# Level Specification: Level A - Foundation: The Player Class

**Type**: Student builds code  
**Estimated Time**: 2-3 lessons  
**Prerequisites**: Preflight

---

## Overview

Students create their first class: `Player`. This is the foundation that everything else builds on.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Create a class with `__init__` constructor
2. Define instance attributes using `self.`
3. Write methods that operate on instance data
4. Implement defensive programming (health clamping)
5. Return formatted strings from methods

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| `__init__` | The constructor method, called when creating a new object |
| `self` | Reference to the current object instance |
| Instance attribute | A variable that belongs to a specific object |
| Parameter | A value passed into a method |
| Return value | The output a method gives back to its caller |
| Clamping | Restricting a value to stay within a range |

---

## Student Deliverables

### File: `student/player.py`

### Class: `Player`

#### Attributes

| Name | Type | Description |
|------|------|-------------|
| name | str | The player's name |
| health | int | Current health points (100) |
| max_health | int | Maximum health cap (100) |
| armour | int | Damage reduction (2) |
| accuracy | int | Hit chance percentage (85) |

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `__init__` | name: str | None | Create player, set name, and assign all starting stats directly |
| `get_status` | — | str | Return formatted string with name and health |
| `take_damage` | amount: int | None | Reduce health by amount, clamp at 0 |
| `heal` | amount: int | None | Increase health, clamp at max_health |

#### Constraints

- Health must NEVER go below 0
- Health must NEVER exceed max_health
- get_status must include the player's name in the returned string
- All attributes must be set directly in `__init__` (no helper methods needed)

---

## Engine Content for This Level

### Rooms
- Airlock only (1 room)

### Items
- None

### NPCs
- None

### Encounters
- None

### Commands Available
- `look`, `help`, `status`, `quit`

---

## Validator Scope

The validator for Level A checks:

1. **Structure**
   - `Player` class exists
   - `__init__` accepts name parameter
   - All required methods exist

2. **Behaviour**
   - Constructor sets name correctly
   - Constructor sets health=100, max_health=100, armour=2, accuracy=85
   - take_damage reduces health
   - take_damage clamps at 0
   - heal increases health
   - heal clamps at max_health
   - get_status returns string containing name

---

## Reference Baseline

None — this is the first student code level.

---

## Worksheet Focus

- What is a constructor?
- What does `self` mean?
- Why do we clamp values? (defensive programming)
- Reading and understanding the UML diagram

---

## UML Diagram

```
┌─────────────────────────────────┐
│            Player               │
├─────────────────────────────────┤
│ - name: str                     │
│ - health: int                   │
│ - max_health: int               │
│ - armour: int                   │
│ - accuracy: int                 │
├─────────────────────────────────┤
│ + __init__(name: str)           │
│ + get_status(): str             │
│ + take_damage(amount: int)      │
│ + heal(amount: int)             │
└─────────────────────────────────┘
```

---

## Notes for Teachers

- This is students' first real OOP code
- Emphasise the `self.` pattern for attributes
- Direct attribute assignment is the simplest and clearest pattern
- Common mistake: forgetting `self` parameter
- Common mistake: not clamping health correctly
- The validator gives clear feedback — encourage students to read it
