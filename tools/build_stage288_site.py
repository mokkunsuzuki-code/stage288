#!/usr/bin/env python3
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
CONTRACT_PATH = ROOT / "out" / "product" / "qsp_product_contract.json"
COMPAT_PATH = ROOT / "out" / "compatibility" / "compatibility_report.json"
OUT_DIR = ROOT / "out" / "site"
OUT_PATH = OUT_DIR / "site_data.json"


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    contract = json.loads(CONTRACT_PATH.read_text(encoding="utf-8"))
    compatibility = json.loads(COMPAT_PATH.read_text(encoding="utf-8"))

    site_data = {
        "stage": "stage288",
        "title": "QSP Product Contract Verification URL",
        "contract": {
            "stage": contract.get("stage"),
            "spec_version": contract.get("spec_version"),
            "generated_at": contract.get("generated_at"),
            "decision": contract.get("decision_layer", {}).get("decision"),
            "reason": contract.get("decision_layer", {}).get("reason"),
            "public_status": contract.get("exposure_layer", {}).get("public_status"),
            "fail_closed": contract.get("enforcement_layer", {}).get("fail_closed"),
            "execution_state": contract.get("enforcement_layer", {}).get("execution_state"),
            "contract_sha256": contract.get("exposure_layer", {}).get("contract_sha256"),
            "exposure_artifacts": contract.get("exposure_layer", {}).get("exposure_artifacts", []),
        },
        "compatibility": {
            "policy_id": compatibility.get("policy_id"),
            "contract_version": compatibility.get("contract_version"),
            "is_compatible": compatibility.get("is_compatible"),
            "checks": compatibility.get("checks", []),
        }
    }

    OUT_PATH.write_text(
        json.dumps(site_data, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8"
    )

    print(f"[OK] wrote {OUT_PATH}")
    print(f"[OK] decision={site_data['contract']['decision']}")
    print(f"[OK] public_status={site_data['contract']['public_status']}")
    print(f"[OK] is_compatible={site_data['compatibility']['is_compatible']}")


if __name__ == "__main__":
    main()
