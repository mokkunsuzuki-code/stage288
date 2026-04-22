#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path


def main() -> None:
    output_path = Path("out/decision/payload_result.json")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    result = {
        "stage": "stage285",
        "payload_executed": True,
        "message": "Protected execution ran because decision was accept."
    }

    output_path.write_text(
        json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )

    print(f"[OK] wrote {output_path}")
    print("[OK] protected payload executed")


if __name__ == "__main__":
    main()
