# IGCSE Textbook Source Map: Topic 9 - Databases

## Scope
- Topic: 9
- Topic name: Databases
- Source policy: igcse_textbook_then_syllabus_then_slides
- Source hierarchy: chapter text files -> Cambridge syllabus -> existing SGS slides (fallback only).

## Canonical Website Subtopics
- 9.1 Databases
- 9.2 SQL
- 9.3 Building Databases

## Mapped Source Files
- docs/content/igcse/chapter-text-files/chapter 9 Subfiles/9.1.txt
- docs/content/igcse/chapter-text-files/chapter 9.txt
- docs/content/igcse/chapter-text-files/Chapter 9 key words.txt
- src/static/igcse/topic9/9.2_sql.html
- src/static/igcse/topic9/9.3_building_databases.html

## Locked Noise Exclusions
- docs/content/igcse/chapter-text-files/Chapter 5 Subfiles/5123.txt
- docs/content/igcse/chapter-text-files/chapter 3 Subfiles/300.txt
- docs/content/igcse/chapter-text-files/Chapter 7 Subfiles/780340.txt
- docs/content/igcse/chapter-text-files/.DS_Store

## Evidence by Subtopic
### 9.1 Databases
- Source: `docs/content/igcse/chapter-text-files/chapter 9 Subfiles/9.1.txt`
```text
pictures; anything that can be stored in a computer. Relational databases will be
studied at A Level but for IGCSE only single-table databases will be studied.
Databases prevent problems occurring because:
data is only stored once in relational databases which means no data duplication.
What are databases used for?
Note: while databases can contain multiple tables, all the databases considered
to obtain information from single-table databases. This will provide a basic
AS and A Level covers relational databases that
```
- Source: `src/static/igcse/topic9/9.2_sql.html`
```text
Structured Query Language | Talking to Databases
```
- Source: `src/static/igcse/topic9/9.3_building_databases.html`
```text
Creating and Modifying Tables (Extension)
Q1: What does SELECT do?
Chooses which columns to return
Q2: What does WHERE do?
Filters which rows are returned
Where does the table come from in the first place?
Before we can SELECT data, someone has to create the table !
It's like building a house before you can live in it.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 9 key words.txt`
```text
Key terms used throughout this chapter
database – a persistent structured collection of data that allows people to extract
information in a way that meets their needs
single-table database – a database contains only one table
record – a collection of fields that describe one item
field – a database table
data type – a classification of how data is stored and displayed, and of which operations
that can be performed on the stored value
```
- Source: `docs/content/igcse/chapter-text-files/chapter 9.txt`
```text
★ the design and use of single table databases
pictures; anything that can be stored in a computer. Relational databases will be
studied at A Level but for IGCSE only single-table databases will be studied.
Databases prevent problems occurring because:
data is only stored once in relational databases which means no data duplication.
What are databases used for?
Note: while databases can contain multiple tables, all the databases considered
to obtain information from single-table databases. This will provide a basic
```

### 9.2 SQL
- Source: `docs/content/igcse/chapter-text-files/chapter 9 Subfiles/9.1.txt`
```text
b Write an SQL query to list all the patients not in ward 6.
c Write an SQL query to list all the patients who arrived on 12/11/2022.
d Write an SQL query to list all the patients who arrived between 12/10/2022
2 Write down the output from this SQL query.
a Write an SQL query to count the number of patients in ward 7.
b Write an SQL query to count the number of patients not in ward 7.
True or False SQL uses the integers 1 and 0
(DML). SQL was developed in the 1970s and since then
```
- Source: `src/static/igcse/topic9/9.2_sql.html`
```text
SQL is often written with keywords like SELECT and WHERE in uppercase for readability.
Tables , fields , data types , and primary keys give structure — SQL is how we retrieve the data.
Boolean logic — the same ideas power SQL conditions with AND, OR, and NOT.
```
- Source: `src/static/igcse/topic9/9.3_building_databases.html`
```text
What you learned in 9.2!
This uses DDL (Data Definition Language) – the SQL commands for building structure.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 9 key words.txt`
```text
Structured Query Language (SQL) – the standard query language for writing scripts to
SQL scripts – a list of SQL commands that perform a given task, often stored in a file so the
SELECT – an SQL command that fetches specified fields (columns) from a table
FROM – an SQL command that identifies the table to use
WHERE – an SQL command to include only those records (rows) in a query that match a
ORDER BY – an SQL command that sorts the results from a query by a given column either
SUM – an SQL command that returns the sum of all the values in a field (column);
COUNT – an SQL command that counts the number of records (rows) in which the field
```
- Source: `docs/content/igcse/chapter-text-files/chapter 9.txt`
```text
b Write an SQL query to list all the patients not in ward 6.
c Write an SQL query to list all the patients who arrived on 12/11/2022.
d Write an SQL query to list all the patients who arrived between 12/10/2022
2 Write down the output from this SQL query.
a Write an SQL query to count the number of patients in ward 7.
b Write an SQL query to count the number of patients not in ward 7.
True or False SQL uses the integers 1 and 0
(DML). SQL was developed in the 1970s and since then
```

### 9.3 Building Databases
- Source: `docs/content/igcse/chapter-text-files/chapter 9 Subfiles/9.1.txt`
```text
pictures; anything that can be stored in a computer. Relational databases will be
studied at A Level but for IGCSE only single-table databases will be studied.
Databases prevent problems occurring because:
data is only stored once in relational databases which means no data duplication.
What are databases used for?
Fields and records – the building blocks for any database
Note: while databases can contain multiple tables, all the databases considered
to obtain information from single-table databases. This will provide a basic
```
- Source: `src/static/igcse/topic9/9.2_sql.html`
```text
Structured Query Language | Talking to Databases
```
- Source: `src/static/igcse/topic9/9.3_building_databases.html`
```text
It's like building a house before you can live in it.
This uses DDL (Data Definition Language) – the SQL commands for building structure.
```
- Source: `docs/content/igcse/chapter-text-files/Chapter 9 key words.txt`
```text
Key terms used throughout this chapter
database – a persistent structured collection of data that allows people to extract
information in a way that meets their needs
single-table database – a database contains only one table
record – a collection of fields that describe one item
field – a database table
data type – a classification of how data is stored and displayed, and of which operations
that can be performed on the stored value
```
- Source: `docs/content/igcse/chapter-text-files/chapter 9.txt`
```text
★ the design and use of single table databases
pictures; anything that can be stored in a computer. Relational databases will be
studied at A Level but for IGCSE only single-table databases will be studied.
Databases prevent problems occurring because:
data is only stored once in relational databases which means no data duplication.
What are databases used for?
Fields and records – the building blocks for any database
Note: while databases can contain multiple tables, all the databases considered
```

