---
level: sl
unitNumber: 4
unitName: Algorithmic Control
summary: Revise Algorithmic Control with exam-focused coverage of B2.3.1, B2.4.1, B2.4.2, B2.4.3, B2.5.1, including exact command-term expectations and applied examples.
subtopics:
  - code: B2.3.1
    title: Control Structures
  - code: B2.4.1
    title: Algorithm Efficiency (Big O)
  - code: B2.4.2
    title: Linear & Binary Search
  - code: B2.4.3
    title: Bubble & Selection Sort
  - code: B2.5.1
    title: File Processing
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Sequence | Instructions executed one after another in the order they appear. |
| Selection | A decision point where the program chooses a path based on a condition (`if`/`elif`/`else`). |
| Iteration | Repeating a block of code — either a fixed number of times (count-controlled) or while a condition holds (condition-controlled). |
| Count-controlled loop | A loop that runs a predetermined number of times (e.g. `for i in range(10)`). |
| Condition-controlled loop | A loop that runs until a condition becomes false (e.g. `while not found`). |
| Nested loop | A loop inside another loop — the inner loop completes all its iterations for each single iteration of the outer loop. |
| Big O notation | A mathematical shorthand describing how an algorithm's time or space requirements grow as input size increases. |
| Time complexity | How the number of operations grows relative to input size. |
| Linear search | Checking every element in order until the target is found or the end is reached — O(n). |
| Binary search | Repeatedly halving a **sorted** list to locate a target — O(log n). |
| Bubble sort | Repeatedly swapping adjacent elements that are in the wrong order — O(n²). |
| Selection sort | Finding the smallest unsorted element and swapping it into position — O(n²). |
| File processing | Reading from, writing to, or appending data to files stored on secondary storage. |
| Persistent storage | Data that survives after the program ends — stored in files rather than RAM. |
| Append mode | Opening a file so new data is added to the end without overwriting existing content. |


## B2.3.1 Control Structures

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** programs using correct sequencing, selection, and iteration. You must write code that uses `if`/`elif`/`else` for decisions and both `for` and `while` loops for repetition — and you must be able to trace through nested structures.

**The three building blocks of all programs:**

| Construct | Purpose | Python pattern |
| --- | --- | --- |
| **Sequence** | Execute instructions in order | Lines run top to bottom |
| **Selection** | Choose a path based on a condition | `if … elif … else` |
| **Iteration** | Repeat a block of code | `for` (count) / `while` (condition) |

Every algorithm ever written is built from combinations of these three.

</div>

### Worked example: input validation loop

<div class="reader-section-body reader-section-body--example">

A common exam pattern is validating user input — keep asking until the input is acceptable:

```python
# Validate a test score between 0 and 100
score = int(input("Enter score (0-100): "))

while score < 0 or score > 100:
    print("Invalid. Must be between 0 and 100.")
    score = int(input("Enter score (0-100): "))

# At this point, score is guaranteed valid
if score >= 70:
    grade = "A"
elif score >= 50:
    grade = "B"
else:
    grade = "C"

print(f"Grade: {grade}")
```

**Why `while` and not `if`?** An `if` statement checks once. A `while` loop keeps checking — if the user enters `-5`, then `200`, then `75`, the loop rejects the first two and accepts the third.

</div>

### Nested loops: understanding the multiplication effect

<div class="reader-section-body reader-section-body--apply">

When you nest one loop inside another, the inner loop runs **completely** for every single iteration of the outer loop:

```python
for row in range(3):        # outer: runs 3 times
    for col in range(4):    # inner: runs 4 times PER outer iteration
        print(f"({row},{col})", end=" ")
    print()  # new line after each row
```

**Output:**
```
(0,0) (0,1) (0,2) (0,3)
(1,0) (1,1) (1,2) (1,3)
(2,0) (2,1) (2,2) (2,3)
```

Total `print` calls = 3 × 4 = **12**. This multiplication effect is why nested loops create O(n²) time complexity — a key concept for B2.4.1.

**Exam tip:** When tracing a nested loop, write the outer variable in one column and the inner variable in another. The inner column resets to its starting value every time the outer variable changes.

</div>


## B2.4.1 Algorithm Efficiency (Big O)

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **describe** the efficiency of algorithms using Big O notation. You need to calculate and compare O(1), O(n), and O(n²) — and explain what they mean in practical terms.

Big O describes the **worst-case growth rate** — how the number of operations scales as input size (`n`) increases:

| Big O | Name | What it means | Example |
| --- | --- | --- | --- |
| **O(1)** | Constant | Same speed regardless of input size | Accessing `list[5]` (direct index) |
| **O(n)** | Linear | Doubles the input → doubles the time | Linear search through an unsorted list |
| **O(n²)** | Quadratic | Doubles the input → quadruples the time | Bubble sort, selection sort |
| **O(log n)** | Logarithmic | Doubles the input → adds one more step | Binary search on a sorted list |

</div>

### How to calculate Big O from code

<div class="reader-section-body reader-section-body--example">

**Rule 1:** A single loop over `n` items = O(n)
```python
# O(n) — one pass through the list
total = 0
for item in data:
    total += item
```

**Rule 2:** A nested loop over `n` items = O(n²)
```python
# O(n²) — for each item, check every other item
for i in range(len(data)):
    for j in range(len(data)):
        if data[i] == data[j] and i != j:
            print("Duplicate found")
```

**Rule 3:** Halving the search space each step = O(log n)
```python
# O(log n) — binary search halves the range each iteration
low, high = 0, len(data) - 1
while low <= high:
    mid = (low + high) // 2
    if data[mid] == target:
        break
    elif data[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
```

**Rule 4:** Operations that don't depend on input size = O(1)
```python
# O(1) — always the same number of operations
first = data[0]
last = data[-1]
```

</div>

### Why Big O matters in practice

<div class="reader-section-body reader-section-body--apply">

| Input size (n) | O(n) operations | O(n²) operations | O(log n) operations |
| --- | --- | --- | --- |
| 10 | 10 | 100 | ~3 |
| 100 | 100 | 10,000 | ~7 |
| 1,000 | 1,000 | 1,000,000 | ~10 |
| 1,000,000 | 1,000,000 | 1,000,000,000,000 | ~20 |

At n = 1,000,000, an O(n²) algorithm requires **one trillion** operations — it would take minutes or hours. An O(n) algorithm handles the same data in a fraction of a second.

**Exam tip:** The command term is *Describe*, so write in full sentences: "This algorithm is O(n²) **because** it uses a nested loop — for each of the n elements, it compares against all n elements, giving n × n = n² comparisons in the worst case."

</div>


## B2.4.2 Linear & Binary Search

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** and **trace** both linear search and binary search. You must write the code and step through it with specific test data.

| Feature | Linear Search | Binary Search |
| --- | --- | --- |
| **Prerequisite** | None — works on any list | List must be **sorted** |
| **Method** | Check each element from start to end | Halve the search range each step |
| **Best case** | O(1) — target is the first element | O(1) — target is the middle element |
| **Worst case** | O(n) — target is last or not present | O(log n) — keeps halving until found or range exhausted |
| **Use when** | Small or unsorted data | Large, sorted data |

</div>

### Worked trace: linear search

<div class="reader-section-body reader-section-body--example">

```python
def linear_search(data, target):
    for i in range(len(data)):
        if data[i] == target:
            return i        # found — return the index
    return -1               # not found

names = ["Ali", "Beth", "Carlos", "Diana", "Eve"]
result = linear_search(names, "Diana")
print(result)  # Output: 3
```

**Trace for target = "Diana":**

| Step | `i` | `data[i]` | `data[i] == "Diana"` | Action |
| --- | --- | --- | --- | --- |
| 1 | 0 | "Ali" | False | Continue |
| 2 | 1 | "Beth" | False | Continue |
| 3 | 2 | "Carlos" | False | Continue |
| 4 | 3 | "Diana" | **True** | Return 3 ✓ |

4 comparisons needed. In the worst case (target not present), all 5 elements would be checked.

</div>

### Worked trace: binary search

<div class="reader-section-body reader-section-body--example">

```python
def binary_search(data, target):
    low = 0
    high = len(data) - 1

    while low <= high:
        mid = (low + high) // 2
        if data[mid] == target:
            return mid
        elif data[mid] < target:
            low = mid + 1       # target is in the right half
        else:
            high = mid - 1      # target is in the left half

    return -1                    # not found

numbers = [3, 7, 12, 19, 24, 31, 45]
result = binary_search(numbers, 19)
print(result)  # Output: 3
```

**Trace for target = 19:**

| Step | `low` | `high` | `mid` | `data[mid]` | Comparison | Action |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 6 | 3 | 19 | 19 == 19 | **Found at index 3** ✓ |

Only 1 comparison! If the target were 7:

| Step | `low` | `high` | `mid` | `data[mid]` | Comparison | Action |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 6 | 3 | 19 | 7 < 19 | Search left: `high = 2` |
| 2 | 0 | 2 | 1 | 7 | 7 == 7 | **Found at index 1** ✓ |

2 comparisons for 7 elements — that is the power of O(log n).

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Reality |
| --- | --- |
| "Binary search works on any list" | It **only** works on sorted data. If the list is unsorted, the halving logic breaks. |
| "Binary search is always better" | For very small lists (under ~10 items), linear search can be faster due to less overhead. |
| "`mid = (low + high) / 2` is fine" | You must use **integer division** (`//`). Regular division gives a float, which cannot be used as an index. |
| "If `data[mid] < target`, search left" | No — if the midpoint is less than the target, the target must be in the **right** half. Set `low = mid + 1`. |

</div>


## B2.4.3 Bubble & Selection Sort

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** and **trace** both bubble sort and selection sort. Both are O(n²), but they work differently — you must understand the mechanics of each.

| Feature | Bubble Sort | Selection Sort |
| --- | --- | --- |
| **Method** | Compare adjacent pairs, swap if wrong order; repeat until no swaps needed | Find the smallest unsorted element, swap it into the next sorted position |
| **Passes** | Up to n−1 passes through the list | Exactly n−1 passes |
| **Best case** | O(n) if already sorted (with early exit flag) | O(n²) always — must scan even if sorted |
| **Swaps** | Many — every adjacent pair that's wrong gets swapped | Few — exactly one swap per pass |
| **Stability** | Stable (equal items keep their original order) | Not stable |

</div>

### Worked trace: bubble sort

<div class="reader-section-body reader-section-body--example">

```python
def bubble_sort(data):
    n = len(data)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if data[j] > data[j + 1]:
                data[j], data[j + 1] = data[j + 1], data[j]
                swapped = True
        if not swapped:
            break  # early exit if no swaps occurred
    return data

print(bubble_sort([5, 3, 8, 1, 2]))
```

**Trace: sorting `[5, 3, 8, 1, 2]`**

| Pass | Comparisons & swaps | List after pass |
| --- | --- | --- |
| 1 | 5↔3 swap, 5↔8 no, 8↔1 swap, 8↔2 swap | `[3, 5, 1, 2, 8]` |
| 2 | 3↔5 no, 5↔1 swap, 5↔2 swap | `[3, 1, 2, 5, 8]` |
| 3 | 3↔1 swap, 3↔2 swap | `[1, 2, 3, 5, 8]` |
| 4 | 1↔2 no → `swapped = False` → early exit | `[1, 2, 3, 5, 8]` ✓ |

Notice: after each pass, the largest unsorted element "bubbles" to the end. That is why `range(n - 1 - i)` shortens the inner loop each time.

</div>

### Worked trace: selection sort

<div class="reader-section-body reader-section-body--example">

```python
def selection_sort(data):
    n = len(data)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if data[j] < data[min_index]:
                min_index = j
        data[i], data[min_index] = data[min_index], data[i]
    return data

print(selection_sort([5, 3, 8, 1, 2]))
```

**Trace: sorting `[5, 3, 8, 1, 2]`**

| Pass | `i` | Scanned range | Minimum found | Swap | List after pass |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | indices 1–4 | `1` at index 3 | Swap `data[0]` ↔ `data[3]` | `[1, 3, 8, 5, 2]` |
| 2 | 1 | indices 2–4 | `2` at index 4 | Swap `data[1]` ↔ `data[4]` | `[1, 2, 8, 5, 3]` |
| 3 | 2 | indices 3–4 | `3` at index 4 | Swap `data[2]` ↔ `data[4]` | `[1, 2, 3, 5, 8]` |
| 4 | 3 | index 4 | `5` at index 3 | No swap needed | `[1, 2, 3, 5, 8]` ✓ |

Key difference from bubble sort: selection sort makes **exactly one swap per pass** — it finds the minimum first, then swaps once.

**Exam tip:** When asked to *trace*, set up a table showing the list state after each pass, not just the final result. Partial marks depend on showing the intermediate states clearly.

</div>


## B2.5.1 File Processing

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** code that reads from, writes to, and appends to text files. File processing is how programs create **persistent storage** — data that survives after the program ends.

**The three file modes:**

| Mode | Python code | What it does | Danger |
| --- | --- | --- | --- |
| **Read** | `open("file.txt", "r")` | Reads existing content; fails if file doesn't exist | None — read-only |
| **Write** | `open("file.txt", "w")` | Creates a new file or **overwrites** an existing one | ⚠️ Destroys all previous content |
| **Append** | `open("file.txt", "a")` | Adds new content to the **end** of the file | None — preserves existing content |

Always close files after use, or use `with` to handle it automatically.

</div>

### Worked example: a student score logger

<div class="reader-section-body reader-section-body--example">

**Writing scores to a file:**
```python
# Write mode — creates the file (or overwrites it)
with open("scores.txt", "w") as f:
    f.write("Ali,72\n")
    f.write("Beth,85\n")
    f.write("Carlos,63\n")
```

**File contents after running:**
```
Ali,72
Beth,85
Carlos,63
```

**Appending a new score:**
```python
# Append mode — adds to the end without destroying existing data
with open("scores.txt", "a") as f:
    f.write("Diana,91\n")
```

**Reading and processing the file:**
```python
# Read mode — process each line
with open("scores.txt", "r") as f:
    for line in f:
        parts = line.strip().split(",")
        name = parts[0]
        score = int(parts[1])
        if score >= 70:
            print(f"{name} passed with {score}")
```

**Output:**
```
Ali passed with 72
Beth passed with 85
Diana passed with 91
```

</div>

### Common file processing errors

<div class="reader-section-body reader-section-body--apply">

| Error | Cause | Prevention |
| --- | --- | --- |
| `FileNotFoundError` | Trying to read a file that doesn't exist | Use `try`/`except` or check with `os.path.exists()` |
| Lost data | Using `"w"` mode on a file you meant to append to | Always double-check: **"w" = wipe**, **"a" = add** |
| Extra blank lines | Forgetting that `\n` is already at the end of each line read from a file | Use `.strip()` to remove trailing newlines |
| Data type errors | Reading `"72"` as a string instead of converting to `int` | Always cast: `int(parts[1])` or `float(parts[1])` |

**The `with` statement:** Using `with open(…) as f:` automatically closes the file when the block ends — even if an error occurs. This is the recommended pattern and the one expected in exams.

**Exam tip:** File processing questions often combine with other topics — reading a list from a file, sorting it, then writing the result to a new file. Practise this end-to-end pattern: **read → process → write**.

</div>
