---
level: sl
unitNumber: 11
unitName: Global Networking
summary: Revise Global Networking with exam-focused coverage of A2.1.1, A2.1.4, A2.2.1, A2.3.1, A2.4.1, including exact command-term expectations and applied examples.
subtopics:
  - code: A2.1.1
    title: Network purpose & characteristics
  - code: A2.1.4
    title: Transport & application protocols
  - code: A2.2.1
    title: Network topologies
  - code: A2.3.1
    title: IP addressing
  - code: A2.4.1
    title: Firewalls
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| LAN | Local Area Network covering a limited site such as a school or office. |
| WAN | Wide Area Network linking LANs across larger geographic distances. |
| PAN | Personal Area Network around one person/devices (for example Bluetooth accessories). |
| VPN | Virtual Private Network creating an encrypted private tunnel over public infrastructure. |
| Protocol | Agreed communication rule set for data exchange between systems. |
| TCP | Reliable, connection-oriented transport protocol with ordering and retransmission. |
| UDP | Lightweight, connectionless transport protocol prioritizing speed over guaranteed delivery. |
| HTTP / HTTPS | Application protocols for web communication; HTTPS adds encrypted secure transport. |
| DHCP | Dynamic Host Configuration Protocol for automatic IP configuration. |
| Star topology | Network layout with devices connected through a central switch/hub device. |
| Mesh topology | Network layout with direct interconnections between nodes for resilience. |
| IPv4 / IPv6 | Internet addressing schemes using 32-bit and 128-bit addresses. |
| Public / Private IP | Public addresses are internet-routable; private addresses are for local networks. |
| Static / Dynamic IP | Static remains fixed; dynamic is assigned automatically (often via DHCP). |
| NAT | Network Address Translation mapping private internal addresses to shared public addresses. |
| Firewall | Security control that allows/blocks traffic based on defined rules (for example IP/port). |


## A2.1.1 Network Purpose and Characteristics

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** the purpose and characteristics of networks. Strong responses explain why different network types exist and what practical problem each type solves.

| Network type | Typical scale | Main purpose |
| --- | --- | --- |
| **PAN** | One person and nearby devices | Personal device connectivity (for example smartwatch/headset) |
| **LAN** | Building or campus | High-speed local resource sharing |
| **WAN** | City/country/global | Connect separate LANs over distance |
| **VPN** | Overlay across existing networks | Secure remote access and private communication |

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

A school environment may use all four:
- Students use **PAN** links for peripherals.
- Classrooms and labs run on a **LAN**.
- Multiple campuses connect by **WAN**.
- Staff working from home use **VPN** to reach internal systems securely.

Describing characteristics means linking type to scale, purpose, and operating context.

</div>


## A2.1.4 Transport and Application Protocols

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** protocols used at transport and application levels. You should identify what each protocol does and why it fits certain traffic.

| Protocol | Layer role in this topic | Best used when... |
| --- | --- | --- |
| **TCP** | Reliable transport with sequencing and retransmission | Accuracy/order are critical (for example file transfer, web page data) |
| **UDP** | Fast transport without guaranteed delivery | Low-latency streaming is preferred |
| **HTTP** | Web request/response protocol | Standard web content delivery |
| **HTTPS** | HTTP over encrypted secure connection | Confidentiality and integrity are required |
| **DHCP** | Automatic network configuration | Devices need automatic IP setup on joining a network |

</div>

### Worked example: loading a secure web page

<div class="reader-section-body reader-section-body--example">

A browser opening `https://school.example` typically involves:

1. **DHCP** may have already assigned local IP settings.
2. Connection uses **TCP** for reliable packet ordering.
3. Application communication uses **HTTPS** for secure content transfer.
4. Responses are returned to the browser and rendered.

Protocol descriptions are strongest when tied to this sort of concrete data flow.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

- TCP and HTTP are not alternatives; they operate at different layers and work together.
- HTTPS is not a separate "web" from HTTP; it is secure HTTP transport.
- UDP is not "bad"; it is appropriate when timeliness matters more than perfect delivery.

</div>


## A2.2.1 Network Topologies

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** the function and practical applications of topologies.

| Topology | Structural idea | Practical strength | Practical risk |
| --- | --- | --- | --- |
| **Star** | All nodes connect to one central switch/hub | Easy expansion and troubleshooting | Central device is a single point of failure |
| **Mesh** | Nodes interconnect with multiple direct paths | High resilience and redundancy | High cabling/management complexity |
| **Hybrid** | Combination of topology patterns | Flexible design for mixed environments | Planning/configuration complexity |

</div>

### Worked example: topology selection

<div class="reader-section-body reader-section-body--example">

| Scenario | Suitable topology | Why |
| --- | --- | --- |
| School ICT lab with 30 fixed desktops | Star | Cost-effective, manageable, easy device replacement |
| Emergency communications network | Mesh | Maintains connectivity if individual links fail |
| University estate with multiple building types | Hybrid | Different local needs can be combined into one design |

A high-quality description links each topology to a real deployment reason.

</div>


## A2.3.1 IP Addressing

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

The IB expects you to **describe** IP addressing types, including IPv4/IPv6 and static/dynamic assignment.

| Addressing concept | Description |
| --- | --- |
| **IPv4** | 32-bit addressing format (for example `192.168.1.10`) |
| **IPv6** | 128-bit addressing format with much larger address space |
| **Public IP** | Internet-routable address seen externally |
| **Private IP** | Local-network address not directly routable on the public internet |
| **Static IP** | Fixed address set manually or reserved |
| **Dynamic IP** | Automatically assigned, commonly by DHCP |
| **NAT** | Maps many private local devices to one/few public addresses |

</div>

### Worked example: home network addressing

<div class="reader-section-body reader-section-body--example">

A home router gives devices private IPv4 addresses:
- laptop: `192.168.0.12`
- phone: `192.168.0.15`
- tablet: `192.168.0.21`

Router public address from ISP: `81.22.14.90`

When the laptop accesses a website, NAT replaces source `192.168.0.12` with `81.22.14.90` for internet routing, then maps the reply back to the laptop.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

- Dynamic addressing simplifies device onboarding in schools/offices.
- Static addressing is useful for infrastructure devices (for example servers/printers) that need predictable addresses.
- IPv6 addresses long-term scalability limits found in IPv4.

</div>


## A2.4.1 Firewalls

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Discuss

The IB expects you to **discuss** firewall effectiveness. "Discuss" means balanced analysis: what firewalls do well, where they are limited, and how deployment context affects outcome.

A firewall evaluates traffic against rule sets, often based on source/destination IP, port, and protocol.

</div>

### Applied in context: effectiveness analysis

<div class="reader-section-body reader-section-body--apply">

| Firewall contribution | Why it helps |
| --- | --- |
| Blocks unauthorized inbound connections | Reduces attack surface on internal systems |
| Restricts risky outbound traffic | Limits exfiltration and unwanted service use |
| Enforces policy by IP/port/protocol | Standardizes network behavior and compliance |

| Firewall limitation | Why discussion must include it |
| --- | --- |
| Cannot fix weak passwords/social engineering | Many attacks bypass packet filtering entirely |
| Misconfigured rules can create gaps | Security depends on policy quality and maintenance |
| Limited visibility of encrypted payload content | Some malicious activity can be hidden inside permitted encrypted channels |

</div>

### Worked example: school firewall policy

<div class="reader-section-body reader-section-body--example">

School network policy:
- Allow outbound HTTPS (`443`) for web learning platforms.
- Block inbound connections to student devices from public internet.
- Allow internal access to file server only from staff VLAN.

This improves baseline security, but still requires endpoint protection, patching, and user-awareness controls.

</div>
