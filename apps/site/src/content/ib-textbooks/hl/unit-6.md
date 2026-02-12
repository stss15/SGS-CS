---
level: hl
unitNumber: 6
unitName: Abstract Data Types
summary: Revise Abstract Data Types with exam-focused coverage of B4.1.2, B4.1.4, B4.1.7, B4.1.5, including exact command-term expectations and applied examples.
subtopics:
  - code: B4.1.2
    title: Linked Lists (Theory)
  - code: B4.1.4
    title: BSTs (Binary Search Trees)
  - code: B4.1.7
    title: Hash Tables
  - code: B4.1.5
    title: Sets
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| abstract data type | A data model defined by behavior, not by one concrete implementation. |
| linked list | A node-based sequence where each node points to the next. |
| binary search tree | A tree where left descendants are smaller and right descendants are larger than the parent. |
| set | A collection of unique elements. |
| hashing | Mapping a key to an index using a hash function. |
| collision | When different keys map to the same hash index. |
| rehashing | Rebuilding a hash structure, usually with larger capacity, to reduce collisions. |
| interface | A contract specifying available operations without fixing implementation details. |

## B4.1.2 Linked Lists (Theory)

### Exam requirement

> **Command term:** Evaluate
>
> Evaluate linked lists.

### Core understanding

In this part of the unit, you need secure understanding of linked lists (theory). Use it to explain data-structure behavior, operations, and implementation trade-offs.

### In real systems

- Compare structures using operation cost and access pattern.
- Separate interface behavior from implementation details.
- Explain storage and update trade-offs in context.

### Worked snapshot

```text
head -> [12|next] -> [25|next] -> [41|null]
```
Linked lists store nodes through references rather than contiguous array positions.

## B4.1.4 BSTs (Binary Search Trees)

### Required response

> **Command term:** Explain
>
> Explain structures and properties of BSTs.

### What this means

For this syllabus point, focus on using bsts (binary search trees) accurately in context. Use it to explain data-structure behavior, operations, and implementation trade-offs. Search behavior depends on data ordering and structure, which affects both correctness and efficiency.

### System context

- Compare structures using operation cost and access pattern.
- Separate interface behavior from implementation details.
- Explain storage and update trade-offs in context.

### Compact example

```python
# Minimal check for BSTs (Binary Search Trees)
for item in sample_data:
    process(item)
```
Use a short trace to confirm expected output for both normal and edge-case inputs.

## B4.1.7 Hash Tables

### Required response

> **Command term:** Apply
>
> Apply hash tables accurately in this unit context.

### What this means

For this syllabus point, focus on using hash tables accurately in context. Use it to explain data-structure behavior, operations, and implementation trade-offs. Hashing maps keys to storage positions; collision handling and rehashing maintain correctness when clashes occur.

### System context

- Compare structures using operation cost and access pattern.
- Separate interface behavior from implementation details.
- Explain storage and update trade-offs in context.

### Compact example

```python
# Minimal check for Hash Tables
for item in sample_data:
    process(item)
```
Use a short trace to confirm expected output for both normal and edge-case inputs.

## B4.1.5 Sets

### Exam requirement

> **Command term:** Construct
>
> Construct and apply sets as an ADT.

### Core understanding

In this part of the unit, you need secure understanding of sets. Use it to explain data-structure behavior, operations, and implementation trade-offs.

### In real systems

- Compare structures using operation cost and access pattern.
- Separate interface behavior from implementation details.
- Explain storage and update trade-offs in context.

### Worked snapshot

```python
# Minimal check for Sets
for item in sample_data:
    process(item)
```
Use a short trace to confirm expected output for both normal and edge-case inputs.

