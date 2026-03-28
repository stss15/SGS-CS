---
level: sl
unitNumber: 34
unitName: Programming Algorithms
summary: Algorithm efficiency using Big O notation, searching algorithms (linear and binary), and sorting algorithms (bubble sort and selection sort) — with traced walkthroughs and complexity analysis.
subtopics:
  - code: B2.4.1
    title: Big O notation
  - code: B2.4.2
    title: Linear and binary search
  - code: B2.4.3
    title: Bubble sort and selection sort
sourcePolicy: ib_content_md_first
---

## B2.4.1 Algorithm efficiency and Big O notation

Not all algorithms that solve the same problem are equally efficient. <span data-def="A mathematical notation that describes the upper bound of an algorithm's time or space requirements as the input size grows. It expresses how performance scales, not exact speed.">Big O notation</span> provides a way to describe how an algorithm's performance scales as the input size increases.

Big O focuses on the **growth rate**, not the exact number of operations. It answers the question: "If I double the input size, how much longer does the algorithm take?"

### Common Big O complexities

| Notation | Name | Growth | Example |
|----------|------|--------|---------|
| O(1) | Constant | Same time regardless of input size | Accessing an array element by index |
| O(log n) | Logarithmic | Doubles input → one extra step | Binary search |
| O(n) | Linear | Doubles input → double the time | Linear search |
| O(n log n) | Linearithmic | Efficient sorting | Merge sort |
| O(n²) | Quadratic | Doubles input → four times the time | Bubble sort, selection sort |
| O(2ⁿ) | Exponential | Grows extremely fast | Brute-force password cracking |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">How to determine Big O</p>
  <p class="ib-textbook-note__body">Count the dominant operation (usually comparisons or assignments) as a function of input size <em>n</em>. A single loop through <em>n</em> items is O(n). A nested loop where both iterate over <em>n</em> items is O(n²). Constant operations outside loops are O(1) and are ignored when a larger term exists.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Comparing O(n) and O(n²) growth</p>
  <div class="ib-textbook-worked__body">
    <table>
      <tr><th>n (input size)</th><th>O(n) operations</th><th>O(n²) operations</th></tr>
      <tr><td>10</td><td>10</td><td>100</td></tr>
      <tr><td>100</td><td>100</td><td>10,000</td></tr>
      <tr><td>1,000</td><td>1,000</td><td>1,000,000</td></tr>
      <tr><td>10,000</td><td>10,000</td><td>100,000,000</td></tr>
    </table>
    <p>At small input sizes the difference is negligible. At 10,000 items, the O(n²) algorithm performs 10,000 times more operations than the O(n) algorithm. This is why efficiency matters.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.4.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Big O describes how an algorithm's performance scales with input size.</li>
      <li>Common complexities, from fastest to slowest: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ).</li>
      <li>A single loop is typically O(n); a nested loop is O(n²); halving the search space each step is O(log n).</li>
    </ul>
  </div>
</div>


## B2.4.2 Searching algorithms

### Linear search

<span data-def="A searching algorithm that checks every element in a list from start to end until the target is found or the list is exhausted. Works on any list, sorted or unsorted.">Linear search</span> checks each element in order, starting from the first, until the target is found or the end is reached.

```python
def linear_search(data, target):
    for i in range(len(data)):
        if data[i] == target:
            return i       # found — return the index
    return -1              # not found
```

**Time complexity:** O(n) — in the worst case, every element is checked.

**Advantages:** works on unsorted data; simple to implement.

**Disadvantages:** slow for large datasets.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing linear search</p>
  <div class="ib-textbook-worked__body">
    <p>Search for <code>7</code> in <code>[3, 8, 1, 7, 5]</code>.</p>
    <table>
      <tr><th>i</th><th>data[i]</th><th>data[i] == 7?</th></tr>
      <tr><td>0</td><td>3</td><td>No</td></tr>
      <tr><td>1</td><td>8</td><td>No</td></tr>
      <tr><td>2</td><td>1</td><td>No</td></tr>
      <tr><td>3</td><td>7</td><td>Yes → return 3</td></tr>
    </table>
    <p>Found at index 3 after 4 comparisons.</p>
  </div>
</div>

### Binary search

<span data-def="A searching algorithm that repeatedly halves a sorted list by comparing the target to the middle element. Much faster than linear search but requires the data to be sorted.">Binary search</span> works only on **sorted** data. It repeatedly compares the target to the middle element and eliminates half the remaining data each time.

```python
def binary_search(data, target):
    low = 0
    high = len(data) - 1
    while low <= high:
        mid = (low + high) // 2
        if data[mid] == target:
            return mid
        elif data[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

**Time complexity:** O(log n) — each comparison halves the search space.

**Advantages:** very fast for large sorted datasets.

**Disadvantages:** requires sorted data; more complex to implement.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing binary search</p>
  <div class="ib-textbook-worked__body">
    <p>Search for <code>23</code> in <code>[5, 10, 15, 20, 23, 30, 35]</code>.</p>
    <table>
      <tr><th>Step</th><th>low</th><th>high</th><th>mid</th><th>data[mid]</th><th>Action</th></tr>
      <tr><td>1</td><td>0</td><td>6</td><td>3</td><td>20</td><td>23 &gt; 20 → low = 4</td></tr>
      <tr><td>2</td><td>4</td><td>6</td><td>5</td><td>30</td><td>23 &lt; 30 → high = 4</td></tr>
      <tr><td>3</td><td>4</td><td>4</td><td>4</td><td>23</td><td>Found → return 4</td></tr>
    </table>
    <p>Found at index 4 after only 3 comparisons (linear search would need 5).</p>
  </div>
</div>

### Comparing linear and binary search

| Feature | Linear search | Binary search |
|---------|--------------|---------------|
| Requires sorted data? | No | Yes |
| Time complexity | O(n) | O(log n) |
| Best case | O(1) — first element | O(1) — middle element |
| Suitable for | Small or unsorted datasets | Large sorted datasets |
| Implementation | Simple | More complex |

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.4.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Linear search checks every element in order — O(n), works on unsorted data.</li>
      <li>Binary search halves the search space each step — O(log n), requires sorted data.</li>
      <li>For large datasets, binary search is dramatically faster, but the data must be sorted first.</li>
    </ul>
  </div>
</div>


## B2.4.3 Sorting algorithms

### Bubble sort

<span data-def="A sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process repeats until no swaps are needed.">Bubble sort</span> repeatedly passes through the list, comparing adjacent elements and swapping them if they are in the wrong order. After each pass, the largest unsorted element "bubbles up" to its correct position.

```python
def bubble_sort(data):
    n = len(data)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if data[j] > data[j + 1]:
                data[j], data[j + 1] = data[j + 1], data[j]
    return data
```

**Time complexity:** O(n²) — even in the average case.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing bubble sort</p>
  <div class="ib-textbook-worked__body">
    <p>Sort <code>[5, 3, 8, 1]</code>.</p>
    <p><strong>Pass 1:</strong></p>
    <ul>
      <li>Compare 5, 3 → swap → [<strong>3, 5</strong>, 8, 1]</li>
      <li>Compare 5, 8 → no swap → [3, 5, 8, 1]</li>
      <li>Compare 8, 1 → swap → [3, 5, <strong>1, 8</strong>]</li>
    </ul>
    <p><strong>Pass 2:</strong></p>
    <ul>
      <li>Compare 3, 5 → no swap → [3, 5, 1, 8]</li>
      <li>Compare 5, 1 → swap → [3, <strong>1, 5</strong>, 8]</li>
    </ul>
    <p><strong>Pass 3:</strong></p>
    <ul>
      <li>Compare 3, 1 → swap → [<strong>1, 3</strong>, 5, 8]</li>
    </ul>
    <p>Result: <code>[1, 3, 5, 8]</code>. Three passes needed for four elements.</p>
  </div>
</div>

### Selection sort

<span data-def="A sorting algorithm that repeatedly finds the smallest element from the unsorted portion of the list and swaps it into the next position in the sorted portion.">Selection sort</span> divides the list into a sorted portion (initially empty) and an unsorted portion. On each pass, it finds the smallest element in the unsorted portion and swaps it into the next position.

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
```

**Time complexity:** O(n²) — always makes the same number of comparisons.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing selection sort</p>
  <div class="ib-textbook-worked__body">
    <p>Sort <code>[5, 3, 8, 1]</code>.</p>
    <p><strong>Pass 1:</strong> Find minimum in [5, 3, 8, 1] → 1 at index 3. Swap with index 0 → [<strong>1</strong>, 3, 8, 5]</p>
    <p><strong>Pass 2:</strong> Find minimum in [3, 8, 5] → 3 at index 1. Already in place → [1, <strong>3</strong>, 8, 5]</p>
    <p><strong>Pass 3:</strong> Find minimum in [8, 5] → 5 at index 3. Swap with index 2 → [1, 3, <strong>5</strong>, 8]</p>
    <p>Result: <code>[1, 3, 5, 8]</code>.</p>
  </div>
</div>

### Comparing bubble sort and selection sort

| Feature | Bubble sort | Selection sort |
|---------|------------|----------------|
| Time complexity | O(n²) | O(n²) |
| Number of swaps | Many (every adjacent pair) | Few (one per pass) |
| Best case | O(n) with early termination | O(n²) — always scans fully |
| Stability | Stable (preserves order of equal elements) | Not stable by default |
| Memory | In-place (O(1) extra space) | In-place (O(1) extra space) |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Neither is efficient for large data</p>
  <p class="ib-textbook-note__body">Both bubble sort and selection sort are O(n²), which makes them impractical for large datasets. More efficient algorithms like merge sort (O(n log n)) exist but are not required at SL. The IB tests these algorithms because they are simple enough to trace by hand and illustrate key algorithmic concepts.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.4.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Bubble sort compares and swaps adjacent elements repeatedly — O(n²), many swaps.</li>
      <li>Selection sort finds the minimum unsorted element and places it next — O(n²), fewer swaps.</li>
      <li>Both are O(n²) and suitable only for small datasets, but they are important to understand and trace.</li>
      <li>You must be able to trace both algorithms step by step for given data.</li>
    </ul>
  </div>
</div>
