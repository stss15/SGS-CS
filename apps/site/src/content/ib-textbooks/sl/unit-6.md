---
level: sl
unitNumber: 6
unitName: Data & Information
summary: Revise Data & Information with exam-focused coverage of A3.1.1, A3.2.1, A3.2.5, A3.3.1, including exact command-term expectations and applied examples.
subtopics:
  - code: A3.1.1
    title: Relational databases
  - code: A3.2.1
    title: Database schemas
  - code: A3.2.5
    title: Normal forms
  - code: A3.3.1
    title: SQL languages (DDL/DML)
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Relational database | A database that stores data in related tables using keys and integrity rules. |
| Table (entity) | A collection of related records about one type of thing. |
| Tuple (record) | One row in a table. |
| Attribute (field) | One column in a table. |
| Primary key | A field (or set of fields) that uniquely identifies each record in a table. |
| Foreign key | A field in one table that references the primary key of another table. |
| Composite key | A primary key made from two or more fields together. |
| Referential integrity | Rule that foreign-key values must match existing primary-key values. |
| Schema | The structural design of a database and its relationships. |
| Conceptual schema | High-level view of entities and relationships without implementation details. |
| Logical schema | Detailed table design with attributes, keys, and constraints. |
| Physical schema | DBMS-specific implementation details such as storage, indexing, and access methods. |
| Normalization | Structuring data to reduce redundancy and improve integrity. |
| 1NF | Data is atomic and repeating groups are removed. |
| 2NF | In 1NF and no partial dependency on part of a composite key. |
| 3NF | In 2NF and no transitive dependency between non-key attributes. |
| DDL | SQL commands for defining structure (`CREATE`, `ALTER`, `DROP`). |
| DML | SQL commands for manipulating data (`SELECT`, `INSERT`, `UPDATE`, `DELETE`). |


## A3.1.1 Explaining Relational Databases

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

The IB expects you to explain features, benefits, and limitations of relational databases in context. That means you must connect technical properties (keys, relationships, constraints) to practical outcomes (data quality, performance, maintainability).

Relational databases split data into tables and link them with keys. This reduces duplication and keeps one trusted version of each data item.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Area | What a relational database provides | Why it matters |
| --- | --- | --- |
| Features | Tables, primary keys, foreign keys, relationships, constraints | Data is structured and linkable |
| Benefits | Data integrity, reduced redundancy, controlled multi-user access, security policies | Fewer inconsistencies and safer updates |
| Limitations | Rigid schema changes, complexity at large scale, difficult fit for hierarchical/object-heavy data | Design and scaling decisions require planning |

A common school example is attendance tracking:
- With spreadsheets, one student detail can appear in many files and drift out of sync.
- With relational design, student details live once in `STUDENT`; attendance rows reference that student via a foreign key.

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

```text
STUDENT(StudentID PK, Name, TutorGroup)
ATTENDANCE(AttendanceID PK, StudentID FK, Date, Status)
```

If `ATTENDANCE.StudentID = 2051`, referential integrity requires that `STUDENT.StudentID = 2051` exists. This prevents orphan attendance rows and keeps the dataset consistent.

</div>


## A3.2.1 Describing Database Schemas

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to describe schema levels clearly: conceptual, logical, and physical. Your explanation should show what each level contains and how one level leads to the next.

A schema is the architecture of a database, not the data itself.

</div>

### The schema stack

<div class="reader-section-body reader-section-body--apply">

| Schema level | Focus | Typical output |
| --- | --- | --- |
| Conceptual | What entities and relationships exist | ERD-style model of real-world objects |
| Logical | How tables, keys, and attributes are defined | Table designs with primary/foreign keys |
| Physical | How data is stored and accessed in a specific DBMS | Indexing, partitioning, storage details |

Think of this as moving from idea -> design -> implementation.

</div>

### Worked example

<div class="reader-section-body reader-section-body--example">

Scenario: school library loans.

| Level | Representation |
| --- | --- |
| Conceptual | `Student` borrows `Book` through `Loan` |
| Logical | `STUDENT(StudentID PK, Name)`<br>`BOOK(BookID PK, Title)`<br>`LOAN(LoanID PK, StudentID FK, BookID FK, DueDate)` |
| Physical | `LOAN` indexed on `StudentID` and `DueDate` for faster lookups |

When describing schemas in exam responses, name the level and state what information belongs there.

</div>


## A3.2.5 Explaining Normal Forms

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

The IB expects you to explain the difference between 1NF, 2NF, and 3NF using correct dependency language: atomic values, partial dependency, and transitive dependency.

Normalization is about reducing update anomalies and keeping data consistent.

</div>

### Normal form comparison

<div class="reader-section-body reader-section-body--apply">

| Normal form | Rule | Problem it removes |
| --- | --- | --- |
| 1NF | Values are atomic; no repeating groups in a row | Repeating fields and multi-value cells |
| 2NF | In 1NF, and every non-key field depends on the whole composite key | Partial dependency |
| 3NF | In 2NF, and non-key fields do not depend on other non-key fields | Transitive dependency |

Memory line that matches the syllabus language: key, whole key, and nothing but the key.

</div>

### Worked normalization walkthrough

<div class="reader-section-body reader-section-body--example">

Start table:

```text
ORDER(OrderID, CustomerID, CustomerName, ProductID, ProductName, Quantity)
```

Issues:
- `CustomerName` depends on `CustomerID`, not the whole order line context.
- `ProductName` depends on `ProductID`.
- Repetition creates update anomalies.

3NF design:

```text
CUSTOMER(CustomerID PK, CustomerName)
PRODUCT(ProductID PK, ProductName)
ORDER_LINE(OrderID PK, CustomerID FK)
ORDER_ITEM(OrderID FK, ProductID FK, Quantity, PK(OrderID, ProductID))
```

Now each fact is stored once, and dependencies are aligned with keys.

</div>


## A3.3.1 Outlining SQL Language Types (DDL vs DML)

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Outline

The IB expects you to outline the difference between SQL language types by naming what each category does and giving representative commands.

- DDL defines structure.
- DML manipulates data content.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

| Language type | Purpose | Typical commands |
| --- | --- | --- |
| DDL | Define or modify database structure | `CREATE`, `ALTER`, `DROP` |
| DML | Add, read, change, remove records | `INSERT`, `SELECT`, `UPDATE`, `DELETE` |

A useful distinction:
- DDL changes the shape of the database.
- DML changes the rows currently stored in that shape.

</div>

### Worked SQL script

<div class="reader-section-body reader-section-body--example">

```sql
-- DDL: structure
CREATE TABLE Student (
  StudentID INT PRIMARY KEY,
  Name VARCHAR(60),
  TutorGroup VARCHAR(10)
);

-- DML: data
INSERT INTO Student (StudentID, Name, TutorGroup)
VALUES (2051, 'Mina Patel', '12A');

SELECT StudentID, Name
FROM Student
WHERE TutorGroup = '12A';

UPDATE Student
SET TutorGroup = '12B'
WHERE StudentID = 2051;

DELETE FROM Student
WHERE StudentID = 2051;
```

This single script shows the category boundary clearly: table creation is DDL; row operations are DML.

</div>
