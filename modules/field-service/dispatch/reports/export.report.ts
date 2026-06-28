export const dispatchExportReport = {
  id: "field-service/dispatch.export",
  title: "Field Service Dispatch Export Report",
  tenantScoped: true,
  columns: [
    { key: "code", label: "Code", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "status", label: "Status", type: "status" },
    { key: "priority", label: "Priority", type: "text" },
    { key: "updatedAt", label: "Updated", type: "date" },
  ],
};
