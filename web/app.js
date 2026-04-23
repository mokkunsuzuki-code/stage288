async function loadData() {
  const res = await fetch("./site_data.json");
  if (!res.ok) {
    throw new Error(`Failed to load site_data.json: ${res.status}`);
  }
  return res.json();
}

function badgeClassForStatus(status) {
  if (status === "accept" || status === true) return "ok";
  if (status === "pending") return "warn";
  return "bad";
}

function heroTextClass(status) {
  if (status === "accept") return "ok-text";
  if (status === "pending") return "warn-text";
  return "bad-text";
}

function text(value) {
  return value === undefined || value === null ? "N/A" : String(value);
}

function render(data) {
  const app = document.getElementById("app");
  const c = data.contract;
  const compat = data.compatibility;

  const checksHtml = compat.checks.map(check => {
    const cls = badgeClassForStatus(check.passed);
    const label = check.passed ? "PASS" : "FAIL";
    return `
      <li>
        <strong>${check.id}</strong> — ${check.title}
        <span class="badge ${cls}" style="margin-left:8px;">${label}</span>
        <div class="label" style="margin-top:6px;">${text(check.detail)}</div>
      </li>
    `;
  }).join("");

  const artifactsHtml = (c.exposure_artifacts || []).map(item => `<li>${item}</li>`).join("");

  app.innerHTML = `
    <div class="card hero">
      <div class="hero-title">${text(data.hero_title)}</div>
      <div class="hero-status ${heroTextClass(data.hero_status_code)}">${text(data.hero_status)}</div>
      <div class="hero-substatus">${text(data.hero_substatus)}</div>
      <div class="hero-summary">${text(data.summary)}</div>
    </div>

    <div class="section grid">
      <div class="card">
        <div class="label">Page Stage</div>
        <div class="value">${text(data.page_stage)}</div>
      </div>
      <div class="card">
        <div class="label">Contract Stage</div>
        <div class="value">${text(c.stage)}</div>
      </div>
      <div class="card">
        <div class="label">Compatibility Stage</div>
        <div class="value">${text(compat.stage)}</div>
      </div>
    </div>

    <div class="section grid">
      <div class="card">
        <div class="label">Contract Decision</div>
        <div class="value"><span class="badge ${badgeClassForStatus(c.decision)}">${text(c.decision).toUpperCase()}</span></div>
      </div>
      <div class="card">
        <div class="label">Public Status</div>
        <div class="value"><span class="badge ${badgeClassForStatus(c.public_status)}">${text(c.public_status).toUpperCase()}</span></div>
      </div>
      <div class="card">
        <div class="label">Compatibility</div>
        <div class="value"><span class="badge ${badgeClassForStatus(compat.is_compatible)}">${compat.is_compatible ? "COMPATIBLE" : "INCOMPATIBLE"}</span></div>
      </div>
      <div class="card">
        <div class="label">Fail-Closed</div>
        <div class="value"><span class="badge ${badgeClassForStatus(c.fail_closed)}">${c.fail_closed ? "TRUE" : "FALSE"}</span></div>
      </div>
    </div>

    <div class="section grid">
      <div class="card">
        <h2>Reason</h2>
        <div class="value">${text(c.reason)}</div>
      </div>

      <div class="card">
        <h2>Contract Summary</h2>
        <div class="label">Contract Stage</div>
        <div class="value">${text(c.stage)}</div>

        <div class="label" style="margin-top:12px;">Spec Version</div>
        <div class="value">${text(c.spec_version)}</div>

        <div class="label" style="margin-top:12px;">Generated At</div>
        <div class="value">${text(c.generated_at)}</div>

        <div class="label" style="margin-top:12px;">Execution State</div>
        <div class="value">${text(c.execution_state)}</div>
      </div>
    </div>

    <div class="section grid">
      <div class="card">
        <h2>Compatibility Policy</h2>
        <div class="label">Compatibility Stage</div>
        <div class="value">${text(compat.stage)}</div>

        <div class="label" style="margin-top:12px;">Policy ID</div>
        <div class="value">${text(compat.policy_id)}</div>

        <div class="label" style="margin-top:12px;">Contract Version</div>
        <div class="value">${text(compat.contract_version)}</div>
      </div>

      <div class="card">
        <h2>Contract SHA-256</h2>
        <pre>${text(c.contract_sha256)}</pre>
      </div>
    </div>

    <div class="section card">
      <h2>Compatibility Checks</h2>
      <ul>${checksHtml}</ul>
    </div>

    <div class="section card">
      <h2>Exposure Artifacts</h2>
      <ul>${artifactsHtml}</ul>
    </div>

    <div class="footer">
      Stage288 exposes the Stage286 QSP product contract through a public verification interface, with Stage287 compatibility verification included.
    </div>
  `;
}

loadData()
  .then(render)
  .catch(err => {
    document.getElementById("app").innerHTML = `
      <div class="card">
        <h2>Failed to load verification page</h2>
        <pre>${err.message}</pre>
      </div>
    `;
  });
