export type CommandPaletteProps = {
  title?: string;
  children?: React.ReactNode;
};

export function CommandPalette({ title = "CommandPalette", children }: CommandPaletteProps) {
  return (
    <section data-component="CommandPalette" className="vercent-component">
      <strong>{title}</strong>
      {children}
    </section>
  );
}
