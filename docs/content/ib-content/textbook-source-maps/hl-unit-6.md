# Source Map: HL Unit 6 - Abstract Data Types

## Scope
- Level: HL
- Unit: 6
- Unit name: Abstract Data Types
- Source policy: ib_content_md_first
- Out-of-scope rule: all non-mapped syllabus points are excluded.

## Mapped Subtopics
- B4.1.2: Linked Lists
- B4.1.4: Binary Search Trees
- B4.1.7: Hash Tables
- B4.1.5: Sets

## Source Files Used
- docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf
- docs/content/ib-content/IB_Content_MD/HL/Unit_B4_Structure_HL.md.pdf
- docs/content/ib-content/Unit Plans/HL/Unit Plan_ HL Unit 6 - Abstract Data Types (B4.1).docx (unit plan context)

## Evidence Fragments
### B4.1.2 — Linked Lists
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
design patterns.

B4.1.1   ADT Fundamentals             Explain properties and
                                      purpose of ADTs.

B4.1.2   Linked Lists (Theory)        Evaluate linked lists.

B4.1.3   Linked Lists (Application)   Construct and apply
                                      linked lists (singly, doubly,
                                      circular).

B4.1.4   BSTs (Binary Search Trees)   Explain structures and
                                      properties of BSTs.
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B4_Structure_HL.md.pdf`
```text
ADTs: separating the
                                                                   interface (what it does)
                                                                   from the implementation
                                                                   (how it works).

 B4.1.2                           Evaluate                         Compare Linked Lists vs.
                                                                   Arrays regarding memory
                                                                   efficiency and access
                                                                   speed.

 B4.1.3                           Construct / Apply                Sketch diagrams and write
                                                                   Python code for Singly,
                                                                   Doubly, and Circular Linked
                                                                   Lists (insert, delete,
```
```text
structure directly.
Student Exam Action:
●​ Explanation: Explain why using an ADT improves code maintenance (implementation can
   change without breaking the rest of the program).

B4.1.2 & B4.1.3: Linked Lists
Theory:
●​ Structure: A chain of Nodes. Each Node = [Data | Pointer].
●​ Types:
   ○​ Singly: Points forward only (Next).
   ○​ Doubly: Points forward (Next) and backward (Prev).
   ○​ Circular: The Tail points back to the Head.
●​ vs Arrays:
   ○​ Arrays: Static size, fast access (index), slow insertion (shifting).
```

### B4.1.4 — Binary Search Trees
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
B4.1.3   Linked Lists (Application)   Construct and apply
                                      linked lists (singly, doubly,
                                      circular).

B4.1.4   BSTs (Binary Search Trees)   Explain structures and
                                      properties of BSTs.

B4.1.5   Sets                         Construct and apply sets
                                      as an ADT.

B4.1.6   ADT Core Principles          Explain core principles of
                                      ADTs (e.g., hash tables).
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B4_Structure_HL.md.pdf`
```text
Python code for Singly,
                                                                   Doubly, and Circular Linked
                                                                   Lists (insert, delete,
                                                                   traversal).

 B4.1.4                           Explain                          Describe BST structure and
                                                                   trace traversals (In-order,
                                                                   Pre-order, Post-order).

 B4.1.5                           Construct / Apply                Use Set theory and Python
                                                                   Sets to perform Union,
                                                                   Intersection, and Difference
                                                                   operations.
```
```text
●​ Diagramming: Draw a Linked List before and after inserting a node "X" between nodes
   "A" and "B". (Show the pointer arrows changing).
●​ Coding: Write a Python Node class and a LinkedList class with an insert_at_head(data)
   method.

B4.1.4: Binary Search Trees (BST)
Theory:
●​ Rules: Left Child < Parent < Right Child.
●​ Traversals:
   ○​ In-order (LNR): Left, Node, Right (Outputs sorted data: A-Z).
   ○​ Pre-order (NLR): Node, Left, Right (Useful for copying trees).
   ○​ Post-order (LRN): Left, Right, Node (Useful for deleting trees).
Student Exam Action:
●​ Sketching: Given a list of numbers [10, 5, 15, 3, 7], draw the resulting BST.
```

### B4.1.7 — Hash Tables
- No direct code match found in selected IB_Content_MD PDFs. Use mapped unit-plan wording and bounded chapter references if needed.

### B4.1.5 — Sets
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
circular).

B4.1.4   BSTs (Binary Search Trees)   Explain structures and
                                      properties of BSTs.

B4.1.5   Sets                         Construct and apply sets
                                      as an ADT.

B4.1.6   ADT Core Principles          Explain core principles of
                                      ADTs (e.g., hash tables).
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B4_Structure_HL.md.pdf`
```text
B4.1.4                           Explain                          Describe BST structure and
                                                                   trace traversals (In-order,
                                                                   Pre-order, Post-order).

 B4.1.5                           Construct / Apply                Use Set theory and Python
                                                                   Sets to perform Union,
                                                                   Intersection, and Difference
                                                                   operations.

 B4.1.6                           Explain                          Explain Hash Table
                                                                   mechanics: Hashing
                                                                   algorithms, Collisions
                                                                   (Chaining/Open
```
```text
○​ Post-order (LRN): Left, Right, Node (Useful for deleting trees).
Student Exam Action:
●​ Sketching: Given a list of numbers [10, 5, 15, 3, 7], draw the resulting BST.
●​ Tracing: Write the output sequence for a Post-order traversal of a given tree diagram.

B4.1.5: Sets
Theory:
●​ Properties: Unordered, Unique elements (no duplicates), Mutable.
●​ Operations:

    ○​ Union (          ): All elements from both.

    ○​ Intersection (           ): Elements present in BOTH.
```

## Unit Plan Extract (Context)
```text
Unit Plan: HL Unit 6 - Abstract Data Types (B4.1)
Subject: IB Computer Science (First Assessment 2027)
Grade: Year 12 (HL Only)
Duration: 7 Weeks (14 HL Lessons)
Theme: Theme B: Computational Thinking and Problem-solving
Unit Foundation
Concepts The focus is on Logical Abstraction vs Physical Implementation. This unit explores ADTs as "contracts" (interfaces) that define what data can do, independent of how it is stored. Key themes include Dynamic Memory Allocation, Non-linear Data Organisation, and Efficiency of Retrieval (Hashing).
Content - B4.1.1/6: Properties of ADTs: Modularity, Abstraction, and Information Hiding. The role of the Interface.
	•	B4.1.2/3: Linked Lists: Implementation and traversal of Singly, Doubly, and Circular lists. Managing pointers (Head/Null).
	•	B4.1.4: Binary Search Trees (BST): Recursive structure, parent-child relationships, and depth vs. breadth.
	•	BST Traversals: In-order (Sorted output), Pre-order, and Post-order logic.
	•	B4.1.7: Hash Tables: Hashing algorithms (e.g., MOD), collision handling, and the process of Rehashing.
	•	B4.1.5: Sets: ADT properties and operations (Union, Intersection, Difference).
Skills for Learning - Thinking Skills: Selecting the most appropriate ADT for a specific memory or speed constraint.
	•	Communication Skills: Sketching memory states before and after pointer manipulation in linked lists.
Approaches to Teaching - Inquiry-based: Comparing the time complexity of searching a Linked List vs. a BST vs. a Hash Table.
	•	Visualisation: Using "Human Pointers" where students hold strings to represent next/previous links in a circular list.
	•	Incremental: Implementing a Singly Linked List from scratch before moving to Doubly/Circular variants.
Terminology ADT, Interface, Pointer, Node, Singly Linked, Doubly Linked, Circular, BST, Root, Leaf, In-order, Pre-order, Post-order, Hash Function, Collision, Rehashing, Union, Intersection.
Misconceptions - BST Search: Assuming a BST is always $O(\log n)$; students must see that a "skewed" tree performs like a linked list ($O(n)$).
	•	Linked List Pointers: Forgetting to update the "Tail" or "Prev" pointers during deletion, leading to memory leaks or broken chains.
	•	Hashing: Believing a "perfect" hash function eliminates the need for collision handling.
Adaptive Strategies - Visual Mapping: Use different coloured Post-it notes for "Data" and "Pointer" fields in a node.
	•	Scaffolded Tracing: Provide a BST diagram and have students only fill in the "In-order" traversal sequence.
	•	ADHD-Aware: Use the "Node-Link" physical model—small, discrete tasks like "Insert node at head" vs. "Insert node at tail" to prevent cognitive overload.
TOK Connections - Models vs Reality: ADTs are mathematical models. To what extent does the "purity" of a model like a BST mask the messy physical reality of memory fragmentation?
	•	Categorisation: How does the way we "hash" and categorise data change the way we retrieve and value that knowledge?
IBO Learner Profile - Thinkers: Applying abstract logic to design complex, non-linear structures.
	•	Knowledgeable: Understanding why modern databases prefer B-trees or Hash indexes over simple arrays.
Learning Overview (Lesson-by-Lesson)
Lesson
Core Knowledge
Description
Homework Opportunities
Assessment / Feedback
Number of Lessons
1-2
Intro to ADTs
Properties: Abstraction and Modularity. Defining the Interface vs. the Class.
HW 1: Define 3 ADTs found in everyday life (e.g., a Vending Machine).
Quiz: Matching ADT properties to definitions.
2
3-5
Linked Lists
Singly, Doubly, and Circular. Managing pointers during insertion and deletion.
HW 2: Sketch a Circular Linked List with 4 nodes; show the "Tail to Head" link.
Peer Review: Checking pointer logic in student sketches.
3
6-8
BST Organisation
Recursive structure. Building a BST from a dataset.
HW 3: Construct a BST from the list: [50, 30, 70, 20, 40, 60, 80].
Mid-Unit Assessment: BST construction and terminology.
3
9-10
BST Traversals
In-order, Pre-order, and Post-order. Practical applications of each (e.g., printing sorted data).
N/A
Lab Feedback: Generating the "In-order" sequence for a complex tree.
2
11-12
Hash Tables
Hashing algorithms (MOD). Dealing with collisions and the concept of Rehashing.
HW 4: Calculate the hash value for 1021 MOD 100 and describe a collision scenario.
Peer Review: Explaining the steps of a rehashing algorithm.
2
13
Sets as ADTs
Union, Intersection, and Difference operations. Logical application.
N/A
Problem Set: Performing set operations on two provided data collections.
1
14
Unit Evaluation
Synthesis of ADTs. Choosing the right structure for the scenario. Review.
Final Prep: Complete the HL B4 Practice Paper.
End-Unit Assessment: Mixed theory paper on ADTs, Trees, and Hashing.
1
```

## Coverage Decisions (2026-02-12 Rewrite)
- Rewritten textbook coverage follows mapped codes only: B4.1.2, B4.1.4, B4.1.7, B4.1.5.
- Command-term alignment retained for linked lists, BSTs, and sets from HL structure evidence.
- Hash-table content constrained to hashing, collisions, chaining/probing, and load-factor context.

## Explicit Out-of-Scope Exclusions
- Excluded B4.1.1 ADT fundamentals and B4.1.3 linked-list implementation coding.
- Excluded non-mapped B4.1.6 in textbook headings to preserve mapped route contract.

## Ambiguities and Bounded Interpretation
- Source documents index hash-table mechanics under `B4.1.6`, while mapped unit plan uses `B4.1.7`. Bounded interpretation: keep textbook section heading at mapped code `B4.1.7` but content mirrors documented hash-table mechanics only.
