const platformMetrics = [
  { label: "Active tenants", value: "128", detail: "Provisioned companies across plans" },
  { label: "Trials needing action", value: "14", detail: "AI recommends owner follow-up" },
  { label: "Usage alerts", value: "9", detail: "Storage, seats, API, or automation quota pressure" },
  { label: "Failed jobs", value: "3", detail: "Billing, webhook, and import jobs requiring review" },
];

const controlPlaneActions = [
  "Provision tenant database",
  "Apply plan entitlements",
  "Suspend or restore tenant access",
  "Review usage metering and billing events",
  "Audit admin activity",
];

export default function AdminConsolePage() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <header>
        <p style={{ color: "#155eef", fontWeight: 700 }}>Vercent Control Plane</p>
        <h1>SaaS Admin Console</h1>
        <p>
          Manage tenants, plans, entitlements, metering, billing lifecycle, backups, and platform risk
          from one owner-focused operating view.
        </p>
      </header>

      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {platformMetrics.map((metric) => (
          <article key={metric.label} style={{ border: "1px solid #d8dee8", borderRadius: 8, padding: 16 }}>
            <span>{metric.label}</span>
            <strong style={{ display: "block", fontSize: 28 }}>{metric.value}</strong>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section>
        <h2>Control plane actions</h2>
        <ul>
          {controlPlaneActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
