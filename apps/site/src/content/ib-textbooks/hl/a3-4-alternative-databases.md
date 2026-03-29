---
level: hl
unitNumber: 52
unitName: Alternative Databases and Data Warehouses
summary: HL database systems extend beyond the relational model to include NoSQL, cloud, spatial, and in-memory approaches, plus warehouses, OLAP, mining, and distributed databases.
subtopics:
  - code: A3.4.1
    title: Alternative database types
  - code: A3.4.2
    title: Data warehouses
  - code: A3.4.3
    title: OLAP and data mining
  - code: A3.4.4
    title: Distributed databases
sourcePolicy: ib_content_md_first
---

## A3.4.1 Alternative database types

Not every storage problem fits neatly into relational tables. Alternative database models exist because data can be semi-structured, highly connected, geographically distributed, or so time-sensitive that a conventional transactional database is not the best match.

### NoSQL databases

<span data-def="A broad family of databases designed to handle large volumes of data and diverse data types by using models other than the traditional relational-table structure.">NoSQL databases</span> are designed for large-scale, varied data. In the source pack, four main NoSQL types are identified.

| Type | How the data is stored | Typical use | Strength | Limitation |
| --- | --- | --- | --- | --- |
| Document database | Documents such as JSON objects | Content systems, e-commerce | Flexible for semi-structured data | Risk of redundancy or inconsistency |
| Key-value database | One key linked to one value | Caching, session management, real-time lookups | Very fast read/write access | Limited querying power |
| Wide-column store | Rows with dynamic columns | Big-data systems, large sparse datasets | Scales horizontally well | Harder to design and query |
| Graph database | Nodes and edges | Social platforms, recommendation engines | Excellent for complex relationships | More specialised maintenance and querying |

Document databases are useful when different records do not all need exactly the same structure. Key-value databases favour speed and simplicity. Wide-column stores are built for scale, especially where different rows may contain different sets of attributes. Graph databases are strongest when the relationships themselves are the important part of the data.

### Cloud, spatial, and in-memory databases

Some alternatives are defined less by the logical model and more by the environment or storage approach they use.

| Type | Main idea | Why it is chosen | Main trade-off |
| --- | --- | --- | --- |
| Cloud database | Runs on cloud infrastructure | Elastic scaling and managed services | Dependence on provider, pricing, and connectivity |
| Spatial database | Stores objects in space such as points, lines, and polygons | Efficient geographic and mapping queries | Specialised data types and query methods |
| In-memory database | Stores data in RAM rather than on disk | Extremely low latency | Higher cost and memory dependence |

Cloud databases can be self-managed on rented infrastructure or fully managed by the provider as a database service. Spatial databases are used in mapping, GIS, and location-based services. In-memory databases are useful where speed is critical, such as real-time analytics, caching, or gaming systems.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Important distinction</p>
  <p class="ib-textbook-note__body">These database types are alternatives because they solve different storage problems, not because they replace the relational model in every situation. The correct choice depends on the shape of the data, the type of queries needed, and the performance requirements.</p>
</div>

## A3.4.2 Data warehouses

A <span data-def="A database designed for analytical use rather than routine transaction processing, usually storing large volumes of historical data gathered from multiple sources.">data warehouse</span> is built for analysis. It does not mainly serve day-to-day transactions such as placing an order or updating one customer record. Instead, it gathers data from multiple operational systems and keeps it in a form that supports reporting, comparison, and decision-making over time.

| Operational database | Data warehouse |
| --- | --- |
| Supports live transactions | Supports analysis and reporting |
| Emphasises current operational data | Stores historical data over time |
| Frequent inserts, updates, and deletes | Mostly read-heavy use |
| Optimised for fast transactions | Optimised for complex queries |

Data warehouses are commonly described as:

- **subject-oriented**: organised around themes such as sales, finance, or customers
- **integrated**: combining data from different source systems into one repository
- **time-variant**: keeping historical versions so trends can be analysed
- **non-volatile**: data is usually appended rather than constantly overwritten

The usual process is ETL: extract data from source systems, transform it into a consistent format, and load it into the warehouse.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Why a warehouse is different from the live system</p>
  <div class="ib-textbook-worked__body">
    <p>A retailer may run separate systems for tills, online orders, and stock control. Each system is useful for daily operations, but none gives a complete long-term picture by itself. A data warehouse can pull data from all three, standardise it, and store historical snapshots so managers can compare sales by month, product range, and region.</p>
  </div>
</div>

## A3.4.3 OLAP and data mining

Business intelligence refers to the tools and practices used to collect, integrate, analyse, and present business information. In that context, OLAP and data mining serve related but distinct purposes.

### OLAP

<span data-def="Online analytical processing; technology used to explore multidimensional data quickly through summaries, comparisons, and ad hoc queries.">OLAP</span> supports interactive analysis of multidimensional data. A user might explore the same dataset by time, region, and product category, then drill down from an annual total to one month in one branch. OLAP is especially useful when pre-aggregated summaries are needed quickly.

### Data mining

Data mining searches for patterns, relationships, or unusual behaviour in large datasets. It is more investigative than OLAP. Rather than asking only for summaries, it looks for segments, rules, trends, anomalies, or predictions that were not obvious in advance.

| Technique | Main purpose | Typical output |
| --- | --- | --- |
| OLAP | Explore and compare structured historical data | Summaries, dashboards, trend comparisons |
| Data mining | Discover patterns and relationships | Clusters, associations, classifications, predictions |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Two different questions from the same warehouse</p>
  <div class="ib-textbook-worked__body">
    <p>A supermarket wants to understand falling profits. OLAP can compare sales by month, store, and product line to show where the decline is happening. Data mining can then search the same wider dataset for patterns, such as a customer segment that has started buying less often or a combination of products that tends to predict higher-value baskets.</p>
  </div>
</div>

## A3.4.4 Distributed databases

A distributed database stores data across more than one site or system while still presenting one logical database to users and applications. The physical storage may be spread across warehouses, branches, or regional servers, but the goal is a unified view of the data.

Reliable transactions across sites are a central concern in distributed databases. The usual ACID ideas still matter here, but they become harder to guarantee because multiple nodes are involved. A distributed transaction must either complete everywhere or be rolled back cleanly, and concurrent access across sites has to be managed carefully.

### Key features

| Feature | Why it matters |
| --- | --- |
| Concurrency control | Prevents conflicting updates when different nodes access the same data at the same time |
| Data consistency | Keeps copies of data aligned so users do not see contradictory states |
| Data partitioning | Splits data across nodes to improve scalability and manageability |
| Replication | Maintains copies of data to improve availability and fault tolerance |
| Fault tolerance | Allows the system to continue operating when one part fails |
| Global query processing | Supports queries that span multiple nodes or databases |
| Distribution and location transparency | Hides the physical location of the data from the user |
| Data security | Protects distributed data through encryption, permissions, and strong authentication |

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Why concurrency control matters across sites</p>
  <div class="ib-textbook-worked__body">
    <p>Imagine two warehouse systems trying to update the same stock record at nearly the same time. Without concurrency control, one update could overwrite the other and leave the stock level wrong. Locking, timestamps, or similar coordination methods are used so the database behaves consistently even when activity is spread across multiple sites.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Common misconception</p>
  <p class="ib-textbook-warning__body">Distributed does not mean separate independent databases with no coordination. The system may span many locations, but it still has to behave as one coherent database from the user’s point of view.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways — A3.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Alternative database models exist because different data shapes and workloads need different structures.</li>
      <li>Data warehouses are built for analysis, not for frequent live updates.</li>
      <li>OLAP summarises data; data mining searches for hidden patterns.</li>
      <li>Distributed databases spread data across sites but still present one logical database to the user.</li>
    </ul>
  </div>
</div>
