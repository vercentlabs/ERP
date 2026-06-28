export type ButtonProps = {
  title?: string;
  children?: React.ReactNode;
};

export function Button({ title = "Button", children }: ButtonProps) {
  return (
    <section data-component="Button" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
