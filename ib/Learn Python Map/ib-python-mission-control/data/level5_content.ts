/**
 * Level 5: Lists (Arrays)
 * IB Syllabus Reference: B2.2.1, B2.2.2
 *
 * Learning Objectives:
 * - Understand Python lists as dynamic arrays
 * - Create, access, and modify list elements
 * - Use core list methods to add/remove items
 * - Traverse lists by element and by index
 * - Build and navigate 2D lists (grids)
 * - Use nested loops for 2D traversal
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Managing collections of data
// ============================================================================

export const level5BaseContent: LessonSection[] = [
  {
    title: "1. Lists: Ordered Collections",
    content: `A list is an ordered collection of items. Unlike single variables, lists can hold multiple values of any type. In Python, lists are dynamic - they can grow and shrink as needed.

Lists are created with square brackets [] and items are separated by commas.`,
    codeExample: `# Creating lists
crew = ["Armstrong", "Collins", "Aldrin"]
fuel_readings = [85.5, 82.3, 79.1, 76.8]
system_status = [True, True, False, True]
empty_list = []

# Lists can mix types (but usually don't)
mixed = ["Apollo", 11, True, 3.14]

# Check length
print(len(crew))  # 3`
  },
  {
    title: "2. Accessing List Elements",
    content: `Access list elements using index numbers in square brackets. Like strings, indexing starts at 0. Negative indices count from the end.`,
    tableData: {
      headers: ["List", "Index 0", "Index 1", "Index 2", "Index -1"],
      rows: [
        ["['A', 'B', 'C']", "A", "B", "C", "C"],
        ["[10, 20, 30]", "10", "20", "30", "30"]
      ]
    },
    codeExample: `crew = ["Armstrong", "Collins", "Aldrin"]

# Positive indexing
print(crew[0])   # "Armstrong" (first)
print(crew[1])   # "Collins" (second)
print(crew[2])   # "Aldrin" (third)

# Negative indexing
print(crew[-1])  # "Aldrin" (last)
print(crew[-2])  # "Collins" (second-to-last)

# Out of range = Error!
# print(crew[5])  # IndexError!`
  },
  {
    title: "3. Modifying List Elements",
    content: `Unlike strings, lists are mutable - you can change their contents! Use index assignment to update specific elements.`,
    codeExample: `readings = [100, 95, 88, 92]

# Change an element
readings[2] = 90  # Was 88, now 90
print(readings)   # [100, 95, 90, 92]

# Multiple changes
readings[0] = 98
readings[-1] = 95
print(readings)   # [98, 95, 90, 95]

# Conditional update
status = ["GO", "GO", "NO-GO", "GO"]
if status[2] == "NO-GO":
    status[2] = "RESOLVED"
print(status)  # ["GO", "GO", "RESOLVED", "GO"]`
  },
  {
    title: "4. Core List Methods",
    content: `Python lists have built-in methods for adding and removing elements.`,
    tableData: {
      headers: ["Method", "Action", "Example", "Result"],
      rows: [
        [".append(x)", "Add x to end", "[1,2].append(3)", "[1,2,3]"],
        [".insert(i,x)", "Insert x at index i", "[1,3].insert(1,2)", "[1,2,3]"],
        [".pop()", "Remove & return last", "[1,2,3].pop()", "3, list=[1,2]"],
        [".pop(i)", "Remove & return at i", "[1,2,3].pop(0)", "1, list=[2,3]"],
        [".remove(x)", "Remove first x found", "[1,2,2].remove(2)", "[1,2]"]
      ]
    },
    codeExample: `crew = ["Armstrong", "Collins"]

# Add to end
crew.append("Aldrin")
print(crew)  # ["Armstrong", "Collins", "Aldrin"]

# Insert at position
crew.insert(0, "Mission Commander")
# ["Mission Commander", "Armstrong", "Collins", "Aldrin"]

# Remove and get last
last = crew.pop()
print(last)  # "Aldrin"

# Remove by value
crew.remove("Collins")
print(crew)  # ["Mission Commander", "Armstrong"]`
  },
  {
    title: "5. Traversal by Element",
    content: `The simplest way to process every item in a list is to loop through by element. Use this when you only need the values, not their positions.`,
    codeExample: `readings = [85, 92, 78, 95, 88]

# Simple traversal
for reading in readings:
    print(f"Sensor reading: {reading}")

# With accumulator
total = 0
for reading in readings:
    total += reading
average = total / len(readings)
print(f"Average: {average}")

# With counter
high_count = 0
for reading in readings:
    if reading > 90:
        high_count += 1
print(f"High readings: {high_count}")`
  },
  {
    title: "6. Traversal by Index",
    content: `When you need to know the position of each element (or modify elements), traverse by index using range(len(list)).`,
    codeExample: `systems = ["Engines", "Life Support", "Navigation", "Comms"]

# Print with positions
for i in range(len(systems)):
    print(f"System {i}: {systems[i]}")

# Modify elements (can't do with element traversal!)
readings = [80, 75, 82, 78]
for i in range(len(readings)):
    readings[i] += 5  # Boost all by 5
print(readings)  # [85, 80, 87, 83]

# Find index of maximum
values = [23, 67, 45, 89, 34]
max_index = 0
for i in range(len(values)):
    if values[i] > values[max_index]:
        max_index = i
print(f"Max at index {max_index}: {values[max_index]}")`
  },
  {
    title: "7. 2D Lists: Grids and Matrices",
    content: `A 2D list is a list of lists - like a grid or table. Access elements with two indices: grid[row][col].

Think of it as: row first (which list), then column (which element in that list).`,
    codeExample: `# Cargo bay: 3 rows, 4 columns
cargo = [
    ["Food", "Water", "Oxygen", "Spare"],
    ["Tools", "Empty", "Medical", "Empty"],
    ["Fuel", "Fuel", "Fuel", "Empty"]
]

# Access single element
print(cargo[0][0])  # "Food" (row 0, col 0)
print(cargo[1][2])  # "Medical" (row 1, col 2)
print(cargo[2][0])  # "Fuel" (row 2, col 0)

# Modify element
cargo[1][1] = "Radio"  # Fill empty spot

# Dimensions
rows = len(cargo)       # 3
cols = len(cargo[0])    # 4`
  },
  {
    title: "8. Traversing 2D Lists",
    content: `To process every element in a 2D list, use nested loops. The outer loop iterates through rows, the inner loop through columns.`,
    codeExample: `# Sensor grid (2D readings)
sensor_grid = [
    [85, 90, 88],
    [78, 82, 80],
    [92, 95, 91]
]

# Print entire grid
for row in range(len(sensor_grid)):
    for col in range(len(sensor_grid[row])):
        print(f"[{row}][{col}] = {sensor_grid[row][col]}")

# Count values above threshold
high_count = 0
for row in sensor_grid:
    for value in row:
        if value > 90:
            high_count += 1
print(f"High readings: {high_count}")

# Calculate total of all values
total = 0
for row in sensor_grid:
    for value in row:
        total += value
print(f"Total: {total}")`
  }
];

// ============================================================================
// CHALLENGES - 10 list and grid missions
// ============================================================================

export const level5Challenges: Challenge[] = [
  {
    id: 1,
    title: "Crew Roster",
    description: `Create and display a crew roster.

1. Create a list called crew with these names: "Armstrong", "Collins", "Aldrin"
2. Print the entire list
3. Print the number of crew members using len()
4. Print the first crew member's name
5. Print the last crew member's name (use negative indexing)`,
    starterCode: `# MISSION: Crew Roster
# Create and display crew list

def crew_roster():
    # Create the crew list
    
    # Print entire list
    
    # Print length
    
    # Print first member
    
    # Print last member
    pass

# === Mission Control Test ===
crew_roster()`,
    hint: `Create list with crew = ["Armstrong", "Collins", "Aldrin"]. Use len(crew) for count, crew[0] for first, crew[-1] for last.`,
    conceptTags: ["list creation", "len", "indexing"]
  },
  {
    id: 2,
    title: "Mission Update",
    description: `Update mission status in a list.

Given status = ["GO", "GO", "NO-GO", "GO"]:
1. Print the original list
2. Change the "NO-GO" (index 2) to "GO"
3. Print the updated list
4. Change the last status to "COMPLETE"
5. Print the final list`,
    starterCode: `# MISSION: Status Update
# Modify mission status list

def update_status():
    status = ["GO", "GO", "NO-GO", "GO"]
    
    # Print original
    
    # Fix the NO-GO
    
    # Print updated
    
    # Mark last as COMPLETE
    
    # Print final
    pass

# === Mission Control Test ===
update_status()`,
    hint: `Use status[2] = "GO" to modify. Use status[-1] = "COMPLETE" for the last element.`,
    conceptTags: ["modification", "index assignment"]
  },
  {
    id: 3,
    title: "New Recruit",
    description: `Manage crew additions using .append().

Start with crew = ["Armstrong", "Collins"]:
1. Print the current crew
2. Add "Aldrin" to the end
3. Print the updated crew
4. Add "Duke" to the end
5. Print final crew and total count`,
    starterCode: `# MISSION: Recruit Management
# Add crew members using append

def add_recruits():
    crew = ["Armstrong", "Collins"]
    
    # Print current
    
    # Add Aldrin
    
    # Print updated
    
    # Add Duke
    
    # Print final with count
    pass

# === Mission Control Test ===
add_recruits()`,
    hint: `Use crew.append("Aldrin") to add to the end. Remember: append modifies the list in place.`,
    conceptTags: ["append", "list methods"]
  },
  {
    id: 4,
    title: "Crew Departure",
    description: `Manage crew removals using .pop() and .remove().

Start with crew = ["Armstrong", "Collins", "Aldrin", "Duke"]:
1. Print the current crew
2. Use .pop() to remove the last member (Duke) - print who left
3. Print the current crew
4. Use .remove() to remove "Collins" specifically
5. Print the final crew`,
    starterCode: `# MISSION: Crew Departure
# Remove crew members

def crew_departure():
    crew = ["Armstrong", "Collins", "Aldrin", "Duke"]
    
    # Print current
    
    # Pop last member (save who it was)
    
    # Print updated
    
    # Remove Collins by name
    
    # Print final
    pass

# === Mission Control Test ===
crew_departure()`,
    hint: `departed = crew.pop() removes and returns the last item. crew.remove("Collins") removes by value.`,
    conceptTags: ["pop", "remove", "list methods"]
  },
  {
    id: 5,
    title: "Priority Insert",
    description: `Insert items at specific positions using .insert().

Start with tasks = ["Check fuel", "Plot course", "Launch"]:
1. Print the current task list
2. Insert "System check" at the beginning (index 0)
3. Insert "Crew briefing" at index 2 (after system check, before fuel)
4. Print the final task list with positions`,
    starterCode: `# MISSION: Task Priority
# Insert tasks at specific positions

def priority_insert():
    tasks = ["Check fuel", "Plot course", "Launch"]
    
    # Print current
    
    # Insert at beginning
    
    # Insert at position 2
    
    # Print final with positions
    pass

# === Mission Control Test ===
priority_insert()`,
    hint: `Use tasks.insert(0, "System check") to insert at beginning. insert(index, value) puts value BEFORE that index.`,
    conceptTags: ["insert", "list methods", "positioning"]
  },
  {
    id: 6,
    title: "Roster Review",
    description: `Process all crew members using element traversal.

Given crew = ["Armstrong", "Collins", "Aldrin", "Duke", "Scott"]:
1. Loop through each name and print "Crew member: [name]"
2. Count how many names have more than 6 characters
3. Print the count`,
    starterCode: `# MISSION: Roster Review
# Process crew list by element

def review_roster():
    crew = ["Armstrong", "Collins", "Aldrin", "Duke", "Scott"]
    
    # Print each crew member
    
    # Count names longer than 6 characters
    
    # Print count
    pass

# === Mission Control Test ===
review_roster()`,
    hint: `Use: for name in crew: to iterate. Use len(name) > 6 to check character count.`,
    conceptTags: ["element traversal", "counter", "len"]
  },
  {
    id: 7,
    title: "Indexed Search",
    description: `Search for a target using index traversal.

Given readings = [45, 72, 38, 91, 55, 88]:
1. Loop through using range(len())
2. Print each reading with its index: "Index X: Y"
3. Find and print the INDEX of the first value over 80
4. Print "Found at index: X"`,
    starterCode: `# MISSION: Data Search
# Find value by index

def indexed_search():
    readings = [45, 72, 38, 91, 55, 88]
    found_index = -1
    
    # Loop with index
    # Print each with position
    # Track first index over 80
    
    # Print where found
    pass

# === Mission Control Test ===
indexed_search()`,
    hint: `Use: for i in range(len(readings)): - then readings[i] gives the value at that index.`,
    conceptTags: ["index traversal", "range", "len", "search"]
  },
  {
    id: 8,
    title: "Cargo Grid",
    description: `Create and display a 2D cargo manifest.

Create a 3x3 cargo grid:
Row 0: "Food", "Water", "Oxygen"
Row 1: "Tools", "Medical", "Spare"
Row 2: "Fuel", "Fuel", "Empty"

1. Print the item at row 1, column 2 (should be "Spare")
2. Change the "Empty" to "Radio"
3. Print the full grid (each row on its own line)`,
    starterCode: `# MISSION: Cargo Grid
# Manage 2D cargo manifest

def cargo_grid():
    # Create the 3x3 cargo grid
    cargo = [
        # Row 0
        # Row 1
        # Row 2
    ]
    
    # Print item at [1][2]
    
    # Change Empty to Radio
    
    # Print full grid
    pass

# === Mission Control Test ===
cargo_grid()`,
    hint: `Access with cargo[row][col]. The "Empty" is at [2][2]. Print each row separately.`,
    conceptTags: ["2D list", "creation", "access", "modification"]
  },
  {
    id: 9,
    title: "Grid Access",
    description: `Navigate a sensor grid using 2D indexing.

Given sensor_grid (3x4):
[[85, 90, 88, 92],
 [78, 82, 95, 80],
 [91, 87, 83, 89]]

1. Print the value at [0][2] (row 0, column 2)
2. Print the value at [1][2] (row 1, column 2)
3. Print the value at [2][0] (row 2, column 0)
4. Find and print the number of rows
5. Find and print the number of columns`,
    starterCode: `# MISSION: Grid Navigation
# Access 2D sensor data

def grid_access():
    sensor_grid = [
        [85, 90, 88, 92],
        [78, 82, 95, 80],
        [91, 87, 83, 89]
    ]
    
    # Print values at specified positions
    
    # Print dimensions (rows and cols)
    pass

# === Mission Control Test ===
grid_access()`,
    hint: `Rows = len(sensor_grid), Columns = len(sensor_grid[0]). Access with grid[row][col].`,
    conceptTags: ["2D access", "dimensions", "len"]
  },
  {
    id: 10,
    title: "Cargo Scan",
    description: `Complete inventory scan using nested loops.

Given cargo_grid:
[[10, 20, 30],
 [15, 25, 35],
 [12, 22, 32]]

1. Print every value with its position: "[row][col] = value"
2. Calculate and print the total of ALL values
3. Count how many values are greater than 20
4. Print the count`,
    starterCode: `# MISSION: Full Cargo Scan
# Traverse entire 2D grid

def cargo_scan():
    cargo_grid = [
        [10, 20, 30],
        [15, 25, 35],
        [12, 22, 32]
    ]
    
    total = 0
    high_count = 0
    
    # Nested loop to process all elements
    # Print each with position
    # Accumulate total
    # Count values > 20
    
    # Print totals
    pass

# === Mission Control Test ===
cargo_scan()`,
    hint: `Use nested for loops: for row in range(len(grid)): then for col in range(len(grid[row])): Access with grid[row][col].`,
    conceptTags: ["2D traversal", "nested loops", "accumulator", "counter"]
  }
];
