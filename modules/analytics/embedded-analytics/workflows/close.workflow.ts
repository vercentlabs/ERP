export const embeddedAnalyticsCloseWorkflow = {
  module: "analytics/embedded-analytics",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/embedded-analytics record ${recordId}`;
  },
};
