export const scheduledReportsUpdateWorkflow = {
  module: "analytics/scheduled-reports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/scheduled-reports record ${recordId}`;
  },
};
