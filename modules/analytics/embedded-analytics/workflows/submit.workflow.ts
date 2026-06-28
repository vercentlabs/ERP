export const embeddedAnalyticsSubmitWorkflow = {
  module: "analytics/embedded-analytics",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/embedded-analytics record ${recordId}`;
  },
};
