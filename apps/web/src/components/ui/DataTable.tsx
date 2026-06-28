export type DataTableProps = {
  title?: string;
  children?: React.ReactNode;
};

export function DataTable({ title = "DataTable", children }: DataTableProps) {
  return (
    <section data-component="DataTable" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
