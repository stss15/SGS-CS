# Level 6: Stacks & Queues (Concepts)

## Metadata
| Property | Value |
|----------|-------|
| **Level ID** | 6 |
| **Title** | Stacks & Queues |
| **Syllabus** | B2.2.3, B2.2.4 |
| **Challenge Count** | 5 |
| **Prerequisites** | Level 5 (Lists) |

---

## ⚠️ SPECIAL LEVEL: Theory-Heavy

This level is **primarily conceptual**. The IB syllabus focuses on understanding WHEN to use these structures, not just HOW to implement them. 

**Pedagogical Approach:**
- Fewer coding challenges (5 instead of 8-10)
- Visual explanations of LIFO/FIFO
- Real-world analogies (stack of plates, queue at store)
- Focus on recognizing appropriate use cases
- Include trace exercises in base content

---

## Learning Objectives

By the end of this level, students will be able to:
1. Explain the LIFO principle (Last In, First Out) for stacks
2. Explain the FIFO principle (First In, First Out) for queues
3. Implement stack operations using Python lists
4. Implement queue operations using Python lists
5. Identify scenarios where stacks are appropriate
6. Identify scenarios where queues are appropriate
7. Trace through stack/queue operations

---

## Synoptic Connections

### From Level 5:
- List operations: `.append()`, `.pop()`, `.pop(0)`
- List traversal (to display contents)

### Real-World Analogies:
- **Stack**: Stack of plates, browser back button, undo feature
- **Queue**: Waiting line, print queue, message buffer

---

## Space-Themed Variables

```
# Stacks
undo_stack, command_history, navigation_stack
action, last_action, previous_state

# Queues
message_queue, transmission_queue, task_queue
next_message, incoming, outgoing
```

---

## Base Content Sections

### Section 1: Introduction to ADTs

```typescript
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
}
```

### Section 2: Stack Concept (LIFO)

```typescript
{
  title: "2. Stack: Last In, First Out (LIFO)",
  content: `A stack is like a stack of plates - you can only add or remove from the TOP.

Key operations:
- **Push**: Add item to top
- **Pop**: Remove item from top
- **Peek**: Look at top item without removing

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
print(stack)  # [Home, Settings, Profile]

# Pop (remove from end = top)
last_page = stack.pop()  # "Profile"
print(f"Back to: {last_page}")
print(stack)  # [Home, Settings]`
}
```

### Section 3: Stack Use Cases

```typescript
{
  title: "3. When to Use a Stack",
  content: `Stacks are the right choice when you need LIFO behavior - when the most recent item should be processed first.

Common use cases in computing:
- **Undo/Redo**: Most recent action reversed first
- **Browser Back**: Returns to most recent page
- **Function Calls**: Most recent function returns first
- **Expression Evaluation**: Parsing mathematical expressions`,
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
}
```

### Section 4: Queue Concept (FIFO)

```typescript
{
  title: "4. Queue: First In, First Out (FIFO)",
  content: `A queue is like a line at Mission Control - first person in line is served first.

Key operations:
- **Enqueue**: Add item to back (end of line)
- **Dequeue**: Remove item from front (served first)
- **Peek**: Look at front item without removing

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
print(queue)  # [Earth, Mars, ISS]

# Dequeue (remove from front)
first_msg = queue.pop(0)  # "Message from Earth"
print(f"Processing: {first_msg}")
print(queue)  # [Mars, ISS]`
}
```

### Section 5: Queue Use Cases

```typescript
{
  title: "5. When to Use a Queue",
  content: `Queues are the right choice when fairness matters - first come, first served.

Common use cases in computing:
- **Print Queue**: First document sent prints first
- **Message Buffer**: Messages processed in order received
- **Task Scheduling**: Tasks completed in order submitted
- **Customer Service**: First caller answered first`,
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
}
```

### Section 6: Choosing Stack vs Queue

```typescript
{
  title: "6. Stack vs Queue: Making the Right Choice",
  content: `The key question: What ORDER should items be processed?

Ask yourself:
- Should the NEWEST item be handled first? → Stack (LIFO)
- Should the OLDEST item be handled first? → Queue (FIFO)`,
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
back_to = nav_history.pop()  # Goes to "Products"

# Example: Task queue (Queue)
# Tasks completed in order assigned
task_queue = []
task_queue.append("System check")
task_queue.append("Fuel load")
task_queue.append("Launch prep")
next_task = task_queue.pop(0)  # Does "System check" first`
}
```

---

## Challenges

### Challenge 1: Undo Stack

```typescript
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
}
```

### Challenge 2: Action Replay

```typescript
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
}
```

### Challenge 3: Transmission Queue

```typescript
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
}
```

### Challenge 4: Message Processing

```typescript
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
}
```

### Challenge 5: Command Center

```typescript
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
```

---

## Trace Exercises (Include in Base Content)

### Trace Exercise 1: Stack Operations
```
Starting stack: []
Operations: push(10), push(20), push(30), pop(), push(40), pop(), pop()

Complete the trace table:
| Step | Operation | Stack After | Returned |
|------|-----------|-------------|----------|
| 1    | push(10)  | [10]        | -        |
| 2    | push(20)  | ?           | ?        |
| ...  | ...       | ...         | ...      |
```

### Trace Exercise 2: Queue Operations
```
Starting queue: []
Operations: enqueue(A), enqueue(B), dequeue(), enqueue(C), dequeue(), enqueue(D)

Complete the trace table:
| Step | Operation   | Queue After | Returned |
|------|-------------|-------------|----------|
| 1    | enqueue(A)  | [A]         | -        |
| 2    | enqueue(B)  | ?           | ?        |
| ...  | ...         | ...         | ...      |
```

---

## Implementation Notes

### Files to Modify

1. **`data/level6_content.ts`** - Create with content above
2. **`data/roadmap.ts`** - Update Level 6 tasks:
```typescript
{
  id: 6,
  title: "Stacks & Queues (Concepts)",
  syllabus: "B2.2.3, B2.2.4",
  description: "Order operations for launch.",
  tasks: [
    { id: "6-1", text: "Stack concept: LIFO principle" },
    { id: "6-2", text: "Stack operations: push, pop with lists" },
    { id: "6-3", text: "Queue concept: FIFO principle" },
    { id: "6-4", text: "Queue operations: enqueue, dequeue with lists" },
    { id: "6-5", text: "Choosing: when to use stack vs queue" }
  ]
}
```

### Key IB Points
- Focus on CONCEPT over implementation
- Students must be able to EXPLAIN when each is appropriate
- Trace tables are important for exam preparation
- Real-world examples help cement understanding

### Common Misconceptions
- "Stack" doesn't mean "pile up" - it's specifically LIFO
- Queue.pop(0) is less efficient than collections.deque, but conceptually clear
- Not every list is a stack or queue - it depends on how you USE it

---

## Expected Outputs

| Challenge | Key Output |
|-----------|------------|
| 1 | Two undos, "Load fuel" remains |
| 2 | EVA, Dock, Orbit entry, Takeoff (LIFO) |
| 3 | Priority Alert, Status Update sent first |
| 4 | Earth, Mars, ISS (FIFO order) |
| 5 | Commands: System check; Messages: GO signal |

---

*Level 6 Plan - Version 1.0*

