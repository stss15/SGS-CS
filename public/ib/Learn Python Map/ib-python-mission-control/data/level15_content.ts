/**
 * Level 15: Inheritance & Polymorphism (HL)
 * IB Syllabus Reference: B3.2.1 - B3.2.4
 *
 * Learning Objectives:
 * - Build child classes that inherit from parents
 * - Use super().__init__ to reuse constructors
 * - Override methods for polymorphic behavior
 * - Add child-specific data and behavior
 * - Use composition for has-a relationships
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Reuse and specialize classes
// ============================================================================

export const level15BaseContent: LessonSection[] = [
  {
    title: "1. The Problem of Code Duplication",
    content: `Without inheritance, similar classes duplicate code:`,
    codeExample: `# Without inheritance - lots of repetition!
class Rocket:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    def launch(self): ...

class Satellite:
    def __init__(self, name, fuel):  # Same!
        self.name = name
        self.fuel = fuel
    def launch(self): ...  # Same!

# With inheritance - share common code!
class Spacecraft:  # Parent
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel
    def launch(self): ...

class Rocket(Spacecraft):  # Child - inherits!
    pass

class Satellite(Spacecraft):  # Child - inherits!
    pass`
  },
  {
    title: "2. Inheritance Syntax",
    content: `class Child(Parent): creates a child that inherits everything from Parent.`,
    codeExample: `class Spacecraft:
    def __init__(self, name):
        self.name = name
        self.fuel = 100
    
    def launch(self):
        print(f"{self.name} launching!")

# Rocket inherits from Spacecraft
class Rocket(Spacecraft):
    pass  # Inherits everything!

# Satellite inherits from Spacecraft
class Satellite(Spacecraft):
    pass

rocket = Rocket("Falcon 9")
rocket.launch()  # Works! Inherited from Spacecraft
print(rocket.fuel)  # 100 - inherited!`
  },
  {
    title: "3. Calling Parent Constructor",
    content: `Use super().__init__() to run the parent's constructor, then add child-specific initialization.`,
    codeExample: `class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel

class Rocket(Spacecraft):
    def __init__(self, name, fuel, payload_capacity):
        super().__init__(name, fuel)  # Call parent constructor
        self.payload_capacity = payload_capacity  # Add new attribute

class Satellite(Spacecraft):
    def __init__(self, name, fuel, orbit_altitude):
        super().__init__(name, fuel)  # Call parent constructor
        self.orbit_altitude = orbit_altitude  # Add new attribute

rocket = Rocket("Falcon 9", 100, 22800)
print(rocket.name)              # Inherited
print(rocket.payload_capacity)  # New to Rocket`
  },
  {
    title: "4. Polymorphism: Overriding Methods",
    content: `Child classes can override parent methods to provide specialized behavior.`,
    codeExample: `class Spacecraft:
    def __init__(self, name):
        self.name = name
    
    def describe(self):
        return f"Spacecraft: {self.name}"

class Rocket(Spacecraft):
    def __init__(self, name, stages):
        super().__init__(name)
        self.stages = stages
    
    def describe(self):  # Override!
        return f"Rocket: {self.name} ({self.stages} stages)"

class Satellite(Spacecraft):
    def describe(self):  # Override!
        return f"Satellite: {self.name} (in orbit)"

# Same method name, different behavior
ships = [Rocket("Falcon 9", 2), Satellite("Hubble"), Spacecraft("Generic")]
for ship in ships:
    print(ship.describe())  # Each calls its own version!`
  },
  {
    title: "5. Composition: Has-A Relationships",
    content: `Composition is when a class CONTAINS other objects. Not everything is "is-a" - sometimes it's "has-a".`,
    codeExample: `class Engine:
    def __init__(self, thrust):
        self.thrust = thrust
    def ignite(self):
        return f"Engine igniting: {self.thrust}kN thrust"

class Spacecraft:
    def __init__(self, name, engine):  # Has-a relationship
        self.name = name
        self.engine = engine  # Contains an Engine object
    
    def launch(self):
        return self.engine.ignite()  # Delegates to contained object

engine = Engine(500)
ship = Spacecraft("Apollo", engine)
print(ship.launch())  # "Engine igniting: 500kN thrust"`
  }
];

// ============================================================================
// CHALLENGES - 6 inheritance and composition missions
// ============================================================================

export const level15Challenges: Challenge[] = [
  {
    id: 1,
    title: "Vehicle Hierarchy",
    description: `Create a simple inheritance hierarchy.

Vehicle (parent):
- __init__(name, speed)
- move() returns "[name] moving at [speed] km/h"

Spacecraft(Vehicle):
- Inherits everything, no changes

Test: Create Spacecraft, verify inheritance works.`,
    starterCode: `class Vehicle:
    pass

class Spacecraft(Vehicle):
    pass

ship = Spacecraft("Enterprise", 1000)
print(ship.move())`,
    hint: `class Spacecraft(Vehicle): pass is enough for basic inheritance.`,
    conceptTags: ["inheritance", "basic"]
  },
  {
    id: 2,
    title: "Extended Constructor",
    description: `Create Rocket class that extends Spacecraft.

Spacecraft(name, fuel) - base class
Rocket(name, fuel, stages) - adds stages attribute

Use super().__init__() to call parent constructor.`,
    starterCode: `class Spacecraft:
    def __init__(self, name, fuel):
        self.name = name
        self.fuel = fuel

class Rocket(Spacecraft):
    def __init__(self, name, fuel, stages):
        # Call parent constructor
        # Add stages attribute
        pass

rocket = Rocket("Falcon 9", 100, 2)
print(rocket.name)    # Inherited
print(rocket.stages)  # New`,
    hint: `super().__init__(name, fuel) then self.stages = stages`,
    conceptTags: ["super", "constructor", "extending"]
  },
  {
    id: 3,
    title: "Polymorphic Launch",
    description: `Override the launch() method in child classes.

Spacecraft.launch() - "Launching spacecraft"
Rocket.launch() - "Rocket ignition sequence..."
Satellite.launch() - "Deploying satellite to orbit..."

Create one of each, call launch() on all.`,
    starterCode: `class Spacecraft:
    def __init__(self, name):
        self.name = name
    def launch(self):
        return f"Launching {self.name}"

class Rocket(Spacecraft):
    def launch(self):
        pass

class Satellite(Spacecraft):
    def launch(self):
        pass

ships = [Spacecraft("Generic"), Rocket("Falcon"), Satellite("Hubble")]
for s in ships:
    print(s.launch())`,
    hint: `Override by defining a method with the same name in the child class.`,
    conceptTags: ["polymorphism", "override"]
  },
  {
    id: 4,
    title: "Adding New Methods",
    description: `Add child-specific methods.

Spacecraft: name, launch()
Rocket: + stages, separate_stage() - reduces stages by 1
Satellite: + orbit_altitude, adjust_orbit(delta) - changes altitude

Test each child's unique methods.`,
    starterCode: `class Spacecraft:
    def __init__(self, name):
        self.name = name
    def launch(self):
        return f"{self.name} launching"

class Rocket(Spacecraft):
    def __init__(self, name, stages):
        super().__init__(name)
        self.stages = stages
    
    def separate_stage(self):
        pass

class Satellite(Spacecraft):
    def __init__(self, name, orbit):
        super().__init__(name)
        self.orbit_altitude = orbit
    
    def adjust_orbit(self, delta):
        pass

r = Rocket("Saturn V", 3)
r.separate_stage()
print(r.stages)  # 2

s = Satellite("ISS", 400)
s.adjust_orbit(50)
print(s.orbit_altitude)  # 450`,
    hint: `New methods are defined just like any other method in the child class.`,
    conceptTags: ["extending", "new methods"]
  },
  {
    id: 5,
    title: "Engine Composition",
    description: `Use composition - spacecraft HAS-A engine.

Engine class:
- thrust, is_running
- start(), stop(), status()

Spacecraft class:
- name, engine (Engine object)
- ignite() calls engine.start()
- shutdown() calls engine.stop()

Test the composed objects working together.`,
    starterCode: `class Engine:
    def __init__(self, thrust):
        self.thrust = thrust
        self.is_running = False
    
    def start(self):
        pass
    
    def stop(self):
        pass
    
    def status(self):
        pass

class Spacecraft:
    def __init__(self, name, engine):
        self.name = name
        self.engine = engine
    
    def ignite(self):
        pass
    
    def shutdown(self):
        pass

e = Engine(500)
ship = Spacecraft("Apollo", e)
ship.ignite()
print(ship.engine.status())
ship.shutdown()`,
    hint: `Spacecraft.ignite() should call self.engine.start()`,
    conceptTags: ["composition", "has-a"]
  },
  {
    id: 6,
    title: "Complete Fleet System",
    description: `Create a complete vehicle hierarchy.

Vehicle (parent): name, status()
├── Spacecraft: + fuel, launch()
│   ├── Rocket: + payload, deliver_payload()
│   └── Probe: + destination, transmit_data()
└── GroundVehicle: + wheels, drive()
    └── Rover: + arm_extended, extend_arm()

Create one of each, demonstrate polymorphism with status().`,
    starterCode: `class Vehicle:
    def __init__(self, name):
        self.name = name
    def status(self):
        return f"Vehicle: {self.name}"

class Spacecraft(Vehicle):
    pass

class Rocket(Spacecraft):
    pass

class Probe(Spacecraft):
    pass

class GroundVehicle(Vehicle):
    pass

class Rover(GroundVehicle):
    pass

# Create fleet
fleet = [
    Rocket("Falcon", 100, 500),
    Probe("Voyager", 50, "Jupiter"),
    Rover("Curiosity", 6)
]

for v in fleet:
    print(v.status())`,
    hint: `Each class adds its own attributes via super().__init__ and can override status() for polymorphism.`,
    conceptTags: ["synthesis", "hierarchy", "polymorphism"]
  }
];
