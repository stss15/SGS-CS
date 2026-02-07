/**
 * Level 7: Modular Programming
 * IB Syllabus Reference: B2.3.4
 *
 * Learning Objectives:
 * - Define and call functions with def
 * - Pass parameters and use arguments in order
 * - Return single or multiple values
 * - Understand local vs global scope
 * - Compose functions to solve larger problems
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Building reusable modules
// ============================================================================

export const level7BaseContent: LessonSection[] = [
  {
    title: "1. Why Use Functions?",
    content: `Functions are reusable blocks of code with a specific purpose. Instead of repeating code, you write it once and call it whenever needed.

Benefits of functions:
- Reusability: Write once, use many times
- Organization: Break complex problems into smaller parts
- Testing: Test each function independently
- Readability: Give meaningful names to code blocks`,
    codeExample: `# Without functions - repetitive!
print("=" * 30)
print("SYSTEM CHECK")
print("=" * 30)
# ... other code ...
print("=" * 30)
print("LAUNCH STATUS")
print("=" * 30)

# With a function - reusable!
def print_header(title):
    print("=" * 30)
    print(title)
    print("=" * 30)

print_header("SYSTEM CHECK")
# ... other code ...
print_header("LAUNCH STATUS")`
  },
  {
    title: "2. Defining Functions with def",
    content: `Use the def keyword to create a function. The function body is indented (like if statements and loops).

Structure:
def function_name():
    # code to run when called
    # more code

After defining, you must CALL the function to run it!`,
    codeExample: `# Define a function
def greet_crew():
    print("Good morning, crew!")
    print("Today's mission briefing begins now.")

# Call the function (runs the code)
greet_crew()

# Can call multiple times
greet_crew()
greet_crew()

# Nothing happens until you call it!
def unused_function():
    print("This never prints")
# No call = no execution`
  },
  {
    title: "3. Parameters: Passing Data In",
    content: `Parameters allow you to pass data INTO a function. They act like variables that receive values when the function is called.

- Parameters: The variable names in the function definition
- Arguments: The actual values passed when calling`,
    codeExample: `# One parameter
def greet(name):
    print(f"Welcome aboard, {name}!")

greet("Armstrong")  # "Welcome aboard, Armstrong!"
greet("Collins")    # "Welcome aboard, Collins!"

# Multiple parameters
def mission_status(day, fuel, crew):
    print(f"Day {day}: Fuel={fuel}%, Crew={crew}")

mission_status(5, 82, 3)
mission_status(10, 65, 3)

# The ORDER of arguments matters!
# mission_status(82, 5, 3) would give wrong values`
  },
  {
    title: "4. Returning Values",
    content: `Functions can send data BACK to where they were called using return. This lets you use the result in calculations, assignments, or other operations.

Without return, a function returns None by default.`,
    codeExample: `# Function that returns a value
def calculate_fuel_needed(distance):
    fuel = distance * 0.5  # 0.5 kg per km
    return fuel

# Use the returned value
fuel_to_mars = calculate_fuel_needed(78000000)
print(f"Fuel needed: {fuel_to_mars} kg")

# Use directly in expressions
total = calculate_fuel_needed(1000) + calculate_fuel_needed(500)
print(f"Total fuel: {total} kg")

# Return with condition
def check_fuel(current, required):
    if current >= required:
        return "GO"
    else:
        return "NO-GO"

status = check_fuel(100, 90)
print(status)  # "GO"`
  },
  {
    title: "5. Returning Multiple Values",
    content: `Python can return multiple values from a function. They come back as a tuple (like a list, but immutable).

You can unpack them into separate variables!`,
    codeExample: `# Return multiple values
def analyze_readings(readings):
    total = sum(readings)
    count = len(readings)
    average = total / count
    return total, count, average

# Unpack into separate variables
tot, cnt, avg = analyze_readings([85, 90, 78, 92])
print(f"Total: {tot}")
print(f"Count: {cnt}")
print(f"Average: {avg}")

# Or keep as tuple
result = analyze_readings([100, 95, 88])
print(result)  # (283, 3, 94.33...)
print(result[0])  # Access by index: 283`
  },
  {
    title: "6. Variable Scope: Local vs Global",
    content: `Scope determines where a variable can be accessed.

- Local: Created inside a function, only exists there
- Global: Created outside functions, accessible everywhere

Important: Local variables "shadow" global ones with the same name!`,
    codeExample: `# Global variable
mission = "Apollo"  # Available everywhere

def launch():
    # Local variable - only exists in this function
    countdown = 10
    print(f"Launching {mission}")  # Can READ global
    print(f"T-{countdown}")
    
launch()
print(mission)    # Works - global
# print(countdown) # ERROR! countdown is local to launch()

# Shadowing (avoid this!)
fuel = 100  # Global

def burn():
    fuel = 50  # Different variable! Local fuel
    print(f"Local fuel: {fuel}")  # 50

burn()
print(f"Global fuel: {fuel}")  # Still 100!`
  },
  {
    title: "7. Breaking Down Problems",
    content: `Good modular programming means breaking complex tasks into smaller, focused functions. Each function should do ONE thing well.

Pattern:
1. Identify distinct tasks
2. Create a function for each
3. Have a main function that calls others`,
    codeExample: `# Break mission into modules
def check_fuel(level):
    return "GO" if level >= 90 else "NO-GO"

def check_systems(systems):
    for s in systems:
        if not s:
            return "NO-GO"
    return "GO"

def check_weather(condition):
    return "GO" if condition == "clear" else "NO-GO"

def launch_decision(fuel, systems, weather):
    """Main function that uses other functions"""
    fuel_status = check_fuel(fuel)
    system_status = check_systems(systems)
    weather_status = check_weather(weather)
    
    print(f"Fuel: {fuel_status}")
    print(f"Systems: {system_status}")
    print(f"Weather: {weather_status}")
    
    if fuel_status == "GO" and system_status == "GO" and weather_status == "GO":
        return "LAUNCH!"
    return "HOLD"

# Run the decision
result = launch_decision(95, [True, True, True], "clear")
print(result)`
  }
];

// ============================================================================
// CHALLENGES - 8 modular programming missions
// ============================================================================

export const level7Challenges: Challenge[] = [
  {
    id: 1,
    title: "Status Report",
    description: `Create a simple function that prints a status report.

Define a function called status_report() that:
1. Prints "=== MISSION STATUS ==="
2. Prints "All systems operational"
3. Prints "===================="

Call the function twice to demonstrate reusability.`,
    starterCode: `# MISSION: Status Report Function
# Create a reusable status report

def status_report():
    # Print the three lines
    pass

# === Mission Control Test ===
# Call the function twice
status_report()
print()  # Empty line between calls
status_report()`,
    hint: `Just use three print() statements inside the function. Remember to call it to see output!`,
    conceptTags: ["def", "function definition", "calling"]
  },
  {
    id: 2,
    title: "Greeting Protocol",
    description: `Create a function that greets crew members by name.

Define a function called greet_crew(name) that:
1. Takes one parameter: name
2. Prints "Welcome aboard, [name]!"
3. Prints "Report to your station."

Call it three times with different names:
- "Armstrong"
- "Collins"  
- "Aldrin"`,
    starterCode: `# MISSION: Crew Greeting
# Personalized welcome using parameters

def greet_crew(name):
    # Use the name parameter in your print statements
    pass

# === Mission Control Test ===
greet_crew("Armstrong")
greet_crew("Collins")
greet_crew("Aldrin")`,
    hint: `Use f-strings or concatenation: print(f"Welcome aboard, {name}!")`,
    conceptTags: ["parameters", "arguments", "f-strings"]
  },
  {
    id: 3,
    title: "Distance Calculator",
    description: `Create a function that calculates travel time.

Define calculate_time(distance, speed) that:
1. Takes two parameters: distance (km) and speed (km/h)
2. Calculates time = distance / speed
3. Returns the time value

Test it:
- Earth to Moon: 384,400 km at 1,000 km/h
- Print "Time to Moon: X hours"`,
    starterCode: `# MISSION: Travel Time Calculator
# Calculate journey duration

def calculate_time(distance, speed):
    # Calculate and return time
    pass

# === Mission Control Test ===
moon_time = calculate_time(384400, 1000)
print(f"Time to Moon: {moon_time} hours")`,
    hint: `Use return distance / speed. The returned value is stored in moon_time.`,
    conceptTags: ["parameters", "return", "calculation"]
  },
  {
    id: 4,
    title: "Fuel Check",
    description: `Create a function that returns GO or NO-GO status.

Define check_fuel(current, minimum) that:
1. Takes current fuel level and minimum required
2. Returns "GO" if current >= minimum
3. Returns "NO-GO" otherwise

Test with:
- 95% current, 90% minimum (should be GO)
- 85% current, 90% minimum (should be NO-GO)`,
    starterCode: `# MISSION: Fuel Status Check
# Return GO/NO-GO based on fuel

def check_fuel(current, minimum):
    # Compare and return status
    pass

# === Mission Control Test ===
status1 = check_fuel(95, 90)
print(f"Test 1: {status1}")  # Should be GO

status2 = check_fuel(85, 90)
print(f"Test 2: {status2}")  # Should be NO-GO`,
    hint: `Use if current >= minimum: return "GO" else: return "NO-GO"`,
    conceptTags: ["return", "conditionals", "comparison"]
  },
  {
    id: 5,
    title: "Telemetry Analysis",
    description: `Create a function that returns multiple statistics.

Define analyze_telemetry(readings) that:
1. Takes a list of sensor readings
2. Calculates the minimum, maximum, and average
3. Returns all three values

Test with readings = [85, 92, 78, 95, 88]
Unpack the returned values and print each.`,
    starterCode: `# MISSION: Telemetry Analysis
# Return multiple statistics

def analyze_telemetry(readings):
    # Calculate min, max, average
    # Return all three
    pass

# === Mission Control Test ===
readings = [85, 92, 78, 95, 88]
minimum, maximum, average = analyze_telemetry(readings)
print(f"Min: {minimum}")
print(f"Max: {maximum}")
print(f"Average: {average}")`,
    hint: `Use min(readings), max(readings), sum(readings)/len(readings). Return like: return min_val, max_val, avg_val`,
    conceptTags: ["multiple return", "unpacking", "list processing"]
  },
  {
    id: 6,
    title: "Scope Investigation",
    description: `Demonstrate understanding of local vs global scope.

1. Create a global variable: mission_name = "Artemis"
2. Create a function scope_test() that:
   - Creates a LOCAL variable: crew_count = 4
   - Prints both mission_name and crew_count
3. Call the function
4. After the function, print mission_name
5. Try printing crew_count outside the function (it will error!)

Comment out the error line and explain why it fails.`,
    starterCode: `# MISSION: Scope Investigation
# Understand local vs global variables

# Global variable
mission_name = "Artemis"

def scope_test():
    # Local variable
    crew_count = 4
    # Print both inside function
    pass

# === Mission Control Test ===
scope_test()
print(f"Global mission: {mission_name}")
# print(f"Crew count: {crew_count}")  # This will ERROR!
# Explain: Why does this fail?`,
    hint: `Variables created inside a function (local) don't exist outside. Global variables CAN be read inside functions.`,
    conceptTags: ["scope", "local", "global"]
  },
  {
    id: 7,
    title: "Utility Module",
    description: `Create a set of utility functions that work together.

Create these three functions:
1. celsius_to_kelvin(celsius) - Returns celsius + 273.15
2. is_safe_temp(kelvin) - Returns True if between 260-320K, else False
3. temp_status(celsius) - Uses both functions above, returns "SAFE" or "DANGER"

Test temp_status with:
- 25°C (should be SAFE - about 298K)
- -50°C (should be DANGER - about 223K)`,
    starterCode: `# MISSION: Temperature Utilities
# Create interconnected utility functions

def celsius_to_kelvin(celsius):
    # Convert and return
    pass

def is_safe_temp(kelvin):
    # Check if between 260-320K
    pass

def temp_status(celsius):
    # Use other functions to determine status
    pass

# === Mission Control Test ===
print(f"25°C status: {temp_status(25)}")   # SAFE
print(f"-50°C status: {temp_status(-50)}") # DANGER`,
    hint: `In temp_status: first call celsius_to_kelvin, then call is_safe_temp with that result, then return based on True/False.`,
    conceptTags: ["modular", "function calls", "composition"]
  },
  {
    id: 8,
    title: "Mission Planner",
    description: `Create a comprehensive mission planning system using modular functions.

Create these functions:
1. get_mission_input() - Gets mission name, distance(int), fuel(int) from user, returns all three
2. calculate_fuel_needed(distance) - Returns distance * 0.01 (fuel per km)
3. check_feasibility(available, needed) - Returns "FEASIBLE" if available >= needed, else "NOT FEASIBLE"
4. generate_report(name, distance, available, needed, status) - Prints formatted report

Create main() that:
1. Calls get_mission_input() 
2. Calculates fuel needed
3. Checks feasibility
4. Generates report`,
    starterCode: `# MISSION: Complete Mission Planner
# Full modular system

def get_mission_input():
    # Get name, distance, fuel from user
    # Return all three
    pass

def calculate_fuel_needed(distance):
    # Return fuel calculation
    pass

def check_feasibility(available, needed):
    # Return status string
    pass

def generate_report(name, distance, available, needed, status):
    # Print formatted report
    print("=" * 40)
    print(f"MISSION: {name}")
    print("=" * 40)
    # ... more report details
    pass

def main():
    # Orchestrate all functions
    pass

# === Mission Control Test ===
main()`,
    hint: `This synthesizes everything! get_mission_input returns 3 values. main() calls each function in order, passing results between them.`,
    conceptTags: ["synthesis", "modular design", "input", "return", "full system"]
  }
];
