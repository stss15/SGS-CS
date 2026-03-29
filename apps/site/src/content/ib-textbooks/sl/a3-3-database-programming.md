---
level: sl
unitNumber: 50
unitName: Database Programming
summary: SQL at SL covers the distinction between DDL and DML, constructing queries across tables, and updating records safely while preserving database integrity.
subtopics:
  - code: A3.3.1
    title: SQL language types
  - code: A3.3.2
    title: Queries between two tables
  - code: A3.3.3
    title: Updating data in a database
sourcePolicy: ib_content_md_first
---

## A3.3.1 SQL language types

SQL is the structured query language used to create, read, update, and manage relational databases. At IB level, it helps to separate SQL into two broad categories:

| Language type | Purpose | Common commands |
| --- | --- | --- |
| DDL | Define or change the database structure | `CREATE`, `ALTER`, `DROP` |
| DML | Add, retrieve, modify, or remove records | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |

DDL changes the shape of the database. DML changes the data stored inside that shape.

### DDL in practice

```sql
CREATE TABLE Department (
  DepartmentID INTEGER PRIMARY KEY,
  DepartmentName VARCHAR(100) NOT NULL
);
```

DDL is used when the database structure itself must be created or adjusted. It is about tables, columns, constraints, views, and indexes.

### DML in practice

```sql
SELECT DepartmentName
FROM Department;
```

DML is used when the data needs to be handled. The same database can be queried, inserted into, updated, or cleaned using DML statements without changing the table design.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Exam focus</p>
  <p class="ib-textbook-note__body">When writing about SQL, be precise about the difference between structure and content. A table definition is not the same thing as the records stored in that table.</p>
</div>

## A3.3.2 Queries between two tables

Relational databases are designed so that facts are stored once and then reconnected when needed. A query between two tables therefore depends on a `JOIN`, which matches related rows through a shared key.

Suppose a school stores staff details in an `Employee` table and department details in a `Department` table.

```sql
SELECT Employee.LastName, Department.DepartmentName
FROM Employee
JOIN Department
ON Employee.DepartmentID = Department.DepartmentID;
```

The query works because `Employee.DepartmentID` is a foreign key pointing to the primary key in `Department`. The join does not merge the tables permanently. It creates a result set that shows the relationship for this one query.

### Refining joined results

Joined queries often need to filter the output. `WHERE` removes rows that do not meet the condition, while relational operators define the comparison being made.

| Operator | Meaning |
| --- | --- |
| `=` | Equal to |
| `<>` | Not equal to |
| `<`, `>`, `<=`, `>=` | Less than / greater than comparisons |
| `BETWEEN` | Range of values |
| `IN` | One of several listed values |

You can also remove duplicates with `DISTINCT`.

```sql
SELECT DISTINCT Department.DepartmentName
FROM Employee
JOIN Department
ON Employee.DepartmentID = Department.DepartmentID;
```

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Listing employees in one department</p>
  <div class="ib-textbook-worked__body">
    <p>A school wants a list of staff surnames for the Science department.</p>
    <pre><code>SELECT Employee.LastName, Department.DepartmentName
FROM Employee
JOIN Department
ON Employee.DepartmentID = Department.DepartmentID
WHERE Department.DepartmentName = 'Science';</code></pre>
    <p>The join first attaches each employee row to the correct department row. The <code>WHERE</code> clause then keeps only the rows where the department name is <code>Science</code>. The result is still a row-by-row query, not a summary of totals or averages.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Scope boundary</p>
  <p class="ib-textbook-note__body">At SL, the key idea is combining related rows from different tables. Group-level summaries using aggregate functions such as <code>SUM</code> or <code>AVG</code> belong to the HL extension.</p>
</div>

## A3.3.3 Updating data in a database

Updating data means changing existing records without breaking the rest of the database. The most common DML commands here are `INSERT`, `UPDATE`, and `DELETE`.

```sql
INSERT INTO Department (DepartmentID, DepartmentName)
VALUES (3, 'Science');

UPDATE Employee
SET Salary = Salary * 1.05
WHERE DepartmentID = 3;

DELETE FROM Employee
WHERE EmployeeID = 1042;
```

The `WHERE` clause is critical. Without it, an `UPDATE` or `DELETE` can affect every row in the table.

### Why safe updating matters

Database updates should preserve integrity:

- use the correct key when targeting a record
- update only the rows that should change
- keep linked tables consistent
- check the result after the change

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">A missing `WHERE` clause is one of the most serious SQL errors because it can update or delete the entire table. In real databases, that can destroy data fast. Precision matters.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A3.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>DDL defines structure; DML handles the data stored in that structure.</li>
      <li>Joins combine related rows from different tables by matching keys.</li>
      <li>`WHERE`, `DISTINCT`, and relational operators help refine query results.</li>
      <li>`UPDATE`, `INSERT`, and `DELETE` must be written carefully so the correct rows change and no data is lost accidentally.</li>
    </ul>
  </div>
</div>
