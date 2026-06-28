export type ConfirmDialogProps = {
  title?: string;
  children?: React.ReactNode;
};

export function ConfirmDialog({ title = "ConfirmDialog", children }: ConfirmDialogProps) {
  return (
    <section data-component="ConfirmDialog" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
