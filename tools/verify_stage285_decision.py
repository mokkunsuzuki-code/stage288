#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def expected_decision(status: dict) -> dict:
    verified = status.get("verified")
    verification_url = status.get("verification_url")

    if not isinstance(verified, bool):
        return {
            "decision": "reject",
            "reason": "invalid or missing 'verified'"
        }

    if not verification_url:
        return {
            "decision": "reject",
            "reason": "missing verification_url"
        }

    decision = "accept" if verified else "reject"
    reason = "verified=true" if verified else "verified=false"

    result = {
        "decision": decision,
        "input": {
            "verified": verified
        },
        "policy": {
            "name": "verified-url-required-with-fail-closed-enforcement",
            "accept_if_verified": True,
            "reject_if_not_verified": True,
            "require_verification_url": True,
            "fail_closed": True
        },
        "reason": reason,
        "subject": status.get("subject", "stage285"),
        "verification_url": verification_url
    }

    if "details" in status and isinstance(status["details"], dict):
        result["details"] = status["details"]

    return result


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Verify Stage285 decision.json deterministically"
    )
    parser.add_argument(
        "--input",
        default="out/verification/verification_status.json",
        help="Path to verification input JSON",
    )
    parser.add_argument(
        "--decision",
        default="out/decision/decision.json",
        help="Path to decision JSON",
    )
    args = parser.parse_args()

    status = load_json(Path(args.input))
    actual = load_json(Path(args.decision))
    expected = expected_decision(status)

    if actual != expected:
        print("[ERROR] decision.json mismatch")
        print("expected:")
        print(json.dumps(expected, ensure_ascii=False, indent=2, sort_keys=True))
        print("actual:")
        print(json.dumps(actual, ensure_ascii=False, indent=2, sort_keys=True))
        raise SystemExit(1)

    print("[OK] decision.json verified")
    print(f"[OK] decision={actual['decision']}")


if __name__ == "__main__":
    main()
