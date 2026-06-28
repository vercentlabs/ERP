export const routePlanningExportReport = {
  id: "field-service/route-planning.export",
  title: "Field Service Route Planning Export Report",
  tenantScoped: true,
  columns: [
    { key: "code", label: "Code", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "status", label: "Status", type: "status" },
    { key: "priority", label: "Priority", type: "text" },
    { key: "updatedAt", label: "Updated", type: "date" },
  ],
};
