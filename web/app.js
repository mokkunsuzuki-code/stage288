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

function text(value) {
  return value === undefined || value === null ? "N/A" : String(value);
}

function jpDecision(value) {
  if (value === "accept") return "承認";
  if (value === "pending") return "保留";
  if (value === "reject") return "拒否";
  return text(value);
}

function jpCompatibility(value) {
  return value ? "互換性あり" : "互換性なし";
}

function jpFailClosed(value) {
  return value ? "有効" : "無効";
}

function jpCheckResult(value) {
  return value ? "合格" : "不合格";
}

function jpExecutionState(value) {
  if (value === "released") return "公開中";
  if (value === "restricted") return "制限中";
  if (value === "halted_safe") return "安全停止";
  return text(value);
}

function render(data) {
  const app = document.getElementById("app");
  const c = data.contract;
  const compat = data.compatibility;

  const checksHtml = compat.checks.map(check => {
    const cls = badgeClassForStatus(check.passed);
    const label = jpCheckResult(check.passed);
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
    <div class="card">
      <h1>${text(data.page_title)}</h1>
      <p>${text(data.summary)}</p>
    </div>

    <div class="section grid">
      <div class="card">
        <div class="label">ページステージ</div>
        <div class="value">${text(data.page_stage)}</div>
      </div>
      <div class="card">
        <div class="label">契約ステージ</div>
        <div class="value">${text(c.stage)}</div>
      </div>
      <div class="card">
        <div class="label">互換性ステージ</div>
        <div class="value">${text(compat.stage)}</div>
      </div>
    </div>

    <div class="section grid">
      <div class="card">
        <div class="label">契約決定</div>
        <div class="value"><span class="badge ${badgeClassForStatus(c.decision)}">${jpDecision(c.decision)}</span></div>
      </div>
      <div class="card">
        <div class="label">公開ステータス</div>
        <div class="value"><span class="badge ${badgeClassForStatus(c.public_status)}">${jpDecision(c.public_status)}</span></div>
      </div>
      <div class="card">
        <div class="label">互換性</div>
        <div class="value"><span class="badge ${badgeClassForStatus(compat.is_compatible)}">${jpCompatibility(compat.is_compatible)}</span></div>
      </div>
      <div class="card">
        <div class="label">フェイルクローズ</div>
        <div class="value"><span class="badge ${badgeClassForStatus(c.fail_closed)}">${jpFailClosed(c.fail_closed)}</span></div>
      </div>
    </div>

    <div class="section grid">
      <div class="card">
        <h2>ページと契約の関係</h2>
        <div class="value">
          このページは <strong>Stage288 の公開検証インターフェース</strong> です。<br />
          ここでは、<strong>Stage286 の製品契約</strong> と
          <strong>Stage287 の互換性検証結果</strong> を確認できます。
        </div>
      </div>

      <div class="card">
        <h2>理由</h2>
        <div class="value">${text(c.reason)}</div>
      </div>
    </div>

    <div class="section grid">
      <div class="card">
        <h2>契約概要</h2>
        <div class="label">契約ステージ</div>
        <div class="value">${text(c.stage)}</div>

        <div class="label" style="margin-top:12px;">仕様バージョン</div>
        <div class="value">${text(c.spec_version)}</div>

        <div class="label" style="margin-top:12px;">生成日時</div>
        <div class="value">${text(c.generated_at)}</div>

        <div class="label" style="margin-top:12px;">実行状態</div>
        <div class="value">${jpExecutionState(c.execution_state)}</div>
      </div>

      <div class="card">
        <h2>互換性ポリシー</h2>
        <div class="label">互換性ステージ</div>
        <div class="value">${text(compat.stage)}</div>

        <div class="label" style="margin-top:12px;">ポリシーID</div>
        <div class="value">${text(compat.policy_id)}</div>

        <div class="label" style="margin-top:12px;">契約バージョン</div>
        <div class="value">${text(compat.contract_version)}</div>
      </div>
    </div>

    <div class="section card">
      <h2>契約SHA-256</h2>
      <pre>${text(c.contract_sha256)}</pre>
    </div>

    <div class="section card">
      <h2>互換性チェック</h2>
      <ul>${checksHtml}</ul>
    </div>

    <div class="section card">
      <h2>公開アーティファクト</h2>
      <ul>${artifactsHtml}</ul>
    </div>

    <div class="footer">
      Stage288 は、Stage287 の互換性検証を含めて、Stage286 の QSP 製品契約を公開検証インターフェースとして提供します。
    </div>
  `;
}

loadData()
  .then(render)
  .catch(err => {
    document.getElementById("app").innerHTML = `
      <div class="card">
        <h2>検証ページの読み込みに失敗しました</h2>
        <pre>${err.message}</pre>
      </div>
    `;
  });
