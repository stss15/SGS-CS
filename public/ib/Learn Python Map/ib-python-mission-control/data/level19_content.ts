/**
 * Level 19: Design Patterns (HL)
 * IB Syllabus Reference: B3.2.5
 *
 * Learning Objectives:
 * - Understand the purpose of design patterns
 * - Explain and recognize the Singleton pattern
 * - Explain and recognize the Factory pattern
 * - Explain and recognize the Observer pattern
 * - Know when to apply each pattern
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Reusable solutions to common problems
// ============================================================================

export const level19BaseContent: LessonSection[] = [
  {
    title: "1. What are Design Patterns?",
    content: `Design patterns are proven, reusable solutions to common software design problems. They're like blueprints that can be adapted to solve recurring challenges in your code.

Think of them as "best practices" that experienced programmers have discovered over time. The IB focuses on three key patterns:
- Singleton: When you need exactly ONE instance
- Factory: When you need to create objects without specifying exact classes
- Observer: When objects need to react to changes in other objects

These patterns help write code that is more maintainable, flexible, and understandable.`,
    codeExample: `# Without patterns - tightly coupled, hard to maintain
class MissionControl:
    def __init__(self):
        self.rocket = Rocket()      # Hardcoded!
        self.satellite = Satellite() # Hardcoded!
        
# With patterns - flexible, loosely coupled
class MissionControl:
    def __init__(self, spacecraft_factory):
        self.craft = spacecraft_factory.create()  # Flexible!`
  },
  {
    title: "2. Singleton Pattern",
    content: `The Singleton pattern ensures a class has only ONE instance and provides global access to it.

Use cases in space missions:
- Mission Control Center (only one exists)
- Central Command Database (single source of truth)
- Configuration Manager (one set of settings)
- Logging System (single log file)

Key features:
1. Private/protected constructor
2. Static method to get the instance
3. Instance stored as class variable`,
    codeExample: `class MissionControl:
    _instance = None  # Class variable stores the single instance
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.mission_count = 0
        return cls._instance
    
    def launch_mission(self):
        self.mission_count += 1
        return f"Mission #{self.mission_count} launched!"

# Testing Singleton
control1 = MissionControl()
control2 = MissionControl()

print(control1 is control2)  # True - same instance!

control1.launch_mission()
print(control2.mission_count)  # 1 - shared state!`,
    tableData: {
      headers: ["Aspect", "Description"],
      rows: [
        ["Purpose", "Ensure only ONE instance of a class exists"],
        ["Access", "Global point of access via class method"],
        ["State", "All code shares the same instance state"],
        ["Use When", "You need exactly one object (config, logger, etc.)"]
      ]
    }
  },
  {
    title: "3. Factory Pattern",
    content: `The Factory pattern provides a way to create objects without specifying the exact class. A factory method decides which class to instantiate based on input.

Use cases:
- Creating different spacecraft types based on mission requirements
- Building UI components based on platform
- Generating enemies in games based on level

Benefits:
- Decouples object creation from usage
- Easy to add new types without changing client code
- Centralizes creation logic`,
    codeExample: `class Spacecraft:
    def launch(self):
        pass

class Rocket(Spacecraft):
    def launch(self):
        return "Rocket blasting off!"

class Satellite(Spacecraft):
    def launch(self):
        return "Satellite deploying to orbit!"

class Probe(Spacecraft):
    def launch(self):
        return "Probe beginning deep space journey!"

# The Factory
class SpacecraftFactory:
    @staticmethod
    def create(craft_type):
        if craft_type == "rocket":
            return Rocket()
        elif craft_type == "satellite":
            return Satellite()
        elif craft_type == "probe":
            return Probe()
        else:
            raise ValueError(f"Unknown craft type: {craft_type}")

# Usage - client doesn't need to know about specific classes
factory = SpacecraftFactory()
mission1 = factory.create("rocket")
mission2 = factory.create("satellite")

print(mission1.launch())  # "Rocket blasting off!"
print(mission2.launch())  # "Satellite deploying to orbit!"`,
    tableData: {
      headers: ["Aspect", "Description"],
      rows: [
        ["Purpose", "Create objects without specifying exact class"],
        ["Benefit", "Easy to add new types without changing client"],
        ["Structure", "Factory class with create() method"],
        ["Use When", "Object type determined at runtime"]
      ]
    }
  },
  {
    title: "4. Observer Pattern",
    content: `The Observer pattern defines a one-to-many dependency between objects. When one object (subject) changes state, all its dependents (observers) are notified automatically.

Use cases:
- Mission status updates to multiple displays
- Sensor readings triggering multiple systems
- Event-driven programming
- GUI updates when data changes

Key components:
1. Subject: The object being watched (has state)
2. Observer: Objects that react to changes
3. Subscribe/Unsubscribe: Methods to add/remove observers
4. Notify: Method to alert all observers`,
    codeExample: `class MissionSubject:
    def __init__(self):
        self._observers = []
        self._status = "Preparation"
    
    def attach(self, observer):
        self._observers.append(observer)
    
    def detach(self, observer):
        self._observers.remove(observer)
    
    def notify(self):
        for observer in self._observers:
            observer.update(self._status)
    
    def set_status(self, status):
        self._status = status
        self.notify()  # Alert all observers!

class DisplayObserver:
    def __init__(self, name):
        self.name = name
    
    def update(self, status):
        print(f"{self.name} received: Mission is now {status}")

# Usage
mission = MissionSubject()
display1 = DisplayObserver("Main Screen")
display2 = DisplayObserver("Control Room")
display3 = DisplayObserver("Press Center")

mission.attach(display1)
mission.attach(display2)
mission.attach(display3)

mission.set_status("Launching")
# Output:
# Main Screen received: Mission is now Launching
# Control Room received: Mission is now Launching
# Press Center received: Mission is now Launching`,
    tableData: {
      headers: ["Aspect", "Description"],
      rows: [
        ["Purpose", "Notify multiple objects when state changes"],
        ["Subject", "The object being observed (has attach/detach/notify)"],
        ["Observer", "Objects that respond to updates (has update method)"],
        ["Use When", "Many objects need to react to one object's changes"]
      ]
    }
  },
  {
    title: "5. Choosing the Right Pattern",
    content: `Each pattern solves a specific problem:

SINGLETON - Use when:
- You need exactly one instance of a class
- Global access point is required
- Shared state must be controlled

FACTORY - Use when:
- The exact class to create isn't known until runtime
- You want to delegate creation to subclasses
- Adding new types should be easy

OBSERVER - Use when:
- One object's change should trigger updates in others
- You don't know how many objects need updates
- Loose coupling between objects is important`,
    tableData: {
      headers: ["Pattern", "Problem", "Example"],
      rows: [
        ["Singleton", "Need ONE shared instance", "Database connection, Logger"],
        ["Factory", "Create objects dynamically", "Game enemy spawner, UI builder"],
        ["Observer", "React to state changes", "Event handlers, Data binding"]
      ]
    }
  }
];

// ============================================================================
// CHALLENGES - 4 design pattern missions
// ============================================================================

export const level19Challenges: Challenge[] = [
  {
    id: 1,
    title: "Mission Logger Singleton",
    description: `Create a Singleton MissionLogger class that ensures only one logger instance exists throughout the entire mission.

Requirements:
1. Use class variable _instance to store the single instance
2. Override __new__ to implement Singleton behavior
3. Include a log_entries list to store messages
4. Add log(message) method that appends to the list
5. Add get_logs() method that returns all entries

Test that two variables point to the same instance.`,
    starterCode: `# MISSION: Singleton Logger
class MissionLogger:
    _instance = None
    
    def __new__(cls):
        # Implement Singleton behavior
        pass
    
    def log(self, message):
        # Add message to log_entries
        pass
    
    def get_logs(self):
        # Return all log entries
        pass

# === Mission Control Test ===
logger1 = MissionLogger()
logger2 = MissionLogger()

logger1.log("System initialized")
logger2.log("Launch sequence started")

print(f"Same instance: {logger1 is logger2}")
print(f"All logs: {logger1.get_logs()}")`,
    hint: `In __new__, check if _instance is None. If so, create it with super().__new__(cls) and initialize log_entries = []. Always return cls._instance.`,
    conceptTags: ["singleton", "design-pattern", "__new__"]
  },
  {
    id: 2,
    title: "Spacecraft Factory",
    description: `Build a Factory that creates different spacecraft based on mission type.

Create these classes:
1. Spacecraft base class with launch() method
2. Rocket (returns "Rocket engines ignited!")
3. Shuttle (returns "Shuttle systems online!")
4. Probe (returns "Probe transmitters activated!")

Create SpacecraftFactory with:
- create(craft_type) static method
- Returns appropriate spacecraft based on type string`,
    starterCode: `# MISSION: Spacecraft Factory

class Spacecraft:
    def launch(self):
        return "Generic launch"

class Rocket(Spacecraft):
    # Override launch
    pass

class Shuttle(Spacecraft):
    # Override launch
    pass

class Probe(Spacecraft):
    # Override launch
    pass

class SpacecraftFactory:
    @staticmethod
    def create(craft_type):
        # Return appropriate spacecraft
        pass

# === Mission Control Test ===
factory = SpacecraftFactory()
r = factory.create("rocket")
s = factory.create("shuttle")
p = factory.create("probe")

print(r.launch())
print(s.launch())
print(p.launch())`,
    hint: `In the factory's create method, use if-elif to check craft_type and return the appropriate class instance (Rocket(), Shuttle(), or Probe()).`,
    conceptTags: ["factory", "design-pattern", "polymorphism"]
  },
  {
    id: 3,
    title: "Mission Alert System",
    description: `Implement an Observer pattern for a mission alert system.

Create MissionControl (Subject) with:
- _observers list
- _alert_level (starts as "GREEN")
- attach(observer) - adds to list
- detach(observer) - removes from list
- notify() - calls update() on all observers
- set_alert(level) - sets level and notifies

Create AlertDisplay (Observer) with:
- name attribute
- update(level) - prints "{name}: Alert level is {level}"

Test with multiple displays reacting to alert changes.`,
    starterCode: `# MISSION: Observer Alert System

class MissionControl:
    def __init__(self):
        self._observers = []
        self._alert_level = "GREEN"
    
    def attach(self, observer):
        pass
    
    def detach(self, observer):
        pass
    
    def notify(self):
        pass
    
    def set_alert(self, level):
        pass

class AlertDisplay:
    def __init__(self, name):
        self.name = name
    
    def update(self, level):
        pass

# === Mission Control Test ===
control = MissionControl()
main_display = AlertDisplay("Main Screen")
backup_display = AlertDisplay("Backup Screen")

control.attach(main_display)
control.attach(backup_display)

control.set_alert("YELLOW")
control.set_alert("RED")`,
    hint: `In notify(), loop through _observers and call observer.update(self._alert_level). In set_alert(), update _alert_level then call notify().`,
    conceptTags: ["observer", "design-pattern", "event-driven"]
  },
  {
    id: 4,
    title: "Pattern Recognition",
    description: `Given these three scenarios, identify which design pattern fits best and explain why in a comment:

Scenario A: A game needs to spawn different enemy types based on the current level difficulty.

Scenario B: A space station has one life support system that all modules must share and monitor.

Scenario C: When a spacecraft's fuel drops below 20%, multiple systems (navigation, communication, engine) need to switch to power-saving mode.

For each scenario, write a brief class structure (just the class and method signatures) that demonstrates the appropriate pattern.`,
    starterCode: `# MISSION: Pattern Recognition

# Scenario A: Enemy spawner based on difficulty
# Pattern: ???
# Why: ???

class EnemySpawner:
    # Your structure here
    pass

# Scenario B: Shared life support system
# Pattern: ???
# Why: ???

class LifeSupport:
    # Your structure here
    pass

# Scenario C: Fuel alert triggers multiple systems
# Pattern: ???
# Why: ???

class FuelMonitor:
    # Your structure here
    pass

# === Print your answers ===
print("Scenario A: Factory - creates objects based on runtime conditions")
print("Scenario B: Singleton - one shared instance for all modules")
print("Scenario C: Observer - fuel change notifies multiple systems")`,
    hint: `A=Factory (create objects dynamically), B=Singleton (one shared instance), C=Observer (one change triggers many responses).`,
    conceptTags: ["design-patterns", "analysis", "architecture"]
  }
];

