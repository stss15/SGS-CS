---
level: hl
unitNumber: 30
unitName: Recursion
summary: HL extension — the concept of recursion, how recursive algorithms work, and constructing recursive solutions in code.
subtopics:
  - code: B2.4.4
    title: Concept of recursion
  - code: B2.4.5
    title: Constructing recursive algorithms
sourcePolicy: ib_content_md_first
---

## B2.4.4 The concept of recursion

<span data-def="A technique where a function calls itself to solve a problem by breaking it into smaller instances of the same problem. Every recursive function must have a base case that stops the recursion.">Recursion</span> is a problem-solving technique where a function solves a problem by calling itself with a smaller or simpler version of the same problem. The process continues until it reaches a **base case** — a condition where the answer is known directly and no further recursion is needed.

### Structure of a recursive function

Every recursive function has two essential parts:

1. **Base case** — the condition that stops the recursion and returns a known value directly.
2. **Recursive case** — the function calls itself with a modified (usually smaller) input, moving toward the base case.

If the base case is missing or never reached, the function calls itself indefinitely until the system runs out of memory — a **stack overflow**.

### How recursion works: the call stack

Each time a function calls itself, the current state (local variables, parameters, return address) is pushed onto the <span data-def="A region of memory that stores the state of each active function call. Each new call pushes a frame onto the stack; each return pops a frame off.">call stack</span>. When a base case is reached, the function returns a value, and the stack unwinds — each waiting call receives its result and returns in turn.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Factorial using recursion</p>
  <div class="ib-textbook-worked__body">
    <p>The factorial of <em>n</em> (written <em>n!</em>) is defined as:</p>
    <ul>
      <li>Base case: 0! = 1</li>
      <li>Recursive case: n! = n × (n − 1)!</li>
    </ul>
    <pre><code>def factorial(n):
    if n == 0:          # base case
        return 1
    else:               # recursive case
        return n * factorial(n - 1)</code></pre>
    <p>Tracing <code>factorial(4)</code>:</p>
    <table>
      <tr><th>Call</th><th>n</th><th>Action</th><th>Returns</th></tr>
      <tr><td>factorial(4)</td><td>4</td><td>4 × factorial(3)</td><td>waits...</td></tr>
      <tr><td>factorial(3)</td><td>3</td><td>3 × factorial(2)</td><td>waits...</td></tr>
      <tr><td>factorial(2)</td><td>2</td><td>2 × factorial(1)</td><td>waits...</td></tr>
      <tr><td>factorial(1)</td><td>1</td><td>1 × factorial(0)</td><td>waits...</td></tr>
      <tr><td>factorial(0)</td><td>0</td><td>base case</td><td>1</td></tr>
    </table>
    <p><strong>Unwinding:</strong> factorial(1) returns 1×1=1, factorial(2) returns 2×1=2, factorial(3) returns 3×2=6, factorial(4) returns 4×6=<strong>24</strong>.</p>
  </div>
</div>

### Recursion vs iteration

Any recursive algorithm can be rewritten as an iterative one (using loops), and vice versa. The choice depends on clarity and suitability.

| Feature | Recursion | Iteration |
|---------|-----------|-----------|
| Code clarity | Often cleaner for naturally recursive problems (trees, fractals) | Better for simple counting or traversal |
| Memory use | Uses the call stack — risk of stack overflow for deep recursion | Uses constant extra memory |
| Performance | Function call overhead on each recursion | Generally faster |
| When to use | Tree traversal, divide-and-conquer, mathematical definitions | Linear processing, simple loops |

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Forgetting the base case or not making the recursive call move toward it causes infinite recursion. In Python, this produces a <code>RecursionError: maximum recursion depth exceeded</code>. Always verify that the recursive case reduces the problem toward the base case.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.4.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Recursion solves a problem by having a function call itself with a smaller input.</li>
      <li>Every recursive function needs a base case (stops recursion) and a recursive case (calls itself).</li>
      <li>Each recursive call is stored on the call stack; the stack unwinds when the base case is reached.</li>
      <li>Recursion trades memory (call stack) for code clarity — use it when the problem is naturally recursive.</li>
    </ul>
  </div>
</div>


## B2.4.5 Constructing recursive algorithms

At HL, you must be able to construct and trace recursive solutions — not just understand the concept. This section demonstrates recursive approaches to common problems.

### Fibonacci sequence

The Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, F(n) = F(n−1) + F(n−2).

```python
def fibonacci(n):
    if n <= 0:
        return 0           # base case
    elif n == 1:
        return 1           # base case
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)  # recursive case
```

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Efficiency warning</p>
  <p class="ib-textbook-note__body">This naive recursive Fibonacci is O(2ⁿ) because it recalculates the same sub-problems many times. For <code>fibonacci(5)</code>, <code>fibonacci(2)</code> is calculated three separate times. Techniques like memoisation (caching results) eliminate this redundancy, but that is beyond IB scope.</p>
</div>

### Sum of a list

```python
def recursive_sum(lst):
    if len(lst) == 0:       # base case: empty list
        return 0
    else:                    # recursive case: first element + sum of rest
        return lst[0] + recursive_sum(lst[1:])
```

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing recursive_sum([3, 7, 2])</p>
  <div class="ib-textbook-worked__body">
    <table>
      <tr><th>Call</th><th>lst</th><th>Action</th><th>Returns</th></tr>
      <tr><td>recursive_sum([3, 7, 2])</td><td>[3, 7, 2]</td><td>3 + recursive_sum([7, 2])</td><td>waits...</td></tr>
      <tr><td>recursive_sum([7, 2])</td><td>[7, 2]</td><td>7 + recursive_sum([2])</td><td>waits...</td></tr>
      <tr><td>recursive_sum([2])</td><td>[2]</td><td>2 + recursive_sum([])</td><td>waits...</td></tr>
      <tr><td>recursive_sum([])</td><td>[]</td><td>base case</td><td>0</td></tr>
    </table>
    <p><strong>Unwinding:</strong> 2+0=2, 7+2=9, 3+9=<strong>12</strong>.</p>
  </div>
</div>

### Recursive binary search

```python
def binary_search_recursive(data, target, low, high):
    if low > high:
        return -1                          # base case: not found
    mid = (low + high) // 2
    if data[mid] == target:
        return mid                         # base case: found
    elif data[mid] < target:
        return binary_search_recursive(data, target, mid + 1, high)
    else:
        return binary_search_recursive(data, target, low, mid - 1)
```

This mirrors the iterative binary search but replaces the `while` loop with recursive calls, each narrowing the search range.

### Power function

```python
def power(base, exp):
    if exp == 0:             # base case: anything to the power 0 is 1
        return 1
    else:                    # recursive case
        return base * power(base, exp - 1)
```

`power(2, 4)` → 2 × power(2, 3) → 2 × 2 × power(2, 2) → 2 × 2 × 2 × power(2, 1) → 2 × 2 × 2 × 2 × power(2, 0) → 2 × 2 × 2 × 2 × 1 = **16**.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.4.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>You must be able to write and trace recursive solutions for problems like factorial, Fibonacci, list summation, and binary search.</li>
      <li>Identify the base case (when to stop) and the recursive case (how to reduce the problem) before coding.</li>
      <li>Trace by listing each call, showing what it waits for, and then unwinding the return values.</li>
    </ul>
  </div>
</div>
