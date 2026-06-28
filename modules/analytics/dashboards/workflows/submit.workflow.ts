export const dashboardsSubmitWorkflow = {
  module: "analytics/dashboards",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/dashboards record ${recordId}`;
  },
};
