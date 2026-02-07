# Level 18: Sets (HL)

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 18 |
| **Title** | Sets |
| **Syllabus** | B4.1.5 |
| **Challenge Count** | 4 |
| **Prerequisites** | Level 5 (Lists) |
| **HL Only** | Yes |

---

## Learning Objectives

1. Understand sets as unordered collections of unique elements
2. Create sets using {} or set()
3. Add and remove elements
4. Perform union (|), intersection (&), and difference (-)
5. Use sets to remove duplicates
6. Check membership efficiently

---

## Base Content Sections

### Section 1: What is a Set?

```typescript
{
  title: "1. Sets: Unique Collections",
  content: `A set is an unordered collection where every element is unique.
- No duplicates allowed
- No indexing (unordered)
- Fast membership testing O(1)
- Useful for removing duplicates, comparing groups`,
  codeExample: `# Creating sets
crew = {"Armstrong", "Collins", "Aldrin"}
numbers = {1, 2, 3, 2, 1}  # Duplicates removed!
print(numbers)  # {1, 2, 3}

# From a list (removes duplicates)
readings = [23, 45, 23, 67, 45, 23]
unique_readings = set(readings)
print(unique_readings)  # {67, 23, 45}`
}
```

### Section 2: Set Operations - Add/Remove

```typescript
{
  title: "2. Modifying Sets",
  content: `Add and remove elements from sets.`,
  codeExample: `crew = {"Armstrong", "Collins"}

# Add element
crew.add("Aldrin")
print(crew)  # {"Armstrong", "Collins", "Aldrin"}

# Add duplicate (no effect)
crew.add("Armstrong")
print(crew)  # Same - no duplicate!

# Remove element
crew.remove("Collins")  # Error if not found
crew.discard("Unknown")  # No error if not found

# Check membership
print("Armstrong" in crew)  # True - very fast!`
}
```

### Section 3: Set Operations - Union, Intersection

```typescript
{
  title: "3. Combining Sets",
  content: `Powerful operations for comparing sets.`,
  tableData: {
    headers: ["Operation", "Symbol", "Result"],
    rows: [
      ["Union", "A | B", "All elements in A or B"],
      ["Intersection", "A & B", "Elements in both A and B"],
      ["Difference", "A - B", "Elements in A but not B"],
      ["Symmetric Diff", "A ^ B", "Elements in A or B but not both"]
    ]
  },
  codeExample: `apollo_crew = {"Armstrong", "Collins", "Aldrin"}
gemini_crew = {"Armstrong", "Collins", "White"}

# Union - everyone
all_astronauts = apollo_crew | gemini_crew
print(all_astronauts)  # All 4 names

# Intersection - in both missions
veterans = apollo_crew & gemini_crew
print(veterans)  # {"Armstrong", "Collins"}

# Difference - Apollo only
apollo_only = apollo_crew - gemini_crew
print(apollo_only)  # {"Aldrin"}`
}
```

### Section 4: Practical Applications

```typescript
{
  title: "4. Using Sets in Practice",
  content: `Common set use cases.`,
  codeExample: `# Remove duplicates from list
readings = [23, 45, 23, 67, 45, 89, 23]
unique = list(set(readings))
print(unique)

# Find common elements
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
common = set(list1) & set(list2)
print(common)  # {4, 5}

# Check if any element in common
if set(list1) & set(list2):
    print("Lists share elements!")

# Count unique values
data = [1, 1, 2, 2, 2, 3, 3, 3, 3]
print(f"Unique values: {len(set(data))}")  # 3`
}
```

---

## Challenges

### Challenge 1: Unique Crew

```typescript
{
  id: 1,
  title: "Unique Crew List",
  description: `Given a list with duplicate crew names, create a set of unique names.

crew_list = ["Armstrong", "Collins", "Armstrong", "Aldrin", "Collins", "Duke", "Duke"]

1. Convert to set
2. Print the unique names
3. Print count of unique crew`,
  starterCode: `crew_list = ["Armstrong", "Collins", "Armstrong", "Aldrin", "Collins", "Duke", "Duke"]

# Create set of unique names
unique_crew = ...

print(unique_crew)
print(f"Unique crew members: {len(unique_crew)}")`,
  hint: `unique_crew = set(crew_list)`,
  conceptTags: ["set", "unique", "duplicates"]
}
```

### Challenge 2: Combined Missions

```typescript
{
  id: 2,
  title: "Mission Roster Union",
  description: `Two missions need to share a database.

mission_a = {"Armstrong", "Collins", "Aldrin"}
mission_b = {"Glenn", "Shepard", "Collins"}

Find:
1. All unique astronauts (union)
2. Astronauts in both missions (intersection)
3. Astronauts only in mission A (difference)`,
  starterCode: `mission_a = {"Armstrong", "Collins", "Aldrin"}
mission_b = {"Glenn", "Shepard", "Collins"}

all_astronauts = ...
in_both = ...
only_a = ...

print(f"All: {all_astronauts}")
print(f"Both: {in_both}")
print(f"Only A: {only_a}")`,
  hint: `Union: |, Intersection: &, Difference: -`,
  conceptTags: ["union", "intersection", "difference"]
}
```

### Challenge 3: Shared Resources

```typescript
{
  id: 3,
  title: "Resource Overlap",
  description: `Two spacecraft need to find shared equipment.

craft_a_equipment = {"oxygen", "fuel", "radio", "solar_panels", "computer"}
craft_b_equipment = {"oxygen", "water", "radio", "thrusters", "computer"}

Find:
1. Equipment both have (can share)
2. Equipment only A has (A can provide)
3. Equipment only B has (B can provide)
4. All unique equipment needed for mission`,
  starterCode: `craft_a = {"oxygen", "fuel", "radio", "solar_panels", "computer"}
craft_b = {"oxygen", "water", "radio", "thrusters", "computer"}

shared = ...
only_a = ...
only_b = ...
all_equipment = ...

print(f"Shared: {shared}")
print(f"Only A: {only_a}")
print(f"Only B: {only_b}")
print(f"All needed: {all_equipment}")`,
  hint: `& for shared, - for difference, | for union`,
  conceptTags: ["set operations", "comparison"]
}
```

### Challenge 4: Sensor Data Analysis

```typescript
{
  id: 4,
  title: "Complete Set Analysis",
  description: `Analyze sensor data using sets.

Given three sensor readings lists:
sensor1 = [23, 45, 67, 89, 23, 45]
sensor2 = [45, 67, 91, 45, 23]
sensor3 = [67, 89, 100, 67, 89]

Find:
1. Unique readings from each sensor
2. Readings detected by ALL three sensors
3. Readings detected by ANY sensor
4. Readings unique to sensor1 (not in 2 or 3)
5. Total unique reading count`,
  starterCode: `sensor1 = [23, 45, 67, 89, 23, 45]
sensor2 = [45, 67, 91, 45, 23]
sensor3 = [67, 89, 100, 67, 89]

# Convert to sets
s1 = set(sensor1)
s2 = set(sensor2)
s3 = set(sensor3)

# Find requested information
detected_all = ...  # In ALL three
detected_any = ...  # In ANY
unique_to_s1 = ...  # Only in sensor1

print(f"Detected by all: {detected_all}")
print(f"Detected by any: {detected_any}")
print(f"Unique to sensor 1: {unique_to_s1}")
print(f"Total unique readings: {len(detected_any)}")`,
  hint: `All three: s1 & s2 & s3. Any: s1 | s2 | s3. Unique to s1: s1 - s2 - s3`,
  conceptTags: ["synthesis", "multiple sets", "analysis"]
}
```

---

## Implementation Notes

### Key IB Points (B4.1.5)
- Sets as unordered unique collections
- Set operations (union, intersection, difference)
- Practical uses (deduplication, comparison)
- O(1) membership testing

### Python Set Methods
- add(), remove(), discard()
- union() or |
- intersection() or &
- difference() or -
- issubset(), issuperset()

---

*Level 18 Plan - Version 1.0*

