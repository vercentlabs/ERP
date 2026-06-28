export const dashboardsRejectWorkflow = {
  module: "analytics/dashboards",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/dashboards record ${recordId}`;
  },
};
