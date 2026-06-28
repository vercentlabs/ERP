import { ModuleHeader } from "../../../components/layout/ModuleHeader";

const metrics = [
  { label: "Open work", value: "24" },
  { label: "Needs approval", value: "7" },
  { label: "AI recommendations", value: "3" },
];

export default function QualitySupplierQualityPage() {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Quality Supplier Quality"
        eyebrow="Vercent ERP"
        description="Operational workspace for quality supplier quality with tenant-aware records, approvals, analytics, and AI-assisted next actions."
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
