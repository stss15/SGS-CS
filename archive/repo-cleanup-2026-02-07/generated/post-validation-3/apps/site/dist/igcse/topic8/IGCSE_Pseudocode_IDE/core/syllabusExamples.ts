
export interface SyllabusItem {
  title: string;
  code: string;
}

export interface SyllabusSection {
  title: string;
  items: SyllabusItem[];
}

export const syllabusTopics: SyllabusSection[] = [
  {
    title: '8.1 Programming Concepts',
    items: [
      {
        title: 'Variables & Data Types',
        code: `// This example demonstrates variable declaration and assignment.
DECLARE Score : INTEGER
DECLARE PlayerName : STRING
DECLARE Average : REAL
DECLARE IsGameOver : BOOLEAN

Score <- 100
PlayerName <- "Sonic"
Average <- 78.5
IsGameOver <- FALSE

OUTPUT "Player: ", PlayerName
OUTPUT "Score: ", Score
OUTPUT "Average: ", Average
OUTPUT "Game Over: ", IsGameOver`
      },
      {
        title: 'Input & Output',
        code: `// This example shows how to get input from the user and display output.
DECLARE UserName : STRING
DECLARE UserAge : INTEGER

OUTPUT "Please enter your name:"
INPUT UserName

OUTPUT "Please enter your age:"
INPUT UserAge

OUTPUT "Hello, ", UserName, "! You are ", UserAge, " years old."`
      },
      {
        title: 'Selection (IF...THEN)',
        code: `// An example of an IF...THEN...ELSE...ENDIF statement.
DECLARE Grade : INTEGER

OUTPUT "Enter your grade:"
INPUT Grade

IF Grade >= 70 THEN
    OUTPUT "Excellent! You passed with a distinction."
ELSE
    IF Grade >= 50 THEN
        OUTPUT "Good job! You passed."
    ELSE
        OUTPUT "You will need to retake the test."
    ENDIF
ENDIF`
      },
       {
        title: 'Selection (CASE)',
        code: `// An example of a CASE...OF...OTHERWISE...ENDCASE statement.
DECLARE MenuChoice : INTEGER

OUTPUT "Select an option:"
OUTPUT "1. Start New Game"
OUTPUT "2. Load Game"
OUTPUT "3. View High Scores"
INPUT MenuChoice

CASE OF MenuChoice
    1 : OUTPUT "Starting new game..."
    2 : OUTPUT "Loading saved game..."
    3 : OUTPUT "Displaying high scores..."
    OTHERWISE OUTPUT "Invalid choice!"
ENDCASE`
      },
      {
        title: 'Iteration (FOR Loop)',
        code: `// This program uses a FOR...NEXT loop to print a times table.
DECLARE TableNum : INTEGER
DECLARE i : INTEGER

OUTPUT "Which times table would you like?"
INPUT TableNum

FOR i <- 1 TO 10
    OUTPUT i, " x ", TableNum, " = ", i * TableNum
NEXT i`
      },
      {
        title: 'Iteration (WHILE Loop)',
        code: `// A WHILE...DO...ENDWHILE loop that runs as long as the user wants.
DECLARE Continue : STRING
Continue <- "Y"

WHILE Continue = "Y" OR Continue = "y" DO
    OUTPUT "This loop is running."
    OUTPUT "Do you want to run it again? (Y/N)"
    INPUT Continue
ENDWHILE

OUTPUT "Loop finished."`
      },
      {
        title: 'Iteration (REPEAT Loop)',
        code: `// A REPEAT...UNTIL loop for password validation.
// The loop will run at least once.
DECLARE Password : STRING

REPEAT
    OUTPUT "Please enter the password:"
    INPUT Password
UNTIL Password = "secret"

OUTPUT "Access granted."`
      },
    ]
  },
  {
    title: '8.2 Arrays',
    items: [
      {
        title: '1D Arrays',
        code: `// This example shows how to declare, populate, and read from a 1D array.
DECLARE HighScores : ARRAY[1:5] OF INTEGER
DECLARE i : INTEGER

// Populate the array
HighScores[1] <- 98
HighScores[2] <- 95
HighScores[3] <- 88
HighScores[4] <- 82
HighScores[5] <- 76

OUTPUT "Top 5 High Scores:"
FOR i <- 1 TO 5
    OUTPUT "Rank ", i, ": ", HighScores[i]
NEXT i`
      },
      {
        title: '2D Arrays',
        code: `// A 2D array used to represent a tic-tac-toe board.
DECLARE Board : ARRAY[1:3, 1:3] OF CHAR
DECLARE Row : INTEGER
DECLARE Col : INTEGER

// Initialize board
FOR Row <- 1 TO 3
    FOR Col <- 1 TO 3
        Board[Row, Col] <- '-'
    NEXT Col
NEXT Row

// Place some pieces
Board[1, 1] <- 'X'
Board[2, 2] <- 'O'
Board[1, 3] <- 'X'

// Print the board
FOR Row <- 1 TO 3
    OUTPUT Board[Row, 1], " ", Board[Row, 2], " ", Board[Row, 3]
NEXT Row`
      },
    ]
  },
  {
    title: '8.1.6 Procedures & Functions',
    items: [
        {
            title: 'Procedures',
            code: `// Procedures are subroutines that perform a task.
PROCEDURE DisplayWelcome(UserName : STRING)
    OUTPUT "Welcome to the program, ", UserName, "!"
ENDPROCEDURE

// Main program
DECLARE Name : STRING
Name <- "Alice"
CALL DisplayWelcome(Name)`
        },
        {
            title: 'Functions',
            code: `// Functions are subroutines that return a value.
FUNCTION CalculateArea(Width : REAL, Height : REAL) RETURNS REAL
    RETURN Width * Height
ENDFUNCTION

// Main program
DECLARE Area : REAL
Area <- CalculateArea(10.5, 4.0)
OUTPUT "The area is: ", Area`
        }
    ]
  }
];