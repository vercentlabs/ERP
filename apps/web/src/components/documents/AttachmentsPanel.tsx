export type AttachmentsPanelProps = {
  title?: string;
  children?: React.ReactNode;
};

export function AttachmentsPanel({ title = "AttachmentsPanel", children }: AttachmentsPanelProps) {
  return (
    <section data-component="AttachmentsPanel" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
