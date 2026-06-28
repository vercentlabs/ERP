export const aiInsightsCancelWorkflow = {
  module: "analytics/ai-insights",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/ai-insights record ${recordId}`;
  },
};
