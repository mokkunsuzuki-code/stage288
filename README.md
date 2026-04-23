# Stage286: QSP Internal Connection as a Product Specification

## Overview

Stage286 upgrades the QSP-to-VEP connection from an implementation detail into a **product specification**.

This stage defines a stable internal contract for how QSP:

- receives normalized input
- produces a decision
- enforces fail-closed behavior
- exports a public-facing exposure contract for VEP

This transforms:

- a connected system

into:

- a reproducible product interface

---

## Why This Stage Matters

Previous stages established:

- evidence generation
- trust measurement
- QSP–VEP connectivity

Stage286 makes that connection:

- stable
- replaceable
- product-ready

The goal is not a new cryptographic primitive.

The goal is to define a **durable internal contract** that allows future engines (QKD, PQC, hybrid, etc.) to evolve without breaking the external verification experience.

---

## Core Product Model

Stage286 defines four product layers:

### 1. Input Layer
- session_id
- subject
- policy
- evidence (integrity / execution / identity / time)

### 2. Decision Layer
- decision: accept / pending / reject
- reason
- trust scores
- verified claims

### 3. Enforcement Layer
- fail-closed behavior (explicit)
- execution state
- allowed outputs

### 4. Exposure Layer
- public status
- exposure artifacts
- contract SHA-256

---

## Product Contract

All QSP decisions are normalized into a **single deterministic contract**:


out/product/qsp_product_contract.json


This contract becomes:

- the source of truth for VEP
- the basis for public verification
- the interface boundary for future systems

---

## What This Stage Proves

- QSP internal connection can be formalized as a product contract
- fail-closed behavior can be explicitly modeled and verified
- VEP can consume a normalized contract instead of ad hoc artifacts
- system evolution (QKD / PQC / hybrid) is possible without breaking the interface

---

## Repository Structure


spec/
qsp_product_spec.json

schemas/
qsp_product_contract.schema.json

tools/
build_stage286_product_contract.py
verify_stage286_product_contract.py

out/product/
qsp_product_contract.json
qsp_product_contract.json.sha256


---

## Build

```bash
python3 tools/build_stage286_product_contract.py
Verify
python3 tools/verify_stage286_product_contract.py
Verification Guarantees

The verification step ensures:

correct stage binding (stage286)
explicit fail-closed requirement
valid decision type
consistency between decision and public status
SHA-256 integrity of the contract
Product Significance

This stage represents a transition:

From:

research pipeline
verification stack
connected prototype

To:

product contract
replaceable architecture
stable verification interface
Conceptual Summary

Stage285:

QSP and VEP are connected

Stage286:

The connection is defined as a product contract

Future Directions
Contract compatibility (versioning / backward support)
Policy negotiation
QKD session binding
PQC signature integration
Threshold/multi-party approval
Remote attested execution
SaaS deployment model
License

MIT License
Copyright (c) 2025
