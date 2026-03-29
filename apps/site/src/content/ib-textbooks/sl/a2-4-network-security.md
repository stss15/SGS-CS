---
level: sl
unitNumber: 46
unitName: Network Security
summary: Firewalls, encryption, and digital certificates as central ideas in protecting network communication.
subtopics:
  - code: A2.4.1
    title: Firewalls
  - code: A2.4.4
    title: Encryption and digital certificates
sourcePolicy: ib_content_md_first
---

## A2.4.1 Discuss the effectiveness of firewalls at protecting a network

A <span data-def="A security system that monitors and filters incoming and outgoing network traffic according to a defined set of rules.">firewall</span> acts as a gatekeeper between networks. Its job is to inspect traffic and decide whether that traffic should be allowed to pass. To discuss firewall effectiveness properly, you need both sides of the argument: what firewalls do well and where their protection stops.

### What firewalls are effective at

Firewalls are good at controlling access based on rules involving source or destination addresses, protocols, and port numbers. They can block unwanted inbound traffic, restrict which destinations internal devices may contact, and log traffic patterns for later investigation. Some firewalls also use <strong>stateful inspection</strong>, meaning they track active connections and use that context when deciding whether later packets belong to an allowed session.

<div class="ib-textbook-note">
  <p class="ib-textbook-note__label">Why logs matter</p>
  <p class="ib-textbook-note__body">A firewall is not only a filtering device. Its logs can reveal repeated connection attempts, scanning behavior, unusual destinations, or traffic spikes that help administrators detect a breach or investigate one afterwards.</p>
</div>

### Where firewalls are less effective

A firewall cannot solve every security problem. If a threat is already inside the network, or arrives through apparently legitimate traffic, the firewall may do little to stop it. Firewalls are also limited by their configuration. A badly designed rule set can allow harmful traffic or block useful services. In addition, many firewalls inspect metadata such as addresses and ports rather than fully understanding the meaning of the content being sent.

They are also less effective against threats such as phishing, weak passwords, unpatched software, or a malicious insider, because those problems do not depend only on whether a packet should cross a network boundary.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">A firewall rule set in practice</p>
  <div class="ib-textbook-worked__body">
    <p>A school firewall may allow outgoing web traffic on ports 80 and 443, block direct access to administrative servers from student devices, and record repeated failed connection attempts from outside the network.</p>
    <p>Those rules reduce exposure and improve oversight.</p>
    <p>However, if a user inside the school opens a convincing phishing email and gives away credentials, the firewall has not prevented the compromise by itself.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.4.1</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Firewalls are effective at controlling traffic based on rules and at recording network activity.</li>
      <li>They help reduce exposure to unauthorized access and can support security monitoring.</li>
      <li>They are only one layer of defense and are limited by configuration quality, internal threats, and attacks that look like legitimate traffic.</li>
    </ul>
  </div>
</div>


## A2.4.4 Process of encryption and digital certificates

<span data-def="The process of converting readable plaintext into unreadable ciphertext so that only an authorized party can recover the original data.">Encryption</span> protects data by making it unreadable to anyone who does not have the correct key. In network security, the important distinction is between symmetric and asymmetric encryption, and then between digital signatures and digital certificates.

### Symmetric and asymmetric encryption

| Type | Key use | Strengths | Limitations |
|------|---------|-----------|-------------|
| **Symmetric encryption** | The same key encrypts and decrypts data | Fast and efficient for large amounts of data | The shared key must be exchanged securely |
| **Asymmetric encryption** | A public key encrypts and a private key decrypts, or vice versa for signatures | Supports secure key exchange and identity checking | Slower and more computationally expensive |

Symmetric encryption is usually preferred for the main flow of data once secure communication has been established. Asymmetric encryption becomes especially useful when two parties need to begin secure communication without having already met to exchange a secret key.

### What digital certificates do

A <span data-def="An electronic document, usually issued by a trusted certificate authority, that links a public key to an identified person, service, or organization.">digital certificate</span> helps prove that a public key really belongs to the claimed owner. Without that trust mechanism, an attacker could present a fake public key and pretend to be a legitimate site or service.

Certificates are commonly issued by a <span data-def="A trusted organization that verifies identity and signs digital certificates.">certificate authority (CA)</span>. The CA verifies the requester, then signs the certificate. A client can use the CA's public key to check that signature and decide whether to trust the presented certificate.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Keep these two ideas separate</p>
  <p class="ib-textbook-warning__body">A digital signature and a digital certificate are not the same thing. A signature is evidence that a message or file was signed using a particular private key. A certificate helps establish whose public key should be trusted in the first place.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Why HTTPS needs certificates</p>
  <div class="ib-textbook-worked__body">
    <p>A browser connects to a bank website and receives the site's certificate.</p>
    <p>The browser checks whether a trusted certificate authority has signed that certificate.</p>
    <p>If the certificate is valid, the browser can trust that the public key belongs to the real bank server.</p>
    <p>That trusted key can then be used as part of the process of establishing secure encrypted communication.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.4.4</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Symmetric encryption uses one shared key and is efficient for bulk data.</li>
      <li>Asymmetric encryption uses a public/private key pair and is valuable for secure exchange and authentication.</li>
      <li>Digital certificates link public keys to trusted identities so secure services such as HTTPS can verify who they are communicating with.</li>
    </ul>
  </div>
</div>
