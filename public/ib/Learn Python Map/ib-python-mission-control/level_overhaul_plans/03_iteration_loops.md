# Level 3: Iteration (Loops)

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 3 |
| **Title** | Iteration (Loops) |
| **Syllabus** | B2.3.3 |
| **Challenge Count** | 10 |
| **Prerequisites** | Level 1 (Variables), Level 2 (Selection) |

---

## Learning Objectives

By the end of this level, students will be able to:
1. Use `for i in range(n)` for counted loops
2. Use `range(start, stop, step)` with all three parameters
3. Iterate through strings with `for char in string`
4. Iterate through lists with `for item in list` (preview for Level 5)
5. Use `while` loops for conditional iteration
6. Write `while` loops with multiple conditions using `and`/`or`
7. Use `break` to exit loops early
8. Use `continue` to skip iterations
9. Create accumulators (running totals)
10. Create counters
11. Avoid infinite loops

---

## Synoptic Connections

### From Level 1:
- Variables (loop counters, accumulators)
- Arithmetic operators (incrementing, totaling)
- Type casting (when processing input in loops)
- print() for showing loop progress

### From Level 2:
- Boolean conditions (for while loops)
- Comparison operators (loop termination)
- Logical operators (multiple conditions in while)
- if statements (decisions inside loops)

---

## Space-Themed Variables

```
# Loop counters
orbit_count, lap, cycle, day, iteration

# Accumulators  
total_distance, total_fuel_used, accumulated_data

# Conditions
fuel_remaining, altitude, signal_strength, target_found

# Collections (preview)
sensor_readings, crew_names, coordinates
```

---

## Base Content Sections

### Section 1: for Loops with range()

```typescript
{
  title: "1. Counted Loops: for with range()",
  content: `When you know exactly how many times you want to repeat something, use a for loop with range(). The loop variable takes each value in turn.

range(n) produces numbers from 0 up to (but not including) n.
range(5) → 0, 1, 2, 3, 4 (five numbers, but stops before 5)`,
  codeExample: `# Count down from 5 to 1
for i in range(5, 0, -1):
    print(i)
print("LIFTOFF!")

# Simple repeat (0 to 4)
for orbit in range(5):
    print("Completing orbit", orbit + 1)

# Output:
# Completing orbit 1
# Completing orbit 2
# ... etc`
}
```

### Section 2: range() Parameters

```typescript
{
  title: "2. range(start, stop, step)",
  content: `The range() function can take up to three arguments to control exactly which numbers are generated.`,
  tableData: {
    headers: ["Syntax", "Produces", "Example Output"],
    rows: [
      ["range(5)", "0, 1, 2, 3, 4", "0 to 4"],
      ["range(1, 6)", "1, 2, 3, 4, 5", "1 to 5"],
      ["range(0, 10, 2)", "0, 2, 4, 6, 8", "Evens"],
      ["range(10, 0, -1)", "10, 9, 8...1", "Countdown"],
      ["range(5, 0, -1)", "5, 4, 3, 2, 1", "5 to 1"]
    ]
  },
  codeExample: `# Mission day counter (days 1-7)
for day in range(1, 8):
    print(f"Mission Day {day}")

# Check systems every 10 minutes (0, 10, 20...60)
for minute in range(0, 61, 10):
    print(f"System check at T+{minute} minutes")

# Countdown sequence
for t in range(10, 0, -1):
    print(t)
print("IGNITION!")`
}
```

### Section 3: Iterating Through Strings

```typescript
{
  title: "3. for char in string",
  content: `You can loop through each character in a string directly. This is useful for processing text data character by character - like decoding transmissions!

The loop variable takes each character in turn, from first to last.`,
  codeExample: `# Spell out a message
callsign = "APOLLO"
for letter in callsign:
    print(letter)
# Output: A P O L L O (each on new line)

# Process each character
transmission = "SOS"
for char in transmission:
    print(f"Received character: {char}")

# Count specific characters
code = "AABBBCCCC"
count_b = 0
for char in code:
    if char == "B":
        count_b += 1
print(f"Found {count_b} B's")`
}
```

### Section 4: while Loops

```typescript
{
  title: "4. Conditional Loops: while",
  content: `A while loop repeats AS LONG AS its condition is True. Use while when you don't know how many iterations you'll need.

DANGER: If the condition never becomes False, you create an infinite loop! Always ensure something changes inside the loop to eventually make the condition False.`,
  codeExample: `# Fuel burn simulation
fuel = 100
while fuel > 0:
    print(f"Fuel remaining: {fuel}%")
    fuel -= 10  # Burn 10% each cycle

print("Fuel depleted!")

# Countdown with while
countdown = 5
while countdown > 0:
    print(countdown)
    countdown -= 1  # CRITICAL: must decrease!
print("LAUNCH!")

# Waiting for signal
signal_strength = 0
while signal_strength < 80:
    signal_strength += 15  # Signal improving
    print(f"Signal: {signal_strength}%")
print("Signal acquired!")`
}
```

### Section 5: while with Multiple Conditions

```typescript
{
  title: "5. while with and/or",
  content: `You can combine conditions in while loops just like in if statements. This lets you continue looping until multiple requirements are met.

Common patterns:
- while A and B: Continue while BOTH are true
- while A or B: Continue while EITHER is true`,
  codeExample: `# Continue while fuel available AND not at destination
fuel = 100
distance = 50

while fuel > 0 and distance > 0:
    print(f"Fuel: {fuel}, Distance: {distance}")
    fuel -= 10
    distance -= 10
    
if fuel <= 0:
    print("Ran out of fuel!")
elif distance <= 0:
    print("Destination reached!")

# Stop when ANY emergency occurs (using or)
fuel = 100
hull_ok = True
cycles = 0

while fuel > 20 and hull_ok and cycles < 5:
    cycles += 1
    fuel -= 15
    print(f"Cycle {cycles}: Fuel={fuel}")

print("Loop ended - check which condition failed")`
}
```

### Section 6: break - Early Exit

```typescript
{
  title: "6. break: Exit Loop Early",
  content: `The break statement immediately exits the current loop, skipping any remaining iterations. Use it when you find what you're looking for or detect an emergency.

break only exits the innermost loop if you have nested loops.`,
  codeExample: `# Search for a specific signal
signals = [45, 62, 78, 95, 83, 91]

for signal in signals:
    print(f"Checking signal: {signal}")
    if signal >= 90:
        print(f"Strong signal found: {signal}")
        break  # Stop searching

print("Search complete")

# Emergency abort in while loop
fuel = 100
while fuel > 0:
    fuel -= 10
    print(f"Fuel: {fuel}")
    
    if fuel == 50:
        print("ABORT: Mid-mission emergency!")
        break

print(f"Final fuel: {fuel}")`
}
```

### Section 7: continue - Skip Iteration

```typescript
{
  title: "7. continue: Skip to Next Iteration",
  content: `The continue statement skips the rest of the current iteration and jumps to the next one. Use it to skip invalid data or unwanted values.`,
  codeExample: `# Skip offline sensors (marked as -1)
readings = [23, -1, 45, -1, 67, 89, -1]

for reading in readings:
    if reading == -1:
        print("Sensor offline, skipping...")
        continue  # Skip to next reading
    
    print(f"Processing reading: {reading}")

# Skip even-numbered systems (check odds only)
for system_id in range(1, 10):
    if system_id % 2 == 0:
        continue  # Skip evens
    print(f"Checking system {system_id}")`
}
```

### Section 8: Accumulators

```typescript
{
  title: "8. Accumulator Pattern (Running Totals)",
  content: `An accumulator is a variable that collects values as a loop runs. You initialize it before the loop, add to it inside the loop, and use the final value after.

Pattern:
1. total = 0 (initialize)
2. Loop: total += value (accumulate)
3. After loop: use total`,
  codeExample: `# Total fuel consumption
burns = [45, 32, 28, 51, 39]
total_fuel = 0

for burn in burns:
    total_fuel += burn
    print(f"Burn: {burn}, Running total: {total_fuel}")

print(f"Total fuel used: {total_fuel} kg")

# Calculate average
readings = [23, 45, 67, 34, 56]
total = 0
for reading in readings:
    total += reading

average = total / len(readings)
print(f"Average reading: {average}")`
}
```

### Section 9: Counter Pattern

```typescript
{
  title: "9. Counter Pattern",
  content: `A counter tracks how many times something happens. Similar to an accumulator, but you increment by 1 each time a condition is met.`,
  codeExample: `# Count successful transmissions
signals = [85, 92, 45, 78, 95, 88, 72]
successful = 0

for signal in signals:
    if signal >= 80:
        successful += 1
        print(f"Signal {signal}: SUCCESS")
    else:
        print(f"Signal {signal}: FAILED")

print(f"Successful: {successful} out of {len(signals)}")

# Count occurrences of a character
message = "MAYDAY MAYDAY MAYDAY"
count_a = 0
for char in message:
    if char == "A":
        count_a += 1

print(f"Letter A appears {count_a} times")`
}
```

---

## Challenges

### Challenge 1: Countdown Sequence

```typescript
{
  id: 1,
  title: "Countdown Sequence",
  description: `Create the classic launch countdown!

Use a for loop with range() to:
1. Print numbers from 10 down to 1 (each on its own line)
2. After the loop, print "LIFTOFF!"

Hint: range() can count backwards with a negative step.`,
  starterCode: `# MISSION: Countdown Sequence
# The classic T-minus countdown

def countdown():
    # Use range(10, 0, -1) to count from 10 to 1
    # Then print "LIFTOFF!"
    pass

# === Mission Control Test ===
countdown()`,
  hint: `range(10, 0, -1) gives you 10, 9, 8... down to 1. The -1 is the step.`,
  conceptTags: ["for", "range", "step"]
}
```

### Challenge 2: Orbit Counter

```typescript
{
  id: 2,
  title: "Orbit Counter",
  description: `The spacecraft needs to complete 5 orbits. For each orbit, report the status.

Use a for loop to print:
"Orbit 1 complete"
"Orbit 2 complete"
...
"Orbit 5 complete"

After all orbits, print: "Orbital phase complete"

Note: range() starts at 0, so you'll need to adjust!`,
  starterCode: `# MISSION: Orbit Counter
# Track orbital progress

def count_orbits():
    # Complete 5 orbits
    # Print "Orbit X complete" for each
    # End with "Orbital phase complete"
    pass

# === Mission Control Test ===
count_orbits()`,
  hint: `Use range(1, 6) to get 1,2,3,4,5, or use range(5) and add 1 when printing.`,
  conceptTags: ["for", "range", "counting"]
}
```

### Challenge 3: Signal Scanner

```typescript
{
  id: 3,
  title: "Signal Scanner",
  description: `Scan through a callsign letter by letter.

Given callsign = "HOUSTON", use a for loop to iterate through each character and print:
"Receiving: H"
"Receiving: O"
... etc

This demonstrates iterating through a string directly.`,
  starterCode: `# MISSION: Signal Scanner
# Process incoming transmission

def scan_signal():
    callsign = "HOUSTON"
    
    # Loop through each character
    # Print "Receiving: X" for each letter
    pass

# === Mission Control Test ===
scan_signal()`,
  hint: `Use: for char in callsign: - the variable char takes each letter in turn.`,
  conceptTags: ["for", "string iteration", "char"]
}
```

### Challenge 4: Fuel Monitor

```typescript
{
  id: 4,
  title: "Fuel Monitor",
  description: `Monitor fuel levels during a burn sequence using a while loop.

Start with fuel = 100. Each cycle:
1. Print "Fuel level: X%"
2. Reduce fuel by 15

Continue WHILE fuel is greater than 20.
After the loop, print "Burn complete. Remaining: X%"`,
  starterCode: `# MISSION: Fuel Monitor
# Track fuel during burn

def fuel_monitor():
    fuel = 100
    
    # While fuel > 20:
    #   Print current level
    #   Reduce by 15
    # After loop: print remaining
    pass

# === Mission Control Test ===
fuel_monitor()`,
  hint: `Use while fuel > 20: and don't forget to decrease fuel inside the loop (fuel -= 15) or it runs forever!`,
  conceptTags: ["while", "decrement", "condition"]
}
```

### Challenge 5: Dual Condition Loop

```typescript
{
  id: 5,
  title: "Dual Condition Loop",
  description: `The spacecraft travels toward a target while managing fuel.

Given:
- fuel = 100
- distance = 80

Each cycle:
1. Print "Fuel: X, Distance: Y"
2. Decrease fuel by 20
3. Decrease distance by 20

Continue WHILE fuel > 0 AND distance > 0.

After, print which ran out first (or if target reached).`,
  starterCode: `# MISSION: Journey Monitor
# Track fuel AND distance

def journey_monitor():
    fuel = 100
    distance = 80
    
    # Loop while BOTH conditions true
    # Print status each cycle
    # Decrease both values
    # Report what ended the journey
    pass

# === Mission Control Test ===
journey_monitor()`,
  hint: `Use: while fuel > 0 and distance > 0: - both must be True to continue. After the loop, check which one caused the exit.`,
  conceptTags: ["while", "and", "multiple conditions"]
}
```

### Challenge 6: Abort Search

```typescript
{
  id: 6,
  title: "Abort Search",
  description: `Search through sensor data to find a critical reading.

Given readings = [45, 62, 38, 91, 55, 88]:
- Loop through each reading
- Print "Checking: X"
- If reading >= 90, print "CRITICAL READING FOUND: X" and STOP searching
- If no critical found, print "All readings normal"

Use break to exit early when found!`,
  starterCode: `# MISSION: Critical Reading Search
# Find and report critical values

def search_readings():
    readings = [45, 62, 38, 91, 55, 88]
    found = False
    
    # Loop through readings
    # Use break when critical found
    # Track if found with the boolean
    pass

# === Mission Control Test ===
search_readings()`,
  hint: `Use a boolean variable 'found' to track whether you found one. Set it True and break when reading >= 90.`,
  conceptTags: ["for", "break", "search", "flag"]
}
```

### Challenge 7: Skip Offline

```typescript
{
  id: 7,
  title: "Skip Offline Sensors",
  description: `Process sensor data, but skip offline sensors (marked as -1).

Given data = [23, -1, 45, -1, -1, 67, 89]:
- Loop through each value
- If value is -1, print "Sensor offline - skipping" and continue to next
- Otherwise, print "Processing: X"

Use continue to skip the bad readings.`,
  starterCode: `# MISSION: Data Processing
# Skip invalid sensor readings

def process_sensors():
    data = [23, -1, 45, -1, -1, 67, 89]
    
    # Loop through data
    # Use continue to skip -1 values
    # Process valid readings
    pass

# === Mission Control Test ===
process_sensors()`,
  hint: `Use: if value == -1: followed by print message and continue. The continue skips to the next iteration.`,
  conceptTags: ["for", "continue", "skip", "validation"]
}
```

### Challenge 8: Fuel Total

```typescript
{
  id: 8,
  title: "Fuel Total",
  description: `Calculate total fuel consumption from multiple burns.

Given burns = [45, 32, 28, 51, 39]:
1. Create a total variable starting at 0
2. Loop through each burn amount
3. Add each burn to the total
4. After each addition, print "Burn: X, Running total: Y"
5. After loop, print "Total fuel used: Z kg"`,
  starterCode: `# MISSION: Fuel Accounting
# Calculate total fuel consumption

def fuel_total():
    burns = [45, 32, 28, 51, 39]
    total = 0
    
    # Accumulate all burn values
    # Show running total after each
    # Print final total
    pass

# === Mission Control Test ===
fuel_total()`,
  hint: `Use the accumulator pattern: total = 0 before loop, total += burn inside loop.`,
  conceptTags: ["accumulator", "total", "for"]
}
```

### Challenge 9: Success Counter

```typescript
{
  id: 9,
  title: "Success Counter",
  description: `Count how many transmissions were successful.

Given signals = [85, 92, 45, 78, 95, 88, 72]:
- A signal >= 80 is successful
- Count the successful signals
- Print each signal with "SUCCESS" or "FAILED"
- At end, print "Successful: X out of Y"

Use the counter pattern!`,
  starterCode: `# MISSION: Transmission Report
# Count successful signals

def count_success():
    signals = [85, 92, 45, 78, 95, 88, 72]
    successful = 0
    
    # Check each signal
    # Increment counter for successes
    # Print summary at end
    pass

# === Mission Control Test ===
count_success()`,
  hint: `Counter pattern: successful = 0 before loop, if signal >= 80: successful += 1 inside loop.`,
  conceptTags: ["counter", "if", "for"]
}
```

### Challenge 10: Mission Simulation

```typescript
{
  id: 10,
  title: "Mission Simulation",
  description: `Run a complete mission simulation combining all loop concepts!

Get these inputs from the user:
- starting_fuel (integer)
- burn_rate (integer) 
- target_distance (integer)

Simulation rules:
- Each cycle: fuel decreases by burn_rate, distance decreases by 10
- Print status each cycle: "Cycle X: Fuel=Y, Distance=Z"
- Continue while fuel > 0 AND distance > 0
- Count total cycles completed

After simulation, print:
- "Mission complete!" if distance reached 0
- "Mission failed - out of fuel" if fuel ran out
- "Cycles completed: X"`,
  starterCode: `# MISSION: Full Simulation
# Complete mission with all loop concepts

def mission_sim():
    # Get inputs
    starting_fuel = int(input("Starting fuel: "))
    burn_rate = int(input("Burn rate per cycle: "))
    target_distance = int(input("Target distance: "))
    
    fuel = starting_fuel
    distance = target_distance
    cycles = 0
    
    # Run simulation loop
    # Use while with multiple conditions
    # Count cycles
    # Report outcome
    pass

# === Mission Control Test ===
mission_sim()`,
  hint: `Combine: while loop with and, counter for cycles, accumulator concepts. Check which condition caused exit.`,
  conceptTags: ["synthesis", "while", "counter", "multiple conditions", "input"]
}
```

---

## Implementation Notes

### Files to Modify

1. **`data/level3_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 3 tasks:
```typescript
{
  id: 3,
  title: "Iteration (Loops)",
  syllabus: "B2.3.3",
  description: "Automate repetitive orbital maneuvers.",
  tasks: [
    { id: "3-1", text: "for loops with range() basics" },
    { id: "3-2", text: "range(start, stop, step) parameters" },
    { id: "3-3", text: "Iterating through strings" },
    { id: "3-4", text: "while loops for conditional iteration" },
    { id: "3-5", text: "while with multiple conditions (and/or)" },
    { id: "3-6", text: "break for early loop exit" },
    { id: "3-7", text: "continue to skip iterations" },
    { id: "3-8", text: "Accumulator pattern (running totals)" },
    { id: "3-9", text: "Counter pattern" },
    { id: "3-10", text: "Mission synthesis: combining loop concepts" }
  ]
}
```

### Common Pitfalls

1. **Infinite loops**: Always ensure while conditions will eventually become False
2. **Off-by-one errors**: range(5) gives 0-4, not 1-5
3. **Forgetting to update variables**: While loops need something to change!
4. **Indentation**: Loop body must be indented consistently

---

## Expected Outputs

| Challenge | Key Output |
|-----------|------------|
| 1 | 10, 9, 8...1, LIFTOFF! |
| 2 | Orbit 1-5 complete messages |
| 3 | Each letter of HOUSTON |
| 4 | Fuel decreasing, ends at 25 |
| 5 | Journey until distance=0 |
| 6 | Stops at 91 with break |
| 7 | Skips three -1 values |
| 8 | Running total reaching 195 |
| 9 | 4 out of 7 successful |
| 10 | Varies based on input |

---

*Level 3 Plan - Version 1.0*

