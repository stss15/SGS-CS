# IB Python Mission Control - Curriculum Overhaul Plan

## Overview

This document outlines the comprehensive pedagogical overhaul of the Python Mission Control app to align with the IB Computer Science 2027 syllabus while maintaining an engaging space-themed experience.

---

## Reference Documents

| Document | Path | Purpose |
|----------|------|---------|
| **IB Syllabus Guide** | `public/ib/Learn Python Map/IB Comp Sci 2027.pdf` | Official IB CS 2027 syllabus - source of truth for content coverage |
| **B2 Textbook** | `docs/ib-content/textbooks/B2.txt` | Detailed explanations, examples, and theoretical content |
| **Python by Example** | `public/ib/Learn Python Map/python_example.txt` | Challenge structure inspiration, progressive difficulty examples |

---

## Core Pedagogical Principles

### 1. Bite-Sized Learning
- Each concept broken into **micro-lessons** (2-3 paragraphs max)
- One concept per section with immediate code example
- Clear visual separation between theory and practice

### 2. Flexible Challenge Counts
- **No fixed number** - each level has exactly the challenges needed
- Theoretical topics may have fewer coding challenges but include **trace exercises** or **analysis tasks**
- Practical topics may have 8-15 challenges

### 3. Progressive Complexity
- Each challenge builds on previous ones
- Early challenges: single concept isolation
- Later challenges: concept integration
- Final challenge: "mission synthesis" combining all level concepts

### 4. Space Theme Integration
- All challenges framed in NASA/space exploration context
- Variable names use space terminology (orbit_radius, fuel_level, crew_count)
- Real-world applicable scenarios (calculating trajectories, resource management)

### 5. Theoretical Topics Handling
For topics that are primarily theoretical (e.g., algorithm complexity, data structure concepts):
- **Trace Tables** as interactive challenges
- **Prediction exercises** (what will this code output?)
- **Error identification** challenges
- **Code ordering** puzzles
- **Comparison analysis** (which approach is better and why?)

---

## Level Structure Template

Each level consists of:

```typescript
interface Level {
  // Learning Content (Base)
  sections: LessonSection[];  // 3-6 sections typically
  
  // Practice (Challenges)
  challenges: Challenge[];     // Variable count (4-15)
  
  // Theory (Optional)
  traceExercises?: TraceExercise[];
  analysisQuestions?: AnalysisQuestion[];
}
```

---

## Phase 1: Procedural Foundations (SL)

### Level 1: Variables & I/O
**Syllabus Reference:** B2.1.1 - Variables, data types, assignment

**Learning Objectives:**
- Understand what variables are and why we use them
- Master the four core data types: `int`, `float`, `str`, `bool`
- Use `print()` for output and `input()` for user input
- Perform type casting between types
- Understand the difference between global and local scope (introduction)

**Challenge Count: 8**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | First Contact | `print()` basic usage |
| 2 | Telemetry Log | Variables & assignment |
| 3 | Mission Data | Multiple data types |
| 4 | Fuel Calculation | Arithmetic operators |
| 5 | Type Conversion | Casting `int()`, `str()`, `float()` |
| 6 | Crew Input | Using `input()` |
| 7 | Launch Calculation | Combining input + arithmetic |
| 8 | Mission Report | Synthesis: all concepts together |

---

### Level 2: Sequence & Selection
**Syllabus Reference:** B2.3.1, B2.3.2 - Selection, Boolean expressions

**Learning Objectives:**
- Understand sequential execution (line-by-line)
- Use comparison operators: `==`, `!=`, `>`, `<`, `>=`, `<=`
- Use logical operators: `and`, `or`, `not`
- Implement `if`, `elif`, `else` structures
- Create nested conditionals

**Challenge Count: 7**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Go/No-Go | Simple `if` statement |
| 2 | Altitude Check | Comparison operators |
| 3 | System Status | `if-else` branching |
| 4 | Launch Window | `if-elif-else` chains |
| 5 | Multi-Condition Check | Logical operators `and`, `or` |
| 6 | Safety Protocol | Nested conditionals |
| 7 | Flight Director | Synthesis: complex decision tree |

---

### Level 3: Iteration (Loops)
**Syllabus Reference:** B2.3.3 - Loops and iteration

**Learning Objectives:**
- Use `for` loops with `range()`
- Understand `range(start, stop, step)`
- Use `while` loops for conditional iteration
- Implement loop control: `break` and `continue`
- Create accumulators (running totals, counters)

**Challenge Count: 9**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Countdown Sequence | Basic `for` loop |
| 2 | Orbit Counter | `range()` with parameters |
| 3 | Fuel Monitor | `while` loop basics |
| 4 | Signal Search | `while` with condition |
| 5 | Abort Sequence | `break` statement |
| 6 | Skip Faulty Sensor | `continue` statement |
| 7 | Total Propellant | Accumulator pattern (sum) |
| 8 | Crew Count | Counter pattern |
| 9 | Mission Simulation | Synthesis: nested loops + accumulators |

---

### Level 4: String Manipulation
**Syllabus Reference:** B2.1.2 - String extraction and manipulation

**Learning Objectives:**
- Access characters by index `s[0]`
- Extract substrings with slicing `s[start:end]`
- Concatenate strings with `+`
- Iterate through strings with loops
- Use string methods: `len()`, `.upper()`, `.lower()`, `.strip()`
- Parse formatted data

**Challenge Count: 8**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Signal Decode | Indexing single characters |
| 2 | Callsign Extract | Basic slicing |
| 3 | Message Assembly | Concatenation |
| 4 | Transmission Scan | Iterating through strings |
| 5 | Signal Cleanup | `.strip()`, `.upper()`, `.lower()` |
| 6 | Character Count | `len()` and loops |
| 7 | Log Parser | Extracting data from formatted strings |
| 8 | Encrypted Message | Synthesis: complex string operations |

---

## Phase 2: Data Structures & Modularity (SL)

### Level 5: Lists (Arrays)
**Syllabus Reference:** B2.2.1, B2.2.2 - Static vs dynamic arrays, 2D arrays

**Learning Objectives:**
- Create and initialize lists
- Access and modify elements by index
- Use list methods: `.append()`, `.pop()`, `.remove()`, `.insert()`
- Traverse lists by element and index
- Create and access 2D lists (matrices)
- Use nested loops for 2D traversal

**Challenge Count: 10**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Crew Roster | List creation |
| 2 | Mission Update | Element access and modification |
| 3 | New Recruit | `.append()` |
| 4 | Crew Departure | `.pop()` and `.remove()` |
| 5 | Priority Insert | `.insert()` |
| 6 | Roster Review | List traversal (by element) |
| 7 | Indexed Search | Traversal (by index) |
| 8 | Cargo Grid | 2D list creation |
| 9 | Grid Access | 2D indexing `grid[row][col]` |
| 10 | Cargo Scan | Nested loop traversal |

---

### Level 6: Stacks & Queues (Concepts)
**Syllabus Reference:** B2.2.3, B2.2.4 - Stack and Queue ADTs

**This is primarily a THEORETICAL topic - fewer coding challenges, more conceptual exercises**

**Learning Objectives:**
- Understand LIFO (Last In, First Out) for stacks
- Understand FIFO (First In, First Out) for queues
- Implement stack operations using lists
- Implement queue operations using lists
- Know when to use each structure

**Challenge Count: 5**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Undo Stack | Stack push/pop implementation |
| 2 | Action Replay | Stack traversal (LIFO order) |
| 3 | Transmission Queue | Queue enqueue/dequeue |
| 4 | Message Order | Queue processing (FIFO order) |
| 5 | Command Center | Synthesis: choosing stack vs queue |

**Trace Exercises: 3**
- Trace a series of stack operations
- Trace a series of queue operations
- Predict final state after mixed operations

---

### Level 7: Modular Programming
**Syllabus Reference:** B2.3.4 - Subprograms, parameters, return values

**Learning Objectives:**
- Define functions with `def`
- Use parameters to pass data into functions
- Return values from functions
- Understand local vs global scope
- Break problems into reusable functions

**Challenge Count: 8**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Status Report | Basic function definition |
| 2 | Greeting Protocol | Function with parameters |
| 3 | Distance Calculator | Multiple parameters |
| 4 | Fuel Check | Return values |
| 5 | Multi-Return | Returning multiple values |
| 6 | Scope Test | Local vs global variables |
| 7 | Utility Module | Creating helper functions |
| 8 | Mission Planner | Synthesis: modular program design |

---

### Level 8: File Processing
**Syllabus Reference:** B2.5.1 - File operations

**Learning Objectives:**
- Open files with `open()` and modes ('r', 'w', 'a')
- Read files: `.read()`, `.readline()`, `.readlines()`
- Write to files: `.write()`
- Use context managers (`with open...`)
- Parse CSV-style data

**Challenge Count: 7**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Log Viewer | Reading entire file |
| 2 | Line Scanner | Reading line by line |
| 3 | Mission Logger | Writing to file |
| 4 | Log Append | Append mode |
| 5 | Safe File Ops | Context managers |
| 6 | Crew Data Parse | CSV parsing basics |
| 7 | Mission Archive | Synthesis: read, process, write |

---

### Level 9: Robustness & Debugging
**Syllabus Reference:** B2.1.3, B2.1.4 - Trace tables, error handling

**Mixed theory and practice - includes trace exercises**

**Learning Objectives:**
- Create and use trace tables for debugging
- Use print statements for debugging
- Handle exceptions with `try/except`
- Handle specific errors: `ValueError`, `IOError`, `ZeroDivisionError`
- Validate user input

**Challenge Count: 6**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Input Shield | Basic try/except |
| 2 | Specific Errors | Catching specific exceptions |
| 3 | Safe Division | ZeroDivisionError handling |
| 4 | File Safety | IOError handling |
| 5 | Input Validator | Validation loops |
| 6 | Robust System | Synthesis: multiple error types |

**Trace Exercises: 4**
- Complete a trace table for a loop
- Debug code using print statements
- Identify the bug from trace output
- Predict where exception will occur

---

## Phase 3: Algorithms (SL)

### Level 10: Searching
**Syllabus Reference:** B2.4.2 - Linear and binary search

**Theory-heavy - includes algorithm analysis**

**Learning Objectives:**
- Implement linear search
- Implement binary search (iterative)
- Understand time complexity O(N) vs O(log N)
- Know when each algorithm is appropriate

**Challenge Count: 5**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Star Catalog | Linear search implementation |
| 2 | Planet Finder | Linear search with index return |
| 3 | Sorted Database | Binary search implementation |
| 4 | Efficiency Test | Comparing search counts |
| 5 | Adaptive Search | Choosing appropriate algorithm |

**Trace Exercises: 3**
- Trace linear search steps
- Trace binary search divisions
- Count comparisons for each method

---

### Level 11: Sorting
**Syllabus Reference:** B2.4.3 - Bubble sort, selection sort

**Theory-heavy - includes algorithm analysis**

**Learning Objectives:**
- Implement bubble sort
- Implement selection sort
- Understand O(N²) complexity
- Trace sorting algorithm execution

**Challenge Count: 4**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Bubble Sort | Basic implementation |
| 2 | Optimized Bubble | Early termination optimization |
| 3 | Selection Sort | Min-finding and swapping |
| 4 | Sort Analysis | Counting swaps and comparisons |

**Trace Exercises: 4**
- Trace bubble sort pass by pass
- Trace selection sort iterations
- Count swaps in each algorithm
- Predict intermediate states

---

## Phase 4: OOP Fundamentals (SL)

### Level 12: Single Class OOP
**Syllabus Reference:** B3.1.1, B3.1.2, B3.1.4 - Classes, attributes, methods

**Learning Objectives:**
- Define classes with `class`
- Create constructor with `__init__`
- Define instance attributes
- Create methods
- Instantiate objects and use dot notation

**Challenge Count: 7**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Spacecraft Class | Basic class definition |
| 2 | Constructor | `__init__` with parameters |
| 3 | Attributes | Instance variables |
| 4 | Methods | Defining class methods |
| 5 | Object Creation | Instantiation |
| 6 | Object Interaction | Calling methods on objects |
| 7 | Fleet Management | Synthesis: multiple objects |

---

### Level 13: Encapsulation & Scope
**Syllabus Reference:** B3.1.3, B3.1.5 - Static/instance variables, encapsulation

**Learning Objectives:**
- Understand static vs instance variables
- Use private attribute convention (`_name`)
- Create getter and setter methods
- Control access to internal state

**Challenge Count: 5**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Class Counter | Static variables |
| 2 | Private Data | Private attribute convention |
| 3 | Getter Methods | Reading private attributes |
| 4 | Setter Methods | Validating and setting |
| 5 | Secure Spacecraft | Synthesis: full encapsulation |

---

## Phase 5: Recursion (HL Only)

### Level 14: Recursive Algorithms
**Syllabus Reference:** B2.4.4, B2.4.5 - Recursion

**Learning Objectives:**
- Identify base cases
- Understand recursive function calls
- Trace recursive execution (stack frames)
- Implement factorial, fibonacci, recursive search

**Challenge Count: 6**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Countdown Recursive | Simple recursion |
| 2 | Factorial | Classic recursive example |
| 3 | Sum Recursive | Recursive accumulation |
| 4 | Fibonacci | Multiple recursive calls |
| 5 | Binary Search Recursive | Recursive algorithm |
| 6 | String Reverse | Recursive string processing |

**Trace Exercises: 3**
- Trace call stack for factorial
- Trace fibonacci tree
- Count recursive calls

---

## Phase 6: Advanced OOP (HL Only)

### Level 15: Inheritance & Polymorphism
**Syllabus Reference:** B3.2.1 - B3.2.4 - Inheritance, polymorphism

**Learning Objectives:**
- Create child classes with `class Child(Parent)`
- Use `super().__init__()`
- Override methods (polymorphism)
- Understand composition relationships

**Challenge Count: 6**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Vehicle Hierarchy | Basic inheritance |
| 2 | Super Init | Calling parent constructor |
| 3 | Method Override | Polymorphism |
| 4 | Extended Behavior | Adding new methods |
| 5 | Composition | Classes containing classes |
| 6 | Fleet Hierarchy | Synthesis: complex inheritance |

---

## Phase 7: Abstract Data Types (HL Only)

### Level 16: Linked Lists
**Syllabus Reference:** B4.1.2, B4.1.3 - Linked lists

**Learning Objectives:**
- Create Node class with data and next pointer
- Create LinkedList class with head pointer
- Implement insert, delete, traverse operations
- Understand circular and doubly linked variations

**Challenge Count: 7**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Node Creation | Basic Node class |
| 2 | Link Nodes | Connecting nodes manually |
| 3 | LinkedList Class | Head pointer management |
| 4 | Insert Front | Add to beginning |
| 5 | Insert End | Add to end |
| 6 | Delete Node | Removal operation |
| 7 | Traverse List | Printing all elements |

---

### Level 17: Trees
**Syllabus Reference:** B4.1.4 - Binary trees

**Learning Objectives:**
- Create TreeNode class
- Understand BST property
- Implement in-order, pre-order, post-order traversal
- Implement recursive search

**Challenge Count: 6**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Tree Node | Basic TreeNode class |
| 2 | BST Insert | Recursive insertion |
| 3 | In-Order Traversal | Left-Root-Right |
| 4 | Pre-Order Traversal | Root-Left-Right |
| 5 | Post-Order Traversal | Left-Right-Root |
| 6 | BST Search | Recursive search |

---

### Level 18: Sets
**Syllabus Reference:** B4.1.5 - Sets

**Learning Objectives:**
- Use Python sets `{}`
- Perform set operations: union, intersection, difference
- Use sets for removing duplicates

**Challenge Count: 4**
| # | Challenge | Concept Focus |
|---|-----------|---------------|
| 1 | Unique Crew | Set creation and uniqueness |
| 2 | Combined Missions | Union operation |
| 3 | Shared Resources | Intersection operation |
| 4 | Exclusive Items | Difference operation |

---

## Implementation Notes

### File Structure
Each level content file should follow this pattern:
```
data/levelX_content.ts
```

### Content File Structure
```typescript
export const levelXBaseContent: LessonSection[] = [...];
export const levelXChallenges: Challenge[] = [...];
export const levelXTraceExercises?: TraceExercise[] = [...]; // optional
```

### Challenge Interface Update
Consider extending the Challenge interface:
```typescript
interface Challenge {
  id: number;
  title: string;
  description: string;
  starterCode: string;
  hint: string;
  expectedOutput?: string;      // For auto-checking
  testCases?: TestCase[];       // For validation
  conceptTags?: string[];       // For filtering
}
```

---

## Quality Checklist

For each level, verify:
- [ ] All IB syllabus points covered
- [ ] Space theme consistent throughout
- [ ] Challenge progression logical
- [ ] Code examples executable and correct
- [ ] Hints helpful but not solutions
- [ ] Variable names use space terminology
- [ ] Final challenge synthesizes all concepts
- [ ] Theoretical topics have trace/analysis exercises

---

## Next Steps

1. ✅ Create this planning document
2. Implement Level 1 with new structure
3. Test in browser
4. Iterate based on feedback
5. Continue with remaining levels

---

*Document Version: 1.0*
*Last Updated: December 2024*

