# Source Map: HL Unit 4 - Professional OOP Design

## Scope
- Level: HL
- Unit: 4
- Unit name: Professional OOP Design
- Source policy: ib_content_md_first
- Out-of-scope rule: all non-mapped syllabus points are excluded.

## Mapped Subtopics
- B3.2.1: Relationships (Is-A / Has-A)
- B3.2.2: Inheritance
- B3.2.3: Polymorphism
- B3.2.4: Ubiquitous Computing (Wait, check syllabus? No, B3.2 is OOP)

## Source Files Used
- docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf
- docs/content/ib-content/IB_Content_MD/HL/Unit_B3_Structure_HL_Extension.md.pdf
- docs/content/ib-content/Unit Plans/HL/Unit Plan_ HL Unit 4 - Professional OOP Design (B3.2).docx (unit plan context)

## Evidence Fragments
### B3.2.1 — Relationships (Is-A / Has-A)
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
applications.

B2.4.5    Recursive Algorithms        Construct and trace
                                      recursive algorithms.

B3.2.1    Inheritance                 Explain and apply
                                      inheritance to promote
                                      code reusability.

B3.2.2   Polymorphism                 Construct code to model
                                      polymorphism (e.g.,
                                      overriding).

B3.2.3   Abstraction                  Explain the concept of
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B3_Structure_HL_Extension.md.pdf`
```text
Syllabus Point                  Command Term                   Student Expectation (The
                                                                "Do")


 B3.2.1                          Explain / Apply                Implement Inheritance
                                                                using parent/child classes
                                                                and super().

 B3.2.2                          Construct                      Write code to demonstrate
                                                                Polymorphism (overriding
                                                                methods).

 B3.2.3                          Explain                        Define Abstraction and
```
```text
●​   Aggregation: A "Has-a" relationship where the child object can exist independently (e.g.,
     Library and Book).
●​   Design Pattern: A standard solution to a common programming problem.

3. Core Content & Exam Actions
B3.2.1: Inheritance
Theory:
●​ IS-A Relationship: A Dog IS-A Animal.
●​ Syntax: class Child(Parent):
●​ Super: Use super().__init__() to ensure the parent's attributes are initialized correctly
   before adding child-specific attributes.
●​ Reusability: Code is written once in the Parent and reused by all Children.
Student Exam Action:
●​ Coding: Given a Vehicle class, create a Car subclass that adds a number_of_doors
```

### B3.2.2 — Inheritance
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
B3.2.1    Inheritance                 Explain and apply
                                      inheritance to promote
                                      code reusability.

B3.2.2   Polymorphism                 Construct code to model
                                      polymorphism (e.g.,
                                      overriding).

B3.2.3   Abstraction                  Explain the concept of
                                      abstraction in OOP.

B3.2.4   Composition/Aggregation      Explain role of composition
                                      and aggregation in class
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B3_Structure_HL_Extension.md.pdf`
```text
B3.2.1                          Explain / Apply                Implement Inheritance
                                                                using parent/child classes
                                                                and super().

 B3.2.2                          Construct                      Write code to demonstrate
                                                                Polymorphism (overriding
                                                                methods).

 B3.2.3                          Explain                        Define Abstraction and
                                                                implement Abstract
                                                                Classes as blueprints.

 B3.2.4                          Explain                        Differentiate between
```
```text
●​ Reusability: Code is written once in the Parent and reused by all Children.
Student Exam Action:
●​ Coding: Given a Vehicle class, create a Car subclass that adds a number_of_doors
   attribute.

B3.2.2: Polymorphism
Theory:
●​ Overriding: Changing how a method works in the subclass.
●​ Magic Methods: Overriding __str__ in Python to change how an object prints is a
   common form of polymorphism.
●​ Flexibility: You can store a list of different objects (e.g., [Circle, Square, Triangle]) and
   call .area() on all of them without knowing their specific type.
Student Exam Action:
●​ Tracing: Given a list of mixed objects, predict the output when a common method is
```

### B3.2.3 — Polymorphism
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
B3.2.2   Polymorphism                 Construct code to model
                                      polymorphism (e.g.,
                                      overriding).

B3.2.3   Abstraction                  Explain the concept of
                                      abstraction in OOP.

B3.2.4   Composition/Aggregation      Explain role of composition
                                      and aggregation in class
                                      relationships.

B3.2.5   Design Patterns              Explain commonly used
                                      design patterns.
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B3_Structure_HL_Extension.md.pdf`
```text
B3.2.2                          Construct                      Write code to demonstrate
                                                                Polymorphism (overriding
                                                                methods).

 B3.2.3                          Explain                        Define Abstraction and
                                                                implement Abstract
                                                                Classes as blueprints.

 B3.2.4                          Explain                        Differentiate between
                                                                Composition ("death"
                                                                relationship) and
                                                                Aggregation (independent
                                                                existence).
```
```text
call .area() on all of them without knowing their specific type.
Student Exam Action:
●​ Tracing: Given a list of mixed objects, predict the output when a common method is
   called on each (e.g., animal.speak() prints "Woof" for Dog and "Meow" for Cat).

B3.2.3: Abstraction
Theory:
●​ Abstract Base Class (ABC): In Python, use from abc import ABC, abstractmethod.
●​ Contract: It forces subclasses to implement specific methods. If a subclass doesn't
   implement an abstract method, it creates an error.
●​ Usage: You never say x = Shape(). You say x = Circle().
Student Exam Action:
●​ Explanation: Explain why Abstract classes are useful for teams of programmers
   (enforces a standard interface).
```

### B3.2.4 — Ubiquitous Computing (Wait, check syllabus? No, B3.2 is OOP)
- Source: `docs/content/ib-content/IB_Content_MD/HL/IB_CS_2027_HL_Extension.md.pdf`
```text
overriding).

B3.2.3   Abstraction                  Explain the concept of
                                      abstraction in OOP.

B3.2.4   Composition/Aggregation      Explain role of composition
                                      and aggregation in class
                                      relationships.

B3.2.5   Design Patterns              Explain commonly used
                                      design patterns.

B4.1.1   ADT Fundamentals             Explain properties and
                                      purpose of ADTs.
```
- Source: `docs/content/ib-content/IB_Content_MD/HL/Unit_B3_Structure_HL_Extension.md.pdf`
```text
B3.2.3                          Explain                        Define Abstraction and
                                                                implement Abstract
                                                                Classes as blueprints.

 B3.2.4                          Explain                        Differentiate between
                                                                Composition ("death"
                                                                relationship) and
                                                                Aggregation (independent
                                                                existence).

 B3.2.5                          Explain                        Describe the purpose of
                                                                Singleton, Factory, and
                                                                Observer design patterns.
```
```text
●​ Usage: You never say x = Shape(). You say x = Circle().
Student Exam Action:
●​ Explanation: Explain why Abstract classes are useful for teams of programmers
   (enforces a standard interface).

B3.2.4: Relationships (Composition vs Aggregation)
Theory:
●​ Composition (Strong): The "Container" controls the lifecycle. If you destroy the House
   object, the Room objects inside are destroyed. Represented by a filled diamond in UML.
●​ Aggregation (Weak): The "Container" holds a reference. If you destroy the Classroom
   object, the Student objects inside continue to exist. Represented by an empty diamond
   in UML.
Student Exam Action:
●​ Scenario ID: Given a scenario ("A Car has an Engine"), classify it as Composition or
```

## Unit Plan Extract (Context)
```text
Unit Plan: HL Unit 4 - Professional OOP Design (B3.2)
Subject: IB Computer Science (First Assessment 2027)
Grade: Year 12 (HL Only)
Duration: 2 Weeks (4 HL Lessons)
Theme: Theme B: Computational Thinking and Problem-solving
Unit Foundation
Concepts The focus shifts from single-class logic to System Architecture. Students explore how to build extensible and maintainable software through class hierarchies and structured relationships. Key themes include Code Reuse (Inheritance), Dynamic Behaviour (Polymorphism), and Lifecycle Dependency (Composition).
Content - B3.2.1: Relationship types: "Is-a" (Inheritance) vs. "Has-a" (Composition/Aggregation).
	•	B3.2.2: Inheritance implementation: Parent/Superclass vs. Child/Subclass. Using super() to extend functionality.
	•	B3.2.3: Polymorphism: Method overriding to provide specialized behaviour in subclasses.
	•	B3.2.4: Abstraction: Using abstract base classes (ABCs) to define interfaces without implementation.
	•	B3.2.5: Composition: Managing objects within objects where the "part" cannot exist without the "whole."
	•	B3.2.6: Design Patterns: Introduction to common solutions (e.g., Singleton or Factory) for architectural challenges.
Skills for Learning - Thinking Skills: Evaluating when to inherit versus when to compose (the "fragile base class" problem).
	•	Communication Skills: Constructing complex UML diagrams featuring inheritance (hollow arrows) and composition (filled diamonds).
Approaches to Teaching - Inquiry-based: Analysing a Media Library (from B3.pdf) to determine why a User "has a" Playlist but a Track "is a" MediaItem.
	•	Modelling: Converting real-world hierarchies (e.g., Employee types or Banking products) into multi-class code.
	•	Informed by Assessment: Direct practice of 5-10 mark Paper 2-style design questions.
Terminology Inheritance, Polymorphism, Method Overriding, Abstract Class, Interface, Composition, Aggregation, Dependency, UML, Singleton, Superclass, Subclass.
Misconceptions - Overriding vs. Overloading: Confusing changing a parent's method (Overriding) with having multiple methods of the same name but different parameters (Overloading).
	•	Inheritance Overuse: Attempting to force every relationship into an inheritance tree when composition is more appropriate.
	•	Abstract Classes: Thinking an abstract class can be instantiated (it is a blueprint for other blueprints).
Adaptive Strategies - Visual Mapping: Use physical nesting boxes to demonstrate Composition vs. directional arrows for Inheritance.
	•	Scaffolded Code: Provide the Parent class and have students implement only the unique overrides for the Subclass.
	•	ADHD-aware Logic: Break the "Bank System" project into discrete stages: 1. Core attributes, 2. Inheritance tree, 3. Polymorphic display, 4. Composition of accounts.
TOK Connections - Classification as Power: How do our choices in a class hierarchy reflect our cultural or social biases? (e.g., how do we categorise "Employment Status" in an HR system?).
	•	Reductionism: Does reducing a complex human entity to a set of inherited attributes lose the "truth" of that entity?
IBO Learner Profile - Thinkers: Critically evaluating the efficiency of different architectural patterns.
	•	Communicators: Using standardised UML to explain logic across complex multi-class systems.
Learning Overview (Lesson-by-Lesson)
Lesson
Core Knowledge
Description
Homework Opportunities
Assessment / Feedback
Number of Lessons
1
Inheritance & UML
"Is-a" logic. Superclasses and Subclasses. UML notation for inheritance.
HW 1: Design a UML hierarchy for a "Vehicle" system (Car, Truck, Bike).
Peer review: Check for correct arrow direction (points to parent).
1
2
Polymorphism & Overriding
Using super(). Overriding methods for specialised behaviour. Dynamic dispatch.
HW 2: Implement a Payment parent class and CreditCard / PayPal subclasses in Python.
Code Lab: Ensure the same method call produces different results per object.
1
3
Abstraction & Composition
Abstract Base Classes. "Part-of" relationships. Difference between Composition and Aggregation.
HW 3: Modify the Playlist logic from B3.pdf to use composition for Tracks.
Mid-Unit Quiz: Differentiating relationship types in code snippets.
1
4
System Design & Patterns
Combining all concepts. Intro to Design Patterns (Singleton). Evaluation of system maintainability.
HW 4: Complete the "MediaLibrary" multi-class challenge from the B3.pdf review.
End-Unit Assessment: Full Paper-style multi-class design and trace task.
1
```
