export const reportsUpdateWorkflow = {
  module: "analytics/reports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/reports record ${recordId}`;
  },
};
