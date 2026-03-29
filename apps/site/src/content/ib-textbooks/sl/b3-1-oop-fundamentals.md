---
level: sl
unitNumber: 36
unitName: Fundamentals of OOP for a Single Class
summary: Object-oriented programming fundamentals — classes, objects, methods, constructors, static vs instance members, and encapsulation with information hiding.
subtopics:
  - code: B3.1.1
    title: Fundamentals of OOP
  - code: B3.1.2
    title: Designing classes
  - code: B3.1.3
    title: Static and non-static members
  - code: B3.1.4
    title: Defining classes and instantiating objects
  - code: B3.1.5
    title: Encapsulation and information hiding
sourcePolicy: ib_content_md_first
---

## B3.1.1 Fundamentals of OOP

<span data-def="A programming paradigm that models software as a collection of objects, each combining data (attributes) and behaviour (methods) into a single unit.">Object-oriented programming (OOP)</span> is a way of organising code around **objects** — self-contained units that combine data and the operations that act on that data. Rather than writing a long sequence of instructions that operate on separate variables, OOP groups related data and behaviour together.

### Core concepts

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Class</p>
  <p class="ib-textbook-defn__body">A blueprint or template that defines the attributes (data) and methods (behaviour) that objects of that type will have. A class does not hold data itself — it describes the structure.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Object (instance)</p>
  <p class="ib-textbook-defn__body">A concrete item created from a class at runtime. Each object has its own copy of the class's attributes and can call the class's methods. Creating an object is called <strong>instantiation</strong>.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Attribute</p>
  <p class="ib-textbook-defn__body">A variable that belongs to an object (or class), storing data about its state. For example, a <code>Student</code> object might have attributes <code>name</code>, <code>age</code>, and <code>grade</code>.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Method</p>
  <p class="ib-textbook-defn__body">A function defined inside a class that operates on the object's data. Methods define what an object can <em>do</em>.</p>
</div>

### Why OOP?

OOP offers several advantages for building software:

- **Modularity** — each class is a self-contained unit that can be developed, tested, and maintained independently.
- **Reusability** — classes can be reused across projects or extended through inheritance.
- **Abstraction** — users of a class interact with its methods without needing to understand internal details.
- **Maintainability** — changes to one class do not necessarily affect others, reducing the risk of introducing bugs.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">OOP is a paradigm, not a language</p>
  <p class="ib-textbook-note__body">OOP is a way of thinking about and structuring code. Languages like Python, Java, and C++ support OOP, but OOP principles can be applied in many contexts. The IB expects you to understand the concepts, not just the syntax.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>OOP models software as objects that combine data (attributes) and behaviour (methods).</li>
      <li>A class is a blueprint; an object is a concrete instance of that class.</li>
      <li>OOP promotes modularity, reusability, abstraction, and maintainability.</li>
    </ul>
  </div>
</div>


## B3.1.2 Designing classes

Before writing code, a class should be designed to define what data it holds and what operations it supports. The IB uses **UML class diagrams** as the standard design notation.

### UML class diagram

A UML class diagram has three sections:

1. **Class name** — at the top, in bold.
2. **Attributes** — the data the class stores, with visibility markers.
3. **Methods** — the operations the class provides, with visibility markers.

Visibility markers:
- `+` = **public** — accessible from outside the class
- `-` = **private** — accessible only from within the class
- `#` = **protected** — accessible from the class and its subclasses (HL)

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">UML diagram for a BankAccount class</p>
  <div class="ib-textbook-worked__body">
    <pre><code>┌─────────────────────────┐
│      BankAccount        │
├─────────────────────────┤
│ - owner: String         │
│ - balance: Float        │
├─────────────────────────┤
│ + deposit(amount): void │
│ + withdraw(amount): void│
│ + get_balance(): Float  │
└─────────────────────────┘</code></pre>
    <p>The <code>owner</code> and <code>balance</code> attributes are private (<code>-</code>) — they cannot be accessed directly from outside the class. The methods are public (<code>+</code>) — they provide controlled access to the data.</p>
  </div>
</div>

### Design principles

When designing a class:
- Give it a **clear, single responsibility** — a `Student` class should manage student data, not also handle file saving.
- Make attributes **private by default** — expose them through methods only when needed.
- Name methods to describe **what they do**, not how — `get_balance()` rather than `return_balance_variable()`.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.1.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>UML class diagrams show class name, attributes, and methods with visibility markers.</li>
      <li>Visibility: <code>+</code> public, <code>-</code> private, <code>#</code> protected.</li>
      <li>Design classes with a single clear responsibility and private attributes by default.</li>
    </ul>
  </div>
</div>


## B3.1.3 Static and non-static members

### Instance (non-static) members

<span data-def="A variable or method that belongs to a specific object. Each object has its own copy of instance variables, and instance methods operate on that object's data.">Instance members</span> belong to individual objects. Each object has its own copy of instance variables, and instance methods operate on that specific object's data.

```python
class Dog:
    def __init__(self, name):
        self.name = name    # instance variable — unique to each Dog

dog1 = Dog("Rex")
dog2 = Dog("Bella")
print(dog1.name)  # "Rex"
print(dog2.name)  # "Bella"  — each object has its own name
```

### Static (class) members

<span data-def="A variable or method that belongs to the class itself rather than to any individual object. All instances share the same static variable. Static methods can be called without creating an object.">Static members</span> belong to the class itself, not to individual objects. All instances share the same static variable.

```python
class Dog:
    count = 0             # static (class) variable — shared by all Dogs

    def __init__(self, name):
        self.name = name  # instance variable
        Dog.count += 1    # increment the shared counter

dog1 = Dog("Rex")
dog2 = Dog("Bella")
print(Dog.count)   # 2 — shared across all instances
```

### Comparison

| Feature | Instance (non-static) | Static (class) |
|---------|----------------------|----------------|
| Belongs to | Individual object | The class itself |
| Copies | One per object | One shared copy |
| Accessed via | `self.attribute` | `ClassName.attribute` |
| Use case | Object-specific data (name, score) | Shared data (count, constants) |

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Modifying a static variable through an instance (<code>dog1.count = 5</code>) creates a new <em>instance</em> variable that shadows the class variable, rather than changing the shared value. Always use <code>ClassName.variable</code> to modify static variables.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.1.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Instance variables belong to individual objects; each object has its own copy.</li>
      <li>Static (class) variables are shared across all instances of the class.</li>
      <li>Use static variables for data that applies to the class as a whole (counters, constants).</li>
    </ul>
  </div>
</div>


## B3.1.4 Defining classes and instantiating objects

### Constructors

A <span data-def="A special method that runs automatically when a new object is created. It initialises the object's attributes to starting values.">constructor</span> is a special method that initialises a new object when it is created. In Python, the constructor is `__init__`:

```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def get_average(self):
        if len(self.grades) == 0:
            return 0
        return sum(self.grades) / len(self.grades)

    def __str__(self):
        return f"{self.name} (age {self.age})"
```

### Creating and using objects

```python
# Instantiation — creating objects from the class
alice = Student("Alice", 16)
bob = Student("Bob", 17)

# Calling methods
alice.add_grade(85)
alice.add_grade(92)
print(alice.get_average())  # 88.5
print(alice)                # "Alice (age 16)"
```

Each call to `Student(...)` creates a new object with its own `name`, `age`, and `grades` attributes. The `self` parameter in each method refers to the specific object the method is called on.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing object creation and method calls</p>
  <div class="ib-textbook-worked__body">
    <pre><code>car = Car("Toyota", 0)
car.accelerate(30)
car.accelerate(20)
print(car.speed)  # ?</code></pre>
    <p>Assuming <code>Car.__init__</code> sets <code>self.make</code> and <code>self.speed</code>, and <code>accelerate()</code> adds the argument to <code>self.speed</code>:</p>
    <table>
      <tr><th>Action</th><th>make</th><th>speed</th></tr>
      <tr><td>Car("Toyota", 0)</td><td>"Toyota"</td><td>0</td></tr>
      <tr><td>accelerate(30)</td><td>"Toyota"</td><td>30</td></tr>
      <tr><td>accelerate(20)</td><td>"Toyota"</td><td>50</td></tr>
    </table>
    <p>Output: <code>50</code>.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.1.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>The constructor (<code>__init__</code>) runs automatically when an object is created and sets up initial attribute values.</li>
      <li><code>self</code> refers to the specific object being operated on.</li>
      <li>Objects are created by calling the class name with arguments: <code>Student("Alice", 16)</code>.</li>
      <li>Each object maintains its own independent set of instance attributes.</li>
    </ul>
  </div>
</div>


## B3.1.5 Encapsulation and information hiding

<span data-def="Bundling data (attributes) and the methods that operate on that data into a single unit (class), while restricting direct access to the internal data from outside.">Encapsulation</span> means bundling data and methods together inside a class, and controlling access to the internal data. <span data-def="Preventing external code from directly accessing or modifying an object's internal state. External code must use the object's public methods instead.">Information hiding</span> is the practice of making internal data private, so it can only be accessed or modified through controlled public methods.

### Why encapsulation matters

Without encapsulation, any part of the program can directly change an object's data — including setting it to invalid values:

```python
# Without encapsulation — dangerous
account.balance = -1000000  # no validation, no restrictions
```

With encapsulation, data is accessed through methods that can enforce rules:

```python
# With encapsulation — controlled access
class BankAccount:
    def __init__(self, owner, balance):
        self.__owner = owner        # private
        self.__balance = balance    # private

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Invalid withdrawal")

    def get_balance(self):
        return self.__balance
```

The `__` prefix makes attributes private in Python (name mangling). External code must use `deposit()`, `withdraw()`, and `get_balance()` — it cannot set the balance directly.

### Accessors and mutators

<span data-def="A method that returns the value of a private attribute without modifying it. Also called a 'getter'.">Accessors (getters)</span> read private data. <span data-def="A method that modifies a private attribute, typically including validation to ensure the new value is valid. Also called a 'setter'.">Mutators (setters)</span> modify private data, typically with validation:

```python
class Student:
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    # Accessor
    def get_name(self):
        return self.__name

    # Mutator with validation
    def set_age(self, age):
        if 0 < age < 120:
            self.__age = age
        else:
            print("Invalid age")
```

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Encapsulation is not just about making attributes private. The point is to <em>control</em> how data is accessed and modified — ensuring validity, enforcing rules, and allowing the internal implementation to change without breaking external code.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.1.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Encapsulation bundles data and methods together; information hiding restricts direct access to internal data.</li>
      <li>Private attributes (prefixed with <code>__</code> in Python) cannot be accessed directly from outside the class.</li>
      <li>Accessors (getters) read private data; mutators (setters) modify it with validation.</li>
      <li>Encapsulation protects data integrity and allows internal changes without breaking external code.</li>
    </ul>
  </div>
</div>
