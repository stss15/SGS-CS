# Level Specification: P2 - Data Retrieval: Log Search

**Type**: Contained puzzle (student builds code)  
**Estimated Time**: 1-2 lessons  
**Prerequisites**: Level D

---

## Overview

Students implement search and sort functions for log entries. This demonstrates built-in sorting with key functions, list filtering, and dictionary access.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Open and read text files using `with open()` (B2.5 File I/O)
2. Parse structured text data into dictionaries
3. Use Python's sorted() with key parameter
4. Filter a list based on dictionary values
5. Understand lambda functions for key extraction
6. Apply sorting and searching to solve a puzzle

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| File I/O | Reading from and writing to files on disk |
| `with open()` | Context manager for safe file handling |
| sorted() | Built-in function that returns a sorted copy of a sequence |
| key function | A function passed to sorted() to extract comparison values |
| lambda | An anonymous (unnamed) inline function |
| List comprehension | Concise syntax for filtering/transforming lists |
| Dictionary access | Using `dict[key]` or `dict.get(key)` to retrieve values |
| Filter | Selecting items that match a condition |

---

## Student Deliverables

### File: `student/log_search.py`

### Function: `load_logs_from_file` (B2.5 File I/O)

| Aspect | Value |
|--------|-------|
| Signature | `load_logs_from_file(filepath: str) -> list` |
| Purpose | Read log entries from a pipe-delimited text file |
| Returns | List of log entry dicts |

**Text file format**: `timestamp|author|content|corrupted`

**Behaviour**:
- Open file with `with open(filepath, 'r')`
- Skip empty lines
- Split each line by `|`
- Convert to dict with timestamp (int), author, content, corrupted (bool)
- Return list of dicts

### Function: `search_logs`

| Aspect | Value |
|--------|-------|
| Signature | `search_logs(logs: list, author: str) -> list` |
| Purpose | Find all log entries by a specific author |
| Returns | List of matching log entry dicts |

### Function: `sort_logs`

| Aspect | Value |
|--------|-------|
| Signature | `sort_logs(logs: list, key: str, descending: bool = False) -> list` |
| Purpose | Sort log entries by a given key |
| Returns | Sorted list of log entry dicts |

### Function: `validate_code` (P3 puzzle)

| Aspect | Value |
|--------|-------|
| Signature | `validate_code(code: str, used_codes: set) -> bool` |
| Purpose | Check if a code has not been used before |
| Returns | True if valid (not in set), False if already used |

---

## Log Entry Format

Each log entry is a dictionary:

```
{
    "timestamp": 1699000400,    # Unix timestamp (int)
    "author": "Dr. Chen",       # Author name (str)
    "content": "The override key...",  # Log message (str)
    "corrupted": False          # Is entry unreadable (bool)
}
```

---

## The Puzzle (Engine-Owned)

**Narrative**: Thousands of corrupted log entries. Find Dr. Chen's non-corrupted entry with the override code.

**Mechanics**:
1. Engine provides list of 20 log entries
2. Student's search_logs finds entries by "Dr. Chen"
3. Student's sort_logs orders by timestamp (descending = most recent first)
4. Engine filters for non-corrupted, takes first match
5. Correct entry found = override key revealed

---

## Engine Content for This Level

### Rooms
- Same as Level D (Airlock, Storage, Lab)
- Preview: Research Archive

### Items
- Same as Level D
- Data Chip hint item

### New Features
- Research terminal in archive
- `use data_chip on terminal` activates puzzle
- Puzzle uses student's search/sort functions

---

## Validator Scope

1. **Structure**
   - search_logs function exists
   - sort_logs function exists
   - validate_code function exists

2. **Behaviour**
   - search_logs returns correct matches
   - sort_logs ascending works (lowest first)
   - sort_logs descending works (highest first)
   - validate_code returns True for new codes
   - validate_code returns False for used codes

---

## Reference Baseline

Ships with teacher's completed:
- All Level D code
- `data_structs.py` (from P1)

---

## Worksheet Focus

- How sorted() works with iterables
- Key functions: lambda vs def
- Why descending = reverse=True
- Dictionary access in key functions
- Set membership for validate_code

---

## Example Behaviour

```python
logs = [
    {"timestamp": 100, "author": "Alice", "content": "First"},
    {"timestamp": 200, "author": "Bob", "content": "Second"},
    {"timestamp": 50, "author": "Alice", "content": "Third"},
]

# Search
alice_logs = search_logs(logs, "Alice")
# Returns 2 log entries

# Sort ascending
sorted_asc = sort_logs(logs, "timestamp")
# First entry has timestamp 50

# Sort descending
sorted_desc = sort_logs(logs, "timestamp", descending=True)
# First entry has timestamp 200

# Validate code
used = {"ABC", "DEF"}
validate_code("GHI", used)  # True
validate_code("ABC", used)  # False
```

---

## UML Diagram

```
┌─────────────────────────────────────────────┐
│              log_search module              │
├─────────────────────────────────────────────┤
│ + search_logs(logs, author): list           │
│ + sort_logs(logs, key, descending): list    │
│ + validate_code(code, used_codes): bool     │
└─────────────────────────────────────────────┘
```

---

## Worksheet-Only Topics (2D Arrays)

This level's worksheet also covers:
- What are 2D arrays (matrices)?
- How to access elements: `matrix[row][col]`
- Use cases: game boards, images, spreadsheet data
- NOT required in the game — worksheet demonstration only

---

## Notes for Teachers

- This teaches "using built-ins" rather than implementing algorithms
- Students should use sorted(), not write bubble sort
- lambda syntax may be new — explain clearly
- validate_code uses set for O(1) lookup
- Common mistake: modifying original list instead of returning new
- Common mistake: forgetting descending parameter
