export const aiInsightsCloseWorkflow = {
  module: "analytics/ai-insights",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/ai-insights record ${recordId}`;
  },
};
