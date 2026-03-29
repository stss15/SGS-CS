---
level: sl
unitNumber: 49
unitName: Database Design
summary: Database design turns a real-world problem into a relational model by moving from conceptual ideas to logical tables, applying ERDs, choosing data types, and normalising deliberately.
subtopics:
  - code: A3.2.1
    title: Database schemas
  - code: A3.2.2
    title: Entity-relationship diagrams
  - code: A3.2.3
    title: Data types in relational databases
  - code: A3.2.4
    title: Constructing tables
  - code: A3.2.5
    title: Normal forms
  - code: A3.2.6
    title: Normalising to third normal form
  - code: A3.2.7
    title: Denormalising databases
sourcePolicy: ib_content_md_first
---

## A3.2.1 Database schemas

A database schema is the design of the database structure. It shows what data exists, how it is grouped, and how the groups relate to one another.

In the relational model, it helps to think in three layers:

| Schema level | Purpose |
| --- | --- |
| Conceptual | Shows the real-world entities and relationships |
| Logical | Turns the idea into tables, fields, keys, and constraints |
| Physical | Shows how the DBMS stores and indexes the data |

The conceptual level is about the problem domain. The logical level is about structure. The physical level is about implementation details that affect performance and storage.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">From idea to schema</p>
  <div class="ib-textbook-worked__body">
    <p>A school wants to manage library loans.</p>
    <p><strong>Conceptual:</strong> Students borrow books, and each loan has a due date.</p>
    <p><strong>Logical:</strong> Create tables such as `STUDENT`, `BOOK`, and `LOAN`, then link them with keys.</p>
    <p><strong>Physical:</strong> Add indexes to commonly searched fields such as `StudentID` or `DueDate` so lookups are faster.</p>
  </div>
</div>

## A3.2.2 Entity-relationship diagrams

An entity-relationship diagram, or ERD, is a visual representation of the entities in a database and the relationships between them. It helps the designer see whether the database structure matches the real-world system.

An ERD usually shows:

- entities such as `Customer`, `Order`, or `Product`
- attributes belonging to each entity
- relationships such as one-to-many or many-to-many
- keys that identify records and link tables

The main value of an ERD is clarity. It makes the structure easier to discuss before any tables are created, and it helps prevent missing links or duplicated facts.

### Relationship shape

The cardinality of a relationship describes how many records on one side can connect to records on the other side. For example, one customer can place many orders, but each order belongs to one customer.

Many-to-many relationships cannot be stored directly as a single simple link in a relational database. They are usually broken into two one-to-many relationships using a linking table.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Design habit</p>
  <p class="ib-textbook-note__body">When you draw an ERD, start by naming the entities, then decide the keys, then add the relationships. This order keeps the model grounded in the problem rather than in the syntax of the tables.</p>
</div>

## A3.2.3 Data types in relational databases

Choosing a data type is part of good design. The type should match the nature of the data so the database can store it accurately and efficiently.

| Data type | Typical use |
| --- | --- |
| `INTEGER` | Whole numbers such as IDs or counts |
| `REAL` or `DECIMAL` | Values such as prices or measurements |
| `VARCHAR` or `TEXT` | Names, descriptions, and free-form text |
| `DATE` | Calendar dates |
| `BOOLEAN` | True/false values |

Good type choices reduce storage waste and prevent invalid values. A price should not be stored as a string if it will be used in calculations.

## A3.2.4 Constructing tables

Once the logical schema is clear, the tables can be created. A table definition usually includes the primary key, the field types, and any constraints that enforce valid data.

```sql
CREATE TABLE Customer (
  CustomerID INTEGER PRIMARY KEY,
  CustomerName VARCHAR(100) NOT NULL,
  EmailAddress VARCHAR(100) UNIQUE
);

CREATE TABLE Book (
  BookID INTEGER PRIMARY KEY,
  Title VARCHAR(150) NOT NULL,
  Author VARCHAR(100) NOT NULL
);

CREATE TABLE Loan (
  LoanID INTEGER PRIMARY KEY,
  CustomerID INTEGER NOT NULL,
  BookID INTEGER NOT NULL,
  DueDate DATE NOT NULL,
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
  FOREIGN KEY (BookID) REFERENCES Book(BookID)
);
```

This design keeps the repeated facts out of the loan table. A loan points to a customer and a book rather than copying their details again.

## A3.2.5 Normal forms

Normalization is the process of organising data so that redundancy is reduced and update anomalies are avoided.

| Normal form | Main rule | What it prevents |
| --- | --- | --- |
| 1NF | Every field is atomic | Repeating groups and multi-value fields |
| 2NF | Every non-key field depends on the whole key | Partial dependency |
| 3NF | Non-key fields do not depend on other non-key fields | Transitive dependency |

The language matters. In an exam answer, name the dependency type as well as the normal form. Saying only "it is in 3NF" is weaker than explaining why.

## A3.2.6 Normalising to third normal form

Consider a simple sales table:

`ORDER(OrderID, CustomerID, CustomerName, ProductID, ProductName, Quantity)`

This design repeats customer and product details each time they appear in an order. That creates update problems: if a customer name changes, it must be edited in multiple rows.

To move towards third normal form, the designer has to ask what each attribute really depends on:

- `CustomerName` depends on `CustomerID`, not on the whole order row
- `ProductName` depends on `ProductID`, not on the whole order row
- `Quantity` depends on the combination of `OrderID` and `ProductID`, because it describes one product line within one order

Those dependencies show that several facts are mixed together in one table. The table is therefore split so each fact is stored where it belongs.

A 3NF design separates the facts:

```text
CUSTOMER(CustomerID PK, CustomerName)
PRODUCT(ProductID PK, ProductName)
ORDER_HEADER(OrderID PK, CustomerID FK)
ORDER_ITEM(OrderID FK, ProductID FK, Quantity, PK(OrderID, ProductID))
```

Now each fact lives in one place. Customer details depend on `CustomerID`, product details depend on `ProductID`, and line-item quantities depend on the combination of order and product.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Why the split improves the database</p>
  <div class="ib-textbook-worked__body">
    <p>In the original table, changing one customer's name or one product name could require edits in many rows. After normalization, customer data is changed once in `CUSTOMER`, product data is changed once in `PRODUCT`, and each order line stores only the quantity for that specific product in that specific order.</p>
    <p>This staged split is what normalization is doing: removing dependency problems so the database is easier to maintain and less likely to become inconsistent.</p>
  </div>
</div>

## A3.2.7 Denormalising databases

Denormalisation deliberately introduces some redundancy to improve read performance or simplify reporting. It is a design decision, not a mistake.

| Advantage | Risk |
| --- | --- |
| Faster reporting queries | More repeated data |
| Fewer joins | Update anomalies if changes are not managed carefully |
| Simpler read structure | More storage use |

Denormalisation is useful when the database is read far more often than it is updated, or when a reporting workload becomes too slow on a fully normalised design.

The important IB judgement is balance. A good design does not chase purity or speed in isolation. It chooses the structure that best fits the use case.

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A3.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>A schema moves from conceptual ideas to logical tables and then to physical implementation.</li>
      <li>ERDs show entities, relationships, and keys before tables are built.</li>
      <li>Data types should match the data being stored and the operations that will be performed on it.</li>
      <li>Normalization reduces redundancy; denormalization may be used when performance or reporting needs justify it.</li>
    </ul>
  </div>
</div>
