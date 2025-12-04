# Level 17: Binary Trees (HL)

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 17 |
| **Title** | Binary Trees |
| **Syllabus** | B4.1.4 |
| **Challenge Count** | 6 |
| **Prerequisites** | Levels 14-16 (Recursion, Linked Lists) |
| **HL Only** | Yes |

---

## Learning Objectives

1. Create TreeNode class with data, left, right
2. Understand Binary Search Tree (BST) property
3. Insert nodes maintaining BST order
4. Implement in-order traversal (sorted output)
5. Implement pre-order traversal
6. Implement post-order traversal
7. Search for values in BST

---

## Base Content Sections

### Section 1: Tree Concepts

```typescript
{
  title: "1. What is a Binary Tree?",
  content: `A tree is a hierarchical data structure. Each node has:
- Data
- Left child (smaller values in BST)
- Right child (larger values in BST)

Binary Search Tree (BST) property:
- All left descendants < node < all right descendants`,
  codeExample: `#       50          (root)
#      /  \\
#    30    70      (left < 50 < right)
#   /  \\    \\
#  20  40    80

# In-order traversal: 20, 30, 40, 50, 70, 80 (sorted!)`
}
```

### Section 2: TreeNode Class

```typescript
{
  title: "2. TreeNode Structure",
  content: `Each node points to two children instead of one next.`,
  codeExample: `class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

# Build tree manually
root = TreeNode(50)
root.left = TreeNode(30)
root.right = TreeNode(70)
root.left.left = TreeNode(20)
root.left.right = TreeNode(40)`
}
```

### Section 3: BST Insert

```typescript
{
  title: "3. Inserting into BST",
  content: `Insert maintains BST property - compare and go left or right.`,
  codeExample: `class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        if self.root is None:
            self.root = TreeNode(data)
        else:
            self._insert_recursive(self.root, data)
    
    def _insert_recursive(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = TreeNode(data)
            else:
                self._insert_recursive(node.left, data)
        else:
            if node.right is None:
                node.right = TreeNode(data)
            else:
                self._insert_recursive(node.right, data)

tree = BST()
for val in [50, 30, 70, 20, 40]:
    tree.insert(val)`
}
```

### Section 4: Traversals

```typescript
{
  title: "4. Tree Traversals",
  content: `Three ways to visit all nodes:
- In-order: Left, Root, Right (gives sorted output for BST)
- Pre-order: Root, Left, Right
- Post-order: Left, Right, Root`,
  codeExample: `def in_order(self, node):
    if node:
        self.in_order(node.left)
        print(node.data, end=" ")
        self.in_order(node.right)

def pre_order(self, node):
    if node:
        print(node.data, end=" ")
        self.pre_order(node.left)
        self.pre_order(node.right)

def post_order(self, node):
    if node:
        self.post_order(node.left)
        self.post_order(node.right)
        print(node.data, end=" ")

# Tree: 50, 30, 70
# In-order: 30, 50, 70 (sorted!)
# Pre-order: 50, 30, 70
# Post-order: 30, 70, 50`
}
```

### Section 5: BST Search

```typescript
{
  title: "5. Searching in BST",
  content: `Search is efficient - O(log N) for balanced trees.`,
  codeExample: `def search(self, node, target):
    if node is None:
        return False
    if node.data == target:
        return True
    elif target < node.data:
        return self.search(node.left, target)
    else:
        return self.search(node.right, target)

# Search 40 in tree with root 50:
# 40 < 50 -> go left to 30
# 40 > 30 -> go right to 40
# Found!`
}
```

---

## Challenges

### Challenge 1: TreeNode Creation

```typescript
{
  id: 1,
  title: "Build Tree Nodes",
  description: `Create TreeNode class and manually build a tree:
        50
       /  \\
      30   70

Print root, left child, right child data.`,
  starterCode: `class TreeNode:
    pass

root = TreeNode(50)
# Add left and right children

print(root.data)
print(root.left.data)
print(root.right.data)`,
  hint: `root.left = TreeNode(30), root.right = TreeNode(70)`,
  conceptTags: ["tree", "node"]
}
```

### Challenge 2: BST Insert

```typescript
{
  id: 2,
  title: "BST Insertion",
  description: `Implement BST with insert method.

Insert: 50, 30, 70, 20, 40, 60, 80

Use recursion to find correct position.`,
  starterCode: `class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, data):
        pass
    
    def _insert_recursive(self, node, data):
        pass

tree = BST()
for val in [50, 30, 70, 20, 40, 60, 80]:
    tree.insert(val)`,
  hint: `Compare with node.data, go left if smaller, right if larger.`,
  conceptTags: ["BST", "insert", "recursion"]
}
```

### Challenge 3: In-Order Traversal

```typescript
{
  id: 3,
  title: "In-Order (Sorted)",
  description: `Implement in_order traversal: Left, Root, Right

For BST, this produces sorted output!

Tree from Challenge 2 should print: 20 30 40 50 60 70 80`,
  starterCode: `def in_order(self, node):
    pass

# After building tree:
tree.in_order(tree.root)  # 20 30 40 50 60 70 80`,
  hint: `Recursively: in_order(left), print(data), in_order(right)`,
  conceptTags: ["traversal", "in-order", "sorted"]
}
```

### Challenge 4: Pre and Post Order

```typescript
{
  id: 4,
  title: "Pre and Post Order",
  description: `Implement both:
- Pre-order: Root, Left, Right
- Post-order: Left, Right, Root

Same tree, different output order.`,
  starterCode: `def pre_order(self, node):
    pass

def post_order(self, node):
    pass

tree.pre_order(tree.root)
print()
tree.post_order(tree.root)`,
  hint: `Change order of: print, recurse left, recurse right`,
  conceptTags: ["traversal", "pre-order", "post-order"]
}
```

### Challenge 5: BST Search

```typescript
{
  id: 5,
  title: "Binary Search",
  description: `Implement search(target) that returns True/False.

Use BST property: compare and go left or right.`,
  starterCode: `def search(self, target):
    return self._search_recursive(self.root, target)

def _search_recursive(self, node, target):
    pass

print(tree.search(40))  # True
print(tree.search(45))  # False`,
  hint: `Base: node is None = False, node.data == target = True. Otherwise recurse.`,
  conceptTags: ["search", "BST", "recursion"]
}
```

### Challenge 6: Mission Database

```typescript
{
  id: 6,
  title: "Mission Priority Tree",
  description: `Build a mission priority system using BST.

MissionTree:
- add_mission(priority, name): insert by priority
- get_next(): return highest priority (largest value)
- list_all(): in-order traversal showing all missions

Store mission name as tuple (priority, name) or modify TreeNode.`,
  starterCode: `class MissionNode:
    def __init__(self, priority, name):
        self.priority = priority
        self.name = name
        self.left = None
        self.right = None

class MissionTree:
    def __init__(self):
        self.root = None
    
    def add_mission(self, priority, name):
        pass
    
    def list_all(self):
        pass
    
    def get_highest_priority(self):
        # Find rightmost node
        pass

mt = MissionTree()
mt.add_mission(50, "Routine Check")
mt.add_mission(80, "Emergency Repair")
mt.add_mission(30, "Data Collection")
mt.list_all()
print(f"Highest: {mt.get_highest_priority()}")`,
  hint: `Highest priority = rightmost node in BST. Keep going right until node.right is None.`,
  conceptTags: ["synthesis", "BST application"]
}
```

---

## Implementation Notes

### Key IB Points
- Tree structure (root, children, leaves)
- BST property
- Three traversal orders
- Recursive nature of tree operations

---

*Level 17 Plan - Version 1.0*

