export type CommentsPanelProps = {
  title?: string;
  children?: React.ReactNode;
};

export function CommentsPanel({ title = "CommentsPanel", children }: CommentsPanelProps) {
  return (
    <section data-component="CommentsPanel" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
