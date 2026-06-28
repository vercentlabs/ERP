export type StatusBadgeProps = {
  title?: string;
  children?: React.ReactNode;
};

export function StatusBadge({ title = "StatusBadge", children }: StatusBadgeProps) {
  return (
    <section data-component="StatusBadge" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
