const capabilities = [
  "Tenant-aware records",
  "Role-based access",
  "Workflow approvals",
  "Reports and exports",
  "AI recommended next actions",
];

export default function ExtensionStudioPage() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, sans-serif" }}>
      <p style={{ color: "#155eef", fontWeight: 700 }}>Vercent ERP</p>
      <h1>Extension Studio</h1>
      <p>
        Extension Studio workspace for connected SaaS ERP operations across sales, stock, finance,
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
