export type AppShellProps = {
  title?: string;
  children?: React.ReactNode;
};

export function AppShell({ title = "AppShell", children }: AppShellProps) {
  return (
    <section data-component="AppShell" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
