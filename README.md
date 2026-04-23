# Stage288: Compatibility-Aware Verification URL

## Overview

Stage288 turns the QSP product contract into a **public verification URL**.

This stage builds on:

- Stage286: product contract
- Stage287: contract compatibility verification

It publishes a browser-readable verification page that shows:

- decision
- public status
- fail-closed state
- contract SHA-256
- compatibility result
- compatibility checks

This is not just a visual page.
It is a compatibility-aware public verification interface.

---

## Why This Stage Matters

A verification URL is valuable only if it remains trustworthy as the product evolves.

Stage288 maximizes value by combining:

- public accessibility
- stable product contract
- version-aware compatibility
- reproducible site generation

This creates a stronger foundation for:

- SaaS products
- public trust interfaces
- external review
- OpenSSF-style exposure
- future multi-version verification services

---

## What This Stage Adds

- `tools/build_stage288_site.py`
- `tools/publish_stage288_site.py`
- `web/index.html`
- `web/app.js`
- `web/style.css`
- `out/site/site_data.json`
- `.github/workflows/stage288-pages.yml`

---

## Public Verification Model

The public page reads generated verification data and displays:

- contract decision
- public status
- compatibility state
- fail-closed status
- contract metadata
- compatibility checks
- exposure artifacts

The site is generated from local artifacts, not handwritten output.

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
  build_stage288_site.py
  publish_stage288_site.py

out/product/
  qsp_product_contract.json
  qsp_product_contract.json.sha256

out/compatibility/
  compatibility_report.json

out/site/
  site_data.json

web/
  index.html
  app.js
  style.css
  site_data.json
Local Build
python3 tools/build_stage286_product_contract.py
python3 tools/check_stage287_compatibility.py
python3 tools/verify_stage287_compatibility.py
python3 tools/build_stage288_site.py
python3 tools/publish_stage288_site.py
GitHub Pages

Push to main and GitHub Actions will:

rebuild the contract
rebuild compatibility
verify compatibility
build the site data
publish the verification page to GitHub Pages
What This Stage Proves
product contracts can be exposed through a stable public URL
compatibility state can be shown as part of public verification
public verification can remain aligned with version-aware semantics
a public verification interface can be generated deterministically from artifacts
Conceptual Transition

Stage286:

Define the product contract

Stage287:

Prove the contract stays compatible

Stage288:

Expose the compatible contract through a public verification URL

Future Directions
multi-version public verification
compatibility adapters in the browser
downloadable verification bundles
signed public exposure artifacts
public policy negotiation views
License

MIT License
Copyright (c) 2025
