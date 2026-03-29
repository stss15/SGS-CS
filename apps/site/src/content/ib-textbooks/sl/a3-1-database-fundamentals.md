---
level: sl
unitNumber: 48
unitName: Database Fundamentals
summary: Relational databases organise data into related tables and support reliable updates through keys, relationships, transactions, concurrency control, security, and controlled access.
subtopics:
  - code: A3.1.1
    title: Relational databases
sourcePolicy: ib_content_md_first
---

## A3.1.1 Relational databases

A database is an organised collection of structured data that can be retrieved, updated, and shared efficiently. In the relational model, that data is split into related tables so that each fact is stored once and linked to other facts through keys.

The relational model remains the standard approach when a system needs accuracy, consistency, and controlled access. It is especially effective when the same data must be used by many people at once, or when different parts of the data need to be connected in predictable ways.

### Tables, records, and keys

| Term | Meaning |
| --- | --- |
| Table | A set of related records about one entity type |
| Record | One row in a table |
| Field | One column in a table |
| Primary key | A field that uniquely identifies each record |
| Foreign key | A field that links one table to another table |

In a school database, a `Student` table might store student details, while an `Attendance` table stores daily attendance records. The tables stay separate, but they can still be linked using `StudentID`.

This structure matters because it avoids repeating the same facts in multiple places. If a student changes tutor group, the database should store that change once rather than in every related record.

### Why relational databases are useful

Relational databases are valued because they support several things at the same time:

- **Data integrity** - keys and constraints help keep records valid and connected.
- **Reduced redundancy** - data is stored once, not copied across many places.
- **Efficient querying** - SQL can retrieve, filter, and combine records precisely.
- **Concurrency** - multiple users can work with the same database without corrupting it.
- **Security** - access can be restricted by user role or by view.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Why a linked table is better than repeated data</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose a college stores enrolment data like this:</p>
    <table>
      <tr><th>StudentID</th><th>StudentName</th><th>CourseName</th><th>TeacherName</th></tr>
      <tr><td>101</td><td>Amina</td><td>Databases</td><td>Mr Khan</td></tr>
      <tr><td>102</td><td>Ben</td><td>Databases</td><td>Mr Khan</td></tr>
      <tr><td>103</td><td>Chen</td><td>Databases</td><td>Mr Khan</td></tr>
    </table>
    <p>If the teacher changes, the same name must be edited in every row. A relational design stores the course and teacher once, then links each enrolment to that record. That reduces repetition and lowers the risk of inconsistent updates.</p>
  </div>
</div>

### Benefits and limitations

Relational databases are strong when the structure of the data is known and the relationships are important. They are less comfortable when the structure is highly flexible or the data is heavily hierarchical.

| Benefit | Why it matters |
| --- | --- |
| Consistent updates | One change can update a central fact rather than many copies |
| Structured relationships | Links between data are explicit and queryable |
| Security and access control | Different users can see different views of the same data |
| Reliable transaction handling | A change can succeed completely or be rolled back |

| Limitation | Why it matters |
| --- | --- |
| Rigid schema | Changing the structure later can take planning and time |
| Joins can add overhead | Queries that combine many tables can become slower |
| Hierarchical data is awkward | Nested or irregular data does not always fit clean tables cleanly |
| Scaling requires design work | Larger systems need careful indexing and database management |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">What the syllabus is really asking</p>
  <p class="ib-textbook-note__body">For this point, a strong answer does more than list features. It explains how relational structure helps the database stay accurate, and why those same rules can make the model less flexible when the data changes shape.</p>
</div>

### Reliability and control

Three ideas often sit behind relational database use in real systems:

- **Transactions** group related changes into one unit of work.
- **Concurrency control** helps several users work at once without overwriting each other.
- **Controlled access** lets different users see only the data they need.

These are not separate topics for later learning. They are part of why the relational model is trusted in banking, school administration, logistics, and other systems where a wrong update has real consequences.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A3.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A relational database stores data in related tables linked by keys.</li>
      <li>Its main strengths are integrity, reduced redundancy, efficient querying, concurrency, and security.</li>
      <li>Its main weaknesses are rigidity, join overhead, and a less natural fit for highly hierarchical data.</li>
      <li>At IB level, explain each feature in terms of the problem it solves for real data systems.</li>
    </ul>
  </div>
</div>
