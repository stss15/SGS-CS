export interface Task {
  id: string;
  text: string;
}

export interface Level {
  id: number;
  title: string;
  syllabus: string;
  description: string;
  tasks: Task[];
}

export interface Phase {
  id: number;
  title: string;
  description: string;
  isHLOnly?: boolean;
  levels: Level[];
}

export const roadmapData: Phase[] = [
  // --- PATH 1: STANDARD LEVEL (SL) ---
  {
    id: 1,
    title: "Phase 1: Procedural Foundations",
    description: "Building the blocks of logic and data manipulation.",
    levels: [
      {
        id: 1,
        title: "Variables & I/O",
        syllabus: "B2.1.1",
        description: "Initialize your communication systems.",
        tasks: [
          { id: "1-1", text: "Output: The print() function for console communication" },
          { id: "1-2", text: "Variables: Named containers for storing data" },
          { id: "1-3", text: "Data Types: int, float, str, bool fundamentals" },
          { id: "1-4", text: "Arithmetic: Operators for calculations (+, -, *, /, //, %, **)" },
          { id: "1-5", text: "Input: Getting user data with input()" },
          { id: "1-6", text: "Type Casting: Converting between types (int(), float(), str())" }
        ]
      },
      {
        id: 2,
        title: "Sequence & Selection",
        syllabus: "B2.3.1, B2.3.2",
        description: "Determine the flight path logic.",
        tasks: [
          { id: "2-1", text: "Sequential execution - understanding code flow" },
          { id: "2-2", text: "Comparison operators for value testing" },
          { id: "2-3", text: "Simple if statements" },
          { id: "2-4", text: "if-else branching" },
          { id: "2-5", text: "if-elif-else chains" },
          { id: "2-6", text: "Logical operators (and, or, not)" },
          { id: "2-7", text: "Nested conditionals" }
        ]
      },
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
      },
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
    ]
  },
  {
    id: 2,
    title: "Phase 2: Data Structures & Modularity",
    description: "Moving from simple variables to complex data storage.",
    levels: [
      {
        id: 5,
        title: "Lists (Arrays)",
        syllabus: "B2.2.1, B2.2.2",
        description: "Manage multiple payload items.",
        tasks: [
          { id: "5-1", text: "Dynamic lists vs fixed arrays" },
          { id: "5-2", text: "Create and initialize lists" },
          { id: "5-3", text: "Accessing elements with positive/negative indexes" },
          { id: "5-4", text: "Modifying list elements in place" },
          { id: "5-5", text: "Core list methods: append, insert, pop, remove" },
          { id: "5-6", text: "Traversal by element with counters/averages" },
          { id: "5-7", text: "Traversal by index for mutation" },
          { id: "5-8", text: "2D lists: building and indexing grids" },
          { id: "5-9", text: "Nested loops for 2D traversal" },
          { id: "5-10", text: "Grid analytics: totals and threshold counts" }
        ]
      },
      {
        id: 6,
        title: "Stacks & Queues (Concepts)",
        syllabus: "B2.2.3, B2.2.4",
        description: "Order operations for launch.",
        tasks: [
          { id: "6-1", text: "Stack concept: LIFO principle" },
          { id: "6-2", text: "Stack operations: push, pop with lists" },
          { id: "6-3", text: "Queue concept: FIFO principle" },
          { id: "6-4", text: "Queue operations: enqueue, dequeue with lists" },
          { id: "6-5", text: "Choosing: when to use stack vs queue" }
        ]
      },
      {
        id: 7,
        title: "Modular Programming",
        syllabus: "B2.3.4",
        description: "Create reusable rocket boosters.",
        tasks: [
          { id: "7-1", text: "Function definition with def" },
          { id: "7-2", text: "Parameters for data input" },
          { id: "7-3", text: "Multiple parameters" },
          { id: "7-4", text: "Return values" },
          { id: "7-5", text: "Returning multiple values" },
          { id: "7-6", text: "Local vs global scope" },
          { id: "7-7", text: "Function composition" },
          { id: "7-8", text: "Complete modular system" }
        ]
      },
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
      },
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
    ]
  },
  {
    id: 3,
    title: "Phase 3: Algorithms",
    description: "Standard algorithms for navigation.",
    levels: [
      {
        id: 10,
        title: "Complexity & Searching",
        syllabus: "B2.4.1, B2.4.2",
        description: "Measure efficiency, locate targets.",
        tasks: [
          { id: "10-1", text: "Big O notation fundamentals" },
          { id: "10-2", text: "Calculating O(1), O(N), O(N²), O(log N)" },
          { id: "10-3", text: "Space vs time trade-offs" },
          { id: "10-4", text: "Linear search implementation" },
          { id: "10-5", text: "Binary search implementation" }
        ]
      },
      {
        id: 11,
        title: "Sorting",
        syllabus: "B2.4.3",
        description: "Organize data for efficient processing.",
        tasks: [
          { id: "11-1", text: "Bubble sort with early-exit optimization" },
          { id: "11-2", text: "Selection sort implementation" },
          { id: "11-3", text: "Counting comparisons and swaps" },
          { id: "11-4", text: "Visual tracing of sorting passes" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Phase 4: OOP Fundamentals",
    description: "The paradigm shift from functions to objects.",
    levels: [
      {
        id: 12,
        title: "Single Class OOP",
        syllabus: "B3.1.1, B3.1.2, B3.1.4",
        description: "Blueprint new spacecraft classes.",
        tasks: [
          { id: "12-1", text: "Class definition basics" },
          { id: "12-2", text: "Constructor with __init__" },
          { id: "12-3", text: "Methods with parameters" },
          { id: "12-4", text: "Return values from methods" },
          { id: "12-5", text: "Objects containing objects" },
          { id: "12-6", text: "Object interaction" },
          { id: "12-7", text: "Fleet management system" }
        ]
      },
      {
        id: 13,
        title: "Encapsulation & Scope",
        syllabus: "B3.1.3, B3.1.5",
        description: "Secure internal systems.",
        tasks: [
          { id: "13-1", text: "Static (class) variables" },
          { id: "13-2", text: "Private attribute convention" },
          { id: "13-3", text: "Getter methods" },
          { id: "13-4", text: "Setter methods with validation" },
          { id: "13-5", text: "Complete encapsulated system" }
        ]
      }
    ]
  },

  // --- PATH 2: HIGHER LEVEL (HL) ---
  {
    id: 5,
    title: "Phase 5: Recursion",
    description: "Alternative algorithmic thinking.",
    isHLOnly: true,
    levels: [
      {
        id: 14,
        title: "Recursive Algorithms",
        syllabus: "B2.4.4, B2.4.5",
        description: "Self-referential logic loops.",
        tasks: [
          { id: "14-1", text: "Recursion fundamentals and base cases" },
          { id: "14-2", text: "Recursive step and problem reduction" },
          { id: "14-3", text: "Tracing the call stack" },
          { id: "14-4", text: "Classic examples: factorial and fibonacci" },
          { id: "14-5", text: "Recursive binary search" },
          { id: "14-6", text: "String processing with recursion" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Phase 6: Advanced OOP",
    description: "Complex relationships between classes.",
    isHLOnly: true,
    levels: [
      {
        id: 15,
        title: "Inheritance & Polymorphism",
        syllabus: "B3.2.1 - B3.2.4",
        description: "Upgrade existing models.",
        tasks: [
          { id: "15-1", text: "Inheritance: sharing parent attributes/methods" },
          { id: "15-2", text: "super().__init__ for extended constructors" },
          { id: "15-3", text: "Polymorphism via method overriding" },
          { id: "15-4", text: "Child-specific attributes and methods" },
          { id: "15-5", text: "Composition: classes containing other classes" },
          { id: "15-6", text: "Building class hierarchies" }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Phase 7: Abstract Data Types",
    description: "Complex dynamic structures.",
    isHLOnly: true,
    levels: [
      {
        id: 16,
        title: "Linked Lists",
        syllabus: "B4.1.2, B4.1.3",
        description: "Dynamic chains of command.",
        tasks: [
          { id: "16-1", text: "Node class with data and next pointer" },
          { id: "16-2", text: "LinkedList wrapper with head pointer" },
          { id: "16-3", text: "Insert operations: front, end, position" },
          { id: "16-4", text: "Delete operations: by value/position" },
          { id: "16-5", text: "Traversal, length, and search" },
          { id: "16-6", text: "Accessing elements at an index" },
          { id: "16-7", text: "Queue implementation with linked lists" }
        ]
      },
      {
        id: 17,
        title: "Trees",
        syllabus: "B4.1.4",
        description: "Hierarchical data mapping.",
        tasks: [
          { id: "17-1", text: "TreeNode structure and linking children" },
          { id: "17-2", text: "BST inserts and recursive search" },
          { id: "17-3", text: "Traversals: in-order, pre-order, post-order" },
          { id: "17-4", text: "BST properties: min/max and height" }
        ]
      },
      {
        id: 18,
        title: "Sets",
        syllabus: "B4.1.5",
        description: "Unique data collections.",
        tasks: [
          { id: "18-1", text: "Set basics: uniqueness and membership" },
          { id: "18-2", text: "Mutating sets: add, remove, discard" },
          { id: "18-3", text: "Set operations: union, intersection, difference" },
          { id: "18-4", text: "Using sets for relationships and deduplication" }
        ]
      },
      {
        id: 19,
        title: "Design Patterns",
        syllabus: "B3.2.5",
        description: "Proven solutions to common problems.",
        tasks: [
          { id: "19-1", text: "Understanding design patterns" },
          { id: "19-2", text: "Singleton: one instance only" },
          { id: "19-3", text: "Factory: dynamic object creation" },
          { id: "19-4", text: "Observer: event-driven notifications" }
        ]
      },
      {
        id: 20,
        title: "Hashing & Dictionaries",
        syllabus: "B4.1.6",
        description: "Fast key-value storage.",
        tasks: [
          { id: "20-1", text: "Hashing fundamentals and hash functions" },
          { id: "20-2", text: "Dictionary operations and O(1) lookups" },
          { id: "20-3", text: "Hash collisions and resolution" },
          { id: "20-4", text: "Load factors and practical applications" }
        ]
      }
    ]
  }
];
