---
level: hl
unitNumber: 43
unitName: Server Functions
summary: Common server roles in networks, including naming, addressing, storage, messaging, proxying, and web delivery.
subtopics:
  - code: A2.2.2
    title: Function of servers
sourcePolicy: ib_content_md_first
---

## A2.2.2 Function of servers

A <span data-def="A computer or software service on a network that provides resources or functions to other devices, which act as clients.">server</span> provides a service to other systems on a network. One physical machine may run several server applications at once, so the important idea is the role being performed, not just the hardware box sitting in a server room.

### Core server roles

| Server type | What it does | Why it matters |
|-------------|--------------|----------------|
| **DNS server** | Translates domain names into IP addresses | Users work with names, but routing requires addresses |
| **DHCP server** | Assigns IP settings automatically to devices joining a network | Makes configuration faster and more manageable |
| **File server** | Stores and shares files centrally | Supports collaboration, backup, and controlled access |
| **Mail server** | Stores, sends, and receives email | Supports organization-wide messaging |
| **Proxy server** | Acts on behalf of clients or servers | Can cache content, filter traffic, balance load, or hide internal systems |
| **Web server** | Hosts and delivers web pages and web applications | Provides websites and browser-based services |

### Naming and configuration services

A DNS server is a translation service. People remember names such as `www.example.com`, but routers need IP addresses. DNS bridges that gap. Because so many systems depend on it, DNS must be scalable, redundant, and secure.

A DHCP server automates address assignment. Without it, every device would need manual configuration. In most home networks, the "router" provides this function automatically. In larger organizations, dedicated DHCP services manage address pools, leases, and configuration policy.

### Storage, messaging, and traffic mediation

File servers centralize storage so that users do not each maintain isolated copies of important files. Permissions, redundancy, and backup therefore become central concerns. Mail servers perform a similar organizing role for messages, but they must also handle queues, external delivery, and a high volume of potentially malicious incoming traffic.

Proxy servers sit in the path of communication. A forward proxy acts on behalf of clients, often for filtering or caching. A reverse proxy acts on behalf of servers, often for load balancing, shielding internal systems, or improving performance under heavy demand.

### Publishing services to users

A web server delivers pages and related content to clients. In simple cases it returns static files. In more advanced systems it forwards requests to application code, then returns the generated response. Because many public services now depend on the web, web servers must be designed with scalability, uptime, and security in mind.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">What happens when a student opens the school portal</p>
  <div class="ib-textbook-worked__body">
    <p>The device may first obtain its settings from a <strong>DHCP server</strong>.</p>
    <p>When the student types the portal address, a <strong>DNS server</strong> resolves the name to an IP address.</p>
    <p>A <strong>proxy</strong> may inspect or route the request according to school policy.</p>
    <p>The <strong>web server</strong> then delivers the portal page or passes the request to the application behind it.</p>
    <p>If the student downloads a document, a <strong>file server</strong> may provide the stored file.</p>
  </div>
</div>

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Do not confuse service with machine count</p>
  <p class="ib-textbook-warning__body">One server computer can host several services at once, and one service may be distributed across many machines. The syllabus point is about the function of server roles, not about assuming a one-to-one match between service and hardware.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.2.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Servers provide services to clients across a network.</li>
      <li>DNS, DHCP, file, mail, proxy, and web servers all perform different functions in keeping a network usable and manageable.</li>
      <li>The role of a server matters more than the number of physical machines involved.</li>
    </ul>
  </div>
</div>
