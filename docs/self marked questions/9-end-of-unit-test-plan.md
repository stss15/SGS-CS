# Topic 9 End of Unit Test Plan

## Goal
Create a comprehensive self-marking assessment for Topic 9: Databases.

## Content Coverage
This test will cover Topic 9.1:
-   Database Structure (Tables, Records, Fields)
-   Data Types (Text, Integer, Real, Boolean, Date)
-   Primary Keys
-   SQL (SELECT, FROM, WHERE, ORDER BY, SUM, COUNT)

## Question Design (10 Questions)

### Q1: Database Terms (Matching)
-   **Task**: Match term to definition.
-   **Pairs**:
    -   Table -> Structured data collection
    -   Field -> Column
    -   Record -> Row
    -   Primary Key -> Unique ID

### Q2: Data Types (Drag & Drop)
-   **Task**: Categorize data.
-   **Buckets**: Text, Number, Boolean
-   **Items**:
    -   "Hello" (Text)
    -   123 (Number)
    -   99.9 (Number)
    -   FALSE (Boolean)

### Q3: SQL Select (Multiple Choice)
-   **Task**: Identify correct syntax.
-   **Question**: Which command retrieves data?
-   **Options**: SELECT (Correct), GET, FETCH, RETURN.

### Q4: SQL Where (Multiple Choice)
-   **Task**: Filter logic.
-   **Query**: `SELECT * FROM Users WHERE Age >= 18`
-   **Question**: Who is selected?
-   **Options**: Adults (18+) (Correct), Children (<18), Everyone, No one.

### Q5: SQL Order (Ordering)
-   **Task**: Order query parts.
-   **Order**: `SELECT Name`, `FROM Staff`, `WHERE Salary > 20000`, `ORDER BY Name`.

### Q6: Primary Key Rules (True/False Grid)
-   **Statements**:
    -   Must be unique (True)
    -   Can be empty (False)
    -   Identifies a record (True)

### Q7: SQL Count (Multiple Choice)
-   **Task**: Purpose of COUNT.
-   **Question**: What does `SELECT COUNT(*)` do?
-   **Options**: Returns number of records (Correct), Adds up values, Sorts records, Deletes records.

### Q8: SQL Sum (Multiple Choice)
-   **Task**: Purpose of SUM.
-   **Question**: What does `SELECT SUM(Price)` do?
-   **Options**: Calculates total price (Correct), Counts prices, Averages price, Finds max price.

### Q9: Data Type Selection (Matching)
-   **Task**: Match field to best type.
-   **Pairs**:
    -   Name -> Text
    -   Age -> Integer
    -   Price -> Real
    -   IsStudent -> Boolean

### Q10: SQL Operators (Matching)
-   **Task**: Match symbol to meaning.
-   **Pairs**:
    -   `=` -> Equal
    -   `<>` -> Not Equal
    -   `>` -> Greater Than
    -   `<` -> Less Than

## Implementation Details
-   **File**: `public/igcse/topic9/Topic9_End_of_unit_Test.html`
-   **Template**: `public/igcse/topic6/Topic6_End_of_unit_Test.html`
