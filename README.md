# QSP / VEP / Stage285

## Fail-Closed Enforcement

Stage285 connects protocol decision output to execution control.

Stage284 produced a machine-readable decision:

```json
{
  "decision": "accept"
}

Stage285 adds enforcement:

accept -> execution continues
reject -> execution stops immediately

This is the fail-closed transition from decision to enforcement.

Overview

Stage285 proves that verification is not only visible and reproducible, but also enforceable.

Pipeline:

verification input
decision generation
decision verification
fail-closed enforcement
protected execution

If the decision is not accept, the protected execution never runs.

Decision Policy

Stage285 uses the following minimal deterministic policy:

verified must be boolean
verification_url must exist
verified = true -> accept
verified = false -> reject
reject -> fail-closed stop
Public Verification URL

https://mokkunsuzuki-code.github.io/stage285/

What This Stage Proves
Decision output can control execution
Reject results are enforced, not merely displayed
Fail-closed behavior can be reproduced locally and in CI
Stage284 decision logic can be connected to protocol enforcement
Example Decision Output
{
  "decision": "accept",
  "reason": "verified=true",
  "subject": "stage285",
  "verification_url": "https://mokkunsuzuki-code.github.io/stage285/"
}
Example Enforcement Rule
if decision != "accept":
    stop immediately
Local Run
bash tools/run_stage285_enforced.sh
Expected Result

When verified = true:

decision.json is written
decision verification passes
enforcement passes
protected payload executes

When verified = false:

decision.json becomes reject
enforcement stops with exit code 1
protected payload does not execute
Why This Matters

A visible decision is not enough.

A protocol becomes stronger when the decision is enforced automatically.

Stage285 turns:

verification -> decision

into:

verification -> decision -> enforcement

That is a meaningful fail-closed step toward protocol behavior.

Relationship to Earlier Stages
Stage280: trust-rich signed decision
Stage284: minimal deterministic decision
Stage285: fail-closed execution enforcement

Together these stages move from proof, to decision, to action.

License

MIT License

Copyright (c) 2025
