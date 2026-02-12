---
level: sl
unitNumber: 5
unitName: The OOP Paradigm
summary: Revise The OOP Paradigm with exam-focused coverage of B3.1.1, B3.1.2, B3.1.3, B3.1.4, B3.1.5, including exact command-term expectations and applied examples.
subtopics:
  - code: B3.1.1
    title: OOP Fundamentals
  - code: B3.1.2
    title: Class design
  - code: B3.1.3
    title: Static vs Non-static
  - code: B3.1.4
    title: Class definition & Instantiation
  - code: B3.1.5
    title: Encapsulation
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Object-oriented programming (OOP) | A paradigm that models software as objects that combine data and behavior. |
| Class | A blueprint that defines attributes and methods for objects of that type. |
| Object (instance) | A concrete item created from a class at runtime. |
| Constructor (`__init__`) | A special method that initializes a new object when it is instantiated. |
| Attribute | Data stored inside an object or class. |
| Method | A function that belongs to a class and operates on its data. |
| UML class diagram | A three-part diagram showing class name, attributes, and methods. |
| Visibility symbol | UML marker for access level (`+` public, `-` private). |
| Instance variable | Data unique to one object, usually referenced with `self`. |
| Static (class) variable | Data shared by all instances of a class. |
| Encapsulation | Keeping internal data protected and exposing controlled access through methods. |
| Information hiding | Preventing direct external manipulation of internal object state. |
| Accessor (getter) | A method used to read a private attribute. |
| Mutator (setter) | A method used to update a private attribute, often with validation. |
| Name mangling | Python behavior for `__name` fields that reduces accidental external access. |


## B3.1.1 Evaluating OOP Fundamentals

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Evaluate

The IB expects you to evaluate why OOP is useful and where it can be less suitable. That means you need both strengths and trade-offs, then a clear judgment linked to a scenario.

In OOP, each object combines its own data and methods. This gives you modular structure: one class can change without forcing a full rewrite of every other part of the system.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Criterion | Procedural style | OOP style |
| --- | --- | --- |
| Organizing a library system | Separate functions and global data structures | `Book`, `User`, `Loan` objects with data + methods |
| Reuse in another project | Usually copy-paste and edit functions | Reuse class definitions directly |
| Handling change | Changes can affect many function calls | Changes are isolated to class boundaries |
| Risk | Global state can be modified anywhere | Encapsulation can protect state |

**Limitations to include in evaluation:**
- OOP has a steeper learning curve at the start.
- For very small scripts, class structure can feel heavier than needed.

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

```python
class Book:
    def __init__(self, title, isbn):
        self.title = title
        self.isbn = isbn
        self.is_loaned = False

    def loan(self):
        if not self.is_loaned:
            self.is_loaned = True
            return True
        return False

novel = Book("1984", "9780451524935")
print(novel.loan())   # True
print(novel.loan())   # False
```

The object keeps its own state (`is_loaned`) and controls updates through a method (`loan`). This is exactly the modular and controlled behavior you are evaluating in B3.1.1.

</div>


## B3.1.2 Constructing Class Design with UML

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Construct

The IB expects you to construct class designs, usually as UML class diagrams. A valid design must show class name, attributes, and methods with correct visibility symbols.

A standard UML class diagram has three rows:
1. Class name
2. Attributes (fields)
3. Methods (operations)

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| UML element | What to show | Example |
| --- | --- | --- |
| Class name row | Singular noun naming the entity | `BankAccount` |
| Attributes row | Data name and type | `- balance: float` |
| Methods row | Method signature and return type | `+ deposit(amount: float): void` |
| Visibility | `+` public, `-` private | `- accountNumber: int` |

Design rule: attributes describe object state, methods describe behavior. If a method does not act on the class data, reconsider whether it belongs in that class.

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

Scenario: "A car has a registration, a speed, and can accelerate or brake."

```text
+-----------------------------+
| Car                         |
+-----------------------------+
| - registration: String      |
| - speed: float              |
+-----------------------------+
| + accelerate(delta: float)  |
| + brake(delta: float)       |
| + getSpeed(): float         |
+-----------------------------+
```

This design is construct-ready: it can be translated into code with minimal ambiguity.

</div>


## B3.1.3 Distinguishing Static and Non-static Members

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Distinguish

The IB expects you to distinguish what belongs to each individual object (instance/non-static) and what is shared across the entire class (static/class-level).

- Instance variable: separate copy per object.
- Static variable: one shared copy for all objects.

</div>

### Worked trace

<div class="reader-section-body reader-section-body--example">

```python
class Product:
    next_id = 1000  # static/class variable

    def __init__(self, name):
        self.name = name                 # instance variable
        self.product_id = Product.next_id
        Product.next_id += 1

p1 = Product("Keyboard")
p2 = Product("Mouse")

print(p1.product_id, p2.product_id)  # 1000 1001
print(Product.next_id)               # 1002
```

| Value after two objects | Meaning |
| --- | --- |
| `p1.name = "Keyboard"` | Instance value unique to `p1` |
| `p2.name = "Mouse"` | Instance value unique to `p2` |
| `Product.next_id = 1002` | Shared static value seen by all instances |

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

Use static members when data is common to all objects:
- counters (`next_id`)
- shared constants (`tax_rate`, `school_name`)

Use instance members when values differ per object:
- account balance
- student name
- item stock level for one product

Distinction check: if changing the value for one object should affect all others, it is static. If not, it is instance-level.

</div>


## B3.1.4 Constructing Classes and Instantiating Objects

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Construct

The IB expects you to construct working class code: class definition, constructor, instance attributes, and object instantiation.

Core sequence:
1. Define the class.
2. Write `__init__` with `self` as first parameter.
3. Initialize object attributes.
4. Instantiate objects by calling the class.

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius * self.radius

small = Circle(2)
large = Circle(5)

print(small.area())  # 12.56636
print(large.area())  # 78.53975
```

Both objects come from one class template, but each holds its own `radius` value.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Common error | Correct approach |
| --- | --- |
| Forgetting `self` in method definition | Always write `def method(self, ...)` |
| Naming constructor incorrectly | In Python, constructor name must be `__init__` |
| Treating class and object as the same | Class = template; object = specific instance |
| Expecting shared values without static variable | Use class variable for shared state |

Instantiation means memory is allocated and the constructor runs immediately to set the initial object state.

</div>


## B3.1.5 Explaining and Applying Encapsulation

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain and apply

The IB expects you to explain why encapsulation matters and apply it in code. Encapsulation protects object data by preventing direct uncontrolled updates from outside the class.

Python conventions used in this course:
- `_name` for internal-use attributes
- `__name` for name-mangled attributes
- public methods for controlled access and updates

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Unsafe pattern | Encapsulated pattern |
| --- | --- |
| External code sets invalid value directly (`p.age = -5`) | Setter validates before update (`set_age(value)`) |
| Any code can modify balance instantly | Methods such as `deposit()` and `withdraw()` enforce rules |
| Data correctness depends on every caller being careful | Class itself guarantees correctness |

Encapsulation is not about hiding everything. It is about controlling important state changes through clear interfaces.

</div>

### Worked refactor

<div class="reader-section-body reader-section-body--example">

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.__age = 0
        self.set_age(age)

    def get_age(self):
        return self.__age

    def set_age(self, value):
        if value >= 0:
            self.__age = value
        else:
            raise ValueError("Age cannot be negative")

p = Person("Amina", 16)
print(p.get_age())  # 16
```

The class keeps control of its own state. Even if external code tries to set invalid data, validation logic prevents corruption.

</div>
