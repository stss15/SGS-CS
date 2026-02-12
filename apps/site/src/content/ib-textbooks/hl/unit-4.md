---
level: hl
unitNumber: 4
unitName: Professional OOP Design
summary: Revise Professional OOP Design with exam-focused coverage of B3.2.1, B3.2.2, B3.2.3, B3.2.4, including exact command-term expectations and applied examples.
subtopics:
  - code: B3.2.1
    title: Inheritance
  - code: B3.2.2
    title: Polymorphism
  - code: B3.2.3
    title: Abstraction
  - code: B3.2.4
    title: Composition/Aggregation
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| class | A blueprint defining object attributes and behavior. |
| object | An instance of a class with its own state. |
| encapsulation | Restricting direct access to internal state through controlled interfaces. |
| inheritance | Defining a new class by extending an existing class. |
| polymorphism | Using a shared interface with type-specific behavior. |
| abstraction | Focusing on essential detail while ignoring irrelevant complexity. |
| composition | Building complex objects from simpler component objects. |
| design pattern | A reusable software design solution to a recurring problem. |

## B3.2.1 Inheritance

### Required response

> **Command term:** Explain
>
> Explain and apply inheritance to promote code reusability.

### What this means

For this syllabus point, focus on using inheritance accurately in context. Use it in object-oriented design to build reusable and maintainable software. Inheritance models shared behavior across related classes while reducing duplicated logic.

### System context

- Model responsibilities and relationships before coding.
- Use abstraction boundaries to reduce coupling.
- Ensure behavior is consistent with class design intent.

### Compact example

```python
class Vehicle: pass
class Bus(Vehicle): pass
```
Inheritance expresses an is-a relationship and supports behavior reuse.

## B3.2.2 Polymorphism

### Exam requirement

> **Command term:** Construct
>
> Construct code to model polymorphism (e.g., overriding).

### Core understanding

In this part of the unit, you need secure understanding of polymorphism. Use it in object-oriented design to build reusable and maintainable software. Polymorphism allows common interfaces with type-specific behavior at runtime.

### In real systems

- Model responsibilities and relationships before coding.
- Use abstraction boundaries to reduce coupling.
- Ensure behavior is consistent with class design intent.

### Worked snapshot

```python
class User:
    def __init__(self, name):
        self.name = name

student = User('Mia')
```
Class definition creates a template; instantiation creates an object with state.

## B3.2.3 Abstraction

### What the command expects

> **Command term:** Explain
>
> Explain the concept of abstraction in OOP.

### Key idea

Abstraction is treated as applied reasoning, not only a definition. Use it in object-oriented design to build reusable and maintainable software.

### Applied in context

- Model responsibilities and relationships before coding.
- Use abstraction boundaries to reduce coupling.
- Ensure behavior is consistent with class design intent.

### Quick worked example

```python
class Shape:
    def area(self):
        raise NotImplementedError
```
Abstraction exposes required behavior without fixing one concrete implementation.

## B3.2.4 Composition/Aggregation

### Required response

> **Command term:** Explain
>
> Explain role of composition and aggregation in class relationships.

### What this means

For this syllabus point, focus on using composition/aggregation accurately in context. Use it in object-oriented design to build reusable and maintainable software. Composition and aggregation model has-a relationships with different ownership and lifecycle constraints.

### System context

- Model responsibilities and relationships before coding.
- Use abstraction boundaries to reduce coupling.
- Ensure behavior is consistent with class design intent.

### Compact example

```python
class Engine: pass
class Car:
    def __init__(self):
        self.engine = Engine()
```
Composition models a has-a relationship where one object owns another component.

