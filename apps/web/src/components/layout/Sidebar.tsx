export type SidebarProps = {
  title?: string;
  children?: React.ReactNode;
};

export function Sidebar({ title = "Sidebar", children }: SidebarProps) {
  return (
    <section data-component="Sidebar" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
