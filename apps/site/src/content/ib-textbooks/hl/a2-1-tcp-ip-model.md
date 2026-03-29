---
level: hl
unitNumber: 41
unitName: TCP/IP Model
summary: The four-layer TCP/IP model and how application, transport, internet, and network interface responsibilities fit together in real communication.
subtopics:
  - code: A2.1.5
    title: Function of the TCP/IP model
sourcePolicy: ib_content_md_first
---

## A2.1.5 Function of the TCP/IP model

The <span data-def="A four-layer conceptual model used to describe how network communication is organized, from application software down to physical transmission.">TCP/IP model</span> is a way of separating network communication into layers with different responsibilities. It is not a physical device and it is not a single protocol. It is a framework that helps explain how a message moves from an application on one machine to an application on another.

### The four layers

| Layer | Main responsibility | Typical examples |
|-------|---------------------|------------------|
| **Application** | Provides services used by software and defines message formats | HTTP, HTTPS, DNS, SMTP, DHCP |
| **Transport** | Moves data between applications and manages reliability or speed | TCP, UDP |
| **Internet** | Handles logical addressing and routing across networks | IP |
| **Network interface** | Delivers data across the local medium and hardware | Ethernet, Wi-Fi, MAC addressing |

Each layer builds on the one below it. Higher layers do not need to manage every low-level detail themselves. That separation makes networks easier to design, troubleshoot, and extend.

### Encapsulation in practice

When data is sent, each layer adds information needed for its own job. The application creates the message. The transport layer turns that message into segments or datagrams. The internet layer places those inside IP packets so they can be routed. The network interface layer prepares the data for actual transmission over cable or radio.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Loading a secure web page</p>
  <div class="ib-textbook-worked__body">
    <p><strong>Application layer:</strong> the browser creates an HTTPS request for a page.</p>
    <p><strong>Transport layer:</strong> TCP divides that request into segments and ensures reliable delivery.</p>
    <p><strong>Internet layer:</strong> IP adds addressing so routers can move the packets toward the destination server.</p>
    <p><strong>Network interface layer:</strong> Ethernet or Wi-Fi carries the data across the local link to the next device.</p>
    <p>At the destination, the process is reversed until the server application receives the original request.</p>
  </div>
</div>

### Why the model matters

The model is useful because it tells you where a problem belongs. If a device cannot get an IP address, the issue may involve DHCP at the application layer or the local link at the network interface layer. If a web request times out even though the device is connected, the problem may involve transport or routing rather than Wi-Fi signal strength.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">A frequent confusion</p>
  <p class="ib-textbook-warning__body">Students often memorize protocol names without linking them to layers. The function of the TCP/IP model is not just to list four levels. It is to show which job each layer performs and how those jobs combine during communication.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.1.5</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>The TCP/IP model separates communication into application, transport, internet, and network interface layers.</li>
      <li>Each layer handles a different responsibility, from user-facing services to physical transmission.</li>
      <li>Encapsulation allows data to move layer by layer through the network, with each layer adding the information it needs.</li>
    </ul>
  </div>
</div>
