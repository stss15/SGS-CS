---
level: hl
unitNumber: 5
unitName: Scalable Data Systems
summary: Revise Scalable Data Systems with exam-focused coverage of A3.3.4, A3.4.1, A3.4.2, A3.4.3, including exact command-term expectations and applied examples.
subtopics:
  - code: A3.3.4
    title: SQL Aggregate functions
  - code: A3.4.1
    title: Alternative databases
  - code: A3.4.2
    title: Data warehouses
  - code: A3.4.3
    title: OLAP & Data Mining
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| relational database | A database that stores data in related tables using keys and constraints. |
| schema | The formal structure of a database, including tables, fields, and relationships. |
| normalization | Structuring data to reduce redundancy and improve integrity. |
| SQL | Structured Query Language for defining, querying, and updating relational databases. |
| transaction | A unit of database work that should complete fully or not at all. |
| ACID | Transaction properties: Atomicity, Consistency, Isolation, and Durability. |
| data warehouse | A large repository optimized for analysis of historical data. |
| NoSQL | Non-relational database approaches designed for flexibility and scale. |

## A3.3.4 SQL Aggregate functions

### Required response

> **Command term:** Describe
>
> Describe different database views.

### What this means

For this syllabus point, focus on using sql aggregate functions accurately in context. Connect it to accurate data modeling, storage, querying, and consistency management. SQL structure should reflect intent clearly: definition, retrieval, update, aggregation, or transaction control.

### System context

- Model data structures before writing queries.
- Link schema choices to integrity, consistency, and query efficiency.
- Use SQL constructs that match the intended operation type.

### Compact example

```sql
SELECT student_id, AVG(score) AS mean_score
FROM results
GROUP BY student_id;
```
Query structure should match the operation: selection, aggregation, and grouping.

## A3.4.1 Alternative databases

### Exam requirement

> **Command term:** Outline
>
> Outline different types of databases (NoSQL, etc.).

### Core understanding

In this part of the unit, you need secure understanding of alternative databases. Connect it to accurate data modeling, storage, querying, and consistency management. Database design decisions directly affect data consistency, query cost, and long-term maintainability.

### In real systems

- Model data structures before writing queries.
- Link schema choices to integrity, consistency, and query efficiency.
- Use SQL constructs that match the intended operation type.

### Worked snapshot

```python
# Minimal check for Alternative databases
for item in sample_data:
    process(item)
```
Use a short trace to confirm expected output for both normal and edge-case inputs.

## A3.4.2 Data warehouses

### What the command expects

> **Command term:** Explain
>
> Explain primary objectives of data warehouses.

### Key idea

Data warehouses is treated as applied reasoning, not only a definition. Connect it to accurate data modeling, storage, querying, and consistency management.

### Applied in context

- Model data structures before writing queries.
- Link schema choices to integrity, consistency, and query efficiency.
- Use SQL constructs that match the intended operation type.

### Quick worked example

```python
# Minimal check for Data warehouses
for item in sample_data:
    process(item)
```
Use a short trace to confirm expected output for both normal and edge-case inputs.

## A3.4.3 OLAP & Data Mining

### Required response

> **Command term:** Explain
>
> Explain role of OLAP and data mining for business intelligence.

### What this means

For this syllabus point, focus on using olap & data mining accurately in context. Connect it to accurate data modeling, storage, querying, and consistency management.

### System context

- Model data structures before writing queries.
- Link schema choices to integrity, consistency, and query efficiency.
- Use SQL constructs that match the intended operation type.

### Compact example

```python
# Minimal check for OLAP & Data Mining
for item in sample_data:
    process(item)
```
Use a short trace to confirm expected output for both normal and edge-case inputs.

