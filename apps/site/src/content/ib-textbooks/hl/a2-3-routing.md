---
level: hl
unitNumber: 45
unitName: Routing in Local Area Networks
summary: Static and dynamic routing, including how routers maintain paths and respond to change or failure.
subtopics:
  - code: A2.3.4
    title: Static and dynamic routing
sourcePolicy: ib_content_md_first
---

## A2.3.4 How static routing and dynamic routing move data across local area networks

<span data-def="The process of selecting a path for packets to travel across one or more networks.">Routing</span> determines where packets go next. In local or connected network environments, that decision can be managed through either static routing or dynamic routing. The central difference is whether routes are entered manually and stay fixed, or whether routers exchange information and adapt automatically.

### Static and dynamic approaches compared

| Routing type | How routes are maintained | Main strengths | Main limitations |
|--------------|---------------------------|----------------|------------------|
| **Static routing** | Entered manually by an administrator | Predictable, low overhead, simple for small stable networks | Does not adapt automatically to failure, hard to scale |
| **Dynamic routing** | Updated automatically through router communication and routing algorithms | Adapts to change, supports larger networks, improves fault tolerance | More complex, uses extra processing and bandwidth, may take time to converge |

Static routing is practical when the network is small, changes rarely, and administrators want full control over exact paths. Because no routing updates are exchanged, it uses very little extra bandwidth. The price of that simplicity is inflexibility. If a link fails, traffic continues to follow the old path until someone edits the routing table.

Dynamic routing allows routers to share information about links, topology, and network conditions. That lets them update routes while the network is running. In larger or changing environments, this improves resilience because traffic can be redirected automatically when a route becomes unavailable.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">What happens when one route fails</p>
  <div class="ib-textbook-worked__body">
    <p>Suppose traffic normally travels from Router A to Router D through B and C.</p>
    <p>If the B-C link fails in a <strong>static</strong> routing setup, packets still attempt to use that route until an administrator changes the table manually.</p>
    <p>In a <strong>dynamic</strong> routing setup, routers exchange updated information and may switch traffic to an alternative path such as A-E-D.</p>
    <p>The advantage is reduced downtime, but only after the routing tables have converged on the new state of the network.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Automatic does not mean instant</p>
  <p class="ib-textbook-warning__body">Dynamic routing improves adaptability, but it does not eliminate all disruption. Routers still need time to exchange updates and settle on the best path. During that convergence period, short-lived inconsistencies can occur.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.3.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Static routing relies on manually configured routes and is best suited to small, stable networks.</li>
      <li>Dynamic routing allows routers to adapt automatically to changes and failures.</li>
      <li>The trade-off is between simplicity and predictability on one side, and scalability and fault tolerance on the other.</li>
    </ul>
  </div>
</div>
