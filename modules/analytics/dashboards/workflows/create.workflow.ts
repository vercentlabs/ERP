export const dashboardsCreateWorkflow = {
  module: "analytics/dashboards",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/dashboards record ${recordId}`;
  },
};
