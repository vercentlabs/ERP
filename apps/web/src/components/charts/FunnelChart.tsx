export type FunnelChartProps = {
  title?: string;
  children?: React.ReactNode;
};

export function FunnelChart({ title = "FunnelChart", children }: FunnelChartProps) {
  return (
    <section data-component="FunnelChart" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
