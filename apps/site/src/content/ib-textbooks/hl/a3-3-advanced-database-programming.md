---
level: hl
unitNumber: 51
unitName: Advanced Database Programming
summary: HL database programming extends SQL with aggregate queries, views, and transactions, showing how databases support analysis, abstraction, and reliable multi-step updates.
subtopics:
  - code: A3.3.4
    title: Aggregate functions
  - code: A3.3.5
    title: Database views
  - code: A3.3.6
    title: Transactions and ACID
sourcePolicy: ib_content_md_first
---

## A3.3.4 Aggregate functions

Aggregate functions summarise sets of rows into a smaller result. They are used when the question is not "what is each record?" but "what does the whole group show?"

| Function | Meaning |
| --- | --- |
| `COUNT` | Number of rows or values |
| `SUM` | Total of a numeric field |
| `AVG` | Mean value |
| `MIN` | Smallest value |
| `MAX` | Largest value |

To summarise by category, combine aggregate functions with `GROUP BY`.

```sql
SELECT DepartmentID, AVG(Salary) AS AverageSalary
FROM Employee
GROUP BY DepartmentID;
```

`HAVING` filters the grouped results after aggregation. `WHERE` filters rows before aggregation.

```sql
SELECT DepartmentID, AVG(Salary) AS AverageSalary
FROM Employee
GROUP BY DepartmentID
HAVING AVG(Salary) > 10000;
```

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Constructing grouped results</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose the `Employee` table contains these rows:</p>
    <table>
      <tr><th>DepartmentID</th><th>Salary</th></tr>
      <tr><td>1</td><td>8000</td></tr>
      <tr><td>1</td><td>9000</td></tr>
      <tr><td>2</td><td>10500</td></tr>
      <tr><td>2</td><td>11000</td></tr>
      <tr><td>2</td><td>12500</td></tr>
    </table>
    <p>This query:</p>
    <pre><code>SELECT DepartmentID, AVG(Salary) AS AverageSalary
FROM Employee
GROUP BY DepartmentID;</code></pre>
    <p>produces one row per department:</p>
    <table>
      <tr><th>DepartmentID</th><th>AverageSalary</th></tr>
      <tr><td>1</td><td>8500</td></tr>
      <tr><td>2</td><td>11333.33</td></tr>
    </table>
    <p>If you then add <code>HAVING AVG(Salary) &gt; 10000</code>, only Department 2 remains. That is the difference: <code>WHERE</code> filters rows before the grouping; <code>HAVING</code> filters the grouped result after aggregation.</p>
  </div>
</div>

## A3.3.5 Database views

A view is a named result set based on a query. It acts like a virtual table, letting users see a selected slice of the data without interacting with the full base tables directly.

Views are useful for three main reasons:

- **Abstraction** - they hide complex joins or field structures.
- **Security** - they can restrict which fields a user can see.
- **Data independence** - the underlying tables can change without changing every user-facing query.

```sql
CREATE VIEW StaffSummary AS
SELECT Employee.LastName, Department.DepartmentName
FROM Employee
JOIN Department
ON Employee.DepartmentID = Department.DepartmentID;
```

Some views are simple and based on one table. Others are complex and include joins or aggregates. Materialized views store the result for faster repeated access.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">View versus table</p>
  <p class="ib-textbook-note__body">A table stores data. A standard view stores the query that produces the data. That difference matters because the view is a controlled lens on the underlying database, not a separate copy of the whole dataset.</p>
</div>

## A3.3.6 Transactions and ACID

A transaction is a sequence of database operations treated as one unit of work. If one part fails, the whole transaction can be rolled back so the database does not end up half-changed.

The ACID properties describe reliable transactions:

| Property | Meaning |
| --- | --- |
| Atomicity | All parts succeed or none do |
| Consistency | The database remains valid after the transaction |
| Isolation | Transactions do not interfere in a harmful way |
| Durability | Committed changes are saved permanently |

```sql
BEGIN TRANSACTION;

UPDATE Account
SET Balance = Balance - 50
WHERE AccountID = 1;

UPDATE Account
SET Balance = Balance + 50
WHERE AccountID = 2;

COMMIT;
```

If a failure occurs between the two updates, `ROLLBACK` restores the database to its previous safe state.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common mistake</p>
  <p class="ib-textbook-warning__body">It is not enough to say that a transaction is "a group of SQL commands." The key idea is that the group behaves as one logical unit, which protects the database from partial updates and inconsistent state.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A3.3.4-A3.3.6</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Aggregate functions summarise rows into group-level answers, usually with `GROUP BY` and sometimes `HAVING`.</li>
      <li>Views are virtual tables that support abstraction, security, and data independence.</li>
      <li>Transactions protect multi-step changes using the ACID properties and commands such as `BEGIN TRANSACTION`, `COMMIT`, and `ROLLBACK`.</li>
    </ul>
  </div>
</div>
