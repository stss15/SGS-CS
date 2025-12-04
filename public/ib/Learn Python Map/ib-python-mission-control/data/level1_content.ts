/**
 * Level 1: Variables & I/O
 * IB Syllabus Reference: B2.1.1 - Variables, data types, assignment
 * 
 * Learning Objectives:
 * - Understand what variables are and why we use them
 * - Master the four core data types: int, float, str, bool
 * - Use print() for output and input() for user input
 * - Perform type casting between types
 * - Understand basic arithmetic operators
 */

export interface LessonSection {
  title: string;
  content: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  codeExample?: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  starterCode: string;
  hint: string;
  conceptTags?: string[];
}

// ============================================================================
// BASE CONTENT - Bite-sized lessons for the Mission Manual
// ============================================================================

export const level1BaseContent: LessonSection[] = [
  {
    title: "1. Output: The print() Function",
    content: `Every space mission needs a way to send messages back to Earth. In Python, the print() function is your communication link to the console.

Whatever you place inside the parentheses will be displayed on screen. Text must be wrapped in quotation marks (single ' or double ").`,
    codeExample: `# Transmit a message to Mission Control
print("Houston, we have liftoff!")

# You can print numbers directly
print(42)

# Print multiple items separated by commas
print("Altitude:", 10000, "meters")`
  },
  {
    title: "2. Variables: Data Containers",
    content: `A variable is like a labeled storage container in your spacecraft. It holds a piece of data that you can use and update throughout your mission.

In Python, you create a variable by choosing a name and using the = operator to assign it a value. The value on the RIGHT gets stored in the name on the LEFT.

Variable Naming Rules:
• Use lowercase letters with underscores (snake_case)
• Must start with a letter or underscore
• Cannot use Python keywords (like print, if, for)
• Make names meaningful and descriptive`,
    codeExample: `# Good variable names (space-themed!)
crew_count = 6
mission_name = "Apollo 11"
fuel_level = 85.5
is_launched = True

# The value can change (that's why it's called "variable")
fuel_level = 80.0  # Fuel decreased after maneuver
print(fuel_level)  # Outputs: 80.0`
  },
  {
    title: "3. Data Types",
    content: `Every piece of data in Python has a type. The type determines what operations you can perform on it. There are four fundamental types you must know:`,
    tableData: {
      headers: ["Type", "Description", "Example"],
      rows: [
        ["int", "Whole numbers (positive or negative)", "crew = 6"],
        ["float", "Decimal numbers", "fuel = 85.5"],
        ["str", "Text (wrapped in quotes)", "name = \"Apollo\""],
        ["bool", "True or False values", "launched = True"]
      ]
    },
    codeExample: `# Integer - for counting things
days_in_orbit = 14

# Float - for precise measurements  
orbital_velocity = 7.67  # km/s

# String - for text data
commander = "Neil Armstrong"

# Boolean - for yes/no states
systems_go = True
abort_initiated = False`
  },
  {
    title: "4. Arithmetic Operators",
    content: `Python can perform mathematical calculations using arithmetic operators. When you combine numbers with operators, Python evaluates the expression and returns a result.`,
    tableData: {
      headers: ["Operator", "Operation", "Example", "Result"],
      rows: [
        ["+", "Addition", "10 + 5", "15"],
        ["-", "Subtraction", "100 - 25", "75"],
        ["*", "Multiplication", "6 * 7", "42"],
        ["/", "Division (always returns float)", "10 / 4", "2.5"],
        ["//", "Integer Division (floor)", "10 // 4", "2"],
        ["%", "Modulus (remainder)", "10 % 3", "1"],
        ["**", "Exponentiation (power)", "2 ** 3", "8"]
      ]
    },
    codeExample: `# Calculate remaining fuel after burn
fuel_start = 1000  # kg
fuel_used = 150    # kg
fuel_remaining = fuel_start - fuel_used
print(fuel_remaining)  # 850

# Calculate orbital period (simplified)
radius = 6771  # km from Earth's center
velocity = 7.67  # km/s
circumference = 2 * 3.14159 * radius
period_seconds = circumference / velocity
print(period_seconds)  # ~5542 seconds`
  },
  {
    title: "5. Input: Getting Data from the User",
    content: `The input() function pauses your program and waits for the user to type something. When they press Enter, their text is returned as a string.

IMPORTANT: input() ALWAYS returns a string, even if the user types a number. If you need to do math with the input, you must convert it first.`,
    codeExample: `# Get the crew member's name
name = input("Enter crew member name: ")
print("Welcome aboard,", name)

# Get a number (must convert from string!)
age_text = input("Enter your age: ")
age = int(age_text)  # Convert string to integer
print("In 10 years you'll be", age + 10)

# Shorthand: convert in one line
altitude = int(input("Current altitude (km): "))
print("Altitude confirmed:", altitude, "km")`
  },
  {
    title: "6. Type Casting: Converting Between Types",
    content: `Sometimes you need to convert data from one type to another. This is called type casting. Python provides built-in functions for this:`,
    tableData: {
      headers: ["Function", "Converts to", "Example", "Result"],
      rows: [
        ["int()", "Integer", "int(\"42\")", "42"],
        ["float()", "Float", "float(\"3.14\")", "3.14"],
        ["str()", "String", "str(100)", "\"100\""],
        ["bool()", "Boolean", "bool(1)", "True"]
      ]
    },
    codeExample: `# String to Number (essential for input!)
distance_text = "384400"  # Moon distance in km
distance_km = int(distance_text)
print(distance_km * 2)  # Round trip: 768800

# Number to String (for message building)
speed = 11.2  # km/s escape velocity
message = "Escape velocity: " + str(speed) + " km/s"
print(message)

# Float to Int (removes decimal, doesn't round)
precise_fuel = 75.8
fuel_display = int(precise_fuel)  # 75 (truncated)`
  }
];

// ============================================================================
// CHALLENGES - 8 progressive challenges testing all concepts
// ============================================================================

export const level1Challenges: Challenge[] = [
  {
    id: 1,
    title: "First Contact",
    description: `Your spacecraft has just established communication with Earth. Send your first transmission by printing the message:

"Mission Control, this is Voyager. Communications established."

This is your first step in mastering Python - sending output to the console.`,
    starterCode: `# MISSION: First Contact
# Establish communication with Earth

def transmit():
    # Use print() to send your message
    pass

# === Mission Control Test ===
transmit()`,
    hint: `Use print() with the exact message in quotes. Remember: print("your message here")`,
    conceptTags: ["print", "strings"]
  },
  {
    id: 2,
    title: "Telemetry Log",
    description: `Mission Control needs you to log your spacecraft's status. Create three variables to store your telemetry data:

1. spacecraft_name → Set to "Voyager-1"
2. crew_count → Set to 4
3. orbit_stable → Set to True

Then print each variable on its own line.`,
    starterCode: `# MISSION: Telemetry Log
# Record spacecraft status in variables

def log_telemetry():
    # Create your three variables here
    
    # Print each variable
    pass

# === Mission Control Test ===
log_telemetry()`,
    hint: `Create variables with = assignment. String needs quotes, number doesn't, boolean is True or False (capitalized).`,
    conceptTags: ["variables", "assignment", "data-types"]
  },
  {
    id: 3,
    title: "Mission Data Types",
    description: `The science team needs various measurements stored correctly. Create these variables with the appropriate data types:

1. mission_day → 47 (integer - we count whole days)
2. fuel_percentage → 68.5 (float - we need precision)
3. destination → "Mars" (string - it's text)
4. thrusters_active → False (boolean - they're currently off)

Print each variable with a label, like: "Mission Day: 47"`,
    starterCode: `# MISSION: Data Type Precision
# Store mission data with correct types

def record_mission_data():
    # Create four variables with correct types
    
    # Print each with a label
    pass

# === Mission Control Test ===
record_mission_data()`,
    hint: `Integers have no decimal, floats do. Strings use quotes. Booleans are True or False (capitalized!). Use print("Label:", variable)`,
    conceptTags: ["int", "float", "str", "bool", "data-types"]
  },
  {
    id: 4,
    title: "Fuel Calculation",
    description: `Your spacecraft started with 2500 kg of fuel. After the launch sequence, you used 450 kg. After the orbital insertion burn, you used another 380 kg.

Calculate:
1. Create a variable for starting fuel (2500)
2. Create variables for each burn amount
3. Calculate the remaining fuel
4. Print the result: "Remaining fuel: X kg"`,
    starterCode: `# MISSION: Fuel Calculation
# Calculate remaining propellant

def calculate_fuel():
    # Starting fuel
    
    # Burns
    
    # Calculate remaining
    
    # Print result
    pass

# === Mission Control Test ===
calculate_fuel()`,
    hint: `Use subtraction: remaining = start - burn1 - burn2. Remember to print the result!`,
    conceptTags: ["variables", "arithmetic", "subtraction"]
  },
  {
    id: 5,
    title: "Type Conversion",
    description: `Incoming telemetry arrives as text data that needs processing. You've received:

- distance_data = "384400" (Moon distance in km)
- speed_data = "1.02" (km/s)

Convert these strings to numbers (int and float), then:
1. Calculate the travel time in seconds (distance / speed)
2. Print: "Travel time: X seconds"

Remember: You cannot do math on strings!`,
    starterCode: `# MISSION: Telemetry Processing
# Convert and calculate incoming data

def process_telemetry():
    # Incoming data (as strings)
    distance_data = "384400"
    speed_data = "1.02"
    
    # Convert to numbers
    
    # Calculate travel time
    
    # Print result
    pass

# === Mission Control Test ===
process_telemetry()`,
    hint: `Use int() for whole numbers and float() for decimals. Then divide: time = distance / speed`,
    conceptTags: ["type-casting", "int", "float", "division"]
  },
  {
    id: 6,
    title: "Crew Input",
    description: `Mission Control needs to register a new crew member. Your program should:

1. Ask for the crew member's name using input()
2. Ask for their role (pilot, engineer, scientist, etc.)
3. Print a welcome message:
   "Welcome aboard, [NAME]! Your role: [ROLE]"

Test your program by running it and entering sample data.`,
    starterCode: `# MISSION: Crew Registration
# Register a new crew member

def register_crew():
    # Get crew member's name
    
    # Get their role
    
    # Print welcome message
    pass

# === Mission Control Test ===
register_crew()`,
    hint: `Use input("prompt: ") to get user input. Store each in a variable, then print them together.`,
    conceptTags: ["input", "strings", "print"]
  },
  {
    id: 7,
    title: "Launch Calculation",
    description: `Calculate the launch window parameters. The user needs to input:

1. Payload mass (in kg) - get this as an integer
2. Fuel efficiency (km per kg) - get this as a float

Calculate and print:
- Maximum range = payload_mass × fuel_efficiency
- Display: "Maximum range: X km"

Remember: input() returns strings, so you must convert!`,
    starterCode: `# MISSION: Launch Parameters
# Calculate maximum range from user input

def calculate_launch():
    # Get payload mass (as integer)
    
    # Get fuel efficiency (as float)
    
    # Calculate maximum range
    
    # Print the result
    pass

# === Mission Control Test ===
calculate_launch()`,
    hint: `Use int(input(...)) for the integer and float(input(...)) for the decimal. Then multiply them together.`,
    conceptTags: ["input", "type-casting", "arithmetic", "multiplication"]
  },
  {
    id: 8,
    title: "Mission Report",
    description: `Generate a complete mission status report. Your program should:

1. Ask for the mission name (string)
2. Ask for days in flight (integer)
3. Ask for distance traveled in km (float)

Calculate:
- Average speed = distance / days / 24 (km per hour)

Print a formatted report:
"=== MISSION REPORT ==="
"Mission: [name]"
"Days in flight: [days]"
"Distance: [distance] km"
"Average speed: [speed] km/h"
"======================"

This challenge combines ALL concepts from this level!`,
    starterCode: `# MISSION: Complete Status Report
# Generate comprehensive mission report

def generate_report():
    # Gather mission data
    
    # Calculate average speed (km per hour)
    # Remember: hours = days × 24
    
    # Print formatted report
    pass

# === Mission Control Test ===
generate_report()`,
    hint: `Get inputs with proper type conversion. Calculate hours first (days * 24), then speed = distance / hours. Use multiple print() statements for the report.`,
    conceptTags: ["input", "type-casting", "arithmetic", "print", "synthesis"]
  }
];
