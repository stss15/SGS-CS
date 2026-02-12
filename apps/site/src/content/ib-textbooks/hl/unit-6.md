---
level: hl
unitNumber: 6
unitName: Abstract Data Types
summary: Revise Abstract Data Types with source-bounded coverage of B4.1.2, B4.1.4, B4.1.7, and B4.1.5, focusing on structural trade-offs, traversal logic, hashing behavior, and set operations.
subtopics:
  - code: B4.1.2
    title: Evaluating Linked Lists
  - code: B4.1.4
    title: Binary Search Trees
  - code: B4.1.7
    title: Hash Tables
  - code: B4.1.5
    title: Sets as an ADT
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| abstract data type (ADT) | Type defined by operations/behavior rather than one concrete implementation. |
| linked list | Sequence of nodes connected by references, not contiguous indexes. |
| node | Structure containing data and one or more references to other nodes. |
| traversal | Systematic visit of every element/node in a structure. |
| binary search tree (BST) | Tree where left descendants are smaller and right descendants are larger than parent. |
| in-order traversal | Left, Node, Right visit order; yields sorted output for a valid BST. |
| hash function | Function mapping a key to an index location. |
| collision | Two different keys map to the same hash index. |
| chaining | Collision strategy where each table slot stores a list of entries. |
| load factor | Ratio of stored elements to table capacity, used to decide rehashing. |

## B4.1.2 Evaluating Linked Lists

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Evaluate

Evaluation requires trade-off judgement, not one-sided praise.

| Criterion | Linked list | Array |
| --- | --- | --- |
| Indexed access | Slow (`O(n)`) | Fast (`O(1)`) |
| Insert near head | Fast (`O(1)` after pointer access) | Often slow due to shifting |
| Memory layout | Dynamic node allocation | Contiguous block |
| Cache locality | Usually weaker | Usually stronger |

Linked lists are preferable when frequent insertion/deletion is more important than random index access.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

For a music queue with frequent insertions at start and middle, linked representation can reduce data shifting.

For a marks table that needs rapid `marks[500]` style access, array/list indexing is usually a better fit.

An evaluation is complete only after matching structure behavior to use case behavior.

</div>

### Worked example: insertion cost comparison

<div class="reader-section-body reader-section-body--example">

Insert new element at position 2 in a 100,000-element collection.

| Structure | Main work required |
| --- | --- |
| Linked list | Repoint two references after reaching insertion position |
| Array | Shift nearly all subsequent elements one position |

When insertion frequency is high and indexed lookup is low, linked lists can be more suitable despite slower random access.

</div>

## B4.1.4 Binary Search Trees

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

A BST explanation should include ordering rule and traversal outcomes.

BST rule: `left < node < right`

| Traversal | Order | Common use |
| --- | --- | --- |
| In-order | Left, Node, Right | Sorted output |
| Pre-order | Node, Left, Right | Prefix tree serialization |
| Post-order | Left, Right, Node | Safe delete-style processing |

Balanced trees enable efficient search paths; skewed trees can degrade toward linear behavior.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

- A BST is not automatically balanced.
- In-order output is sorted only if BST property is maintained.
- Insertion order directly affects tree shape and search depth.

</div>

### Worked trace: build and traverse a BST

<div class="reader-section-body reader-section-body--example">

Insert values: `[10, 5, 15, 3, 7]`

Tree shape:

```text
      10
     /  \
    5    15
   / \
  3   7
```

| Traversal type | Sequence |
| --- | --- |
| In-order | `3, 5, 7, 10, 15` |
| Pre-order | `10, 5, 3, 7, 15` |
| Post-order | `3, 7, 5, 15, 10` |

</div>

## B4.1.7 Hash Tables

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Hash tables map keys to indexes for fast average lookup.

| Mechanism | Explanation |
| --- | --- |
| Hashing | Compute index from key |
| Collision handling | Resolve same-index conflicts (for example chaining or probing) |
| Rehashing | Resize and redistribute entries when load factor grows too high |

Performance depends on distribution quality of hash function and collision strategy.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

A user-session store may require near-constant-time lookup by session ID.

Hashing supports this pattern well, but with heavy collisions performance drops. Monitoring load factor and resizing at thresholds keeps lookup times stable.

</div>

### Worked example: modulo hashing with collisions

<div class="reader-section-body reader-section-body--example">

Use table size `10` and hash `index = key % 10` for keys `42, 32, 52, 17`.

| Key | Index | Result |
| --- | --- | --- |
| 42 | 2 | slot 2 |
| 32 | 2 | collision at slot 2 |
| 52 | 2 | collision at slot 2 |
| 17 | 7 | slot 7 |

With chaining, slot `2` stores linked entries `[42, 32, 52]`.

```python
keys = [42, 32, 52, 17]
indices = [k % 10 for k in keys]  # [2, 2, 2, 7]
```

</div>

## B4.1.5 Sets as an ADT

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Construct and apply

Set construction requires unique-element collections and correct operation use.

| Operation | Meaning |
| --- | --- |
| Union | Elements in either set |
| Intersection | Elements in both sets |
| Difference | Elements in first set but not second |

Sets are useful when uniqueness and membership checks are more important than order.

</div>

### The domain matrix

<div class="reader-section-body reader-section-body--apply">

| Scenario | Useful set operation |
| --- | --- |
| Students in either robotics or coding club | Union |
| Students in both clubs | Intersection |
| Students in robotics but not coding | Difference |

</div>

### Worked example: concrete set operations in Python

<div class="reader-section-body reader-section-body--example">

```python
robotics = {"Ava", "Noah", "Liam", "Mia"}
coding = {"Mia", "Liam", "Zoe"}

both = robotics.intersection(coding)
either = robotics.union(coding)
only_robotics = robotics.difference(coding)
```

| Expression | Result |
| --- | --- |
| `both` | `{ 'Liam', 'Mia' }` |
| `either` | `{ 'Ava', 'Noah', 'Liam', 'Mia', 'Zoe' }` |
| `only_robotics` | `{ 'Ava', 'Noah' }` |

</div>
