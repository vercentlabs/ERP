export type CardProps = {
  title?: string;
  children?: React.ReactNode;
};

export function Card({ title = "Card", children }: CardProps) {
  return (
    <section data-component="Card" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
