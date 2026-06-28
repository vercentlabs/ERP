export const embeddedAnalyticsCreateWorkflow = {
  module: "analytics/embedded-analytics",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/embedded-analytics record ${recordId}`;
  },
};
