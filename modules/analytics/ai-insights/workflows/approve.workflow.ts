export const aiInsightsApproveWorkflow = {
  module: "analytics/ai-insights",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/ai-insights record ${recordId}`;
  },
};
