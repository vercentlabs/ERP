export type ReportColumn = {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "currency" | "status";
};

export type ReportDefinition = {
  id: string;
  title: string;
  columns: ReportColumn[];
  tenantScoped: boolean;
};
