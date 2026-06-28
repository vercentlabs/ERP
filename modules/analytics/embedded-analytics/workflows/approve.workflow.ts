export const embeddedAnalyticsApproveWorkflow = {
  module: "analytics/embedded-analytics",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/embedded-analytics record ${recordId}`;
  },
};
