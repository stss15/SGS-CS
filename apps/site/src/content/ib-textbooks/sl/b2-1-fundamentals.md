---
level: sl
unitNumber: 31
unitName: Programming Fundamentals
summary: Variables, data types, scope, string manipulation, exception handling, and debugging — the foundational skills for writing and testing programs.
subtopics:
  - code: B2.1.1
    title: Variables and data types
  - code: B2.1.2
    title: String manipulation
  - code: B2.1.3
    title: Exception handling
  - code: B2.1.4
    title: Debugging techniques
sourcePolicy: ib_content_md_first
---

## B2.1.1 Variables and data types

### Variables

A <span data-def="A named storage location in memory whose value can change during program execution.">variable</span> is a named location in memory that holds a value. The value can change as the program runs — hence the name. Every variable has three properties you must reason about:

- **Name** — an identifier that refers to the stored value. Choose descriptive names (`total_score`, not `x`).
- **Type** — the kind of data it holds, which determines what operations are valid.
- **Scope** — where in the program the variable can be accessed.

### Data types

The IB syllabus identifies four fundamental data types:

| Type | Description | Examples |
|------|-------------|----------|
| **Integer** (`int`) | Whole numbers, positive or negative | `42`, `-7`, `0` |
| **Float** (`float`) | Numbers with a decimal point | `3.14`, `-0.5`, `100.0` |
| **Boolean** (`bool`) | A logical value: either true or false | `True`, `False` |
| **String** (`str`) | A sequence of characters | `"hello"`, `"B2"`, `""` |

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">The string <code>"42"</code> and the integer <code>42</code> are different types. <code>"42" + "8"</code> produces <code>"428"</code> (concatenation), while <code>42 + 8</code> produces <code>50</code> (addition). Always be aware of the type you are working with.</p>
</div>

### Type conversion

Values can be converted between types using **casting**:

```python
age = int("17")        # string → integer
price = float("9.99")  # string → float
label = str(42)        # integer → string
flag = bool(1)         # integer → boolean (True)
```

Type conversion is essential when reading user input, since `input()` always returns a string.

### Variable scope

<span data-def="The region of code where a variable is accessible. A variable exists only within its scope.">Scope</span> determines where a variable can be used.

A **local variable** is declared inside a function and exists only within that function. Once the function finishes, the variable is destroyed.

A **global variable** is declared outside all functions and can be read from anywhere in the program. To modify a global variable inside a function, you must explicitly declare it with the `global` keyword.

```python
score = 0                # global variable

def add_points(points):
    global score
    score = score + points  # modifies the global variable

def show_local():
    result = 10            # local variable
    print(result)

show_local()              # prints 10
# print(result)           # ERROR: result does not exist here
```

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Best practice</p>
  <p class="ib-textbook-note__body">Overusing global variables makes programs harder to understand and debug, because any part of the program can change them. Prefer passing values as function parameters and returning results. Use globals only when genuinely necessary.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing variables through a program</p>
  <div class="ib-textbook-worked__body">
    <pre><code>x = 5
y = x + 3
x = y * 2
y = x - y</code></pre>
    <table>
      <tr><th>Line</th><th>x</th><th>y</th></tr>
      <tr><td>x = 5</td><td>5</td><td>—</td></tr>
      <tr><td>y = x + 3</td><td>5</td><td>8</td></tr>
      <tr><td>x = y * 2</td><td>16</td><td>8</td></tr>
      <tr><td>y = x - y</td><td>16</td><td>8</td></tr>
    </table>
    <p>Final values: <code>x = 16</code>, <code>y = 8</code>.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Variables store values that can change during execution. Each has a name, type, and scope.</li>
      <li>Four fundamental data types: integer, float, boolean, string.</li>
      <li>Type conversion (casting) is needed when operations require a specific type.</li>
      <li>Local variables exist only inside the function that declares them; global variables are accessible everywhere but should be used sparingly.</li>
    </ul>
  </div>
</div>


## B2.1.2 String manipulation

Strings are sequences of characters. Each character has an <span data-def="A zero-based position number that identifies a character's location within a string. The first character is at index 0.">index</span>, starting from 0. String manipulation is a core programming skill tested frequently in the IB.

### Accessing characters and substrings

```python
name = "Computer"
print(name[0])      # "C"  — first character
print(name[3])      # "p"  — fourth character
print(name[-1])     # "r"  — last character
```

A <span data-def="A contiguous portion of a string, extracted by specifying a start index and an end index.">substring</span> is a portion of a string, extracted using **slicing**:

```python
text = "Computer Science"
print(text[0:8])     # "Computer"  — index 0 up to (not including) 8
print(text[9:])      # "Science"   — index 9 to the end
print(text[:4])      # "Comp"      — start to index 4
```

### Common string operations

| Operation | Python syntax | Example | Result |
|-----------|--------------|---------|--------|
| Length | `len(s)` | `len("hello")` | `5` |
| Concatenation | `s1 + s2` | `"hello" + " world"` | `"hello world"` |
| Uppercase | `s.upper()` | `"hello".upper()` | `"HELLO"` |
| Lowercase | `s.lower()` | `"HELLO".lower()` | `"hello"` |
| Find substring | `s.find(sub)` | `"hello".find("ll")` | `2` |
| Replace | `s.replace(old, new)` | `"hello".replace("l", "r")` | `"herro"` |
| Split | `s.split(sep)` | `"a,b,c".split(",")` | `["a", "b", "c"]` |
| Strip whitespace | `s.strip()` | `"  hi  ".strip()` | `"hi"` |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Extracting initials from a full name</p>
  <div class="ib-textbook-worked__body">
    <pre><code>full_name = "Ada Lovelace"
parts = full_name.split(" ")
initials = parts[0][0] + parts[1][0]
print(initials)  # "AL"</code></pre>
    <p><code>split(" ")</code> breaks the string at each space, producing <code>["Ada", "Lovelace"]</code>. Accessing <code>[0]</code> of each part gives the first character.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">String indices start at <strong>0</strong>, not 1. In the string <code>"Code"</code>, the character at index 1 is <code>"o"</code>, not <code>"C"</code>. Off-by-one errors are the most frequent string-handling bug.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.1.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Strings are indexed from 0. Use square brackets to access individual characters.</li>
      <li>Slicing extracts substrings: <code>s[start:end]</code> includes <code>start</code> but excludes <code>end</code>.</li>
      <li>Key methods: <code>len()</code>, <code>upper()</code>, <code>lower()</code>, <code>find()</code>, <code>replace()</code>, <code>split()</code>, <code>strip()</code>.</li>
      <li>Concatenation joins strings with <code>+</code>.</li>
    </ul>
  </div>
</div>


## B2.1.3 Exception handling

An <span data-def="A runtime error that disrupts the normal flow of a program. Exceptions can be caught and handled to prevent the program from crashing.">exception</span> is an error that occurs while a program is running. Unlike syntax errors (which prevent the program from starting), exceptions happen during execution — for example, dividing by zero, converting an invalid string to a number, or accessing an index that does not exist.

Without handling, an exception causes the program to crash with an error message. <span data-def="Using try/except blocks to intercept runtime errors and respond in a controlled way rather than allowing the program to crash.">Exception handling</span> allows the program to catch the error and respond gracefully.

### The try/except pattern

```python
try:
    age = int(input("Enter your age: "))
    print("You are", age, "years old")
except ValueError:
    print("That is not a valid number")
```

If the user enters `"seventeen"`, `int()` raises a `ValueError`. The `except` block catches it and prints a helpful message instead of crashing.

### Common exception types

| Exception | Cause | Example |
|-----------|-------|---------|
| `ValueError` | Invalid value for the expected type | `int("hello")` |
| `TypeError` | Wrong type used in an operation | `"5" + 3` |
| `ZeroDivisionError` | Division or modulo by zero | `10 / 0` |
| `IndexError` | Index out of range | `[1, 2, 3][5]` |
| `FileNotFoundError` | File does not exist | `open("missing.txt")` |

### Multiple except blocks

```python
try:
    numbers = [10, 20, 30]
    index = int(input("Enter index: "))
    print(numbers[index])
except ValueError:
    print("Please enter a whole number")
except IndexError:
    print("Index out of range — valid indices are 0, 1, 2")
```

### The else and finally clauses

```python
try:
    value = int(input("Enter a number: "))
except ValueError:
    print("Invalid input")
else:
    print("You entered:", value)   # runs only if no exception occurred
finally:
    print("Input attempt complete")  # always runs, regardless
```

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why exception handling matters</p>
  <p class="ib-textbook-note__body">Exception handling is not just about preventing crashes. It makes programs more robust and user-friendly. A well-handled exception provides a clear error message and allows the user to try again, rather than losing all their work to a crash.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.1.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Exceptions are runtime errors that disrupt normal execution.</li>
      <li><code>try/except</code> blocks catch exceptions and provide controlled responses.</li>
      <li>Common exceptions: <code>ValueError</code>, <code>TypeError</code>, <code>ZeroDivisionError</code>, <code>IndexError</code>.</li>
      <li>Use <code>else</code> for code that should run only when no error occurs; use <code>finally</code> for cleanup that must always run.</li>
    </ul>
  </div>
</div>


## B2.1.4 Debugging techniques

<span data-def="The process of finding and fixing errors (bugs) in a program so that it produces the correct output.">Debugging</span> is the process of finding and fixing errors in code. Effective debugging requires understanding the three categories of error and applying systematic techniques.

### Error categories

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Syntax error</p>
  <p class="ib-textbook-defn__body">A violation of the programming language's grammar rules. The code cannot run at all. Examples: missing colons, unmatched brackets, misspelled keywords. The interpreter or compiler reports the location and nature of the error.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Runtime error</p>
  <p class="ib-textbook-defn__body">An error that occurs during execution, causing the program to crash. The code is syntactically correct but encounters an impossible operation. Examples: dividing by zero, accessing an invalid index, opening a missing file.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Logic error</p>
  <p class="ib-textbook-defn__body">The program runs without crashing but produces incorrect results due to flawed reasoning. Examples: using the wrong operator (<code>+</code> instead of <code>-</code>), an off-by-one loop boundary, an incorrect condition. Logic errors are the hardest to find because the program gives no error message.</p>
</div>

### Debugging techniques

**Print statements** — inserting `print()` calls at key points to display variable values and execution flow. Simple but effective for tracking down where values diverge from expectations.

```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
        print(f"num={num}, total={total}")  # debugging output
    average = total / len(numbers)
    print(f"average={average}")             # check final result
    return average
```

**Trace tables** — a structured record of variable values at each step. Particularly useful for loop-based algorithms. Create a column for each variable and a row for each step, recording every change.

**Breakpoints and stepping** — most IDEs allow you to set <span data-def="A marker set in an IDE that pauses program execution at a specific line, allowing the programmer to inspect variable values and program state.">breakpoints</span> that pause execution at a specific line. You can then step through the code line by line, inspecting variable values at each point. This is more efficient than print statements for complex programs.

**Rubber duck debugging** — explaining the code line by line to someone (or something) else. The act of articulating what each line should do often reveals where the logic breaks down.

### A systematic approach

1. **Reproduce** the error with specific input that triggers it.
2. **Isolate** the location — use error messages, print statements, or breakpoints to narrow down where the problem occurs.
3. **Understand** why the error happens — read the code carefully and trace through the logic.
4. **Fix** the error and verify that the fix works with the original input.
5. **Test** with additional inputs to ensure the fix does not introduce new problems.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Changing code randomly until the problem disappears is not debugging. It often introduces new bugs and does not build understanding. Always diagnose the root cause before changing code.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.1.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Syntax errors prevent the program from running; runtime errors crash during execution; logic errors produce wrong results silently.</li>
      <li>Key techniques: print statements, trace tables, breakpoints and stepping, rubber duck debugging.</li>
      <li>Debugging should be systematic: reproduce, isolate, understand, fix, test.</li>
    </ul>
  </div>
</div>
