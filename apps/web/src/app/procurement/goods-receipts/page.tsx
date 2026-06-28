import { ModuleHeader } from "../../../components/layout/ModuleHeader";

const metrics = [
  { label: "Open work", value: "24" },
  { label: "Needs approval", value: "7" },
  { label: "AI recommendations", value: "3" },
];

export default function ProcurementGoodsReceiptsPage() {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Procurement Goods Receipts"
        eyebrow="Vercent ERP"
        description="Operational workspace for procurement goods receipts with tenant-aware records, approvals, analytics, and AI-assisted next actions."
      />
      <section className="grid-panel">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
