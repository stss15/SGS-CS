---
level: sl
unitNumber: 42
unitName: Network Architecture
summary: Topologies, networking models, and network segmentation choices that shape how networks are organized and controlled.
subtopics:
  - code: A2.2.1
    title: Network topologies
  - code: A2.2.3
    title: Networking models
  - code: A2.2.4
    title: Network segmentation
sourcePolicy: ib_content_md_first
---

## A2.2.1 Functions and practical applications of network topologies

A <span data-def="The physical or logical arrangement of devices and links in a network.">network topology</span> describes how devices are connected and how traffic moves through the network. A topology is not just a diagram. It affects reliability, expansion, cost, and how badly a failure spreads when something goes wrong.

### Three topologies you must distinguish

| Topology | Structural idea | Strongest advantage | Main drawback | Common applications |
|----------|-----------------|--------------------|---------------|---------------------|
| **Star** | All devices connect to one central device | Simple management and low collision risk | Central device is a single point of failure | Homes, classrooms, small offices |
| **Mesh** | Devices have many direct interconnections | Very high resilience and redundancy | Expensive and complex to build | Critical infrastructure, remote resilient systems |
| **Hybrid** | Two or more topologies are combined | Flexible design for mixed requirements | Requires careful planning to avoid bottlenecks | Campuses, enterprises, telecom networks |

In a star topology, the central switch or hub becomes the organizing point for the network. That makes troubleshooting straightforward and expansion relatively simple, but the network depends heavily on that central device. In a mesh topology, traffic can often find another path if one connection fails, which is why it is chosen where resilience matters more than simplicity. Hybrid designs deliberately mix those ideas, using different structures for different parts of the same network.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">A topology choice is a design judgment</p>
  <p class="ib-textbook-note__body">No topology is "best" in all cases. A school lab may prefer a star because it is cheap and manageable. An emergency communication network may prefer a mesh because maintaining service during failure matters more than installation cost.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Choosing a topology for a university campus</p>
  <div class="ib-textbook-worked__body">
    <p>A single computer room inside one building can work well as a <strong>star</strong> because one switch can support all the devices efficiently.</p>
    <p>The links between major campus buildings may benefit from a <strong>mesh</strong> or partial mesh so that one cable failure does not isolate a whole department.</p>
    <p>The overall campus network is therefore often <strong>hybrid</strong>: star layouts inside local areas and more resilient interconnections between key nodes.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.2.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Topology affects how devices are arranged, how data flows, and how failures are handled.</li>
      <li>Star topologies are simple and common, mesh topologies are resilient, and hybrid topologies combine strengths from more than one approach.</li>
      <li>Practical applications depend on trade-offs between cost, reliability, scalability, and complexity.</li>
    </ul>
  </div>
</div>


## A2.2.3 Compare and contrast networking models

Networking models describe how responsibility is distributed across a network. The two core models in this topic are <span data-def="A networking model in which clients request services from one or more central servers.">client-server</span> and <span data-def="A networking model in which devices communicate directly and each device can both request and provide services.">peer-to-peer</span>.

### Client-server and peer-to-peer

| Feature | Client-server | Peer-to-peer |
|---------|---------------|--------------|
| Control | Centralized around one or more servers | Distributed across peers |
| Management | Easier to manage and update centrally | Harder to coordinate consistently |
| Reliability | Server failure can affect many users | No single central point, but peers may be unreliable |
| Cost | Often higher because dedicated servers are needed | Often lower because resources are shared |
| Typical use | Web services, banking, school platforms | File sharing, some voice/video systems, blockchains |

In a client-server model, the server is the authoritative provider of a service. That makes control, security policy, and data management easier. It also creates concentration of risk: if the server fails or is compromised, the service can be disrupted for everyone who depends on it.

In a peer-to-peer model, each participating device contributes resources directly. That removes the need for a central service point, but it makes synchronization, trust, and maintenance harder. A peer may disconnect at any time, which affects availability.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Do not reduce this to "centralized good, decentralized bad"</p>
  <p class="ib-textbook-warning__body">The comparison is about suitability. Online banking benefits from central control and security auditing, so client-server is appropriate. File sharing can benefit from distributed capacity, so peer-to-peer may be appropriate there.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.2.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Client-server centralizes service provision, making control easier but concentrating risk.</li>
      <li>Peer-to-peer distributes service provision, reducing central dependence but increasing coordination challenges.</li>
      <li>The better model depends on the task, not on a simple idea of one model always being superior.</li>
    </ul>
  </div>
</div>


## A2.2.4 Concepts and applications of network segmentation

<span data-def="The process of dividing a larger network into smaller logical sections to improve security, performance, and management.">Network segmentation</span> reduces the size of the network area that any one device or user can directly interact with. Instead of treating the whole network as one shared space, an organization creates smaller sections with clearer boundaries.

### Subnetting and VLANs

Two common segmentation methods are subnetting and virtual LANs.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Subnetting</p>
  <p class="ib-textbook-defn__body">Dividing a network into smaller IP-based subnetworks so that different groups of devices operate in separate address ranges.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">VLAN</p>
  <p class="ib-textbook-defn__body">A virtual local area network that creates separate logical broadcast domains on shared physical infrastructure.</p>
</div>

Subnetting separates devices by address range. A school might place staff devices on one subnet and student devices on another. VLANs achieve a similar separation through switch configuration, allowing devices on the same physical infrastructure to be grouped into separate logical networks.

### Why segmentation matters

Segmentation improves performance because broadcast traffic and congestion are confined to smaller sections of the network. It improves security because devices and services can be hidden from groups that do not need to see them. It also makes management easier, since policies can be applied to groups such as staff, students, finance, or guest devices.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Segmenting a school network</p>
  <div class="ib-textbook-worked__body">
    <p>Student laptops are placed on one VLAN, staff devices on another, and servers on a third.</p>
    <p>Students can reach the internet and learning systems but cannot directly browse staff machines.</p>
    <p>Servers remain visible only to the groups that require them.</p>
    <p>If heavy traffic appears in one segment, the rest of the network is less affected than it would be in one large shared network.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">The distinction to keep clear</p>
  <p class="ib-textbook-note__body">Segmentation is the broader goal. Subnetting and VLANs are two ways of achieving it. They are related ideas, but they are not identical terms.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.2.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Network segmentation divides a larger network into smaller sections for security, performance, and control.</li>
      <li>Subnetting separates by IP ranges, while VLANs create separate logical networks on shared physical infrastructure.</li>
      <li>Segmentation limits visibility, reduces unnecessary traffic, and supports more targeted policy enforcement.</li>
    </ul>
  </div>
</div>
