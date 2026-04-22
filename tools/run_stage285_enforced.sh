#!/usr/bin/env bash
set -euo pipefail

python3 tools/build_stage285_decision.py
python3 tools/verify_stage285_decision.py
python3 tools/enforce_stage285_decision.py
python3 tools/run_stage285_payload.py
