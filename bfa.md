# Business Problem Statement  
## Data Access, Control, and Auditability at Scale

---

## 1. Business Context

The firm operates across multiple highly regulated business functions including
Investment Banking, Compliance, Risk, Finance, and Treasury.

These functions depend on **shared, historical, and operational data** to:
- Meet regulatory and statutory obligations
- Produce risk, finance, and compliance reporting
- Enable analytics, insight, and decision-making
- Support emerging advanced analytics and AI use cases

Over time, the number of **data producers, consumers, and use cases has increased significantly**, while regulatory expectations around **data ownership, access control, lineage, and auditability** have become more stringent.

The challenge facing the firm is no longer data availability, but **how data can be accessed, governed, and evidenced safely at scale**.

---

## 2. Observed Business Challenges

### 2.1 Unclear Accountability and Ownership

From a business and regulatory perspective, it is not always clear:
- Who owns a given dataset or data product
- Who is accountable for its quality and correctness
- Who has approved its reuse beyond the original application context

This ambiguity creates friction during audits and increases reliance on informal knowledge rather than authoritative records.

---

### 2.2 Inconsistent Access and Consumption Patterns

Data is currently consumed through multiple mechanisms:
- APIs
- Analytical queries
- File extracts
- Bespoke integrations

Similar data assets may be accessed differently by different teams, increasing:
- Operational complexity
- Risk of mis-use
- Difficulty demonstrating consistent controls

There is no single, standardised way to understand **how** a dataset is permitted to be consumed.

---

### 2.3 High Cost of Safe Enablement

Providing compliant data access requires:
- Security guardrails
- Entitlement models
- Identity integration
- Audit logging
- Residency and retention controls

These capabilities require specialised skills and are costly to recreate repeatedly.
As a result:
- Teams either duplicate effort
- Or bypass formal controls to maintain delivery velocity

Neither outcome scales safely.

---

### 2.4 Limited Reuse and Discoverability of Data Products

Data reuse across functions is constrained by:
- Lack of a single authoritative registry of data products
- Informal, relationship-based discovery
- Inconsistent documentation and entitlement clarity

This leads to:
- Rebuilding of similar datasets
- Delayed delivery of business outcomes
- Reduced return on data investments

---

### 2.5 Audit and Evidence Gaps

From an audit and regulatory standpoint, it is increasingly difficult to answer fundamental questions consistently and efficiently:

- Who accessed which data?
- Under what entitlement?
- For what approved purpose?
- Through which access mechanism?
- At what point in time?
- Based on whose approval?

Evidence is often:
- Distributed across multiple systems
- Assembled manually
- Reconstructed retrospectively during audits

This increases audit cost, operational burden, and regulatory exposure.

---

## 3. Business Impact

The combined impact of these challenges includes:
- Slower delivery of regulatory and analytical outcomes
- Increased operational and compliance risk
- Higher total cost of ownership due to duplication
- Reduced confidence in data usage at enterprise scale
- Reactive rather than proactive audit posture

---

## 4. What the Business Needs (Principle-Led)

The business requires:

- A **single, authoritative registry** of data products
- Clear ownership, stewardship, and accountability
- Explicit, declared entitlements for each data product
- Approved and visible access modes (API, batch, analytical)
- Automated enforcement of access controls
- Continuous, tamper-resistant audit evidence
- The ability to demonstrate compliance without manual reconstruction

Critically, these capabilities must scale **without requiring each application or team to reinvent governance and audit controls**.

---

## 5. What the Business Is *Not* Asking For

The business is **not** seeking:
- A new organisational operating model
- Loss of application ownership of data
- Centralisation of business logic
- Uncontrolled self-service data access
- Manual governance workflows that slow delivery

The requirement is **clarity, consistency, and control**, not bureaucracy.

---

## 6. Framing the Desired Outcome

From a business perspective, success looks like:

- Data products are explicitly registered once
- Ownership and entitlements are clear and authoritative
- Access is granted only through approved mechanisms
- All access is automatically enforced and logged
- Audit evidence is available by design, not reconstruction
- Data can be reused safely across regulated functions

This creates confidence that data is:
- Governed consistently
- Accessed appropriately
- Defensible under audit
- Scalable for future analytical and AI needs

---

## 7. Summary

The firm’s challenge is no longer technical data storage or ingestion.

The challenge is **how to safely enable data access at scale while maintaining
clear ownership, consistent control, and defensible audit evidence**.

Solving this problem requires:
- Clear separation between policy definition and policy enforcement
- Automation over manual process
- Platforms that operationalise governance rather than redefine it