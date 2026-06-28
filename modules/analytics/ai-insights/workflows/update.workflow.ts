export const aiInsightsUpdateWorkflow = {
  module: "analytics/ai-insights",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/ai-insights record ${recordId}`;
  },
};
