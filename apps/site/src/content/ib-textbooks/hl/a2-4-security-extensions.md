---
level: hl
unitNumber: 47
unitName: Network Security Extensions
summary: Common network vulnerabilities and the layered countermeasures used to reduce their impact.
subtopics:
  - code: A2.4.2
    title: Common network vulnerabilities
  - code: A2.4.3
    title: Common network countermeasures
sourcePolicy: ib_content_md_first
---

## A2.4.2 Common network vulnerabilities

Network vulnerabilities are weaknesses that attackers can exploit to steal information, interrupt services, alter communications, or gain unauthorised access. A good explanation does more than name the attack. It explains the weakness, the method of exploitation, and the kind of harm that follows.

### Availability attacks

A <span data-def="Distributed denial of service; an attack in which many compromised systems flood a target with traffic so that legitimate users cannot access the service.">distributed denial of service (DDoS)</span> attack targets availability. The attacker overwhelms the target with requests so the service slows down or stops responding. No password needs to be stolen for the attack to be serious; a system that cannot serve legitimate users has already failed.

### Interception and protocol weakness

If a system still relies on insecure protocols such as HTTP, FTP, or Telnet, data can be exposed in transit. A <span data-def="Man-in-the-middle attack; an attack in which an adversary positions themselves between two communicating parties so they can read or alter the traffic.">man-in-the-middle (MitM)</span> attack exploits that weakness by placing the attacker between the sender and the receiver. The danger is not only eavesdropping. The attacker may also alter the data before it arrives.

### Software weaknesses

Malware, unpatched software, and zero-day exploits all show that weaknesses can exist inside the software environment itself.

- **Malware** is malicious software designed to damage systems, steal data, or spread to other devices.
- **Unpatched software** remains vulnerable because known fixes have not been applied.
- **Zero-day exploits** are especially dangerous because attackers are using the weakness before a patch is available.

### Application-input weaknesses

Unsafe handling of user input creates a different class of vulnerability. In <span data-def="A web-application attack in which hostile input is used to manipulate the database query being executed by the server.">SQL injection</span>, hostile input interferes with database queries. In <span data-def="Cross-site scripting; an attack in which malicious client-side code is injected into a web page and then run in another user's browser.">cross-site scripting (XSS)</span>, hostile input allows malicious script code to run in the browser. These attacks matter because the weakness is not the network cable or the server hardware. It is the way the application handles data.

### Human and authentication weaknesses

Not every vulnerability is purely technical. <span data-def="A social-engineering attack that uses deceptive messages or websites to trick users into revealing credentials or other sensitive information.">Phishing</span> succeeds by exploiting trust. Weak authentication succeeds because passwords are easy to guess, steal, or reuse. In both cases, the network may be technically functional but still insecure because users or identity systems are easy to manipulate.

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">One web platform, several vulnerability types</p>
  <div class="ib-textbook-worked__body">
    <p>A web platform may first face a DDoS attack that makes the site unreachable. If the login page still uses an insecure protocol, a man-in-the-middle attacker could intercept credentials in transit. If user input is not validated, the same platform may also be exposed to SQL injection or cross-site scripting. If the server has missed important updates, known software weaknesses may then give the attacker deeper access.</p>
    <p>The point is that vulnerabilities often stack. A real compromise rarely depends on one weakness alone.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.4.2</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Different vulnerabilities threaten different aspects of security, including availability, confidentiality, integrity, and access control.</li>
      <li>Descriptions should explain how the vulnerability works and what harm it enables.</li>
      <li>Many important vulnerabilities arise from weak design, weak maintenance, or weak human practice rather than from one single technical flaw.</li>
    </ul>
  </div>
</div>


## A2.4.3 Common network countermeasures

Effective network security is layered. No single countermeasure protects against every threat, so strong defence combines preventive controls, detection systems, safe user practice, and recovery planning.

### Controls for unsafe web behaviour

Web applications need controls that stop hostile input from becoming executable behaviour. Input validation rejects malformed or suspicious data before it is processed. Browser-side loading rules, such as a <span data-def="Content Security Policy; a set of rules sent in an HTTP header that restricts which sources a web page is allowed to load content from.">content security policy (CSP)</span>, help reduce the chance that injected content will run in the first place. These controls are especially relevant to SQL injection and cross-site scripting.

### Controls for weak authentication and credential theft

Strong authentication makes impersonation harder. Modern systems may use passwords, passkeys, or other stronger identity checks, but the main idea is the same: make it difficult for one guessed or stolen secret to be enough. <span data-def="Multifactor authentication; an approach that requires more than one form of proof of identity, such as a password plus a one-time code or biometric check.">Multifactor authentication (MFA)</span> is especially useful because it limits the damage caused by phishing and password reuse.

### Controls for interception, overload, and intrusion

Encrypted protocols such as HTTPS, SFTP, and SSH protect data in transit and reduce the risk of man-in-the-middle interception. DDoS mitigation tools use methods such as rate limiting, filtering, and traffic absorption to keep services available under overload.

An <span data-def="A system that monitors traffic and reports suspicious behaviour without directly blocking it.">intrusion detection system (IDS)</span> watches for suspicious activity and raises alerts. An <span data-def="A system that monitors traffic and actively blocks or interrupts suspicious behaviour.">intrusion prevention system (IPS)</span> goes further by blocking packets, closing connections, or interrupting the attack. Virtual private networks (VPNs) add another layer by creating encrypted tunnels for remote access over public infrastructure.

### Controls for known weaknesses and recovery

Regular updates and patching remove known weaknesses before attackers can exploit them. Email filtering reduces the chance that malicious attachments or phishing messages reach users. Testing and staff training matter because many successful attacks still depend on human error.

Wireless controls and secure backups are also part of defence in depth. Restricting wireless access reduces the chance of unauthorised connection, while protected backups make recovery possible after ransomware, hardware failure, or accidental loss.

<div class="ib-textbook-warning">
  <p class="ib-textbook-warning__label">Avoid one-line security answers</p>
  <p class="ib-textbook-warning__body">Saying "use encryption" or "install antivirus" is rarely enough. High-quality explanations match the threat to an appropriate countermeasure and explain why that control reduces the risk.</p>
</div>

<div class="ib-textbook-worked">
  <p class="ib-textbook-worked__label">Worked example</p>
  <p class="ib-textbook-worked__title">Matching the threat to the control</p>
  <div class="ib-textbook-worked__body">
    <p>If phishing emails reach users, email filtering is the first protective layer. If a user still gives away a password, multifactor authentication can stop the attacker from logging in with that password alone. If unusual traffic then appears from the compromised account, an intrusion-detection or intrusion-prevention system may flag or block the behaviour.</p>
    <p>This is what defence in depth means in practice: one control may fail, but another still reduces the damage.</p>
  </div>
</div>

<div class="ib-textbook-summary">
  <p class="ib-textbook-summary__label">Key takeaways - A2.4.3</p>
  <div class="ib-textbook-summary__body">
    <ul>
      <li>Countermeasures are most effective when they are matched to specific vulnerability types.</li>
      <li>Network defense combines prevention, detection, response, and recovery measures.</li>
      <li>Strong security depends on multiple overlapping controls rather than one single safeguard.</li>
    </ul>
  </div>
</div>
