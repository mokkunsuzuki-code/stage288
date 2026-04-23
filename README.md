# Stage287: Contract Compatibility for QSP Product Contracts

## Overview

Stage287 introduces **contract compatibility verification** for QSP product contracts.

Stage286 defined the product contract.
Stage287 proves that the contract can evolve **without breaking verification**.

This stage adds a version-aware compatibility policy and a deterministic compatibility report.

---

## Why This Stage Matters

A product gains long-term value not only by being verifiable, but by **remaining verifiable across versions**.

Stage287 establishes:

- explicit compatibility policy
- backward-compatible verification semantics
- stable core contract expectations
- version-aware checks for future evolution

This matters for:

- SaaS deployment
- standardization
- OpenSSF-style review
- long-lived public verification systems

---

## Core Idea

A product contract should remain compatible as the system evolves.

Stage287 verifies whether a contract still preserves:

- known version identity
- required core layers
- stable decision semantics
- explicit fail-closed meaning
- derivable public verification status

---

## What This Stage Adds

This stage adds:

- `spec/compatibility_policy.json`
- `schemas/qsp_product_contract_v1.schema.json`
- `schemas/qsp_product_contract_compatibility.schema.json`
- `tools/check_stage287_compatibility.py`
- `tools/verify_stage287_compatibility.py`
- `out/compatibility/compatibility_report.json`

---

## Repository Structure

```text
spec/
  compatibility_policy.json
  qsp_product_spec.json

schemas/
  qsp_product_contract.schema.json
  qsp_product_contract_v1.schema.json
  qsp_product_contract_compatibility.schema.json

tools/
  build_stage286_product_contract.py
  verify_stage286_product_contract.py
  check_stage287_compatibility.py
  verify_stage287_compatibility.py

out/product/
  qsp_product_contract.json
  qsp_product_contract.json.sha256

out/compatibility/
  compatibility_report.json
Build Product Contract
python3 tools/build_stage286_product_contract.py
Check Compatibility
python3 tools/check_stage287_compatibility.py
Verify Compatibility
python3 tools/verify_stage287_compatibility.py
Expected Result

A successful run produces:

a compatibility report
explicit version binding
compatibility status = true
five policy checks passed
What This Stage Proves
product contract versions can be checked explicitly
backward-compatible semantics can be defined as policy
future versions can evolve without silently breaking verification
later public verification systems can depend on a stable compatibility layer
Conceptual Transition

Stage286:

Define the product contract

Stage287:

Prove the contract can evolve without breaking verification

Significance

This stage moves the project from:

a defined product contract

to:

a version-stable product contract

That is a major step toward:

durable verification
product reliability
future-proof interfaces
public-facing verification services
Future Directions
compatibility adapters for future major versions
negotiation between contract versions
compatibility-aware verification URLs
remote public contract validation
policy-aware multi-version verification services
License

MIT License
Copyright (c) 2025
