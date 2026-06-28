export type TrendChartProps = {
  title?: string;
  children?: React.ReactNode;
};

export function TrendChart({ title = "TrendChart", children }: TrendChartProps) {
  return (
    <section data-component="TrendChart" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
