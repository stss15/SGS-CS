# Level 8: File Processing

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 8 |
| **Title** | File Processing |
| **Syllabus** | B2.5.1 |
| **Challenge Count** | 7 |
| **Prerequisites** | Levels 1-7 (especially functions, loops, strings) |

---

## ⚠️ SPECIAL LEVEL: File Simulation Required

Since the web-based IDE cannot access the real filesystem, this level uses **simulated file content** as strings. The concepts remain identical to real file operations.

**Teaching Note**: Explain that in a real Python environment, these operations work with actual files. The simulation demonstrates the LOGIC of file processing.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Understand file modes: read ('r'), write ('w'), append ('a')
2. Open files with `open()` function
3. Read files using `.read()`, `.readline()`, `.readlines()`
4. Write to files using `.write()`
5. Use context managers (`with open...`) for safe file handling
6. Parse CSV-style data
7. Process multi-line text files

---

## Synoptic Connections

### From Previous Levels:
- **Level 3**: Loops for processing lines
- **Level 4**: String manipulation for parsing
- **Level 5**: Lists for storing file data
- **Level 7**: Functions for modular file operations

---

## Space-Themed Variables

```
# File names
mission_log.txt, crew_manifest.csv, sensor_data.txt

# Variables
log_content, lines, data_row
filename, file_handle, line
```

---

## Mission Data Files (Simulated)

For this level, we simulate file content using multi-line strings. In challenges, students will process these as if they were read from files.

### mission_log.txt
```python
MISSION_LOG = """Day 1: Launch successful - all systems nominal
Day 2: Orbit established at 400km
Day 3: Solar panel deployment complete
Day 4: Communication test with Earth passed
Day 5: Beginning scientific experiments"""
```

### crew_manifest.csv
```python
CREW_MANIFEST = """id,name,role,status
001,Armstrong,Commander,Active
002,Collins,Pilot,Active
003,Aldrin,Engineer,Active
004,Duke,Scientist,Reserve"""
```

### sensor_readings.txt
```python
SENSOR_READINGS = """1623.45
1598.22
1645.78
1612.33
1589.90
1678.15"""
```

---

## Base Content Sections

### Section 1: File Basics

```typescript
{
  title: "1. Why File Processing?",
  content: `Programs need to store data permanently and retrieve it later. Files allow data to persist beyond program execution.

Common uses:
- Saving user data
- Loading configuration
- Processing logs
- Reading datasets

In this level, we'll simulate file operations since the web IDE can't access real files. The CONCEPTS are identical!`,
  codeExample: `# In a real environment:
# file = open("data.txt", "r")
# content = file.read()
# file.close()

# Our simulation approach:
file_content = """Line 1
Line 2
Line 3"""

# Process the "file" content
lines = file_content.split("\\n")
for line in lines:
    print(line)`
}
```

### Section 2: File Modes

```typescript
{
  title: "2. File Modes",
  content: `When opening a file, you specify a MODE that determines what operations are allowed.`,
  tableData: {
    headers: ["Mode", "Name", "Description", "File Exists?"],
    rows: [
      ["'r'", "Read", "Read only, cannot write", "Must exist"],
      ["'w'", "Write", "Write only, erases existing content", "Created if not exists"],
      ["'a'", "Append", "Write only, adds to end", "Created if not exists"],
      ["'r+'", "Read+Write", "Both read and write", "Must exist"]
    ]
  },
  codeExample: `# Reading mode (most common)
file = open("log.txt", "r")

# Writing mode (WARNING: erases existing!)
file = open("output.txt", "w")

# Append mode (adds to end)
file = open("log.txt", "a")

# Always remember to close!
file.close()`
}
```

### Section 3: Reading Files

```typescript
{
  title: "3. Reading File Content",
  content: `Three ways to read file content, each useful in different situations:

- .read() - Entire file as one string
- .readline() - One line at a time
- .readlines() - All lines as a list`,
  codeExample: `# Simulated file content
log_content = """Line 1: Launch
Line 2: Orbit
Line 3: Dock"""

# Method 1: read() - entire content
# In real Python: content = file.read()
content = log_content
print(content)

# Method 2: readline() - simulated one at a time
lines = log_content.split("\\n")
first_line = lines[0]  # Like file.readline()
print(first_line)

# Method 3: readlines() - list of lines
all_lines = log_content.split("\\n")  # Like file.readlines()
for line in all_lines:
    print(line)`
}
```

### Section 4: Writing to Files

```typescript
{
  title: "4. Writing to Files",
  content: `The .write() method adds text to a file. Note that it doesn't automatically add newlines - you must include \\n yourself.

In write mode ('w'), existing content is ERASED.
In append mode ('a'), content is ADDED to the end.`,
  codeExample: `# Simulated writing (building a string)
output = ""

# Write mode simulation (start fresh)
output = ""  # Clear existing
output += "Mission Day 1\\n"
output += "All systems GO\\n"

# Append mode simulation (add to existing)
output += "Mission Day 2\\n"  # Adds to end

print("File content:")
print(output)

# In real Python:
# file = open("log.txt", "w")
# file.write("Mission Day 1\\n")
# file.close()`
}
```

### Section 5: Context Managers

```typescript
{
  title: "5. Context Managers (with statement)",
  content: `The 'with' statement automatically closes the file when done, even if an error occurs. This is the RECOMMENDED way to handle files.

Structure:
with open(filename, mode) as variable:
    # do stuff with variable
# file automatically closed here`,
  codeExample: `# The safe way to handle files
# with open("log.txt", "r") as file:
#     content = file.read()
# File is automatically closed!

# Simulated version:
log_content = """Day 1: Launch
Day 2: Orbit
Day 3: Dock"""

# Process as if reading
lines = log_content.split("\\n")
for line in lines:
    print(f"Processing: {line}")

# In real code with 'with':
# with open("log.txt", "r") as f:
#     for line in f:
#         print(f"Processing: {line.strip()}")`
}
```

### Section 6: Parsing CSV Data

```typescript
{
  title: "6. Parsing CSV Files",
  content: `CSV (Comma-Separated Values) files store tabular data. Each line is a row, and values are separated by commas (or other delimiters).

To parse:
1. Split by lines
2. Split each line by the delimiter
3. Process each field`,
  codeExample: `# CSV data
csv_content = """name,role,status
Armstrong,Commander,Active
Collins,Pilot,Active
Aldrin,Engineer,Active"""

# Parse the CSV
lines = csv_content.split("\\n")
header = lines[0].split(",")
print(f"Columns: {header}")

# Process data rows
for i in range(1, len(lines)):
    fields = lines[i].split(",")
    name = fields[0]
    role = fields[1]
    status = fields[2]
    print(f"{name} is {role} - {status}")`
}
```

---

## Challenges

### Challenge 1: Log Viewer

```typescript
{
  id: 1,
  title: "Mission Log Viewer",
  description: `Read and display a mission log.

Given the simulated file content:
log_content = """Day 1: Launch successful
Day 2: Orbit established
Day 3: Experiments begin
Day 4: Data collection
Day 5: Mission complete"""

1. Split into lines (simulating file.readlines())
2. Print "=== MISSION LOG ===""
3. Print each line with a line number: "1: Day 1: Launch..."
4. Print total number of lines`,
  starterCode: `# MISSION: Log Viewer
# Read and display mission log

def view_log():
    log_content = """Day 1: Launch successful
Day 2: Orbit established
Day 3: Experiments begin
Day 4: Data collection
Day 5: Mission complete"""
    
    # Split into lines
    # Print header
    # Print each with line number
    # Print total count
    pass

# === Mission Control Test ===
view_log()`,
  hint: `Use lines = log_content.split("\\n") to get a list. Use enumerate() or range() for line numbers.`,
  conceptTags: ["read", "split", "line processing"]
}
```

### Challenge 2: Line Scanner

```typescript
{
  id: 2,
  title: "Selective Line Scanner",
  description: `Read a log and find specific entries.

Given:
log_content = """INFO: Systems check passed
WARNING: Fuel level at 30%
INFO: Orbit stable
ERROR: Sensor malfunction
INFO: Communication active
WARNING: Temperature high"""

1. Split into lines
2. Loop through and only print lines containing "WARNING" or "ERROR"
3. Count how many warnings and errors total
4. Print the count`,
  starterCode: `# MISSION: Alert Scanner
# Find warnings and errors

def scan_alerts():
    log_content = """INFO: Systems check passed
WARNING: Fuel level at 30%
INFO: Orbit stable
ERROR: Sensor malfunction
INFO: Communication active
WARNING: Temperature high"""
    
    # Split into lines
    # Find and print WARNING/ERROR lines
    # Count total alerts
    pass

# === Mission Control Test ===
scan_alerts()`,
  hint: `Use 'in' to check: if "WARNING" in line or "ERROR" in line. Keep a counter for alerts found.`,
  conceptTags: ["readline", "filter", "search", "counter"]
}
```

### Challenge 3: Mission Logger

```typescript
{
  id: 3,
  title: "Mission Logger",
  description: `Build a log file by writing entries.

Start with an empty string (simulating a new file).
Add these log entries (each on its own line):
1. "Mission: Artemis"
2. "Status: Active"
3. "Day: 1"
4. "Notes: All systems nominal"

Print the final "file" content.`,
  starterCode: `# MISSION: Log Writer
# Create a log file

def write_log():
    # Start with empty "file"
    log_file = ""
    
    # Write entries (remember \\n for new lines!)
    
    # Print the final content
    print("=== LOG FILE CONTENTS ===")
    pass

# === Mission Control Test ===
write_log()`,
  hint: `Use log_file += "text\\n" to add each line. The \\n creates a new line.`,
  conceptTags: ["write", "string building", "newlines"]
}
```

### Challenge 4: Log Append

```typescript
{
  id: 4,
  title: "Log Append",
  description: `Add new entries to an existing log.

Start with existing content:
existing_log = """Day 1: Launch
Day 2: Orbit"""

Append these new entries:
- "Day 3: Docking"
- "Day 4: EVA"

Print the complete log showing all 4 days.`,
  starterCode: `# MISSION: Append to Log
# Add entries to existing log

def append_log():
    existing_log = """Day 1: Launch
Day 2: Orbit"""
    
    # Append new entries (simulate append mode)
    
    # Print complete log
    print("=== UPDATED LOG ===")
    pass

# === Mission Control Test ===
append_log()`,
  hint: `Append mode adds to the end. Use existing_log += "\\nDay 3: Docking" (note the \\n at start to continue from previous line).`,
  conceptTags: ["append", "string concatenation"]
}
```

### Challenge 5: Safe File Handling

```typescript
{
  id: 5,
  title: "Safe File Operations",
  description: `Demonstrate the context manager pattern.

In real Python, you would use:
with open("file.txt", "r") as f:
    content = f.read()

Simulate this by:
1. Define a function process_file(content) that splits and counts lines
2. Use a "context" structure (use try/finally or just careful coding)
3. Process this data:
data = """Record 1
Record 2
Record 3"""
4. Print each record and the total count`,
  starterCode: `# MISSION: Safe File Handler
# Demonstrate proper file handling patterns

def process_file(content):
    """Process file content safely"""
    # Split into lines
    # Process each line
    # Return or print results
    pass

# === Mission Control Test ===
data = """Record 1
Record 2
Record 3"""

# In real code: with open("data.txt", "r") as f:
#     process_file(f.read())

process_file(data)`,
  hint: `The function should: split by \\n, loop through lines printing each, count and return the total.`,
  conceptTags: ["context manager", "function", "safe handling"]
}
```

### Challenge 6: Crew Data Parser

```typescript
{
  id: 6,
  title: "Crew Data Parser",
  description: `Parse a CSV crew manifest.

Given:
crew_csv = """id,name,role,status
001,Armstrong,Commander,Active
002,Collins,Pilot,Active
003,Aldrin,Engineer,Reserve"""

1. Split into lines
2. Parse the header (first line)
3. For each data row, extract fields and print formatted:
   "ID: 001 | Name: Armstrong | Role: Commander | Status: Active"
4. Count total crew members (not including header)`,
  starterCode: `# MISSION: Crew CSV Parser
# Parse and display crew data

def parse_crew():
    crew_csv = """id,name,role,status
001,Armstrong,Commander,Active
002,Collins,Pilot,Active
003,Aldrin,Engineer,Reserve"""
    
    # Split into lines
    # Process header
    # Process each data row
    # Print count
    pass

# === Mission Control Test ===
parse_crew()`,
  hint: `Split lines, then split each line by comma. Skip index 0 (header) when processing data. fields[0] is id, fields[1] is name, etc.`,
  conceptTags: ["CSV", "parsing", "split", "formatted output"]
}
```

### Challenge 7: Mission Archive

```typescript
{
  id: 7,
  title: "Mission Archive",
  description: `Complete file processing system: read, process, and write.

Given sensor readings:
readings = """85.5
92.3
78.1
95.7
88.4"""

1. Parse the readings into a list of floats
2. Calculate: min, max, average
3. Create a report string:
   "=== SENSOR REPORT ===
   Readings: 5
   Minimum: 78.1
   Maximum: 95.7
   Average: 88.0
   ===================="
4. Print the report (simulating writing to file)`,
  starterCode: `# MISSION: Complete Archive System
# Read, process, write

def archive_data():
    readings = """85.5
92.3
78.1
95.7
88.4"""
    
    # Parse readings to float list
    
    # Calculate statistics
    
    # Build report string
    
    # "Write" (print) the report
    pass

# === Mission Control Test ===
archive_data()`,
  hint: `Convert strings to floats: float(line). Use min(), max(), sum()/len() for stats. Build report with += and \\n.`,
  conceptTags: ["synthesis", "read", "process", "write", "statistics"]
}
```

---

## Implementation Notes

### Files to Modify

1. **`data/level8_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 8 tasks:
```typescript
{
  id: 8,
  title: "File Processing",
  syllabus: "B2.5.1",
  description: "Log mission data to the black box.",
  tasks: [
    { id: "8-1", text: "File modes: read, write, append" },
    { id: "8-2", text: "Reading: read(), readline(), readlines()" },
    { id: "8-3", text: "Writing with write()" },
    { id: "8-4", text: "Appending to existing files" },
    { id: "8-5", text: "Context managers (with statement)" },
    { id: "8-6", text: "Parsing CSV data" },
    { id: "8-7", text: "Complete read-process-write system" }
  ]
}
```

### Key IB Points (B2.5.1)
- File operations: open, read, write, close
- File modes understanding
- Line-by-line processing
- Data parsing

### Note on Simulation
Students should understand that:
1. In real Python, `open()` accesses actual files
2. Our simulation uses strings to demonstrate the LOGIC
3. The concepts (modes, methods, parsing) are identical

---

## Expected Outputs

| Challenge | Key Output |
|-----------|------------|
| 1 | 5 numbered log lines |
| 2 | 3 alerts (2 WARNING, 1 ERROR) |
| 3 | 4-line log file |
| 4 | 4 days in log |
| 5 | 3 records processed |
| 6 | 3 crew members formatted |
| 7 | Complete statistics report |

---

*Level 8 Plan - Version 1.0*

