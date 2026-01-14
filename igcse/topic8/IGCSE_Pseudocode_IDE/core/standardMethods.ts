
import { DescribableItem } from '../App';

const studentMarksSetup = `DECLARE StudentMarks : ARRAY[1:10] OF INTEGER
CONSTANT ClassSize <- 10
DECLARE i : INTEGER

// Initialise array with sample marks
StudentMarks[1] <- 75
StudentMarks[2] <- 82
StudentMarks[3] <- 65
StudentMarks[4] <- 91
StudentMarks[5] <- 88
StudentMarks[6] <- 79
StudentMarks[7] <- 95
StudentMarks[8] <- 100
StudentMarks[9] <- 68
StudentMarks[10] <- 85

`;

export const standardMethods: DescribableItem[] = [
  {
    title: 'Total',
    description: `The Total algorithm iterates through a list (array) of numbers and adds each number to a running total variable. 

It's a fundamental building block for many other algorithms, like calculating an average. The 'Total' variable must be initialized to zero before the loop begins.`,
    code: `// This algorithm calculates the total of all marks for a class.
${studentMarksSetup}DECLARE Total : INTEGER

// Initialize Total to zero
Total <- 0

// Loop through the array and add each mark to Total
FOR i <- 1 TO ClassSize
    Total <- Total + StudentMarks[i]
NEXT i

OUTPUT "The total of all marks is: ", Total`
  },
  {
    title: 'Count',
    description: `The Count algorithm iterates through a list and increments a counter variable each time a specific condition is met. 

This is useful for finding out how many items in a list share a certain property, for example, counting how many students passed an exam or achieved a perfect score. The counter must be initialized to zero.`,
    code: `// This algorithm counts how many students scored a perfect 100.
${studentMarksSetup}DECLARE PerfectCount : INTEGER

// Initialize counter
PerfectCount <- 0

// Loop through the array and check each mark
FOR i <- 1 TO ClassSize
    IF StudentMarks[i] = 100 THEN
        PerfectCount <- PerfectCount + 1
    ENDIF
NEXT i

OUTPUT "Number of perfect scores: ", PerfectCount`
  },
  {
    title: 'Average',
    description: `The Average is calculated by first finding the total of all values in a list (using the Total algorithm) and then dividing by the number of values in that list.

It's important to use a REAL data type for the 'Average' variable to handle potential decimal values accurately.`,
    code: `// This algorithm calculates the average mark for a class.
${studentMarksSetup}DECLARE Total : INTEGER
DECLARE Average : REAL

// First, calculate the total
Total <- 0
FOR i <- 1 TO ClassSize
    Total <- Total + StudentMarks[i]
NEXT i

// Then, calculate the average
Average <- Total / ClassSize

OUTPUT "The average mark is: ", Average`
  },
  {
    title: 'Finding Minimum & Maximum',
    description: `These algorithms find the smallest (minimum) or largest (maximum) value in a list.

They work by initializing a variable (e.g., 'MaximumMark') to the value of the first element in the array. The algorithm then iterates through the rest of the array, updating this variable whenever a larger (or smaller) element is found.`,
    code: `// This algorithm finds the minimum and maximum marks in the list.
${studentMarksSetup}DECLARE MinimumMark : INTEGER
DECLARE MaximumMark : INTEGER

// Initialize min and max with the value of the first element
MinimumMark <- StudentMarks[1]
MaximumMark <- StudentMarks[1]

// Loop from the second element to the end
FOR i <- 2 TO ClassSize
    IF StudentMarks[i] > MaximumMark THEN
        MaximumMark <- StudentMarks[i]
    ENDIF

    IF StudentMarks[i] < MinimumMark THEN
        MinimumMark <- StudentMarks[i]
    ENDIF
NEXT i

OUTPUT "Minimum Mark: ", MinimumMark
OUTPUT "Maximum Mark: ", MaximumMark`
  },
  {
    title: 'Linear Search',
    description: `A Linear Search sequentially checks each element of a list from the beginning to the end, until a match for the target value is found or the whole list has been searched.

It's a simple search method but can be inefficient for very large lists as it may have to check every single item. A boolean flag is often used to stop the search once the item is found.`,
    code: `// This algorithm performs a linear search to find a mark in the list.
${studentMarksSetup}DECLARE MarkToFind : INTEGER
DECLARE Found : BOOLEAN
DECLARE Counter : INTEGER

Found <- FALSE
Counter <- 1

OUTPUT "Enter the mark to find:"
INPUT MarkToFind

// Loop until the item is found or the end of the array is reached
REPEAT
    IF StudentMarks[Counter] = MarkToFind THEN
        Found <- TRUE
    ELSE
        Counter <- Counter + 1
    ENDIF
UNTIL Found = TRUE OR Counter > ClassSize

IF Found = TRUE THEN
    OUTPUT "Mark ", MarkToFind, " found at position ", Counter, "."
ELSE
    OUTPUT "Mark ", MarkToFind, " was not found in the list."
ENDIF`
  },
  {
    title: 'Bubble Sort',
    description: `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.

While simple to understand, Bubble Sort is not efficient for large datasets compared to more advanced algorithms.`,
    code: `// Sorts an array into ascending order using Bubble Sort.
${studentMarksSetup}DECLARE Temp : INTEGER
DECLARE Swapped : BOOLEAN

OUTPUT "Array before sorting:"
FOR i <- 1 TO ClassSize
    OUTPUT StudentMarks[i]
NEXT i

// The sorting process
REPEAT
    Swapped <- FALSE
    FOR i <- 1 TO ClassSize - 1
        IF StudentMarks[i] > StudentMarks[i+1] THEN
            // Swap the elements
            Temp <- StudentMarks[i]
            StudentMarks[i] <- StudentMarks[i+1]
            StudentMarks[i+1] <- Temp
            Swapped <- TRUE
        ENDIF
    NEXT i
UNTIL Swapped = FALSE

OUTPUT ""
OUTPUT "Array after sorting:"
FOR i <- 1 TO ClassSize
    OUTPUT StudentMarks[i]
NEXT i`
  }
];