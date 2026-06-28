export const semanticLayerSummaryReport = {
  id: "data-platform/semantic-layer.summary",
  title: "Data Platform Semantic Layer Summary Report",
  tenantScoped: true,
  columns: [
    { key: "code", label: "Code", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "status", label: "Status", type: "status" },
    { key: "priority", label: "Priority", type: "text" },
    { key: "updatedAt", label: "Updated", type: "date" },
  ],
};
