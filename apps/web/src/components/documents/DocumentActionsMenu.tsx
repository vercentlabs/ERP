export type DocumentActionsMenuProps = {
  title?: string;
  children?: React.ReactNode;
};

export function DocumentActionsMenu({ title = "DocumentActionsMenu", children }: DocumentActionsMenuProps) {
  return (
    <section data-component="DocumentActionsMenu" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
