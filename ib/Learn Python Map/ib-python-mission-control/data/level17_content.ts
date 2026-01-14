/**
 * Level 17: Trees (HL)
 * IB Syllabus Reference: B4.1.4
 *
 * Learning Objectives:
 * - Define tree nodes with left/right children
 * - Build Binary Search Trees (BST) with insert/search
 * - Traverse trees (in-order, pre-order, post-order)
 * - Find min/max and height in a BST
 * - Understand BST ordering property
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Hierarchical data structures
// ============================================================================

export const level17BaseContent: LessonSection[] = [
  {
    title: "1. Trees & Nodes",
    content: `A tree is a hierarchical structure of nodes. Each node can have children. In a binary tree, each node has at most two children: left and right.`,
    codeExample: `class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

# Example nodes
root = TreeNode("Root")
root.left = TreeNode("Left Child")
root.right = TreeNode("Right Child")`
  },
  {
    title: "2. Binary Search Tree (BST) Property",
    content: `A BST enforces ordering for fast search:
- Values smaller than a node go LEFT
- Values larger than a node go RIGHT

This property allows O(log N) search on balanced trees.`,
    codeExample: `# Insert respecting BST rule
def insert(root, key):
    if root is None:
        return TreeNode(key)
    if key < root.data:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root`
  },
  {
    title: "3. Traversal Orders",
    content: `Tree traversal visits every node in a specific order:
- In-order: Left, Root, Right (sorted output for BST)
- Pre-order: Root, Left, Right
- Post-order: Left, Right, Root`,
    codeExample: `def inorder(root):
    if root:
        inorder(root.left)
        print(root.data)
        inorder(root.right)

def preorder(root):
    if root:
        print(root.data)
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.data)`
  },
  {
    title: "4. Searching a BST",
    content: `Use the BST property to search quickly:
- If target < node.data -> go left
- If target > node.data -> go right
- If equal -> found
- If None -> not found`,
    codeExample: `def search(root, key):
    if root is None or root.data == key:
        return root
    if key < root.data:
        return search(root.left, key)
    return search(root.right, key)`
  },
  {
    title: "5. Min/Max & Height",
    content: `In a BST:
- Minimum value is the leftmost node
- Maximum value is the rightmost node

Height (max depth) is 1 + max(left_height, right_height); empty tree has height 0.`,
    codeExample: `def find_min(root):
    current = root
    while current and current.left:
        current = current.left
    return current.data if current else None

def max_height(root):
    if root is None:
        return 0
    return 1 + max(max_height(root.left), max_height(root.right))`
  }
];

// ============================================================================
// CHALLENGES - 6 tree-building missions
// ============================================================================

export const level17Challenges: Challenge[] = [
  {
    id: 1,
    title: "TreeNode Blueprint",
    description: `Create the TreeNode class and manually link a tiny tree.

1. Define TreeNode with data, left, right (None by default)
2. Create root=50, left child=25, right child=75
3. Print root.left.data and root.right.data`,
    starterCode: `# MISSION: TreeNode Basics

class TreeNode:
    # Define __init__ to set data, left, right
    pass

# === Mission Control Test ===
root = TreeNode(50)
root.left = TreeNode(25)
root.right = TreeNode(75)

print(root.left.data)   # 25
print(root.right.data)  # 75`,
    hint: `In __init__, set self.left = None and self.right = None.`,
    conceptTags: ["node", "bst", "structure"]
  },
  {
    id: 2,
    title: "BST Insert",
    description: `Write insert(root, key) that returns the BST root after inserting key recursively.

Rules:
- If root is None, return new TreeNode(key)
- If key < root.data, insert into left subtree
- Else insert into right subtree`,
    starterCode: `# MISSION: BST Insert
class TreeNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def insert(root, key):
    # Implement recursive insert
    pass

# === Mission Control Test ===
root = None
for value in [50, 30, 70, 20, 40, 60, 80]:
    root = insert(root, value)

print(root.data)       # 50
print(root.left.data)  # 30
print(root.right.data) # 70`,
    hint: `Set root.left = insert(root.left, key) or root.right = insert(root.right, key) before returning root.`,
    conceptTags: ["insert", "bst", "recursion"]
  },
  {
    id: 3,
    title: "In-Order Traversal",
    description: `Implement inorder(root) to print values in ascending order for a BST.

Base case: if root is None, return.
Recursive: inorder(left), print(root.data), inorder(right)`,
    starterCode: `# MISSION: In-Order Traversal
def inorder(root):
    # Traverse left, visit root, traverse right
    pass

# Assume 'root' from previous challenge
inorder(root)  # Should print sorted values`,
    hint: `if root: inorder(root.left); print(root.data); inorder(root.right)`,
    conceptTags: ["traversal", "inorder", "bst"]
  },
  {
    id: 4,
    title: "Search the Tree",
    description: `Create search(root, key) that returns True if key is in the BST, otherwise False.

Use the BST property to decide whether to go left or right.`,
    starterCode: `# MISSION: BST Search
def search(root, key):
    # Return True if found
    pass

print(search(root, 60))  # True
print(search(root, 99))  # False`,
    hint: `Check root None, then compare key with root.data and recurse.`,
    conceptTags: ["search", "bst", "recursion"]
  },
  {
    id: 5,
    title: "Find Min & Max",
    description: `Write two functions:
- find_min(root): return smallest value (leftmost node)
- find_max(root): return largest value (rightmost node)

Return None if tree is empty.`,
    starterCode: `# MISSION: BST Extremes
def find_min(root):
    pass

def find_max(root):
    pass

print(find_min(root))  # 20
print(find_max(root))  # 80`,
    hint: `Walk left until None for min, right until None for max.`,
    conceptTags: ["min", "max", "bst"]
  },
  {
    id: 6,
    title: "Tree Height",
    description: `Compute height (max depth) of a binary tree.

Rules:
- Empty tree height is 0
- Height = 1 + max(height(left), height(right))`,
    starterCode: `# MISSION: Tree Height
def tree_height(root):
    # Return integer height
    pass

print(tree_height(root))  # Should reflect depth of inserted nodes`,
    hint: `Base case root is None -> 0; otherwise 1 + max(...)`,
    conceptTags: ["height", "depth", "recursion"]
  }
];
