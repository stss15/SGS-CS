# SYLLABUS_COVERAGE_MAP_B2_B3.md

**Purpose**: Map every B2/B3 syllabus concept to a coverage mode and location in the project.

**Date**: 2026-01-10  
**Status**: FROZEN

---

## Coverage Mode Definitions

| Mode | Definition | Example |
|------|------------|---------|
| **Student Mechanic** | Required student code that the engine calls during gameplay | Player.take_damage() |
| **Contained Puzzle** | Isolated challenge segment; doesn't expand global systems | Stack/Queue terminal |
| **Worksheet-Only** | Taught via worksheet exercises; no engine dependency | 2D array indexing |

---

## B2: Programming Fundamentals

### B2.1 Program Development Fundamentals

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B2.1.1 | Variables (local/global) | Student Mechanic | All levels | Instance attributes throughout |
| B2.1.1 | Data types (int, str, bool, float) | Student Mechanic | All levels | Used in all student code |
| B2.1.1 | Arithmetic operators | Student Mechanic | Level G | compute_damage() calculation |
| B2.1.1 | Boolean operators (and, or, not) | Student Mechanic | Level C, D | Inventory conditions, use_item logic |
| B2.1.1 | Relational operators | Student Mechanic | Level A | Health clamping comparisons |
| B2.1.2 | String concatenation | Student Mechanic | Level A, D | get_status(), use_item() returns |
| B2.1.2 | String slicing | Worksheet-Only | Level D worksheet | Explained, not required in engine |
| B2.1.2 | String methods | Worksheet-Only | Level D worksheet | .lower(), .strip() for validation |
| B2.1.3 | Type conversion | Student Mechanic | Level H | Serialisation to/from dict |

### B2.3 Programming Constructs

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B2.3.1 | Sequence | Student Mechanic | All levels | All method bodies |
| B2.3.2 | Selection (if/elif/else) | Student Mechanic | Level A, C, D | Clamping, capacity, item effects |
| B2.3.3 | Count-controlled loops (for) | Student Mechanic | Level C, P2 | Inventory iteration, log search |
| B2.3.3 | Condition-controlled loops (while) | Worksheet-Only | Level G worksheet | Engine encounter loop shown |
| B2.3.4 | Functions/methods | Student Mechanic | All levels | Core of OOP |
| B2.3.4 | Parameters and return values | Student Mechanic | All levels | All method signatures |
| B2.3.4 | Variable scope | Student Mechanic | All levels | self.attributes vs local vars |

### B2.4 Data Structures

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B2.4.1 | 1D arrays/lists | Student Mechanic | Level C, P1, P2 | Inventory._items, Stack, Queue, logs |
| B2.4.2 | **2D arrays/matrices** | **Worksheet-Only** | Level P2 worksheet | Explained, NOT in engine |
| B2.4.3 | Dictionaries | Student Mechanic | Level B, P2, H | Stats dict, log entries, save data |
| B2.4.4 | Sets | Contained Puzzle | P2 | validate_code() uses set membership |
| B2.4.5 | Stacks (LIFO) | Contained Puzzle | P1 | Stack class, terminal puzzle |
| B2.4.6 | Queues (FIFO) | Contained Puzzle | P1 | Queue class, terminal puzzle |

### B2.5 Algorithms

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B2.5.1 | Linear search | Contained Puzzle | P2 | search_logs() iterates list |
| B2.5.2 | Binary search | Worksheet-Only | P2 worksheet | Mentioned as optimisation |
| B2.5.3 | Bubble sort | Worksheet-Only | P2 worksheet | Shown for comparison only |
| B2.5.4 | Built-in sorting | Contained Puzzle | P2 | sort_logs() uses sorted() |
| B2.5.5 | Algorithm efficiency | Worksheet-Only | P2 worksheet | Big-O introduced conceptually |

### B2.6 Coding Techniques

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B2.6.1 | Defensive programming | Student Mechanic | Level A, C, D | Clamping, capacity checks |
| B2.6.2 | Input validation | Student Mechanic | Level D, F, G, P2 | use_item targets, choice validation, code validation |
| B2.6.3 | Error handling (try/except) | Student Mechanic | Level F, G | Input conversion in choice loops |
| B2.6.4 | File I/O | Student Mechanic | P2 | load_logs_from_file() |
| B2.6.5 | Testing concepts | Worksheet-Only | All level worksheets | Success criteria = test cases |

### B2.7 Complexity (HL Focus)

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B2.7.1 | Big-O notation | Worksheet-Only | P2 worksheet | Conceptual introduction only |
| B2.7.2 | Recursion | **OUT OF SCOPE** | — | Not in core path; optional extension |

---

## B3: Object-Oriented Programming

### B3.1 Single Class Fundamentals

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B3.1.1 | Classes and objects | Student Mechanic | Level A | Player class is first OOP |
| B3.1.2 | Class design (UML) | Worksheet-Only | All worksheets | UML diagrams provided |
| B3.1.3 | Static vs non-static | Student Mechanic | Level C | MAX_CAPACITY class variable |
| B3.1.4 | Constructors (__init__) | Student Mechanic | Level A, C, P1 | All classes have constructors |
| B3.1.5 | Instance attributes | Student Mechanic | All levels | self.name, self.health, etc. |
| B3.1.6 | Methods with parameters | Student Mechanic | All levels | All method definitions |
| B3.1.7 | Encapsulation | Student Mechanic | Level C, P1 | _items protected attribute |
| B3.1.8 | Information hiding | Student Mechanic | Level C | Private _items with accessor methods |
| B3.1.9 | Getters/accessors | Student Mechanic | Level C | list_items(), has_item() |

### B3.2 Multiple Class Fundamentals (HL Focus)

| Topic | Concept | Mode | Location | Notes |
|-------|---------|------|----------|-------|
| B3.2.1 | Inheritance | Student Mechanic | Level B | Brute/Scout extend Player |
| B3.2.2 | super() usage | Student Mechanic | Level B | Subclass constructors |
| B3.2.3 | Method overriding | Student Mechanic | Level B | describe_specialty() |
| B3.2.4 | Polymorphism | Student Mechanic | Level B | Same method, different outputs |
| B3.2.5 | Composition ("has-a") | Student Mechanic | Level C | Player has-a Inventory |
| B3.2.6 | Aggregation | Student Mechanic | Level E micro-lab | Logbook exists independently, attached to Player |
| B3.2.7 | Abstract classes | Worksheet-Only | Preflight worksheet | Concept shown, not required |
| B3.2.8 | Design patterns | Worksheet-Only | Various | Shown in engine examples |

---

## Coverage Summary by Level

| Level | Student Mechanic Concepts | Contained Puzzles | Worksheet-Only Topics |
|-------|--------------------------|-------------------|----------------------|
| Preflight | — | — | OOP mental model, UML reading |
| Level A | Classes, constructors, attributes, methods, clamping | — | Sequence, selection basics |
| Level B | Inheritance, super(), overriding, polymorphism, dicts | — | — |
| Level C | Composition, encapsulation, static var, lists | — | Information hiding + aggregation vs composition contrast |
| P1 (C+) | — | Stack (LIFO), Queue (FIFO) | ADT concept |
| Level D | Conditional logic, string construction | — | String methods |
| P2 | File I/O, set membership | Linear search, sorting (built-in) | 2D arrays, binary search, Big-O |
| Level E | Aggregation (logbook), method integration | — | Engine architecture, code reading |
| Level F | Method hooks, return values, try/except | — | NPC design patterns |
| Level G | Arithmetic, damage formula, try/except | — | While loops (engine demo) |
| Level H | Dict serialisation, class methods | — | Error handling patterns |
| Level I | — | — | Integration, reflection |

---

## Topics Explicitly NOT Covered

| Topic | Reason |
|-------|--------|
| Recursion | HL-only; optional extension pathway |
| GUI programming | Out of scope; text adventure |
| Database operations | Out of scope |
| Network programming | Out of scope |
| Regular expressions | Not required |
| Decorators | Advanced; not essential |
| Multiple inheritance | Complexity; not in IB spec |
| Operator overloading | Optional; not critical |

---

## Validation of Coverage

### B2 Coverage Checklist

- [x] Variables and data types — Student Mechanic
- [x] Operators — Student Mechanic
- [x] String operations — Student Mechanic + Worksheet
- [x] Sequence — Student Mechanic
- [x] Selection — Student Mechanic
- [x] Iteration — Student Mechanic + Worksheet
- [x] Functions/methods — Student Mechanic
- [x] 1D arrays/lists — Student Mechanic
- [x] 2D arrays — **Worksheet-Only** (explicitly NOT mechanic)
- [x] Dictionaries — Student Mechanic
- [x] Sets — Contained Puzzle
- [x] Stacks — Contained Puzzle
- [x] Queues — Contained Puzzle
- [x] Linear search — Contained Puzzle
- [x] Sorting — Contained Puzzle (built-in)
- [x] Defensive programming — Student Mechanic
- [x] File I/O — Student Mechanic
- [x] Error handling — Student Mechanic (input conversion)

### B3 Coverage Checklist

- [x] Classes and objects — Student Mechanic
- [x] UML class diagrams — Worksheet-Only
- [x] Static vs non-static — Student Mechanic
- [x] Constructors — Student Mechanic
- [x] Instance attributes — Student Mechanic
- [x] Methods — Student Mechanic
- [x] Encapsulation — Student Mechanic
- [x] Information hiding — Student Mechanic
- [x] Inheritance — Student Mechanic
- [x] super() — Student Mechanic
- [x] Method overriding — Student Mechanic
- [x] Polymorphism — Student Mechanic
- [x] Composition — Student Mechanic
- [x] Aggregation — Student Mechanic
- [x] Design patterns — Worksheet-Only

**Result**: All required B2/B3 concepts are covered with explicit mode classification.
