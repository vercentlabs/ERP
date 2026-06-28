export type ModuleHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export function ModuleHeader({ eyebrow, title, description, actions, children }: ModuleHeaderProps) {
  return (
    <section data-component="ModuleHeader" className="vercent-module-header">
      <div>
        {eyebrow ? <p className="vercent-eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="vercent-description">{description}</p> : null}
      </div>
      {actions ? <div className="vercent-module-actions">{actions}</div> : null}
      {children}
    </section>
  );
}
