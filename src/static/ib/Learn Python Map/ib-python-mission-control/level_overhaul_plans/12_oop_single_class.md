# Level 12: Single Class OOP

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 12 |
| **Title** | Single Class OOP |
| **Syllabus** | B3.1.1, B3.1.2, B3.1.4 |
| **Challenge Count** | 7 |
| **Prerequisites** | Levels 1-11 (especially functions) |

---

## ⚠️ SINGLE FILE CONSTRAINT

The IDE runs single Python files. All class definitions will be in one file. This is fine for learning - we focus on class CONCEPTS, not file organization.

---

## Learning Objectives

By the end of this level, students will be able to:
1. Understand the concept of classes and objects
2. Define classes using the `class` keyword
3. Create constructors using `__init__`
4. Define instance attributes (variables)
5. Create methods (functions inside classes)
6. Instantiate objects using `ClassName()`
7. Access attributes and methods using dot notation
8. Create multiple objects from one class

---

## Synoptic Connections

### From Previous Levels:
- **Level 1**: Variables (attributes are variables inside objects)
- **Level 2**: Selection (used in methods)
- **Level 3**: Loops (used in methods)
- **Level 7**: Functions (methods are functions inside classes)

### Key Paradigm Shift:
From: `function(data)` - functions that operate on data
To: `object.method()` - objects that contain data AND behavior

---

## Space-Themed Classes

```python
class Spacecraft:    # Our main example class
class Astronaut:     # Person class
class Mission:       # Mission tracking
class SensorArray:   # Data collection
class Planet:        # Destination
```

---

## Base Content Sections

### Section 1: What is OOP?

```typescript
{
  title: "1. Introduction to Object-Oriented Programming",
  content: `Object-Oriented Programming (OOP) organizes code around "objects" that combine data (attributes) and functions (methods).

Think of a spacecraft:
- **Attributes**: name, fuel_level, crew_count, position
- **Methods**: launch(), dock(), refuel()

A class is the BLUEPRINT, an object is an INSTANCE created from that blueprint. You can create many objects from one class!`,
  codeExample: `# Without OOP (procedural):
spacecraft1_name = "Apollo"
spacecraft1_fuel = 100

def launch_spacecraft(name, fuel):
    print(f"{name} launching with {fuel}% fuel")

launch_spacecraft(spacecraft1_name, spacecraft1_fuel)

# With OOP:
# The spacecraft knows its own name and fuel
# And knows how to launch itself!`
}
```

### Section 2: Defining a Class

```typescript
{
  title: "2. Creating a Class",
  content: `A class is defined with the class keyword. By convention, class names use PascalCase (capitalize each word).

The simplest class just defines a name. But real classes have:
- A constructor (__init__)
- Attributes (data)
- Methods (behavior)`,
  codeExample: `# Simple class definition
class Spacecraft:
    pass  # Empty for now

# Create an instance (object)
ship = Spacecraft()
print(type(ship))  # <class '__main__.Spacecraft'>

# The class is the blueprint
# 'ship' is an object/instance of that class`
}
```

### Section 3: The Constructor

```typescript
{
  title: "3. The Constructor: __init__",
  content: `The __init__ method is called automatically when creating an object. It initializes the object's attributes.

The first parameter is always 'self', which refers to the object being created. Other parameters receive values passed during creation.`,
  codeExample: `class Spacecraft:
    def __init__(self, name, fuel_capacity):
        # 'self' refers to the object being created
        self.name = name
        self.fuel = fuel_capacity
        self.crew = 0  # Default value

# Create objects with different data
apollo = Spacecraft("Apollo 11", 100)
discovery = Spacecraft("Discovery", 150)

print(apollo.name)      # "Apollo 11"
print(discovery.fuel)   # 150
print(apollo.crew)      # 0`
}
```

### Section 4: Instance Attributes

```typescript
{
  title: "4. Instance Attributes",
  content: `Attributes are variables that belong to an object. Each object has its own copy of attributes.

Attributes are accessed and modified using dot notation: object.attribute`,
  codeExample: `class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100
        self.position = [0, 0, 0]

ship = Spacecraft("Enterprise")

# Access attributes
print(ship.name)      # "Enterprise"
print(ship.fuel)      # 100

# Modify attributes
ship.fuel = 80
ship.position = [100, 50, 25]
print(ship.fuel)      # 80

# Each object has separate attributes
ship2 = Spacecraft("Voyager")
print(ship2.fuel)     # Still 100 (different object)`
}
```

### Section 5: Methods

```typescript
{
  title: "5. Methods: Class Functions",
  content: `Methods are functions defined inside a class. They always have 'self' as their first parameter, which lets them access the object's attributes.`,
  codeExample: `class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    
    def status(self):
        """Method with no extra parameters"""
        print(f"{self.name}: {self.fuel}% fuel")
    
    def refuel(self, amount):
        """Method with parameter"""
        self.fuel += amount
        if self.fuel > 100:
            self.fuel = 100
        print(f"{self.name} refueled to {self.fuel}%")

# Using methods
ship = Spacecraft("Apollo", 60)
ship.status()        # "Apollo: 60% fuel"
ship.refuel(30)      # "Apollo refueled to 90%"
ship.status()        # "Apollo: 90% fuel"`
}
```

### Section 6: Dot Notation

```typescript
{
  title: "6. Using Dot Notation",
  content: `Dot notation connects an object to its attributes and methods:
- object.attribute - access or modify data
- object.method() - call a function

Think of the dot as saying "belonging to" or "of this object".`,
  codeExample: `class Astronaut:
    def __init__(self, name, role):
        self.name = name
        self.role = role
        self.missions = 0
    
    def complete_mission(self):
        self.missions += 1
        return f"{self.name} completed mission #{self.missions}"

# Create and use object
neil = Astronaut("Neil Armstrong", "Commander")

# Dot notation for attributes
print(neil.name)         # "Neil Armstrong"
print(neil.missions)     # 0

# Dot notation for methods
result = neil.complete_mission()
print(result)            # "Neil Armstrong completed mission #1"
print(neil.missions)     # 1`
}
```

### Section 7: Multiple Objects

```typescript
{
  title: "7. Creating Multiple Objects",
  content: `One class can create many objects. Each object is independent with its own attribute values.

This is the power of OOP - define the blueprint once, create as many instances as needed!`,
  codeExample: `class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    
    def launch(self):
        if self.fuel >= 50:
            self.fuel -= 50
            return f"{self.name} launched! Fuel: {self.fuel}%"
        return f"{self.name} insufficient fuel!"

# Create fleet of spacecraft
apollo = Spacecraft("Apollo", 100)
voyager = Spacecraft("Voyager", 80)
discovery = Spacecraft("Discovery", 40)

# Each operates independently
print(apollo.launch())      # Launched, fuel: 50%
print(voyager.launch())     # Launched, fuel: 30%
print(discovery.launch())   # Insufficient fuel!

# Changes to one don't affect others
print(apollo.fuel)    # 50
print(voyager.fuel)   # 30`
}
```

---

## Challenges

### Challenge 1: Spacecraft Class

```typescript
{
  id: 1,
  title: "Basic Spacecraft Class",
  description: `Create your first class: Spacecraft

The class should have:
1. An __init__ that takes 'name' and 'fuel' parameters
2. Store these as self.name and self.fuel
3. A method status() that prints: "[name] - Fuel: [fuel]%"

Create two spacecraft:
- apollo with name "Apollo 11" and fuel 95
- voyager with name "Voyager 1" and fuel 100

Call status() on both.`,
  starterCode: `# MISSION: First Spacecraft Class
# Define the Spacecraft class

class Spacecraft:
    # Define __init__ with name and fuel parameters
    
    # Define status() method
    pass

# === Mission Control Test ===
apollo = Spacecraft("Apollo 11", 95)
voyager = Spacecraft("Voyager 1", 100)

apollo.status()
voyager.status()`,
  hint: `def __init__(self, name, fuel): then self.name = name, self.fuel = fuel. For status: def status(self): print(f"...").`,
  conceptTags: ["class", "__init__", "attributes", "methods"]
}
```

### Challenge 2: Constructor Practice

```typescript
{
  id: 2,
  title: "Astronaut Constructor",
  description: `Create an Astronaut class with a complete constructor.

The __init__ should take:
- name (required)
- role (required)
- years_experience (required)

And set default values for:
- missions_completed = 0
- is_active = True

Create three astronauts with different data and print their details.`,
  starterCode: `# MISSION: Astronaut Constructor
# Create a well-constructed class

class Astronaut:
    def __init__(self, name, role, years_experience):
        # Set all attributes
        pass
    
    def info(self):
        # Print all astronaut details
        pass

# === Mission Control Test ===
neil = Astronaut("Neil Armstrong", "Commander", 10)
buzz = Astronaut("Buzz Aldrin", "Pilot", 8)
michael = Astronaut("Michael Collins", "Module Pilot", 7)

neil.info()
buzz.info()
michael.info()`,
  hint: `In __init__: self.name = name, self.role = role, self.years_experience = years_experience, self.missions_completed = 0, self.is_active = True.`,
  conceptTags: ["__init__", "multiple attributes", "default values"]
}
```

### Challenge 3: Methods with Parameters

```typescript
{
  id: 3,
  title: "Spacecraft Operations",
  description: `Add methods with parameters to the Spacecraft class.

Create Spacecraft with:
- Attributes: name, fuel (starts at 100), position (starts at 0)
- Methods:
  - launch() - if fuel >= 20, reduce fuel by 20, return "Launched!"
  - travel(distance) - if fuel >= distance/10, reduce fuel, add to position
  - refuel(amount) - add amount to fuel, cap at 100
  - status() - print name, fuel, position

Test all methods!`,
  starterCode: `# MISSION: Spacecraft Methods
# Add operational methods

class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100
        self.position = 0
    
    def launch(self):
        # Check fuel, reduce if launched
        pass
    
    def travel(self, distance):
        # Calculate fuel needed (distance / 10)
        # Travel if enough fuel
        pass
    
    def refuel(self, amount):
        # Add fuel, max 100
        pass
    
    def status(self):
        # Print all info
        pass

# === Mission Control Test ===
ship = Spacecraft("Enterprise")
ship.status()
print(ship.launch())
ship.travel(200)
ship.status()
ship.refuel(50)
ship.status()`,
  hint: `For travel: fuel_needed = distance / 10. Check if self.fuel >= fuel_needed before traveling. Update both fuel and position.`,
  conceptTags: ["methods", "parameters", "conditional logic"]
}
```

### Challenge 4: Return Values from Methods

```typescript
{
  id: 4,
  title: "Fuel Calculator",
  description: `Create a FuelTank class that returns useful information.

Attributes:
- capacity (set in __init__)
- current_level (starts at 0)

Methods:
- fill(amount) - add fuel, return amount actually added (cap at capacity)
- use(amount) - remove fuel, return amount actually used (can't go negative)
- percentage() - return current level as % of capacity
- is_empty() - return True if current_level is 0
- is_full() - return True if current_level equals capacity

All methods should RETURN values, not just print.`,
  starterCode: `# MISSION: Fuel Tank with Returns
# Methods that return useful data

class FuelTank:
    def __init__(self, capacity):
        self.capacity = capacity
        self.current_level = 0
    
    def fill(self, amount):
        # Add fuel, return amount actually added
        pass
    
    def use(self, amount):
        # Use fuel, return amount actually used
        pass
    
    def percentage(self):
        # Return percentage full
        pass
    
    def is_empty(self):
        # Return True/False
        pass
    
    def is_full(self):
        # Return True/False
        pass

# === Mission Control Test ===
tank = FuelTank(100)
print(f"Empty? {tank.is_empty()}")      # True
print(f"Filled: {tank.fill(80)}")       # 80
print(f"Percentage: {tank.percentage()}%")  # 80.0
print(f"Used: {tank.use(30)}")          # 30
print(f"Full? {tank.is_full()}")        # False`,
  hint: `For fill: space = self.capacity - self.current_level, added = min(amount, space), then add and return added. Similar logic for use.`,
  conceptTags: ["return values", "calculations", "boolean returns"]
}
```

### Challenge 5: Objects with Relationships

```typescript
{
  id: 5,
  title: "Mission with Crew",
  description: `Create two classes that work together.

Astronaut class:
- name, role attributes
- info() method returns formatted string

Mission class:
- name, destination attributes
- crew = [] (empty list)
- add_crew(astronaut) - add to crew list
- crew_count() - return number of crew
- launch_report() - print mission details including all crew

This demonstrates objects containing other objects!`,
  starterCode: `# MISSION: Related Classes
# Objects containing objects

class Astronaut:
    def __init__(self, name, role):
        pass
    
    def info(self):
        # Return "Name (Role)"
        pass

class Mission:
    def __init__(self, name, destination):
        self.name = name
        self.destination = destination
        self.crew = []
    
    def add_crew(self, astronaut):
        # Add astronaut to crew list
        pass
    
    def crew_count(self):
        pass
    
    def launch_report(self):
        # Print full mission report
        pass

# === Mission Control Test ===
neil = Astronaut("Neil Armstrong", "Commander")
buzz = Astronaut("Buzz Aldrin", "Pilot")
michael = Astronaut("Michael Collins", "Module Pilot")

apollo11 = Mission("Apollo 11", "Moon")
apollo11.add_crew(neil)
apollo11.add_crew(buzz)
apollo11.add_crew(michael)
apollo11.launch_report()`,
  hint: `add_crew: self.crew.append(astronaut). In launch_report, loop through self.crew and call each astronaut's info() method.`,
  conceptTags: ["composition", "lists of objects", "object interaction"]
}
```

### Challenge 6: Object Interaction

```typescript
{
  id: 6,
  title: "Docking Procedure",
  description: `Create spacecraft that can interact with each other.

Spacecraft class:
- name, fuel, docked_with (None initially)
- dock_with(other_ship) - set both ships' docked_with to each other
- undock() - set both docked_with back to None
- transfer_fuel(amount, to_ship) - move fuel between ships
- status() - print name, fuel, and docked status

Demonstrate docking two ships and transferring fuel.`,
  starterCode: `# MISSION: Spacecraft Docking
# Objects interacting with each other

class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
        self.docked_with = None
    
    def dock_with(self, other_ship):
        # Connect both ships
        pass
    
    def undock(self):
        # Disconnect both ships
        pass
    
    def transfer_fuel(self, amount, to_ship):
        # Move fuel to another ship
        pass
    
    def status(self):
        docked = self.docked_with.name if self.docked_with else "None"
        print(f"{self.name}: Fuel={self.fuel}, Docked={docked}")

# === Mission Control Test ===
station = Spacecraft("ISS", 500)
shuttle = Spacecraft("Endeavour", 100)

station.status()
shuttle.status()

shuttle.dock_with(station)
station.status()
shuttle.status()

station.transfer_fuel(200, shuttle)
station.status()
shuttle.status()`,
  hint: `dock_with: self.docked_with = other_ship AND other_ship.docked_with = self. transfer_fuel: self.fuel -= amount, to_ship.fuel += amount (add checks!).`,
  conceptTags: ["object interaction", "mutual references", "fuel transfer"]
}
```

### Challenge 7: Fleet Management

```typescript
{
  id: 7,
  title: "Complete Fleet System",
  description: `Create a full fleet management system.

Fleet class:
- name attribute
- ships = [] (list of Spacecraft objects)
- add_ship(ship) - add to fleet
- remove_ship(ship_name) - remove by name
- total_fuel() - sum of all ships' fuel
- fleet_status() - print all ships
- launch_all() - launch all ships with fuel > 50

Spacecraft class (provided):
- name, fuel attributes
- launch() method

Create a fleet with 4 ships and demonstrate all fleet operations.`,
  starterCode: `# MISSION: Fleet Management
# Managing multiple objects

class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
        self.launched = False
    
    def launch(self):
        if self.fuel >= 50:
            self.fuel -= 50
            self.launched = True
            return f"{self.name} launched!"
        return f"{self.name} insufficient fuel"
    
    def status(self):
        state = "Launched" if self.launched else "Docked"
        return f"{self.name}: {self.fuel}% fuel, {state}"

class Fleet:
    def __init__(self, name):
        self.name = name
        self.ships = []
    
    def add_ship(self, ship):
        pass
    
    def remove_ship(self, ship_name):
        pass
    
    def total_fuel(self):
        pass
    
    def fleet_status(self):
        pass
    
    def launch_all(self):
        pass

# === Mission Control Test ===
fleet = Fleet("NASA Fleet")
fleet.add_ship(Spacecraft("Apollo", 100))
fleet.add_ship(Spacecraft("Voyager", 80))
fleet.add_ship(Spacecraft("Discovery", 40))
fleet.add_ship(Spacecraft("Enterprise", 75))

fleet.fleet_status()
print(f"Total fuel: {fleet.total_fuel()}")
fleet.launch_all()
fleet.fleet_status()`,
  hint: `add_ship: self.ships.append(ship). total_fuel: sum with loop or sum(ship.fuel for ship in self.ships). launch_all: loop through ships, check fuel, call launch().`,
  conceptTags: ["synthesis", "fleet management", "list of objects", "aggregate operations"]
}
```

---

## Implementation Notes

### Files to Modify

1. **`data/level12_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 12 tasks:
```typescript
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
}
```

### Key IB Points (B3.1.1, B3.1.2, B3.1.4)
- Classes as blueprints
- Objects as instances
- Attributes (instance variables)
- Methods (class functions)
- self parameter
- Instantiation

---

## Expected Outputs

| Challenge | Key Output |
|-----------|------------|
| 1 | Two spacecraft status prints |
| 2 | Three astronaut info prints |
| 3 | Launch, travel, refuel operations |
| 4 | Return values from tank operations |
| 5 | Mission with 3 crew members |
| 6 | Docked ships with fuel transfer |
| 7 | Fleet operations and launch |

---

*Level 12 Plan - Version 1.0*

