export const embeddedAnalyticsCancelWorkflow = {
  module: "analytics/embedded-analytics",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/embedded-analytics record ${recordId}`;
  },
};
