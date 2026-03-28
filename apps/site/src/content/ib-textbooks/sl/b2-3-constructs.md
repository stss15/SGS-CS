---
level: sl
unitNumber: 33
unitName: Programming Constructs
summary: The four building blocks of every program — sequence, selection, iteration, and modularisation through functions.
subtopics:
  - code: B2.3.1
    title: Sequence
  - code: B2.3.2
    title: Selection
  - code: B2.3.3
    title: Iteration
  - code: B2.3.4
    title: Functions and modularisation
sourcePolicy: ib_content_md_first
---

## B2.3.1 Sequence

<span data-def="The execution of instructions one after another in the order they appear, with each instruction completing before the next begins.">Sequence</span> is the simplest programming construct: instructions are executed one after another, in the order they are written. Every program relies on sequence as its foundation.

```python
name = input("Enter your name: ")
greeting = "Hello, " + name
print(greeting)
```

The three lines execute in strict order. If the order were changed — for example, printing before reading the input — the program would fail or produce incorrect output.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why sequence matters</p>
  <p class="ib-textbook-note__body">Sequence errors are common and subtle. If you calculate a value <em>after</em> you use it, the program may run without crashing but produce incorrect results — a logic error that can be hard to detect.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.3.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Sequence means executing instructions in the order they are written.</li>
      <li>The order of statements affects correctness — variables must be assigned before they are used.</li>
    </ul>
  </div>
</div>


## B2.3.2 Selection

<span data-def="A programming construct where the program chooses between different paths of execution based on a condition that evaluates to true or false.">Selection</span> allows a program to choose between different paths based on a condition. The condition is evaluated, and the path taken depends on whether it is true or false.

### if / elif / else

```python
score = int(input("Enter score: "))

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print("Grade:", grade)
```

- `if` tests the first condition.
- `elif` (else if) tests additional conditions, checked in order.
- `else` catches everything not matched by the conditions above.
- Only **one** branch executes — once a condition is true, the remaining branches are skipped.

### Comparison and logical operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `x == 5` |
| `!=` | Not equal to | `x != 0` |
| `<` | Less than | `x < 10` |
| `>` | Greater than | `x > 0` |
| `<=` | Less than or equal | `x <= 100` |
| `>=` | Greater than or equal | `x >= 18` |
| `and` | Both conditions true | `x > 0 and x < 100` |
| `or` | At least one condition true | `x < 0 or x > 100` |
| `not` | Inverts the condition | `not found` |

### Nested selection

Selection structures can be placed inside each other for more complex decision-making:

```python
age = int(input("Enter age: "))
has_licence = input("Do you have a licence? (y/n): ")

if age >= 17:
    if has_licence == "y":
        print("You can drive")
    else:
        print("You need to get a licence first")
else:
    print("You are too young to drive")
```

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Using <code>=</code> (assignment) instead of <code>==</code> (comparison) in a condition is one of the most frequent selection errors. In Python, <code>if x = 5</code> is a syntax error, but in some other languages it silently assigns the value, causing a hard-to-find logic bug.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.3.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Selection uses <code>if</code>, <code>elif</code>, and <code>else</code> to choose between execution paths based on conditions.</li>
      <li>Conditions use comparison operators (<code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>) and logical operators (<code>and</code>, <code>or</code>, <code>not</code>).</li>
      <li>Only one branch of an <code>if/elif/else</code> chain executes.</li>
      <li>Selection structures can be nested for complex decisions.</li>
    </ul>
  </div>
</div>


## B2.3.3 Iteration

<span data-def="Repeating a block of instructions either a fixed number of times (count-controlled) or while a condition remains true (condition-controlled).">Iteration</span> means repeating a block of code. There are two main forms.

### Count-controlled loops (for)

A <span data-def="A loop that executes a block of code a predetermined number of times, controlled by a counter variable.">count-controlled loop</span> runs a known number of times:

```python
for i in range(5):
    print(i)     # prints 0, 1, 2, 3, 4

for i in range(2, 10, 3):
    print(i)     # prints 2, 5, 8
```

`range(start, stop, step)` generates numbers from `start` up to (but not including) `stop`, incrementing by `step`.

### Condition-controlled loops (while)

A <span data-def="A loop that continues executing as long as a specified condition evaluates to true. The condition is checked before each iteration.">condition-controlled loop</span> repeats while a condition is true:

```python
password = ""
while password != "secret":
    password = input("Enter password: ")
print("Access granted")
```

The loop continues until the user enters the correct password. If the condition is false from the start, the loop body never executes.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">An <strong>infinite loop</strong> occurs when the loop condition never becomes false. This usually happens because the variable in the condition is never updated inside the loop body. Always ensure something inside the loop moves toward termination.</p>
</div>

### Nested loops

A loop inside another loop is a <span data-def="A loop placed inside another loop. The inner loop completes all its iterations for each single iteration of the outer loop.">nested loop</span>. The inner loop completes all its iterations for each single iteration of the outer loop:

```python
for row in range(3):
    for col in range(4):
        print("*", end=" ")
    print()
```

This prints a 3 × 4 grid of asterisks. The inner loop runs 4 times for each of the 3 outer iterations — 12 print operations in total.

### Iterating through collections

```python
names = ["Alice", "Bob", "Charlie"]
for name in names:
    print(name)

for i in range(len(names)):
    print(f"Index {i}: {names[i]}")
```

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.3.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li><code>for</code> loops are count-controlled — use when the number of iterations is known.</li>
      <li><code>while</code> loops are condition-controlled — use when the number of iterations depends on a condition.</li>
      <li>Nested loops multiply: an outer loop of <em>m</em> iterations with an inner loop of <em>n</em> iterations runs the inner body <em>m × n</em> times.</li>
      <li>Always ensure loop conditions can become false to avoid infinite loops.</li>
    </ul>
  </div>
</div>


## B2.3.4 Functions and modularisation

A <span data-def="A named, reusable block of code that performs a specific task. Functions accept inputs (parameters), execute a body of instructions, and optionally return a result.">function</span> is a named, reusable block of code that performs a specific task. Functions are the primary tool for <span data-def="Organising a program into independent, reusable modules (functions, procedures, classes) that each handle one responsibility.">modularisation</span> — breaking a program into smaller, manageable, testable pieces.

### Defining and calling functions

```python
def calculate_area(length, width):
    area = length * width
    return area

result = calculate_area(5, 3)
print(result)  # 15
```

- `def` declares the function with a name and **parameters** (inputs).
- The function body contains the instructions to execute.
- `return` sends a value back to the calling code.
- **Arguments** are the actual values passed when the function is called.

### Functions without return values

Not every function needs to return a value. Functions that perform an action (like printing) without returning data are sometimes called **procedures**:

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # prints "Hello, Alice!"
```

### Why modularisation matters

- **Readability** — a well-named function describes what a section of code does without you reading every line.
- **Reusability** — write the logic once and call it from multiple places.
- **Testability** — each function can be tested independently.
- **Collaboration** — different team members can work on different functions.
- **Maintenance** — fixing a bug in a function fixes it everywhere the function is used.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Modularising a grade calculator</p>
  <div class="ib-textbook-worked__body">
    <pre><code>def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"

def process_student(name, score):
    grade = get_grade(score)
    print(f"{name}: {grade}")

process_student("Alice", 85)   # Alice: B
process_student("Bob", 92)     # Bob: A
process_student("Charlie", 68) # Charlie: F</code></pre>
    <p>Each function has one clear responsibility. <code>get_grade()</code> handles the grading logic; <code>process_student()</code> handles the output. If the grading boundaries change, only <code>get_grade()</code> needs updating.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.3.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Functions are named, reusable code blocks with parameters, a body, and an optional return value.</li>
      <li>Modularisation improves readability, reusability, testability, and maintenance.</li>
      <li>Each function should have one clear responsibility.</li>
      <li>Parameters are the names in the definition; arguments are the values passed when calling.</li>
    </ul>
  </div>
</div>
