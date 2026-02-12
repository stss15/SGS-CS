---
level: sl
unitNumber: 2
unitName: Programming Fundamentals
summary: Revise Programming Fundamentals with exam-focused coverage of B2.1.1, B2.1.2, B2.3.3, B2.1.3, B2.1.4, including exact command-term expectations and applied examples.
subtopics:
  - code: B2.1.1
    title: Variables & Data Types
  - code: B2.1.2
    title: String Manipulation
  - code: B2.3.3
    title: Looping Constructs (for/while)
  - code: B2.1.3
    title: Exception Handling
  - code: B2.1.4
    title: Debugging Techniques
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Variable | A named storage location in memory whose value can change during execution. |
| Data type | A classification that determines what operations can be performed on a value — e.g. integer, float, boolean, string. |
| Scope | The region of code where a variable is accessible. Local scope = inside a function; global scope = everywhere. |
| Global variable | A variable declared outside all functions, accessible from any point in the program. |
| Local variable | A variable declared inside a function, only accessible within that function. |
| String | A sequence of characters stored as text, accessed by index positions starting at 0. |
| Substring | A contiguous portion of a string, extracted using slicing (start and end index). |
| Concatenation | Joining two or more strings end-to-end using the `+` operator. |
| Exception | A runtime error that disrupts normal program flow (e.g. dividing by zero, invalid type conversion). |
| Exception handling | Using `try`/`except` blocks to intercept errors and provide a controlled response instead of crashing. |
| Trace table | A structured record of variable values, conditions, and outputs at each step of execution. |
| Breakpoint | A marker set in an IDE that pauses execution at a specific line so the programmer can inspect state. |
| Iteration | Repeating a block of instructions until a count is reached or a condition changes. |
| Count-controlled loop | A loop that runs a known number of times, usually using `for`. |
| Condition-controlled loop | A loop that continues while a condition remains true, usually using `while`. |
| Syntax error | A violation of the language's grammar rules — the code cannot run at all. |
| Logic error | Code runs without crashing but produces incorrect results due to flawed reasoning. |
| Runtime error | An error that occurs during execution, such as accessing an index that does not exist. |


## B2.1.1 Variables & Data Types

**Command term:** Construct

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** programs that use variables correctly and **trace** their values through execution. This means you must demonstrate working code using global and local variables with the four standard data types, and you must be able to follow a program line-by-line showing how each variable changes.

Every variable has three properties you must reason about:

| Property | What it means | Why it matters in an exam |
| --- | --- | --- |
| **Name** | An identifier that refers to the stored value | Choose descriptive names — `total_score` not `x` |
| **Type** | Integer, float, boolean, or string | Determines which operations are valid (you cannot add a string to an integer without conversion) |
| **Scope** | Local (inside a function) or global (module-level) | Scope errors are the most common source of "variable not defined" bugs in exams |

**The four standard data types:**

| Type | Example value | Typical use |
| --- | --- | --- |
| Integer | `42`, `-7` | Counting, indexing, loop counters |
| Float | `3.14`, `-0.5` | Measurements, averages, division results |
| Boolean | `True`, `False` | Flags, conditions, validation checks |
| String | `"hello"`, `"Y13"` | Names, messages, user input (always arrives as string) |

</div>

### Scope: the number-one exam trap

<div class="reader-section-body reader-section-body--apply">

The most common mistake in exams is confusing local and global scope. Study this example carefully:

```python
discount = 0.1  # global variable — accessible everywhere

def apply_discount(price):
    # 'price' is local — it only exists inside this function
    final = price * (1 - discount)  # reads the global 'discount'
    return final

result = apply_discount(50.00)
print(result)  # Output: 45.0
print(price)   # ERROR: 'price' is not defined (it was local to the function)
```

**Rules to memorise:**
- A **local variable** is created when its function is called and destroyed when the function returns.
- A **global variable** persists for the entire program.
- A function **can read** a global variable but **should not modify** it directly — use parameters and return values instead.
- If a local variable has the same name as a global, the local one **shadows** the global inside that function.

**Exam tip:** When a trace question involves functions, draw a box around each function call. Variables inside the box are local — they vanish when the box closes.

</div>

### Worked trace: calculating an average

<div class="reader-section-body reader-section-body--example">

Trace this program by hand before reading the table below:

```python
total = 0           # global
count = 0           # global

def add_score(score):
    global total, count
    total = total + score
    count = count + 1

add_score(72)
add_score(85)
add_score(63)
average = total / count
print(average)
```

| Step | Line | `total` | `count` | `score` (local) | Output |
| --- | --- | --- | --- | --- | --- |
| 1 | `total = 0` | 0 | — | — | — |
| 2 | `count = 0` | 0 | 0 | — | — |
| 3 | `add_score(72)` | 72 | 1 | 72 | — |
| 4 | `add_score(85)` | 157 | 2 | 85 | — |
| 5 | `add_score(63)` | 220 | 3 | 63 | — |
| 6 | `average = total / count` | 220 | 3 | — | — |
| 7 | `print(average)` | 220 | 3 | — | `73.33…` |

Notice that `score` only exists during each function call — it is local and gets a fresh value each time.

</div>


## B2.1.2 String Manipulation

**Command term:** Construct

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** programs that extract and manipulate substrings. This means writing working code that slices strings, accesses individual characters, and transforms text — not just describing what string operations do.

Strings are sequences of characters. Each character sits at an **index position** starting at 0:

```
 S  G  S  _  S  t  u  d  e  n  t
[0][1][2][3][4][5][6][7][8][9][10]
```

**Essential string operations:**

| Operation | Python syntax | Example | Result |
| --- | --- | --- | --- |
| Access a character | `s[i]` | `"Student"[0]` | `"S"` |
| Slice (substring) | `s[start:end]` | `"Student"[0:3]` | `"Stu"` |
| Slice from start | `s[:n]` | `"Student"[:4]` | `"Stud"` |
| Slice to end | `s[n:]` | `"Student"[4:]` | `"ent"` |
| Negative index | `s[-n]` | `"Student"[-1]` | `"t"` |
| Length | `len(s)` | `len("Student")` | `7` |
| Uppercase | `s.upper()` | `"hello".upper()` | `"HELLO"` |
| Lowercase | `s.lower()` | `"HELLO".lower()` | `"hello"` |
| Find position | `s.find(sub)` | `"hello".find("ll")` | `2` |
| Concatenation | `s1 + s2` | `"Year" + "13"` | `"Year13"` |

**Key rule:** slicing uses `[start:end]` where `start` is inclusive and `end` is exclusive. The character at index `end` is *not* included. This is the most common source of off-by-one errors.

</div>

### Worked example: extracting data from a student ID

<div class="reader-section-body reader-section-body--example">

Your school uses student IDs in the format `SGS-Y13-0042` where:
- Characters 0–2 = school code
- Character 4–6 = year group
- Characters 8–11 = student number

```python
student_id = "SGS-Y13-0042"

school = student_id[0:3]        # "SGS"
year_group = student_id[4:7]    # "Y13"
number = student_id[8:]         # "0042"

# Build a display name
display = school + " " + year_group + " #" + number
print(display)  # Output: SGS Y13 #0042

# Check if the student is in Year 13
if year_group == "Y13":
    print("IB Diploma year")
```

**IB pseudocode equivalent:**
```
STUDENT_ID = "SGS-Y13-0042"
SCHOOL = STUDENT_ID.substring(0, 3)
YEAR_GROUP = STUDENT_ID.substring(4, 7)
```

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

| Misconception | Reality |
| --- | --- |
| "Strings start at index 1" | In Python (and IB pseudocode), strings are **0-indexed**. The first character is at position 0. |
| "`s[2:5]` gives me 4 characters" | It gives exactly `5 - 2 = 3` characters. The end index is exclusive. |
| "I can change a character with `s[0] = 'X'`" | Strings are **immutable** in Python. You must build a new string: `s = 'X' + s[1:]` |
| "`len()` returns the last index" | `len("cat")` returns `3`, but the last valid index is `2`. The last index is always `len(s) - 1`. |

**Exam tip:** When an exam gives you a string and asks you to construct slicing code, count the index positions on your fingers. Write the indices above each character in the question booklet — it takes 10 seconds and prevents the most common errors.

</div>


## B2.1.3 Exception Handling

**Command term:** Describe

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **describe** how programs use exception handling techniques. You need to explain the purpose of `try`/`except` blocks, identify the types of errors they catch, and explain why they are essential for robust programs — but you do not need to construct complex exception hierarchies.

Exception handling separates **normal flow** from **error recovery**. Without it, a single bad input can crash an entire program:

| Concept | Explanation |
| --- | --- |
| **try block** | Contains the code that *might* fail — the "optimistic" path |
| **except block** | Contains the code that runs *only if* an error occurs in the try block |
| **Exception type** | The specific kind of error — e.g. `ValueError`, `ZeroDivisionError`, `FileNotFoundError` |
| **Graceful degradation** | The program continues running (with a warning or default) instead of crashing |

</div>

### How the control flow works

<div class="reader-section-body reader-section-body--example">

```python
# Scenario: a student enters their test score
try:
    raw = input("Enter your score: ")
    score = int(raw)         # could fail if they type "abc"
    percentage = score / 80 * 100  # could fail if score causes issues
    print(f"You scored {percentage:.1f}%")
except ValueError:
    print("Error: please enter a whole number, not text.")
except ZeroDivisionError:
    print("Error: division by zero is not possible.")
```

**Step-by-step when the user types `"abc"`:**
1. `raw` is assigned the string `"abc"` ✓
2. `int("abc")` raises a `ValueError` ✗
3. Python **skips the rest of the try block** (line 4 never runs)
4. Python checks each `except` — finds `ValueError` matches
5. Prints the error message and continues with the rest of the program

**Step-by-step when the user types `"65"`:**
1. `raw` = `"65"` ✓
2. `score` = `65` ✓
3. `percentage` = `81.25` ✓
4. Prints `"You scored 81.3%"` ✓
5. **No except block runs** — the program continues normally

</div>

### When to use exception handling (and when not to)

<div class="reader-section-body reader-section-body--apply">

Exception handling is not a substitute for proper validation. Use it for **unpredictable** situations you cannot prevent with an `if` statement:

| Use `try`/`except` for… | Use `if` statements for… |
| --- | --- |
| File might not exist on disk | Checking if a number is positive |
| User input might not be a valid number | Checking if a list is empty |
| Network connection might fail | Comparing two known values |
| Division where the denominator comes from user input | Checking a password length |

**The principle:** use `if` when you *can* check before acting; use `try`/`except` when the check itself could fail or is impractical.

**Exam tip:** The command term is *Describe*, so you need to explain the purpose and mechanics — not just write code. A strong answer explains: (1) what goes in the `try` block, (2) what happens when an exception is raised, (3) why this prevents the program from crashing.

</div>


## B2.1.4 Debugging Techniques

**Command term:** Construct

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** debugging techniques and **use** them to identify errors. This means you must demonstrate practical debugging strategies — especially trace tables — not just define what debugging means.

There are three types of error you must distinguish:

| Error type | When it occurs | Example | How to find it |
| --- | --- | --- | --- |
| **Syntax error** | Before execution — code cannot run | `prin("hello")` (misspelled `print`) | The IDE or interpreter highlights the line |
| **Runtime error** | During execution — code crashes | `x = 10 / 0` (division by zero) | Error message points to the crashing line |
| **Logic error** | Code runs but gives wrong results | Using `>` instead of `>=` in a boundary check | **Trace table** or print debugging — no automatic detection |

Logic errors are the hardest to find because the program does not crash or complain. The IB focuses heavily on trace tables as the primary tool for detecting them.

</div>

### Constructing a trace table

<div class="reader-section-body reader-section-body--example">

A trace table tracks every variable's value as you step through each line. Here is a program with a deliberate logic error — can you spot it?

```python
# Intended: count how many scores are above the pass mark of 50
scores = [45, 72, 38, 91, 50]
pass_count = 0

for s in scores:
    if s > 50:            # BUG: should be >= 50 (50 is a pass!)
        pass_count = pass_count + 1

print(f"{pass_count} students passed")
```

**Trace table:**

| Iteration | `s` | `s > 50` | `pass_count` |
| --- | --- | --- | --- |
| 1 | 45 | False | 0 |
| 2 | 72 | True | 1 |
| 3 | 38 | False | 1 |
| 4 | 91 | True | 2 |
| 5 | 50 | **False** ← bug here | 2 |

**Output:** `2 students passed` — but 50 is a pass, so the correct answer is 3.

**The fix:** change `s > 50` to `s >= 50`. The trace table revealed the boundary error at iteration 5.

</div>

### The debugging toolkit

<div class="reader-section-body reader-section-body--apply">

Beyond trace tables, you should know these practical strategies:

**1. Print debugging (quick and universal)**
```python
def calculate_grade(marks):
    total = sum(marks)
    print(f"DEBUG: total = {total}, len = {len(marks)}")  # temporary
    average = total / len(marks)
    print(f"DEBUG: average = {average}")                   # temporary
    if average >= 70:
        return "A"
    elif average >= 50:
        return "B"
    else:
        return "C"
```
Insert `print()` statements at key checkpoints. Remove them once the bug is found.

**2. Breakpoints (IDE-based)**
Set a breakpoint on a suspicious line → run in debug mode → the program pauses there → inspect every variable's current value → step forward one line at a time.

**3. Test data strategy**
Design test inputs that specifically target boundaries and edge cases:

| Test type | Purpose | Example for a pass/fail system |
| --- | --- | --- |
| Normal | Typical valid input | Score = 65 (clearly a pass) |
| Boundary | Exactly on the threshold | Score = 50 (is it pass or fail?) |
| Erroneous | Invalid input | Score = -5 or "abc" |
| Extreme | Very large or very small | Score = 0, Score = 100 |

**Exam tip:** When the exam says *Construct* a debugging technique, they usually want a trace table. Set up columns for every variable (including loop counters), add a row for each execution step, and include a column for any output. Show your working — partial marks are awarded for a correct method even if the final answer has a small slip.

</div>


## B2.3.3 Looping Constructs (for and while loops)

**Command term:** Construct

### Overview

<div class="reader-section-body reader-section-body--concept">

The IB expects you to **construct** programs utilizing looping structures. In this unit, that means you must write correct `for` and `while` loops, choose the right loop style for a given task, and trace loop variables accurately.

Both loop types perform **iteration**, but they are used in different situations:

| Loop type | Best used when | Typical pattern |
| --- | --- | --- |
| `for` loop | The number of repetitions is known in advance | Process every item in a list, or repeat `n` times |
| `while` loop | Repetition should continue until a condition changes | Keep asking for input until it is valid |

If you choose the wrong loop type, your code often becomes harder to read and easier to break.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

Use this decision logic:

- Choose a **for loop** when the iteration count is fixed or controlled by a sequence (`range`, list, string).
- Choose a **while loop** when the stopping point depends on runtime data (user input, sensor value, validation state).
- In a `while` loop, always update the variable used in the condition. If it never changes, the loop may never end.
- In both loop types, check boundary conditions (`<` versus `<=`) because boundary mistakes are a common source of logic errors.

</div>

### Worked example: for loop and while loop

<div class="reader-section-body reader-section-body--example">

```python
# FOR LOOP: known number of iterations
scores = [72, 68, 91, 55]
total = 0

for score in scores:
    total = total + score

average = total / len(scores)
print(f"Average = {average}")

# WHILE LOOP: unknown number of iterations
password = ""
attempts = 0

while password != "IB2027":
    password = input("Enter password: ")
    attempts = attempts + 1

print(f"Access granted after {attempts} attempt(s).")
```

Trace focus for exam questions:
- In the `for` loop, track `score` and `total` each pass.
- In the `while` loop, track the condition `password != "IB2027"` and show exactly when it becomes false.

</div>

### Common misconception

<div class="reader-section-body reader-section-body--apply">

| Mistake | Why it happens | Correct approach |
| --- | --- | --- |
| Infinite `while` loop | Condition variable is never updated | Update the variable used in the condition every iteration |
| Off-by-one error in `for range()` | Misunderstanding end value | Remember `range(start, end)` excludes `end` |
| Wrong boundary check | Using `>` instead of `>=` (or vice versa) | Test exact boundary values with a trace table |

</div>
