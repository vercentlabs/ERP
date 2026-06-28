export const dataLakeExportReport = {
  id: "data-platform/data-lake.export",
  title: "Data Platform Data Lake Export Report",
  tenantScoped: true,
  columns: [
    { key: "code", label: "Code", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "status", label: "Status", type: "status" },
    { key: "priority", label: "Priority", type: "text" },
    { key: "updatedAt", label: "Updated", type: "date" },
  ],
};
