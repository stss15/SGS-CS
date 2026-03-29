---
level: sl
unitNumber: 40
unitName: Network Fundamentals
summary: Networks, digital infrastructures, network devices, and the transport and application protocols that make communication possible.
subtopics:
  - code: A2.1.1
    title: Purpose and characteristics of networks
  - code: A2.1.2
    title: Modern digital infrastructures
  - code: A2.1.3
    title: Network devices
  - code: A2.1.4
    title: Transport and application protocols
sourcePolicy: ib_content_md_first
---

## A2.1.1 Purpose and characteristics of networks

A <span data-def="A system of connected computers and other devices that exchange data and share resources such as files, printers, services, or internet access.">network</span> exists so that separate devices do not have to work in isolation. Once devices are linked, they can share information, use common services, and coordinate work across a distance that may be as small as a desk or as large as the globe.

### Four common network types

The IB expects you to describe networks by linking each type to its scale, purpose, and typical characteristics rather than just naming it.

| Network type | Typical scale | Main purpose | Common characteristics |
|--------------|---------------|--------------|------------------------|
| **PAN** | Around one person | Connect personal devices | Very short range, often wireless, commonly Bluetooth-based |
| **LAN** | One room, building, or campus | Share local resources and internet access | High internal speed, low latency, usually managed by one organization |
| **WAN** | Across towns, countries, or continents | Connect separate LANs over long distances | Higher latency, depends on carrier infrastructure or virtual links |
| **VPN** | Logical overlay across existing networks | Create a secure private tunnel across a public network | Encrypted traffic, often used for remote access or site-to-site links |

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Network type and purpose go together</p>
  <p class="ib-textbook-note__body">A PAN is not simply "small" and a WAN is not simply "large". Each exists to solve a different communication problem. PANs keep a person's devices coordinated, LANs support shared local work, WANs connect separate sites, and VPNs create private communication across infrastructure that is not private by default.</p>
</div>

### What networks make possible

Networks support communication, collaboration, remote access, centralized storage, online services, and shared hardware. In a school, for example, a network might allow students to log in on different devices, print to a shared printer, open files stored on a central server, and access cloud platforms through the same internet connection.

The most important characteristics vary with the type of network, but they usually include:

- **Coverage**: how far the network extends.
- **Bandwidth**: how much data can be carried in a given time.
- **Latency**: how long data takes to travel.
- **Reliability**: whether communication continues when devices or links fail.
- **Security**: how well the network protects data and access.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">One organization using multiple network types</p>
  <div class="ib-textbook-worked__body">
    <p>A school staff member uses wireless earbuds and a phone: that is a <strong>PAN</strong>.</p>
    <p>The classrooms, printers, laptops, and servers inside the school share a <strong>LAN</strong>.</p>
    <p>The school links its main campus to a second site across town through a <strong>WAN</strong>.</p>
    <p>When the staff member works from home, a <strong>VPN</strong> creates an encrypted tunnel back into the school network.</p>
    <p>Each network type solves a different problem. A strong description makes that purpose explicit.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.1.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Networks connect devices so they can exchange data and share resources.</li>
      <li>PAN, LAN, WAN, and VPN differ in scale, role, and operating context.</li>
      <li>Important network characteristics include coverage, bandwidth, latency, reliability, and security.</li>
    </ul>
  </div>
</div>


## A2.1.2 Purpose, benefits, and limitations of modern digital infrastructures

Modern digital infrastructure is the wider environment that allows networked services to operate at scale. It includes the internet, cloud platforms, distributed systems, edge computing, and mobile networks. These are not interchangeable ideas. They are different ways of organizing communication, storage, and processing.

### The internet as a shared foundation

The <span data-def="The global system of interconnected networks that communicates using standard protocols such as IP.">internet</span> links millions of private, public, academic, business, and government networks into one global system. Its main benefit is reach: information, services, and communication can be accessed from almost anywhere. Its weaknesses are equally important. Because it is open, complex, and historically layered rather than centrally designed, it is exposed to congestion, outages, and security threats.

### Cloud, distributed, and edge approaches

Different infrastructures solve different operational problems:

| Infrastructure | What it does | Main benefits | Main limitations |
|----------------|--------------|---------------|------------------|
| **Cloud computing** | Rents computing resources from remote data centers | Easy scaling, lower upfront cost, reduced local maintenance | Depends on network connectivity, raises privacy and control concerns |
| **Distributed systems** | Uses multiple computers working together toward a common goal | Fault tolerance, load sharing, geographic reach | More complex to design, synchronize, and manage |
| **Edge computing** | Moves processing or storage closer to where data is needed | Lower latency, reduced bandwidth demand, faster local response | More endpoints to manage and secure |
| **Mobile networks** | Provides wide-area wireless connectivity to moving devices | Mobility, broad coverage, access where cabling is impractical | Dead zones, variable signal quality, shared bandwidth |

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">A common simplification</p>
  <p class="ib-textbook-warning__body">Cloud computing does not mean "the internet" and edge computing does not mean "faster cloud". The cloud centralizes rented resources, while edge computing moves some resources outward to reduce delay. They often work together.</p>
</div>

### Why organizations mix these models

Few real systems depend on only one infrastructure model. A streaming platform may store its master content in cloud data centers, distribute copies across many servers in a distributed system, and cache popular files at edge locations close to viewers. At the same time, users may connect through mobile networks rather than fixed broadband.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Why a video platform uses several infrastructures at once</p>
  <div class="ib-textbook-worked__body">
    <p><strong>Cloud computing</strong> provides scalable storage and processing for the platform's main services.</p>
    <p><strong>Distributed systems</strong> spread those services across many machines so one failure does not stop the platform.</p>
    <p><strong>Edge computing</strong> stores popular video content closer to viewers, reducing delay and bandwidth use.</p>
    <p><strong>Mobile networks</strong> allow users to watch while travelling, but quality may drop if signal strength changes.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.1.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>The internet provides the global communication foundation for modern digital infrastructure.</li>
      <li>Cloud computing, distributed systems, edge computing, and mobile networks solve different operational problems.</li>
      <li>Benefits such as scalability and low latency are always balanced against limits such as complexity, security exposure, or dependence on connectivity.</li>
    </ul>
  </div>
</div>


## A2.1.3 Function of network devices

In a small home or office network, one physical box may appear to do everything. In practice, several logical devices are involved, each solving a separate networking problem. Understanding those roles matters more than memorizing the shape of the hardware.

### Devices that connect, direct, and translate

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Gateway</p>
  <p class="ib-textbook-defn__body">Connects one network to another, especially when communication must pass between different systems or protocols. It acts as the entry and exit point between network environments.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Hardware firewall</p>
  <p class="ib-textbook-defn__body">Monitors traffic entering or leaving a network and allows or blocks it according to security rules, often based on IP addresses, protocols, or ports.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Modem</p>
  <p class="ib-textbook-defn__body">Converts signals between forms suitable for transmission across a communication medium and forms suitable for digital devices to process.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Network interface card (NIC)</p>
  <p class="ib-textbook-defn__body">The hardware in an individual device that allows it to connect to a network, whether by cable or wirelessly.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Router</p>
  <p class="ib-textbook-defn__body">Forwards packets between networks by examining destination IP information and choosing the next path for the data to travel.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Switch</p>
  <p class="ib-textbook-defn__body">Connects devices within the same local network segment and forwards frames to the correct device using hardware addresses.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">Wireless access point (WAP)</p>
  <p class="ib-textbook-defn__body">Allows wireless devices to join a network and communicate through radio signals rather than physical cabling.</p>
</div>

### Following one request through the network

When a laptop opens a website over Wi-Fi, the NIC and wireless access point establish the local connection. The switch or integrated switching function moves traffic around the local network. The router chooses how the packet leaves the local network. A gateway may translate between network systems, a modem handles signal conversion for the provider link, and a firewall filters traffic based on security rules.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">One box, many roles</p>
  <p class="ib-textbook-note__body">Home "routers" often combine routing, switching, wireless access, firewall, gateway, and modem functions in one device. That convenience is useful in practice, but it can hide the fact that each networking role is conceptually distinct.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Sending a request from a phone to the internet</p>
  <div class="ib-textbook-worked__body">
    <p>1. The phone's <strong>NIC</strong> sends data wirelessly.</p>
    <p>2. The <strong>wireless access point</strong> brings that device into the local network.</p>
    <p>3. The <strong>switch</strong> forwards local traffic to the correct destination inside the LAN.</p>
    <p>4. The <strong>router</strong> forwards packets toward the external network.</p>
    <p>5. The <strong>firewall</strong> checks whether the traffic should be allowed.</p>
    <p>6. The <strong>gateway</strong> and <strong>modem</strong> help the traffic pass into the provider's wider network.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.1.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Different network devices have distinct roles: connecting devices, forwarding traffic, translating systems, or enforcing security.</li>
      <li>Routers move data between networks, switches move it within a local segment, and WAPs provide wireless access.</li>
      <li>A single physical device may combine several logical network functions.</li>
    </ul>
  </div>
</div>


## A2.1.4 Network protocols used for transport and application

A <span data-def="A set of rules and standards that defines how data is formatted, transmitted, and received between systems.">protocol</span> allows devices and applications to communicate in a predictable way. At the transport layer, protocols determine how application data is delivered. At the application layer, protocols define the rules for particular services such as the web or automatic network configuration.

### Transport protocols: TCP and UDP

The two transport protocols in this topic solve different problems.

| Protocol | Type of communication | Strengths | Typical use |
|----------|-----------------------|-----------|-------------|
| **TCP** | Connection-oriented | Reliable delivery, sequencing, acknowledgements, retransmission | Web traffic, file transfer, email |
| **UDP** | Connectionless | Lower overhead, low latency, no connection setup | Streaming, real-time media, situations where speed matters more than perfect delivery |

TCP checks that data arrives, arrives in order, and can be re-sent if necessary. UDP sends data without those guarantees. That does not make UDP "worse". It makes it suitable for situations in which an occasional missing packet is less harmful than delay.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Do not compare protocols at the wrong layer</p>
  <p class="ib-textbook-warning__body">TCP and HTTP are not rivals. TCP is a transport protocol, while HTTP is an application protocol that commonly runs over TCP. Strong answers keep those layers separate.</p>
</div>

### Application protocols: HTTP, HTTPS, and DHCP

At the application layer, the protocol depends on the service being provided.

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">HTTP</p>
  <p class="ib-textbook-defn__body">The protocol used to request and deliver web resources. It is stateless, meaning each request is handled independently unless another mechanism stores session information.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">HTTPS</p>
  <p class="ib-textbook-defn__body">The secure version of HTTP. It adds encryption, authentication, and data integrity so that web traffic is protected against eavesdropping and tampering.</p>
</div>

<div class="ib-textbook-defn">
  <p class="ib-textbook-defn__term">DHCP</p>
  <p class="ib-textbook-defn__body">A network-management protocol that automatically assigns IP configuration information such as an address, subnet, router, and often DNS settings when a device joins a network.</p>
</div>

Port numbers help a device decide which application should receive incoming traffic. For example, web traffic commonly uses port 80 for HTTP and port 443 for HTTPS, while secure remote access using SSH commonly uses port 22.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Opening a secure website on a laptop</p>
  <div class="ib-textbook-worked__body">
    <p>The laptop first needs network settings. <strong>DHCP</strong> may provide an IP address, router, and DNS server details.</p>
    <p>The browser then requests a page using <strong>HTTPS</strong>.</p>
    <p>The connection is usually carried by <strong>TCP</strong>, which ensures the packets arrive reliably and in order.</p>
    <p>In that sequence, DHCP configures the device, HTTPS defines the web request, and TCP transports the data between applications.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.1.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>TCP and UDP are transport protocols that handle application-to-application delivery in different ways.</li>
      <li>HTTP and HTTPS are web application protocols; HTTPS adds encryption, authentication, and integrity checks.</li>
      <li>DHCP automatically assigns network configuration information when a device joins a network.</li>
    </ul>
  </div>
</div>
