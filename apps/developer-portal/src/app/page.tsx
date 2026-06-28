const capabilities = [
  "Tenant-aware records",
  "Role-based access",
  "Workflow approvals",
  "Reports and exports",
  "AI recommended next actions",
];

export default function DeveloperPortalPage() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <p style={{ color: "#155eef", fontWeight: 700 }}>Vercent ERP</p>
      <h1>Developer Portal</h1>
      <p>
        Developer Portal workspace for connected SaaS ERP operations across sales, stock, finance,
        support, and tenant collaboration.
      </p>
      <ul>
        {capabilities.map((capability) => (
          <li key={capability}>{capability}</li>
        ))}
      </ul>
    </main>
  );
}
