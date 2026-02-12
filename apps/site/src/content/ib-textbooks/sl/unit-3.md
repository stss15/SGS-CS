---
level: sl
unitNumber: 3
unitName: Data Structures & Logic
summary: Revise Data Structures & Logic with exam-focused coverage of B2.2.1, B2.2.2, B2.2.3, B2.2.4, including exact command-term expectations and applied examples.
subtopics:
  - code: B2.2.1
    title: Static vs Dynamic Structures
  - code: B2.2.2
    title: Arrays & Lists
  - code: B2.2.3
    title: The Stack (LIFO)
  - code: B2.2.4
    title: The Queue (FIFO)
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Data structure | A way of organising and storing data so it can be accessed and modified efficiently. |
| Static data structure | A structure with a fixed size decided at compile time — memory is allocated in one contiguous block (e.g. array). |
| Dynamic data structure | A structure that can grow or shrink at runtime — memory is allocated as needed using pointers (e.g. linked list). |
| Array | A fixed-size, ordered collection of elements of the same type, stored in contiguous memory and accessed by index. |
| List | A dynamic, ordered collection that can grow, shrink, and hold mixed types (Python's default sequence). |
| Index | A zero-based integer position used to access an element in an array or list. |
| 2D array | An array of arrays — effectively a grid with rows and columns, accessed as `data[row][col]`. |
| Stack | A last-in, first-out (LIFO) data structure where items are added and removed from the same end (the top). |
| Queue | A first-in, first-out (FIFO) data structure where items are added at the rear and removed from the front. |
| Push | Add an item to the top of a stack. |
| Pop | Remove and return the item from the top of a stack. |
| Peek | View the top item of a stack (or front of a queue) without removing it. |
| Enqueue | Add an item to the rear of a queue. |
| Dequeue | Remove and return the item from the front of a queue. |
| Overflow | Attempting to add to a data structure that is already full (applies to static/bounded structures). |
| Underflow | Attempting to remove from a data structure that is already empty. |


## B2.2.1 Static vs Dynamic Structures

**Command term:** Compare

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **compare** static and dynamic data structures. This means you must identify the advantages and disadvantages of each, explain how they differ in memory allocation, and justify which is appropriate for a given scenario — not just define them.

| Feature | Static (e.g. Array) | Dynamic (e.g. Linked List / Python List) |
| --- | --- | --- |
| **Size** | Fixed at creation — cannot grow or shrink | Can grow and shrink during execution |
| **Memory allocation** | One contiguous block, reserved in advance | Allocated on demand, may be scattered in memory |
| **Access speed** | **Direct access** — jump to any index in O(1) | Sequential access for linked structures — O(n) to find an item |
| **Memory efficiency** | May waste space if not fully used | Uses only what it needs (plus pointer overhead) |
| **Overflow risk** | Yes — cannot exceed declared size | No — can keep growing (until system memory runs out) |
| **Use case** | Known, fixed data sets (days of the week, sensor readings per hour) | Unknown, changing data sets (user sign-ups, shopping baskets) |

</div>

### Choosing the right structure

<div class="reader-section-body reader-section-body--apply">

The exam often presents a scenario and asks you to justify a choice. Here is how to reason through it:

**Scenario:** A weather station records exactly 24 temperature readings per day (one per hour).
- ✅ **Static array** — the size is known (always 24), direct access by hour index is useful (`temps[14]` = 2pm reading), and no resizing is needed.

**Scenario:** An online shop tracks items in a customer's basket during a browsing session.
- ✅ **Dynamic list** — the number of items is unknown (could be 0 to 100+), items are added and removed frequently, and the structure must grow as the customer shops.

**Exam tip:** The command term is *Compare*, so you must discuss **both** options in your answer. A table with side-by-side features is the safest format — it makes the comparison explicit and hard to miss.

</div>


## B2.2.2 Arrays & Lists

**Command term:** Construct

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** programs that apply arrays and lists. You need to declare, populate, traverse, and manipulate 1D and 2D arrays, including accessing elements by index and iterating with loops.

**1D list essentials:**

```python
# Creating and accessing
scores = [45, 72, 88, 63, 91]
print(scores[0])     # 45 (first element)
print(scores[-1])    # 91 (last element)
print(len(scores))   # 5

# Modifying
scores[2] = 90       # change the third element
scores.append(78)    # add to the end → [45, 72, 90, 63, 91, 78]

# Traversing
for s in scores:
    print(s)
```

</div>

### Working with 2D arrays

<div class="reader-section-body reader-section-body--example">

A 2D array is a list of lists — think of it as a table with rows and columns. Access elements using `data[row][col]`.

```python
# A 3x3 grid of student marks (3 students, 3 subjects)
marks = [
    [72, 85, 63],   # Student 0: Maths, Science, English
    [91, 78, 88],   # Student 1
    [55, 60, 70]    # Student 2
]

# Access a single cell
print(marks[1][2])   # 88 (Student 1, English)

# Traverse the entire grid
for row in range(len(marks)):
    for col in range(len(marks[row])):
        print(f"Student {row}, Subject {col}: {marks[row][col]}")
```

**Finding the highest mark in the grid:**

```python
highest = marks[0][0]
for row in marks:
    for mark in row:
        if mark > highest:
            highest = mark
print(f"Highest mark: {highest}")  # Output: 91
```

**Memory trick for 2D indices:** think "RC Cola" — **R**ow first, **C**olumn second. `marks[row][col]`.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Reality |
| --- | --- |
| "A list and an array are the same thing" | Conceptually similar, but arrays are fixed-size and type-homogeneous in most languages. Python's `list` is dynamic and allows mixed types. In exams, treat Python lists as arrays unless asked about resizing. |
| "I can access `marks[3]` in a 3-element list" | Valid indices are 0, 1, 2. Accessing index 3 causes an `IndexError` (runtime error). |
| "`marks[1][2]` means column 1, row 2" | No — it means **row 1, column 2**. Rows always come first. |
| "Appending to a list is instant and free" | Appending is O(1) on average, but the list may need to resize its internal memory — this is hidden from you in Python but matters at the conceptual level. |

</div>


## B2.2.3 The Stack (LIFO)

**Command term:** Explain

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **explain** the concept of a stack. You need to describe the LIFO principle, name the core operations (push, pop, peek, isEmpty), and connect stacks to real-world applications — but you do not need to implement one from scratch at SL level.

A stack is like a pile of plates: you add to the top, and you take from the top. The last item placed on the stack is the first one removed — **Last In, First Out**.

| Operation | What it does | Effect on the stack |
| --- | --- | --- |
| `push(item)` | Adds an item to the **top** | Stack grows by one |
| `pop()` | Removes and returns the **top** item | Stack shrinks by one |
| `peek()` | Returns the top item **without removing** it | Stack unchanged |
| `isEmpty()` | Returns `True` if the stack has no items | Stack unchanged |

**Real-world applications:**
- **Undo button** — each action is pushed onto a stack; pressing Undo pops the most recent action
- **Browser back button** — each visited page is pushed; pressing Back pops the current page
- **Function call stack** — when a function calls another function, the return address is pushed; when the function returns, it pops back

</div>

### Worked trace: a stack in action

<div class="reader-section-body reader-section-body--example">

Trace the following sequence of operations. The stack starts empty.

| Operation | Stack state (top → bottom) | Returned value |
| --- | --- | --- |
| `push("A")` | `[A]` | — |
| `push("B")` | `[B, A]` | — |
| `push("C")` | `[C, B, A]` | — |
| `pop()` | `[B, A]` | `"C"` |
| `peek()` | `[B, A]` | `"B"` (not removed) |
| `push("D")` | `[D, B, A]` | — |
| `pop()` | `[B, A]` | `"D"` |
| `pop()` | `[A]` | `"B"` |

```python
# Python implementation using a list
stack = []

stack.append("A")     # push
stack.append("B")     # push
stack.append("C")     # push

top = stack.pop()     # returns "C"
print(stack[-1])      # peek → "B"

stack.append("D")     # push
stack.pop()           # returns "D"
stack.pop()           # returns "B"
```

**Exam tip:** When tracing stack operations, always draw the stack vertically with the top at the top. Mark each push with a ↓ arrow and each pop with a ↑ arrow. This prevents the most common error: accidentally removing from the wrong end.

</div>


## B2.2.4 The Queue (FIFO)

**Command term:** Explain

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **explain** the concept of a queue. You need to describe the FIFO principle, name the core operations (enqueue, dequeue, front, isEmpty), and connect queues to real-world applications.

A queue is like a line of people waiting: the first person to join is the first person to be served — **First In, First Out**. Items are added at the **rear** and removed from the **front**.

| Operation | What it does | Effect on the queue |
| --- | --- | --- |
| `enqueue(item)` | Adds an item to the **rear** | Queue grows by one |
| `dequeue()` | Removes and returns the item at the **front** | Queue shrinks by one |
| `front()` | Returns the front item **without removing** it | Queue unchanged |
| `isEmpty()` | Returns `True` if the queue has no items | Queue unchanged |

**Real-world applications:**
- **Print queue** — documents are printed in the order they were sent
- **Keyboard buffer** — keystrokes are processed in the order they were typed
- **Customer service** — calls are answered in arrival order

</div>

### Worked trace: a queue in action

<div class="reader-section-body reader-section-body--example">

Trace the following sequence. The queue starts empty.

| Operation | Queue state (front ← rear) | Returned value |
| --- | --- | --- |
| `enqueue("P1")` | `[P1]` | — |
| `enqueue("P2")` | `[P1, P2]` | — |
| `enqueue("P3")` | `[P1, P2, P3]` | — |
| `dequeue()` | `[P2, P3]` | `"P1"` |
| `enqueue("P4")` | `[P2, P3, P4]` | — |
| `dequeue()` | `[P3, P4]` | `"P2"` |
| `front()` | `[P3, P4]` | `"P3"` (not removed) |

```python
# Python implementation using a list
from collections import deque
queue = deque()

queue.append("P1")     # enqueue
queue.append("P2")     # enqueue
queue.append("P3")     # enqueue

first = queue.popleft() # dequeue → "P1"
queue.append("P4")      # enqueue
queue.popleft()          # dequeue → "P2"
print(queue[0])          # front → "P3"
```

</div>

### Stack vs Queue — when to use which

<div class="reader-section-body reader-section-body--apply">

The exam may present a scenario and ask you to justify whether a stack or queue is more appropriate:

| Scenario | Best structure | Reasoning |
| --- | --- | --- |
| Undo history in a text editor | **Stack** | You want to reverse the *most recent* action first (LIFO) |
| Patients waiting in A&E by arrival time | **Queue** | Patients should be seen in the order they arrived (FIFO) |
| Matching opening and closing brackets | **Stack** | The most recently opened bracket must be closed first |
| Buffering network packets for sequential processing | **Queue** | Packets should be processed in the order they arrived |
| Call stack during recursive function calls | **Stack** | The most deeply nested call must return before its caller |
| Event handling in a GUI click queue | **Queue** | Clicks should be processed in the order they occurred |

**Exam tip:** The command term for both B2.2.3 and B2.2.4 is *Explain*. This means you must give a reason for *why* the structure works, not just state what it does. For example: "A stack is used for the undo feature **because** the most recent action must be reversed first, which matches the LIFO principle."

</div>
