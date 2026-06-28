export const embeddedAnalyticsUpdateWorkflow = {
  module: "analytics/embedded-analytics",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/embedded-analytics record ${recordId}`;
  },
};
