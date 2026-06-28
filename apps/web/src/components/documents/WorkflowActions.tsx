export type WorkflowActionsProps = {
  title?: string;
  children?: React.ReactNode;
};

export function WorkflowActions({ title = "WorkflowActions", children }: WorkflowActionsProps) {
  return (
    <section data-component="WorkflowActions" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
