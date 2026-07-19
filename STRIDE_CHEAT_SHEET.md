# ⚡ STRIDE Framework Cheat Sheet

> **STRIDE** is a threat modeling methodology developed by Microsoft to help engineers categorize and identify security threats in software architectures.

---

## 📌 Summary Matrix

| Category | Security Property Violated | Definition | Target DFD Elements | Standard Mitigations |
| :--- | :--- | :--- | :--- | :--- |
| **S**poofing | **Authentication** | Pretending to be an entity (user, server, service) you are not. | External Entities, Processes | Strong Authentication, MFA, PKI Certificates, OAuth 2.0 / OIDC, FIDO2 / WebAuthn |
| **T**ampering | **Integrity** | Modifying data in transit or at rest without authorization. | Data Flows, Data Stores, Processes | HMAC, TLS 1.3, Digital Signatures, Parameterized Queries, Read-only Filesystems |
| **R**epudiation | **Non-Repudiation** | Denying having performed an action without the ability to prove otherwise. | Data Stores, Processes | Centralized Immutable Logging, Audit Trails, Digital Signatures, WORM Storage |
| **I**nformation Disclosure | **Confidentiality** | Exposing sensitive information to unauthorized individuals. | Data Flows, Data Stores, Processes | AES-256 Encryption at Rest, TLS in Transit, Secret Management, Least Privilege, Data Masking |
| **D**enial of Service | **Availability** | Degrading or denying access to system services for legitimate users. | Processes, Data Flows, Data Stores | Rate Limiting, Auto-scaling, CDN, Resource Quotas, Circuit Breakers, Input Size Limits |
| **E**levation of Privilege | **Authorization** | Gaining higher access rights than authorized (e.g. user to admin). | Processes | Least Privilege, Role-Based Access Control (RBAC), ABAC, Input Validation, Sandboxing |

---

## 🎯 STRIDE by Data Flow Diagram (DFD) Element

Different architectural elements are susceptible to specific STRIDE threat categories:

| DFD Element | Symbol | Applicable STRIDE Threat Categories |
| :--- | :---: | :---: |
| **External Entity** (User, External API) | `[ Rectangle ]` | **S**, **R** |
| **Process** (App Service, Microservice, Worker) | `( Circle / Oval )` | **S**, **T**, **R**, **I**, **D**, **E** (All 6) |
| **Data Store** (Database, Cache, S3 Bucket) | `[ Parallel Lines / Cylinder ]` | **T**, **R**, **I**, **D** |
| **Data Flow** (HTTPS, RPC, Message Queue) | `--> Arrow -->` | **T**, **I**, **D** |

---

## 🤖 STRIDE Extended for AI & LLM Agentic Systems

When modeling modern LLM-based agentic architectures, map traditional STRIDE categories to AI threat vectors:

| STRIDE Category | Traditional Software Example | LLM / Agentic AI Extension |
| :--- | :--- | :--- |
| **Spoofing** | Forged session cookie | Attacker spoofs an orchestrator agent in a multi-agent system |
| **Tampering** | SQL injection in search parameter | **Indirect Prompt Injection**: Malicious instructions hidden in fetched web pages or files |
| **Repudiation** | User denies making transaction | Agent takes real-world side-effect action without audit logging prompt history |
| **Information Disclosure** | Hardcoded database password in repo | System prompt leakage, RAG context window data exfiltration, LLM model extraction |
| **Denial of Service** | SYN flood on port 80 | Denial of Wallet / Token exhaustion attacks via recursive prompt loops |
| **Elevation of Privilege** | Buffer overflow to root shell | **Tool Misuse**: Prompt injection tricks agent into calling privileged tools (`run_code`, `delete_user`) |

---

## 💡 Quick Threat Modeling Checklist

When reviewing any component, ask these six questions:
1. 👤 **Spoofing**: *Can an attacker pretend to be someone else here?*
2. ✏️ **Tampering**: *Can an attacker modify this data while it moves or is stored?*
3. 📜 **Repudiation**: *If an action occurs, can we prove who did it?*
4. 🕵️ **Information Disclosure**: *Can unauthorized users view this sensitive data?*
5. 💥 **Denial of Service**: *Can an attacker bring this component down or drain its budget?*
6. 👑 **Elevation of Privilege**: *Can a normal user execute actions reserved for administrators?*
