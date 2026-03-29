---
level: hl
unitNumber: 31
unitName: Fundamentals of OOP for Multiple Classes
summary: HL extension — inheritance, polymorphism, abstraction, composition, aggregation, and commonly used design patterns in object-oriented programming.
subtopics:
  - code: B3.2.1
    title: Inheritance and code reusability
  - code: B3.2.2
    title: Polymorphism and method overriding
  - code: B3.2.3
    title: Abstraction and abstract classes
  - code: B3.2.4
    title: Composition and aggregation
  - code: B3.2.5
    title: Design patterns in OOP
sourcePolicy: ib_content_md_first
---

## B3.2.1 Inheritance and code reusability

<span data-def="A mechanism where a new class (subclass) derives attributes and methods from an existing class (superclass), allowing code reuse and the modelling of IS-A relationships.">Inheritance</span> allows a class to take on the attributes and methods of another class. The new class is called the **subclass** (or child class), and the class it inherits from is the **superclass** (or parent class).

### The IS-A relationship

Inheritance models an **IS-A** relationship — a subclass is a more specialised version of its superclass.

| Relationship | Valid? | Reason |
|---|---|---|
| `Car` IS-A `Vehicle` | Yes | A car is a specialised type of vehicle |
| `Dog` IS-A `Animal` | Yes | A dog is a specialised type of animal |
| `Car` IS-A `Engine` | No | A car *has* an engine, it is not a type of engine |

If the IS-A test fails, inheritance is not the right relationship. Use composition or aggregation instead (see B3.2.4).

### Why inheritance promotes reusability

When multiple classes share common attributes and methods, inheritance allows the shared code to live in one place — the superclass. Subclasses inherit that code automatically and only need to define what is unique to them.

Without inheritance, shared logic must be duplicated across every class. A change to that logic requires updating every copy — increasing the risk of inconsistency and bugs.

### Implementing inheritance in Python

The superclass name is placed in parentheses after the subclass name. The `super()` function calls the superclass constructor.

```python
class Person:
    def __init__(self, name, phone, email):
        self.name = name
        self.phone = phone
        self.email = email

    def __str__(self):
        return f"Person: {self.name}"

class Customer(Person):    # Customer inherits from Person
    def __init__(self, name, phone, email, membership, points):
        super().__init__(name, phone, email)  # initialise inherited attributes
        self.membership = membership          # Customer-specific attributes
        self.points = points

    def __str__(self):
        return f"Customer: {self.name} has {self.points} points"

class Employee(Person):    # Employee inherits from Person
    def __init__(self, name, phone, email, salary):
        super().__init__(name, phone, email)
        self.salary = salary

    def __str__(self):
        return f"Employee: {self.name} earns ${self.salary}"
```

Both `Customer` and `Employee` inherit `name`, `phone`, and `email` from `Person`. Each subclass adds its own specialised attributes.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing inherited and subclass-specific attributes</p>
  <div class="ib-textbook-worked__body">
    <pre><code>p = Person("Jordan", "555 1234", "jordan@example.com")
c = Customer("Skyler", "555 2345", "skyler@example.com", 1, 0)
e = Employee("Avery", "555 3456", "avery@example.com", 75000)

print(p)
print(c)
print(e)</code></pre>
    <table>
      <tr><th>Object</th><th>Inherited attributes</th><th>Subclass-specific attributes</th></tr>
      <tr><td><code>p</code> (Person)</td><td>name, phone, email</td><td>—</td></tr>
      <tr><td><code>c</code> (Customer)</td><td>name, phone, email</td><td>membership, points</td></tr>
      <tr><td><code>e</code> (Employee)</td><td>name, phone, email</td><td>salary</td></tr>
    </table>
    <p>Output:</p>
    <pre><code>Person: Jordan
Customer: Skyler has 0 points
Employee: Avery earns $75000</code></pre>
    <p>Each subclass calls <code>super().__init__()</code> to initialise the inherited attributes, then sets its own. The <code>__str__</code> method is overridden in each subclass to provide type-specific output.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Overusing inheritance leads to tightly coupled code that is difficult to modify. Inheritance should only be used when classes share a genuine IS-A relationship — not simply because they share a few methods. If two classes do not form a natural hierarchy, prefer composition (B3.2.4).</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.2.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Inheritance lets a subclass reuse the attributes and methods of a superclass.</li>
      <li>It models an IS-A relationship — use the IS-A test before choosing inheritance.</li>
      <li><code>super().__init__()</code> calls the superclass constructor to initialise inherited attributes.</li>
      <li>Shared code lives in one place, reducing duplication and improving maintainability.</li>
    </ul>
  </div>
</div>


## B3.2.2 Polymorphism and method overriding

<span data-def="The ability of different classes to respond to the same method call in their own way. The caller uses one interface while the runtime type of the object determines which implementation executes.">Polymorphism</span> means "many forms." In OOP, it refers to the ability of objects of different classes to respond to the same method call with type-specific behaviour.

### Method overriding

<span data-def="When a subclass provides its own implementation of a method that is already defined in its superclass. The subclass version replaces the inherited version for objects of that subclass.">Overriding</span> occurs when a subclass defines a method with the same name as one in its superclass. The subclass version replaces the inherited version for objects of that type.

```python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):        # overrides Animal.speak()
        return "Woof"

class Cat(Animal):
    def speak(self):        # overrides Animal.speak()
        return "Meow"
```

Each subclass provides its own implementation of `speak()`. The method signature is the same — only the behaviour changes.

### Polymorphism in action

The power of polymorphism is that the caller does not need to know the specific type of each object. A single loop can call `speak()` on a mixed list, and the correct version executes automatically based on the object's runtime type.

```python
animals = [Dog(), Cat(), Dog(), Cat()]

for animal in animals:
    print(animal.speak())
```

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Tracing polymorphic method dispatch</p>
  <div class="ib-textbook-worked__body">
    <table>
      <tr><th>Iteration</th><th>Runtime type</th><th><code>speak()</code> result</th></tr>
      <tr><td>1</td><td>Dog</td><td>"Woof"</td></tr>
      <tr><td>2</td><td>Cat</td><td>"Meow"</td></tr>
      <tr><td>3</td><td>Dog</td><td>"Woof"</td></tr>
      <tr><td>4</td><td>Cat</td><td>"Meow"</td></tr>
    </table>
    <p>The loop uses a single interface (<code>animal.speak()</code>), but runtime dispatch selects the correct implementation based on each object's actual class.</p>
  </div>
</div>

### Why polymorphism matters

Without polymorphism, processing different types requires explicit type checking:

```python
# Without polymorphism — fragile and hard to extend
for animal in animals:
    if isinstance(animal, Dog):
        print("Woof")
    elif isinstance(animal, Cat):
        print("Meow")
```

This approach breaks every time a new animal type is added. With polymorphism, adding a new subclass (e.g., `Bird`) requires no changes to the loop — only the new class needs to define its own `speak()` method.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Overriding is not overloading</p>
  <p class="ib-textbook-note__body">Overriding replaces an inherited method with a new implementation in a subclass. Overloading means having multiple methods with the same name but different parameters in the same class. Python does not support traditional method overloading — if you define two methods with the same name, the second replaces the first.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.2.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Polymorphism allows different classes to respond to the same method call with type-specific behaviour.</li>
      <li>Method overriding means a subclass replaces an inherited method with its own implementation.</li>
      <li>The caller does not need to know each object's specific type — runtime dispatch selects the correct method.</li>
      <li>Polymorphism makes code extensible: new subclasses can be added without modifying existing code that uses the shared interface.</li>
    </ul>
  </div>
</div>


## B3.2.3 Abstraction and abstract classes

<span data-def="The principle of exposing only essential features of a class while hiding the implementation details. In OOP, abstraction is often achieved through abstract classes that define a required interface without providing a full implementation.">Abstraction</span> in OOP means defining *what* a class must do without specifying *how* it does it. An <span data-def="A class that cannot be instantiated directly. It defines one or more abstract methods that subclasses must implement, enforcing a consistent interface across all subclasses.">abstract class</span> is a class that cannot be instantiated on its own — it exists solely to be inherited by concrete subclasses.

### Why use abstract classes?

Abstract classes define a **contract** that all subclasses must follow. They guarantee that certain methods will exist in every subclass, even though each subclass implements them differently.

| Benefit | Explanation |
|---|---|
| Consistent interface | All subclasses have the same method names, so calling code can rely on them |
| Prevents incomplete implementations | A subclass that forgets to implement an abstract method causes an error |
| Clear extension points | New subclasses know exactly which methods they must provide |

### Abstract classes in Python

Python uses the `abc` module to define abstract classes. The `@abstractmethod` decorator marks methods that subclasses must implement.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def get_area(self):
        pass

    @abstractmethod
    def get_perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def get_area(self):
        import math
        return math.pi * self.radius ** 2

    def get_perimeter(self):
        import math
        return 2 * math.pi * self.radius
```

`Shape` cannot be instantiated directly — `Shape()` raises a `TypeError`. But any code that receives a `Shape` object knows it can call `get_area()` and `get_perimeter()`, regardless of the specific subclass.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Using polymorphism with abstract classes</p>
  <div class="ib-textbook-worked__body">
    <pre><code>shapes = [Rectangle(10, 4), Rectangle(36, 7), Circle(42), Circle(10)]

for shape in shapes:
    print(f"Area: {shape.get_area():.2f}, Perimeter: {shape.get_perimeter():.2f}")</code></pre>
    <p>Because both <code>Rectangle</code> and <code>Circle</code> implement the <code>Shape</code> contract, the loop works without knowing the specific type. This combines abstraction (the contract) with polymorphism (type-specific behaviour).</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">Abstraction is not the same as simply using a base class. Use an abstract class when the base class has no meaningful implementation of its own — when it exists only to define the interface. If the base class can provide useful default behaviour, a regular (non-abstract) superclass may be more appropriate.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.2.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Abstraction defines what a class must do without specifying how.</li>
      <li>Abstract classes cannot be instantiated — they exist to be inherited.</li>
      <li>Abstract methods (marked with <code>@abstractmethod</code> in Python) must be implemented by every concrete subclass.</li>
      <li>Abstract classes enforce a consistent interface and prevent incomplete implementations.</li>
    </ul>
  </div>
</div>


## B3.2.4 Composition and aggregation

Beyond inheritance (IS-A), classes can be related through **HAS-A** relationships — where one class contains objects of another class as attributes. There are two forms of HAS-A relationship, distinguished by **lifecycle dependency**.

### Composition

<span data-def="A strong HAS-A relationship where the contained object (part) cannot exist independently of the container (whole). If the whole is destroyed, its parts are destroyed too.">Composition</span> is a strong HAS-A relationship. The contained object's lifecycle is entirely controlled by the container — if the container is destroyed, its parts are destroyed too.

Examples of composition:
- A `House` is composed of `Room` objects — rooms do not exist independently of the house.
- A `Car` creates and owns its `Engine` — the engine is built as part of the car.
- A `Playlist` owns its internal `PlayHistory` records — they are deleted with the playlist.

```python
class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower

class Car:
    def __init__(self, make, hp):
        self.make = make
        self.engine = Engine(hp)  # Car creates and owns the Engine
```

The `Engine` is created *inside* the `Car` constructor. It has no independent existence — it lives and dies with the `Car`.

### Aggregation

<span data-def="A weak HAS-A relationship where the contained object (part) can exist independently of the container (whole). The container holds a reference but does not control the part's lifecycle.">Aggregation</span> is a weaker HAS-A relationship. The container holds a reference to objects that exist independently — if the container is destroyed, the contained objects continue to exist.

Examples of aggregation:
- A `University` contains `Student` objects — students exist independently and can transfer elsewhere.
- A `Library` has `Book` objects — books can exist outside the library.
- A `Classroom` references `Student` objects — students are not destroyed if the classroom is removed.

```python
class Student:
    def __init__(self, name):
        self.name = name

class Classroom:
    def __init__(self, students):
        self.students = students  # Classroom references pre-existing Students
```

The `Student` objects are created *outside* the `Classroom` and passed in. They have independent lifecycles.

### Comparison

| Feature | Composition | Aggregation |
|---|---|---|
| Relationship strength | Strong — part depends on whole | Weak — part is independent |
| Lifecycle | Part is destroyed with the whole | Part survives the whole's destruction |
| Creation | Container creates the part | Part is created externally and passed in |
| UML notation | Filled diamond (◆) | Hollow diamond (◇) |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Identifying composition vs aggregation</p>
  <div class="ib-textbook-worked__body">
    <table>
      <tr><th>Scenario</th><th>Relationship</th><th>Reason</th></tr>
      <tr><td>A Course has enrolled Students stored by reference</td><td>Aggregation</td><td>Students exist independently of any one course</td></tr>
      <tr><td>A Computer creates and owns a temporary Session object</td><td>Composition</td><td>The session has no independent persistence</td></tr>
      <tr><td>An Airline has a fleet of Airplane objects</td><td>Aggregation</td><td>Airplanes can be sold or transferred to other airlines</td></tr>
      <tr><td>A Human body is composed of Heart and Lungs</td><td>Composition</td><td>Organs do not function independently outside the body</td></tr>
    </table>
    <p>The guiding question is always: <strong>can the part exist independently of the whole?</strong> If yes, it is aggregation. If no, it is composition.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">The distinction between composition and aggregation can be context-dependent. A Car–Engine relationship is typically composition, but in a mechanic's workshop system, engines might be tracked independently and transferred between cars — making it aggregation. Always consider the specific problem domain when deciding.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.2.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Composition is a strong HAS-A relationship — the part's lifecycle depends on the whole.</li>
      <li>Aggregation is a weak HAS-A relationship — the part exists independently.</li>
      <li>In composition, the container creates the part. In aggregation, the part is passed in from outside.</li>
      <li>Use the lifecycle test: if the part is destroyed with the whole, it is composition; if it survives, it is aggregation.</li>
    </ul>
  </div>
</div>


## B3.2.5 Design patterns in OOP

<span data-def="Reusable solutions to common problems in software design. Design patterns are not code — they are templates that describe how to structure classes and objects to solve recurring design challenges.">Design patterns</span> are proven, reusable approaches to problems that arise repeatedly in software development. They are not specific pieces of code but general templates that can be adapted to many situations. Design patterns improve code readability, reusability, and reliability because they represent solutions that have been tested across many real-world projects.

Three commonly used design patterns at this level are the **singleton pattern**, the **factory pattern**, and the **observer pattern**.

### Singleton pattern

The <span data-def="A design pattern that ensures a class has only one instance throughout the entire program. It provides a global point of access to that single instance.">singleton pattern</span> restricts a class to a single instance. That one instance is shared globally across the program.

**When to use it:** when exactly one object is needed to coordinate actions — for example, a database connection manager, a settings/configuration object, or a logging service.

```python
class Settings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.data = {}
        return cls._instance

    def set(self, key, value):
        self.data[key] = value

    def get(self, key):
        return self.data.get(key)
```

```python
s1 = Settings()
s1.set("theme", "dark")

s2 = Settings()
print(s2.get("theme"))   # "dark" — s1 and s2 are the same object
print(s1 is s2)           # True
```

No matter how many times `Settings()` is called, the same instance is returned. Any changes made through one reference are visible through all others.

### Factory pattern

The <span data-def="A design pattern that provides a method for creating objects without specifying the exact class to instantiate. The factory method decides which subclass to create based on input parameters.">factory pattern</span> delegates object creation to a method (the *factory*) that decides which class to instantiate based on input. The calling code does not need to know the specific class — it receives an object that conforms to a shared interface.

**When to use it:** when the exact type of object to create depends on a parameter or condition — for example, creating different types of UI elements, document formats, or game characters.

```python
class Button:
    def render(self):
        return "Standard button"

class PrimaryButton(Button):
    def render(self):
        return "Primary button (blue)"

class AlertButton(Button):
    def render(self):
        return "Alert button (red)"

def create_button(style):
    if style == "primary":
        return PrimaryButton()
    elif style == "alert":
        return AlertButton()
    else:
        return Button()
```

```python
btn = create_button("primary")
print(btn.render())   # "Primary button (blue)"
```

The calling code asks for a button by style name and receives the correct type. Adding a new button style requires only a new subclass and an additional condition in the factory — existing code that uses `create_button()` does not change.

### Observer pattern

The <span data-def="A design pattern where an object (the subject) maintains a list of dependent objects (observers) and notifies them automatically when its state changes. This creates a one-to-many relationship.">observer pattern</span> establishes a one-to-many relationship between objects. When one object (the **subject**) changes state, all registered **observers** are notified automatically.

**When to use it:** when multiple parts of a system need to react to changes in another part — for example, updating multiple UI displays when data changes, or sending notifications when an event occurs.

```python
class EventManager:
    def __init__(self):
        self.listeners = []

    def subscribe(self, listener):
        self.listeners.append(listener)

    def notify(self, event):
        for listener in self.listeners:
            listener.update(event)

class Logger:
    def update(self, event):
        print(f"LOG: {event}")

class EmailAlert:
    def update(self, event):
        print(f"EMAIL: {event}")
```

```python
manager = EventManager()
manager.subscribe(Logger())
manager.subscribe(EmailAlert())

manager.notify("User logged in")
# LOG: User logged in
# EMAIL: User logged in
```

The `EventManager` does not know the specific types of its listeners — it only knows they have an `update()` method. New observer types can be added without modifying the manager.

### Summary of patterns

| Pattern | Purpose | Key idea |
|---|---|---|
| Singleton | Ensure only one instance exists | Global access to a shared resource |
| Factory | Create objects without specifying exact class | Delegate creation to a method |
| Observer | Notify multiple objects of state changes | One-to-many subscription model |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Patterns are about structure, not syntax</p>
  <p class="ib-textbook-note__body">Design patterns are language-independent ideas. The Python examples above illustrate the concepts, but the same patterns can be implemented in any OOP language. At IB level, you should be able to explain <em>what</em> each pattern does, <em>when</em> to use it, and <em>why</em> it is useful — not just write the code.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — B3.2.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Design patterns are reusable solutions to common software design problems.</li>
      <li>The <strong>singleton</strong> pattern ensures only one instance of a class exists — useful for shared resources like settings or database connections.</li>
      <li>The <strong>factory</strong> pattern delegates object creation to a method that decides which class to instantiate based on input.</li>
      <li>The <strong>observer</strong> pattern notifies multiple dependent objects when a subject's state changes — a one-to-many subscription model.</li>
    </ul>
  </div>
</div>
