# Source Map: HL Unit 3 - Recursive Problem Solving

## Scope
- Level: HL
- Unit: 3
- Unit name: Recursive Problem Solving
- Source policy: ib_content_md_first
- Out-of-scope rule: all non-mapped syllabus points are excluded.

## Mapped Subtopics
- B2.4.4: Recursion Definition
- B2.4.5: Tracing & Stack Frames
- B2.5: Standard Algorithms (Quicksort)

## Source Files Used
- docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf
- docs/content/ib-content/IB_Content_MD/HL/Unit_B2_Structure_HL_Extension.md.pdf
- docs/content/ib-content/Unit Plans/HL/Unit Plan_ HL Unit 3 - Recursive Problem Solving (B2.4).docx (unit plan context)

## Evidence Fragments
### B2.4.4 — Recursion Definition
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
A4.3.10   Model Selection             Explain importance of
                                      model selection and
                                      comparison.

B2.4.4    Recursion Concepts          Explain fundamental
                                      concept of recursion and
                                      applications.

B2.4.5    Recursive Algorithms        Construct and trace
                                      recursive algorithms.

B3.2.1    Inheritance                 Explain and apply
                                      inheritance to promote
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B2_Structure_HL_Extension.md.pdf`
```text
Unit B2: Programming (HL Extension)
Sub-topics: B2.4.4 & B2.4.5 (Recursion & Advanced Algorithms)


1. Syllabus Scope & Learning Outcomes
These topics are for Higher Level students only and are often tested in Paper 1 Section B or
Paper 2.


 Syllabus Point                  Command Term                    Student Expectation (The
```
```text
Syllabus Point                  Command Term                    Student Expectation (The
                                                                 "Do")


 B2.4.4                          Explain                         Define recursion, Base
                                                                 Case, and General Case.
                                                                 Compare recursion vs.
                                                                 iteration.

 B2.4.5                          Construct / Trace               Write and trace recursive
                                                                 algorithms (Factorial,
                                                                 Fibonacci, Binary Tree
                                                                 traversals).
```

### B2.4.5 — Tracing & Stack Frames
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
B2.4.4    Recursion Concepts          Explain fundamental
                                      concept of recursion and
                                      applications.

B2.4.5    Recursive Algorithms        Construct and trace
                                      recursive algorithms.

B3.2.1    Inheritance                 Explain and apply
                                      inheritance to promote
                                      code reusability.

B3.2.2   Polymorphism                 Construct code to model
                                      polymorphism (e.g.,
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B2_Structure_HL_Extension.md.pdf`
```text
Unit B2: Programming (HL Extension)
Sub-topics: B2.4.4 & B2.4.5 (Recursion & Advanced Algorithms)


1. Syllabus Scope & Learning Outcomes
These topics are for Higher Level students only and are often tested in Paper 1 Section B or
Paper 2.


 Syllabus Point                  Command Term                    Student Expectation (The
```
```text
B2.4.4                          Explain                         Define recursion, Base
                                                                 Case, and General Case.
                                                                 Compare recursion vs.
                                                                 iteration.

 B2.4.5                          Construct / Trace               Write and trace recursive
                                                                 algorithms (Factorial,
                                                                 Fibonacci, Binary Tree
                                                                 traversals).

 B2.4.5                          Trace                           Trace the execution of
                                                                 Quicksort (partitioning and
                                                                 pivoting).
```

### B2.5 — Standard Algorithms (Quicksort)
- No direct code match found in selected IB_Content_MD PDFs. Use mapped unit-plan wording and bounded chapter references if needed.

## Unit Plan Extract (Context)
```text
Unit Plan: HL Unit 3 - Recursive Problem Solving (B2.4)
Subject: IB Computer Science (First Assessment 2027)
Grade: Year 12 (HL Only)
Duration: 3 Weeks (6 HL Lessons)
Theme: Theme B: Computational Thinking and Problem-solving
Unit Foundation
Concepts The unit focuses on Self-Reference and Decomposition. It explores the recursive nature of computational problems where a solution depends on solutions to smaller instances of the same problem. Key themes include the Runtime Stack, Termination Logic, and Divide and Conquer strategies.
Content - B2.4.4: The nature of recursion: defining a method that calls itself. Identifying self-similar sub-problems in data.
	•	B2.4.5: Structural components: The Base Case (halting condition) and the General Case (recursive step).
	•	B2.4.5: Memory mechanics: The Call Stack and Stack Frames. Storing local variables, parameters, and return addresses during the "winding" phase.
	•	Execution Flow: Understanding the unwinding phase where values are returned back up the stack.
	•	Sorting Implementation: Application of recursion in Quicksort (pivot selection and partitioning) and Merge Sort (divide and conquer).
	•	Efficiency Analysis: Evaluating the trade-offs between recursion and iteration regarding time complexity and $O(n)$ space complexity overhead on the stack.
Skills for Learning - Thinking Skills: Visualising the lifecycle of a recursive call from initial invocation to final return.
	•	Communication Skills: Expressing recursive logic through detailed trace tables that track the stack depth and return values.
Approaches to Teaching - Inquiry-based: Using the "Factorial" or "Sum of N" problems to deduce why a base case is mandatory to avoid stack overflow.
	•	Problem-based: Manually tracing the Quicksort partitioning process on a whiteboard to understand the sub-array recursion.
	•	Visualisation: Using "Recursion Trees" to map out the branching factor of algorithms like Fibonacci or Merge Sort.
Terminology Recursion, Base Case, General Case, Recursive Step, Stack Frame, Call Stack, Stack Overflow, Winding/Unwinding, Divide and Conquer, Pivot, Partitioning, Tail Recursion.
Misconceptions - Infinite Loops vs. Recursion: Students often think an infinite recursion just "loops." It must be clarified that it causes a StackOverflowError due to memory exhaustion.
	•	Unwinding Phase: Many believe the function "ends" at the base case; they must understand that the stack must then pop every frame to return the final value.
	•	Variable Persistence: Believing local variables are shared across calls. Each stack frame has its own unique instance of local data.
Adaptive Strategies - Visual Call Stacks: Use a physical stack of "Post-it" notes or transparent trays. Each call writes its data on a new note and places it on top; the "unwinding" involves taking them off and passing results down.
	•	Scaffolded Tracing: Provide trace tables with a "Depth" or "Level" column to help students stay oriented during complex traces.
	•	ADHD-Aware Syntax: Emphasise the "Exit Clause First" coding pattern to ensure the base case is never forgotten.
TOK Connections - Infinite Regress: If a solution always requires a smaller version of itself, does the logic ever have a true foundation?
	•	Mathematical Elegance: Why do we value "elegant" recursive solutions in CS when they are often less efficient in terms of physical hardware resources?
IBO Learner Profile - Thinkers: Deconstructing complex problems into simpler, self-similar components.
	•	Balanced: Making informed decisions on when to use recursion (for clarity/natural fit) versus iteration (for performance).
CAS Connections - Creativity: Using recursive algorithms to generate procedural art or fractals (e.g., Koch snowflake or Sierpinski triangle).
Learning Overview (Lesson-by-Lesson)
Lesson
Core Knowledge
Description
Homework Opportunities
Assessment / Feedback
Number of Lessons
1
Recursive Foundations
Defining recursion. The mechanics of the Base Case and General Case.
HW 1: Write a recursive function for Factorial(n) and Sum(n) in pseudocode.
Quiz: Identify the base case and recursive step in 3 code samples.
1
2
Memory & The Stack
Winding and Unwinding. How Stack Frames store return addresses and local state.
N/A
Diagramming the stack growth for Fibonacci(4).
1
3-4
Tracing & Debugging
Using trace tables to track variable state and return values across multiple levels of recursion.
HW 2: Trace the Greatest Common Divisor (GCD) algorithm for (48, 18).
Mid-Unit Assessment: Tracing an unseen recursive function.
2
5
Quicksort Logic
Divide and Conquer sorting. Pivot selection, partitioning, and recursive sub-array calls.
HW 3: Compare Quicksort and Merge Sort logic. Which is more memory-intensive?
Peer review of Quicksort partition traces.
1
6
Evaluation & Review
Comparing recursion vs iteration. Identifying "Stack Overflow" triggers. Unit Review.
Final Prep: Complete the HL Recursion practice paper.
End-Unit Assessment: Mixed theory paper on tracing and sorting
```

## Coverage Decisions (2026-02-12 Rewrite)
- Rewritten textbook coverage follows mapped codes only: B2.4.4, B2.4.5, B2.5.
- Command-term alignment retained: Explain; Construct/Trace.
- Quicksort treatment constrained to recursive partition/pivot tracing and not expanded into non-mapped algorithm sets.

## Explicit Out-of-Scope Exclusions
- Excluded B2.4.1-B2.4.3 (SL-aligned algorithm foundations not mapped here).
- Excluded B3.* OOP content.

## Ambiguities and Bounded Interpretation
- `B2.5` lacked direct coded extraction in selected HL extension table; bounded interpretation mapped to unit-plan "Standard Algorithms (Quicksort)" and structure evidence for B2.4.5 quicksort tracing only.
