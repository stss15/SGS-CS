# Level Specification: Level B - Specialisation: Brute & Scout

**Type**: Student builds code  
**Estimated Time**: 2-3 lessons  
**Prerequisites**: Level A

---

## Overview

Students create subclasses that inherit from Player and customize attributes in their constructor. This demonstrates inheritance and the standard pattern of "call parent constructor, then customize."

---

## Learning Objectives

By the end of this level, students will be able to:
1. Create a subclass that inherits from a parent class
2. Call the parent constructor using `super().__init__()`
3. Override attributes after calling the parent constructor
4. Understand how polymorphism works (same interface, different behaviour)
5. Explain why inheritance is useful for code reuse

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Inheritance | A class deriving from another class, gaining its attributes and methods |
| Subclass | A class that inherits from another (also called child class) |
| Parent class | The class being inherited from (also called superclass) |
| `super()` | Reference to the parent class, used to call parent methods |
| Polymorphism | Same method name produces different behaviour based on object type |
| Constructor chaining | Calling the parent constructor before adding subclass-specific setup |

---

## Student Deliverables

### File: `student/player_types.py`

### Class: `Brute(Player)`

| Aspect | Value |
|--------|-------|
| Inherits from | Player |
| Pattern | Call `super().__init__(name)`, then override stats |

**Constructor must:**
1. Call `super().__init__(name)` to set up the base Player
2. Override attributes:
   - `health = 120`
   - `max_health = 120`
   - `armour = 3`
   - `accuracy = 70`

### Class: `Scout(Player)`

| Aspect | Value |
|--------|-------|
| Inherits from | Player |
| Pattern | Call `super().__init__(name)`, then override stats |

**Constructor must:**
1. Call `super().__init__(name)` to set up the base Player
2. Override attributes:
   - `health = 80`
   - `max_health = 80`
   - `armour = 1`
   - `accuracy = 95`

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

### New Features
- Character type selection at game start
- All Player methods (take_damage, heal, etc.) work automatically on subclasses
- Same interface, different starting stats = polymorphism demo

---

## Validator Scope

The validator for Level B checks:

1. **Structure**
   - `Brute` class exists and inherits from `Player`
   - `Scout` class exists and inherits from `Player`
   - Both classes can be instantiated with a name

2. **Behaviour**
   - Brute has correct stats (health=120, armour=3, accuracy=70)
   - Scout has correct stats (health=80, armour=1, accuracy=95)
   - Brute and Scout have different stats from each other
   - Inherited methods (take_damage, heal) work correctly
   - Name is stored correctly via parent constructor

---

## Reference Baseline

This level ships with the teacher's completed `player.py` from Level A.

Students only need to create `player_types.py` with Brute and Scout.

---

## Worksheet Focus

- What is inheritance and why use it?
- The "is-a" relationship (Brute IS-A Player)
- Why call `super().__init__()` first? (reuse parent setup)
- How do inherited methods work? (take_damage works without reimplementing)
- When to override attributes vs methods

---

## UML Diagram

```
         ┌─────────────────┐
         │     Player      │
         ├─────────────────┤
         │ + __init__(name)│
         │ + get_status()  │
         │ + take_damage() │
         │ + heal()        │
         └────────┬────────┘
                  │
                  │ inherits from
        ┌─────────┴─────────┐
        │                   │
┌───────┴───────┐   ┌───────┴───────┐
│     Brute     │   │     Scout     │
├───────────────┤   ├───────────────┤
│ + __init__()  │   │ + __init__()  │
│   [calls      │   │   [calls      │
│    super()]   │   │    super()]   │
└───────────────┘   └───────────────┘
```

---

## Notes for Teachers

- This is the first inheritance lesson
- Emphasise the `(Player)` syntax for inheritance
- The pattern: `super().__init__()` first, then customize
- Show how inherited methods work without reimplementation
- Common mistake: forgetting to import Player
- Common mistake: forgetting to call `super().__init__(name)`
- Brute = high HP/armour, low accuracy (tank archetype)
- Scout = low HP/armour, high accuracy (precision archetype)
