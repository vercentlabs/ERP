export const dashboardsCancelWorkflow = {
  module: "analytics/dashboards",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/dashboards record ${recordId}`;
  },
};
