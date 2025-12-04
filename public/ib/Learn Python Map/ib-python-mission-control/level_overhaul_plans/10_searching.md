# Level 10: Searching Algorithms

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 10 |
| **Title** | Searching |
| **Syllabus** | B2.4.2 |
| **Challenge Count** | 5 |
| **Prerequisites** | Levels 1-9 (especially lists, loops) |

---

## ⚠️ EXAM CRITICAL LEVEL

Students MUST memorize these algorithms! They need to:
1. Write the algorithms from memory
2. Trace through them with test data
3. Explain their efficiency differences
4. Know when to use each

**Once implemented correctly, no need to repeat** - focus on understanding and memorization.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Implement linear search from memory
2. Return index (not just True/False) from linear search
3. Implement iterative binary search from memory
4. Explain time complexity: O(N) vs O(log N)
5. Explain when binary search can be used (sorted data only!)
6. Trace through both algorithms step by step

---

## Synoptic Connections

### From Previous Levels:
- **Level 3**: Loops (both algorithms use loops)
- **Level 5**: Lists (searching through lists)
- **Level 7**: Functions (encapsulating algorithms)

---

## THE EXAM ALGORITHMS

### LINEAR SEARCH - Memorize This Exactly!
```python
def linear_search(arr, target):
    """
    Search for target in arr.
    Returns: index if found, -1 if not found
    Time Complexity: O(N)
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

### BINARY SEARCH (ITERATIVE) - Memorize This Exactly!
```python
def binary_search(arr, target):
    """
    Search for target in SORTED arr.
    Returns: index if found, -1 if not found
    Time Complexity: O(log N)
    REQUIRES: arr must be sorted!
    """
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    
    return -1
```

---

## Base Content Sections

### Section 1: Why Search Algorithms Matter

```typescript
{
  title: "1. The Search Problem",
  content: `Searching is one of the most common operations in computing. Finding a specific item in a collection can be done in different ways, with different efficiency.

Real-world examples:
- Finding a contact in your phone
- Looking up a word in a dictionary
- Finding a star in a star catalog
- Locating a crew member in records

The METHOD you choose affects how FAST you find the answer.`,
  codeExample: `# The search problem:
star_catalog = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"]
target = "Gamma"

# Question: Where is "Gamma" in the list?
# Answer: Index 2

# But HOW do we find it efficiently?`
}
```

### Section 2: Linear Search

```typescript
{
  title: "2. Linear Search: The Simple Approach",
  content: `Linear search checks EVERY element from the beginning until the target is found. Simple but can be slow for large datasets.

Process:
1. Start at index 0
2. Compare each element to target
3. If match found, return the index
4. If end reached without match, return -1

Time Complexity: O(N) - in the worst case, checks all N elements.`,
  codeExample: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i    # Found! Return index
    return -1           # Not found

# Example usage
planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter"]
index = linear_search(planets, "Earth")
print(f"Earth at index: {index}")  # 2

index = linear_search(planets, "Pluto")
print(f"Pluto at index: {index}")  # -1 (not found)`,
  tableData: {
    headers: ["Advantages", "Disadvantages"],
    rows: [
      ["Works on ANY list", "Slow for large lists"],
      ["Simple to implement", "Checks every element"],
      ["No sorting required", "O(N) time complexity"]
    ]
  }
}
```

### Section 3: Linear Search Trace

```typescript
{
  title: "3. Tracing Linear Search",
  content: `Let's trace linear_search([45, 72, 38, 91, 55], 91):`,
  tableData: {
    headers: ["Step", "i", "arr[i]", "arr[i] == target?", "Action"],
    rows: [
      ["1", "0", "45", "45 == 91? No", "Continue"],
      ["2", "1", "72", "72 == 91? No", "Continue"],
      ["3", "2", "38", "38 == 91? No", "Continue"],
      ["4", "3", "91", "91 == 91? Yes!", "Return 3"]
    ]
  },
  codeExample: `# Visualizing the search
arr = [45, 72, 38, 91, 55]
target = 91

# Step by step:
# i=0: 45 != 91, continue
# i=1: 72 != 91, continue
# i=2: 38 != 91, continue
# i=3: 91 == 91, FOUND! Return 3

# Total comparisons: 4`
}
```

### Section 4: Binary Search Concept

```typescript
{
  title: "4. Binary Search: Divide and Conquer",
  content: `Binary search is MUCH faster but ONLY works on SORTED data. It repeatedly divides the search space in half.

Process:
1. Start with low=0, high=len-1
2. Calculate mid = (low + high) // 2
3. If arr[mid] == target: FOUND!
4. If arr[mid] < target: search right half (low = mid + 1)
5. If arr[mid] > target: search left half (high = mid - 1)
6. Repeat until found or low > high

Time Complexity: O(log N) - halves the search space each step!`,
  codeExample: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid          # Found!
        elif arr[mid] < target:
            low = mid + 1       # Search right half
        else:
            high = mid - 1      # Search left half
    
    return -1                   # Not found

# IMPORTANT: Array must be sorted!
sorted_data = [10, 20, 30, 40, 50, 60, 70, 80]
print(binary_search(sorted_data, 50))  # 4`
}
```

### Section 5: Binary Search Trace

```typescript
{
  title: "5. Tracing Binary Search",
  content: `Let's trace binary_search([10, 20, 30, 40, 50, 60, 70], 50):`,
  tableData: {
    headers: ["Step", "low", "high", "mid", "arr[mid]", "Comparison", "Action"],
    rows: [
      ["1", "0", "6", "3", "40", "40 < 50", "low = 4"],
      ["2", "4", "6", "5", "60", "60 > 50", "high = 4"],
      ["3", "4", "4", "4", "50", "50 == 50", "FOUND!"]
    ]
  },
  codeExample: `# Visual representation
# [10, 20, 30, 40, 50, 60, 70]
#   0   1   2   3   4   5   6

# Step 1: mid=3, arr[3]=40 < 50, search right
# [          X   40| 50, 60, 70]
#                   low       high

# Step 2: mid=5, arr[5]=60 > 50, search left
# [              50, 60  X      ]
#                low  high

# Step 3: mid=4, arr[4]=50 == 50, FOUND!
# Only 3 comparisons vs 5 for linear!`
}
```

### Section 6: Complexity Comparison

```typescript
{
  title: "6. O(N) vs O(log N)",
  content: `The difference becomes dramatic with large datasets!`,
  tableData: {
    headers: ["List Size", "Linear Search (O(N))", "Binary Search (O(log N))"],
    rows: [
      ["10", "Up to 10 checks", "Up to 4 checks"],
      ["100", "Up to 100 checks", "Up to 7 checks"],
      ["1,000", "Up to 1,000 checks", "Up to 10 checks"],
      ["1,000,000", "Up to 1,000,000 checks", "Up to 20 checks"],
      ["1 billion", "Up to 1 billion checks", "Up to 30 checks"]
    ]
  },
  codeExample: `# Key decision: When to use which?

# USE LINEAR SEARCH when:
# - Data is NOT sorted
# - List is small
# - You only search once (sorting cost not worth it)

# USE BINARY SEARCH when:
# - Data IS sorted (or worth sorting)
# - List is large
# - Multiple searches needed
# - Speed is critical`
}
```

---

## Challenges

### Challenge 1: Standard Linear Search

```typescript
{
  id: 1,
  title: "Star Catalog Search",
  description: `Implement the standard linear search algorithm.

Write linear_search(arr, target) that:
1. Loops through arr using range(len(arr))
2. If arr[i] equals target, return i
3. If loop completes without finding, return -1

Test with:
- star_catalog = ["Sirius", "Canopus", "Arcturus", "Vega", "Rigel"]
- Search for "Vega" (should return 3)
- Search for "Sun" (should return -1)

MEMORIZE THIS PATTERN!`,
  starterCode: `# MISSION: Star Catalog Search
# Implement linear search exactly as shown

def linear_search(arr, target):
    # Your implementation - MEMORIZE THIS!
    pass

# === Mission Control Test ===
star_catalog = ["Sirius", "Canopus", "Arcturus", "Vega", "Rigel"]

result1 = linear_search(star_catalog, "Vega")
print(f"Vega found at index: {result1}")

result2 = linear_search(star_catalog, "Sun")
print(f"Sun found at index: {result2}")`,
  hint: `for i in range(len(arr)): if arr[i] == target: return i. Don't forget return -1 AFTER the loop.`,
  conceptTags: ["linear search", "algorithm", "memorize"]
}
```

### Challenge 2: Linear Search with Count

```typescript
{
  id: 2,
  title: "Search Efficiency Counter",
  description: `Modify linear search to count how many comparisons it makes.

Write linear_search_count(arr, target) that:
1. Performs linear search
2. Counts every comparison made
3. Returns a tuple: (index_found, comparison_count)
4. If not found, return (-1, comparison_count)

Test with [45, 72, 38, 91, 55]:
- Search for 91: should return (3, 4) - found at 3, took 4 comparisons
- Search for 99: should return (-1, 5) - not found, checked all 5`,
  starterCode: `# MISSION: Search Counter
# Track algorithm efficiency

def linear_search_count(arr, target):
    comparisons = 0
    # Implement search, incrementing comparisons each check
    pass

# === Mission Control Test ===
data = [45, 72, 38, 91, 55]

idx, count = linear_search_count(data, 91)
print(f"Found at {idx}, took {count} comparisons")

idx, count = linear_search_count(data, 99)
print(f"Found at {idx}, took {count} comparisons")`,
  hint: `Add comparisons += 1 before each if arr[i] == target check. Return (i, comparisons) when found.`,
  conceptTags: ["linear search", "complexity", "counting"]
}
```

### Challenge 3: Standard Binary Search

```typescript
{
  id: 3,
  title: "Sorted Database Search",
  description: `Implement the standard binary search algorithm.

Write binary_search(arr, target) that:
1. Uses low = 0, high = len(arr) - 1
2. While low <= high:
   - Calculate mid = (low + high) // 2
   - If arr[mid] == target: return mid
   - If arr[mid] < target: low = mid + 1
   - Else: high = mid - 1
3. Return -1 if not found

Test with sorted data: [10, 20, 30, 40, 50, 60, 70, 80]
- Search for 50 (should return 4)
- Search for 25 (should return -1)

MEMORIZE THIS PATTERN!`,
  starterCode: `# MISSION: Binary Search Implementation
# Implement binary search exactly as shown

def binary_search(arr, target):
    # Your implementation - MEMORIZE THIS!
    low = 0
    high = len(arr) - 1
    
    # while low <= high:
    #     ...
    pass

# === Mission Control Test ===
sorted_data = [10, 20, 30, 40, 50, 60, 70, 80]

result1 = binary_search(sorted_data, 50)
print(f"50 found at index: {result1}")

result2 = binary_search(sorted_data, 25)
print(f"25 found at index: {result2}")`,
  hint: `mid = (low + high) // 2. Compare arr[mid] with target. Adjust low or high based on comparison.`,
  conceptTags: ["binary search", "algorithm", "memorize"]
}
```

### Challenge 4: Efficiency Test

```typescript
{
  id: 4,
  title: "Search Algorithm Comparison",
  description: `Compare the efficiency of linear vs binary search.

Create both search functions with comparison counting:
- linear_search_count(arr, target) - returns (index, comparisons)
- binary_search_count(arr, target) - returns (index, comparisons)

Test both on sorted_data = [i for i in range(1, 101)] (1 to 100)
Search for: 50, 1, 100, 73

Print comparison counts for each search and algorithm.`,
  starterCode: `# MISSION: Algorithm Comparison
# Compare search efficiency

def linear_search_count(arr, target):
    comparisons = 0
    # Implement with counting
    pass

def binary_search_count(arr, target):
    comparisons = 0
    # Implement with counting
    pass

# === Mission Control Test ===
sorted_data = [i for i in range(1, 101)]  # 1 to 100
targets = [50, 1, 100, 73]

print("=== SEARCH COMPARISON ===")
for target in targets:
    lin_idx, lin_count = linear_search_count(sorted_data, target)
    bin_idx, bin_count = binary_search_count(sorted_data, target)
    print(f"Target {target}:")
    print(f"  Linear: {lin_count} comparisons")
    print(f"  Binary: {bin_count} comparisons")`,
  hint: `In binary search, count comparisons in the while loop. Binary should be MUCH fewer, especially for items in the middle.`,
  conceptTags: ["comparison", "efficiency", "O(N) vs O(log N)"]
}
```

### Challenge 5: Adaptive Search

```typescript
{
  id: 5,
  title: "Adaptive Search System",
  description: `Create a smart search system that chooses the best algorithm.

Create smart_search(arr, target) that:
1. First checks if the array is sorted
2. If sorted: use binary search (more efficient)
3. If not sorted: use linear search (only option)
4. Print which algorithm was used
5. Return the index found

Helper function is_sorted(arr):
- Return True if all arr[i] <= arr[i+1]
- Return False otherwise

Test with:
- sorted_missions = [10, 20, 30, 40, 50]
- unsorted_readings = [45, 12, 78, 23, 56]`,
  starterCode: `# MISSION: Adaptive Search
# Choose the best algorithm automatically

def is_sorted(arr):
    # Check if array is in ascending order
    pass

def linear_search(arr, target):
    # Standard implementation
    pass

def binary_search(arr, target):
    # Standard implementation
    pass

def smart_search(arr, target):
    # Check if sorted
    # Choose appropriate algorithm
    # Print which was used
    # Return result
    pass

# === Mission Control Test ===
sorted_missions = [10, 20, 30, 40, 50]
unsorted_readings = [45, 12, 78, 23, 56]

print("Searching sorted data:")
print(smart_search(sorted_missions, 30))

print("\\nSearching unsorted data:")
print(smart_search(unsorted_readings, 78))`,
  hint: `is_sorted: loop from 0 to len-2, check if arr[i] > arr[i+1] ever. smart_search: if is_sorted(arr): use binary else use linear.`,
  conceptTags: ["synthesis", "algorithm selection", "sorted check"]
}
```

---

## Implementation Notes

### Files to Modify

1. **`data/level10_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 10 tasks:
```typescript
{
  id: 10,
  title: "Searching",
  syllabus: "B2.4.2",
  description: "Locate targets in the star map.",
  tasks: [
    { id: "10-1", text: "Linear search implementation" },
    { id: "10-2", text: "Linear search with efficiency counting" },
    { id: "10-3", text: "Binary search implementation" },
    { id: "10-4", text: "Algorithm efficiency comparison" },
    { id: "10-5", text: "Adaptive search selection" }
  ]
}
```

### EXAM CRITICAL!
Students must be able to:
1. Write both algorithms from memory
2. Trace through with given data
3. Explain O(N) vs O(log N)
4. Know binary search requires sorted data

---

## Expected Outputs

| Challenge | Key Output |
|-----------|------------|
| 1 | Vega at 3, Sun at -1 |
| 2 | (3, 4) and (-1, 5) |
| 3 | 50 at 4, 25 at -1 |
| 4 | Linear: ~50, Binary: ~7 for target 50 |
| 5 | Uses binary for sorted, linear for unsorted |

---

*Level 10 Plan - Version 1.0*

