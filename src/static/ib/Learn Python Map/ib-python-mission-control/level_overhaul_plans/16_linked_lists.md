# Level 16: Linked Lists (HL)

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 16 |
| **Title** | Linked Lists |
| **Syllabus** | B4.1.2, B4.1.3 |
| **Challenge Count** | 7 |
| **Prerequisites** | Levels 12-15 (OOP) |
| **HL Only** | Yes |

---

## Learning Objectives

1. Create a Node class with data and next pointer
2. Create a LinkedList class with head pointer
3. Insert at front, at end, at position
4. Delete nodes by value or position
5. Traverse and print linked lists
6. Understand advantages over arrays

---

## Base Content Sections

### Section 1: What is a Linked List?

```typescript
{
  title: "1. Linked List Concept",
  content: `A linked list is a chain of nodes. Each node contains:
- Data (the value)
- A pointer to the next node

Unlike arrays, nodes aren't stored contiguously in memory - they're connected by pointers.`,
  codeExample: `# Visualize:
# [Data|Next] -> [Data|Next] -> [Data|Next] -> None
#    Head          Node 2         Node 3       (End)

# Advantages over arrays:
# - Insert/delete O(1) at known position
# - Dynamic size (no resizing needed)
# - No wasted space

# Disadvantages:
# - No direct index access O(N) to find element
# - Extra memory for pointers`
}
```

### Section 2: Node Class

```typescript
{
  title: "2. Creating a Node",
  content: `The Node is the building block. Each node holds data and a reference to the next node.`,
  codeExample: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None  # Points to nothing initially

# Create individual nodes
node1 = Node("Apollo")
node2 = Node("Voyager")
node3 = Node("Discovery")

# Link them manually
node1.next = node2
node2.next = node3
# node3.next remains None (end of list)

# Traverse
current = node1
while current is not None:
    print(current.data)
    current = current.next`
}
```

### Section 3: LinkedList Class

```typescript
{
  title: "3. LinkedList Wrapper",
  content: `The LinkedList class manages the nodes, keeping track of the head (first node).`,
  codeExample: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None  # Empty list
    
    def is_empty(self):
        return self.head is None
    
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# Usage
missions = LinkedList()
print(missions.is_empty())  # True`
}
```

### Section 4: Insert Operations

```typescript
{
  title: "4. Inserting Nodes",
  content: `Three ways to insert: front, end, or at specific position.`,
  codeExample: `class LinkedList:
    # ... (Node class and __init__ as before)
    
    def insert_front(self, data):
        new_node = Node(data)
        new_node.next = self.head  # Point to old head
        self.head = new_node       # New head
    
    def insert_end(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next:  # Find last node
            current = current.next
        current.next = new_node
    
    def insert_at(self, position, data):
        if position == 0:
            self.insert_front(data)
            return
        new_node = Node(data)
        current = self.head
        for i in range(position - 1):
            if current is None:
                return
            current = current.next
        new_node.next = current.next
        current.next = new_node`
}
```

### Section 5: Delete Operations

```typescript
{
  title: "5. Deleting Nodes",
  content: `Delete by value or position - need to maintain links!`,
  codeExample: `def delete_value(self, value):
    # Special case: delete head
    if self.head and self.head.data == value:
        self.head = self.head.next
        return True
    
    # Find node before the one to delete
    current = self.head
    while current and current.next:
        if current.next.data == value:
            current.next = current.next.next  # Skip over
            return True
        current = current.next
    return False  # Not found

def delete_at(self, position):
    if self.head is None:
        return False
    if position == 0:
        self.head = self.head.next
        return True
    current = self.head
    for i in range(position - 1):
        if current.next is None:
            return False
        current = current.next
    if current.next:
        current.next = current.next.next
        return True
    return False`
}
```

---

## Challenges

### Challenge 1: Node Creation

```typescript
{
  id: 1,
  title: "Build Nodes",
  description: `Create a Node class and manually link three nodes.

Node: data, next (None initially)

Create: "Alpha" -> "Beta" -> "Gamma" -> None
Traverse and print each data.`,
  starterCode: `class Node:
    pass

# Create and link nodes
node1 = Node("Alpha")
# ... link them

# Traverse and print
current = node1
while current:
    print(current.data)
    current = current.next`,
  hint: `node1.next = node2, node2.next = node3`,
  conceptTags: ["node", "basic linking"]
}
```

### Challenge 2: LinkedList Class

```typescript
{
  id: 2,
  title: "Basic LinkedList",
  description: `Create LinkedList class with:
- __init__: set head = None
- is_empty(): return True if head is None
- print_list(): traverse and print all data`,
  starterCode: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    pass

# Test
missions = LinkedList()
print(missions.is_empty())  # True`,
  hint: `while current: lets you traverse until None`,
  conceptTags: ["linked list", "traversal"]
}
```

### Challenge 3: Insert Front

```typescript
{
  id: 3,
  title: "Insert at Front",
  description: `Add insert_front(data) method.

Steps:
1. Create new node
2. Point new node to current head
3. Update head to new node

Insert A, B, C - list should be C -> B -> A.`,
  starterCode: `class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_front(self, data):
        pass
    
    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

ll = LinkedList()
ll.insert_front("A")
ll.insert_front("B")
ll.insert_front("C")
ll.print_list()  # C -> B -> A -> None`,
  hint: `new_node.next = self.head then self.head = new_node`,
  conceptTags: ["insert", "front"]
}
```

### Challenge 4: Insert End

```typescript
{
  id: 4,
  title: "Insert at End",
  description: `Add insert_end(data) method.

Steps:
1. Create new node
2. If empty, set as head
3. Otherwise, traverse to last node
4. Set last.next = new node

Insert A, B, C - list should be A -> B -> C.`,
  starterCode: `class LinkedList:
    # Previous methods...
    
    def insert_end(self, data):
        pass

ll = LinkedList()
ll.insert_end("A")
ll.insert_end("B")
ll.insert_end("C")
ll.print_list()  # A -> B -> C -> None`,
  hint: `Find last node with while current.next: then set current.next = new_node`,
  conceptTags: ["insert", "end", "traversal"]
}
```

### Challenge 5: Delete Node

```typescript
{
  id: 5,
  title: "Delete by Value",
  description: `Add delete(value) method.

Handle special case: deleting head.
Otherwise: find node BEFORE target, update its next.

Create A -> B -> C -> D, delete "B", print result.`,
  starterCode: `def delete(self, value):
    pass

ll = LinkedList()
for x in ["A", "B", "C", "D"]:
    ll.insert_end(x)
ll.print_list()  # A -> B -> C -> D -> None
ll.delete("B")
ll.print_list()  # A -> C -> D -> None`,
  hint: `If head has value, self.head = self.head.next. Otherwise find node where current.next.data == value.`,
  conceptTags: ["delete", "linking"]
}
```

### Challenge 6: Length and Search

```typescript
{
  id: 6,
  title: "Length and Search",
  description: `Add:
- length(): return count of nodes
- search(value): return True if found, False otherwise
- get_at(index): return data at index or None`,
  starterCode: `def length(self):
    pass

def search(self, value):
    pass

def get_at(self, index):
    pass

ll = LinkedList()
for x in ["A", "B", "C"]:
    ll.insert_end(x)
print(ll.length())      # 3
print(ll.search("B"))   # True
print(ll.get_at(1))     # "B"`,
  hint: `Counter for length, compare data for search, count index for get_at.`,
  conceptTags: ["traversal", "search", "count"]
}
```

### Challenge 7: Complete Mission Queue

```typescript
{
  id: 7,
  title: "Mission Queue System",
  description: `Build a mission queue using a linked list.

MissionQueue:
- add_mission(name): add to end
- next_mission(): remove and return front mission
- peek(): return front mission without removing
- display(): show all missions

Use for FIFO mission management.`,
  starterCode: `class MissionQueue:
    def __init__(self):
        self.head = None
    
    def add_mission(self, name):
        pass
    
    def next_mission(self):
        pass
    
    def peek(self):
        pass
    
    def display(self):
        pass

mq = MissionQueue()
mq.add_mission("Apollo 11")
mq.add_mission("Artemis I")
mq.add_mission("Mars 2024")
mq.display()
print(f"Next: {mq.next_mission()}")
mq.display()`,
  hint: `next_mission removes from front (update head). add_mission adds to end.`,
  conceptTags: ["synthesis", "queue", "application"]
}
```

---

## Implementation Notes

### Key IB Points
- Node structure (data + pointer)
- Traversal algorithms
- Insert/delete at various positions
- Comparison with arrays

---

*Level 16 Plan - Version 1.0*

