export const aiInsightsCreateWorkflow = {
  module: "analytics/ai-insights",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/ai-insights record ${recordId}`;
  },
};
