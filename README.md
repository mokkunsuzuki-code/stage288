# Stage287: Contract Compatibility for QSP Product Contracts

## Overview

Stage287 introduces **contract compatibility verification** for QSP product contracts.

Stage286 defined the product contract.

Stage287 proves that the contract can now be checked for **backward-compatible verification semantics**, making the architecture more stable for future evolution.

This stage answers a core product question:

> Can the system evolve without breaking verification?

---

## Why This Stage Matters

A product gains value not only by being verifiable, but by **remaining verifiable across versions**.

This stage establishes:

- explicit compatibility policy
- stable core semantics
- version-aware verification
- a path toward long-term product evolution

This is important for:

- SaaS deployment
- standardization
- OpenSSF-style external review
- long-lived public verification systems

---

## Core Idea

A product contract must remain compatible across change.

Stage287 checks whether a contract still preserves:

- known version identity
- required core layers
- stable decision semantics
- explicit fail-closed meaning
- public verification status

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
Build the Product Contract
python3 tools/build_stage286_product_contract.py
Check Compatibility
python3 tools/check_stage287_compatibility.py
Verify Compatibility
python3 tools/verify_stage287_compatibility.py
What This Stage Proves
product contract versions can be checked explicitly
backward-compatible semantics can be defined as policy
future versions can evolve without silently breaking verification
public verification systems can later depend on a stable compatibility layer
Conceptual Transition

Stage286:

Define the product contract

Stage287:

Prove the contract can evolve without breaking verification

Future Directions
compatibility adapters for future major versions
negotiation between contract versions
verification URL over compatibility-aware contracts
remote public contract validation
policy-aware multi-version verification services
License

MIT License
Copyright (c) 2025
