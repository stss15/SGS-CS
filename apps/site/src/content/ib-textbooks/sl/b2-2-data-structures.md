---
level: sl
unitNumber: 32
unitName: Data Structures
summary: Static and dynamic data structures, arrays, lists, stacks, and queues — how data is organised, stored, and accessed in programs.
subtopics:
  - code: B2.2.1
    title: Static and dynamic data structures
  - code: B2.2.2
    title: Arrays and lists
  - code: B2.2.3
    title: Stacks
  - code: B2.2.4
    title: Queues
sourcePolicy: ib_content_md_first
---

## B2.2.1 Static and dynamic data structures

A <span data-def="A way of organising and storing data so it can be accessed and modified efficiently.">data structure</span> is a way of organising data so it can be accessed and modified efficiently. The choice of data structure affects both the performance and the clarity of a program. The IB distinguishes between two categories.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Static data structure</p>
  <p class="ib-textbook-defn__body">A structure whose size is fixed when it is created and cannot change during execution. Memory is allocated as a single contiguous block. Example: a fixed-size array.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Dynamic data structure</p>
  <p class="ib-textbook-defn__body">A structure that can grow or shrink during execution as data is added or removed. Memory is allocated on demand and may not be contiguous. Examples: linked lists, Python lists.</p>
</div>

### Comparison

| Feature | Static | Dynamic |
|---------|--------|---------|
| Size | Fixed at creation | Grows and shrinks as needed |
| Memory allocation | One contiguous block | Allocated on demand |
| Memory efficiency | May waste space if not full | Uses only what is needed (plus pointer overhead) |
| Access speed | Fast — direct index access | May be slower (depends on structure) |
| Insertion/deletion | Slow — elements may need shifting | Can be fast (e.g. linked list insertion) |
| Predictability | Memory use is predictable | Memory use varies at runtime |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Python note</p>
  <p class="ib-textbook-note__body">Python's built-in <code>list</code> is technically a dynamic array — it resizes automatically. In the IB context, treat Python lists as dynamic structures and fixed-size arrays (as found in Java or C) as static structures.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.2.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Static structures have a fixed size set at creation; dynamic structures resize during execution.</li>
      <li>Static structures offer fast direct access but may waste memory; dynamic structures are flexible but carry overhead.</li>
      <li>Choose based on whether the data size is known in advance and whether fast insertion/deletion is needed.</li>
    </ul>
  </div>
</div>


## B2.2.2 Arrays and lists

### Arrays

An <span data-def="A fixed-size, ordered collection of elements of the same data type, stored in contiguous memory locations and accessed by a zero-based index.">array</span> is an ordered collection of elements of the same type, stored in contiguous memory. Each element is accessed by its index, starting from 0. Arrays have a fixed size — once created, you cannot add or remove elements.

In many languages (Java, C++), arrays are declared with a fixed length:

```
// Pseudocode
DECLARE scores : ARRAY[5] OF INTEGER
scores[0] ← 85
scores[1] ← 92
```

### Lists (Python)

In Python, the `list` type serves as a dynamic array. Lists can hold mixed types, grow and shrink, and support a wide range of operations:

```python
scores = [85, 92, 78, 95, 88]
scores.append(91)        # add to end → [85, 92, 78, 95, 88, 91]
scores.insert(2, 100)    # insert at index 2
scores.remove(78)        # remove first occurrence of 78
scores.pop()             # remove and return last element
```

### Common list operations

| Operation | Python syntax | Description |
|-----------|--------------|-------------|
| Access element | `lst[i]` | Get element at index `i` |
| Update element | `lst[i] = val` | Set element at index `i` |
| Append | `lst.append(val)` | Add element to end |
| Insert | `lst.insert(i, val)` | Insert at index `i` |
| Remove | `lst.remove(val)` | Remove first occurrence |
| Pop | `lst.pop()` | Remove and return last element |
| Length | `len(lst)` | Number of elements |
| Sort | `lst.sort()` | Sort in ascending order |
| Search | `val in lst` | Returns `True` if found |

### Two-dimensional arrays

A <span data-def="An array of arrays, forming a grid with rows and columns. Accessed using two indices: one for the row and one for the column.">2D array</span> stores data in rows and columns, like a table or grid:

```python
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(grid[1][2])  # 6 — row 1, column 2
```

To traverse a 2D array, use nested loops:

```python
for row in range(len(grid)):
    for col in range(len(grid[row])):
        print(grid[row][col], end=" ")
    print()
```

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.2.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Arrays are fixed-size, same-type collections accessed by index (starting at 0).</li>
      <li>Python lists are dynamic and support append, insert, remove, pop, sort, and search.</li>
      <li>2D arrays store grid-like data and are accessed with two indices: <code>[row][col]</code>.</li>
    </ul>
  </div>
</div>


## B2.2.3 The stack

A <span data-def="A last-in, first-out (LIFO) data structure where items are added and removed from the same end, called the top.">stack</span> is a data structure that follows the **last-in, first-out (LIFO)** principle. The most recently added item is the first to be removed — like a stack of plates where you always take from the top.

### Stack operations

| Operation | Description |
|-----------|-------------|
| **Push** | Add an item to the top of the stack |
| **Pop** | Remove and return the item from the top |
| **Peek** | View the top item without removing it |
| **isEmpty** | Check whether the stack is empty |
| **isFull** | Check whether the stack is full (for bounded stacks) |

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body"><strong>Overflow</strong> occurs when you try to push onto a full stack. <strong>Underflow</strong> occurs when you try to pop from an empty stack. Always check before performing these operations.</p>
</div>

### Implementing a stack in Python

```python
stack = []

# Push
stack.append("A")
stack.append("B")
stack.append("C")
print(stack)  # ["A", "B", "C"]

# Peek
print(stack[-1])  # "C" — top of stack

# Pop
top = stack.pop()
print(top)    # "C"
print(stack)  # ["A", "B"]
```

### Real-world uses of stacks

- **Undo functionality** — each action is pushed onto a stack; pressing undo pops the most recent action.
- **Browser back button** — visited pages are pushed onto a stack; pressing back pops the most recent page.
- **Function call stack** — when a function calls another function, the current state is pushed onto the call stack and restored when the called function returns.
- **Expression evaluation** — compilers use stacks to evaluate mathematical expressions and check bracket matching.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing stack operations</p>
  <div class="ib-textbook-worked__body">
    <table>
      <tr><th>Operation</th><th>Stack (top → right)</th><th>Returned</th></tr>
      <tr><td>push(10)</td><td>[10]</td><td>—</td></tr>
      <tr><td>push(20)</td><td>[10, 20]</td><td>—</td></tr>
      <tr><td>push(30)</td><td>[10, 20, 30]</td><td>—</td></tr>
      <tr><td>pop()</td><td>[10, 20]</td><td>30</td></tr>
      <tr><td>peek()</td><td>[10, 20]</td><td>20</td></tr>
      <tr><td>pop()</td><td>[10]</td><td>20</td></tr>
      <tr><td>pop()</td><td>[]</td><td>10</td></tr>
      <tr><td>pop()</td><td>[] — UNDERFLOW</td><td>Error</td></tr>
    </table>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.2.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A stack follows LIFO: the last item added is the first removed.</li>
      <li>Core operations: push (add), pop (remove), peek (view top), isEmpty, isFull.</li>
      <li>Overflow = pushing onto a full stack; underflow = popping from an empty stack.</li>
      <li>Stacks are used for undo systems, browser history, function calls, and expression evaluation.</li>
    </ul>
  </div>
</div>


## B2.2.4 The queue

A <span data-def="A first-in, first-out (FIFO) data structure where items are added at the rear and removed from the front.">queue</span> is a data structure that follows the **first-in, first-out (FIFO)** principle. The first item added is the first to be removed — like a queue of people waiting in line.

### Queue operations

| Operation | Description |
|-----------|-------------|
| **Enqueue** | Add an item to the rear of the queue |
| **Dequeue** | Remove and return the item from the front |
| **Peek** / **Front** | View the front item without removing it |
| **isEmpty** | Check whether the queue is empty |
| **isFull** | Check whether the queue is full (for bounded queues) |

### Implementing a queue in Python

```python
from collections import deque

queue = deque()

# Enqueue
queue.append("A")
queue.append("B")
queue.append("C")
print(queue)  # deque(["A", "B", "C"])

# Peek
print(queue[0])  # "A" — front of queue

# Dequeue
front = queue.popleft()
print(front)   # "A"
print(queue)   # deque(["B", "C"])
```

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why deque?</p>
  <p class="ib-textbook-note__body">Python's regular <code>list</code> can be used as a queue with <code>append()</code> and <code>pop(0)</code>, but <code>pop(0)</code> is slow because it shifts all remaining elements. <code>collections.deque</code> provides efficient operations at both ends.</p>
</div>

### Real-world uses of queues

- **Print queues** — documents are printed in the order they are submitted.
- **CPU scheduling** — processes wait in a ready queue for their turn to execute (round-robin scheduling uses a queue).
- **Message queues** — systems process incoming messages in order.
- **Breadth-first search** — graph traversal algorithms use a queue to explore nodes level by level.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing queue operations</p>
  <div class="ib-textbook-worked__body">
    <table>
      <tr><th>Operation</th><th>Queue (front → left)</th><th>Returned</th></tr>
      <tr><td>enqueue("X")</td><td>[X]</td><td>—</td></tr>
      <tr><td>enqueue("Y")</td><td>[X, Y]</td><td>—</td></tr>
      <tr><td>enqueue("Z")</td><td>[X, Y, Z]</td><td>—</td></tr>
      <tr><td>dequeue()</td><td>[Y, Z]</td><td>X</td></tr>
      <tr><td>enqueue("W")</td><td>[Y, Z, W]</td><td>—</td></tr>
      <tr><td>dequeue()</td><td>[Z, W]</td><td>Y</td></tr>
      <tr><td>peek()</td><td>[Z, W]</td><td>Z</td></tr>
    </table>
  </div>
</div>

### Stack vs queue comparison

| Feature | Stack (LIFO) | Queue (FIFO) |
|---------|-------------|-------------|
| Add | Push (top) | Enqueue (rear) |
| Remove | Pop (top) | Dequeue (front) |
| Order | Last in, first out | First in, first out |
| Analogy | Stack of plates | Queue of people |
| Use case | Undo, backtracking | Scheduling, buffering |

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.2.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A queue follows FIFO: the first item added is the first removed.</li>
      <li>Core operations: enqueue (add to rear), dequeue (remove from front), peek, isEmpty.</li>
      <li>Queues are used for print spooling, CPU scheduling, message processing, and breadth-first search.</li>
      <li>Stacks and queues differ in ordering: LIFO vs FIFO.</li>
    </ul>
  </div>
</div>
