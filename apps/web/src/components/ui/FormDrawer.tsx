export type FormDrawerProps = {
  title?: string;
  children?: React.ReactNode;
};

export function FormDrawer({ title = "FormDrawer", children }: FormDrawerProps) {
  return (
    <section data-component="FormDrawer" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
