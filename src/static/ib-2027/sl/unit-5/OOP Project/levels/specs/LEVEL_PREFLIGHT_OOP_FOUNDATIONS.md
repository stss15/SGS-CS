# Level Specification: Preflight - OOP Foundations

**Type**: Worksheet-only (no download)  
**Estimated Time**: 1 lesson  
**Prerequisites**: None

---

## Overview

This is the orientation level. Students learn the core OOP mental model before writing any code.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Explain what OOP is and why it's used in game development
2. Distinguish between a class (blueprint) and an object (instance)
3. Define attributes and methods in plain English
4. Read a simple UML class diagram
5. Understand how this project works (engine vs student code)
6. Know what the validator does and how to use it

---

## Keywords & Definitions

| Keyword | Definition |
|---------|------------|
| Object-Oriented Programming | A programming paradigm based on objects containing data and behaviour |
| Class | A blueprint or template for creating objects |
| Object | An instance of a class; a specific thing created from a blueprint |
| Attribute | Data stored inside an object (its properties/characteristics) |
| Method | A function defined inside a class that operates on objects |
| Instance | A specific object created from a class |
| Constructor | Special method that runs when an object is created |

---

## Worksheet Content

### Section 1: The Blueprint Analogy

- A class is like an architectural blueprint
- An object is a house built from that blueprint
- You can build many houses (objects) from one blueprint (class)
- Each house has the same structure but can have different paint (attribute values)

### Section 2: A Character Class Example (UML only)

```
┌──────────────────────┐
│       Player         │
├──────────────────────┤
│ - name: str          │
│ - health: int        │
│ - max_health: int    │
├──────────────────────┤
│ + get_status(): str  │
│ + take_damage(int)   │
│ + heal(int)          │
└──────────────────────┘
```

- The box shows a class called `Player`
- The middle section shows attributes (data)
- The bottom section shows methods (behaviour)
- `-` means private/protected, `+` means public

### Section 2b: Access Modifiers in Python (Concept Only)

In languages like Java/C#, access modifiers are enforced keywords:
- public: accessible everywhere
- protected: accessible in subclasses
- private: accessible only inside the class

Python does not enforce access modifiers. Instead it uses naming conventions:
- public: no underscore (e.g., health)
- protected (by convention): single underscore (e.g., _items)
- private-ish: double underscore name-mangling (e.g., __items)

Why this matters:
- You can still access these attributes, but you should not from outside the class
- This supports encapsulation without strict enforcement

### Section 2c: Abstraction (Concept Only)

Abstraction means defining what an object can do, not how it does it.
- In Java/C#, this is done with abstract classes or interfaces
- In Python, you can use ABC and @abstractmethod, but this project keeps it conceptual

In this project, the engine is written to "expect" certain methods on Player.
That expectation is an abstraction: any class that provides those methods can be used.

### Section 3: How This Project Works

1. The **engine** runs the game (teacher-provided, do not edit)
2. **Your code** provides the game logic (student folder)
3. The **validator** checks your code before playing
4. Each level adds new features to your code

### Section 4: The Workflow

1. Read the worksheet objectives
2. Understand the UML diagram
3. Create the required class in your student folder
4. Run the validator to check your work
5. If PASS, run the game to see your code in action
6. If FAIL, read the error and fix your code

---

## Success Criteria

This level has no code to validate. Students demonstrate understanding by:
- [ ] Correctly answering comprehension questions on the worksheet
- [ ] Identifying attributes and methods from a UML diagram
- [ ] Explaining the difference between a class and an object

---

## Download

**No download** — worksheet only.

---

## Validation

**No validator** — worksheet only.

---

## Engine Content

None — this level has no game component.

---

## Notes for Teachers

- Use this level to set expectations
- Emphasise that students will NOT see Python code on worksheets
- Walk through the UML diagram carefully
- Demonstrate the validator on a simple example if possible
- Address common misconceptions: class ≠ object, method ≠ function (in this context)
