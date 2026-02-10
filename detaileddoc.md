# Enterprise Agent Developer Handbook
## Unified Engineering Handbook for Governed Agentic AI

**Platforms:** CARE • Hybrid Cloud • Hybrid Data Platform (HDP) • MCP • Trino • OPA • DEx • OpenMetadata

**Audience:** Application Engineers, Platform Engineers, Data Engineers, Analytics Engineers

---

## 1. Purpose of This Handbook

This handbook is the **single, unified engineering reference** for building production-grade agentic AI solutions in a regulated enterprise environment.

It combines:
- Enterprise Agent Policy Standard
- Developer Handbook guidance
- Hybrid Data Platform (HDP) operating model
- Governance, billing, and observability requirements

This document is **prescriptive**. Any deviation requires explicit architecture and governance approval.

---

## 2. What You Are Building (Unified Mental Model)

You are building a **governed orchestration service** that coordinates:

- LLM-based planning and reasoning
- MCP and API-based capabilities
- Hybrid Data Platform access
- Business reusable services
- Human approvals and workflows

You are **not** building:
- A chatbot
- A free-form SQL interface
- A bypass around data entitlements or governance

---

## 3. Mandatory Governance Pre-Requisites

Before development begins, every use case **must**:

- Be registered in **Itonics** (Use Case ID)
- Progress through **AIOF**
- Be registered in **Kannon Model / Agent Risk Registry**
- Have an **Application ID** and **Cost Centre**

Agents **must refuse to execute** if these identifiers are missing.

---

## 4. Layered Architecture (Logical View)

```
┌───────────────────────────────────────────────────────────────┐
│                    User Interaction Layer                     │
│  Chat UI • Web UI • Application UI • Event Triggers           │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│              Application & API Layer (CARE)                   │
│  REST / GraphQL APIs • AuthN/AuthZ                             │
│  Itonics ID • AIOF Stage • Kannon Risk ID                      │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                Agent Runtime Layer (CARE)                     │
│  Planner • Executor • Verifier                                │
│  Policy Checks • Cost Guards • Audit Hooks                    │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│               Tooling & Capability Layer                      │
│  MCP Servers • Domain APIs • Business Services                │
│  Deterministic, Schema-Driven Interfaces                      │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│        Governance & Policy Enforcement (Cross-Cutting)        │
│  OPA (ABAC) • Entitlements • Purpose-Based Access             │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│          Hybrid Data Platform (Central & Federated)           │
│  Trino • BigQuery • Domain Warehouses • Object Storage        │
│  Iceberg • Spark • Airflow                                   │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│        Metadata, Lineage & Data Exchange Registry              │
│  OpenMetadata • Collibra • DEx • Data Quality Signals          │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│           Observability, Audit & Billing Layer                │
│  Logs • Metrics • Lineage • Cost Attribution                  │
│  Use Case ID • Application ID • Cost Centre                   │
└───────────────────────────────────────────────────────────────┘
```

**Key rules:**
- Agents never bypass tooling or governance layers
- Policy and cost checks apply **per tool invocation**
- Data platforms are accessed **only via MCP or APIs**

---

## 5. Planner / Executor / Verifier Control Loop

**Planner**
- Converts goal + context into a structured execution plan

**Executor**
- Enforces policy, risk, and cost
- Invokes allow-listed MCP or API tools

**Verifier**
- Validates correctness, data quality, lineage, and safety
- Produces final artefacts

> LLMs must **never** invoke tools directly.

---

## 6. Hybrid Data Platform (HDP) Integration

The HDP provides **Data Infrastructure as a Service**, spanning:

- On‑prem Anthos (Trino, Iceberg, Spark, Airflow)
- Cloud platforms (BigQuery, GCS, Dataflow)
- Domain-owned analytical stores

Agents interact with HDP **only** via:
- MCP servers
- Domain-owned APIs

Direct SQL access from agents is **prohibited**.

---

## 7. Trino Usage Model

Trino is an interactive query engine and **must not** be exposed directly to agents.

**Approved pattern:**
```
Agent → MCP / API → Trino → Data Sources
```

Responsibilities:
- Data owners define entitlements
- OPA enforces ABAC consistently
- Queries are deterministic and template-driven
- Residency and masking enforced upstream

---

## 8. OPA and Attribute-Based Access Control

OPA is the **mandatory enforcement layer**.

Policies answer:
- **Who** (agent identity, use case)
- **What** (dataset, columns)
- **Why** (declared purpose)
- **How** (read/write, aggregation)

Same policy model applies across Trino, BigQuery, and APIs.

---

## 9. Metadata, Lineage, and DEx

Systems of record:
- **Collibra** – business & logical models
- **OpenMetadata** – technical metadata
- **DEx (Data Exchange Registry)** – data products & access contracts

Agents must:
- Consume metadata signals
- Emit intent-level lineage per run

---

## 10. MCP Tool Design Standards

All agent-accessible capabilities must be wrapped as MCP tools.

Each tool must define:
- Schema & version
- Access classification (READ / WRITE)
- Cost unit
- Owning team
- Policy hooks

**Good tools:** `getDatasetSummary`, `fetchDQStatus`, `proposeChange`  
**Prohibited tools:** `runSQL`, `freeTextSearchAllData`

---

## 11. Cost, Billing, and Metering

Every agent run must meter:
- Runtime CPU/memory
- Tool invocations
- Data scanned
- LLM token usage

Costs attributed by:
- Application
- Domain
- Use Case ID
- Cost Centre

Agents must enforce per-run and per-day cost limits.

---

## 12. Development Environments

**DaS (JupyterHub)**
- Prototyping only
- Read-only, masked data
- No production credentials

**IDEs (IntelliJ, VS Code, PyCharm)**
- Local MCP/API mocks
- CI-enforced governance checks

**Promotion path:** DaS → App Service → CARE Runtime → Production

---

## 13. Observability and Audit

Each agent run must emit:

- `runId`
- `applicationId`
- `itonicsUseCaseId`
- `aiofStage`
- `kannonRiskId`
- `toolsInvoked`
- `datasetsAccessed`
- `policyDecisions`
- `costIncurred`
- `outputsProduced`

All fields must be retrievable via **GET APIs**.

---

## 14. Blocked-by-Default Actions

The following are prohibited unless explicitly approved:

- Direct SQL execution
- Raw Trino or BigQuery access
- Cross-domain access without entitlement
- Unbounded scans
- Production writes without approval
- Chat-driven production changes

---

## 15. First Agent in 30 Days (Engineer Playbook)

- **Week 1:** Choose read-only use case + governance registration
- **Week 2:** Prototype in DaS
- **Week 3:** Implement CARE service with MCP integration
- **Week 4:** Add observability, cost caps, deploy to controlled production

---

## 16. Final Engineering Principles

If your agent cannot explain:
- What it did
- Why it did it
- What data it accessed
- What it cost

…it is **not production-ready**.