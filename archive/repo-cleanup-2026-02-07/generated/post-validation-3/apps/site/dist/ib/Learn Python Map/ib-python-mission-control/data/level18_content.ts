/**
 * Level 18: Sets (HL)
 * IB Syllabus Reference: B4.1.5
 *
 * Learning Objectives:
 * - Create and manipulate Python sets
 * - Perform membership tests and length checks
 * - Use set operations: union, intersection, difference, symmetric difference
 * - Apply sets to remove duplicates and test relationships
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Unique collections
// ============================================================================

export const level18BaseContent: LessonSection[] = [
  {
    title: "1. What is a Set?",
    content: `A set is an unordered collection of UNIQUE items. Duplicate values are automatically removed.`,
    codeExample: `crew = {"Neil", "Buzz", "Michael", "Neil"}
print(crew)        # {'Neil', 'Buzz', 'Michael'} (no duplicates)
print(len(crew))   # 3`
  },
  {
    title: "2. Core Operations",
    content: `Sets support fast membership tests (in) and basic mutations.`,
    tableData: {
      headers: ["Operation", "Example", "Effect"],
      rows: [
        ["in", "'Neil' in crew", "Membership test -> True/False"],
        [".add(x)", "crew.add('Sally')", "Add element"],
        [".remove(x)", "crew.remove('Neil')", "Remove (KeyError if missing)"],
        [".discard(x)", "crew.discard('Neil')", "Remove if present (safe)"],
        [".pop()", "crew.pop()", "Remove and return an arbitrary item"],
        [".clear()", "crew.clear()", "Remove all items"]
      ]
    }
  },
  {
    title: "3. Set Operations",
    content: `Combine sets using math-like operations:
- Union (|): elements in either set
- Intersection (&): elements common to both
- Difference (-): elements in A but not B
- Symmetric Difference (^): elements in exactly one set`,
    codeExample: `a = {"Earth", "Mars", "Jupiter"}
b = {"Mars", "Saturn"}

print(a | b)  # Union
print(a & b)  # Intersection
print(a - b)  # Difference
print(a ^ b)  # Symmetric difference`
  },
  {
    title: "4. Relationships",
    content: `Check set relationships:
- issubset(): A.issubset(B) -> all elements of A in B
- issuperset(): A.issuperset(B) -> A contains B
- isdisjoint(): no shared elements`,
    codeExample: `mission_crew = {"Neil", "Buzz", "Michael"}
lunar_team = {"Neil", "Buzz"}

print(lunar_team.issubset(mission_crew))   # True
print(mission_crew.issuperset(lunar_team)) # True
print(mission_crew.isdisjoint({"Yuri"}))   # True`
  },
  {
    title: "5. Removing Duplicates",
    content: `Sets are great for deduplication because they only keep unique values.`,
    codeExample: `readings = [10, 20, 10, 30, 20]
unique_readings = set(readings)
print(unique_readings)         # {10, 20, 30}

# Back to list (order not guaranteed)
clean_list = list(unique_readings)`
  }
];

// ============================================================================
// CHALLENGES - 4 set missions
// ============================================================================

export const level18Challenges: Challenge[] = [
  {
    id: 1,
    title: "Crew Manifest",
    description: `Create a set of crew names and practice membership and mutations.

1. Create crew = {"Neil", "Buzz"}
2. Add "Michael"
3. Remove "Buzz" safely (no error if missing)
4. Print crew size and whether "Neil" is in the set`,
    starterCode: `# MISSION: Crew Manifest
crew = {"Neil", "Buzz"}

# Add and remove here

print(len(crew))
print("Neil" in crew)`,
    hint: `Use crew.add(...) and crew.discard(...) to avoid KeyError.`,
    conceptTags: ["sets", "add", "discard", "membership"]
  },
  {
    id: 2,
    title: "Mission Payloads",
    description: `Use set operations to compare payload lists.

Given:
payload_a = {"Camera", "Sensor", "Drill"}
payload_b = {"Sensor", "Drill", "Comms"}

Print:
- Union of both payloads
- Intersection (shared items)
- Items only in payload_a`,
    starterCode: `# MISSION: Payload Comparison
payload_a = {"Camera", "Sensor", "Drill"}
payload_b = {"Sensor", "Drill", "Comms"}

# Compute and print union, intersection, difference`,
    hint: `Use | for union, & for intersection, - for difference.`,
    conceptTags: ["union", "intersection", "difference"]
  },
  {
    id: 3,
    title: "Unique Readings",
    description: `Remove duplicates from sensor data using a set.

Given readings = [101, 103, 101, 99, 103, 105]:
1. Convert to a set to deduplicate
2. Convert back to a list (order not important)
3. Print the unique readings`,
    starterCode: `# MISSION: Deduplicate Readings
readings = [101, 103, 101, 99, 103, 105]

# Deduplicate using a set

print(unique)`,
    hint: `unique = list(set(readings))`,
    conceptTags: ["deduplication", "set conversion"]
  },
  {
    id: 4,
    title: "Access Control",
    description: `Check subset/superset relationships for clearance.

crew = {"Neil", "Buzz", "Michael"}
eva_team = {"Neil", "Buzz"}
guests = {"Yuri"}

Print:
- If eva_team is a subset of crew
- If crew is a superset of eva_team
- If crew and guests are disjoint`,
    starterCode: `# MISSION: Access Control
crew = {"Neil", "Buzz", "Michael"}
eva_team = {"Neil", "Buzz"}
guests = {"Yuri"}

# Print subset/superset/disjoint checks`,
    hint: `Use issubset, issuperset, isdisjoint.`,
    conceptTags: ["subset", "superset", "disjoint"]
  }
];
