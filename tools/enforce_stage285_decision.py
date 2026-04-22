#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fail-closed enforcement for Stage285 decision.json"
    )
    parser.add_argument(
        "--decision",
        default="out/decision/decision.json",
        help="Path to decision JSON",
    )
    args = parser.parse_args()

    decision_path = Path(args.decision)
    data = load_json(decision_path)

    decision = data.get("decision")
    if decision != "accept":
        print("[FAIL-CLOSED] decision is not accept")
        print(f"[FAIL-CLOSED] decision={decision!r}")
        raise SystemExit(1)

    print("[OK] enforcement passed")
    print("[OK] decision=accept")
    print("[OK] execution allowed")


if __name__ == "__main__":
    main()
