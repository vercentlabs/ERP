export const aiInsightsRejectWorkflow = {
  module: "analytics/ai-insights",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/ai-insights record ${recordId}`;
  },
};
