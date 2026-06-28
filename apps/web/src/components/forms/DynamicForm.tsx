export type DynamicFormProps = {
  title?: string;
  children?: React.ReactNode;
};

export function DynamicForm({ title = "DynamicForm", children }: DynamicFormProps) {
  return (
    <section data-component="DynamicForm" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
