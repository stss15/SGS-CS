# COVERAGE_MATRIX_B2_B3_TO_LEVELS.md

**Purpose**: Map IB Computer Science B2/B3 syllabus topics to OOP project levels and activities.

**Date**: 2026-01-10  
**Status**: Complete

---

## How to Read This Matrix

- **✓ Primary**: This level is the main teaching point for this concept
- **○ Reinforced**: This level uses the concept but doesn't teach it as new
- **◇ Demo Only**: Engine demonstrates; students observe (not student-built)
- **— None**: Not covered in this level

---

## B2 Programming Fundamentals Coverage

### B2.1 Variables, Data Types, and Operators

| Syllabus Topic | Code | Preflight | A | B | C | C+ | D | E | F | G | H | I |
|----------------|------|-----------|---|---|---|----|----|---|---|---|---|---|
| Variables (local/global) | B2.1.1 | ✓ | ○ | ○ | ○ | ○ | ○ | — | ○ | ○ | ○ | ○ |
| Data types (int, str, bool, float) | B2.1.1 | ✓ | ○ | ○ | ○ | ○ | ○ | — | ○ | ○ | ○ | ○ |
| Arithmetic operators (+, -, *, /, %) | B2.1.1 | ✓ | ○ | ○ | ○ | ○ | ○ | — | ○ | ✓ | ○ | ○ |
| Boolean operators (and, or, not) | B2.1.1 | ✓ | ○ | ○ | ○ | ○ | ○ | — | ○ | ○ | ○ | ○ |
| Relational operators (<, >, ==, !=) | B2.1.1 | ✓ | ✓ | ○ | ○ | ○ | ○ | — | ○ | ○ | ○ | ○ |
| String concatenation | B2.1.2 | ✓ | ✓ | ○ | ○ | ○ | ✓ | — | ○ | ○ | ○ | ○ |
| String slicing/substrings | B2.1.2 | ○ | — | — | — | — | ○ | — | — | — | — | — |
| String methods (upper, lower, strip) | B2.1.2 | ○ | — | — | — | — | ✓ | — | — | — | — | — |
| Type conversion (int, str, float) | B2.1.1 | ✓ | ○ | — | — | — | ○ | — | — | — | ○ | — |

**Coverage Notes**:
- Preflight introduces all basic Python constructs through classic examples
- Level A reinforces with `get_status()` string construction
- Level D explicitly teaches string methods in `use_item()` return messages
- Level G uses arithmetic in `compute_damage()` calculation

---

### B2.3 Programming Constructs

| Syllabus Topic | Code | Preflight | A | B | C | C+ | D | E | F | G | H | I |
|----------------|------|-----------|---|---|---|----|----|---|---|---|---|---|
| Sequence | B2.3.1 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ○ |
| Selection (if/elif/else) | B2.3.2 | ✓ | ✓ | ○ | ✓ | ○ | ✓ | — | ○ | ✓ | ○ | ○ |
| Count-controlled loops (for) | B2.3.3 | ✓ | — | — | ✓ | ✓ | — | — | — | — | — | — |
| Condition-controlled loops (while) | B2.3.3 | ✓ | — | — | — | ✓ | — | — | — | ◇ | — | — |
| Functions/methods | B2.3.4 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ○ |
| Parameters and return values | B2.3.4 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ○ |
| Variable scope (method-local) | B2.3.4 | ○ | ✓ | ○ | ○ | ○ | ○ | — | ○ | ○ | ○ | ○ |

**Coverage Notes**:
- All levels reinforce sequence, selection, and methods
- Loops shown in list iteration (Inventory, Stack, Queue)
- Engine encounter loop (Level G) demonstrates while-loop pattern
- Students observe loop patterns; focus remains on OOP methods

---

### B2.4 Data Structures

| Syllabus Topic | Code | Preflight | A | B | C | C+ | D | E | F | G | H | I |
|----------------|------|-----------|---|---|---|----|----|---|---|---|---|---|
| 1D arrays/lists | B2.4.1 | ✓ | — | — | ✓ | ✓ | ○ | — | ✓ | ✓ | ✓ | ○ |
| 2D arrays/matrices | B2.4.2 | — | — | — | — | ✓ | — | — | — | — | — | — |
| Dictionaries | B2.4.3 | — | — | ✓ | — | — | — | — | — | — | ✓ | — |
| Stacks (LIFO) | B2.4.4 | — | — | — | — | ✓ | — | — | — | — | — | — |
| Queues (FIFO) | B2.4.5 | — | — | — | — | ✓ | — | — | — | — | — | — |

**Coverage Notes**:
- **Lists**: Inventory._items, Stack._items, Queue._items, options parameters
- **2D Arrays**: Terminal puzzle in Level C+ includes grid access
- **Dictionaries**: `get_starting_stats()` (Level B) and `to_save_data()` (Level H)
- **Stacks/Queues**: Dedicated Level C+ teaches both ADTs

**2D Array Puzzle Detail (Level C+)**:
```
Terminal presents a 3x3 grid:
[[A, B, C],
 [D, E, F],
 [G, H, I]]

Puzzle: "Access grid[1][2] to get the next code"
Student must understand row/column indexing
```

---

### B2.5 Algorithms

| Syllabus Topic | Code | Preflight | A | B | C | C+ | D | E | F | G | H | I |
|----------------|------|-----------|---|---|---|----|----|---|---|---|---|---|
| Linear search | B2.5.1 | — | — | — | ◇ | ◇ | — | — | — | — | — | — |
| Binary search | B2.5.2 | — | — | — | — | — | — | — | — | — | — | — |
| Bubble sort | B2.5.3 | — | — | — | — | — | — | — | — | — | — | — |
| Selection sort | B2.5.4 | — | — | — | — | — | — | — | — | — | — | — |

**Coverage Notes**:
- **Linear search**: Engine demonstrates in `has_item()` implementation
- **Binary search**: Not required for OOP project (optional worksheet mention)
- **Sorting**: Not implemented; engine may sort inventory display alphabetically
- Algorithms unit is covered separately in curriculum; this project focuses on OOP

**Linear Search Demo (Level C)**:
```python
# Worksheet shows this pattern in Inventory context:
def has_item(self, item_id):
    for item in self._items:  # Linear search
        if item == item_id:
            return True
    return False
```

---

## B3 Object-Oriented Programming Coverage

### B3.1 Fundamentals of OOP (Single Class)

| Syllabus Topic | Code | Preflight | A | B | C | C+ | D | E | F | G | H | I |
|----------------|------|-----------|---|---|---|----|----|---|---|---|---|---|
| Classes and objects | B3.1.1 | ✓ | ✓ | ○ | ✓ | ✓ | ○ | — | ○ | ○ | ○ | ○ |
| Class design (UML) | B3.1.2 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ○ |
| Static vs non-static | B3.1.3 | — | — | — | ✓ | — | — | — | — | — | — | — |
| Constructors (__init__) | B3.1.4 | ✓ | ✓ | ✓ | ✓ | ✓ | ○ | — | ○ | ○ | ○ | ○ |
| Instance attributes | B3.1.4 | ✓ | ✓ | ✓ | ✓ | ✓ | ○ | — | ○ | ○ | ○ | ○ |
| Methods with parameters | B3.1.4 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ○ |
| Encapsulation | B3.1.5 | ✓ | — | — | ✓ | ○ | — | — | — | — | — | — |
| Information hiding (_prefix) | B3.1.5 | ○ | — | — | ✓ | ✓ | — | — | — | — | — | — |
| Getters and controlled access | B3.1.5 | ○ | ✓ | ✓ | ✓ | ○ | — | — | — | — | — | — |

**Coverage Notes**:
- **Classes/Objects**: Every level after Preflight uses classes
- **Static Demo**: `Inventory.MAX_CAPACITY = 10` in Level C
- **Encapsulation**: `_items` in Inventory with add/remove/has_item access methods
- **Information Hiding**: Explicitly taught with `_` prefix convention

**Static-ish Demo (Level C)**:
```python
class Inventory:
    MAX_CAPACITY = 10  # Class variable (static-ish)
    
    def __init__(self):
        self._items = []
    
    def add(self, item_id):
        if len(self._items) >= Inventory.MAX_CAPACITY:
            return False  # Capacity reached
        # ... rest of add logic
```

---

### B3.2 Fundamentals of OOP (Multiple Classes) — HL Focus

| Syllabus Topic | Code | Preflight | A | B | C | C+ | D | E | F | G | H | I |
|----------------|------|-----------|---|---|---|----|----|---|---|---|---|---|
| Inheritance | B3.2.1 | ✓ | — | ✓ | — | — | — | — | — | — | — | — |
| super() usage | B3.2.1 | ✓ | — | ✓ | — | — | — | — | — | — | — | — |
| Method overriding | B3.2.2 | — | — | ✓ | — | — | — | — | — | — | — | — |
| Polymorphism | B3.2.2 | — | — | ✓ | — | — | — | — | — | — | — | — |
| Composition ("has-a") | B3.2.4 | — | — | — | ✓ | — | — | — | — | — | — | — |
| Aggregation (distinction) | B3.2.4 | — | — | — | ◇ | — | — | — | — | — | — | — |

**Coverage Notes**:
- **Inheritance**: Level B (Brute/Scout extend Player)
- **Polymorphism**: Engine calls `get_starting_stats()` on any Player subclass
- **Composition**: Player "has-a" Inventory (Level C)
- **Aggregation**: Worksheet explains distinction but not implemented

**Inheritance Demo (Level B)**:
```python
class Brute(Player):  # "is-a" Player
    def get_starting_stats(self):  # Override
        return {"health": 120, "armour": 2, "accuracy": 70}
```

**Composition Demo (Level C)**:
```python
class Player:
    def __init__(self, name):
        self.name = name
        self.inventory = Inventory()  # "has-a" relationship
```

---

## B2/B3 Concept Density by Level

| Level | Primary Concepts Taught | Concept Count |
|-------|------------------------|---------------|
| Preflight | Classes, objects, constructors, methods, inheritance intro | 5 |
| A | Constructor, instance attributes, methods, clamping | 4 |
| B | Inheritance, super(), polymorphism, method overriding | 4 |
| C | Composition, encapsulation, static-ish, list operations | 4 |
| C+ | Stacks, queues, 2D array access, abstract data types | 4 |
| D | Object interaction, string construction, conditional logic | 3 |
| E | Code reading, world structure (engine review) | 1 |
| F | Method hooks, return value contracts | 2 |
| G | Turn-based state, damage formulae, defensive coding | 3 |
| H | Serialisation, file I/O pattern, class methods | 3 |
| I | Integration, reflection | 1 |

**Total**: All major B2/B3 concepts covered across the project.

---

## Syllabus Requirements Not Covered

These topics are **intentionally not covered** in this OOP project:

| Topic | Reason |
|-------|--------|
| Binary search | Covered in algorithms unit; not OOP focused |
| Bubble/selection sort | Covered in algorithms unit; not OOP focused |
| Recursion | Covered separately; complexity not appropriate |
| Linked lists | Beyond scope; covered in HL data structures |
| Trees/graphs | Beyond scope; covered in HL data structures |
| Design patterns (factory, singleton) | HL only; beyond SL scope |

---

## Worksheet Keyword Requirements

Each level worksheet must include these keywords from the matrix:

| Level | Required Keywords |
|-------|-------------------|
| Preflight | class, object, attribute, method, constructor, instance, inheritance, encapsulation |
| A | class, object, attribute, method, constructor, instance, parameter, return, clamping |
| B | inheritance, subclass, superclass, override, polymorphism, super() |
| C | composition, "has-a", encapsulation, information hiding, protected, static, class variable |
| C+ | stack, queue, LIFO, FIFO, abstract data type, 2D array, index |
| D | interaction, state change, conditional, string construction |
| E | engine, architecture, world state, rooms, navigation |
| F | hook, callback, interface, contract |
| G | turn-based, state, formula, defensive coding |
| H | serialisation, persistence, file I/O, class method, round-trip |
| I | integration, capstone, reflection |

---

## Summary

This matrix demonstrates that the OOP project covers:
- **B2.1**: Variables, types, operators, strings ✓
- **B2.3**: Sequence, selection, loops, functions ✓
- **B2.4**: Lists, 2D arrays, dictionaries, stacks, queues ✓
- **B2.5**: Linear search (demo) ✓ | Sorting (not required for OOP)
- **B3.1**: Classes, objects, static, encapsulation ✓
- **B3.2**: Inheritance, polymorphism, composition ✓

The project provides comprehensive B2/B3 coverage appropriate for SL, with clear connections to HL concepts for extension.
