---
level: hl
unitNumber: 3
unitName: Recursive Problem Solving
summary: Revise Recursive Problem Solving with source-bounded coverage of B2.4.4, B2.4.5, and B2.5, focusing on stack behavior, recursive traces, and partition-based sorting logic.
subtopics:
  - code: B2.4.4
    title: Recursion Concepts
  - code: B2.4.5
    title: Constructing and Tracing Recursive Algorithms
  - code: B2.5
    title: Quicksort Trace and Partition Logic
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| recursion | Technique where a function solves a problem by calling itself on smaller input. |
| base case | Condition that stops recursive calls. |
| recursive case | Step that reduces the problem and calls the function again. |
| call stack | Runtime stack of active function calls and local variables. |
| stack frame | One function call context stored on the call stack. |
| winding | Phase where recursive calls are added to the stack. |
| unwinding | Phase where calls return and stack frames are removed. |
| pivot | Chosen reference element used to partition data in quicksort. |
| partition | Rearrangement step that places smaller elements on one side of pivot and larger on the other. |
| divide and conquer | Strategy that splits a problem into smaller subproblems and combines results. |

## B2.4.4 Recursion Concepts

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

A complete explanation defines recursion structure and compares it with iteration.

| Required element | What to explain |
| --- | --- |
| Base case | Why termination is guaranteed |
| Recursive case | How input moves toward base case |
| Memory behavior | Why each call consumes stack space |
| Iteration contrast | Loops often use less call-stack memory |

Recursion is usually clearer for self-similar structures, but it can be less memory-efficient than iterative solutions.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Accurate interpretation |
| --- | --- |
| "Base case is optional if the input is small." | Missing base case eventually causes stack overflow. |
| "All calls share one local variable set." | Each call has an independent stack frame. |
| "Recursion ends at the base case." | Execution still unwinds through every previous frame. |

</div>

### Worked example: factorial call stack

<div class="reader-section-body reader-section-body--example">

```python
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)
```

Trace for `factorial(4)`:

| Phase | Active call | Returned value |
| --- | --- | --- |
| winding | `factorial(4)` -> `factorial(3)` -> `factorial(2)` -> `factorial(1)` |  |
| unwinding | `factorial(1)` returns `1` | `1` |
| unwinding | `factorial(2)` returns `2 * 1` | `2` |
| unwinding | `factorial(3)` returns `3 * 2` | `6` |
| unwinding | `factorial(4)` returns `4 * 6` | `24` |

</div>

## B2.4.5 Constructing and Tracing Recursive Algorithms

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Construct and trace

Construction requires correct recursive structure. Tracing requires state tracking at each call depth.

A practical build checklist:

1. Define function purpose and input.
2. Write a reachable base case.
3. Write one recursive step that reduces problem size.
4. Trace with concrete data before trusting output.

</div>

### Applied in context: binary tree traversal shape

<div class="reader-section-body reader-section-body--apply">

Recursive traversal naturally matches tree structure.

| Traversal | Visit order |
| --- | --- |
| Pre-order | Node, Left, Right |
| In-order | Left, Node, Right |
| Post-order | Left, Right, Node |

In-order traversal on a valid BST returns values in sorted order, which is why recursion is often chosen here.

</div>

### Worked trace: recursive Fibonacci with concrete values

<div class="reader-section-body reader-section-body--example">

```python
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

Trace summary for `fib(5)`:

| Call | Expansion | Result |
| --- | --- | --- |
| `fib(5)` | `fib(4) + fib(3)` | `5` |
| `fib(4)` | `fib(3) + fib(2)` | `3` |
| `fib(3)` | `fib(2) + fib(1)` | `2` |
| `fib(2)` | `fib(1) + fib(0)` | `1` |

The trace shows why naive recursion can repeat work heavily.

</div>

## B2.5 Quicksort Trace and Partition Logic

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Trace

Quicksort uses divide and conquer: choose a pivot, partition around it, then recursively sort each side.

| Step | Purpose |
| --- | --- |
| Choose pivot | Defines partition reference |
| Partition | Moves smaller values left, larger values right |
| Recurse left/right | Repeats until sub-list size is 0 or 1 |

A correct trace emphasizes pivot movement and resulting sub-lists at each recursion level.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

For list ` [16, 13, 4, 6, 22] ` with first-element pivot `16`:

- Values `<16`: `13, 4, 6`
- Pivot: `16`
- Values `>16`: `22`

After first partition, pivot is already in final position relative to whole list.

</div>

### Worked trace: full quicksort on five values

<div class="reader-section-body reader-section-body--example">

Input: `[16, 13, 4, 6, 22]`

| Recursion level | Pivot | Left partition | Right partition |
| --- | --- | --- | --- |
| 0 | 16 | `[13, 4, 6]` | `[22]` |
| 1 (left side) | 13 | `[4, 6]` | `[]` |
| 2 (left-left side) | 4 | `[]` | `[6]` |

Sorted output: `[4, 6, 13, 16, 22]`

```python
def quicksort(values):
    if len(values) <= 1:
        return values
    pivot = values[0]
    left = [v for v in values[1:] if v <= pivot]
    right = [v for v in values[1:] if v > pivot]
    return quicksort(left) + [pivot] + quicksort(right)
```

</div>
