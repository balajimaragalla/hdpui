# Enterprise Agent Developer Guide

## Unified, End-to-End Guidance for Building Governed Agentic AI

------------------------------------------------------------------------

## 1. Purpose and Audience

This document provides **authoritative, end-to-end guidance** for
building **agentic AI capabilities** in a regulated enterprise
environment.

It is intended for: - Application engineers - Platform and
infrastructure engineers - Data platform teams - Architecture, AI
governance, and model risk stakeholders

The guide is **mandatory guidance**, not optional best practice.

------------------------------------------------------------------------

## 2. Executive Summary

An enterprise agent is a **governed orchestration service**, not a
chatbot and not a shortcut around controls.

Agents: - Run inside approved application runtimes (CARE + Hybrid
Cloud) - Access data only through governed interfaces (MCP / APIs) - Are
subject to policy, risk, cost, and audit controls - Produce
deterministic, reviewable outputs

Agents exist to **accelerate delivery while preserving trust,
compliance, and cost discipline**.

------------------------------------------------------------------------

## 3. Pre-Requisites: Mandatory AI Governance Registration

No agent may be developed, tested, or deployed unless **all
prerequisites below are satisfied**.

### 3.1 Use Case Registration -- Itonics

Every agent use case must be registered in **Itonics** with: - Business
description and value - Owning domain and sponsor - Data categories
involved - Deployment environments

**Output:** Itonics Use Case ID

------------------------------------------------------------------------

### 3.2 AI Operating Framework (AIOF)

Each use case must progress through the **AIOF lifecycle**: - Problem
definition - Data & governance review - Design and controls - Human
oversight - Monitoring and retirement

**Output:** Approved AIOF stage

------------------------------------------------------------------------

### 3.3 Model / Agent Risk Registration -- Kannon

All agents must be registered in **Kannon Model Risk Registry**: - Agent
classification - Risk tier - Oversight requirements - Validation
evidence

**Output:** Kannon Model / Agent Risk ID

------------------------------------------------------------------------

### 3.4 Mandatory Governance Identifiers

Each agent invocation must carry:

  Identifier            Source
  --------------------- ---------
  Itonics Use Case ID   Itonics
  AIOF Stage            AIOF
  Kannon Risk ID        Kannon
  Application ID        CARE
  Cost Centre           Finance

------------------------------------------------------------------------

## 4. What Is an Agent (Enterprise Definition)

An agent is an application component that: - Accepts a **goal** - Plans
and executes **multi-step workflows** - Invokes **approved tools** -
Maintains execution state - Produces **structured, auditable artefacts**

Agents are **not**: - Chatbots - SQL clients - Autonomous systems with
unrestricted access

------------------------------------------------------------------------

## 5. When to Use (and Not Use) an Agent

### Use when

-   Workflows span multiple systems
-   Manual coordination dominates effort
-   Outputs can be formalised (PRs, tickets, reports)
-   Controls and approvals are defined

### Do not use when

-   Single API call is sufficient
-   Governance cannot be enforced
-   Cost cannot be bounded
-   Action is high-risk without oversight

------------------------------------------------------------------------

## 6. Reference Architecture

User / System\
UI / API\
Agent (CARE Runtime)\
Policy + Risk + Cost Gate\
MCP / API Tools\
Data Platforms / Knowledge Graph / Business Services\
Verification\
Artefacts + Audit + Cost Records

------------------------------------------------------------------------

## 7. Application Runtime: CARE + Hybrid Cloud

Agents run as standard services on: - Kubernetes (cloud + onâprem) -
Standard CI/CD pipelines - Managed secrets and IAM - Observability and
runtime controls

Agents use **service identities**, never user identities.

------------------------------------------------------------------------

## 8. Agent Control Loop

1.  Validate request and governance IDs\
2.  Enforce policy, risk, and cost gates\
3.  Generate structured execution plan\
4.  Invoke allowâlisted tools\
5.  Verify results and quality\
6.  Persist artefacts, audit, and metrics

Planner, Executor, and Verifier **must be logically separated**.

------------------------------------------------------------------------

## 9. Tooling Strategy: MCP and APIs

Agents never access databases directly.

Each tool must define: - Schema - Access class - Cost unit - Owning
team - Data classification

MCP is preferred for reusable, discoverable capabilities.

------------------------------------------------------------------------

## 10. Data Platforms (Central & Federated)

Agents: - Do not bypass platforms - Inherit sourceâsystem entitlements -
Access data only via governed interfaces

------------------------------------------------------------------------

## 11. Policy, Entitlements, and Trust

Policy is enforced **per tool call** using: - Service identity -
Purpose - Environment - Itonics ID - Kannon ID

All decisions are logged.

------------------------------------------------------------------------

## 12. Data Quality, Lineage, and Audit

Agents: - Validate freshness and quality - Emit intentâlevel lineage -
Link outputs to datasets and tools

------------------------------------------------------------------------

## 13. Knowledge Graph Integration

Used for: - Semantic resolution - Entity relationships - Smarter tool
selection

Agents do not mutate knowledge graphs unless approved.

------------------------------------------------------------------------

## 14. Business Reusable Components

Agents orchestrate: - Validation engines - News, Risk and pricing services -
Workflow and approval services

Business logic never lives in prompts.

------------------------------------------------------------------------

## 15. User Interaction Layer

Invocation patterns: - Chat interfaces - Application UIs - Eventâdriven
workflows

UI captures intent and governance IDs only.

------------------------------------------------------------------------

## 16. Agent Frameworks

### Google ADK

-   Googleânative
-   Opinionated
-   Platformâled

### LangChain / LangGraph

-   Explicit workflows
-   Dynamic gating
-   Portable

Framework choice does not change governance.

------------------------------------------------------------------------

## 17. Billing, Metering, and Cost Attribution

Meter: - Runtime resources - Tool invocations - Data scanned - LLM
tokens

Costs attributed by: - Application - Domain - Itonics Use Case ID - Cost
centre

------------------------------------------------------------------------

## 18. Development Environments

### DaS (JupyterHub)

-   Prototyping only
-   Readâonly data
-   No production access

### IDEs

-   IntelliJ, VS Code, PyCharm
-   Local mocks for MCP/APIs
-   CI enforces governance

------------------------------------------------------------------------

## 19. Observability & Compliance

Each run must emit:

-   runId
-   applicationId
-   itonicsUseCaseId
-   aiofStage
-   kannonRiskId
-   toolsInvoked
-   datasetsAccessed
-   costIncurred
-   outputsProduced

Queryable via GET endpoints.

------------------------------------------------------------------------

## 20. Secure Deployment Checklist

-   Itonics registered
-   AIOF approved
-   Kannon registered
-   Tool allowâlists
-   Cost limits
-   Approval workflows
-   Monitoring enabled

------------------------------------------------------------------------

## 21. Non-Negotiable Principles

1.  No agent without governance registration\
2.  No direct data access\
3.  Policy, risk, and cost enforced per call\
4.  Business logic outside prompts\
5.  Full auditability\
6.  Cost transparency

------------------------------------------------------------------------
