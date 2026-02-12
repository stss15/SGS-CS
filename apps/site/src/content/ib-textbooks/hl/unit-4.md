---
level: hl
unitNumber: 4
unitName: Professional OOP Design
summary: Revise Professional OOP Design with source-bounded coverage of B3.2.1, B3.2.2, B3.2.3, and B3.2.4, focusing on class relationships, code construction, and maintainable OOP architecture.
subtopics:
  - code: B3.2.1
    title: Inheritance and IS-A Relationships
  - code: B3.2.2
    title: Polymorphism Through Overriding
  - code: B3.2.3
    title: Abstraction with Abstract Classes
  - code: B3.2.4
    title: Composition vs Aggregation
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| inheritance | Reusing parent class attributes/methods in child classes through an IS-A relationship. |
| superclass | Parent class from which child classes derive behavior. |
| subclass | Child class that extends or specializes parent behavior. |
| polymorphism | Calling a shared interface while runtime type determines behavior. |
| overriding | Replacing an inherited method implementation in a child class. |
| abstraction | Exposing required behavior while hiding implementation details. |
| abstract class | Non-instantiable class defining methods that subclasses must implement. |
| composition | Strong HAS-A relationship where part lifecycle depends on whole lifecycle. |
| aggregation | Weaker HAS-A relationship where part can exist independently. |
| interface contract | Agreed method signatures and behavior expected across implementations. |

## B3.2.1 Inheritance and IS-A Relationships

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain and apply

Inheritance is appropriate when a child class is a true specialization of a parent type.

| Relationship test | Example |
| --- | --- |
| IS-A | `Car` is a `Vehicle` |
| NOT IS-A | `Car` is not an `Engine` |

Explain why inheritance helps: shared attributes/methods live in one place, reducing duplication and keeping behavior consistent across subclasses.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

A transport system can centralize common logic (`id`, `max_speed`, `status`) in `Vehicle`, then specialize subclasses (`Car`, `Bus`, `Bike`) with additional fields.

Use inheritance only when semantic hierarchy is real. Reusing code alone is not enough reason to create a parent-child tree.

</div>

### Worked example: parent-child construction with `super()`

<div class="reader-section-body reader-section-body--example">

```python
class Vehicle:
    def __init__(self, name, max_speed):
        self.name = name
        self.max_speed = max_speed

class Car(Vehicle):
    def __init__(self, name, max_speed, doors):
        super().__init__(name, max_speed)
        self.doors = doors

city_taxi = Car("CityTaxi", 160, 4)
```

| Object | Inherited fields | Child-specific field |
| --- | --- | --- |
| `city_taxi` | `name`, `max_speed` | `doors` |

`super()` ensures parent initialization happens correctly before subclass-specific setup.

</div>

## B3.2.2 Polymorphism Through Overriding

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Construct

Polymorphism construction means writing code where different objects respond to the same method name with type-specific behavior.

| Class | Shared method | Output behavior |
| --- | --- | --- |
| `Dog` | `speak()` | "woof" |
| `Cat` | `speak()` | "meow" |

The caller uses one interface (`obj.speak()`), while runtime dispatch selects the correct implementation.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

- Overriding is not overloading. Overriding keeps same method signature and changes behavior in subclass.
- Polymorphism is not random behavior; it is predictable runtime method selection based on object type.
- You can still write type-agnostic loops that call shared methods across mixed object lists.

</div>

### Worked trace: mixed-object method dispatch

<div class="reader-section-body reader-section-body--example">

```python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "woof"

class Cat(Animal):
    def speak(self):
        return "meow"

animals = [Dog(), Cat(), Dog()]
outputs = [a.speak() for a in animals]
```

| Iteration | Runtime object type | `speak()` result |
| --- | --- | --- |
| 1 | `Dog` | `woof` |
| 2 | `Cat` | `meow` |
| 3 | `Dog` | `woof` |

Final `outputs`: `['woof', 'meow', 'woof']`

</div>

## B3.2.3 Abstraction with Abstract Classes

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Abstraction defines what subclasses must provide without forcing one concrete implementation in the parent class.

| Abstract design benefit | Why it matters |
| --- | --- |
| Consistent interface | Team members can code against one contract |
| Reduced misuse | Prevents incomplete object creation |
| Clear extension points | New subclasses must implement required methods |

This supports maintainability in larger systems where multiple developers add new classes.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

If every payment type must support `authorize()` and `capture()`, an abstract parent class enforces those requirements.

That contract prevents partial implementations from silently entering production.

</div>

### Worked example: abstract contract in Python

<div class="reader-section-body reader-section-body--example">

```python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def authorize(self, amount):
        pass

class CardPayment(PaymentMethod):
    def authorize(self, amount):
        return amount <= 5000
```

`PaymentMethod` cannot be instantiated directly. `CardPayment` is valid because it implements the required abstract method.

</div>

## B3.2.4 Composition vs Aggregation

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Both are HAS-A relationships, but lifecycle dependency differs.

| Relationship type | Lifecycle dependency | Example |
| --- | --- | --- |
| Composition | Part depends on whole | `House` and its `Room` objects |
| Aggregation | Part independent of whole | `Library` and `Book` objects |

Explanation quality depends on the lifecycle argument, not just the phrase "has-a."

</div>

### The domain matrix

<div class="reader-section-body reader-section-body--apply">

| Scenario | Composition or aggregation? | Reason |
| --- | --- | --- |
| Course has enrolled Student objects stored by reference | Aggregation | Students exist independently of one course instance |
| Playlist owns internal play-history records deleted with playlist | Composition | Records are tied to playlist lifecycle |
| Car object creates and owns a temporary onboard Session object | Composition | Session has no independent persistence |

</div>

### Worked example: contrasting implementation style

<div class="reader-section-body reader-section-body--example">

```python
class Engine:
    pass

class Car:  # composition: Car creates and owns Engine
    def __init__(self):
        self.engine = Engine()

class Student:
    def __init__(self, name):
        self.name = name

class Classroom:  # aggregation: Student exists independently
    def __init__(self, students):
        self.students = students
```

`Car` controls `Engine` lifecycle directly. `Classroom` only references pre-existing `Student` instances.

</div>
