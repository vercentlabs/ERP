import { ModuleHeader } from "../../../components/layout/ModuleHeader";

const metrics = [
  { label: "Open work", value: "24" },
  { label: "Needs approval", value: "7" },
  { label: "AI recommendations", value: "3" },
];

export default function AnalyticsDataMartsPage() {
  return (
    <main className="page-shell">
      <ModuleHeader
        title="Analytics Data Marts"
        eyebrow="Vercent ERP"
        description="Operational workspace for analytics data marts with tenant-aware records, approvals, analytics, and AI-assisted next actions."
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
