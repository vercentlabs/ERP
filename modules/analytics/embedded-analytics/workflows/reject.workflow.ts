export const embeddedAnalyticsRejectWorkflow = {
  module: "analytics/embedded-analytics",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/embedded-analytics record ${recordId}`;
  },
};
