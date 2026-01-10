# Level Specification: Level C - Carrying Capacity: Inventory

**Type**: Student builds code  
**Estimated Time**: 2-3 lessons  
**Prerequisites**: Level B

---

## Overview

Students create an Inventory class and integrate it with Player. This demonstrates composition ("has-a" relationship), encapsulation, and static class variables.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Implement composition (Player "has-a" Inventory)
2. Use a class variable (MAX_CAPACITY) as a static constraint
3. Apply encapsulation with protected attributes (_items)
4. Write accessor methods (list_items, has_item)
5. Understand the difference between composition and inheritance

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Composition | A "has-a" relationship where one object contains another |
| Encapsulation | Bundling data with methods that operate on it, hiding internals |
| Information hiding | Preventing direct access to internal data (_underscore convention) |
| Class variable | A variable shared by all instances of a class (static-ish) |
| Accessor method | A method that provides controlled access to internal data |
| Mutator method | A method that modifies internal data |

---

## Student Deliverables

### File: `student/inventory.py`

### Class: `Inventory`

#### Class Variable

| Name | Type | Value | Description |
|------|------|-------|-------------|
| MAX_CAPACITY | int | 10 | Maximum items the inventory can hold |

#### Attributes

| Name | Type | Description |
|------|------|-------------|
| _items | list | Protected list of item IDs |

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `__init__` | — | None | Create empty _items list |
| `add` | item_id: str | bool | Add item if not duplicate and not full |
| `remove` | item_id: str | bool | Remove item if present |
| `list_items` | — | list | Return copy of _items |
| `has_item` | item_id: str | bool | Check if item exists |
| `is_full` | — | bool | Check if at MAX_CAPACITY |
| `count` | — | int | Return number of items |

### Integration: Update Player.__init__

Players must now create an Inventory in their constructor:
```
self.inventory = Inventory()
```

---

## Engine Content for This Level

### Rooms
- Airlock, Storage Cage (2 rooms)

### Items
- Keycard, Crowbar, Torch (3 items)

### NPCs
- None

### Encounters
- None

### New Commands
- `take <item>` — pick up an item
- `inventory` — show carried items

---

## Validator Scope

1. **Structure**
   - Inventory class exists
   - MAX_CAPACITY class variable exists and is positive
   - All required methods exist

2. **Behaviour**
   - Empty inventory has count() == 0
   - add() returns True on success
   - add() returns False for duplicate
   - add() returns False when full
   - has_item() returns True for existing
   - list_items() returns a list (copy, not reference)
   - remove() returns True and removes item
   - Player has inventory attribute

---

## Reference Baseline

Ships with teacher's completed:
- `player.py` (from Level A)
- `player_types.py` (from Level B)

---

## Worksheet Focus

- Composition vs inheritance ("has-a" vs "is-a")
- Why encapsulation? (protect internal state)
- What is a class variable? (shared across instances)
- Why return a copy from list_items()? (protect encapsulation)

---

## UML Diagram

```
┌────────────────────┐
│       Player       │
├────────────────────┤
│ - inventory: Inventory │◆────┐
└────────────────────┘        │
                              │
                    ┌─────────┴────────┐
                    │    Inventory     │
                    ├──────────────────┤
                    │ + MAX_CAPACITY: 10│
                    │ - _items: list   │
                    ├──────────────────┤
                    │ + add(str): bool │
                    │ + remove(str): bool│
                    │ + list_items(): list│
                    │ + has_item(str): bool│
                    │ + is_full(): bool│
                    │ + count(): int   │
                    └──────────────────┘
```

Note: ◆ represents composition ("filled diamond" = strong ownership)

---

## Notes for Teachers

- Emphasise the difference between composition and inheritance
- Show why _underscore convention matters (no enforcement in Python)
- Discuss why MAX_CAPACITY is a class variable, not instance
- Common mistake: forgetting to return a copy from list_items()
- Common mistake: not checking capacity before adding
