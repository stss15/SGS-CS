---
topicNumber: 9
topicName: "Databases"
summary: "From social media profiles to school attendance records, databases are the invisible engines that store and retrieve the world's data. In this topic, you will learn how to structure data efficiently using tables, enforce accuracy with data types and validation, and retrieve exactly what you need using the powerful language of SQL."
subtopics:
  - code: "9.1"
    title: "Databases"
  - code: "9.2"
    title: "SQL"
  - code: "9.3"
    title: "Building Databases"
sourcePolicy: igcse_textbook_then_syllabus_then_slides
---

## Unit Summary

From social media profiles to school attendance records, databases are the invisible engines that store and retrieve the world's data. In this topic, you will learn how to structure data efficiently using tables, enforce accuracy with data types and validation, and retrieve exactly what you need using the powerful language of SQL.

## Objectives and Outcomes

### Objectives

- Database Structure: Understanding Fields (columns), Records (rows), and the concept of a Flat-File database.
- Data Types: Choosing the correct type for data (Text, Integer, Real, Boolean, Date/Time).
- Primary Keys: The crucial role of a unique identifier to distinguish every record.
- SQL (Structured Query Language): Writing scripts to Select, Filter, Order, and Count data.

### Outcomes

- Write SQL: Write a full SQL query from scratch based on a scenario (e.g., "Show the names of all cars that are Blue and cost more than £10,000").
- Interpret SQL: Look at a given SQL script and predict exactly what the output will be (which records will be shown and in what order).
- Choose Data Types: Given a sample table of data (e.g., a flight schedule), identify the most appropriate data type for each column (e.g., Arrival Time = Date/Time, Flight Number = Text).
- Identify Keys: Select the best field to use as a Primary Key and explain why (uniqueness).

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| Database | Structured collection of related data for retrieval and update. |
| Table | Collection of records arranged in rows and columns. |
| Record | A complete row describing one entity instance. |
| Field | A column representing one attribute in each record. |
| Primary Key | Field used to uniquely identify each record. |
| Data Type | Constraint defining allowed values in a field. |
| SQL | Structured Query Language used for database operations. |
| SELECT | SQL command to retrieve data. |
| WHERE | SQL clause to filter records by conditions. |
| ORDER BY | SQL clause to sort query output. |
| COUNT | SQL aggregate function for counting matching records. |
| Validation Rule | Constraint used to reject invalid field input. |

## Topic Mapping Notes

- Topic 9 website labels include 9.2 and 9.3 even though chapter text is mainly grouped as 9.1 in source extracts.
- Coverage for 9.2 and 9.3 uses chapter content plus existing site SQL/building-database artifacts under source policy.

## 9.1 Databases

### Overview

- Databases structure data into fields and records for efficient retrieval.
- Single-table database understanding is central at IGCSE level.
- Primary keys and data types improve integrity and avoid ambiguous records.

### Applied Understanding

- Choose suitable field data types for realistic entity data.
- Identify a field that is unique and stable for primary-key usage.
- Explain why duplicated records create consistency issues.

### Worked Example

**Worked table design check**

This routine validates whether a candidate primary key value already exists before insertion.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE ExistingId : INTEGER
DECLARE NewId : INTEGER
DECLARE IsDuplicate : BOOLEAN
INPUT ExistingId
INPUT NewId
IF ExistingId = NewId THEN
  IsDuplicate ← TRUE
ELSE
  IsDuplicate ← FALSE
ENDIF
OUTPUT "Primary key duplicate = ", IsDuplicate
</code></pre>

## 9.2 SQL

### Overview

- SQL retrieves and manipulates table data using precise command syntax.
- Core operations include selecting fields, filtering records, sorting output, and counting rows.
- Query clarity depends on correct clause order and condition logic.

### Applied Understanding

- Use SELECT-FROM-WHERE-ORDER BY structure correctly for exam-style tasks.
- Combine AND/OR conditions with parentheses where precedence matters.
- Interpret query output from given dataset snapshots.

### Worked Example

**Worked SQL query builder**

This routine outputs a simple query string from supplied condition fragments.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE FieldName : STRING
DECLARE TableName : STRING
DECLARE ConditionText : STRING
INPUT FieldName
INPUT TableName
INPUT ConditionText
OUTPUT "SELECT ", FieldName, " FROM ", TableName, " WHERE ", ConditionText
</code></pre>

## 9.3 Building Databases

### Overview

- Building databases requires schema planning, validation rules, and test data insertion.
- Design should support intended query needs while keeping structure simple and accurate.
- Input forms and validation improve data quality from first capture.

### Applied Understanding

- Define field names, data types, and key constraints before population.
- Apply validation checks such as range, length, and lookup constraints.
- Test forms and queries with normal and boundary values before release.

### Worked Example

**Worked validation-rule assignment**

This routine checks field length before accepting a value into a database workflow.

<pre data-language="IGCSE pseudocode"><code class="language-igcse-pseudocode">
DECLARE Username : STRING
DECLARE IsValidLength : BOOLEAN
INPUT Username
IF LENGTH(Username) &gt;= 5 AND LENGTH(Username) &lt;= 12 THEN
  IsValidLength ← TRUE
ELSE
  IsValidLength ← FALSE
ENDIF
OUTPUT "Length valid = ", IsValidLength
</code></pre>

