export type KpiCardProps = {
  title?: string;
  children?: React.ReactNode;
};

export function KpiCard({ title = "KpiCard", children }: KpiCardProps) {
  return (
    <section data-component="KpiCard" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
