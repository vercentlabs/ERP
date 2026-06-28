export type BreadcrumbsProps = {
  title?: string;
  children?: React.ReactNode;
};

export function Breadcrumbs({ title = "Breadcrumbs", children }: BreadcrumbsProps) {
  return (
    <section data-component="Breadcrumbs" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
