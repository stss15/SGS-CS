# Implementation Guide

## How to Implement Level Content

This guide explains how to use the level plan files to implement content in the codebase.

---

## Step-by-Step Process

### 1. Read the Level Plan
Each level plan contains:
- **Metadata**: Syllabus references, challenge count
- **Base Content**: Array of `LessonSection` objects
- **Challenges**: Array of `Challenge` objects
- **Implementation Notes**: Codebase-specific guidance

### 2. Create/Update the Content File

**Location:** `data/levelX_content.ts`

**Structure:**
```typescript
/**
 * Level X: [Title]
 * IB Syllabus Reference: [Refs]
 * 
 * Learning Objectives:
 * - [Objective 1]
 * - [Objective 2]
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
// BASE CONTENT
// ============================================================================

export const levelXBaseContent: LessonSection[] = [
  // Copy sections from the level plan
];

// ============================================================================
// CHALLENGES
// ============================================================================

export const levelXChallenges: Challenge[] = [
  // Copy challenges from the level plan
];
```

### 3. Update the Roadmap (if needed)

**Location:** `data/roadmap.ts`

Update the `tasks` array for the level to match the challenge structure:
```typescript
{
  id: X,
  title: "Level Title",
  syllabus: "B2.X.X",
  description: "Space-themed description",
  tasks: [
    { id: "X-1", text: "Challenge 1 summary" },
    { id: "X-2", text: "Challenge 2 summary" },
    // ... more tasks
  ]
}
```

### 4. Verify Import in ActiveLevel.tsx

Ensure the level content is imported:
```typescript
import { levelXChallenges } from '../data/levelX_content';

// In the component:
if (level.id === X) currentLevelChallenges = levelXChallenges;
```

### 5. Verify Import in MissionWorkspace.tsx

Ensure base content is imported:
```typescript
import { levelXBaseContent, levelXChallenges } from '../data/levelX_content';

// In the getContent function:
if (levelId === X) {
  return {
    base: levelXBaseContent,
    challenges: levelXChallenges
  };
}
```

---

## Code Style Guidelines

### Variable Naming (Space Theme)
Use these prefixes/themes for variables:

| Category | Example Variables |
|----------|-------------------|
| **Spacecraft** | spacecraft_name, vessel_id, ship_status |
| **Navigation** | altitude, velocity, orbit_radius, coordinates |
| **Fuel** | fuel_level, propellant_mass, burn_duration |
| **Crew** | crew_count, astronaut_name, commander_id |
| **Mission** | mission_day, target_distance, phase_status |
| **Systems** | is_active, systems_ready, power_level |
| **Communication** | signal_strength, message, transmission |

### Function Naming
- Use action verbs: `calculate_`, `check_`, `process_`, `initialize_`
- Space-themed: `launch_sequence()`, `dock_spacecraft()`, `transmit_signal()`

### Code Examples
- Keep examples short (5-15 lines)
- Include comments explaining each line
- Use realistic space-themed values

---

## Starter Code Template

Every challenge should use this pattern:
```python
# MISSION: [Challenge Title]
# [Brief mission briefing]

def function_name():
    # Instructions as comments
    
    # Starter variables if needed
    
    pass  # Student replaces this

# === Mission Control Test ===
function_name()
```

---

## Testing Checklist

After implementing a level:

- [ ] App starts without errors (`npm run dev`)
- [ ] Level can be selected from roadmap
- [ ] Launch sequence completes
- [ ] Mission Base shows all sections
- [ ] All challenges appear on planet map
- [ ] Each challenge loads correct starter code
- [ ] Run Code button executes Python
- [ ] Hints display correctly
- [ ] Progress saves between sessions

---

## Common Issues and Fixes

### Issue: Challenges don't appear on map
**Fix:** Check that `levelXChallenges` is imported in `ActiveLevel.tsx` and the length is passed to `PlanetMap`.

### Issue: Wrong number of nodes on map
**Fix:** The PlanetMap renders `challengeCount + 2` nodes (base + challenges + extraction). Verify the challenge count is correct.

### Issue: Base content not showing
**Fix:** Check import in `MissionWorkspace.tsx` and ensure the `getLevelContent` function returns the correct arrays.

### Issue: Syntax highlighting broken
**Fix:** Ensure code examples use proper Python syntax with no special characters that might break the markdown parser.

### Issue: Tables not rendering
**Fix:** Verify `tableData` has exactly `headers: string[]` and `rows: string[][]` structure.

---

## File I/O Specific (Level 8)

### Required Files
Create these in `public/mission_data/`:

**mission_log.txt:**
```
Mission Day 1: Launch successful
Mission Day 2: Orbit established
Mission Day 3: System checks complete
Mission Day 4: Solar panels deployed
Mission Day 5: Communication test passed
```

**crew_manifest.csv:**
```
id,name,role,status
001,Armstrong,Commander,Active
002,Collins,Pilot,Active
003,Aldrin,Engineer,Active
```

**sensor_readings.txt:**
```
1623.45
1598.22
1645.78
1612.33
1589.90
```

### Simulating File Operations
Since actual file I/O may be restricted, use string simulation:
```python
# Simulate reading a file
file_content = """Line 1
Line 2
Line 3"""

lines = file_content.split('\n')
for line in lines:
    print(line)
```

---

## OOP Specific (Levels 12-17)

### Single File Constraint
All class definitions go in one file. Structure like this:
```python
# ============================================
# SPACECRAFT CLASS DEFINITIONS
# ============================================

class Spacecraft:
    """Base class for all spacecraft."""
    def __init__(self, name):
        self.name = name
    
    def launch(self):
        return f"{self.name} is launching!"

class Orbiter(Spacecraft):
    """Extended spacecraft for orbital missions."""
    def __init__(self, name, orbit_altitude):
        super().__init__(name)
        self.orbit_altitude = orbit_altitude
    
    def orbit(self):
        return f"Orbiting at {self.orbit_altitude} km"

# ============================================
# MISSION CONTROL TEST
# ============================================

ship = Orbiter("Discovery", 400)
print(ship.launch())
print(ship.orbit())
```

---

## Algorithm Exam Standards (Levels 10-11)

### Linear Search (Must Match IB Pseudocode Pattern)
```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

### Binary Search (Iterative - Exam Standard)
```python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    
    return -1
```

### Bubble Sort (With Early Exit Optimization)
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```

### Selection Sort (Find Minimum Pattern)
```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

---

*Last Updated: December 2024*

