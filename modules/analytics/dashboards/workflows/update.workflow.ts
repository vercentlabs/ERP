export const dashboardsUpdateWorkflow = {
  module: "analytics/dashboards",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/dashboards record ${recordId}`;
  },
};
