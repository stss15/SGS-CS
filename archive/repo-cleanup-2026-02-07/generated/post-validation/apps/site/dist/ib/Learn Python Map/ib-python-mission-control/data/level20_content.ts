/**
 * Level 20: Hashing & Dictionaries (HL)
 * IB Syllabus Reference: B4.1.6
 *
 * Learning Objectives:
 * - Understand hashing fundamentals and hash functions
 * - Use Python dictionaries for key-value storage
 * - Understand hash collisions and their implications
 * - Know about load factors and rehashing (theory)
 * - Apply dictionaries for fast lookup operations
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Hash tables and dictionaries
// ============================================================================

export const level20BaseContent: LessonSection[] = [
  {
    title: "1. What is Hashing?",
    content: `Hashing is a technique to convert data (keys) into fixed-size numbers (hash values) that act as indexes in an array-like structure called a hash table.

Why hashing matters:
- Enables O(1) average lookup time (vs O(N) for lists)
- Powers Python dictionaries and sets
- Used in databases, caches, and security

How it works:
1. Take a key (e.g., "Apollo")
2. Apply a hash function to get a number (e.g., 7)
3. Use that number as an index to store/retrieve the value

Python handles hashing automatically when you use dictionaries!`,
    codeExample: `# Python's built-in hash function
print(hash("Apollo"))    # Large number (varies)
print(hash("Gemini"))    # Different number
print(hash(42))          # Numbers hash to themselves

# Same input = same hash (within same Python session)
print(hash("Apollo") == hash("Apollo"))  # True

# Dictionaries use hashing internally
missions = {"Apollo": 11, "Gemini": 8, "Mercury": 6}
print(missions["Apollo"])  # O(1) lookup!`
  },
  {
    title: "2. Dictionary Fundamentals",
    content: `A dictionary stores key-value pairs. Keys must be immutable (strings, numbers, tuples) and unique. Values can be anything.`,
    tableData: {
      headers: ["Operation", "Syntax", "Complexity"],
      rows: [
        ["Create", "d = {} or dict()", "O(1)"],
        ["Add/Update", "d[key] = value", "O(1) average"],
        ["Get", "d[key] or d.get(key)", "O(1) average"],
        ["Delete", "del d[key]", "O(1) average"],
        ["Check key", "key in d", "O(1) average"],
        ["Get keys", "d.keys()", "O(1)"],
        ["Get values", "d.values()", "O(1)"],
        ["Get items", "d.items()", "O(1)"]
      ]
    },
    codeExample: `# Creating dictionaries
crew = {"commander": "Neil", "pilot": "Buzz", "engineer": "Michael"}

# Accessing values
print(crew["commander"])       # "Neil"
print(crew.get("medic", "N/A")) # "N/A" (default if missing)

# Modifying
crew["commander"] = "Armstrong"  # Update
crew["scientist"] = "Sally"      # Add new

# Checking keys
if "pilot" in crew:
    print("Pilot assigned!")

# Iterating
for role, name in crew.items():
    print(f"{role}: {name}")`
  },
  {
    title: "3. Hash Collisions",
    content: `A collision occurs when two different keys produce the same hash value. Since hash tables have limited size, collisions are inevitable.

Example: If our hash table has 10 slots, and hash("Apollo") % 10 = 7 and hash("Voyager") % 10 = 7, both want slot 7!

Collision Resolution Strategies:
1. Chaining: Each slot holds a list of items
2. Open Addressing: Find the next empty slot

Python dictionaries handle collisions automatically using a sophisticated probing technique.`,
    codeExample: `# Demonstrating collision concept (simplified)
table_size = 10

def simple_hash(key):
    return hash(key) % table_size

# These might collide!
print(f"Apollo -> slot {simple_hash('Apollo')}")
print(f"Gemini -> slot {simple_hash('Gemini')}")

# Python handles this automatically in dicts
# No need to worry about it in practice!
missions = {}
missions["Apollo"] = 11   # Stored at some slot
missions["Gemini"] = 8    # Might collide, Python handles it
print(missions["Apollo"]) # Still works!`,
    tableData: {
      headers: ["Strategy", "How It Works", "Trade-off"],
      rows: [
        ["Chaining", "List at each slot", "Extra memory for lists"],
        ["Linear Probing", "Check next slot", "Clustering can occur"],
        ["Quadratic Probing", "Check slot+1², slot+2²...", "Less clustering"]
      ]
    }
  },
  {
    title: "4. Load Factor & Rehashing",
    content: `The load factor measures how full a hash table is:

Load Factor = Number of items / Table size

When load factor gets too high (typically > 0.7):
- More collisions occur
- Performance degrades
- Solution: REHASH - create larger table, re-insert all items

This is why dictionary operations are O(1) "on average" - occasionally a resize operation takes longer.`,
    codeExample: `# Load factor concept
items = 70
table_size = 100
load_factor = items / table_size  # 0.7 = 70%

# When Python dict gets too full:
# 1. Creates new larger table (usually 2x size)
# 2. Rehashes all existing items
# 3. Inserts them into new table

# You don't have to manage this!
big_dict = {}
for i in range(10000):
    big_dict[f"key_{i}"] = i
# Python automatically resizes as needed

print(f"Items: {len(big_dict)}")  # 10000
print(big_dict["key_5000"])       # Still O(1)!`
  },
  {
    title: "5. When to Use Dictionaries",
    content: `Dictionaries excel when you need:
- Fast lookup by key (O(1) vs O(N) for lists)
- Key-value associations
- Counting occurrences
- Caching computed results
- Database-like records

Avoid dictionaries when:
- Order matters (use list instead, though dicts now preserve insertion order)
- Simple sequential access
- Memory is extremely limited`,
    codeExample: `# Use Case 1: Fast lookup
sensor_data = {"temp": 273, "pressure": 101, "humidity": 45}
print(sensor_data["temp"])  # O(1)!

# Use Case 2: Counting
readings = ["OK", "WARN", "OK", "ERROR", "OK", "WARN"]
counts = {}
for status in readings:
    counts[status] = counts.get(status, 0) + 1
print(counts)  # {'OK': 3, 'WARN': 2, 'ERROR': 1}

# Use Case 3: Caching (Memoization)
cache = {}
def expensive_calculation(n):
    if n in cache:
        return cache[n]  # O(1) lookup!
    result = n ** 2  # Simulate expensive operation
    cache[n] = result
    return result`
  },
  {
    title: "6. Dictionary vs Set vs List",
    content: `Choose the right data structure for your needs:`,
    tableData: {
      headers: ["Operation", "List", "Set", "Dictionary"],
      rows: [
        ["Lookup by index", "O(1)", "N/A", "N/A"],
        ["Lookup by value", "O(N)", "O(1)", "O(1) by key"],
        ["Add item", "O(1) append", "O(1)", "O(1)"],
        ["Remove item", "O(N)", "O(1)", "O(1)"],
        ["Check membership", "O(N)", "O(1)", "O(1)"],
        ["Duplicates", "Allowed", "No", "Keys unique"],
        ["Order", "Maintained", "No*", "Maintained*"]
      ]
    },
    codeExample: `# Choosing the right structure
# Need ordered sequence -> List
crew_order = ["Neil", "Buzz", "Michael"]

# Need unique items, fast membership -> Set
visited_planets = {"Earth", "Moon", "Mars"}

# Need key-value pairs, fast lookup -> Dictionary
mission_years = {"Apollo 11": 1969, "Voyager 1": 1977}

# Performance comparison
import time

# Finding in list vs dict
big_list = list(range(100000))
big_dict = {i: True for i in range(100000)}

# dict lookup is MUCH faster for large collections!`
  }
];

// ============================================================================
// CHALLENGES - 4 hashing and dictionary missions
// ============================================================================

export const level20Challenges: Challenge[] = [
  {
    id: 1,
    title: "Mission Database",
    description: `Create a mission database using a dictionary to store and retrieve mission data efficiently.

Requirements:
1. Create missions dict with at least 3 missions
2. Each key is mission name (string)
3. Each value is another dict with: year, crew_size, destination
4. Implement get_mission(name) - returns mission data or "Mission not found"
5. Implement add_mission(name, year, crew_size, destination)

Test with lookups for existing and non-existing missions.`,
    starterCode: `# MISSION: Mission Database

missions = {
    "Apollo 11": {"year": 1969, "crew_size": 3, "destination": "Moon"},
    # Add more missions
}

def get_mission(name):
    # Return mission data or "Mission not found"
    pass

def add_mission(name, year, crew_size, destination):
    # Add new mission to database
    pass

# === Mission Control Test ===
print(get_mission("Apollo 11"))
print(get_mission("Voyager 1"))

add_mission("Mars 2030", 2030, 6, "Mars")
print(get_mission("Mars 2030"))`,
    hint: `Use missions.get(name, "Mission not found") for safe lookup. For add_mission, create a new dict and assign it: missions[name] = {"year": year, ...}`,
    conceptTags: ["dictionary", "key-value", "lookup"]
  },
  {
    id: 2,
    title: "Signal Counter",
    description: `Count signal frequencies from a communication log using a dictionary.

Given a list of signal codes, count how many times each appears.

Requirements:
1. Take a list of signal codes (strings)
2. Return a dictionary with {code: count}
3. Handle codes you haven't seen before

Test with: ["ALPHA", "BETA", "ALPHA", "GAMMA", "BETA", "ALPHA"]
Expected: {"ALPHA": 3, "BETA": 2, "GAMMA": 1}`,
    starterCode: `# MISSION: Signal Counter

def count_signals(signals):
    counts = {}
    for signal in signals:
        # Count each signal
        pass
    return counts

# === Mission Control Test ===
log = ["ALPHA", "BETA", "ALPHA", "GAMMA", "BETA", "ALPHA", "DELTA", "ALPHA"]
result = count_signals(log)

print("Signal frequencies:")
for signal, count in result.items():
    print(f"  {signal}: {count}")

# Find most common signal
most_common = max(result, key=result.get)
print(f"\\nMost common: {most_common}")`,
    hint: `Use counts.get(signal, 0) to get current count (defaulting to 0), then add 1 and assign back: counts[signal] = counts.get(signal, 0) + 1`,
    conceptTags: ["dictionary", "counting", "iteration"]
  },
  {
    id: 3,
    title: "Crew Lookup System",
    description: `Build a fast crew lookup system where you can find crew members by their ID.

Requirements:
1. Create crew_by_id dict from a list of crew dicts
2. Each crew dict has: id, name, role, mission
3. Build a lookup dict where key=id, value=crew dict
4. Implement find_crew(crew_id) - O(1) lookup!
5. Compare to searching a list (conceptually)`,
    starterCode: `# MISSION: Crew Lookup System

crew_list = [
    {"id": "A001", "name": "Neil Armstrong", "role": "Commander", "mission": "Apollo 11"},
    {"id": "A002", "name": "Buzz Aldrin", "role": "Pilot", "mission": "Apollo 11"},
    {"id": "A003", "name": "Michael Collins", "role": "Pilot", "mission": "Apollo 11"},
    {"id": "G001", "name": "John Glenn", "role": "Pilot", "mission": "Mercury 6"},
]

# Build the lookup dictionary
crew_by_id = {}
for crew in crew_list:
    # Add to lookup dict
    pass

def find_crew(crew_id):
    # O(1) lookup using the dictionary
    pass

# === Mission Control Test ===
print("Finding A002:", find_crew("A002"))
print("Finding G001:", find_crew("G001"))
print("Finding X999:", find_crew("X999"))

# Why is this better than searching the list?
# List search: O(N) - check each item
# Dict lookup: O(1) - direct access by key`,
    hint: `Build lookup: crew_by_id[crew["id"]] = crew. For find_crew, use crew_by_id.get(crew_id, "Not found") for safe access.`,
    conceptTags: ["dictionary", "indexing", "O(1)-lookup"]
  },
  {
    id: 4,
    title: "Hash Table Simulation",
    description: `Simulate a simple hash table to understand how dictionaries work internally.

Create a SimpleHashTable class with:
1. Fixed size table (list of lists for chaining)
2. _hash(key) - returns key's hash % table_size
3. put(key, value) - stores at hashed position
4. get(key) - retrieves value by key
5. show() - displays table structure

This demonstrates chaining collision resolution.`,
    starterCode: `# MISSION: Hash Table Simulation

class SimpleHashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # List of lists
    
    def _hash(self, key):
        # Return hash(key) % self.size
        pass
    
    def put(self, key, value):
        # Find slot, append (key, value) tuple
        pass
    
    def get(self, key):
        # Find slot, search for key, return value
        pass
    
    def show(self):
        # Display table structure
        for i, bucket in enumerate(self.table):
            print(f"Slot {i}: {bucket}")

# === Mission Control Test ===
ht = SimpleHashTable(5)  # Small table to see collisions

ht.put("Apollo", 11)
ht.put("Gemini", 8)
ht.put("Mercury", 6)
ht.put("Voyager", 1)
ht.put("Pioneer", 10)

print("Hash Table Structure:")
ht.show()

print("\\nLookups:")
print(f"Apollo: {ht.get('Apollo')}")
print(f"Voyager: {ht.get('Voyager')}")`,
    hint: `For put: slot = self._hash(key), then self.table[slot].append((key, value)). For get: find slot, loop through bucket looking for matching key.`,
    conceptTags: ["hash-table", "chaining", "collision"]
  }
];

