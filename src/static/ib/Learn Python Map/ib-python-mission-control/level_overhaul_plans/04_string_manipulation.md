# Level 4: String Manipulation

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 4 |
| **Title** | String Manipulation |
| **Syllabus** | B2.1.2 |
| **Challenge Count** | 8 |
| **Prerequisites** | Levels 1-3 (Variables, Selection, Loops) |

---

## Learning Objectives

By the end of this level, students will be able to:
1. Access individual characters using indexing `s[0]`, `s[-1]`
2. Extract substrings using slicing `s[start:end]`
3. Concatenate strings using `+`
4. Iterate through strings with loops
5. Use `len()` to get string length
6. Use string methods: `.upper()`, `.lower()`, `.strip()`
7. Parse formatted data from strings
8. Build strings programmatically

---

## Synoptic Connections

### From Previous Levels:
- **Level 1**: Variables (storing strings), print(), input()
- **Level 2**: if statements (checking string content)
- **Level 3**: for loops (iterating through characters), accumulators (building strings)

### Key Integration Points:
- Loops + strings: `for char in string`
- Conditions + strings: `if char == "X"`
- Accumulators + strings: `result += char`

---

## Space-Themed Variables

```
# Communications
message, transmission, signal, callsign, code

# Data
log_entry, sensor_data, coordinates, mission_id

# Status
status_code, error_message, command

# Formatted
timestamp, log_line, data_packet
```

---

## Base Content Sections

### Section 1: String Indexing

```typescript
{
  title: "1. String Indexing",
  content: `Every character in a string has a position called an index. Python uses zero-based indexing, meaning the first character is at position 0.

You can also use negative indices to count from the end: -1 is the last character, -2 is second-to-last, etc.`,
  tableData: {
    headers: ["String", "Index 0", "Index 1", "Index 2", "Index -1", "Index -2"],
    rows: [
      ["'APOLLO'", "A", "P", "O", "O", "L"],
      ["'NASA'", "N", "A", "S", "A", "S"]
    ]
  },
  codeExample: `callsign = "APOLLO"

# Positive indexing (from start)
print(callsign[0])   # A (first)
print(callsign[1])   # P (second)
print(callsign[5])   # O (sixth/last)

# Negative indexing (from end)
print(callsign[-1])  # O (last)
print(callsign[-2])  # L (second-to-last)

# Getting length
print(len(callsign))  # 6`
}
```

### Section 2: String Slicing

```typescript
{
  title: "2. String Slicing",
  content: `Slicing extracts a portion of a string. The syntax is string[start:end] where:
- start: index where slice begins (inclusive)
- end: index where slice ends (exclusive - not included!)

If you omit start, it defaults to 0. If you omit end, it goes to the end of the string.`,
  codeExample: `mission = "APOLLO-11"

# Basic slicing [start:end]
print(mission[0:6])   # "APOLLO" (indices 0,1,2,3,4,5)
print(mission[7:9])   # "11" (indices 7,8)

# Omitting start or end
print(mission[:6])    # "APOLLO" (from beginning)
print(mission[7:])    # "11" (to end)
print(mission[:])     # "APOLLO-11" (full copy)

# With negative indices
print(mission[-2:])   # "11" (last 2 chars)
print(mission[:-3])   # "APOLLO" (all but last 3)`
}
```

### Section 3: String Concatenation

```typescript
{
  title: "3. String Concatenation",
  content: `Concatenation means joining strings together. Use the + operator to combine strings. Remember: you can only concatenate strings with strings - numbers must be converted first!`,
  codeExample: `# Basic concatenation
prefix = "Mission: "
name = "Apollo"
number = "11"
full = prefix + name + "-" + number
print(full)  # "Mission: Apollo-11"

# Building messages
crew = "Armstrong"
role = "Commander"
message = crew + " is the " + role
print(message)

# With numbers (must convert!)
altitude = 400
status = "Altitude: " + str(altitude) + " km"
print(status)

# Accumulating in loops
result = ""
for char in "NASA":
    result += char + "-"
print(result)  # "N-A-S-A-"`
}
```

### Section 4: String Iteration

```typescript
{
  title: "4. Iterating Through Strings",
  content: `Strings are sequences, so you can loop through them character by character. This is essential for processing text data.

Two approaches:
1. By character: for char in string
2. By index: for i in range(len(string))`,
  codeExample: `transmission = "SOS"

# Method 1: By character (simpler)
for char in transmission:
    print(f"Received: {char}")

# Method 2: By index (when you need position)
for i in range(len(transmission)):
    print(f"Position {i}: {transmission[i]}")

# Processing each character
code = "ABC123"
letters = ""
numbers = ""
for char in code:
    if char.isalpha():
        letters += char
    else:
        numbers += char
print(letters, numbers)  # "ABC" "123"`
}
```

### Section 5: String Methods

```typescript
{
  title: "5. Useful String Methods",
  content: `Python strings have built-in methods for common operations. Methods are called with dot notation: string.method()`,
  tableData: {
    headers: ["Method", "Purpose", "Example", "Result"],
    rows: [
      [".upper()", "Convert to uppercase", "'apollo'.upper()", "'APOLLO'"],
      [".lower()", "Convert to lowercase", "'NASA'.lower()", "'nasa'"],
      [".strip()", "Remove whitespace", "'  hi  '.strip()", "'hi'"],
      [".replace(a,b)", "Replace a with b", "'cat'.replace('c','b')", "'bat'"],
      [".find(x)", "Find position of x", "'hello'.find('l')", "2"],
      [".count(x)", "Count occurrences", "'hello'.count('l')", "2"]
    ]
  },
  codeExample: `signal = "  MAYDAY  "

# Clean and normalize
clean = signal.strip()      # "MAYDAY"
lower = clean.lower()       # "mayday"

# Search and replace
message = "Alert: Code Red"
position = message.find("Red")  # 12
count = message.count("e")      # 2
replaced = message.replace("Red", "Blue")

# Chaining methods
raw = "  hello world  "
processed = raw.strip().upper()  # "HELLO WORLD"`
}
```

### Section 6: Parsing Data

```typescript
{
  title: "6. Parsing Formatted Data",
  content: `Real mission data often comes in formatted strings. You'll need to extract specific pieces using slicing, splitting, or find operations.

Common patterns:
- Fixed positions: data = line[10:15]
- Delimiters: parts = line.split(",")
- Search and extract: pos = line.find(":")"`,
  codeExample: `# Fixed format log entry
log = "2024-03-15|LAUNCH|SUCCESS"

# Extract by position
date = log[0:10]        # "2024-03-15"
event = log[11:17]      # "LAUNCH"
status = log[18:]       # "SUCCESS"

# Extract by splitting
parts = log.split("|")
print(parts[0])  # "2024-03-15"
print(parts[1])  # "LAUNCH"
print(parts[2])  # "SUCCESS"

# Find and extract
data = "Temperature: 273K"
colon_pos = data.find(":")
value = data[colon_pos + 2:]  # "273K"`
}
```

---

## Challenges

### Challenge 1: Signal Decode

```typescript
{
  id: 1,
  title: "Signal Decode",
  description: `Decode a transmission by extracting specific characters.

Given transmission = "ALPHA-BRAVO-CHARLIE":
1. Print the first character (index 0)
2. Print the last character (negative index)
3. Print the 7th character (index 6)

Each should be on its own line with a label like "First: A"`,
  starterCode: `# MISSION: Signal Decode
# Extract key characters from transmission

def decode_signal():
    transmission = "ALPHA-BRAVO-CHARLIE"
    
    # Extract and print:
    # 1. First character
    # 2. Last character  
    # 3. 7th character (index 6)
    pass

# === Mission Control Test ===
decode_signal()`,
  hint: `Use transmission[0] for first, transmission[-1] for last. Remember indexing starts at 0!`,
  conceptTags: ["indexing", "positive index", "negative index"]
}
```

### Challenge 2: Callsign Extract

```typescript
{
  id: 2,
  title: "Callsign Extract",
  description: `Extract the callsign from a mission identifier.

Given mission_id = "APOLLO-11-NASA":
1. Extract "APOLLO" (first 6 characters) using slicing
2. Extract "11" (characters at positions 7-8)
3. Extract "NASA" (last 4 characters)

Print each extracted part with a label.`,
  starterCode: `# MISSION: Callsign Extract
# Parse mission identifier

def extract_callsign():
    mission_id = "APOLLO-11-NASA"
    
    # Extract using slicing:
    # 1. Program name (first 6)
    # 2. Mission number (positions 7-8)
    # 3. Agency (last 4)
    pass

# === Mission Control Test ===
extract_callsign()`,
  hint: `Use mission_id[0:6] for first 6, mission_id[7:9] for positions 7-8, mission_id[-4:] for last 4.`,
  conceptTags: ["slicing", "substring", "negative slicing"]
}
```

### Challenge 3: Message Assembly

```typescript
{
  id: 3,
  title: "Message Assembly",
  description: `Build a status message by concatenating parts.

Create these variables:
- spacecraft = "Voyager"
- status = "operational"
- days = 45 (integer!)

Concatenate them to print:
"Voyager is operational after 45 days"

Remember: numbers need str() to concatenate!`,
  starterCode: `# MISSION: Message Assembly
# Build status transmission

def assemble_message():
    spacecraft = "Voyager"
    status = "operational"
    days = 45
    
    # Build and print the full message
    # "Voyager is operational after 45 days"
    pass

# === Mission Control Test ===
assemble_message()`,
  hint: `Use + to join strings. Convert days with str(days). Don't forget the spaces!`,
  conceptTags: ["concatenation", "str()", "building strings"]
}
```

### Challenge 4: Transmission Scan

```typescript
{
  id: 4,
  title: "Transmission Scan",
  description: `Scan a transmission and report each character with its position.

Given message = "MARS":
Loop through and print:
"Position 0: M"
"Position 1: A"
"Position 2: R"
"Position 3: S"

You'll need to use range(len()) to get both index and character.`,
  starterCode: `# MISSION: Transmission Scan
# Report each character position

def scan_transmission():
    message = "MARS"
    
    # Loop with index access
    # Print "Position X: Y" for each
    pass

# === Mission Control Test ===
scan_transmission()`,
  hint: `Use: for i in range(len(message)): then access message[i] inside the loop.`,
  conceptTags: ["iteration", "range", "len", "indexing"]
}
```

### Challenge 5: Signal Cleanup

```typescript
{
  id: 5,
  title: "Signal Cleanup",
  description: `Clean up a noisy transmission using string methods.

Given raw_signal = "  mayday MAYDAY  ":
1. Remove the whitespace from both ends
2. Convert to uppercase
3. Print the clean result

The final output should be: "MAYDAY MAYDAY"`,
  starterCode: `# MISSION: Signal Cleanup
# Clean corrupted transmission

def cleanup_signal():
    raw_signal = "  mayday MAYDAY  "
    
    # Clean the signal:
    # 1. Strip whitespace
    # 2. Convert to uppercase
    # Print result
    pass

# === Mission Control Test ===
cleanup_signal()`,
  hint: `Chain methods: raw_signal.strip().upper() does both operations!`,
  conceptTags: ["methods", "strip", "upper", "chaining"]
}
```

### Challenge 6: Character Counter

```typescript
{
  id: 6,
  title: "Character Counter",
  description: `Analyze a message by counting specific characters.

Given code = "ALPHA BRAVO ALPHA":
1. Count how many times "A" appears
2. Count how many spaces there are
3. Print the total length

Use loops and a counter (or the .count() method).`,
  starterCode: `# MISSION: Message Analysis
# Count characters in transmission

def count_chars():
    code = "ALPHA BRAVO ALPHA"
    
    # Count:
    # 1. Letter A occurrences
    # 2. Space occurrences
    # 3. Total length
    pass

# === Mission Control Test ===
count_chars()`,
  hint: `You can use code.count("A") or loop and count manually. len(code) gives total length.`,
  conceptTags: ["count", "len", "methods", "counter pattern"]
}
```

### Challenge 7: Log Parser

```typescript
{
  id: 7,
  title: "Log Parser",
  description: `Parse a mission log entry to extract data.

Given log = "2024-03-15|LAUNCH|SUCCESS|Kennedy":

Split by "|" and print:
"Date: 2024-03-15"
"Event: LAUNCH"
"Status: SUCCESS"
"Location: Kennedy"

Use the .split() method to break apart the string.`,
  starterCode: `# MISSION: Log Parser
# Extract data from formatted log

def parse_log():
    log = "2024-03-15|LAUNCH|SUCCESS|Kennedy"
    
    # Split the log by "|"
    # Print each field with label
    pass

# === Mission Control Test ===
parse_log()`,
  hint: `parts = log.split("|") creates a list. Access with parts[0], parts[1], etc.`,
  conceptTags: ["split", "parsing", "formatted data"]
}
```

### Challenge 8: Encrypted Message

```typescript
{
  id: 8,
  title: "Encrypted Message",
  description: `Decrypt a message using string manipulation techniques.

The encryption shifts each letter position: "B" becomes "A", "C" becomes "B", etc.

Given encrypted = "TFDSFU DPEF":
1. Loop through each character
2. If it's a letter, shift it back by 1 (hint: use chr() and ord())
3. If it's a space, keep it as a space
4. Build and print the decrypted message

The chr() function converts a number to a character.
The ord() function converts a character to its number.
ord('B') = 66, chr(65) = 'A'`,
  starterCode: `# MISSION: Decrypt Transmission
# Decode the secret message

def decrypt():
    encrypted = "TFDSFU DPEF"
    decrypted = ""
    
    # Loop through each character
    # If letter: shift back by 1 using chr(ord(char) - 1)
    # If space: keep as space
    # Build decrypted string
    pass

# === Mission Control Test ===
decrypt()`,
  hint: `Check if char is a space with if char == " ". Otherwise use chr(ord(char) - 1) to shift. Build result string with decrypted += new_char`,
  conceptTags: ["synthesis", "chr", "ord", "accumulator", "conditional"]
}
```

---

## Implementation Notes

### Files to Modify

1. **`data/level4_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 4 tasks:
```typescript
{
  id: 4,
  title: "String Manipulation",
  syllabus: "B2.1.2",
  description: "Decode incoming text transmissions.",
  tasks: [
    { id: "4-1", text: "Indexing: accessing single characters" },
    { id: "4-2", text: "Slicing: extracting substrings" },
    { id: "4-3", text: "Concatenation: joining strings" },
    { id: "4-4", text: "Iteration: looping through strings" },
    { id: "4-5", text: "Methods: upper(), lower(), strip()" },
    { id: "4-6", text: "Counting and length" },
    { id: "4-7", text: "Parsing formatted data" },
    { id: "4-8", text: "Synthesis: complex string processing" }
  ]
}
```

### Key Concepts from IB Syllabus (B2.1.2)
- String extraction operations
- Character access by index
- Substring extraction
- String concatenation
- String traversal

---

## Expected Outputs

| Challenge | Expected Output |
|-----------|-----------------|
| 1 | "A", "E", "B" (first, last, 7th) |
| 2 | "APOLLO", "11", "NASA" |
| 3 | "Voyager is operational after 45 days" |
| 4 | Position 0-3 with M,A,R,S |
| 5 | "MAYDAY MAYDAY" |
| 6 | A:4, spaces:2, length:17 |
| 7 | Four labeled fields |
| 8 | "SECRET CODE" |

---

*Level 4 Plan - Version 1.0*

