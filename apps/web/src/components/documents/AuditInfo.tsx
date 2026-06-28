export type AuditInfoProps = {
  title?: string;
  children?: React.ReactNode;
};

export function AuditInfo({ title = "AuditInfo", children }: AuditInfoProps) {
  return (
    <section data-component="AuditInfo" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
