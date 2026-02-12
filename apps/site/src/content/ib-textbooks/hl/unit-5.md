---
level: hl
unitNumber: 5
unitName: Scalable Data Systems
summary: Revise Scalable Data Systems with source-bounded coverage of A3.3.4, A3.4.1, A3.4.2, and A3.4.3, focusing on SQL aggregation, model selection, warehousing objectives, and OLAP/data-mining uses.
subtopics:
  - code: A3.3.4
    title: SQL Aggregate Functions and Grouping
  - code: A3.4.1
    title: Alternative Database Models
  - code: A3.4.2
    title: Data Warehouse Objectives
  - code: A3.4.3
    title: OLAP and Data Mining for Business Intelligence
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| aggregate function | SQL function that summarizes multiple rows into one value (`SUM`, `AVG`, `COUNT`, `MIN`, `MAX`). |
| GROUP BY | SQL clause that creates groups for aggregate calculations. |
| HAVING | SQL clause that filters grouped results after aggregation. |
| NoSQL | Non-relational database approaches such as document and key-value models. |
| OLTP | Operational processing focused on frequent day-to-day transactions. |
| data warehouse | Repository optimized for integrated, historical analysis rather than live transactions. |
| OLAP | Analytical processing over multi-dimensional, summarized historical data. |
| data mining | Pattern discovery across large datasets (classification, clustering, regression, association). |
| schema flexibility | Ability to store records with evolving structures without rigid table design. |
| ETL | Extract, transform, and load pipeline moving data into analytical storage. |

## A3.3.4 SQL Aggregate Functions and Grouping

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Construct

Construction requires syntactically correct SQL that performs grouped calculations.

| Goal | SQL elements usually required |
| --- | --- |
| Count rows per category | `COUNT(*)`, `GROUP BY` |
| Average value per category | `AVG(column)`, `GROUP BY` |
| Filter groups by threshold | `HAVING` |

`WHERE` filters rows before grouping; `HAVING` filters groups after aggregation.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

Suppose a school wants departments with at least 10 enrolled students from a raw enrollment table.

You need grouped counting plus group-level filtering. A row-level filter alone is insufficient because threshold logic applies to each department summary, not each record.

</div>

### Worked example: grouped department report

<div class="reader-section-body reader-section-body--example">

```sql
SELECT department, COUNT(student_id) AS enrolled_count, AVG(score) AS avg_score
FROM enrollments
GROUP BY department
HAVING COUNT(student_id) >= 10;
```

Sample source rows:

| department | student_id | score |
| --- | --- | --- |
| CS | 1001 | 78 |
| CS | 1002 | 82 |
| Math | 1101 | 69 |
| Math | 1102 | 74 |
| Math | 1103 | 80 |

Grouped output contains one row per department with aggregate metrics.

</div>

## A3.4.1 Alternative Database Models

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Outline

Outlining means concise model identification with defining characteristics and appropriate use cases.

| Model | Core idea | Strong fit |
| --- | --- | --- |
| Document store | Records stored as flexible documents | Evolving application schemas |
| Key-value store | Key lookup to opaque value | Very fast caching/session retrieval |
| Spatial database | Geospatial types and queries | Mapping and location analytics |
| In-memory database | Primary storage in RAM | Low-latency high-throughput workloads |

No single model is universally best; model choice depends on data structure and access pattern.

</div>

### The domain matrix

<div class="reader-section-body reader-section-body--apply">

| System requirement | Better model direction |
| --- | --- |
| Unpredictable user-profile attributes | Document model |
| Millisecond session retrieval at scale | Key-value |
| Route optimization by coordinates | Spatial |
| Real-time leaderboard updates | In-memory |

Outlines should stay concise but still include practical fit.

</div>

### Worked example: choosing a model for three products

<div class="reader-section-body reader-section-body--example">

A company runs:

1. A mapping app with geofence alerts.
2. An e-commerce cart cache.
3. A content platform with variable metadata fields.

| Product | Chosen model | Reason |
| --- | --- | --- |
| Mapping app | Spatial database | Native geospatial indexing and queries |
| Cart cache | Key-value store | Constant-time key retrieval patterns |
| Content platform | Document database | Flexible schema for diverse content types |

</div>

## A3.4.2 Data Warehouse Objectives

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

A data warehouse objective is analytical clarity, not transaction speed. Warehouses separate operational workloads from historical analysis.

| Objective | Practical meaning |
| --- | --- |
| Integrate data sources | Consolidate heterogeneous systems into consistent analytical structure |
| Preserve history | Keep time-variant data for trend analysis |
| Support reporting | Enable complex analytical queries without disrupting OLTP systems |

This explains why organizations keep OLTP and OLAP environments distinct.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

A retail company runs frequent checkout transactions (OLTP) and monthly profitability analysis (OLAP).

Keeping analytics on operational tables causes contention and slow checkouts. Warehouse separation protects operational performance while enabling deeper historical queries.

</div>

### Worked example: OLTP vs warehouse query load

<div class="reader-section-body reader-section-body--example">

| Workload | Query type | Best environment |
| --- | --- | --- |
| Process card payment now | Single-row update with strict integrity | OLTP database |
| Analyze 24 months of sales by region and product family | Multi-table aggregation across large history | Data warehouse |

With this split, checkout latency stays stable while analytics can run heavier scans.

</div>

## A3.4.3 OLAP and Data Mining for Business Intelligence

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

OLAP supports structured, multidimensional analysis. Data mining finds hidden patterns that are not obvious from simple reports.

| Technique | Typical question answered |
| --- | --- |
| OLAP slicing/dicing | "How did region A perform in Q3 for category X?" |
| Classification | "Which label is likely for this record?" |
| Clustering | "Which records naturally group together?" |
| Regression | "What numeric value is likely next?" |
| Association rules | "Which items tend to appear together?" |

Explanation quality improves when you connect method to decision-making impact.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

A business dashboard may use OLAP for weekly revenue cubes while mining identifies product bundles likely to co-occur.

These are complementary: OLAP summarizes known dimensions, mining discovers previously hidden relationships.

</div>

### Worked example: basket insight from 1,000 transactions

<div class="reader-section-body reader-section-body--example">

From 1,000 orders:

- 240 include bread.
- 180 include butter.
- 150 include both bread and butter.

| Metric | Value |
| --- | --- |
| Support of bread->butter | `150 / 1000 = 0.15` |
| Confidence of bread->butter | `150 / 240 = 0.625` |

Interpretation: 62.5% of bread purchases co-occurred with butter in this dataset, which can inform bundle placement or promotion planning.

</div>
