export const dashboardsCloseWorkflow = {
  module: "analytics/dashboards",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/dashboards record ${recordId}`;
  },
};
