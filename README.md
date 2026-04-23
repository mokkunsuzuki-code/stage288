# Stage286: QSP Internal Connection as a Product Specification

## Overview

Stage286 upgrades the QSP-to-VEP connection from an implementation detail into a **product specification**.

This stage defines a stable internal contract for how QSP:

- receives normalized input
- produces a decision
- enforces fail-closed behavior
- exports a public-facing exposure contract for VEP

This transforms:

- connected components

into:

- a reproducible product interface

---

## Why This Stage Matters

Earlier stages proved that:

- evidence can be generated
- trust signals can be measured
- QSP and VEP can be connected

Stage286 makes that connection **stable, portable, and productizable**.

The main goal is not a new cryptographic primitive.

The goal is to define a **durable internal contract** so that future engines
(QKD-backed, PQC-backed, hybrid, remote-attested, SaaS, etc.) can be swapped in
without breaking the external verification experience.

---

## Core Product Model

Stage286 defines four product layers:

1. **Input Layer**
   - normalized session input
   - subject
   - policy
   - evidence

2. **Decision Layer**
   - accept / pending / reject
   - reason
   - trust scores
   - verified claims

3. **Enforcement Layer**
   - explicit fail-closed requirement
   - execution state
   - allowed outputs

4. **Exposure Layer**
   - stable export to VEP
   - public status
   - public artifacts
   - contract digest

---

## What This Stage Proves

- QSP internal connection can be formalized as a product contract
- fail-closed behavior can be represented as a first-class specification rule
- VEP can consume a normalized contract instead of ad hoc files
- future engine replacement is possible without changing the public contract

---

## Repository Structure

```text
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
Build
python3 tools/build_stage286_product_contract.py
Verify
python3 tools/verify_stage286_product_contract.py
Expected Output

The build step generates:

out/product/qsp_product_contract.json
out/product/qsp_product_contract.json.sha256

The verification step checks:

correct stage binding
explicit fail-closed requirement
valid decision enum
public status consistency
SHA-256 integrity
Product Significance

This stage is important because it moves QSP from:

a research pipeline
a verification stack
a connected demo

toward:

a product contract
a replaceable architecture
a future-proof public trust interface

In short:

Stage285 connected QSP and VEP.
Stage286 defines the product contract that governs that connection.

Future Directions

Possible future upgrades built on this stage include:

QKD session binding
PQC signature binding
threshold approval policies
remote attested execution
multi-tenant deployment
policy version negotiation
compatibility guarantees across product versions
License

MIT License
Copyright (c) 2025
