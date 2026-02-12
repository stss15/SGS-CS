---
level: hl
unitNumber: 11
unitName: Advanced Networking
summary: Revise Advanced Networking with source-bounded coverage of A2.1.5, A2.2.2, A2.3.4, and A2.4.2, focusing on layered communication, server roles, routing behavior, and network vulnerability analysis.
subtopics:
  - code: A2.1.5
    title: TCP/IP Model
  - code: A2.2.2
    title: Server Functions
  - code: A2.3.4
    title: Static vs Dynamic Routing
  - code: A2.4.2
    title: Network Vulnerabilities
sourcePolicy: ib_content_md_first
---

## Key Terms and Definitions

| Term | Definition |
| --- | --- |
| TCP/IP model | Four-layer networking model: Application, Transport, Internet, Network Interface. |
| encapsulation | Process of adding protocol headers as data moves down network layers. |
| DNS server | Resolves domain names to IP addresses. |
| DHCP server | Dynamically assigns network configuration values such as IP address and gateway. |
| proxy server | Intermediary server handling requests on behalf of clients. |
| reverse proxy | Server in front of origin servers for load distribution, shielding, and TLS handling. |
| static routing | Manually configured routes that do not adapt automatically. |
| dynamic routing | Routes updated through router exchanges and protocol calculations. |
| DDoS | Distributed denial-of-service traffic flood intended to exhaust target resources. |
| man-in-the-middle (MitM) | Attack where adversary intercepts or alters communication between parties. |

## A2.1.5 TCP/IP Model

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

A complete description identifies each layer and its communication role.

| Layer | Core responsibility |
| --- | --- |
| Application | User-facing protocols and message formats |
| Transport | End-to-end delivery behavior (segmentation, ports, reliability options) |
| Internet | Logical addressing and packet routing across networks |
| Network Interface | Local link transmission over physical/network media |

Description quality improves when you map one concrete protocol to each layer.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

For a web request:

- Application: HTTP request formed.
- Transport: TCP segments data.
- Internet: IP addresses packet destination.
- Network Interface: Ethernet/Wi-Fi frame carries bits over local medium.

The same payload changes wrapper at each layer through encapsulation.

</div>

### Worked example: protocol-to-layer mapping

<div class="reader-section-body reader-section-body--example">

| Protocol/identifier | Layer |
| --- | --- |
| HTTP, DNS, SMTP | Application |
| TCP, UDP | Transport |
| IP | Internet |
| Ethernet, Wi-Fi MAC framing | Network Interface |

If DNS fails, the fault is typically diagnosed at Application layer service level, not at physical transmission level.

</div>

## A2.2.2 Server Functions

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Describing server function means linking server type to specific network role.

| Server type | Function |
| --- | --- |
| DNS | Name resolution |
| DHCP | Address configuration lease management |
| File | Shared file storage and access control |
| Mail | Send/receive/store email workflows |
| Proxy | Intermediary request handling/caching/filtering |
| Web | Host HTTP(S) content/services |

Descriptions should include purpose and operational effect.

</div>

### In real systems

<div class="reader-section-body reader-section-body--apply">

A corporate network often chains services:

- DHCP assigns device address on join.
- DNS resolves internal services.
- Proxy enforces filtering/caching policy.
- Web and file servers deliver applications and documents.

Each server role contributes to availability, manageability, or security posture.

</div>

### Worked example: startup sequence for one client device

<div class="reader-section-body reader-section-body--example">

| Step | Service involved | Outcome |
| --- | --- | --- |
| 1 | DHCP | Device receives IP and gateway |
| 2 | DNS | `portal.school.local` resolved to internal IP |
| 3 | Proxy | Request routed through policy filter |
| 4 | Web server | Portal page returned to client |

This sequence illustrates distinct server responsibilities in one ordinary workflow.

</div>

## A2.3.4 Static vs Dynamic Routing

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Explain

Explanation should compare route update behavior and fault response.

| Routing type | Strength | Limitation |
| --- | --- | --- |
| Static | Predictable, low protocol overhead | No automatic adaptation to failures |
| Dynamic | Automatic path recalculation and fault tolerance | Extra CPU/bandwidth and convergence complexity |

The key difference is adaptation under topology change.

</div>

### Applied in context

<div class="reader-section-body reader-section-body--apply">

Small office with one internet link can use static routes safely.

A multi-site enterprise with frequent path changes usually needs dynamic routing so routers exchange updates and select new paths when links fail.

Explanation quality improves when scale and resilience needs are explicit.

</div>

### Worked trace: link failure behavior

<div class="reader-section-body reader-section-body--example">

Initial path from A to D: `A -> B -> C -> D`

At `t0`, link `B-C` fails.

| Routing mode | Next behavior |
| --- | --- |
| Static | Traffic remains pointed to broken path until admin edits route table |
| Dynamic | Routers recompute and switch to `A -> E -> D` after update convergence |

Dynamic routing reduces outage duration in changing networks.

</div>

## A2.4.2 Network Vulnerabilities

### Overview

<div class="reader-section-body reader-section-body--concept">

**Command term:** Describe

Describe vulnerabilities by attack mechanism and system impact.

| Vulnerability type | Typical impact |
| --- | --- |
| DDoS | Service unavailable due to resource exhaustion |
| MitM | Data interception or tampering in transit |
| Phishing | Credential theft through deception |
| SQL injection | Unauthorized database actions via unsanitized input |
| XSS | Client-side script injection in trusted pages |
| Zero-day exploit | Attack before vendor patch is available |

Descriptions should remain concrete and technically specific.

</div>

### Common misconceptions

<div class="reader-section-body reader-section-body--apply">

- Different attacks can target different layers and trust boundaries.
- High traffic volume is not the only risk; low-volume credential theft can be equally severe.
- A vulnerability description is stronger when it includes how compromise occurs, not only attack name.

</div>

### Worked example: vulnerability impact table for one web platform

<div class="reader-section-body reader-section-body--example">

| Incident | Entry point | Immediate effect |
| --- | --- | --- |
| SQL injection on login form | Unsanitized query parameters | Unauthorized data read/write |
| Phishing email to staff | Deceptive credential capture | Account takeover |
| Botnet DDoS against public API | Massive distributed traffic flood | API outage for legitimate users |

These cases show how vulnerability type determines both technical impact and response priority.

</div>
