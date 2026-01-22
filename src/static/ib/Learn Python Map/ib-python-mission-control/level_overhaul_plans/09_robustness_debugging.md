# Level 9: Robustness & Debugging

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 9 |
| **Title** | Robustness & Debugging |
| **Syllabus** | B2.1.3, B2.1.4 |
| **Challenge Count** | 6 |
| **Prerequisites** | Levels 1-8 (all foundational concepts) |

---

## ⚠️ SPECIAL LEVEL: Theory + Practice

This level covers:
- **B2.1.3**: Trace tables (theoretical, exam skill)
- **B2.1.4**: Error handling (practical Python)

Includes trace exercises alongside coding challenges.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Create and complete trace tables to track variable states
2. Use print statements for debugging
3. Understand common error types: ValueError, TypeError, ZeroDivisionError, IOError
4. Implement try-except blocks for error handling
5. Catch specific exception types
6. Create input validation loops
7. Design robust programs that handle edge cases

---

## Synoptic Connections

### From All Previous Levels:
- Variables and data types (what can go wrong)
- Selection and loops (trace tables)
- Functions (where errors propagate)
- File operations (IOError handling)

---

## Space-Themed Variables

```
# Error scenarios
fuel_input, temperature, division_result
sensor_reading, file_path, user_input

# Validation
is_valid, error_message, attempts
```

---

## Base Content Sections

### Section 1: What is Robustness?

```typescript
{
  title: "1. Building Robust Programs",
  content: `A robust program handles unexpected situations gracefully instead of crashing. Space missions can't afford crashes!

Common issues to handle:
- Invalid user input (letters when expecting numbers)
- Division by zero
- Missing files
- Out-of-range values

Good programs anticipate problems and respond appropriately.`,
  codeExample: `# Fragile code (will crash)
# age = int(input("Age: "))  # Crashes if user types "abc"

# Robust code (handles errors)
try:
    age = int(input("Age: "))
    print(f"You are {age} years old")
except ValueError:
    print("Error: Please enter a number")

# Program continues instead of crashing!`
}
```

### Section 2: Trace Tables

```typescript
{
  title: "2. Trace Tables for Debugging",
  content: `A trace table tracks variable values as code executes line by line. This is a crucial exam skill and debugging technique.

How to create:
1. List all variables as column headers
2. Add a row for each line that changes a value
3. Fill in the new value (leave unchanged cells blank or repeat)`,
  tableData: {
    headers: ["Line", "x", "y", "total"],
    rows: [
      ["1: x = 5", "5", "-", "-"],
      ["2: y = 3", "5", "3", "-"],
      ["3: total = x + y", "5", "3", "8"],
      ["4: x = x + 1", "6", "3", "8"],
      ["5: total = x * y", "6", "3", "18"]
    ]
  },
  codeExample: `# Code to trace:
x = 5
y = 3
total = x + y
x = x + 1
total = x * y

# After tracing, we know:
# x = 6, y = 3, total = 18`
}
```

### Section 3: Common Error Types

```typescript
{
  title: "3. Common Python Errors",
  content: `Python has specific error types for different problems. Knowing these helps you write targeted error handling.`,
  tableData: {
    headers: ["Error Type", "Cause", "Example"],
    rows: [
      ["ValueError", "Invalid value for operation", "int('abc')"],
      ["TypeError", "Wrong type for operation", "'5' + 5"],
      ["ZeroDivisionError", "Division by zero", "10 / 0"],
      ["IndexError", "List index out of range", "[1,2][5]"],
      ["KeyError", "Dict key doesn't exist", "d['missing']"],
      ["FileNotFoundError", "File doesn't exist", "open('no.txt')"]
    ]
  },
  codeExample: `# These will crash without handling:
# int("hello")      # ValueError
# "text" + 5        # TypeError
# 100 / 0           # ZeroDivisionError
# [1,2,3][10]       # IndexError

# See the error type in the traceback:
# Traceback (most recent call last):
#   File "example.py", line 1
#     x = 10 / 0
# ZeroDivisionError: division by zero`
}
```

### Section 4: try-except Basics

```typescript
{
  title: "4. Basic Exception Handling",
  content: `The try-except block lets you "try" risky code and "catch" errors if they occur.

Structure:
try:
    # risky code
except:
    # runs if ANY error occurs`,
  codeExample: `# Basic try-except
try:
    fuel = int(input("Enter fuel level: "))
    print(f"Fuel: {fuel}%")
except:
    print("Error: Invalid input!")

# The program continues even after an error
print("Program still running!")

# Example flow with invalid input:
# User types "abc"
# ValueError occurs
# except block runs: "Error: Invalid input!"
# Program continues: "Program still running!"`
}
```

### Section 5: Catching Specific Errors

```typescript
{
  title: "5. Catching Specific Exceptions",
  content: `Catch specific error types to handle different problems differently. This is more professional and informative.

You can have multiple except blocks for different error types.`,
  codeExample: `def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Both inputs must be numbers!")
        return None

# Test different errors
safe_divide(10, 0)     # ZeroDivisionError
safe_divide(10, "5")   # TypeError
safe_divide(10, 2)     # Returns 5.0

# Multiple specific handlers
try:
    value = int(input("Enter number: "))
    result = 100 / value
except ValueError:
    print("Not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")`
}
```

### Section 6: Input Validation Loops

```typescript
{
  title: "6. Input Validation",
  content: `Keep asking for input until the user provides valid data. This ensures your program has good data to work with.

Pattern: Loop until valid, using try-except inside.`,
  codeExample: `def get_valid_fuel():
    while True:
        try:
            fuel = int(input("Enter fuel (0-100): "))
            if 0 <= fuel <= 100:
                return fuel
            else:
                print("Must be between 0 and 100!")
        except ValueError:
            print("Please enter a number!")

# This loops until valid input
fuel_level = get_valid_fuel()
print(f"Fuel set to: {fuel_level}%")

# Sample interaction:
# Enter fuel: abc       -> "Please enter a number!"
# Enter fuel: 150       -> "Must be between 0 and 100!"
# Enter fuel: 85        -> "Fuel set to: 85%"`
}
```

---

## Trace Exercises (Include in Base Content)

### Trace Exercise 1: Simple Loop
```python
total = 0
for i in range(1, 4):
    total = total + i
print(total)
```

Complete the trace table:
| Line | i | total |
|------|---|-------|
| 1: total = 0 | - | 0 |
| 2: i = 1 | 1 | 0 |
| 3: total = total + i | 1 | ? |
| 2: i = 2 | 2 | ? |
| 3: total = total + i | 2 | ? |
| ... | ... | ... |

### Trace Exercise 2: Selection
```python
x = 10
y = 5
if x > y:
    result = x - y
else:
    result = y - x
x = result * 2
```

| Line | x | y | result |
|------|---|---|--------|
| ? | ? | ? | ? |

---

## Challenges

### Challenge 1: Input Shield

```typescript
{
  id: 1,
  title: "Input Shield",
  description: `Protect your program from invalid input.

Create a function get_altitude() that:
1. Asks user for altitude (integer)
2. Uses try-except to catch invalid input
3. If valid: returns the altitude
4. If invalid: prints "Error: Invalid altitude!" and returns None

Test with both valid and invalid inputs.`,
  starterCode: `# MISSION: Input Shield
# Protect against invalid input

def get_altitude():
    try:
        # Get input and convert to int
        # Return the value
        pass
    except:
        # Handle the error
        # Return None
        pass

# === Mission Control Test ===
result = get_altitude()
if result is not None:
    print(f"Altitude: {result} km")
else:
    print("Failed to get altitude")`,
  hint: `Put altitude = int(input(...)) in the try block. If it fails, the except runs. Use except ValueError: for specific handling.`,
  conceptTags: ["try", "except", "ValueError", "input"]
}
```

### Challenge 2: Specific Errors

```typescript
{
  id: 2,
  title: "Specific Error Handler",
  description: `Handle different errors differently.

Create calculate_reading(value_str, divisor) that:
1. Converts value_str to float
2. Divides by divisor
3. Returns the result

Handle these specific errors:
- ValueError (bad conversion): print "Error: Invalid reading format"
- ZeroDivisionError (div by 0): print "Error: Divisor cannot be zero"

Return None for any error.

Test with:
- calculate_reading("100", 4) → 25.0
- calculate_reading("abc", 4) → ValueError
- calculate_reading("100", 0) → ZeroDivisionError`,
  starterCode: `# MISSION: Specific Error Handling
# Handle different errors appropriately

def calculate_reading(value_str, divisor):
    try:
        # Convert and calculate
        pass
    except ValueError:
        # Handle bad conversion
        pass
    except ZeroDivisionError:
        # Handle division by zero
        pass

# === Mission Control Test ===
print(calculate_reading("100", 4))   # Should print 25.0
print(calculate_reading("abc", 4))   # Should print error, None
print(calculate_reading("100", 0))   # Should print error, None`,
  hint: `Order matters! More specific exceptions should come before general ones. Each except block should print its message and return None.`,
  conceptTags: ["specific exceptions", "ValueError", "ZeroDivisionError"]
}
```

### Challenge 3: Safe Division

```typescript
{
  id: 3,
  title: "Safe Division System",
  description: `Create a robust division function for mission calculations.

Create safe_divide(a, b) that:
1. Attempts to divide a by b
2. If b is 0: print "Warning: Division by zero!", return 0
3. If either isn't a number: print "Error: Invalid number!", return None
4. If successful: return the result

Test thoroughly with various inputs.`,
  starterCode: `# MISSION: Safe Division
# Handle all division errors

def safe_divide(a, b):
    try:
        # Attempt division
        pass
    except ZeroDivisionError:
        # Handle divide by zero
        pass
    except TypeError:
        # Handle wrong types
        pass

# === Mission Control Test ===
print(safe_divide(100, 4))    # 25.0
print(safe_divide(100, 0))    # Warning, 0
print(safe_divide("100", 4))  # Error, None
print(safe_divide(100, "4"))  # Error, None`,
  hint: `ZeroDivisionError for b=0, TypeError for non-numeric types. Return appropriate values for each case.`,
  conceptTags: ["ZeroDivisionError", "TypeError", "robust design"]
}
```

### Challenge 4: File Safety

```typescript
{
  id: 4,
  title: "File Safety Protocol",
  description: `Handle file-related errors gracefully.

Create read_mission_file(filename) that:
1. Simulates checking if a file exists (use a list of "existing" files)
2. If file exists: return "Contents of [filename]"
3. If not: raise and handle FileNotFoundError, return None

Existing files: ["log.txt", "data.csv", "config.ini"]

Test with existing and non-existing files.`,
  starterCode: `# MISSION: File Safety
# Handle file access errors

def read_mission_file(filename):
    existing_files = ["log.txt", "data.csv", "config.ini"]
    
    try:
        # Check if file exists
        if filename not in existing_files:
            raise FileNotFoundError(f"File {filename} not found")
        # "Read" the file
        return f"Contents of {filename}"
    except FileNotFoundError as e:
        # Handle missing file
        pass

# === Mission Control Test ===
print(read_mission_file("log.txt"))      # Contents
print(read_mission_file("missing.txt"))  # Error, None`,
  hint: `Use 'raise' to trigger the error when file not in list. In except, print the error message and return None.`,
  conceptTags: ["FileNotFoundError", "raise", "custom errors"]
}
```

### Challenge 5: Input Validator

```typescript
{
  id: 5,
  title: "Input Validation Loop",
  description: `Create a robust input system that keeps asking until valid.

Create get_valid_temperature() that:
1. Loops until valid input received
2. Asks for temperature (float)
3. Must be between -273.15 and 1000 (valid range)
4. Handle non-numeric input with try-except
5. Check range with if statement
6. Return the valid temperature

User should see appropriate messages for each error type.`,
  starterCode: `# MISSION: Robust Input
# Validate until correct

def get_valid_temperature():
    while True:
        try:
            # Get input
            # Check range
            # Return if valid
            pass
        except ValueError:
            # Handle non-numeric
            pass

# === Mission Control Test ===
temp = get_valid_temperature()
print(f"Temperature set: {temp}°C")`,
  hint: `Use while True with return to exit when valid. Check ValueError first (conversion), then check range with if/else.`,
  conceptTags: ["validation loop", "while", "try-except", "range check"]
}
```

### Challenge 6: Robust Mission System

```typescript
{
  id: 6,
  title: "Robust Mission System",
  description: `Build a complete robust system combining all error handling techniques.

Create a mission calculator that:
1. Gets mission distance (must be positive integer)
2. Gets fuel efficiency (must be positive float)
3. Gets available fuel (must be positive integer)

Calculates:
- Fuel needed = distance / efficiency
- Can complete = available >= needed

Handle ALL possible errors:
- Invalid types (ValueError)
- Division issues (ZeroDivisionError)
- Invalid ranges (custom validation)

Print a full mission report or appropriate error messages.`,
  starterCode: `# MISSION: Robust Calculator
# Complete error handling system

def get_positive_int(prompt):
    """Get a positive integer with validation"""
    while True:
        try:
            value = int(input(prompt))
            if value > 0:
                return value
            print("Must be positive!")
        except ValueError:
            print("Enter a whole number!")

def get_positive_float(prompt):
    """Get a positive float with validation"""
    # Implement similar to above
    pass

def calculate_mission():
    """Main mission calculator"""
    # Get all inputs with validation
    # Calculate fuel needed
    # Determine if mission is feasible
    # Print report
    pass

# === Mission Control Test ===
calculate_mission()`,
  hint: `Build helper functions for each input type. Use them in the main calculator. Handle division carefully (efficiency could be very small).`,
  conceptTags: ["synthesis", "validation", "modular design", "complete system"]
}
```

---

## Implementation Notes

### Files to Modify

1. **`data/level9_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 9 tasks:
```typescript
{
  id: 9,
  title: "Robustness & Debugging",
  syllabus: "B2.1.3, B2.1.4",
  description: "Handle system failures gracefully.",
  tasks: [
    { id: "9-1", text: "Trace tables for debugging" },
    { id: "9-2", text: "Basic try-except blocks" },
    { id: "9-3", text: "Specific exception types" },
    { id: "9-4", text: "File error handling" },
    { id: "9-5", text: "Input validation loops" },
    { id: "9-6", text: "Complete robust system" }
  ]
}
```

### Key IB Points
- B2.1.3: Trace tables are EXAM questions
- B2.1.4: Error handling is practical Python
- Students must be able to manually trace code
- Understand common error types

---

## Expected Outputs

| Challenge | Key Behavior |
|-----------|--------------|
| 1 | Returns int or None |
| 2 | Different messages per error |
| 3 | Handles zero and type errors |
| 4 | Handles missing files |
| 5 | Loops until valid |
| 6 | Complete validated system |

---

*Level 9 Plan - Version 1.0*

