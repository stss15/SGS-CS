# Level Specification: Level B - Specialisation: Brute & Scout

**Type**: Student builds code  
**Estimated Time**: 2-3 lessons  
**Prerequisites**: Level A

---

## Overview

Students create subclasses that inherit from Player and override the `get_starting_stats()` method. This demonstrates inheritance and polymorphism.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Create a subclass that inherits from a parent class
2. Override a method in a subclass
3. Understand how polymorphism works (same interface, different behaviour)
4. Use `super()` to call parent class methods
5. Explain why inheritance is useful for code reuse

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Inheritance | A class deriving from another class, gaining its attributes and methods |
| Subclass | A class that inherits from another (also called child class) |
| Parent class | The class being inherited from (also called superclass) |
| Override | Replacing a parent's method with a new implementation in the subclass |
| Polymorphism | Same method name produces different behaviour based on object type |
| `super()` | Reference to the parent class, used to call parent methods |

---

## Student Deliverables

### File: `student/player_types.py`

### Class: `Brute(Player)`

| Aspect | Value |
|--------|-------|
| Inherits from | Player |
| Overrides | get_starting_stats() |

**get_starting_stats() must return:**

```
{
    "health": 120,
    "max_health": 120,
    "armour": 3,
    "accuracy": 70
}
```

### Class: `Scout(Player)`

| Aspect | Value |
|--------|-------|
| Inherits from | Player |
| Overrides | get_starting_stats() |

**get_starting_stats() must return:**

```
{
    "health": 80,
    "max_health": 80,
    "armour": 1,
    "accuracy": 95
}
```

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
- Engine calls get_starting_stats() on whichever type is chosen
- Same interface, different results = polymorphism demo

---

## Validator Scope

The validator for Level B checks:

1. **Structure**
   - `Brute` class exists and inherits from `Player`
   - `Scout` class exists and inherits from `Player`
   - Both classes have get_starting_stats() method

2. **Behaviour**
   - Brute's stats differ from base Player
   - Scout's stats differ from base Player
   - Brute and Scout have different stats from each other
   - Creating Brute("Test") works and has correct health
   - Creating Scout("Test") works and has correct accuracy

---

## Reference Baseline

This level ships with the teacher's completed `player.py` from Level A.

Students only need to create `player_types.py` with Brute and Scout.

---

## Worksheet Focus

- What is inheritance and why use it?
- The "is-a" relationship (Brute IS-A Player)
- What does overriding mean?
- How does the engine use polymorphism? (calls same method, gets different stats)
- When to use super()

---

## UML Diagram

```
         ┌─────────────────┐
         │     Player      │
         ├─────────────────┤
         │ + get_starting_ │
         │   stats(): dict │
         └────────┬────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────┴───────┐   ┌───────┴───────┐
│     Brute     │   │     Scout     │
├───────────────┤   ├───────────────┤
│ + get_starting│   │ + get_starting│
│   _stats()    │   │   _stats()    │
│   [override]  │   │   [override]  │
└───────────────┘   └───────────────┘
```

---

## Notes for Teachers

- This is the first inheritance lesson
- Emphasise the `(Player)` syntax for inheritance
- Show how the engine calls the method without knowing which subclass it is
- Common mistake: forgetting to import Player
- Common mistake: forgetting parentheses in class definition
- Brute = high HP/armour, low accuracy (tank archetype)
- Scout = low HP/armour, high accuracy (precision archetype)
