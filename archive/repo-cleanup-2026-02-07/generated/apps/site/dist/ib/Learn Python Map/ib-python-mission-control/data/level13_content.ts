/**
 * Level 13: Encapsulation & Scope
 * IB Syllabus Reference: B3.1.3, B3.1.5
 *
 * Learning Objectives:
 * - Use static (class) variables vs instance variables
 * - Apply private attribute convention with underscores
 * - Build getters and setters with validation
 * - Protect object state through encapsulation
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Controlling access to data
// ============================================================================

export const level13BaseContent: LessonSection[] = [
  {
    title: "1. The Problem with Open Access",
    content: `In Level 12, any code could directly modify object attributes. This can cause problems:

- Invalid values (negative fuel, crew of -5)
- Breaking object invariants (speed faster than light?)
- Hard to debug (who changed this value?)

Encapsulation means HIDING internal data and providing controlled access through methods.`,
    codeExample: `# Problem: Direct access allows invalid state
class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100

ship = Spacecraft("Apollo")
ship.fuel = -500      # Invalid! But Python allows it
ship.fuel = "banana"  # Wrong type! But allowed

# Solution: Control access through methods
# (Coming up next!)`
  },
  {
    title: "2. Static (Class) Variables",
    content: `Static variables belong to the CLASS, not individual objects. All objects share the same value.

- Instance variable: self.name = value (each object has its own)
- Static variable: defined inside class but outside __init__`,
    codeExample: `class Spacecraft:
    # Static variable - shared by ALL spacecraft
    total_count = 0
    speed_of_light = 299792  # km/s - constant
    
    def __init__(self, name):
        # Instance variable - each object has its own
        self.name = name
        Spacecraft.total_count += 1  # Increment class variable

# Create objects
apollo = Spacecraft("Apollo")
voyager = Spacecraft("Voyager")
discovery = Spacecraft("Discovery")

# Static variable is shared
print(Spacecraft.total_count)  # 3
print(apollo.total_count)      # 3 (same value)
print(voyager.total_count)     # 3 (same value)

# Instance variables are separate
print(apollo.name)    # "Apollo"
print(voyager.name)   # "Voyager"`
  },
  {
    title: "3. Marking Attributes as Private",
    content: `In Python, we use an underscore prefix (_name) to indicate an attribute should be treated as private.

This is a CONVENTION - Python doesn't enforce it, but good programmers respect it. It means "don't access this directly from outside the class."`,
    codeExample: `class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name          # Public - OK to access
        self._fuel = fuel         # Private - use methods instead
        self._crew_count = 0      # Private
    
    def get_fuel(self):
        return self._fuel
    
    def set_fuel(self, value):
        if 0 <= value <= 100:
            self._fuel = value
        else:
            print("Invalid fuel level!")

ship = Spacecraft("Apollo", 80)

# Good practice: Use methods
print(ship.get_fuel())  # 80
ship.set_fuel(90)       # Works

# Bad practice (but Python allows it):
# print(ship._fuel)     # Works but violates convention`
  },
  {
    title: "4. Getters: Controlled Reading",
    content: `A getter method returns the value of a private attribute. It can also:
- Format the value before returning
- Calculate derived values
- Log access for debugging`,
    codeExample: `class Astronaut:
    def __init__(self, name, age):
        self._name = name
        self._age = age
        self._missions = []
    
    # Simple getter
    def get_name(self):
        return self._name
    
    # Getter with formatting
    def get_age(self):
        return f"{self._age} years old"
    
    # Getter with calculation
    def get_mission_count(self):
        return len(self._missions)
    
    # Getter that returns a copy (protects list)
    def get_missions(self):
        return self._missions.copy()

neil = Astronaut("Neil Armstrong", 38)
print(neil.get_name())          # "Neil Armstrong"
print(neil.get_age())           # "38 years old"
print(neil.get_mission_count()) # 0`
  },
  {
    title: "5. Setters: Controlled Writing",
    content: `A setter method changes a private attribute BUT can include validation to prevent invalid values.

This is where encapsulation really pays off - you can enforce rules!`,
    codeExample: `class Spacecraft:
    def __init__(self, name):
        self._name = name
        self._fuel = 100
        self._speed = 0
    
    # Setter with range validation
    def set_fuel(self, value):
        if value < 0:
            print("Error: Fuel cannot be negative")
        elif value > 100:
            print("Error: Fuel cannot exceed 100%")
        else:
            self._fuel = value
            print(f"Fuel set to {value}%")
    
    # Setter with maximum limit
    def set_speed(self, value):
        MAX_SPEED = 50000  # km/s
        if value < 0:
            self._speed = 0
        elif value > MAX_SPEED:
            self._speed = MAX_SPEED
            print(f"Speed capped at {MAX_SPEED}")
        else:
            self._speed = value

ship = Spacecraft("Apollo")
ship.set_fuel(80)      # "Fuel set to 80%"
ship.set_fuel(-10)     # "Error: Fuel cannot be negative"
ship.set_fuel(150)     # "Error: Fuel cannot exceed 100%"
ship.set_speed(100000) # "Speed capped at 50000"`
  },
  {
    title: "6. Complete Encapsulated Class",
    content: `Here's a fully encapsulated class with private attributes, getters, setters, and validation. The internal state is protected!`,
    codeExample: `class FuelTank:
    # Static variable
    MAX_CAPACITY = 1000
    
    def __init__(self, capacity):
        self._capacity = min(capacity, FuelTank.MAX_CAPACITY)
        self._current = 0
        self._is_locked = False
    
    # Getters
    def get_level(self):
        return self._current
    
    def get_percentage(self):
        return (self._current / self._capacity) * 100
    
    def is_empty(self):
        return self._current == 0
    
    # Setters with validation
    def add_fuel(self, amount):
        if self._is_locked:
            return "Tank is locked!"
        if amount < 0:
            return "Cannot add negative fuel"
        
        space = self._capacity - self._current
        added = min(amount, space)
        self._current += added
        return f"Added {added} units"
    
    def lock(self):
        self._is_locked = True
    
    def unlock(self):
        self._is_locked = False

tank = FuelTank(500)
print(tank.add_fuel(200))  # "Added 200 units"
print(tank.get_percentage())  # 40.0
tank.lock()
print(tank.add_fuel(100))  # "Tank is locked!"`
  }
];

// ============================================================================
// CHALLENGES - 5 encapsulation missions
// ============================================================================

export const level13Challenges: Challenge[] = [
  {
    id: 1,
    title: "Spacecraft Counter",
    description: `Use a static variable to count all spacecraft created.

Create Spacecraft class with:
- Static variable: total_created = 0
- __init__ takes name, increments total_created
- Static method get_total() returns total_created

Create 5 spacecraft and verify the count is correct.`,
    starterCode: `# MISSION: Spacecraft Counter
# Track total spacecraft using static variable

class Spacecraft:
    # Static variable - shared by all
    total_created = 0
    
    def __init__(self, name):
        # Increment the class variable
        pass
    
    @staticmethod
    def get_total():
        # Return the total count
        pass

# === Mission Control Test ===
apollo = Spacecraft("Apollo")
voyager = Spacecraft("Voyager")
discovery = Spacecraft("Discovery")
enterprise = Spacecraft("Enterprise")
endeavour = Spacecraft("Endeavour")

print(f"Total spacecraft created: {Spacecraft.get_total()}")  # 5`,
    hint: `In __init__: Spacecraft.total_created += 1. In get_total: return Spacecraft.total_created.`,
    conceptTags: ["static variable", "class variable", "counter"]
  },
  {
    id: 2,
    title: "Secure Crew Record",
    description: `Create a crew record with private attributes.

CrewMember class:
- Private attributes: _name, _clearance_level, _password
- __init__ takes name, clearance_level, password
- All attributes should be private (underscore prefix)

Add getter methods:
- get_name() - returns name
- get_clearance() - returns clearance level
- verify_password(attempt) - returns True if correct, False otherwise

NO direct access to _password should reveal the password!`,
    starterCode: `# MISSION: Secure Crew Records
# Protect sensitive data with private attributes

class CrewMember:
    def __init__(self, name, clearance_level, password):
        # Store as private attributes
        pass
    
    def get_name(self):
        pass
    
    def get_clearance(self):
        pass
    
    def verify_password(self, attempt):
        # Check password without exposing it
        pass

# === Mission Control Test ===
neil = CrewMember("Neil Armstrong", 5, "moonwalk1969")

print(neil.get_name())           # "Neil Armstrong"
print(neil.get_clearance())      # 5
print(neil.verify_password("wrong"))      # False
print(neil.verify_password("moonwalk1969"))  # True`,
    hint: `Store as self._name, self._clearance_level, self._password. verify_password: return self._password == attempt.`,
    conceptTags: ["private attributes", "getters", "password security"]
  },
  {
    id: 3,
    title: "Safe Fuel System",
    description: `Create a fuel system with validated setters.

FuelSystem class:
- Private: _fuel_level (starts at 0)
- Private: _max_capacity (set in __init__)

Getter: get_fuel() - returns current level

Setters with validation:
- fill(amount) - add fuel, but cannot exceed max_capacity
- use(amount) - use fuel, but cannot go below 0
- Each should print a message and return True/False for success`,
    starterCode: `# MISSION: Safe Fuel System
# Setters with validation

class FuelSystem:
    def __init__(self, max_capacity):
        self._max_capacity = max_capacity
        self._fuel_level = 0
    
    def get_fuel(self):
        pass
    
    def fill(self, amount):
        # Validate: can't exceed capacity
        pass
    
    def use(self, amount):
        # Validate: can't go negative
        pass

# === Mission Control Test ===
fuel = FuelSystem(100)
print(fuel.fill(80))   # True, "Fuel added: 80"
print(fuel.get_fuel()) # 80
print(fuel.fill(50))   # True but capped, "Fuel added: 20 (max reached)"
print(fuel.use(30))    # True, "Fuel used: 30"
print(fuel.use(100))   # False, "Not enough fuel"`,
    hint: `fill: space_available = self._max_capacity - self._fuel_level, then add min(amount, space_available). use: check if self._fuel_level >= amount first.`,
    conceptTags: ["setters", "validation", "encapsulation"]
  },
  {
    id: 4,
    title: "Secure Navigation System",
    description: `Build a fully encapsulated navigation system.

NavigationSystem class:
Private attributes:
- _position = [0, 0, 0] (x, y, z coordinates)
- _destination = None
- _is_locked = False

Getters:
- get_position() - return copy of position (not the actual list!)
- get_destination() - return destination or "Not set"

Setters with validation:
- set_destination(coords) - only if not locked, coords must be list of 3 numbers
- move(x, y, z) - update position, only if not locked
- lock() - prevent changes
- unlock() - allow changes`,
    starterCode: `# MISSION: Secure Navigation
# Full encapsulation with multiple controls

class NavigationSystem:
    def __init__(self):
        self._position = [0, 0, 0]
        self._destination = None
        self._is_locked = False
    
    def get_position(self):
        # Return COPY of position
        pass
    
    def get_destination(self):
        pass
    
    def set_destination(self, coords):
        # Validate: not locked, valid coords
        pass
    
    def move(self, x, y, z):
        # Update position if not locked
        pass
    
    def lock(self):
        pass
    
    def unlock(self):
        pass

# === Mission Control Test ===
nav = NavigationSystem()
nav.set_destination([100, 200, 50])
print(nav.get_destination())  # [100, 200, 50]
nav.move(10, 20, 5)
print(nav.get_position())     # [10, 20, 5]
nav.lock()
nav.move(100, 100, 100)       # Should fail - locked
print(nav.get_position())     # Still [10, 20, 5]`,
    hint: `get_position: return self._position.copy() to protect the list. In setters, check if self._is_locked first.`,
    conceptTags: ["full encapsulation", "list copy", "lock mechanism"]
  },
  {
    id: 5,
    title: "Secure Spacecraft",
    description: `Create a complete secure spacecraft combining all encapsulation concepts.

SecureSpacecraft class:
Static: total_launched = 0

Private instance:
- _name, _fuel, _crew_count, _is_launched

Getters:
- get_name(), get_fuel(), get_crew(), is_launched()

Setters with validation:
- refuel(amount) - only if not launched, 0-100 range
- board_crew(count) - only if not launched, max 10

Actions:
- launch() - only if fuel >= 50 and crew >= 1, increment total_launched
- status() - print all info

Demonstrate full functionality!`,
    starterCode: `# MISSION: Complete Secure Spacecraft
# All encapsulation concepts combined

class SecureSpacecraft:
    total_launched = 0
    
    def __init__(self, name, initial_fuel):
        self._name = name
        self._fuel = min(100, max(0, initial_fuel))  # Clamp to 0-100
        self._crew_count = 0
        self._is_launched = False
    
    # Getters
    def get_name(self):
        pass
    
    def get_fuel(self):
        pass
    
    def get_crew(self):
        pass
    
    def is_launched(self):
        pass
    
    # Validated setters
    def refuel(self, amount):
        pass
    
    def board_crew(self, count):
        pass
    
    # Actions
    def launch(self):
        pass
    
    def status(self):
        state = "In Space" if self._is_launched else "Docked"
        print(f"{self._name}: {state}, Fuel: {self._fuel}%, Crew: {self._crew_count}")

# === Mission Control Test ===
ship = SecureSpacecraft("Enterprise", 80)
ship.status()
ship.board_crew(5)
ship.status()
ship.launch()
ship.status()
ship.refuel(50)  # Should fail - already launched
print(f"Total launched: {SecureSpacecraft.total_launched}")`,
    hint: `In launch: check fuel >= 50 AND crew >= 1 AND not already launched. Set _is_launched = True and increment SecureSpacecraft.total_launched.`,
    conceptTags: ["synthesis", "full encapsulation", "static + instance", "validation"]
  }
];
