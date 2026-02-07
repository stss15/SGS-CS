/**
 * Level 14: Recursive Algorithms (HL)
 * IB Syllabus Reference: B2.4.4, B2.4.5
 *
 * Learning Objectives:
 * - Identify base and recursive cases
 * - Trace recursive call stacks
 * - Implement factorial, Fibonacci, and recursive binary search
 * - Understand stack depth limits
 */

import { LessonSection, Challenge } from './level1_content';

// ============================================================================
// BASE CONTENT - Core recursion patterns
// ============================================================================

export const level14BaseContent: LessonSection[] = [
  {
    title: "1. Recursion: Functions Calling Themselves",
    content: `Recursion is when a function calls itself to solve a problem. It breaks a big problem into smaller versions of the same problem.

Every recursive function needs:
1. Base case - when to STOP (prevent infinite recursion)
2. Recursive case - how to reduce the problem and call itself`,
    codeExample: `# Simple countdown using recursion
def countdown(n):
    if n <= 0:           # Base case
        print("Liftoff!")
    else:
        print(n)
        countdown(n - 1) # Recursive call (n gets smaller)

countdown(5)
# 5, 4, 3, 2, 1, Liftoff!`
  },
  {
    title: "2. Factorial: The Classic Example",
    content: `Factorial: n! = n × (n-1) × (n-2) × ... × 1
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- Base case: 0! = 1 and 1! = 1`,
    codeExample: `def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120`
  },
  {
    title: "3. Fibonacci Sequence",
    content: `Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13...
Each number is the sum of the two before it.
- Base cases: fib(0) = 0, fib(1) = 1
- Recursive: fib(n) = fib(n-1) + fib(n-2)`,
    codeExample: `def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(fibonacci(i), end=" ")
# 0 1 1 2 3 5 8 13 21 34`
  },
  {
    title: "4. Binary Search Recursively",
    content: `Binary search can be written recursively - the search space shrinks with each call.`,
    codeExample: `def binary_search_recursive(arr, target, low, high):
    # Base case: not found
    if low > high:
        return -1
    
    mid = (low + high) // 2
    
    # Base case: found!
    if arr[mid] == target:
        return mid
    # Recursive cases
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, high)
    else:
        return binary_search_recursive(arr, target, low, mid - 1)

data = [10, 20, 30, 40, 50, 60, 70]
print(binary_search_recursive(data, 40, 0, len(data)-1))  # 3`
  },
  {
    title: "5. Tracing the Call Stack",
    content: `Each recursive call adds a frame to the call stack. When base case is reached, frames "unwind" returning values back.`,
    codeExample: `# Visual with print statements:
def factorial_trace(n, indent=0):
    print("  " * indent + f"factorial({n})")
    if n <= 1:
        print("  " * indent + f"returns 1")
        return 1
    result = n * factorial_trace(n - 1, indent + 1)
    print("  " * indent + f"returns {result}")
    return result

factorial_trace(4)`
  },
  {
    title: "6. Recursion Warnings",
    content: `Recursive solutions are elegant but have limits:
- Python has a recursion depth limit (~1000 calls)
- Inefficient recursion (like naive Fibonacci) can be slow
- Always ensure a base case to avoid infinite recursion`
  }
];

// ============================================================================
// CHALLENGES - 6 recursive missions
// ============================================================================

export const level14Challenges: Challenge[] = [
  {
    id: 1,
    title: "Recursive Countdown",
    description: `Create a recursive countdown function.

countdown(n) should:
- Print n
- If n > 0, call countdown(n-1)
- If n <= 0, print "LIFTOFF!"

Test with countdown(5).`,
    starterCode: `# MISSION: Recursive Countdown
def countdown(n):
    # Base case: n <= 0
    # Recursive case: print and call with n-1
    pass

countdown(5)`,
    hint: `if n <= 0: print("LIFTOFF!") else: print(n) and call countdown(n-1)`,
    conceptTags: ["recursion", "base case", "simple"]
  },
  {
    id: 2,
    title: "Orbital Factorial",
    description: `Implement factorial recursively.

factorial(n) returns n!
- Base: factorial(0) = 1, factorial(1) = 1
- Recursive: n * factorial(n-1)

Test with factorial(5) = 120 and factorial(7) = 5040.`,
    starterCode: `# MISSION: Factorial Calculator
def factorial(n):
    # Base case
    # Recursive case
    pass

print(factorial(5))   # 120
print(factorial(7))   # 5040`,
    hint: `if n <= 1: return 1 else: return n * factorial(n-1)`,
    conceptTags: ["factorial", "recursion", "memorize"]
  },
  {
    id: 3,
    title: "Recursive Sum",
    description: `Calculate sum of 1 to n recursively.

sum_to(n) returns 1 + 2 + ... + n
- Base: sum_to(1) = 1
- Recursive: n + sum_to(n-1)

Test: sum_to(5) = 15, sum_to(10) = 55.`,
    starterCode: `# MISSION: Recursive Summation
def sum_to(n):
    pass

print(sum_to(5))   # 15
print(sum_to(10))  # 55`,
    hint: `if n == 1: return 1 else: return n + sum_to(n-1)`,
    conceptTags: ["recursion", "accumulation"]
  },
  {
    id: 4,
    title: "Fibonacci Sequence",
    description: `Implement Fibonacci recursively.

fib(n) returns nth Fibonacci number
- Base: fib(0) = 0, fib(1) = 1
- Recursive: fib(n-1) + fib(n-2)

Print first 10 Fibonacci numbers.`,
    starterCode: `# MISSION: Fibonacci Calculator
def fib(n):
    pass

for i in range(10):
    print(fib(i), end=" ")
# Should print: 0 1 1 2 3 5 8 13 21 34`,
    hint: `Two base cases! if n == 0: return 0, if n == 1: return 1, else return fib(n-1) + fib(n-2)`,
    conceptTags: ["fibonacci", "recursion", "memorize"]
  },
  {
    id: 5,
    title: "Recursive Binary Search",
    description: `Implement binary search recursively.

binary_search(arr, target, low, high) returns index or -1

Base cases:
- low > high: return -1 (not found)
- arr[mid] == target: return mid

Recursive cases:
- target > arr[mid]: search right half
- target < arr[mid]: search left half`,
    starterCode: `# MISSION: Recursive Binary Search
def binary_search(arr, target, low, high):
    pass

data = [10, 20, 30, 40, 50, 60, 70, 80]
print(binary_search(data, 50, 0, len(data)-1))  # 4
print(binary_search(data, 25, 0, len(data)-1))  # -1`,
    hint: `mid = (low + high) // 2. Check if found, else recurse with new low/high values.`,
    conceptTags: ["binary search", "recursion", "divide and conquer"]
  },
  {
    id: 6,
    title: "Recursive String Reverse",
    description: `Reverse a string using recursion.

reverse(s) returns s reversed
- Base: empty string or 1 char returns itself
- Recursive: last char + reverse(rest)

Test: reverse("APOLLO") = "OLLOPA"`,
    starterCode: `# MISSION: Recursive Reversal
def reverse(s):
    pass

print(reverse("APOLLO"))  # "OLLOPA"
print(reverse("NASA"))    # "ASAN"`,
    hint: `if len(s) <= 1: return s else: return s[-1] + reverse(s[:-1])`,
    conceptTags: ["recursion", "strings", "synthesis"]
  }
];
