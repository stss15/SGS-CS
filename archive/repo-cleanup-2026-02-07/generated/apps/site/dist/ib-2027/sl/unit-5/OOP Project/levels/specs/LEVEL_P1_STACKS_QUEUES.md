# Level Specification: P1 (Level C+) - Terminal Access: Stacks & Queues

**Type**: Contained puzzle (student builds code)  
**Estimated Time**: 1-2 lessons  
**Prerequisites**: Level C

---

## Overview

Students implement Stack and Queue abstract data types for a contained terminal puzzle. This demonstrates LIFO/FIFO concepts without expanding global mechanics.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Implement a Stack (LIFO) with push/pop/peek
2. Implement a Queue (FIFO) with enqueue/dequeue/front
3. Explain the difference between LIFO and FIFO
4. Use collections.deque for efficient queue operations
5. Handle empty data structure edge cases

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Abstract Data Type (ADT) | A data structure defined by its behaviour, not implementation |
| Stack | LIFO structure — last item added is first removed |
| Queue | FIFO structure — first item added is first removed |
| LIFO | Last In, First Out |
| FIFO | First In, First Out |
| Push/Pop | Add to / remove from a stack |
| Enqueue/Dequeue | Add to / remove from a queue |

---

## Student Deliverables

### File: `student/data_structs.py`

### Class: `Stack`

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `__init__` | — | None | Create empty stack |
| `push` | item | None | Add item to top |
| `pop` | — | item or None | Remove and return top item |
| `peek` | — | item or None | Return top item without removing |
| `is_empty` | — | bool | True if no items |
| `size` | — | int | Number of items |

### Class: `Queue`

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `__init__` | — | None | Create empty queue |
| `enqueue` | item | None | Add item to back |
| `dequeue` | — | item or None | Remove and return front item |
| `front` | — | item or None | Return front item without removing |
| `is_empty` | — | bool | True if no items |
| `size` | — | int | Number of items |

---

## The Puzzle (Engine-Owned)

**Narrative**: The control hub terminal requires processing a sequence of commands.

**Mechanics**:
1. Engine gives student's Stack/Queue a list of "terminal commands"
2. Stack processes them in reverse (like an undo history)
3. Queue processes them in order (like an execution queue)
4. Correct output = door unlocks

**Example**:
- Input: ["POWER", "SCAN", "UNLOCK"]
- Stack output: ["UNLOCK", "SCAN", "POWER"] (reverse)
- Queue output: ["POWER", "SCAN", "UNLOCK"] (same order)

---

## Engine Content for This Level

### Rooms
- Same as Level C (Airlock, Storage Cage)
- Plus: Control Hub preview (terminal puzzle)

### Items
- Same as Level C
- Plus: Power Cell (needed to power terminal)

### New Features
- Terminal puzzle in Control Hub
- `use power_cell on terminal` activates puzzle
- Puzzle calls student's Stack/Queue classes
- Success = passage unlocked

---

## Validator Scope

1. **Structure**
   - Stack class exists with all methods
   - Queue class exists with all methods

2. **Behaviour**
   - Stack follows LIFO: push A, B, C → pop returns C, B, A
   - Queue follows FIFO: enqueue A, B, C → dequeue returns A, B, C
   - Empty pop/dequeue returns None (not error)
   - peek/front returns item without removing
   - size() returns correct count

---

## Reference Baseline

Ships with teacher's completed:
- `player.py` (from A)
- `player_types.py` (from B)
- `inventory.py` (from C)

---

## Worksheet Focus

- What is an ADT?
- Real-world examples of stacks (undo, call stack, plates)
- Real-world examples of queues (printer queue, checkout line)
- Why use deque for queues? (O(1) operations)
- Edge case handling

---

## UML Diagram

```
┌─────────────────────┐  ┌─────────────────────┐
│       Stack         │  │       Queue         │
├─────────────────────┤  ├─────────────────────┤
│ - _items: list      │  │ - _items: deque     │
├─────────────────────┤  ├─────────────────────┤
│ + push(item)        │  │ + enqueue(item)     │
│ + pop(): item       │  │ + dequeue(): item   │
│ + peek(): item      │  │ + front(): item     │
│ + is_empty(): bool  │  │ + is_empty(): bool  │
│ + size(): int       │  │ + size(): int       │
└─────────────────────┘  └─────────────────────┘
```

---

## Notes for Teachers

- This is a "contained puzzle" — doesn't expand global mechanics
- The puzzle unlocks a door, then the classes are not used again
- Emphasise that Stack uses list (append/pop from end)
- Queue should use deque for efficiency (popleft)
- Common mistake: using list for queue (slow popleft)
- Common mistake: raising exceptions instead of returning None
