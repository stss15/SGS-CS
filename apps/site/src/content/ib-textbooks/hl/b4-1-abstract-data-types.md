---
level: hl
unitNumber: 32
unitName: Fundamentals of Abstract Data Types
summary: HL extension — abstract data types, linked lists (singly, doubly, circular), binary search trees, sets, and hash tables with collision resolution.
subtopics:
  - code: B4.1.1
    title: Properties and purpose of ADTs
  - code: B4.1.2
    title: Evaluating linked lists
  - code: B4.1.3
    title: Constructing linked lists
  - code: B4.1.4
    title: Binary search trees
  - code: B4.1.5
    title: Sets as an ADT
  - code: B4.1.6
    title: Core principles of ADTs
sourcePolicy: ib_content_md_first
---

## B4.1.1 Properties and purpose of abstract data types

An <span data-def="A data type defined by its behaviour (the operations it supports) rather than by its implementation. Users interact with the ADT through its interface without needing to know how it works internally.">abstract data type (ADT)</span> is a theoretical model of a data structure defined by what it *does*, not how it does it. An ADT specifies:

- the **data** it stores,
- the **operations** it supports (e.g., insert, delete, search),
- the **rules** governing those operations (e.g., LIFO for a stack).

The actual implementation — whether the data is stored in an array, a linked structure, or a tree — is hidden from the user.

### Interface vs implementation

The **interface** is what operations are available. The **implementation** is how those operations are carried out. This separation is central to ADTs.

| Concept | Meaning | Example |
|---|---|---|
| Interface | What operations exist and what they do | A stack supports `push`, `pop`, `peek`, `is_empty` |
| Implementation | How those operations work internally | A stack could be backed by an array or a linked list |

The same ADT can have multiple implementations. A queue, for example, can be implemented with an array (circular buffer) or a linked list. The user interacts with the same operations regardless.

### Why ADTs matter

- **Abstraction** — users focus on *what* the data structure does, not *how*. This simplifies program design.
- **Encapsulation** — internal data is accessed only through defined operations, preventing invalid states.
- **Modularity** — the implementation can be changed without affecting code that uses the ADT.
- **Reusability** — a well-defined ADT can be used across different programs and contexts.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Confusing interface with implementation. The interface is <em>what</em> operations are available; the implementation is <em>how</em> those operations are carried out. An ADT defines the interface — the implementation is a separate decision.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B4.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>An ADT is defined by its operations and behaviour, not its implementation.</li>
      <li>The interface (what) is separated from the implementation (how).</li>
      <li>ADTs promote abstraction, encapsulation, modularity, and reusability.</li>
      <li>The same ADT can have multiple valid implementations.</li>
    </ul>
  </div>
</div>


## B4.1.2 Evaluating linked lists

A <span data-def="A data structure consisting of a sequence of nodes, where each node contains data and a reference (pointer) to the next node. Unlike arrays, elements are not stored in contiguous memory.">linked list</span> is a sequence of <span data-def="A basic unit of a data structure containing data and one or more references (pointers) to other nodes.">nodes</span> connected by <span data-def="A variable that stores the memory address of another variable or node, used to link elements in dynamic data structures.">pointers</span>. Each node holds data and a reference to the next node (and sometimes the previous node). The first node is the **head**; the last node's pointer is `None` (null), marking the end.

### Types of linked lists

**Singly linked list** — each node has one pointer, pointing to the next node. Traversal is forward-only.

```text
head → [A | →] → [B | →] → [C | →] → None
```

**Doubly linked list** — each node has two pointers: one to the next node and one to the previous. Traversal can go forward or backward.

```text
None ← [A | ↔] ↔ [B | ↔] ↔ [C | ↔] → None
```

**Circular linked list** — the last node points back to the head instead of `None`, forming a loop. Can be singly or doubly linked.

```text
head → [A | →] → [B | →] → [C | →] → (back to head)
```

### Linked lists vs arrays

| Criterion | Linked list | Array |
|---|---|---|
| Access by index | O(n) — must traverse from head | O(1) — direct access |
| Insert at head | O(1) — repoint head | O(n) — shift all elements |
| Insert in middle | O(1) after finding position | O(n) — shift subsequent elements |
| Memory layout | Scattered (dynamic allocation) | Contiguous block |
| Size flexibility | Dynamic — grows and shrinks freely | Fixed size (or costly resizing) |
| Memory overhead | Extra space for pointers in each node | No pointer overhead |

### When to use linked lists

Linked lists are preferable when:
- frequent insertions and deletions occur (especially at the start or middle),
- the size of the collection is unpredictable,
- indexed access is not required.

Arrays are better when:
- fast random access by index is needed,
- the size is known in advance,
- cache performance matters (contiguous memory).

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Evaluation requires trade-offs</p>
  <p class="ib-textbook-note__body">The IB command term "evaluate" requires you to weigh advantages and disadvantages against a specific use case. Stating that linked lists are "better" or "worse" without context is insufficient — you must explain <em>why</em> a linked list is or is not appropriate for the given scenario.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B4.1.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Linked lists store elements in nodes connected by pointers, not contiguous memory.</li>
      <li>Three types: singly linked, doubly linked, and circular.</li>
      <li>Strengths: efficient insertion/deletion, dynamic size. Weaknesses: no indexed access, pointer overhead.</li>
      <li>Choose linked lists over arrays when insertion/deletion frequency outweighs the need for random access.</li>
    </ul>
  </div>
</div>


## B4.1.3 Constructing linked lists

### Node and linked list classes

A linked list is built from two classes: a `Node` class (holding data and pointers) and a `LinkedList` class (managing the head pointer and operations).

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
```

### Traversal

To visit every node, start at the head and follow each `next` pointer until reaching `None`:

```python
def print_list(self):
    current = self.head
    while current is not None:
        print(current.data, end=" -> ")
        current = current.next
    print("None")
```

### Insertion

**At the beginning** — create a new node, point it to the current head, update head:

```python
def insert_at_beginning(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
```

**At the end** — traverse to the last node, set its `next` to the new node:

```python
def insert_at_end(self, data):
    new_node = Node(data)
    if self.head is None:
        self.head = new_node
        return
    current = self.head
    while current.next is not None:
        current = current.next
    current.next = new_node
```

**After a specific value** — find the target node, insert the new node after it:

```python
def insert_after(self, target_data, data):
    current = self.head
    while current is not None:
        if current.data == target_data:
            new_node = Node(data)
            new_node.next = current.next
            current.next = new_node
            return
        current = current.next
    print(f"Node with data {target_data} not found.")
```

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">When inserting in the middle, you must set the new node's <code>next</code> pointer <strong>before</strong> updating the existing node's pointer. If you update the existing pointer first, you lose the reference to the rest of the list.</p>
</div>

### Deletion

Deletion must handle three cases: removing the head, removing a middle/end node, and the node not being found.

```python
def delete_node(self, data):
    current = self.head
    prev = None

    # Case 1: deleting the head
    if current is not None and current.data == data:
        self.head = current.next
        return

    # Search for the node, tracking the previous node
    while current is not None and current.data != data:
        prev = current
        current = current.next

    # Case 3: node not found
    if current is None:
        print(f"Node with data {data} not found.")
        return

    # Case 2: unlink the node
    prev.next = current.next
```

### Search

```python
def search(self, key):
    current = self.head
    while current is not None:
        if current.data == key:
            return True
        current = current.next
    return False
```

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Building and modifying a linked list</p>
  <div class="ib-textbook-worked__body">
    <pre><code>ll = LinkedList()
ll.insert_at_end("A")
ll.insert_at_end("B")
ll.insert_at_end("C")
ll.print_list()          # A -> B -> C -> None

ll.insert_at_beginning("Z")
ll.print_list()          # Z -> A -> B -> C -> None

ll.insert_after("B", "X")
ll.print_list()          # Z -> A -> B -> X -> C -> None

ll.delete_node("B")
ll.print_list()          # Z -> A -> X -> C -> None

print(ll.search("X"))   # True
print(ll.search("B"))   # False</code></pre>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B4.1.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A linked list is built from <code>Node</code> objects (data + pointer) managed by a <code>LinkedList</code> class (head pointer + operations).</li>
      <li>Traversal follows <code>next</code> pointers from head to <code>None</code>.</li>
      <li>Insertion: at beginning (O(1)), at end (O(n)), after a value (O(n) to find, O(1) to insert).</li>
      <li>Deletion: handle head, middle/end, and not-found cases. Always update pointers in the correct order.</li>
    </ul>
  </div>
</div>


## B4.1.4 Binary search trees

A <span data-def="A tree data structure where each node has at most two children, and for every node, all values in the left subtree are less than the node and all values in the right subtree are greater.">binary search tree (BST)</span> organises data in a hierarchical structure with one strict rule: for any node, all values in its left subtree are **less than** the node, and all values in its right subtree are **greater than** the node.

### Terminology

| Term | Meaning |
|---|---|
| Root | The topmost node — the starting point for all operations |
| Parent | A node with one or two children below it |
| Child | A node directly beneath a parent |
| Leaf | A node with no children (at the "bottom" of the tree) |
| Subtree | A node and all its descendants, forming a smaller tree |

### Insertion

New values are inserted by comparing them to existing nodes, moving left if smaller and right if larger, until an empty position is found.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Building a BST from a sequence</p>
  <div class="ib-textbook-worked__body">
    <p>Insert values in order: <code>[10, 5, 15, 3, 7, 12, 16]</code></p>
    <pre><code>        10
       /  \
      5    15
     / \   / \
    3   7 12  16</code></pre>
    <table>
      <tr><th>Value</th><th>Comparison path</th><th>Position</th></tr>
      <tr><td>10</td><td>Empty tree</td><td>Root</td></tr>
      <tr><td>5</td><td>5 &lt; 10 → left</td><td>Left child of 10</td></tr>
      <tr><td>15</td><td>15 &gt; 10 → right</td><td>Right child of 10</td></tr>
      <tr><td>3</td><td>3 &lt; 10 → left, 3 &lt; 5 → left</td><td>Left child of 5</td></tr>
      <tr><td>7</td><td>7 &lt; 10 → left, 7 &gt; 5 → right</td><td>Right child of 5</td></tr>
      <tr><td>12</td><td>12 &gt; 10 → right, 12 &lt; 15 → left</td><td>Left child of 15</td></tr>
      <tr><td>16</td><td>16 &gt; 10 → right, 16 &gt; 15 → right</td><td>Right child of 15</td></tr>
    </table>
    <p><strong>Note:</strong> insertion order affects tree shape. The same values in a different order produce a different tree structure.</p>
  </div>
</div>

### Searching

To search for a value, start at the root and compare: move left if the target is smaller, right if larger. If you reach `None`, the value is not in the tree.

In a balanced BST, search is O(log n) — each comparison eliminates half the remaining nodes. In a skewed tree (e.g., values inserted in sorted order), search degrades to O(n).

### Traversals

BSTs support three depth-first traversals. Each visits every node exactly once, in a different order:

| Traversal | Order | Mnemonic | Use case |
|---|---|---|---|
| In-order | Left, Node, Right | LNR | Produces sorted output |
| Pre-order | Node, Left, Right | NLR | Copying/serialising the tree |
| Post-order | Left, Right, Node | LRN | Safely deleting nodes (children first) |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing all three traversals</p>
  <div class="ib-textbook-worked__body">
    <p>Using the BST built above:</p>
    <pre><code>        10
       /  \
      5    15
     / \   / \
    3   7 12  16</code></pre>
    <table>
      <tr><th>Traversal</th><th>Output sequence</th></tr>
      <tr><td>In-order (LNR)</td><td>3, 5, 7, 10, 12, 15, 16</td></tr>
      <tr><td>Pre-order (NLR)</td><td>10, 5, 3, 7, 15, 12, 16</td></tr>
      <tr><td>Post-order (LRN)</td><td>3, 7, 5, 12, 16, 15, 10</td></tr>
    </table>
    <p>In-order traversal produces the values in ascending sorted order — this is a fundamental property of BSTs.</p>
  </div>
</div>

### Deletion

Deleting a node has three cases:

1. **Leaf node** (no children) — remove it by setting its parent's pointer to `None`.
2. **One child** — bypass the node by linking its parent directly to its child.
3. **Two children** — find the in-order successor (smallest value in the right subtree) or in-order predecessor (largest in the left subtree), replace the node's value with it, then delete the successor/predecessor.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">A BST is not automatically balanced. If values are inserted in sorted order (e.g., 1, 2, 3, 4, 5), the tree becomes a straight chain — effectively a linked list — and all operations degrade to O(n). Insertion order directly affects tree shape and performance.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B4.1.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>BST rule: left child &lt; parent &lt; right child.</li>
      <li>In-order traversal (LNR) produces sorted output; pre-order (NLR) for copying; post-order (LRN) for safe deletion.</li>
      <li>Search is O(log n) in a balanced tree, O(n) in a skewed tree.</li>
      <li>Deletion has three cases depending on the number of children: leaf, one child, or two children.</li>
    </ul>
  </div>
</div>


## B4.1.5 Sets as an ADT

A <span data-def="An unordered collection of unique elements that supports membership testing and mathematical operations like union, intersection, and difference.">set</span> is a collection with two defining properties: elements are **unique** (no duplicates) and **unordered** (no index-based access). Sets are optimised for membership testing — checking whether an element is in the set — and for mathematical operations between collections.

### Creating and modifying sets

```python
# Creating sets
colours = {"red", "green", "blue"}
numbers = set([1, 2, 2, 3, 3, 3])  # duplicates removed → {1, 2, 3}

# Adding and removing
colours.add("yellow")
colours.remove("red")

# Membership test
print("green" in colours)  # True
print("red" in colours)    # False
```

### Set operations

Three core operations allow sets to be combined and compared:

| Operation | Meaning | Python syntax | Result for A={1,2,3,4}, B={3,4,5,6} |
|---|---|---|---|
| Union | All elements in either set | `A \| B` or `A.union(B)` | {1, 2, 3, 4, 5, 6} |
| Intersection | Only elements in both sets | `A & B` or `A.intersection(B)` | {3, 4} |
| Difference | Elements in A but not in B | `A - B` or `A.difference(B)` | {1, 2} |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Applying set operations to a school scenario</p>
  <div class="ib-textbook-worked__body">
    <pre><code>robotics = {"Ava", "Noah", "Liam", "Mia"}
coding = {"Mia", "Liam", "Zoe"}

# Students in either club
either = robotics | coding
# {"Ava", "Noah", "Liam", "Mia", "Zoe"}

# Students in both clubs
both = robotics & coding
# {"Mia", "Liam"}

# Students in robotics but not coding
only_robotics = robotics - coding
# {"Ava", "Noah"}</code></pre>
    <table>
      <tr><th>Question</th><th>Operation</th><th>Result</th></tr>
      <tr><td>Who is in at least one club?</td><td>Union</td><td>Ava, Noah, Liam, Mia, Zoe</td></tr>
      <tr><td>Who is in both clubs?</td><td>Intersection</td><td>Mia, Liam</td></tr>
      <tr><td>Who is only in robotics?</td><td>Difference</td><td>Ava, Noah</td></tr>
    </table>
  </div>
</div>

### Subset and superset

A set A is a **subset** of B if every element of A is also in B. B is then a **superset** of A.

```python
A = {1, 4, 7}
B = {1, 2, 3, 4, 5, 6, 7}

print(A.issubset(B))    # True — all of A's elements are in B
print(B.issuperset(A))  # True — B contains all of A
```

### When to use sets

Sets are the right choice when:
- uniqueness must be enforced (e.g., usernames, IDs),
- fast membership testing is needed (O(1) average for `in`),
- mathematical set operations are required (union, intersection, difference).

Sets are **not** suitable when order matters or when duplicate values need to be preserved.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B4.1.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Sets store unique, unordered elements with O(1) average membership testing.</li>
      <li>Core operations: union (all from both), intersection (common), difference (in one but not the other).</li>
      <li>Subset/superset tests check containment relationships between sets.</li>
      <li>Use sets when uniqueness and fast membership checks matter more than order.</li>
    </ul>
  </div>
</div>


## B4.1.6 Core principles of ADTs

This section ties together the core principles that underpin all abstract data types, using <span data-def="A data structure that maps keys to values using a hash function to compute an index into an array of slots. Provides O(1) average-case lookup, insertion, and deletion.">hash tables</span> as a key example of how ADT principles apply in practice.

### Hash tables

A hash table stores key-value pairs. A <span data-def="A function that takes a key as input and computes an integer index indicating where the corresponding value should be stored in the hash table's array.">hash function</span> converts each key into an array index, allowing near-instant lookup.

```text
key → hash function → index → stored value
```

Under ideal conditions, hash tables achieve **O(1) average time** for search, insert, and delete operations.

```python
# Python's dict is a hash table
students = {}
students["Alice"] = 85
students["Bob"] = 92

print(students["Alice"])  # 85 — direct lookup by key
```

### Hash functions

A hash function maps a key to an index. A simple example uses the modulo operator:

```python
def simple_hash(key, table_size):
    return key % table_size
```

For string keys, a common approach sums the character codes and applies modulo:

```text
Hash "name" with table_size = 10:
  'n'=110, 'a'=97, 'm'=109, 'e'=101
  Sum = 417
  Index = 417 % 10 = 7
```

### Collisions

A <span data-def="When two different keys produce the same hash index, meaning both would be assigned to the same slot in the hash table.">collision</span> occurs when two different keys hash to the same index. Collisions are inevitable — no hash function can guarantee unique indices for all possible keys.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Collisions with modulo hashing</p>
  <div class="ib-textbook-worked__body">
    <p>Hash function: <code>index = key % 6</code>. Keys: 35, 800, 82, 92, 122, 94.</p>
    <table>
      <tr><th>Key</th><th>Index (key % 6)</th><th>Result</th></tr>
      <tr><td>35</td><td>5</td><td>Slot 5</td></tr>
      <tr><td>800</td><td>2</td><td>Slot 2</td></tr>
      <tr><td>82</td><td>4</td><td>Slot 4</td></tr>
      <tr><td>92</td><td>2</td><td>Collision at slot 2</td></tr>
      <tr><td>122</td><td>2</td><td>Collision at slot 2</td></tr>
      <tr><td>94</td><td>4</td><td>Collision at slot 4</td></tr>
    </table>
    <p>Keys 800, 92, and 122 all hash to index 2. A collision resolution strategy is needed.</p>
  </div>
</div>

### Collision resolution

Two main strategies handle collisions:

**Chaining** — each slot stores a list (or linked list) of entries. Colliding keys are appended to the list at that index.

```text
Index 0: []
Index 1: []
Index 2: [800, 92, 122]    ← three entries chained
Index 3: []
Index 4: [82, 94]           ← two entries chained
Index 5: [35]
```

- Advantage: simple, handles high load gracefully.
- Disadvantage: extra memory for lists; lookup slows when chains grow long.

**Open addressing** — all entries are stored directly in the table. On collision, the algorithm probes for the next available slot.

- **Linear probing** — check the next slot, then the next, until an empty one is found. Risk: clustering (groups of filled slots slow subsequent insertions).
- **Quadratic probing** — check slots at increasing squared intervals (1, 4, 9, ...) to spread entries more evenly.

### Load factor and rehashing

The <span data-def="The ratio of the number of stored entries to the total number of slots in a hash table. A higher load factor means more collisions and slower operations.">load factor</span> measures how full a hash table is:

```text
Load factor = number of entries / number of slots
```

As the load factor increases, collisions become more frequent and performance degrades. When the load factor exceeds a threshold (commonly 0.7), the table is **rehashed**: a new, larger array is created and all existing entries are re-inserted using the hash function with the new table size.

### ADT principles in practice

Hash tables illustrate all the core ADT principles:

| Principle | How hash tables demonstrate it |
|---|---|
| Abstraction | Users insert/lookup by key without knowing the hashing mechanism |
| Encapsulation | Internal array, hash function, and collision handling are hidden |
| Interface | Operations: insert, lookup, delete — independent of implementation |
| Modularity | Hash function, collision strategy, and resizing logic are separate concerns |

These same principles apply to every ADT: stacks, queues, linked lists, BSTs, and sets all separate their interface (what operations are available) from their implementation (how those operations work internally).

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Do not overlook the impact of load factor on hash table performance. A hash table with O(1) average lookup can degrade to O(n) if the load factor is too high and collisions are not managed. Keeping the load factor low through rehashing is essential for maintaining efficiency.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B4.1.6</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Hash tables map keys to values via a hash function, achieving O(1) average-case operations.</li>
      <li>Collisions are handled by chaining (lists at each slot) or open addressing (probing for empty slots).</li>
      <li>Load factor = entries / slots. Rehashing occurs when the load factor exceeds a threshold to maintain performance.</li>
      <li>All ADTs share core principles: abstraction, encapsulation, interface separation, and modularity.</li>
    </ul>
  </div>
</div>
