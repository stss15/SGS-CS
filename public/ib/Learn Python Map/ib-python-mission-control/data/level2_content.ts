/**
 * Level 2: Sequence & Selection
 * IB Syllabus Reference: B2.3.1, B2.3.2
 *
 * Learning Objectives:
 * - Understand sequential execution (top-to-bottom flow)
 * - Use comparison operators to create Boolean expressions
 * - Combine conditions with and/or/not
 * - Write if, if-else, and if-elif-else structures
 * - Create nested conditionals for complex logic
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Decision making and control flow
// ============================================================================

export const level2BaseContent: LessonSection[] = [
  {
    title: "1. Sequential Execution",
    content: `In Python, code runs from top to bottom, one line at a time. This is called sequential execution. Like a mission checklist, each step must complete before moving to the next.

The order of your statements matters! If you try to use a variable before creating it, Python will raise an error.`,
    codeExample: `# Mission checklist - runs top to bottom
fuel_level = 100
print("Fuel loaded:", fuel_level)

altitude = 0
print("Current altitude:", altitude)

mission_status = "Ready"
print("Status:", mission_status)

# Each line executes in order:
# 1. fuel_level created
# 2. fuel printed
# 3. altitude created
# 4. altitude printed
# 5. status created
# 6. status printed`
  },
  {
    title: "2. Comparison Operators",
    content: `Comparison operators compare two values and return a Boolean result (True or False). These are essential for making decisions in your code.`,
    tableData: {
      headers: ["Operator", "Meaning", "Example", "Result"],
      rows: [
        ["==", "Equal to", "5 == 5", "True"],
        ["!=", "Not equal to", "5 != 3", "True"],
        [">", "Greater than", "10 > 5", "True"],
        ["<", "Less than", "3 < 8", "True"],
        [">=", "Greater than or equal", "5 >= 5", "True"],
        ["<=", "Less than or equal", "4 <= 7", "True"]
      ]
    },
    codeExample: `# Checking spacecraft conditions
altitude = 400  # km above Earth
target = 400

print(altitude == target)   # True - at target altitude
print(altitude > 350)       # True - above minimum
print(altitude < 500)       # True - below maximum

fuel = 75.5
minimum_fuel = 80.0
print(fuel >= minimum_fuel)  # False - need more fuel!`
  },
  {
    title: "3. The if Statement",
    content: `The if statement lets your program make decisions. If the condition is True, the indented code runs. If False, it's skipped entirely.

CRITICAL: Python uses indentation (4 spaces) to show which code belongs to the if statement. Everything indented after the if runs only when the condition is True.`,
    codeExample: `# Basic if statement structure
fuel_level = 95

if fuel_level >= 90:
    print("GO for launch!")
    print("Fuel systems nominal")

# This always runs (not indented)
print("Checklist complete")

# With a False condition
altitude = 50
if altitude >= 100:
    print("This won't print - condition is False")

print("Mission continues regardless")`
  },
  {
    title: "4. if-else: Two-Way Decisions",
    content: `When you need to do one thing if True and another thing if False, use if-else. Exactly ONE branch will execute - never both, never neither.

Think of it as: "If this condition is true, do A. Otherwise, do B."`,
    codeExample: `# Go/No-Go decision
fuel_level = 75

if fuel_level >= 90:
    print("GO - Fuel nominal")
    status = "LAUNCH"
else:
    print("NO-GO - Insufficient fuel")
    status = "HOLD"

print("Final status:", status)

# Temperature check
temp = -40  # Celsius
if temp > -50:
    print("Temperature within limits")
else:
    print("WARNING: Too cold for launch")`
  },
  {
    title: "5. if-elif-else: Multiple Conditions",
    content: `When you have more than two possibilities, use elif (short for "else if"). Python checks each condition in order and runs the FIRST one that's True.

The else at the end catches anything that didn't match above - it's optional but often useful as a "default" case.`,
    codeExample: `# Mission phase based on altitude
altitude = 150

if altitude == 0:
    phase = "Pre-launch"
elif altitude < 100:
    phase = "Initial ascent"
elif altitude < 400:
    phase = "Climbing to orbit"
elif altitude < 500:
    phase = "Orbital insertion"
else:
    phase = "Deep space"

print("Current phase:", phase)
# Output: "Current phase: Climbing to orbit"

# Only ONE branch runs, even if multiple could be True`
  },
  {
    title: "6. Logical Operators: and, or, not",
    content: `Combine multiple conditions using logical operators. This lets you make complex decisions based on several factors at once.`,
    tableData: {
      headers: ["Operator", "Result is True when...", "Example"],
      rows: [
        ["and", "BOTH conditions are True", "fuel > 90 and temp > -50"],
        ["or", "AT LEAST ONE is True", "fuel < 10 or engine_fail"],
        ["not", "The condition is False", "not is_aborted"]
      ]
    },
    codeExample: `# Launch requires multiple conditions
fuel = 95
systems_ready = True
weather_clear = True

# All must be True
if fuel >= 90 and systems_ready and weather_clear:
    print("All systems GO!")

# Emergency: any ONE triggers abort
engine_alarm = False
fire_detected = False
hull_breach = True

if engine_alarm or fire_detected or hull_breach:
    print("ABORT! Emergency detected")

# Inverting a condition
is_aborted = False
if not is_aborted:
    print("Mission is still active")`
  },
  {
    title: "7. Nested Conditionals",
    content: `You can put if statements inside other if statements. This creates a hierarchy of decisions - the inner conditions only check if the outer condition was True.

Use nested conditionals when decisions depend on previous decisions. But don't nest too deep (2-3 levels max) or code becomes hard to read.`,
    codeExample: `# Launch decision tree
fuel_level = 95
crew_ready = True
weather = "clear"

if fuel_level >= 90:
    print("Fuel: GO")
    if crew_ready:
        print("Crew: GO")
        if weather == "clear":
            print("Weather: GO")
            print(">>> LAUNCH AUTHORIZED <<<")
        else:
            print("Weather: NO-GO - Holding for conditions")
    else:
        print("Crew: NO-GO - Awaiting crew status")
else:
    print("Fuel: NO-GO - Cannot proceed")

# Alternative: combine with 'and' for simpler code
if fuel_level >= 90 and crew_ready and weather == "clear":
    print("All conditions met - LAUNCH!")`
  }
];

// ============================================================================
// CHALLENGES - 7 progressive decision-making tasks
// ============================================================================

export const level2Challenges: Challenge[] = [
  {
    id: 1,
    title: "Go/No-Go",
    description: `Before launch, Mission Control performs a Go/No-Go check. Your task:

1. A variable fuel_level is set to 95
2. If fuel_level is greater than or equal to 90, print "GO for launch!"
3. If not, print nothing (the code simply doesn't execute)

This is your first branching decision - the code only runs IF the condition is met.`,
    starterCode: `# MISSION: Go/No-Go Decision
# Check if we're cleared for launch

def go_no_go():
    fuel_level = 95
    
    # Check if fuel is sufficient (>= 90)
    # If so, print "GO for launch!"
    pass

# === Mission Control Test ===
go_no_go()`,
    hint: `Use if fuel_level >= 90: followed by an indented print statement. Remember the colon after the condition!`,
    conceptTags: ["if", "comparison", ">="]
  },
  {
    id: 2,
    title: "Altitude Check",
    description: `The navigation computer needs to compare the current altitude with the target.

Given:
- current_altitude = 380
- target_altitude = 400

Print the results of these comparisons:
1. "At target: " followed by whether current equals target (True/False)
2. "Above minimum (350): " followed by the comparison result
3. "Below maximum (450): " followed by the comparison result

Use the comparison operators ==, >, and < to get Boolean results.`,
    starterCode: `# MISSION: Altitude Check
# Verify orbital position

def check_altitude():
    current_altitude = 380
    target_altitude = 400
    
    # Print three comparison results
    # 1. At target (==)
    # 2. Above minimum 350 (>)
    # 3. Below maximum 450 (<)
    pass

# === Mission Control Test ===
check_altitude()`,
    hint: `Comparisons return True or False directly. print("At target:", current_altitude == target_altitude)`,
    conceptTags: ["comparison", "==", ">", "<", "bool"]
  },
  {
    id: 3,
    title: "System Status",
    description: `The spacecraft's power system needs a status report based on battery level.

Given battery_level = 45 (percent):
- If battery_level >= 50, print "Power: NOMINAL"
- Otherwise, print "Power: LOW - Conserve energy"

The computer must choose ONE of these two messages - never both.`,
    starterCode: `# MISSION: System Status
# Report power system status

def check_power():
    battery_level = 45
    
    # Check battery and print appropriate status
    # >= 50: "Power: NOMINAL"
    # else: "Power: LOW - Conserve energy"
    pass

# === Mission Control Test ===
check_power()`,
    hint: `Use if-else structure. The else branch runs when the if condition is False.`,
    conceptTags: ["if", "else", ">=", "branching"]
  },
  {
    id: 4,
    title: "Launch Window",
    description: `The launch window calculator determines mission phase based on countdown time.

Given countdown = 45 (seconds), determine the phase:
- countdown > 60: print "Phase: HOLDING"
- countdown > 30: print "Phase: FINAL CHECKS"  
- countdown > 10: print "Phase: TERMINAL COUNT"
- countdown > 0: print "Phase: IGNITION SEQUENCE"
- countdown <= 0: print "Phase: LIFTOFF!"

Only ONE phase should print based on where countdown falls.`,
    starterCode: `# MISSION: Launch Window
# Determine current launch phase

def launch_phase():
    countdown = 45
    
    # Use if-elif-else to determine phase
    # Check conditions from highest to lowest
    pass

# === Mission Control Test ===
launch_phase()`,
    hint: `Use if-elif-elif-elif-else chain. Check countdown > 60 first, then > 30, etc. Order matters!`,
    conceptTags: ["if", "elif", "else", "chain"]
  },
  {
    id: 5,
    title: "Multi-Condition Check",
    description: `Launch authorization requires ALL systems to be ready:

Given:
- fuel_status = True
- navigation_status = True  
- life_support_status = False

1. If ALL THREE are True, print "LAUNCH AUTHORIZED"
2. Otherwise, print "LAUNCH HOLD - Systems not ready"

Use the 'and' operator to check multiple conditions at once.`,
    starterCode: `# MISSION: Multi-System Check
# Verify all systems before launch

def systems_check():
    fuel_status = True
    navigation_status = True
    life_support_status = False
    
    # Check if ALL systems are True using 'and'
    # Print appropriate message
    pass

# === Mission Control Test ===
systems_check()`,
    hint: `Use: if fuel_status and navigation_status and life_support_status: to check all three. All must be True for the condition to pass.`,
    conceptTags: ["and", "logical", "bool", "multiple conditions"]
  },
  {
    id: 6,
    title: "Safety Protocol",
    description: `Implement a nested safety check system:

Given:
- primary_power = True
- backup_power = True
- hull_integrity = 98 (percent)

The check works like this:
1. First check if primary_power is True
   - If True: print "Primary power: ONLINE"
   - Then check if backup_power is True
     - If True: print "Backup power: STANDBY"
     - Then check if hull_integrity >= 95
       - If True: print "Hull integrity: NOMINAL"
         print ">>> ALL SYSTEMS GO <<<"
       - Else: print "Hull integrity: COMPROMISED"
2. If primary_power is False: print "CRITICAL: No primary power"`,
    starterCode: `# MISSION: Safety Protocol
# Nested system verification

def safety_check():
    primary_power = True
    backup_power = True
    hull_integrity = 98
    
    # Implement nested conditionals
    # Check primary -> backup -> hull
    pass

# === Mission Control Test ===
safety_check()`,
    hint: `Indent each nested if inside the previous one. The inner checks only run if outer checks pass.`,
    conceptTags: ["nested", "if", "indentation", "hierarchy"]
  },
  {
    id: 7,
    title: "Flight Director",
    description: `You are the Flight Director making the final launch decision. Gather all inputs and make the call.

Your program should:
1. Get fuel_level from user input (as integer)
2. Get weather_status from user input (string: "clear" or "stormy")
3. Get crew_count from user input (as integer)

Make the decision:
- If fuel >= 90 AND weather is "clear" AND crew_count >= 3:
  Print "FLIGHT DIRECTOR: GO FOR LAUNCH!"
- Else if fuel < 90:
  Print "HOLD: Insufficient fuel"
- Else if weather != "clear":
  Print "HOLD: Weather conditions"
- Else:
  Print "HOLD: Insufficient crew"

This combines ALL concepts from this level!`,
    starterCode: `# MISSION: Flight Director Decision
# The final launch authority

def flight_director():
    # Get inputs (remember type casting!)
    fuel_level = int(input("Enter fuel level (%): "))
    weather_status = input("Enter weather status: ")
    crew_count = int(input("Enter crew count: "))
    
    # Make the launch decision
    # Check all conditions and report status
    pass

# === Mission Control Test ===
flight_director()`,
    hint: `Use combined conditions with 'and' for the GO case. Then use elif to check each individual failure reason. Remember: weather comparison is weather_status == "clear"`,
    conceptTags: ["synthesis", "and", "if-elif-else", "input", "type-casting"]
  }
];
