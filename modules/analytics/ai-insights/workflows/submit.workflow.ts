export const aiInsightsSubmitWorkflow = {
  module: "analytics/ai-insights",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/ai-insights record ${recordId}`;
  },
};
