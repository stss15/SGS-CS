---
level: sl
unitNumber: 35
unitName: File Processing
summary: Reading from, writing to, and appending data to text files — how programs interact with persistent storage.
subtopics:
  - code: B2.5.1
    title: File-processing operations
sourcePolicy: ib_content_md_first
---

## B2.5.1 File-processing operations

Programs store data in variables, but variables exist only while the program is running. To keep data between sessions, programs must read from and write to <span data-def="Data stored in files on secondary storage (hard drives, SSDs) that persists after the program ends.">persistent storage</span> — files on disk.

### Opening and closing files

Before reading or writing, a file must be **opened** with a specified mode:

| Mode | Description |
|------|-------------|
| `"r"` | **Read** — open an existing file for reading. Error if the file does not exist. |
| `"w"` | **Write** — create a new file for writing. If the file exists, its contents are **overwritten**. |
| `"a"` | **Append** — open a file for writing. New data is added to the **end** without overwriting existing content. |

After processing, the file should be **closed** to release system resources and ensure data is saved.

### Reading from a file

```python
# Read entire file as a single string
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()

# Read line by line
file = open("data.txt", "r")
for line in file:
    print(line.strip())    # strip() removes trailing newline
file.close()

# Read all lines into a list
file = open("data.txt", "r")
lines = file.readlines()   # each line is a list element
file.close()
```

### Writing to a file

```python
file = open("output.txt", "w")
file.write("First line\n")
file.write("Second line\n")
file.close()
```

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Opening a file in write mode (<code>"w"</code>) <strong>erases all existing content</strong>. If you want to add to an existing file without losing its contents, use append mode (<code>"a"</code>) instead.</p>
</div>

### Appending to a file

```python
file = open("log.txt", "a")
file.write("New entry added\n")
file.close()
```

Append mode adds new content after the existing data.

### Using with for safe file handling

The `with` statement automatically closes the file when the block ends, even if an error occurs:

```python
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
# file is automatically closed here
```

This is the recommended pattern because it prevents resource leaks.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Reading scores from a file and calculating the average</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose <code>scores.txt</code> contains one integer per line:</p>
    <pre><code>85
92
78
95
88</code></pre>
    <pre><code>total = 0
count = 0

with open("scores.txt", "r") as file:
    for line in file:
        score = int(line.strip())
        total += score
        count += 1

average = total / count
print(f"Average: {average}")  # Average: 87.6</code></pre>
    <p>Each line is stripped of whitespace, converted to an integer, and accumulated. The file is automatically closed after the <code>with</code> block.</p>
  </div>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Writing results to a CSV file</p>
  <div class="ib-textbook-worked__body">
    <pre><code>students = [
    ("Alice", 85),
    ("Bob", 92),
    ("Charlie", 78)
]

with open("results.csv", "w") as file:
    file.write("Name,Score\n")
    for name, score in students:
        file.write(f"{name},{score}\n")</code></pre>
    <p>This creates a comma-separated values file that can be opened in a spreadsheet application.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B2.5.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Files provide persistent storage — data survives after the program ends.</li>
      <li>Three file modes: read (<code>"r"</code>), write (<code>"w"</code> — overwrites), append (<code>"a"</code> — adds to end).</li>
      <li>Always close files after use, or use <code>with</code> statements for automatic closing.</li>
      <li>Write mode erases existing content — use append mode to preserve it.</li>
      <li><code>strip()</code> removes trailing newlines when reading line by line.</li>
    </ul>
  </div>
</div>
