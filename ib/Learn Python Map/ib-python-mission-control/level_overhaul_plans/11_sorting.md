# Level 11: Sorting Algorithms

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 11 |
| **Title** | Sorting |
| **Syllabus** | B2.4.3 |
| **Challenge Count** | 4 |
| **Prerequisites** | Levels 1-10 (especially lists, loops, searching) |

---

## ⚠️ EXAM CRITICAL LEVEL

Students MUST memorize these algorithms! They need to:
1. Write the algorithms from memory
2. Trace through them step by step
3. Count swaps and comparisons
4. Understand O(N²) complexity

**Focus on understanding the PATTERN, not memorizing code blindly.**

---

## Learning Objectives

By the end of this level, students will be able to:
1. Implement bubble sort from memory
2. Implement optimized bubble sort (early exit)
3. Implement selection sort from memory
4. Trace through sorting algorithms step by step
5. Count comparisons and swaps
6. Explain O(N²) time complexity
7. Understand when to use each algorithm

---

## THE EXAM ALGORITHMS

### BUBBLE SORT (with optimization) - Memorize This!
```python
def bubble_sort(arr):
    """
    Sort arr in ascending order using bubble sort.
    Compares adjacent elements and swaps if out of order.
    Time Complexity: O(N²)
    """
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # Swap
                swapped = True
        if not swapped:
            break  # Already sorted!
    return arr
```

### SELECTION SORT - Memorize This!
```python
def selection_sort(arr):
    """
    Sort arr in ascending order using selection sort.
    Finds minimum element and moves it to sorted portion.
    Time Complexity: O(N²)
    """
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum with current position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

---

## Base Content Sections

### Section 1: Why Sorting Matters

```typescript
{
  title: "1. The Importance of Sorting",
  content: `Sorting is fundamental to computing. Organized data enables:
- Efficient searching (binary search requires sorted data!)
- Finding patterns and duplicates
- Displaying information meaningfully
- Efficient data processing

Many advanced algorithms depend on sorted data. Understanding sorting algorithms teaches core algorithmic thinking.`,
  codeExample: `# Unsorted data is hard to work with
readings = [45, 12, 78, 23, 56, 8, 91]

# Sorted data reveals patterns
sorted_readings = [8, 12, 23, 45, 56, 78, 91]
# Easy to find: min=8, max=91, median=45`
}
```

### Section 2: Bubble Sort Concept

```typescript
{
  title: "2. Bubble Sort: Adjacent Swapping",
  content: `Bubble sort compares adjacent elements and swaps them if out of order. Larger values "bubble up" to the end with each pass.

Process:
1. Compare arr[0] and arr[1], swap if needed
2. Compare arr[1] and arr[2], swap if needed
3. Continue to end - largest now at end
4. Repeat, but stop one earlier each time
5. Stop early if no swaps made (already sorted!)

Time Complexity: O(N²) - nested loops`,
  codeExample: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):  # -i because end is sorted
            if arr[j] > arr[j + 1]:
                # Swap adjacent elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # Optimization: already sorted!
    return arr`
}
```

### Section 3: Bubble Sort Trace

```typescript
{
  title: "3. Tracing Bubble Sort",
  content: `Let's trace bubble_sort([64, 34, 25, 12]):`,
  tableData: {
    headers: ["Pass", "Array State", "Comparisons", "Swaps"],
    rows: [
      ["Start", "[64, 34, 25, 12]", "-", "-"],
      ["Pass 1", "[34, 25, 12, 64]", "3", "3"],
      ["Pass 2", "[25, 12, 34, 64]", "2", "2"],
      ["Pass 3", "[12, 25, 34, 64]", "1", "1"],
      ["Done!", "[12, 25, 34, 64]", "Total: 6", "Total: 6"]
    ]
  },
  codeExample: `# Pass 1 in detail:
# [64, 34, 25, 12]
#   ↓   ↓
# 64 > 34? Yes, swap → [34, 64, 25, 12]
#       ↓   ↓
# 64 > 25? Yes, swap → [34, 25, 64, 12]
#           ↓   ↓
# 64 > 12? Yes, swap → [34, 25, 12, 64]
# 64 is now in correct position!`
}
```

### Section 4: Selection Sort Concept

```typescript
{
  title: "4. Selection Sort: Finding Minimum",
  content: `Selection sort finds the minimum element and puts it in the correct position, one at a time.

Process:
1. Find minimum in entire array
2. Swap it with first element
3. Find minimum in remaining array (index 1 onwards)
4. Swap it with second element
5. Continue until sorted

Time Complexity: O(N²) - nested loops`,
  codeExample: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        # Find minimum in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum with current position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
}
```

### Section 5: Selection Sort Trace

```typescript
{
  title: "5. Tracing Selection Sort",
  content: `Let's trace selection_sort([64, 25, 12, 22]):`,
  tableData: {
    headers: ["Pass", "Sorted | Unsorted", "Min Found", "Swap"],
    rows: [
      ["Start", "[ | 64, 25, 12, 22]", "-", "-"],
      ["Pass 1", "[12 | 25, 64, 22]", "12 at idx 2", "64↔12"],
      ["Pass 2", "[12, 22 | 64, 25]", "22 at idx 3", "25↔22"],
      ["Pass 3", "[12, 22, 25 | 64]", "25 at idx 2", "64↔25"],
      ["Done!", "[12, 22, 25, 64]", "-", "-"]
    ]
  },
  codeExample: `# Pass 1 in detail:
# [64, 25, 12, 22]  
#  i=0
# Find min from index 0 to end: 12 at index 2
# Swap arr[0] with arr[2]
# [12, 25, 64, 22]
# Now 12 is in its final position!`
}
```

### Section 6: Comparison and Analysis

```typescript
{
  title: "6. Comparing Bubble and Selection Sort",
  content: `Both are O(N²) but have different characteristics:`,
  tableData: {
    headers: ["Aspect", "Bubble Sort", "Selection Sort"],
    rows: [
      ["Comparisons", "O(N²)", "O(N²) - same"],
      ["Swaps", "Many (adjacent)", "Few (N-1 max)"],
      ["Early Exit", "Yes (if sorted)", "No"],
      ["Stability", "Stable", "Not stable"],
      ["Best For", "Nearly sorted data", "Minimizing writes"]
    ]
  },
  codeExample: `# For nearly sorted data [1, 2, 4, 3, 5]:
# Bubble sort: Just 1 swap (4 and 3), can exit early
# Selection sort: Still does all passes

# For random data:
# Selection sort makes fewer swaps total
# Bubble sort may swap more frequently

# Both have O(N²) worst case
# For small lists (<50 items), both are fine
# For large lists, use built-in sort (O(N log N))`
}
```

---

## Challenges

### Challenge 1: Bubble Sort

```typescript
{
  id: 1,
  title: "Priority Sort - Bubble",
  description: `Implement bubble sort to organize mission priorities.

Write bubble_sort(arr) that:
1. Uses nested loops (outer: n-1 passes, inner: adjacent comparisons)
2. Compares arr[j] and arr[j+1]
3. Swaps if arr[j] > arr[j+1]
4. Includes the optimization: early exit if no swaps in a pass
5. Returns the sorted array

Test with: priorities = [64, 34, 25, 12, 22, 11, 90]

MEMORIZE THIS PATTERN!`,
  starterCode: `# MISSION: Bubble Sort Implementation
# Sort mission priorities

def bubble_sort(arr):
    n = len(arr)
    # Outer loop: number of passes
    # Inner loop: compare adjacent elements
    # Track swaps for early exit
    pass

# === Mission Control Test ===
priorities = [64, 34, 25, 12, 22, 11, 90]
print(f"Before: {priorities}")
sorted_list = bubble_sort(priorities.copy())
print(f"After: {sorted_list}")`,
  hint: `for i in range(n-1): swapped=False, for j in range(n-1-i): compare and swap. Don't forget arr[j], arr[j+1] = arr[j+1], arr[j] for swap.`,
  conceptTags: ["bubble sort", "algorithm", "memorize"]
}
```

### Challenge 2: Selection Sort

```typescript
{
  id: 2,
  title: "Crew Ranking - Selection",
  description: `Implement selection sort to rank crew by experience.

Write selection_sort(arr) that:
1. For each position i from 0 to n-2:
2. Find the index of minimum value from i to end
3. Swap arr[i] with arr[min_idx]
4. Returns the sorted array

Test with: experience = [15, 8, 23, 4, 16, 42]

MEMORIZE THIS PATTERN!`,
  starterCode: `# MISSION: Selection Sort Implementation
# Sort crew by experience

def selection_sort(arr):
    n = len(arr)
    # For each position in array
    # Find minimum in remaining unsorted portion
    # Swap minimum into current position
    pass

# === Mission Control Test ===
experience = [15, 8, 23, 4, 16, 42]
print(f"Before: {experience}")
sorted_list = selection_sort(experience.copy())
print(f"After: {sorted_list}")`,
  hint: `for i in range(n-1): min_idx = i, for j in range(i+1, n): if arr[j] < arr[min_idx]: min_idx = j. Then swap arr[i] with arr[min_idx].`,
  conceptTags: ["selection sort", "algorithm", "memorize"]
}
```

### Challenge 3: Sort Analysis

```typescript
{
  id: 3,
  title: "Sorting Efficiency Analysis",
  description: `Modify both algorithms to count operations.

Create:
- bubble_sort_count(arr) → returns (sorted_arr, comparisons, swaps)
- selection_sort_count(arr) → returns (sorted_arr, comparisons, swaps)

Count:
- Comparisons: Each if statement comparing elements
- Swaps: Each time elements are exchanged

Test both with: [45, 23, 78, 12, 56, 89, 34]

Compare the number of swaps!`,
  starterCode: `# MISSION: Sort Analysis
# Count operations for efficiency comparison

def bubble_sort_count(arr):
    arr = arr.copy()  # Don't modify original
    comparisons = 0
    swaps = 0
    # Implement with counting
    pass

def selection_sort_count(arr):
    arr = arr.copy()
    comparisons = 0
    swaps = 0
    # Implement with counting
    pass

# === Mission Control Test ===
data = [45, 23, 78, 12, 56, 89, 34]

sorted1, comp1, swap1 = bubble_sort_count(data)
sorted2, comp2, swap2 = selection_sort_count(data)

print(f"Bubble Sort: {comp1} comparisons, {swap1} swaps")
print(f"Selection Sort: {comp2} comparisons, {swap2} swaps")`,
  hint: `Add comparisons += 1 before each if comparison. Add swaps += 1 each time you do arr[x], arr[y] = arr[y], arr[x].`,
  conceptTags: ["analysis", "counting", "efficiency"]
}
```

### Challenge 4: Sort Trace Printer

```typescript
{
  id: 4,
  title: "Visual Sort Tracer",
  description: `Create sorting functions that show each step.

Create visual_bubble_sort(arr) that:
1. Prints the array before starting
2. After each pass, prints: "Pass X: [array state]"
3. At the end, prints: "Sorted in X passes"

Create visual_selection_sort(arr) that:
1. Prints the array before starting
2. After each swap, prints: "Step X: Swapped [val1] and [val2] → [array state]"
3. At the end, prints: "Sorted with X swaps"

This helps visualize how the algorithms work!`,
  starterCode: `# MISSION: Visual Sort Trace
# Show sorting process step by step

def visual_bubble_sort(arr):
    arr = arr.copy()
    print(f"Starting: {arr}")
    # Implement with print after each pass
    pass

def visual_selection_sort(arr):
    arr = arr.copy()
    print(f"Starting: {arr}")
    # Implement with print after each swap
    pass

# === Mission Control Test ===
test_data = [64, 34, 25, 12]

print("=== BUBBLE SORT ===")
visual_bubble_sort(test_data)

print("\\n=== SELECTION SORT ===")
visual_selection_sort(test_data)`,
  hint: `Add print(f"Pass {i+1}: {arr}") after the inner loop in bubble sort. For selection, print the values being swapped.`,
  conceptTags: ["visualization", "tracing", "understanding"]
}
```

---

## Trace Exercises (Include in Base Content)

### Trace Exercise 1: Bubble Sort
Sort [5, 3, 8, 1] using bubble sort.
Show the array after each comparison and swap.

### Trace Exercise 2: Selection Sort
Sort [7, 4, 5, 2] using selection sort.
Show the minimum found and swap for each pass.

---

## Implementation Notes

### Files to Modify

1. **`data/level11_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 11 tasks:
```typescript
{
  id: 11,
  title: "Sorting",
  syllabus: "B2.4.3",
  description: "Organize data for efficient processing.",
  tasks: [
    { id: "11-1", text: "Bubble sort implementation" },
    { id: "11-2", text: "Selection sort implementation" },
    { id: "11-3", text: "Counting comparisons and swaps" },
    { id: "11-4", text: "Visual sorting trace" }
  ]
}
```

### EXAM CRITICAL!
Students must be able to:
1. Write both algorithms from memory
2. Trace through step by step
3. Count swaps and comparisons
4. Explain O(N²) complexity
5. Know the swap syntax: `a, b = b, a`

---

## Expected Outputs

| Challenge | Key Output |
|-----------|------------|
| 1 | [11, 12, 22, 25, 34, 64, 90] |
| 2 | [4, 8, 15, 16, 23, 42] |
| 3 | Selection usually fewer swaps |
| 4 | Step-by-step visualization |

---

*Level 11 Plan - Version 1.0*

