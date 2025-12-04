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

Your tasks:
1. Define a function called status_report() using the def keyword
2. Inside the function, print "=== MISSION STATUS ==="
3. Print "All systems operational"
4. Print "===================="
5. Call the function twice to demonstrate reusability

Remember: A function definition starts with def name(): and the body is indented!`,
    starterCode: `# MISSION: Status Report Function
# Create a reusable status report

# =============================================
# WRITE YOUR FUNCTION HERE
# Define: status_report()
# It should print 3 lines (header, message, footer)
# =============================================



# =============================================
# CALL YOUR FUNCTION HERE
# Call it twice with a blank print() between
# =============================================

`,
    hint: `Start with def status_report(): then indent the print statements below. After the function, call it with status_report()`,
    conceptTags: ["def", "function definition", "calling"]
  },
  {
    id: 2,
    title: "Greeting Protocol",
    description: `Create a function that greets crew members by name.

Your tasks:
1. Define a function called greet_crew that takes one parameter: name
2. Inside the function, print "Welcome aboard, [name]!"
3. Also print "Report to your station."
4. Call your function three times with: "Armstrong", "Collins", "Aldrin"

Remember: Parameters go in parentheses after the function name!`,
    starterCode: `# MISSION: Crew Greeting
# Personalized welcome using parameters

# =============================================
# WRITE YOUR FUNCTION HERE
# Define: greet_crew(name)
# Use the name parameter in your print statements
# =============================================



# =============================================
# CALL YOUR FUNCTION HERE
# Call it 3 times with different crew names
# =============================================

`,
    hint: `Define with def greet_crew(name): then use print(f"Welcome aboard, {name}!") inside. Call with greet_crew("Armstrong")`,
    conceptTags: ["parameters", "arguments", "f-strings"]
  },
  {
    id: 3,
    title: "Distance Calculator",
    description: `Create a function that calculates travel time.

Your tasks:
1. Define calculate_time(distance, speed) with two parameters
2. Calculate time = distance / speed
3. Return the time value using the return keyword
4. Call your function with: 384400 km, 1000 km/h (Earth to Moon)
5. Store the result in a variable and print it

Remember: return sends a value back to where the function was called!`,
    starterCode: `# MISSION: Travel Time Calculator
# Calculate journey duration

# =============================================
# WRITE YOUR FUNCTION HERE
# Define: calculate_time(distance, speed)
# Calculate time and return it
# =============================================



# =============================================
# CALL YOUR FUNCTION HERE
# Store result in moon_time, then print it
# Example: moon_time = your_function(384400, 1000)
# =============================================

`,
    hint: `Inside the function: time = distance / speed, then return time. Outside: moon_time = calculate_time(384400, 1000)`,
    conceptTags: ["parameters", "return", "calculation"]
  },
  {
    id: 4,
    title: "Fuel Check",
    description: `Create a function that returns GO or NO-GO status.

Your tasks:
1. Define check_fuel(current, minimum) with two parameters
2. If current >= minimum, return "GO"
3. Otherwise, return "NO-GO"
4. Test your function:
   - check_fuel(95, 90) should return "GO"
   - check_fuel(85, 90) should return "NO-GO"
5. Print both results`,
    starterCode: `# MISSION: Fuel Status Check
# Return GO/NO-GO based on fuel

# =============================================
# WRITE YOUR FUNCTION HERE
# Define: check_fuel(current, minimum)
# Use if/else to return "GO" or "NO-GO"
# =============================================



# =============================================
# CALL YOUR FUNCTION HERE
# Test with (95, 90) and (85, 90)
# Store results and print them
# =============================================

`,
    hint: `Use if current >= minimum: return "GO" else: return "NO-GO". Call with status = check_fuel(95, 90)`,
    conceptTags: ["return", "conditionals", "comparison"]
  },
  {
    id: 5,
    title: "Telemetry Analysis",
    description: `Create a function that returns multiple statistics.

Your tasks:
1. Define analyze_telemetry(readings) that takes a list
2. Calculate the minimum using min()
3. Calculate the maximum using max()
4. Calculate the average using sum()/len()
5. Return all three values separated by commas
6. Test with [85, 92, 78, 95, 88] and unpack the results

Remember: return a, b, c returns multiple values!`,
    starterCode: `# MISSION: Telemetry Analysis
# Return multiple statistics

# =============================================
# WRITE YOUR FUNCTION HERE
# Define: analyze_telemetry(readings)
# Calculate min, max, average
# Return all three: return min_val, max_val, avg
# =============================================



# =============================================
# CALL YOUR FUNCTION HERE
# Test data:
readings = [85, 92, 78, 95, 88]
# Unpack: minimum, maximum, average = your_function(readings)
# Print each value
# =============================================

`,
    hint: `Inside: min_val = min(readings), etc. Return: return min_val, max_val, avg. Outside: a, b, c = analyze_telemetry(readings)`,
    conceptTags: ["multiple return", "unpacking", "list processing"]
  },
  {
    id: 6,
    title: "Scope Investigation",
    description: `Demonstrate understanding of local vs global scope.

Your tasks:
1. Create a global variable: mission_name = "Artemis"
2. Define a function scope_test() that:
   - Creates a LOCAL variable: crew_count = 4
   - Prints both mission_name (global) and crew_count (local)
3. Call the function
4. After the function, print mission_name (this works!)
5. Try printing crew_count outside (this will error - comment it out)

Why does it fail? Local variables only exist inside their function!`,
    starterCode: `# MISSION: Scope Investigation
# Understand local vs global variables

# =============================================
# CREATE GLOBAL VARIABLE HERE
# mission_name = "Artemis"
# =============================================



# =============================================
# WRITE YOUR FUNCTION HERE
# Define: scope_test()
# Create local variable crew_count = 4
# Print both variables from inside the function
# =============================================



# =============================================
# TEST SCOPE HERE
# 1. Call scope_test()
# 2. Print mission_name (works - it's global)
# 3. Try printing crew_count (fails - it's local!)
# =============================================

`,
    hint: `Global variables can be read anywhere. Local variables (created inside a function) only exist inside that function.`,
    conceptTags: ["scope", "local", "global"]
  },
  {
    id: 7,
    title: "Utility Module",
    description: `Create a set of utility functions that work together.

Your tasks:
1. Define celsius_to_kelvin(celsius) - returns celsius + 273.15
2. Define is_safe_temp(kelvin) - returns True if 260 <= kelvin <= 320, else False
3. Define temp_status(celsius) that:
   - Calls celsius_to_kelvin to convert
   - Calls is_safe_temp to check
   - Returns "SAFE" if True, "DANGER" if False

Test temp_status(25) should be SAFE (~298K)
Test temp_status(-50) should be DANGER (~223K)`,
    starterCode: `# MISSION: Temperature Utilities
# Create interconnected utility functions

# =============================================
# WRITE YOUR THREE FUNCTIONS HERE
# 
# 1. celsius_to_kelvin(celsius)
#    - Return: celsius + 273.15
#
# 2. is_safe_temp(kelvin)
#    - Return True if 260 <= kelvin <= 320
#    - Return False otherwise
#
# 3. temp_status(celsius)
#    - Convert using celsius_to_kelvin
#    - Check using is_safe_temp
#    - Return "SAFE" or "DANGER"
# =============================================



# =============================================
# CALL YOUR FUNCTIONS HERE
# Test temp_status with 25 and -50
# =============================================

`,
    hint: `In temp_status: kelvin = celsius_to_kelvin(celsius), then if is_safe_temp(kelvin): return "SAFE" else: return "DANGER"`,
    conceptTags: ["modular", "function calls", "composition"]
  },
  {
    id: 8,
    title: "Mission Planner",
    description: `Create a comprehensive mission planning system using modular functions.

Your tasks - create these functions:
1. calculate_fuel_needed(distance) - Returns distance * 0.01
2. check_feasibility(available, needed) - Returns "FEASIBLE" if available >= needed
3. generate_report(name, distance, available, needed, status) - Prints a formatted report
4. main() - Orchestrates everything:
   - Set mission name, distance, and available fuel
   - Calculate fuel needed
   - Check feasibility
   - Generate report

This combines everything you've learned!`,
    starterCode: `# MISSION: Complete Mission Planner
# Full modular system

# =============================================
# WRITE YOUR FUNCTIONS HERE
#
# 1. calculate_fuel_needed(distance)
#    - Return: distance * 0.01
#
# 2. check_feasibility(available, needed)
#    - Return "FEASIBLE" or "NOT FEASIBLE"
#
# 3. generate_report(name, distance, available, needed, status)
#    - Print formatted mission report
#    - Include: mission name, distance, fuel info, status
#
# 4. main()
#    - Set: name = "Mars", distance = 78000000, available = 1000000
#    - Calculate needed fuel
#    - Check feasibility
#    - Generate report
# =============================================



# =============================================
# CALL main() HERE TO RUN YOUR MISSION PLANNER
# =============================================

`,
    hint: `Build each function one at a time. In main(): needed = calculate_fuel_needed(distance), status = check_feasibility(available, needed), etc.`,
    conceptTags: ["synthesis", "modular design", "input", "return", "full system"]
  }
];
