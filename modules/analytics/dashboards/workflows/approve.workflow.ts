export const dashboardsApproveWorkflow = {
  module: "analytics/dashboards",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/dashboards record ${recordId}`;
  },
};
