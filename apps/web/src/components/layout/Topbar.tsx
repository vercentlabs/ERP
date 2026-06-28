export type TopbarProps = {
  title?: string;
  children?: React.ReactNode;
};

export function Topbar({ title = "Topbar", children }: TopbarProps) {
  return (
    <section data-component="Topbar" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
