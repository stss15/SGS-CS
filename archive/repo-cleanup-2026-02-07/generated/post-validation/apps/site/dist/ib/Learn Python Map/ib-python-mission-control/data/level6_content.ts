/**
 * Level 6: Stacks & Queues (Concepts)
 * IB Syllabus Reference: B2.2.3, B2.2.4
 *
 * Learning Objectives:
 * - Explain LIFO (Last In, First Out) for stacks
 * - Explain FIFO (First In, First Out) for queues
 * - Implement stack/queue operations with Python lists
 * - Choose the right structure based on ordering needs
 * - Trace stack and queue operations step-by-step
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Concept focus with traces
// ============================================================================

export const level6BaseContent: LessonSection[] = [
  {
    title: "1. Abstract Data Types (ADTs)",
    content: `An Abstract Data Type (ADT) is a logical description of how data is viewed and the operations available. We don't focus on HOW it's implemented, but WHAT it does.

Stacks and Queues are ADTs that control the ORDER in which data is accessed. This order matters in many computing scenarios!

In this level, we'll implement both using Python lists, but remember: the CONCEPT is more important than the specific implementation.`,
    codeExample: `# Both stacks and queues store items
# The difference is ORDER of removal

# Real examples:
# Stack (LIFO): Undo button - last action undone first
# Queue (FIFO): Print jobs - first document prints first`
  },
  {
    title: "2. Stack: Last In, First Out (LIFO)",
    content: `A stack is like a stack of plates - you can only add or remove from the TOP.

Key operations:
- Push: Add item to top
- Pop: Remove item from top
- Peek: Look at top item without removing

The most RECENT item added is the FIRST one removed. This is called LIFO (Last In, First Out).`,
    tableData: {
      headers: ["Operation", "Stack Before", "Action", "Stack After", "Returned"],
      rows: [
        ["push(A)", "[]", "Add A to top", "[A]", "-"],
        ["push(B)", "[A]", "Add B to top", "[A, B]", "-"],
        ["push(C)", "[A, B]", "Add C to top", "[A, B, C]", "-"],
        ["pop()", "[A, B, C]", "Remove top", "[A, B]", "C"],
        ["pop()", "[A, B]", "Remove top", "[A]", "B"]
      ]
    },
    codeExample: `# Stack using a list
stack = []

# Push (add to end = top)
stack.append("Navigate to Home")
stack.append("Navigate to Settings")
stack.append("Navigate to Profile")
print(stack)  # ["Navigate to Home", "Navigate to Settings", "Navigate to Profile"]

# Pop (remove from end = top)
last_page = stack.pop()  # "Navigate to Profile"
print(f"Back to: {last_page}")
print(stack)  # ["Navigate to Home", "Navigate to Settings"]`
  },
  {
    title: "3. When to Use a Stack",
    content: `Stacks are the right choice when you need LIFO behavior - when the most recent item should be processed first.

Common use cases in computing:
- Undo/Redo: Most recent action reversed first
- Browser Back: Returns to most recent page
- Function Calls: Most recent function returns first
- Expression Evaluation: Parsing mathematical expressions`,
    codeExample: `# Undo feature simulation
actions = []

# User performs actions
actions.append("Type 'Hello'")
actions.append("Type ' World'")
actions.append("Make Bold")

print("Actions performed:", actions)

# User clicks Undo
undone = actions.pop()
print(f"Undoing: {undone}")
print("Remaining actions:", actions)

# Another Undo
undone = actions.pop()
print(f"Undoing: {undone}")
print("Remaining actions:", actions)`
  },
  {
    title: "4. Queue: First In, First Out (FIFO)",
    content: `A queue is like a line at Mission Control - first person in line is served first.

Key operations:
- Enqueue: Add item to back (end of line)
- Dequeue: Remove item from front (served first)
- Peek: Look at front item without removing

The FIRST item added is the FIRST one removed. This is called FIFO (First In, First Out).`,
    tableData: {
      headers: ["Operation", "Queue Before", "Action", "Queue After", "Returned"],
      rows: [
        ["enqueue(A)", "[]", "Add A to back", "[A]", "-"],
        ["enqueue(B)", "[A]", "Add B to back", "[A, B]", "-"],
        ["enqueue(C)", "[A, B]", "Add C to back", "[A, B, C]", "-"],
        ["dequeue()", "[A, B, C]", "Remove front", "[B, C]", "A"],
        ["dequeue()", "[B, C]", "Remove front", "[C]", "B"]
      ]
    },
    codeExample: `# Queue using a list
queue = []

# Enqueue (add to end)
queue.append("Message from Earth")
queue.append("Message from Mars Rover")
queue.append("Message from ISS")
print(queue)  # ["Message from Earth", "Message from Mars Rover", "Message from ISS"]

# Dequeue (remove from front)
first_msg = queue.pop(0)  # "Message from Earth"
print(f"Processing: {first_msg}")
print(queue)  # ["Message from Mars Rover", "Message from ISS"]`
  },
  {
    title: "5. When to Use a Queue",
    content: `Queues are the right choice when fairness matters - first come, first served.

Common use cases in computing:
- Print Queue: First document sent prints first
- Message Buffer: Messages processed in order received
- Task Scheduling: Tasks completed in order submitted
- Customer Service: First caller answered first`,
    codeExample: `# Mission message queue
incoming_messages = []

# Messages arrive
incoming_messages.append("Launch authorization - T-30 min")
incoming_messages.append("Weather update - Clear")
incoming_messages.append("Crew status - All GO")

print("Messages waiting:", len(incoming_messages))

# Process in order received (FIFO)
while len(incoming_messages) > 0:
    msg = incoming_messages.pop(0)  # Dequeue front
    print(f"Processing: {msg}")

print("All messages processed")`
  },
  {
    title: "6. Stack vs Queue: Making the Right Choice",
    content: `The key question: What ORDER should items be processed?

Ask yourself:
- Should the NEWEST item be handled first? -> Stack (LIFO)
- Should the OLDEST item be handled first? -> Queue (FIFO)`,
    tableData: {
      headers: ["Scenario", "Order Needed", "Structure"],
      rows: [
        ["Undo button", "Most recent first", "Stack"],
        ["Print jobs", "First submitted first", "Queue"],
        ["Browser back", "Most recent page", "Stack"],
        ["Customer service calls", "First caller first", "Queue"],
        ["Recursive function calls", "Most recent returns", "Stack"],
        ["Message buffer", "Oldest message first", "Queue"]
      ]
    },
    codeExample: `# Example: Navigation history (Stack)
# When you go back, you return to MOST RECENT page
nav_history = []
nav_history.append("Home")
nav_history.append("Products")
nav_history.append("Product Detail")
back_to = nav_history.pop()  # Goes to "Product Detail"

# Example: Task queue (Queue)
# Tasks completed in order assigned
task_queue = []
task_queue.append("System check")
task_queue.append("Fuel load")
task_queue.append("Launch prep")
next_task = task_queue.pop(0)  # Does "System check" first`
  },
  {
    title: "7. Trace Exercise: Stack Operations",
    content: `Trace the stack after each operation. Fill in the missing values to practice LIFO thinking.`,
    tableData: {
      headers: ["Step", "Operation", "Stack After", "Returned"],
      rows: [
        ["1", "push(10)", "[10]", "-"],
        ["2", "push(20)", "?", "?"],
        ["3", "push(30)", "?", "?"],
        ["4", "pop()", "?", "?"],
        ["5", "push(40)", "?", "?"],
        ["6", "pop()", "?", "?"],
        ["7", "pop()", "?", "?"]
      ]
    },
    codeExample: `# Starting stack: []
# Operations: push(10), push(20), push(30), pop(), push(40), pop(), pop()`
  },
  {
    title: "8. Trace Exercise: Queue Operations",
    content: `Trace the queue after each operation. Fill in the missing values to practice FIFO thinking.`,
    tableData: {
      headers: ["Step", "Operation", "Queue After", "Returned"],
      rows: [
        ["1", "enqueue(A)", "[A]", "-"],
        ["2", "enqueue(B)", "?", "?"],
        ["3", "dequeue()", "?", "?"],
        ["4", "enqueue(C)", "?", "?"],
        ["5", "dequeue()", "?", "?"],
        ["6", "enqueue(D)", "?", "?"]
      ]
    },
    codeExample: `# Starting queue: []
# Operations: enqueue(A), enqueue(B), dequeue(), enqueue(C), dequeue(), enqueue(D)`
  }
];

// ============================================================================
// CHALLENGES - 5 focused on conceptual correctness
// ============================================================================

export const level6Challenges: Challenge[] = [
  {
    id: 1,
    title: "Command Undo Stack",
    description: `Implement an undo system using a stack.

Create an empty list called command_stack, then:
1. Push "Initialize systems"
2. Push "Load fuel"
3. Push "Start countdown"
4. Print the stack
5. Pop and print the last command (with "Undoing:")
6. Pop and print the next command (with "Undoing:")
7. Print remaining stack

Remember: append() adds to top, pop() removes from top.`,
    starterCode: `# MISSION: Command Undo System
# Implement undo using a stack

def undo_system():
    command_stack = []
    
    # Push three commands
    
    # Print stack
    
    # Undo twice (pop and print each)
    
    # Print remaining
    pass

# === Mission Control Test ===
undo_system()`,
    hint: `Use .append() to push, .pop() to pop. Pop returns the removed item so you can print it.`,
    conceptTags: ["stack", "push", "pop", "LIFO"]
  },
  {
    id: 2,
    title: "Action Replay",
    description: `Process a stack of recorded actions in LIFO order.

Given action_stack = ["Takeoff", "Orbit entry", "Dock", "EVA"]:
1. Print "Actions recorded:" and list length
2. Process ALL actions in LIFO order (most recent first)
   - Pop each action and print "Replaying: [action]"
3. Continue until stack is empty
4. Print "Replay complete"

This demonstrates the LIFO nature of stacks!`,
    starterCode: `# MISSION: Action Replay
# Process stack in LIFO order

def action_replay():
    action_stack = ["Takeoff", "Orbit entry", "Dock", "EVA"]
    
    # Print initial count
    
    # Process ALL in LIFO order using while loop
    
    # Print completion
    pass

# === Mission Control Test ===
action_replay()`,
    hint: `Use while len(action_stack) > 0: to continue until empty. Pop returns and removes the top item.`,
    conceptTags: ["stack", "LIFO", "while loop", "processing"]
  },
  {
    id: 3,
    title: "Transmission Queue",
    description: `Implement a message queue using FIFO order.

Create an empty list called message_queue, then:
1. Enqueue "Priority Alert"
2. Enqueue "Status Update"
3. Enqueue "Routine Check"
4. Print the queue
5. Dequeue and print the first message (with "Sending:")
6. Dequeue and print the next message (with "Sending:")
7. Print remaining queue

Remember: append() adds to back, pop(0) removes from front.`,
    starterCode: `# MISSION: Transmission Queue
# Implement message queue

def transmission_queue():
    message_queue = []
    
    # Enqueue three messages
    
    # Print queue
    
    # Dequeue twice (pop(0) and print each)
    
    # Print remaining
    pass

# === Mission Control Test ===
transmission_queue()`,
    hint: `Use .append() to enqueue (add to back), .pop(0) to dequeue (remove from front).`,
    conceptTags: ["queue", "enqueue", "dequeue", "FIFO"]
  },
  {
    id: 4,
    title: "Message Processing",
    description: `Process all queued messages in FIFO order.

Given incoming = ["Earth: Launch approved", "Mars: Data ready", "ISS: Crew status"]:
1. Print "Messages pending:" and count
2. Process ALL messages in FIFO order (oldest first)
   - Dequeue each and print "Processing: [message]"
3. Continue until queue is empty
4. Print "All transmissions processed"

This demonstrates the FIFO nature of queues!`,
    starterCode: `# MISSION: Message Processing
# Process queue in FIFO order

def process_messages():
    incoming = ["Earth: Launch approved", "Mars: Data ready", "ISS: Crew status"]
    
    # Print initial count
    
    # Process ALL in FIFO order
    
    # Print completion
    pass

# === Mission Control Test ===
process_messages()`,
    hint: `Use while len(incoming) > 0: and pop(0) inside to process oldest first.`,
    conceptTags: ["queue", "FIFO", "while loop", "processing"]
  },
  {
    id: 5,
    title: "Command Center",
    description: `Build a command center that uses BOTH a stack and a queue appropriately.

You have two types of operations:
- UNDO requests should use a stack (most recent command undone first)
- INCOMING messages should use a queue (oldest message processed first)

1. Create command_history = [] (stack for undo)
2. Create message_buffer = [] (queue for messages)

3. Add commands to history: "System check", "Fuel load", "Launch"
4. Add messages to buffer: "Weather clear", "Crew ready", "GO signal"

5. Undo the last TWO commands (print what's undone)
6. Process the first TWO messages (print what's processed)

7. Print remaining commands and messages`,
    starterCode: `# MISSION: Command Center
# Use stack and queue appropriately

def command_center():
    # Stack for undo (LIFO)
    command_history = []
    
    # Queue for messages (FIFO)
    message_buffer = []
    
    # Add commands (push to stack)
    
    # Add messages (enqueue to queue)
    
    # Undo last 2 commands (pop from stack)
    print("=== UNDO OPERATIONS ===")
    
    # Process first 2 messages (dequeue from queue)
    print("=== MESSAGE PROCESSING ===")
    
    # Print remaining
    print("=== REMAINING ===")
    pass

# === Mission Control Test ===
command_center()`,
    hint: `Stack: append() then pop() for LIFO. Queue: append() then pop(0) for FIFO. Think about WHY each structure fits its purpose!`,
    conceptTags: ["synthesis", "stack", "queue", "LIFO", "FIFO", "appropriate use"]
  }
];
