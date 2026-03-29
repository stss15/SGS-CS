---
level: sl
unitNumber: 44
unitName: Data Transmissions
summary: IP addressing, transmission media, and packet switching as the foundations of moving data across networks.
subtopics:
  - code: A2.3.1
    title: IP addressing
  - code: A2.3.2
    title: Media for data transmission
  - code: A2.3.3
    title: Packet switching
sourcePolicy: ib_content_md_first
---

## A2.3.1 Different types of IP addressing

An <span data-def="A numerical identifier used by the Internet Protocol to distinguish one device or interface from another on a network.">IP address</span> allows data to be sent to the correct destination. To describe IP addressing well, you need to distinguish between several different pairs of ideas: IPv4 and IPv6, public and private addresses, and static and dynamic assignment.

### IPv4 and IPv6

IPv4 uses 32-bit addresses, usually written as four decimal numbers separated by dots, such as `192.168.0.1`. That design provides a limited address space, which is why IPv4 addresses became scarce as the internet grew.

IPv6 uses 128-bit addresses, usually written in hexadecimal groups such as `2001:0db8:85a3:0000:0000:8a2e:0370:7334`. Its main advantage is scale. The address space is vastly larger, allowing modern networks to continue expanding without depending only on workarounds.

### Public and private addresses

| Address type | Where it is used | Key feature |
|--------------|------------------|-------------|
| **Public IP** | On the public internet | Must be globally unique and routable |
| **Private IP** | Inside home, school, or company networks | Not directly routable on the public internet |

Private address ranges exist so organizations can reuse internal addresses safely without claiming unique global addresses for every single device. Traffic from those private devices usually reaches the wider internet through <span data-def="A process that rewrites address information so multiple private devices can share one public IP address.">network address translation (NAT)</span>.

### Static and dynamic assignment

A <strong>static IP address</strong> stays fixed. This is useful for servers, printers, or other devices that must be found at a predictable address.

A <strong>dynamic IP address</strong> is assigned when a device connects to the network, usually by DHCP. This is more efficient for devices that join and leave frequently, because addresses can be reused from a managed pool.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Addressing inside a home network</p>
  <div class="ib-textbook-worked__body">
    <p>A laptop receives the private address <code>192.168.0.12</code> from the router's DHCP service.</p>
    <p>The router itself has a public address supplied by the internet provider.</p>
    <p>When the laptop requests a website, NAT rewrites the packet so that it appears to come from the router's public address. Replies are then mapped back to the laptop.</p>
    <p>This allows many private devices to share one public connection.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why NAT matters</p>
  <p class="ib-textbook-note__body">NAT helped the internet remain practical despite IPv4 exhaustion. It also hides internal addresses from external systems, although that does not make it a full security solution by itself.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.3.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>IPv4 and IPv6 are different address schemes, with IPv6 providing a far larger address space.</li>
      <li>Public addresses are routable on the internet; private addresses are used inside local networks.</li>
      <li>Static addresses stay fixed, while dynamic addresses are assigned automatically, often through DHCP.</li>
    </ul>
  </div>
</div>


## A2.3.2 Compare types of media for data transmission

Different transmission media move data in different ways. Comparing them means looking at bandwidth, cost, installation complexity, range, interference, and security rather than focusing on only one factor.

### Fibre optic, twisted pair, and wireless

| Medium | Main strengths | Main weaknesses | Typical use |
|--------|----------------|-----------------|-------------|
| **Fibre optic** | Very high bandwidth, long range, low interference, difficult to tap | Higher cost, fragile, more complex installation | Backbones, data centers, long-distance links |
| **Twisted pair** | Low cost, easy installation, flexible, good local performance | More interference, shorter range, easier to tap than fibre | Homes, classrooms, offices |
| **Wireless** | No cabling, mobility, low physical installation cost | Shared bandwidth, interference, limited range, greater interception risk | Homes, campuses, mobile access |

Fibre optic is strongest where high throughput and long distance matter. Because it uses light rather than electrical signals, it is resistant to electromagnetic interference and is very difficult to intercept without detection. Its disadvantages are mostly practical and economic: equipment, installation, and handling are more demanding.

Twisted-pair cabling remains common because it is cheap, familiar, and good enough for many local networks. Wireless is the most flexible medium, but that convenience comes with fluctuating performance and a larger attack surface because signals travel openly through the air.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">A fast medium is not automatically the best choice</p>
  <p class="ib-textbook-warning__body">The "best" transmission medium depends on the environment. Fibre may be ideal for a backbone link, but not for a quick temporary classroom setup. Wireless may be practical for mobility, but not for the most sensitive or high-throughput connections.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.3.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Fibre optic offers the highest performance and strongest resistance to interference, but costs more and is harder to install.</li>
      <li>Twisted pair is cheaper and easier to deploy, but has shorter range and greater susceptibility to interference.</li>
      <li>Wireless supports mobility and easy installation, but shares bandwidth and is more exposed to interference and interception.</li>
    </ul>
  </div>
</div>


## A2.3.3 How packet switching is used to send data across a network

<span data-def="A method of data transmission in which a message is broken into smaller packets that travel independently across the network and are reassembled at the destination.">Packet switching</span> is the basis of most modern networking. Instead of reserving one dedicated path for the whole communication session, the network breaks data into smaller packets and routes each one as needed.

### The packet-switching process

The full process can be understood in four linked stages:

1. **Segmentation**: the original data is divided into smaller packets.
2. **Header information**: each packet carries control data such as source and destination addresses, sequencing information, and error-checking values.
3. **Routing and forwarding**: routers send packets onward based on destination information and current network conditions.
4. **Reassembly**: the destination system checks the sequence, detects missing or damaged packets, and rebuilds the original message.

This approach makes network use more efficient because many communications can share the same infrastructure. It also improves resilience, since packets do not all need to take exactly the same path.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Sending a large file</p>
  <div class="ib-textbook-worked__body">
    <p>A large file is broken into many packets.</p>
    <p>Each packet is labelled with address and sequencing information.</p>
    <p>Some packets may travel through different routers because congestion or failures make one route less suitable than another.</p>
    <p>At the destination, the packets are checked, reordered if necessary, and reassembled into the original file.</p>
    <p>If a packet is lost or corrupted, the receiving system can request retransmission.</p>
  </div>
</div>

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Where routers and switches fit</p>
  <p class="ib-textbook-note__body">Routers choose paths between networks. Switches mainly forward traffic inside a local network segment. Packet switching depends on both, but they do not perform the same task.</p>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.3.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Packet switching sends data as many small packets rather than over one permanently reserved circuit.</li>
      <li>Packets contain addressing, sequencing, and error-checking information in their headers.</li>
      <li>Independent routing improves efficiency and resilience, but packets must be checked and reassembled at the destination.</li>
    </ul>
  </div>
</div>
